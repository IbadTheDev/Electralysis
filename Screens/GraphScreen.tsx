import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState, useEffect, isValidElement} from 'react';
import Header from '../Components/Header';
import Graph from '../Components/Graph';
import {GraphData} from '../Components/types';
import FooterNav from '../Components/FooterNav';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
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
const transparent = 'rgba(0, 0, 0, 0.5)';

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
    setIsLoading(true);
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
      setIsLoading(false);
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
          {/* <View style={styles.infoContainer}> */}
          <View style={[styles.predictionContainer, styles.elevatedLogo]}>
            <Text style={styles.units}>
              Your electricity usage in the selected time period is:{'\n\n'}
              {parseFloat(customData).toFixed(1)} units{' '}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setopenModal(false)}
            activeOpacity={0.8}
            style={[styles.doneButton, styles.elevatedLogo]}>
            <Text style={styles.doneButtonText}>Seen</Text>
            <Icon2 name="check" style={[styles.iconDoneButton]} />
          </TouchableOpacity>

          {/* </View> */}
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
    backgroundColor: 'white',
    padding: '1%',
    height: height * 0.42,
    width: width * 0.96,
    borderRadius: 8,
    alignItems: 'center',
  },
  predictionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    height: height * 0.3,
    paddingTop: '5%',
    alignItems: 'center',
    borderRadius: 10,
    width: width * 0.92,
    margin: '2%',
  },
  units: {
    fontSize: height * 0.03,
    color: '#003C43',
    fontWeight: '600',
    marginBottom: height * 0.08,
  },
  bill: {
    fontSize: height * 0.03,
    color: '#003C43',
    fontWeight: '600',
    marginBottom: height * 0.05,
  },

  doneButton: {
    backgroundColor: '#77B0AA',
    height: height * 0.062,
    width: '50%',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: height * 0.01,
    flexDirection: 'row',
  },
  doneButtonText: {
    color: '#003C43',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    padding: 4,
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  iconDoneButton: {
    fontSize: 38,
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
});

export default GraphScreen;
