import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const appUrl = import.meta.env.VITE_APP_URL || import.meta.env.NEXT_PUBLIC_SITE_URL;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
export const siteUrl = (appUrl || '').trim().replace(/\/+$/, '');

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true
      }
    })
  : null;
