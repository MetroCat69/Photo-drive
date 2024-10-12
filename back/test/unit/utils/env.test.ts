import dotenv from "dotenv";
import { loadEnv } from "../../../src/utils/env";

jest.mock("dotenv", () => ({
  config: jest.fn(),
}));

describe("loadEnv", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should load .env file successfully", () => {
    (dotenv.config as jest.Mock).mockReturnValue({ error: null });

    process.env.PORT = "3000";
    process.env.OPEN_UV_KEY = "some-key";

    expect(() => loadEnv()).not.toThrow();
  });

  it("should throw an error if .env file fails to load", () => {
    (dotenv.config as jest.Mock).mockReturnValue({
      error: new Error("Failed to load"),
    });

    expect(() => loadEnv()).toThrow("Failed to load .env file: Failed to load");
  });

  it("should throw an error if a required environment variable is missing", () => {
    (dotenv.config as jest.Mock).mockReturnValue({ error: null });

    delete process.env.PORT;
    delete process.env.OPEN_UV_KEY;

    expect(() => loadEnv()).toThrow(
      "Missing required environment variable: PORT"
    );

    process.env.PORT = "3000";

    expect(() => loadEnv()).toThrow(
      "Missing required environment variable: OPEN_UV_KEY"
    );
  });
});
