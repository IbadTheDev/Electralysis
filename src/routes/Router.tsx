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
        if (user) {
          setIsLoggedIn(true);
          const setupComplete = await appwrite.isInitialSetupComplete(user.$id);
          setIsInitialSetupComplete(setupComplete);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkUserStatus();
  }, [appwrite, setIsLoggedIn, setIsInitialSetupComplete]);
  if (isLoading) {
    return <Loading visible={isLoading} />;
  }
  return isLoggedIn ? <AppStack /> : <AuthStack />;
};
