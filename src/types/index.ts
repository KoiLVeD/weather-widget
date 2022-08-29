interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Location {
  weather: Weather[];
  coord: {
    lon: number;
    lat: number;
  };
  main: {
    temp: number;
    temp_min: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
  id: number;
  visibility: number;
  name: string;
}

export interface LocationError {
  cod: string;
  message: string;
}

type HeaderStateValue = {
  title: string;
  icon: string;
};

export type HeaderState = "view" | "settings";

export type HeaderStateDictionary = Record<HeaderState, HeaderStateValue>;
