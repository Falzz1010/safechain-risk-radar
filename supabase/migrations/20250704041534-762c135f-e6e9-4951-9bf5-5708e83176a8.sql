
-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Create audit_history table for storing audit results
CREATE TABLE public.audit_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  contract_name TEXT NOT NULL,
  contract_code TEXT,
  audit_score TEXT NOT NULL,
  audit_status TEXT NOT NULL,
  vulnerability_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create watchlist table for monitoring addresses
CREATE TABLE public.watchlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  address TEXT NOT NULL,
  label TEXT NOT NULL,
  risk_level TEXT NOT NULL DEFAULT 'Unknown',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, address)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watchlist ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for audit_history
CREATE POLICY "Users can view own audit history" ON public.audit_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own audit history" ON public.audit_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own audit history" ON public.audit_history
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own audit history" ON public.audit_history
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for watchlist
CREATE POLICY "Users can view own watchlist" ON public.watchlist
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own watchlist items" ON public.watchlist
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own watchlist items" ON public.watchlist
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own watchlist items" ON public.watchlist
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data ->> 'full_name', '')
  );
  RETURN new;
END;
$$;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Enable realtime for tables
ALTER TABLE public.audit_history REPLICA IDENTITY FULL;
ALTER TABLE public.watchlist REPLICA IDENTITY FULL;
ALTER TABLE public.profiles REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.audit_history;
ALTER PUBLICATION supabase_realtime ADD TABLE public.watchlist;
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
