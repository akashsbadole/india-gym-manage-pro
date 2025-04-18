
import { createClient } from '@supabase/supabase-js';

// Try to get environment variables, but use fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'fallback-development-key';

// Create a mock Supabase client if we're missing real credentials
const isMockClient = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Log warning if using mock client
if (isMockClient) {
  console.warn('Using mock Supabase client. For production, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
}
