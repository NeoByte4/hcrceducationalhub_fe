import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_DATA_URL;

export const axiosDataInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
