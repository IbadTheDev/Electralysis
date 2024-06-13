import React, { useContext, useEffect, useState } from 'react'
import {Context} from '../appwrite/Context'
import Loading from '../../Components/Loading';
import { AuthStack } from '../routes/AuthStack';
import { AppStack } from '../routes/AppStack';



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
   <>
    {isLoggedIn? <AppStack/> : <AuthStack/>}
   </>
  )
};

