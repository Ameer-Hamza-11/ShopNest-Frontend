import { AuthContext } from "@/context/AuthContext";
import { useState, type ReactNode } from "react";

export type UserData = {
  userId: string;
  email: string;
  name: string;
  role: string;
  token: string;
};

export type AuthContextType = {
  user: UserData | null;
  login: (userData: UserData) => void;
  logout: () => void;
};
export const AuthProvider = ({ children }: {children: ReactNode}) => {
  const [user, setUser] = useState<UserData | null>(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData: UserData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
