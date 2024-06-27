import React, {FC, PropsWithChildren, createContext, useState} from 'react';
import Appwrite from './service';

type AppContextType = {
  appwrite: Appwrite;
  isLoggedIn: boolean;
  isInitialSetupComplete: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setIsInitialSetupComplete: (isComplete: boolean) => void;
};

export const Context = createContext<AppContextType>({
  appwrite: new Appwrite(),
  isLoggedIn: false,
  isInitialSetupComplete: false,
  setIsLoggedIn: () => {},
  setIsInitialSetupComplete: () => {},
});

export const AppwriteProvider: FC<PropsWithChildren> = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitialSetupComplete, setIsInitialSetupComplete] = useState(false);
  const defaultValue = {
    appwrite: new Appwrite(),
    isLoggedIn,
    isInitialSetupComplete,
    setIsLoggedIn,
    setIsInitialSetupComplete,
  };

  return <Context.Provider value={defaultValue}>{children}</Context.Provider>;
};

export default Context;
