import { API_URI_WEATHER, API_KEY_WEATHER } from "@/constants";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  InternalServerError = 500,
}

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
};

class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: API_URI_WEATHER,
      headers,
    });
    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        return this.handleError(response);
      }
    );
    http.interceptors.request.use(
      function (config) {
        config.params["appid"] = API_KEY_WEATHER;
        config.params["units"] = "metric";
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    this.instance = http;
    return http;
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  private handleError(error: any) {
    const { status } = error;

    switch (status) {
      case StatusCode.InternalServerError: {
        break;
      }
      case StatusCode.Forbidden: {
        break;
      }
      case StatusCode.Unauthorized: {
        break;
      }
    }

    return Promise.reject(error);
  }
}

export const http = new Http();
