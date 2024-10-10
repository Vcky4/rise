import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the types for the context and the props
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextProps {
  login: (token: string, user: User) => void;
  logout: () => void;
  saveToken: (token: string) => void;
  saveUser: (user: User) => void;
  onboard: () => void;
  isLoading: boolean;
  token: string | null;
  user: User | null;
  isOnboarded: boolean;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

// Create the context with initial value as `null`
export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);

  const login = (token: string, user: User) => {
    setIsLoading(true);
    setToken(token);
    setUser(user);
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("user", JSON.stringify(user));
    setIsLoading(false);
  };

  const saveToken = (token: string) => {
    setIsLoading(true);
    setToken(token);
    AsyncStorage.setItem("token", token);
    setIsLoading(false);
  };

  const saveUser = (user: User) => {
    setIsLoading(true);
    setUser(user);
    AsyncStorage.setItem("user", JSON.stringify(user));
    setIsLoading(false);
  };

  const onboard = () => {
    setIsOnboarded(true);
    AsyncStorage.setItem("onboarded", "true");
  };

  const logout = () => {
    setIsLoading(true);
    setToken(null);
    AsyncStorage.removeItem("token");
    setUser(null);
    AsyncStorage.removeItem("user");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("user");
      const onboarded = await AsyncStorage.getItem("onboarded");

      setIsOnboarded(onboarded === "true");
      setToken(token);
      setUser(user ? JSON.parse(user) : null);
      setIsLoading(false);
    } catch (error) {
      console.log(`isLoggedIn error: ${error}`);
    }
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        saveToken,
        saveUser,
        onboard,
        isLoading,
        token,
        user,
        isOnboarded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
