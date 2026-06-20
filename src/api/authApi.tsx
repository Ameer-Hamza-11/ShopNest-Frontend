import { api } from "./api";
import type {
  LoginInput,
  RegisterInput,
  verifyEmailInput,
} from "../schemas/auth.schema";

export type RegisterResponse = {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    verified: boolean;
    token: string;
  };
};
export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    verified: boolean;
    token: string;
  };
};

export type VerifyEmailResponse = {
  success: boolean;
  message: string;
  response: string;
};

export const registerApi = async (
  data: RegisterInput
): Promise<RegisterResponse> => {
  try {
    const res = await api.post("/auth/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loginApi = async (data: LoginInput): Promise<LoginResponse> => {
  try {
    const res = await api.post("/auth/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyEmailApi = async (data: verifyEmailInput): Promise<VerifyEmailResponse> => {
  try {
    const res = await api.post("/auth/verify-email", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
