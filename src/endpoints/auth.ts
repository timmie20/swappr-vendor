/**
 * Api endpoints related to authentication
 * */

import axiosInstance from "@/helpers/axiosInstance";
import { LoginCredentials } from "@/types";

export const authEndpoints = {
  async login(credentials: LoginCredentials) {
    const { data } = await axiosInstance.post("/auth/login", credentials);
    return data;
  },
};
