import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from '../../Screens/HomeScreen'
import Home from '../../Screens/Home'

export type AppStackParamList ={
    HomeScreen: undefined;
}
const Stack = createNativeStackNavigator<AppStackParamList>();


export const AppStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false
        }}>
      <Stack.Screen name='HomeScreen' component={HomeScreen}/>
    </Stack.Navigator>
  )
}

