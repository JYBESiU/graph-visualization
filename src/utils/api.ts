import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export async function customFetcher(url: string) {
  try {
    const res = await api.get(url);
    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      const data = err?.response?.data as {
        message: string;
      };
      throw new Error(data.message);
    }
  }
}

export default api;
