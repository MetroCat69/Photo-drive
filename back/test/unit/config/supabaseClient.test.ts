import { createClient } from "@supabase/supabase-js";
import { initializeSupabaseClient } from "../../../src/config/supabaseClient";

jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(),
}));

jest.mock("../../../src/config/supabaseEnv", () => ({
  getSupabaseConfig: jest.fn(() => ({
    url: "https://mock-supabase-url",
    anonKey: "mock-anon-key",
  })),
}));

describe("Supabase Client", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create a Supabase client with correct URL and Anon Key", () => {
    initializeSupabaseClient();

    expect(createClient).toHaveBeenCalledWith(
      "https://mock-supabase-url",
      "mock-anon-key"
    );
  });
});
