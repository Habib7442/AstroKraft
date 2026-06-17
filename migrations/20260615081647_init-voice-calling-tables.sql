-- 1. Create enum types
CREATE TYPE user_role AS ENUM ('user', 'astrologer', 'admin');
CREATE TYPE transaction_type AS ENUM ('credit', 'debit');
CREATE TYPE call_status AS ENUM ('pending', 'active', 'completed', 'failed');
CREATE TYPE astrologer_status AS ENUM ('online', 'busy', 'offline');

-- 2. Create tables
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE,
    name TEXT,
    role user_role DEFAULT 'user'::user_role,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    balance NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE wallet_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_id UUID NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    type transaction_type NOT NULL,
    reason TEXT NOT NULL,
    reference_id TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE astrologer_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rate_per_min NUMERIC(10, 2) NOT NULL,
    status astrologer_status DEFAULT 'offline'::astrologer_status NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE call_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id TEXT UNIQUE NOT NULL,
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    astrologer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status call_status DEFAULT 'pending'::call_status NOT NULL,
    rate_per_min NUMERIC(10, 2) NOT NULL,
    total_charged NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
    started_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. Row Level Security Policies (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE astrologer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_sessions ENABLE ROW LEVEL SECURITY;

-- users policies
CREATE POLICY "Allow users to read their own record" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Allow users to update their own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- wallets policies
CREATE POLICY "Allow users to read their own wallet" ON wallets FOR SELECT USING (auth.uid() = user_id);

-- wallet_transactions policies
CREATE POLICY "Allow users to read their own transactions" ON wallet_transactions FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM wallets WHERE wallets.id = wallet_transactions.wallet_id AND wallets.user_id = auth.uid()
    )
);

-- astrologer_profiles policies
CREATE POLICY "Allow public read access to astrologer profiles" ON astrologer_profiles FOR SELECT USING (true);
CREATE POLICY "Allow astrologers to update their own status" ON astrologer_profiles FOR UPDATE USING (auth.uid() = user_id);

-- call_sessions policies
CREATE POLICY "Allow participants to read call sessions" ON call_sessions FOR SELECT USING (
    auth.uid() = customer_id OR auth.uid() = astrologer_id
);

-- 4. Triggers to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON wallets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_astrologer_profiles_updated_at BEFORE UPDATE ON astrologer_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
