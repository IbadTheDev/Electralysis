import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import FlatCards from '../Components/FlatCards'
import ElevatedCards from '../Components/ElevatedCards'
import FancyCard from '../Components/FancyCard'
import ActionCard from '../Components/ActionCard'
import SplashScreen from './SplashScreen'

const Home = () => {
  return (
    <SafeAreaView>
    <ScrollView>
      <SplashScreen/>
    </ScrollView>
    </SafeAreaView>

  )
}

export default Home