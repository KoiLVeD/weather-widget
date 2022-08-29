import { http } from "@/api";

export const getWeatherByCoordinates = (lat: number, lon: number) =>
  http.get("weather", {
    params: {
      lat: lat,
      lon: lon,
    },
  });

export const getWeatherByLocation = (location: string) =>
  http.get("weather", {
    params: {
      q: location,
    },
  });
