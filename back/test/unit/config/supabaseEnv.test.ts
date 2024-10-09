import {
  getSupabaseConfig,
  urlMissingError,
  annonKeyMissingError,
} from "../../../src/config/supabaseEnv";
import dotenv from "dotenv";

dotenv.config();

describe("getSupabaseConfig", () => {
  beforeEach(() => {
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_ANON_KEY;
  });

  test("should throw an error if Supabase URL is missing", () => {
    process.env.SUPABASE_ANON_KEY = "some-anon-key";

    expect(() => getSupabaseConfig()).toThrow(urlMissingError);
  });

  test("should throw an error if Supabase Anon Key is missing", () => {
    process.env.SUPABASE_URL = "https://some-supabase-url";

    expect(() => getSupabaseConfig()).toThrow(annonKeyMissingError);
  });

  test("should return the config when both values are present", () => {
    process.env.SUPABASE_URL = "https://some-supabase-url";
    process.env.SUPABASE_ANON_KEY = "some-anon-key";

    const config = getSupabaseConfig();

    expect(config).toEqual({
      url: "https://some-supabase-url",
      anonKey: "some-anon-key",
    });
  });
});
