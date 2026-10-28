-- ==============================================================================
-- MERI SEHAT AI - SUPABASE POSTGRESQL INITIAL DATABASE MIGRATION
-- Production-minded schema with Row-Level Security (RLS) & Audit Logging
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. User Profiles Table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    phone_number TEXT,
    city TEXT,
    preferred_language TEXT DEFAULT 'en' CHECK (preferred_language IN ('en', 'ur', 'ur_roman')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- 3. Patient Health Reports Table
CREATE TABLE IF NOT EXISTS public.health_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL DEFAULT 'cbc',
    laboratory_name TEXT,
    extraction_confidence NUMERIC(4, 2) NOT NULL DEFAULT 0.95,
    patient_context JSONB,
    source_file_name TEXT,
    biomarkers JSONB NOT NULL,
    pattern_analysis JSONB,
    safety_escalations JSONB,
    status TEXT NOT NULL DEFAULT 'ready' CHECK (status IN ('draft', 'confirmed', 'ready')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on Health Reports (Strict Privacy: User can only access their own reports)
ALTER TABLE public.health_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own health reports"
    ON public.health_reports FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own health reports"
    ON public.health_reports FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own health reports"
    ON public.health_reports FOR DELETE
    USING (auth.uid() = user_id);

-- 4. Prescriptions Table
CREATE TABLE IF NOT EXISTS public.prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    medicines JSONB NOT NULL,
    doctor_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on Prescriptions
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own prescriptions"
    ON public.prescriptions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own prescriptions"
    ON public.prescriptions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own prescriptions"
    ON public.prescriptions FOR DELETE
    USING (auth.uid() = user_id);

-- 5. Subscriptions Table
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    plan_id TEXT NOT NULL DEFAULT 'free' CHECK (plan_id IN ('free', 'plus', 'professional')),
    billing_interval TEXT DEFAULT 'monthly' CHECK (billing_interval IN ('monthly', 'annual')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due')),
    current_period_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on Subscriptions
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscription"
    ON public.subscriptions FOR SELECT
    USING (auth.uid() = user_id);

-- 6. Safety & Audit Incident Log (Zero PII, administrative auditing only)
CREATE TABLE IF NOT EXISTS public.safety_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_type TEXT NOT NULL,
    details TEXT NOT NULL,
    is_emergency BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on Audit Log (Admin Only)
ALTER TABLE public.safety_audit_logs ENABLE ROW LEVEL SECURITY;
