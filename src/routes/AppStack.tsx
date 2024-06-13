import React, { useContext } from 'react'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from '../../Screens/HomeScreen'
import GraphScreen from '../../Screens/GraphScreen';
import AddDevice from '../../Screens/AddDevice';
import ConnectDevice from '../../Screens/ConnectDevice';
import SendCredentials from '../../Screens/SendCredentials';
import { Context } from '../appwrite/Context';


export type AppStackParamList = {
  HomeScreen: undefined;
  GraphScreen: undefined;
  AddDevice: { userData: any };
  ConnectDevice: { device: any };
  SendCredentials: { device: any };
};

const Stack = createNativeStackNavigator<AppStackParamList>();


export const AppStack: React.FC = () => {
  const { isInitialSetupComplete } = useContext(Context);

  return(

  <Stack.Navigator screenOptions={{ headerShown: false }}>
     {!isInitialSetupComplete ? (
      <>
        <Stack.Screen name="AddDevice" component={AddDevice} />
        <Stack.Screen name="ConnectDevice" component={ConnectDevice} />
        <Stack.Screen name="SendCredentials" component={SendCredentials} />
      </>
       ) : (
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="GraphScreen" component={GraphScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

