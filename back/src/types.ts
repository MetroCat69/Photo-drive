export enum SkinType {
  Type1 = 1,
  Type2 = 2,
  Type3 = 3,
  Type4 = 4,
  Type5 = 5,
  Type6 = 6,
}

export type SafeExposureTime = {
  st1: number; // Safe exposure time (mins) for Skin Type 1
  st2: number; // Safe exposure time (mins) for Skin Type 2
  st3: number; // Safe exposure time (mins) for Skin Type 3
  st4: number; // Safe exposure time (mins) for Skin Type 4
  st5: number; // Safe exposure time (mins) for Skin Type 5
  st6: number; // Safe exposure time (mins) for Skin Type 6
};

export type SunTimes = {
  solarNoon: string; // Solar noon (highest position)
  nadir: string; // Darkest moment of the night
  sunrise: string; // Sunrise
  sunset: string; // Sunset
  sunriseEnd: string; // Sunrise ends
  sunsetStart: string; // Sunset starts
  dawn: string; // Morning civil twilight starts
  dusk: string; // Evening nautical twilight starts
  nauticalDawn: string; // Morning nautical twilight starts
  nauticalDusk: string; // Evening astronomical twilight starts
  nightEnd: string; // Night ends
  night: string; // Night starts
  goldenHourEnd: string; // Morning golden hour ends
  goldenHour: string; // Evening golden hour starts
};

export type SunPosition = {
  azimuth: number; // Sun azimuth in radians
  altitude: number; // Sun altitude above the horizon in radians
};

export type SunInfo = {
  sun_times: SunTimes; // Sun times data
  sun_position: SunPosition; // Sun position data
};

export type UVData = {
  uv: number; // UV Index
  uv_time: string; // UV Index datetime in UTC
  uv_max: number; // Max UV Index for the day
  uv_max_time: string; // Max UV Index datetime in UTC
  ozone: number; // Ozone level in Dobson Units
  ozone_time: string; // Latest ozone update time
  safe_exposure_time: SafeExposureTime; // Safe exposure times for different skin types
  sun_info: SunInfo; // Sun information
};
