import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Text,
   View,
   SafeAreaView,
   StyleSheet,
   useColorScheme,
   ScrollView
  } from 'react-native'
import Home from '../Screens/Home'
import SplashScreen from '../Screens/SplashScreen'
import SignIn from '../Screens/SignIn'
import SignUp from '../Screens/SignUp'
import OtpScreen from '../Screens/OtpScreen'
import HomeScreen from '../Screens/HomeScreen'
import StateChange from '../Components/StateChange'
import GraphScreen from '../Screens/GraphScreen'
import { FormValues } from '../Screens/SignUp';
import AddDevice from '../Screens/AddDevice';
import ConnectDevice from '../Screens/ConnectDevice';
import { RootStackParamList } from '../android/app/src/type';
import SendCredentials from '../Screens/SendCredentials';
import { useNavigation } from '@react-navigation/native';

// const Stack = createStackNavigator<RootStackParamList>();

// type RootStackParamList = {
//   SignUp:undefined;
//   SignIn:undefined;
//   OtpScreen: { verificationId: string | null;userData: FormValues };
//   HomeScreen:undefined;
// }


const Stack = createStackNavigator<RootStackParamList>();

function App(): JSX.Element{
  const isDarkMode = useColorScheme() === 'dark'
  return (

    <NavigationContainer>
    <Stack.Navigator initialRouteName="AddDevice">
      <Stack.Screen name="AddDevice" component={AddDevice} options={{ headerShown: false }} />
      <Stack.Screen name="ConnectDevice" component={ConnectDevice} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
  );
 
}



const styles = StyleSheet.create({


  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent:'center',
  // },

  baseText:{
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Cochin'
  },

  lightText:{ 
    color: '#d3ecbc',
   
  },
  darkText:{
    color: '#000000'
  }

})

export default App;