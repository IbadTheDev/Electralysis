import React from 'react'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import SignUp, { FormValues } from '../../Screens/SignUp'
import SignIn from '../../Screens/SignIn'
import OtpScreen from '../../Screens/OtpScreen'
import AddDevice from '../../Screens/AddDevice';
import SendCredentials from '../../Screens/SendCredentials'; 
import ConnectDevice from '../../Screens/ConnectDevice'
import { AuthStackParamList } from '../types/navigation';


const Stack = createNativeStackNavigator<AuthStackParamList>();


export const AuthStack = () => (

 <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="OtpScreen" component={OtpScreen} />
    <Stack.Screen name="AddDevice" component={AddDevice} />
    <Stack.Screen name="ConnectDevice" component={ConnectDevice} />
    <Stack.Screen name="SendCredentials" component={SendCredentials} />
  </Stack.Navigator>
);

