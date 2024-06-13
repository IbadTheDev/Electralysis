import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import SplashScreen from '../Screens/SplashScreen'
import { Router } from './routes/Router';
import {AppwriteProvider} from '../src/appwrite/Context'


export type RootStackParamList = {
  SplashScreen: undefined;
  Router: undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();


    const App: React.FC = () => (
      <AppwriteProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Router" component={Router} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppwriteProvider>
    );
    

export default App;