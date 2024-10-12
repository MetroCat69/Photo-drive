import { SafeExposureTime, SkinType } from "../types";
import { SolarInformation, UVApiResponse } from "../Interfaces";
import axios from "axios";
import { Request, Response } from "express";

const getSafeExposureTime = (
  safeExposure: SafeExposureTime,
  skinType: SkinType
): number | null => {
  const key: keyof SafeExposureTime = `st${skinType}` as keyof SafeExposureTime;
  return safeExposure[key] || null;
};

export const fetchUVData = async (
  lat: string,
  lng: string,
  skinType: SkinType
): Promise<SolarInformation> => {
  const response = await axios.get<UVApiResponse>(
    "https://api.openuv.io/api/v1/uv",
    {
      headers: {
        "x-access-token": process.env.OPEN_UV_KEY,
        "Content-Type": "application/json",
      },
      params: {
        lat,
        lng,
      },
    }
  );

  const data = response.data;

  const safeExposureTime = getSafeExposureTime(
    data.result.safe_exposure_time,
    skinType
  );
  const uvMaxTime = data.result.uv_max_time;

  const sunTimes = data.result.sun_info.sun_times;

  if (!uvMaxTime || safeExposureTime === null || !sunTimes) {
    throw new Error("Required data is missing or null");
  }

  return {
    uvMaxTime,
    safeExposureTime,
    sunTimes,
  };
};

export async function getUvInfo(req: Request, res: Response) {
  const { lat, lng, skinType } = req.query;

  if (!lat || !lng || !skinType) {
    return res.status(400).json({
      error: "Please provide lat, lng, and skinType parameters",
    });
  }

  const skinTypeNum = Number(skinType);
  if (!Object.keys(SkinType).includes(`Type${skinTypeNum}`)) {
    return res.status(400).json({
      error: "Invalid skinType value. It must be between 1 and 6.",
    });
  }

  try {
    const solarInfo = await fetchUVData(
      lat as string,
      lng as string,
      skinTypeNum as SkinType
    );
    res.json(solarInfo);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching UV data",
    });
  }
}
