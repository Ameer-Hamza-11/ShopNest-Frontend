import type { AuthContextType } from "@/providers/AuthProvider";
import { createContext } from "react";

export const AuthContext =
  createContext<AuthContextType | null>(null);
