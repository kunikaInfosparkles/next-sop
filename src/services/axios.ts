import axios from "axios";
import { getToken } from "./tokenUtils";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  console.error("❌ Missing NEXT_PUBLIC_API_URL in .env file");
}

const instance = axios.create({
  baseURL: API_URL,
});

// Default JSON unless changed
instance.defaults.headers.common["Content-Type"] = "application/json";

// REQUEST INTERCEPTOR
instance.interceptors.request.use((config) => {
  const token = getToken();

  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default instance;
