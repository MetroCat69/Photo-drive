import { config } from "dotenv";

config();

export const getSupabaseConfig = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url) {
    throw new Error("Supabase URL is missing!");
  }

  if (!anonKey) {
    throw new Error("Supabase Anon Key is missing!");
  }

  return { url, anonKey };
};