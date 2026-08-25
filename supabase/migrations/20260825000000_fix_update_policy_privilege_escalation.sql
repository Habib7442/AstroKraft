-- Fixes a privilege-escalation gap in the UPDATE policies from
-- 20260823000000_init_users_wallets_astrologer_profiles.sql:
-- FOR UPDATE ... USING (...) only filters which ROWS can be updated, it does
-- not validate the NEW row. Without WITH CHECK, an authenticated user could
-- run `update public.users set role = 'admin' where id = auth.uid()` and
-- pass the policy. Same gap let an astrologer change rate_per_min/is_active
-- on their own profile.

-- 1. Re-create both UPDATE policies with a matching WITH CHECK clause.
DROP POLICY IF EXISTS "Allow users to update their own profile" ON public.users;
CREATE POLICY "Allow users to update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Allow astrologers to update their own status" ON public.astrologer_profiles;
CREATE POLICY "Allow astrologers to update their own status" ON public.astrologer_profiles
    FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 2. WITH CHECK alone still lets a user set role='admin' on their own row
-- (auth.uid() = id stays true either way) — revoke column-level UPDATE on
-- the privileged columns so only the service role (which bypasses grants)
-- can change them.
REVOKE UPDATE (role, id) ON public.users FROM anon, authenticated;
REVOKE UPDATE (rate_per_min, is_active, user_id) ON public.astrologer_profiles FROM anon, authenticated;
