import React, { createContext, useState, useEffect, ReactNode } from "react";
import useStorage from "../src/hooks/useStorage";
import IUser from "../src/network/models/IUser";


interface AuthContextProps {
  login: (token: string, user: IUser) => void;
  logout: () => void;
  saveToken: (token: string) => void;
  saveUser: (user: IUser) => void;
  onboard: () => void;
  setPin: (pin: string) => void;
  confirmPin: (pin: string) => boolean;
  pin: string | null;
  isLoading: boolean;
  token: string | null;
  user: IUser | null;
  isOnboarded: boolean;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

// Default values for the AuthContext to avoid returning null
const defaultAuthContext: AuthContextProps = {
  login: () => { },
  logout: () => { },
  saveToken: () => { },
  saveUser: () => { },
  onboard: () => { },
  setPin: () => { },
  confirmPin: () => false,
  pin: null,
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
  const [user, setUser, removeUser] = useStorage<IUser | null>('user', null);
  const [isOnboarded, setIsOnboarded, clearOnboarded] = useStorage<boolean>('onboarded', false);
  const [pin, savePin, removePin] = useStorage<string | null>('pin', null);

  const login = (token: string, user: IUser) => {
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

  const saveUser = (user: IUser) => {
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
    removePin();
    setIsLoading(false);
  };

  const setPin = (pin: string) => {
    //encrypt pin
    savePin(pin);
  };

  const confirmPin = (confirmPin: string) => {
    //decrypt pin
    if (pin === confirmPin) {
      return true;
    } else {
      return false;
    }
  }



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
        pin,
        setPin,
        confirmPin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
