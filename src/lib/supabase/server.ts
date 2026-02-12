// TODO: Supabase server component client removed - using backend API instead
// This file is kept for reference but should not be used

/*
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";

export const createServerClient = () => {
  return createServerComponentClient<Database>({ cookies });
};
*/

// Placeholder - this function should not be called anymore
export const createServerClient = () => {
  throw new Error(
    "Supabase server component client deprecated - use API client from @/lib/api-client instead",
  );
};
