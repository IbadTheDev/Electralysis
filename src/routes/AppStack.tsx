import React from 'react'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from '../../Screens/HomeScreen'
import GraphScreen from '../../Screens/GraphScreen';


export type AppStackParamList = {
  HomeScreen: undefined;
  GraphScreen: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();


export const AppStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="GraphScreen" component={GraphScreen} />
  </Stack.Navigator>
);

