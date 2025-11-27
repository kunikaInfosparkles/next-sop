import axios from "./axios";
import { getHeader, handleCatchErrors } from "./customFn";

export const httpService = {
  async get<T>(url: string): Promise<T | null> {
    try {
      return (await axios.get<T>(url, getHeader())).data;
    } catch (err: any) {
      return handleCatchErrors(err);
    }
  },

  async post<T>(url: string, data: any): Promise<T | null> {
    try {
      return (await axios.post<T>(url, data)).data;
    } catch (err: any) {
      return handleCatchErrors(err);
    }
  },

  async put<T>(url: string, data: any): Promise<T | null> {
    try {
      return (await axios.put<T>(url, data)).data;
    } catch (err: any) {
      return handleCatchErrors(err);
    }
  },

  async patch<T>(url: string, data: any): Promise<T | null> {
    try {
      return (await axios.patch<T>(url, data)).data;
    } catch (err: any) {
      return handleCatchErrors(err);
    }
  },

  async delete<T>(url: string): Promise<T | null> {
    try {
      return (await axios.delete<T>(url)).data;
    } catch (err: any) {
      return handleCatchErrors(err);
    }
  },
};
