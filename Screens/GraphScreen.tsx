import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '../Components/Header'
import Graph from '../Components/Graph';
import { GraphData } from '../Components/types';
import FooterNav from '../Components/FooterNav';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import PeriodSelector from '../Components/PeriodSelector';


const { width, height } = Dimensions.get('window');



const dailyData: GraphData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [20, 45, 28, 34, 52, 43, 43],
    },
  ],
};

const weeklyData: GraphData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      data: [64, 98, 86, 93],
    },
  ],
};

const monthlyData: GraphData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      data: [146, 68, 175, 251, 302, 358, 294, 256, 333, 345, 292, 212],
    },
  ],
};



const GraphScreen = () => {

  const [selectedDataType, setSelectedDataType] = useState<'monthly' | 'weekly' | 'daily'>('daily');
  const [selectedChartType, setSelectedChartType] = useState<'line' | 'bar'>('line');
    
  const handleMonthlyPress = () => {
        setSelectedDataType('monthly');
    };

    const handleWeeklyPress = () => {
        setSelectedDataType('weekly');
    };

    const handleDailyPress = () => {
        setSelectedDataType('daily');
    };

    const handleLineChartPress = () => {
      setSelectedChartType('line');
    };
  
    const handleBarChartPress = () => {
      setSelectedChartType('bar');
    };
    
  const getData = (): GraphData => {
    switch (selectedDataType) {
      case 'daily':
        return dailyData;
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return monthlyData;
      default:
        return dailyData;
    }
  };

  return (
    <>
    <View style={styles.container}>
    <Header/>

    <View style={styles.toggleChartContainer}>
      <TouchableOpacity activeOpacity={0.8} onPress={handleBarChartPress} style={[styles.chartbutton, styles.elevatedMidLayer, selectedChartType === 'bar' ? styles.buttonSelected : styles.buttonUnselected]}>
      <Icon name="bar-chart" style={[styles.iconGraph, styles.elevatedText]} />
          <Text style={styles.buttonText}>Bar Graph</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={handleLineChartPress} style={[styles.chartbutton, styles.elevatedMidLayer, selectedChartType === 'line' ? styles.buttonSelected : styles.buttonUnselected]}>
      <Icon2 name="chart-line" style={[styles.iconGraph, styles.elevatedText]} />
          <Text style={styles.buttonText}>Line Chart</Text>
      </TouchableOpacity>
    </View>

    <Graph data={getData()} chartType={selectedChartType} dataType={selectedDataType}/>

    <View style={styles.buttonContainer}>
      <TouchableOpacity activeOpacity={0.8} onPress={handleMonthlyPress} style={[styles.button, styles.elevatedMidLayer, selectedDataType === 'monthly' ? styles.buttonSelected : styles.buttonUnselected]}>
          <Text style={styles.buttonText}>Monthly</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={handleWeeklyPress} style={[styles.button, styles.elevatedMidLayer, selectedDataType === 'weekly' ? styles.buttonSelected : styles.buttonUnselected]}>
          <Text style={styles.buttonText}>Weekly</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={handleDailyPress} style={[styles.button, styles.elevatedMidLayer, selectedDataType === 'daily' ? styles.buttonSelected : styles.buttonUnselected]}>
          <Text style={styles.buttonText}>Daily</Text>
      </TouchableOpacity>
    </View>
    
    <View>
      <PeriodSelector/>
    </View>

    <View style={styles.footerContainer}>
      <FooterNav/>
    </View>
    </View>  
    </>
  )
}

export default GraphScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E3FEF7",
        flexDirection:'column',
       
      
    },
    
    graphContainer:{},

    buttonContainer: {
      flexDirection: 'row',
      marginTop: height*0.002,
      justifyContent: 'space-around',
      marginHorizontal:width*0.04
  },
  toggleChartContainer:{
    flexDirection: 'row',
    marginTop: height*0.01,
    justifyContent: 'space-around',
    marginHorizontal:width*0.04
  },
  chartbutton: {
    backgroundColor: '#77B0AA',
    height:height*0.062,
    width:'44%',
    borderRadius: 8,
    justifyContent:'center',
    alignItems:'center',
    marginTop:height*0.02,
    flexDirection:'row',
},
  button: {
      backgroundColor: '#77B0AA',
      height:height*0.062,
      width:'30%',
      borderRadius: 10,
      justifyContent:'center',
      marginTop:height*0.02
  },
  buttonText: {
      color: '#003C43',
      fontSize: 16,
      fontWeight: '800',
      textAlign:'center', 
      padding:6 
  },
  buttonSelected:{
      backgroundColor:'#77B0AA'
  },
  buttonUnselected: { 
      backgroundColor: '#EEF7FF',
  },
  footerContainer:{
    marginTop:height*0.01
  },
  iconGraph: {
    fontSize: 24,
    color: '#003C43',
    textAlign: 'center',
    marginBottom: 3
  },

  elevatedLogo: {
      shadowColor: 'black',
      shadowOffset: {
          width: 30,
          height: 20,
      },
      shadowOpacity: 0.8,
      shadowRadius: 15,
      elevation: 20,
  },
  elevatedText: {
      textShadowColor: 'rgba(0, 0, 0, 0.25)',
      textShadowOffset: { width: 1, height: 2 },
      textShadowRadius: 10,
  },
  elevatedMidLayer: {
    shadowColor: 'black',
    shadowOffset: {
        width: 20,
        height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 8,
},
})