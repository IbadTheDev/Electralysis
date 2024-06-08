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
import Home from './Screens/Home'
import SplashScreen from './Screens/SplashScreen'
import SignIn from './Screens/SignIn'
import SignUp from './Screens/SignUp'
import OtpScreen from './Screens/OtpScreen'
import HomeScreen from './Screens/HomeScreen'
import StateChange from './Components/StateChange'
import GraphScreen from './Screens/GraphScreen'
import { FormValues } from './Screens/SignUp';
import AddDevice from './Screens/AddDevice';

const Stack = createStackNavigator<RootStackParamList>();

type RootStackParamList = {
  SignUp:undefined;
  SignIn:undefined;
  OtpScreen: { verificationId: string | null;userData: FormValues };
  HomeScreen:undefined;
}

function App(): JSX.Element{
  const isDarkMode = useColorScheme() === 'dark'
  return (
    <>
    <AddDevice/>
    </>
  //   <NavigationContainer>
  //     <Stack.Navigator initialRouteName="HomeScreen">
  //     <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
  //       <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
  //       <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
  //       <Stack.Screen name="OtpScreen" component={OtpScreen} options={{ headerShown: false }}/>
  //     </Stack.Navigator>
  //   </NavigationContainer>
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