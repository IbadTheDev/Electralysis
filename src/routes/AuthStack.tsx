import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from '../../Screens/HomeScreen'
import SignUp from '../../Screens/SignUp'
import SignIn from '../../Screens/SignIn'

export type AuthStackParamList ={
    SignUp: undefined;
    SignIn: undefined;
}
const Stack = createNativeStackNavigator<AuthStackParamList>();


export const AuthStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false
        }}>
      <Stack.Screen name='SignUp' component={HomeScreen}/>
      <Stack.Screen name='SignIn' component={HomeScreen}/>
    </Stack.Navigator>
  )
}


