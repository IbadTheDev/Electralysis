import React from 'react'

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


function App(): JSX.Element{
  const isDarkMode = useColorScheme() === 'dark'
  return (
    
    <>
     <SignIn/>
    </>
  
  )
  
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