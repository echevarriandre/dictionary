import axios from "axios";

const dictionaryApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "X-RapidAPI-Host": import.meta.env.VITE_API_HOST,
    "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
  },
});

export default dictionaryApi;
