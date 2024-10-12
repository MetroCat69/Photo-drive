import request from "supertest";
import app from "../../src/index";

describe("API Tests", () => {
  it('should return "Hello, World!" on the root route', async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello, World!");
  });

  it("should return 400 for missing parameters", async () => {
    const response = await request(app).get("/api/uvInfo");
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "Please provide lat, lng, and skinType parameters"
    );
  });

  it("should return 400 for invalid skinType", async () => {
    const response = await request(app).get(
      "/api/uvInfo?lat=40.7128&lng=-74.0060&skinType=99"
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "Invalid skinType value. It must be between 1 and 6."
    );
  });

  it("should return 200 and UV data for valid parameters", async () => {
    const response = await request(app).get(
      "/api/uvInfo?lat=40.7128&lng=-74.0060&skinType=1"
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("safeExposureTime");
    expect(response.body).toHaveProperty("sunTimes");
    expect(response.body).toHaveProperty("uvMaxTime");
  });
});
