import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {Context} from '../appwrite/Context'
import Loading from '../../Components/Loading'

//Routes
import { AppStack } from './AppStack'
import { AuthStack } from './AuthStack'



export const Router = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const {appwrite, isLoggedIn, setIsLoggedIn } = useContext(Context)

    useEffect(() => {
     appwrite.getCurrentUser()
     .then(response=>{
        setIsLoading(false)
        if(response) {
            setIsLoggedIn(true)
        }
     })
     .catch(_ => {
        setIsLoading(false)
        setIsLoggedIn(false)
     })
    }, [appwrite, setIsLoggedIn])
    
    if(isLoading) {
        return <Loading/>
    }
  return (
   <NavigationContainer>
    {isLoggedIn? <AppStack/> : <AuthStack/>}
   </NavigationContainer>
  )
}
