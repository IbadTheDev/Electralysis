import React from 'react'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import SignUp, { FormValues } from '../../Screens/SignUp'
import SignIn from '../../Screens/SignIn'
import OtpScreen from '../../Screens/OtpScreen'
import AddDevice from '../../Screens/AddDevice';
import SendCredentials from '../../Screens/SendCredentials'; 
import ConnectDevice from '../../Screens/ConnectDevice'


export type AuthStackParamList ={
    SignUp: undefined;
    SignIn: undefined;
    OtpScreen: { verificationId: string | null; userData: any };
    
     
}
const Stack = createNativeStackNavigator<AuthStackParamList>();


export const AuthStack: React.FC = () => (

 <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="OtpScreen" component={OtpScreen} />
  </Stack.Navigator>
);

