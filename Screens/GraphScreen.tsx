import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import React, {useState, useEffect, isValidElement} from 'react';
import Header from '../Components/Header';
import Graph from '../Components/Graph';
import {GraphData} from '../Components/types';
import FooterNav from '../Components/FooterNav';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/Ionicons';
import PeriodSelector from '../Components/PeriodSelector';
import {
  getDailyData,
  getWeeklyData,
  getMonthlyData,
  DailyData,
  WeeklyData,
  MonthlyData,
} from '../Apis/getUnits';
import moment from 'moment';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../src/routes/AppStack';
import Loading from '../Components/Loading';

const {width, height} = Dimensions.get('window');
const transparent = 'rgba(0, 0, 0, 0.7)';

type GraphProps = NativeStackScreenProps<AppStackParamList, 'GraphScreen'>;

interface GraphScreenProps extends GraphProps {
  openModalDefault?: boolean;
}

const GraphScreen: React.FC<GraphScreenProps> = ({
  navigation,
  openModalDefault = false,
}) => {
  const [openModal, setopenModal] = useState(openModalDefault);
  const [selectedDataType, setSelectedDataType] = useState<
    'monthly' | 'weekly' | 'daily'
  >('daily');
  const [selectedChartType, setSelectedChartType] = useState<'line' | 'bar'>(
    'line',
  );
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [customData, setCustomData] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const [startDateTime, setStartDateTime] = useState('');
  // const [endDateTime, setEndDateTime] = useState('');

  const fetchData = async (
    type: 'daily' | 'weekly' | 'monthly' | 'custom',
    startDateTime?: string,
    endDateTime?: string,
  ) => {
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
          // if (startDateTime && endDateTime) {
          //   data = await getUnitsByDateTimeRange(startDateTime, endDateTime);
          //   setCustomData(data.unitsSum);
          // }
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
  const handleCustomPress = async (
    startDateTime: string,
    endDateTime: string,
    unitsData: string,
  ) => {
    // setStartDateTime(startDateTime);
    // setEndDateTime(endDateTime);
    setCustomData(unitsData);

    setopenModal(true);
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

  const formatData = (data: number[]): number[] =>
    data.map(value => parseFloat(value.toFixed(1)));

  const getData = (): GraphData => {
    switch (selectedDataType) {
      case 'daily':
        return {
          labels: getDailyLabels(dailyData),
          datasets: [{data: formatData(dailyData.map(data => data.unitsUsed))}],
        };
      case 'weekly':
        return {
          labels: getWeeklyLabels(weeklyData.length).reverse(),
          datasets: [
            {data: formatData(weeklyData.map(data => data.unitsUsed))},
          ],
        };
      case 'monthly':
        return {
          labels: getMonthlyLabels(monthlyData),
          datasets: [
            {data: formatData(monthlyData.map(data => data.unitsUsed))},
          ],
        };
      default:
        return {labels: [], datasets: []};
    }
  };

  //modal for custom data
  const renderModal = () => {
    return (
      <Modal
        visible={openModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setopenModal(false)}>
        <View style={styles.modalContainer}>

          <View style={styles.infoContainer}>
          <Image
          source={require('../Assets/finding.png')}
          style={[styles.mobileIcon, styles.elevatedLogo]}
        />
         <View style={[styles.predictionContainer, styles.elevatedLogo]}>
         <View style={styles.headingBox}>
            <Text style={[styles.headerText, styles.elevatedText]}>
              Units Consumed in selected range {'\n\n'}
              </Text>
              <View style={[styles.dataBox, styles.depthEffect]}>
              <View style={styles.unitBox}>
              {/* <Image
          source={require('../Assets/lightning.png')}
          style={[styles.iconUnit, styles.elevatedLogo]}
        /> */}
        <Icon3
              name="house-damage"
              style={[styles.iconUnit]}
            />
              <Text style={styles.units}>
                Units: {' '}
              {parseFloat(customData).toFixed(1)} 
            </Text>
            </View>
            <View style={styles.billBox}>
            {/* <Image
          source={require('../Assets/money.png')}
          style={[styles.iconCash, styles.elevatedLogo]}
        /> */}
         {/* <Icon2
              name="sack-dollar"
              style={[styles.iconCash]}
            />
         <Text style={styles.bill}>
               Bill: {' '}
            </Text> */}
            </View>
           
            <TouchableOpacity
            onPress={() => setopenModal(false)}
            activeOpacity={0.8}
            style={[styles.doneButton, styles.elevatedLogo]}>
            <Text style={styles.doneButtonText}>Seen</Text>
            <Icon4
              name="checkmark-circle-outline"
              style={[styles.iconDoneButton]}
            />
          </TouchableOpacity>
            </View>
            </View>
            </View>
          </View>
          

          </View>
         
          
        
      </Modal>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Header />

        <View style={styles.toggleChartContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleBarChartPress}
            style={[
              styles.chartbutton,
              styles.elevatedMidLayer,
              selectedChartType === 'bar'
                ? styles.buttonSelected
                : styles.buttonUnselected,
            ]}>
            <Icon
              name="bar-chart"
              style={[styles.iconGraph, styles.elevatedText]}
            />
            <Text style={styles.buttonText}>Bar Graph</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleLineChartPress}
            style={[
              styles.chartbutton,
              styles.elevatedMidLayer,
              selectedChartType === 'line'
                ? styles.buttonSelected
                : styles.buttonUnselected,
            ]}>
            <Icon2
              name="chart-line"
              style={[styles.iconGraph, styles.elevatedText]}
            />
            <Text style={styles.buttonText}>Line Chart</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          <Graph
            data={getData()}
            chartType={selectedChartType}
            dataType={selectedDataType}
          />
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleMonthlyPress}
            style={[
              styles.button,
              styles.elevatedMidLayer,
              selectedDataType === 'monthly'
                ? styles.buttonSelected
                : styles.buttonUnselected,
            ]}>
            <Text style={styles.buttonText}>Monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleWeeklyPress}
            style={[
              styles.button,
              styles.elevatedMidLayer,
              selectedDataType === 'weekly'
                ? styles.buttonSelected
                : styles.buttonUnselected,
            ]}>
            <Text style={styles.buttonText}>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleDailyPress}
            style={[
              styles.button,
              styles.elevatedMidLayer,
              selectedDataType === 'daily'
                ? styles.buttonSelected
                : styles.buttonUnselected,
            ]}>
            <Text style={styles.buttonText}>Daily</Text>
          </TouchableOpacity>
        </View>

        <View>
          <PeriodSelector onDateRangeSelected={handleCustomPress} />
        </View>

        <View style={styles.footerContainer}>
          <FooterNav navigation={navigation} />
        </View>
      </View>
      <Loading visible={isLoading} />
      {renderModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3FEF7',
    flexDirection: 'column',
  },

  graphContainer: {},

  buttonContainer: {
    flexDirection: 'row',
    marginTop: height * 0.002,
    justifyContent: 'space-around',
    marginHorizontal: width * 0.04,
  },
  toggleChartContainer: {
    flexDirection: 'row',
    marginTop: height * 0.01,
    justifyContent: 'space-around',
    marginHorizontal: width * 0.04,
  },
  chartbutton: {
    backgroundColor: '#77B0AA',
    height: height * 0.062,
    width: '44%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#77B0AA',
    height: height * 0.062,
    width: '30%',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: height * 0.02,
  },
  buttonText: {
    color: '#003C43',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    padding: 6,
  },
  buttonSelected: {
    backgroundColor: '#77B0AA',
  },
  buttonUnselected: {
    backgroundColor: '#EEF7FF',
  },
  footerContainer: {
    marginTop: height * 0.01,
  },
  iconGraph: {
    fontSize: 24,
    color: '#003C43',
    textAlign: 'center',
    marginBottom: 3,
  },

  //Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: transparent,
  },
  infoContainer: {
    backgroundColor: 'transparent',
    height: height * 0.42,
    width: width * 0.96,
    borderRadius: 8,
    alignItems: 'center',
    position: 'relative',
    alignContent:'center',
    alignSelf:'center',
  },
  predictionContainer: {
    backgroundColor: '#77B0AA',
    height: height * 0.18,
    alignItems: 'center',
    borderRadius: 8,
    width: width * 0.9,
    marginBottom: '2%',
    top:height*0.046,
    borderTopRightRadius:8,
    borderTopLeftRadius:8,
    alignSelf:'center',
    
  },
  mobileIcon: {
    height: height * 0.18,
    width: width * 0.7,
    left:width*0.1,
    opacity:1,
    borderRadius: 4,
    position: 'absolute', 
    bottom:height*0.353,
    zIndex: 2,
   
    
  },
  headingBox:{
    backgroundColor:'#77B0AA',
    height:height*0.06,
    width:width*0.9,
    borderTopRightRadius:12,
    borderTopLeftRadius:12,
    alignSelf:'center',

  },
  headerText: {
    fontSize: height * 0.024,
    color: 'white',
    fontWeight: '400',
    paddingTop:height*0.012,
    paddingLeft:width*0.08,
    // marginBottom: height * 0.08,
  },
  dataBox:{
    backgroundColor: 'rgba(255, 255, 255, 1)',
    height: height * 0.22,
    alignSelf: 'center',
    borderRadius: 12,
    width: width * 0.9,
    top:height*0.001,
    borderTopRightRadius:26,
    borderTopLeftRadius:26,
    padding:height*0.03,
    
    
    
  },
  unitBox:{
    flexDirection:'row',
    marginBottom:'7%'
    
  },
  units:{
    fontSize: height * 0.024,
    color: '#003C43',
    fontWeight: '600',
    
  },
  iconUnit:{
    color:'#003C43',
    fontSize:height*0.03,
     marginRight:'2%'
    // height:height*0.06,
    // width:width*0.12,
  },
billBox:{
  flexDirection:'row',
  marginBottom:'4%',
   
 
},
  bill: {
    fontSize: height * 0.024,
    color: '#003C43',
    fontWeight: '600',
    
    
  },

  iconCash:{
    color:'#003C43',
    fontSize:height*0.034,
    marginRight:'2%'
    // height:height*0.06,
    // width:width*0.12,
  },

  doneButton: {
    backgroundColor: '#77B0AA',
    height: height * 0.06,
    width: width*0.36,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    top:height*0.008
    
  },
  doneButtonText: {
    color: '#003C43',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    padding: 1,
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  iconDoneButton: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
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
    textShadowOffset: {width: 1, height: 2},
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
  depthEffect:{
    // shadowColor: 'black',
    // shadowOffset: {
    //   width: 10,
    //   height: 10,
    // },
    // shadowOpacity: 0.35,
    // shadowRadius: 8,
    elevation: 10,
  }
});

export default GraphScreen;
