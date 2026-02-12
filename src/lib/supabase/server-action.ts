// TODO: Supabase server action client removed - using backend API instead
// This file is kept for reference but should not be used

/*
import { createServerActionClient as createClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";

export const createServerActionClient = () => {
  return createClient<Database>({ cookies });
};
*/

// Placeholder - this function should not be called anymore
export const createServerActionClient = () => {
  throw new Error(
    "Supabase server action client deprecated - use API client from @/lib/api-client instead",
  );
};
