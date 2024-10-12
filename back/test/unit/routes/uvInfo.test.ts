import * as uvModule from "../../../src/routes/uvInfo";
import { getUvInfo } from "../../../src/routes/uvInfo";
import axios from "axios";
import { Request, Response } from "express";
import { SkinType } from "../../../src/types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchUVData", () => {
  it("should return solar information for valid data", async () => {
    // Mock API response
    mockedAxios.get.mockResolvedValue({
      data: {
        result: {
          safe_exposure_time: {
            st1: 15,
            st2: 20,
          },
          uv_max_time: "12:00",
          sun_info: {
            sun_times: {
              solarNoon: "12:00",
              sunrise: "06:00",
              sunset: "18:00",
            },
          },
        },
      },
    });

    const solarInfo = await uvModule.fetchUVData(
      "40.7128",
      "-74.0060",
      SkinType.Type1
    );
    expect(solarInfo).toEqual({
      uvMaxTime: "12:00",
      safeExposureTime: 15,
      sunTimes: {
        solarNoon: "12:00",
        sunrise: "06:00",
        sunset: "18:00",
      },
    });
  });

  it("should throw an error when required data is missing", async () => {
    // Mock API response with missing data
    mockedAxios.get.mockResolvedValue({
      data: {
        result: {
          safe_exposure_time: {},
          uv_max_time: null,
          sun_info: {
            sun_times: null,
          },
        },
      },
    });

    await expect(
      uvModule.fetchUVData("40.7128", "-74.0060", SkinType.Type1)
    ).rejects.toThrow("Required data is missing or null");
  });
});

describe("getUvInfo", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    req = {
      query: {},
    };
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  it("should return 400 if parameters are missing", async () => {
    req.query = {}; // No lat, lng, or skinType

    await getUvInfo(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      error: "Please provide lat, lng, and skinType parameters",
    });
  });

  it("should return 400 if skinType is invalid", async () => {
    req.query = { lat: "40.7128", lng: "-74.0060", skinType: "99" };

    await getUvInfo(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      error: "Invalid skinType value. It must be between 1 and 6.",
    });
  });

  it("should return 500 if fetchUVData throws an error", async () => {
    req.query = { lat: "40.7128", lng: "-74.0060", skinType: "1" };

    jest
      .spyOn(uvModule, "fetchUVData")
      .mockRejectedValue(new Error("API Error"));

    await getUvInfo(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      error: "An error occurred while fetching UV data",
    });
  });

  it("should return 200 and solar information for valid parameters", async () => {
    req.query = { lat: "40.7128", lng: "-74.0060", skinType: "1" };

    // Mock fetchUVData to return a successful response
    jest.spyOn(uvModule, "fetchUVData").mockResolvedValue({
      uvMaxTime: "12:00",
      safeExposureTime: 15,
      sunTimes: {
        solarNoon: "12:00",
        sunrise: "06:00",
        sunset: "18:00",
      },
    } as any);

    await getUvInfo(req as Request, res as Response);

    expect(jsonMock).toHaveBeenCalledWith({
      uvMaxTime: "12:00",
      safeExposureTime: 15,
      sunTimes: {
        solarNoon: "12:00",
        sunrise: "06:00",
        sunset: "18:00",
      },
    });
  });
});
