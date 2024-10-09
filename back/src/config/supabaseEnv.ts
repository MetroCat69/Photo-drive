import { config } from "dotenv";

export const urlMissingError = "Supabase URL is missing!";
export const annonKeyMissingError = "Supabase URL is missing!";

config();

export const getSupabaseConfig = () => {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url) {
    throw new Error(urlMissingError);
  }

  if (!anonKey) {
    throw new Error(annonKeyMissingError);
  }

  return { url, anonKey };
};
