import axios from "axios";
import { getSession } from "next-auth/react";

/*interface SessionBody {
  user: User;
  accessToken: string;
}

interface UserBody {
  name: string;
  email: string;
  image: string;
  id: string;
}*/

const api = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.user?.id) {
    config.headers.Authorization = `Bearer ${session?.idToken}`;
  }
  return config;
});

export default api;
