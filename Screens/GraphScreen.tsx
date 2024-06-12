import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Graph from '../Components/Graph';
import { GraphData } from '../Components/types';
import FooterNav from '../Components/FooterNav';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import PeriodSelector from '../Components/PeriodSelector';
import { getDailyData, getWeeklyData, getMonthlyData, DailyData, WeeklyData, MonthlyData,getUnitsByDateTimeRange,UnitData } from '../Apis/getUnits';
import moment from 'moment';

const { width, height } = Dimensions.get('window');

const GraphScreen = () => {
  const [selectedDataType, setSelectedDataType] = useState<'monthly' | 'weekly' | 'daily' | 'custom'>('daily');
  const [selectedChartType, setSelectedChartType] = useState<'line' | 'bar'>('line');
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [customData, setCustomData] = useState<UnitData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (type: 'daily' | 'weekly' | 'monthly' | 'custom', startDateTime?: string, endDateTime?: string) => {
    setLoading(true);
    setError(null);
    try {
      let data;
      switch (type) {
        case 'daily':
          data = await getDailyData();
          setDailyData(data);
          break;
        case 'weekly':
          data = await getWeeklyData();
          setWeeklyData(data);
          break;
        case 'monthly':
          data = await getMonthlyData();
          setMonthlyData(data);
          break;
        case 'custom':
          if (startDateTime && endDateTime) {
            data = await getUnitsByDateTimeRange(startDateTime, endDateTime);
            setCustomData(data);
          }
          break;
      }
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedDataType);
  }, [selectedDataType]);

  const handleMonthlyPress = () => setSelectedDataType('monthly');
  const handleWeeklyPress = () => setSelectedDataType('weekly');
  const handleDailyPress = () => setSelectedDataType('daily');
  const handleCustomPress = async (startDateTime: string, endDateTime: string) => {
    // Set selected data type to custom
    setSelectedDataType('custom');
    // Fetch data based on custom time range
    await fetchData('custom', startDateTime, endDateTime);
  };
  const handleLineChartPress = () => setSelectedChartType('line');
  const handleBarChartPress = () => setSelectedChartType('bar');

  const getWeeklyLabels = (count: number): string[] => {
    const labels = [];
    for (let i = count - 1; i >= 0; i--) {
      if (i === 0) {
        labels.push('This week');
      } else if (i === 1) {
        labels.push('Last week');
      } else {
        labels.push(`${i} weeks ago`);
      }
    }
    return labels;
  };

  const getDailyLabels = (dailyData: DailyData[]): string[] => {
    return dailyData.map((data, index) => {
        const day = moment(data.dayOfWeek, 'dddd');
        if (index === 0) {
            return 'Today';
        } else if (index === 1) {
            return 'Yesterday';
        } else {
            return day.format('ddd');
        }
    });
};

const getMonthlyLabels = (monthlyData: MonthlyData[]): string[] => {
  return monthlyData.map((data, index) => {
      if (index === 0) {
          return 'This month';
      } else if (index === 1) {
          return 'Last month';
      } else {
          return moment(data.month).format('MMM YYYY'); 
      }
  });
};

const getCustomLabels = (customData: UnitData[]): string[] => {
  return customData.map(data => moment(data.dateTime).format('DD/MM/YYYY'));
};

  const formatData = (data: number[]): number[] => data.map(value => parseFloat(value.toFixed(1)));

  const getData = (): GraphData => {
    switch (selectedDataType) {
      case 'daily':
        return { labels: getDailyLabels(dailyData), datasets: [{ data: formatData(dailyData.map(data => data.unitsUsed)) }] };
      case 'weekly':
        return { labels: getWeeklyLabels(weeklyData.length).reverse(), datasets: [{ data: formatData(weeklyData.map(data => data.unitsUsed)) }] };
      case 'monthly':
        return { labels: getMonthlyLabels(monthlyData), datasets: [{ data: formatData(monthlyData.map(data => data.unitsUsed)) }] };
        case 'custom':
          return { labels: getCustomLabels(customData), datasets: [{ data: formatData(customData.map(data => data.unitsUsed)) }] };  
      default:
        return { labels: [], datasets: [] };
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
    {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <Graph data={getData()} chartType={selectedChartType} dataType={selectedDataType} />
      )}
      
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
    <PeriodSelector onDateRangeSelected={handleCustomPress} />
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