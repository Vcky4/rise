import React, { createContext, useState, useEffect, ReactNode } from "react";
import useStorage from "../src/hooks/useStorage";

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

// Default values for the AuthContext to avoid returning null
const defaultAuthContext: AuthContextProps = {
  login: () => {},
  logout: () => {},
  saveToken: () => {},
  saveUser: () => {},
  onboard: () => {},
  isLoading: false,
  token: null,
  user: null,
  isOnboarded: false,
};

// Create the context with initial default values
export const AuthContext = createContext<AuthContextProps>(defaultAuthContext);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken, removeToken] = useStorage<string | null>('token', null);
  const [user, setUser, removeUser] = useStorage<User | null>('user', null);
  const [isOnboarded, setIsOnboarded, clearOnboarded] = useStorage<boolean>('onboarded', false);

  const login = (token: string, user: User) => {
    setIsLoading(true);
    setToken(token);
    setUser(user);
    setIsLoading(false);
  };

  const saveToken = (token: string) => {
    setIsLoading(true);
    setToken(token);
    setIsLoading(false);
  };

  const saveUser = (user: User) => {
    setIsLoading(true);
    setUser(user);
    setIsLoading(false);
  };

  const onboard = () => {
    setIsOnboarded(true);
  };

  const logout = () => {
    setIsLoading(true);
    removeToken();
    removeUser();
    setIsLoading(false);
  };

 

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
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
