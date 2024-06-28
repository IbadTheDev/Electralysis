import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {LineChart, BarChart} from "react-native-chart-kit";
import { GraphData } from './types';


const { width, height } = Dimensions.get('window');

  interface GraphProps {
    data: GraphData;
    chartType: 'line' | 'bar';
    dataType: 'monthly' | 'weekly' | 'daily';
  }

  interface DataPointClickEvent {
    value: number;
    index: number;
    x: number;
    y: number;
  }

  const Graph: React.FC<GraphProps> = ({ data, chartType = 'line', dataType = 'monthly' }) => {
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 });
  
  const getChartConfig = () => {
    let barPercentage = 0.5;
    if (dataType === 'monthly') {
      barPercentage = 0.2;
    } else if (dataType === 'weekly') {
      barPercentage = 0.8;
    } else if (dataType === 'daily') {
      barPercentage = 0.4;
    }

    return {
      backgroundColor: "#E3FEF7",
      backgroundGradientFrom: "#77B0AA",
      backgroundGradientTo: "#135D66",
      decimalPlaces: 1,
      color: (opacity = 1) => `rgba(227, 254, 247, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(227, 254, 247, ${opacity})`,
      style: {
        borderRadius: 10,
      },
      propsForDots: {
        r: "4",
        strokeWidth: "1.8",
        stroke: "#003C43",
      },
      barPercentage,
      propsForBackgroundLines: {
        strokeWidth: "0.3",
        strokeDashoffset: "0",
        transform: [{ translateX: -2 }, { translateY: 10 }],
      },
      propsForVerticalLabels: {
        fontSize: 10,
        fontWeight: 'bold',
        transform: [{ translateX: -20 }, { translateY:2 }],
      },
      propsForHorizontalLabels: {
        fontSize: 11,
        fontWeight: 'bold',
        transform: [{ translateX: -2 }, { translateY:4 }],
      },
    };
  };


  
  const handleDataPointClick = ({ value, index, x, y }: DataPointClickEvent) => {
    const xOffset = 10; // Offset to move the tooltip slightly to the right
    setTooltipPos({ x: x + xOffset, y: y - 4, value, visible: true });
    
        // Hide the tooltip after 3 seconds
    setTimeout(() => {
      setTooltipPos((prevState) => ({ ...prevState, visible: false }));
    }, 3000);
  };


  return (
    <>
    <View style={styles.graphContainer}>
  {/* <Text style={styles.title}>Usage Trend:</Text> */}
  <View style={[styles.chartContainer, styles.elevatedLogo]}>
  {chartType === 'line' ? (
  <LineChart
    data= {data}
    width={Dimensions.get('window').width*0.98}
    height={Dimensions.get('window').height*0.4}
    yAxisLabel=""
    yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    verticalLabelRotation={90}
    fromZero
    
    
    chartConfig={getChartConfig()}
    bezier
    style={{
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    onDataPointClick={handleDataPointClick}
   
    

  />
) : (
  <View>
  <BarChart
  data={data}
  width={Dimensions.get('window').width * 0.99}
  height={Dimensions.get('window').height * 0.4}
  yAxisLabel=""
  yAxisSuffix=""
  yAxisInterval={1}
  verticalLabelRotation={90}
  fromZero
  showBarTops
  showValuesOnTopOfBars
  chartConfig={getChartConfig()}
  style={{
    borderRadius: 14,
    marginHorizontal: 10, 
    shadowColor: 'black',
      shadowOffset: {
          width: 30,
          height: 20,
      },
      shadowOpacity: 0.8,
      shadowRadius: 15,
      elevation: 20, 
  }}
  yLabelsOffset={12} // Shift Y-axis labels to the left
  xLabelsOffset={1} // Shift X-axis labels to the left
  
/>

</View>
)}

  {tooltipPos.visible && (
    <View style={[styles.tooltip, { top: tooltipPos.y - 36, left: tooltipPos.x - 34 }]}>
      <Text style={styles.tooltipText}>{tooltipPos.value.toFixed(1)} units</Text>
    </View>
  )}

  </View>
  </View>
</>
  )
}

export default Graph;

const styles = StyleSheet.create({
    graphContainer:{
      marginTop:height*0.02
      
    },
    title:{
      color:'#003C43',
      fontSize:18,
      textAlign:'left',
      marginLeft:width*0.02,
      marginTop:height*0.01,
      marginBottom:height*0.002,
      fontWeight:'700'

    },
    chartContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    tooltip: {
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      padding: 5,
      borderRadius: 5,
      zIndex: 1000,
    },
    tooltipText: {
      color: 'white',
      fontSize: 13,
    },
    elevatedLogo: {
      shadowColor: 'black',
      shadowOffset: {
          width: 30,
          height: 30,
      },
      shadowOpacity: 0.8,
      shadowRadius: 15,
      elevation: 20,
  },
})