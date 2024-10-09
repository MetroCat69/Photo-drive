import { getSupabaseConfig } from "./supabaseEnv";
import { createClient } from "@supabase/supabase-js";

const { url, anonKey } = getSupabaseConfig();

export const initializeSupabaseClient = () => {
  return createClient(url, anonKey);
};
