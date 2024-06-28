import React, {useContext, useEffect, useState} from 'react';
import {Context} from '../appwrite/Context';
import Loading from '../../Components/Loading';
import {AuthStack} from '../routes/AuthStack';
import {AppStack} from '../routes/AppStack';

export const Router: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {appwrite, isLoggedIn, setIsLoggedIn, setIsInitialSetupComplete} =
    useContext(Context);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const user = await appwrite.getCurrentUser();
        setIsLoading(false);
        if (user) {
          setIsLoggedIn(true);
          const setupComplete = await appwrite.isInitialSetupComplete(user.$id);
          setIsInitialSetupComplete(setupComplete);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setIsLoading(false);
        setIsLoggedIn(false);
      }
    };

    checkUserStatus();
  }, [appwrite, setIsLoggedIn, setIsInitialSetupComplete]);
  if (isLoading) {
    return <Loading visible={isLoading} />;
  }
  return isLoggedIn ? <AppStack /> : <AuthStack />;
};
