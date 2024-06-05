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
import SplashScreen from './Components/SplashScreen'
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'
import OtpScreen from './Components/OtpScreen'
import HomeScreen from './Components/HomeScreen'
import StateChange from './Components/StateChange'
import { FormValues } from './Components/SignUp';

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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="SignIn" component={SignIn}/>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
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