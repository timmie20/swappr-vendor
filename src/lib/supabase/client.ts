// TODO: Supabase client removed - using backend API instead
// This file is kept for reference but should not be used

/*
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

export const createBrowserClient = () => {
  return createClientComponentClient<Database>({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
};
*/

// Placeholder - this function should not be called anymore
export const createBrowserClient = () => {
  throw new Error(
    "Supabase client deprecated - use API client from @/lib/api-client instead",
  );
};
