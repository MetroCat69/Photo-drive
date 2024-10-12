import { UVData, SunTimes } from "./types";
export interface UVApiResponse {
  result: UVData;
}
// the data we care about we are going to return
export interface SolarInformation {
  uvMaxTime: string;
  safeExposureTime: number;
  sunTimes: SunTimes;
}
