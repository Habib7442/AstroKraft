-- 1. Create enum types
CREATE TYPE user_role AS ENUM ('user', 'astrologer', 'admin');
CREATE TYPE transaction_type AS ENUM ('credit', 'debit');
CREATE TYPE astrologer_status AS ENUM ('online', 'busy', 'offline');

-- 2. Create tables
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    phone TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE,
    name TEXT,
    role user_role DEFAULT 'user'::user_role,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE public.wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    balance NUMERIC(10, 2) DEFAULT 0.00 NOT NULL CHECK (balance >= 0),
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE public.wallet_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_id UUID NOT NULL REFERENCES public.wallets(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    type transaction_type NOT NULL,
    reason TEXT NOT NULL,
    reference_id TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE public.astrologer_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    rate_per_min NUMERIC(10, 2) NOT NULL,
    status astrologer_status DEFAULT 'offline'::astrologer_status NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. Row Level Security Policies (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.astrologer_profiles ENABLE ROW LEVEL SECURITY;

-- users policies
CREATE POLICY "Allow users to read their own record" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Allow users to update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Privileged columns stay server-side (service role only) — WITH CHECK alone does
-- not stop a user from setting their own role to 'admin' in the same UPDATE.
REVOKE UPDATE (role, id) ON public.users FROM anon, authenticated;

-- wallets policies
CREATE POLICY "Allow users to read their own wallet" ON public.wallets FOR SELECT USING (auth.uid() = user_id);

-- wallet_transactions policies
CREATE POLICY "Allow users to read their own transactions" ON public.wallet_transactions FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.wallets WHERE wallets.id = wallet_transactions.wallet_id AND wallets.user_id = auth.uid()
    )
);

-- astrologer_profiles policies
CREATE POLICY "Allow public read access to astrologer profiles" ON public.astrologer_profiles FOR SELECT USING (true);
CREATE POLICY "Allow astrologers to update their own status" ON public.astrologer_profiles
    FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

REVOKE UPDATE (rate_per_min, is_active, user_id) ON public.astrologer_profiles FROM anon, authenticated;

-- 4. Triggers to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON public.wallets
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_astrologer_profiles_updated_at BEFORE UPDATE ON public.astrologer_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
