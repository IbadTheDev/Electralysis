import { View, Text } from 'react-native'
import React, { FC, PropsWithChildren, createContext, useState } from 'react'
import Appwrite from './service'

type AppContextType = {
    appwrite: Appwrite;
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void
}

export const Context = createContext<AppContextType>({
    appwrite:  new Appwrite(),
    isLoggedIn: false,
    setIsLoggedIn: () => {}
})

export const AppwriteProvider: FC<PropsWithChildren>= ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const defaultValue={
        appwrite:  new Appwrite(),
        isLoggedIn,
        setIsLoggedIn,
    }

  return (
    <Context.Provider value={defaultValue}>
      {children}
    </Context.Provider>
  )
}

export default Context