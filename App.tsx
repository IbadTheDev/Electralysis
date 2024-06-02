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
import SplashScreen from './Screens/SplashScreen'
import SignIn from './Screens/SignIn'
import SignUp from './Screens/SignUp'
import OtpScreen from './Screens/OtpScreen'
import HomeScreen from './Screens/HomeScreen'
import StateChange from './Components/StateChange'
import GraphScreen from './Screens/GraphScreen'


function App(): JSX.Element{
  const isDarkMode = useColorScheme() === 'dark'
  return (
    
    <>
     <GraphScreen/>
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