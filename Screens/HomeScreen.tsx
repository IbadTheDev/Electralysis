import { Image, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect,useRef  } from 'react';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Foundation';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/Octicons';
import Header from '../Components/Header';
import FooterNav from '../Components/FooterNav';
import { getDailyData, getWeeklyData, getMonthlyData, DailyData, WeeklyData, MonthlyData } from '../Apis/getUnits';
// import { getLatestUnit } from '../Apis/getLatestUnit';'
import { v4 as uuidv4 } from 'uuid';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {

    const { width, height } = Dimensions.get('window');
    const [unit, setUnit] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [selectedDataType, setSelectedDataType] = useState<'monthly' | 'weekly' | 'daily'>('daily');
    const [dailyData, setDailyData] = useState<DailyData[]>([]);
    const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
    const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data;
                if (selectedDataType === 'daily') {
                    data = await getDailyData();
                    setDailyData(data);
                } else if (selectedDataType === 'weekly') {
                    data = await getWeeklyData();
                    setWeeklyData(data);
                } else if (selectedDataType === 'monthly') {
                    data = await getMonthlyData();
                    setMonthlyData(data);
                }
                console.log(data); // Log the fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [selectedDataType]);

    useEffect(() => {
        // Scroll to the initial position whenever selectedDataType changes
        scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
      }, [selectedDataType]);
      
    // useEffect(() => {
    //     const fetchUnit = async () => {
    //         const latestUnit = await getLatestUnit();
    //         setUnit(latestUnit);
    //         setLoading(false);
    //     };

    //     fetchUnit();
    //     const interval = setInterval(fetchUnit, 5000); // Fetch every 5 seconds

    //     return () => clearInterval(interval); // Cleanup on unmount
    // }, []);

    const [isPeakHours, setIsPeakHours] = useState(false);
    useEffect(() => {
        const checkPeakHours = () => {
            const now = moment();
            const month = now.month(); // 0-11, where 0 is January and 11 is December
            const currentHour = now.hour();
            const currentMinute = now.minute();

            let peakStart, peakEnd;

            if (month >= 3 && month <= 9) { // April to October
                peakStart = moment().set({ hour: 18, minute: 30 }); // 6:30 PM
                peakEnd = moment().set({ hour: 22, minute: 30 }); // 10:30 PM
            } else { // November to March
                peakStart = moment().set({ hour: 18, minute: 0 }); // 6:00 PM
                peakEnd = moment().set({ hour: 22, minute: 0 }); // 10:00 PM
            }

            if (now.isBetween(peakStart, peakEnd)) {
                setIsPeakHours(true);
            } else {
                setIsPeakHours(false);
            }
        };

        checkPeakHours(); // Initial check
        const intervalId = setInterval(checkPeakHours, 60000); // Check every minute

        return () => clearInterval(intervalId); // Clean up on unmount
    }, []);


    const handleMonthlyPress = () => {
        setSelectedDataType('monthly');
    };

    const handleWeeklyPress = () => {
        setSelectedDataType('weekly');
    };

    const handleDailyPress = () => {
        setSelectedDataType('daily');
    };

    const selectedData = selectedDataType === 'monthly' ? monthlyData : selectedDataType === 'weekly' ? weeklyData : dailyData;
    return (
        <View style={styles.container}>
         <Header/>

            <View style={[styles.mainCard, isPeakHours ? styles.peakMainCard : styles.elevatedLogo]}>
                <View style={styles.peakHoursContainer}>
                    <Text style={[styles.elevatedText, isPeakHours ? styles.peakHoursTextOn : styles.peakHoursTextOff]}>
                        {isPeakHours ? "Peak-Hours: ON" : "Peak-Hours: OFF"}
                    </Text>
                </View>
                <View style={styles.dataCard}>
                    <TouchableOpacity>
                        <Icon style={[styles.elevatedText, isPeakHours ? styles.plugIconPeakhours : styles.plugIcon]} name="plug" />
                        <Text style={[styles.realTimeText, styles.elevatedText]}>
                        {unit !== null ? `${unit} kWh` : 'Loading...'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cardTitleContainer}>
                    <Text style={styles.dataTitle}>
                        Real-Time Usage
                    </Text>
                </View>
            </View>
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

            <ScrollView
                ref={scrollViewRef}
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContentContainer}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                snapToInterval={width * 1.0} // Adjust this value to match the width of the card + margin
                decelerationRate="fast"
                snapToAlignment="start"
            >
                {Array.isArray(selectedData) && selectedData.map(data => (
                <View key={data.uid} style={[styles.midLayerContainer, styles.elevatedMidLayer]}>
                    <View style={styles.cardMonthContainer}>
                    <Text style={[styles.monthText, styles.elevatedText]}>
                {selectedDataType === 'monthly' ? moment((data as MonthlyData).month).format('MMMM YYYY') : selectedDataType === 'weekly' ? `Week of ${(moment((data as WeeklyData).weekStart)).format('YYYY-MM-DD')}` : (data as DailyData).dayOfWeek}
              </Text>
              {data.time ? (
                                <Text>{String(data.time)}</Text>
                            ) : null}
                    </View>
                    <View style={[styles.cardTimeContainer]}>
                        <Text style={[styles.timeDataText, styles.elevatedText]}>
                         ∞
                        </Text>
                        <Text style={styles.timeTitleText}>Time</Text>
                    </View>
                    <View style={styles.cardCostContainer}>
                        <Text style={[styles.costDataText, styles.elevatedText]}>
                        {data.cost !== undefined ? String(data.cost.toFixed(1)) : 'N/A'}
                        </Text>
                        <Text style={styles.costTitleText}>Cost</Text>
                    </View>
                    <View style={styles.cardUnitsContainer}>
                        <Text style={[styles.unitsDataText, styles.elevatedText]}>
                        {data.unitsUsed !== undefined ? String(data.unitsUsed.toFixed(1)) : 'N/A'}
                        </Text>
                        <Text style={styles.unitsTitleText}>Units Used</Text>
                    </View>
                </View>
                ))}
            </ScrollView>
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity activeOpacity={0.8}  style={[styles.bottomButton, styles.elevatedMidLayer]}>
                <Icon4 name="graph" style={[styles.iconGraph, styles.elevatedText]} />
                    <Text style={styles.bottomButtonText}>Bill Estimate</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8}  style={[styles.bottomButton, styles.elevatedMidLayer]}>
                <Icon3 name="time-outline" style={[styles.iconPeak, styles.elevatedText]} />
                    <Text style={styles.bottomButtonText}>Peak-Hours</Text>
                </TouchableOpacity>
            </View>

            <FooterNav/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E3FEF7"
    },
   
    mainCard: {
        backgroundColor: '#EEF7FF',
        marginTop: height*0.030,
        justifyContent: 'center',
        alignSelf: 'center',
        height: '40%',
        width: '80%',
        borderRadius: 300,
        borderWidth: 18,
        borderColor: '#135D66'
    },
    peakMainCard: {
        borderColor: '#BB5A5A',
        shadowColor: '#EF4B4B',
        shadowOffset: {
            width: 20,
            height: 30,
        },
        shadowOpacity: 0.9,
        shadowRadius: 26,
        elevation: 30,
    },
    peakHoursContainer: {
        alignContent:'center',
        marginBottom:'5%',  
    },
    peakHoursTextOn: { 
        color: '#EF4B4B',
        fontWeight: '600',
        fontSize: 18,
        height: 34,
        textAlign: 'center',
        justifyContent:'center',
        padding: 4,
        borderRadius: 12,
    },
    peakHoursTextOff: {
        color: 'grey',
        fontWeight: '600',
        fontSize: 16, // Adjust this percentage as needed
        height: 34,
        textAlign: 'center',
        padding: 4,
        borderRadius: 12,
    },
    plugIconPeakhours: {
        color: '#BB5A5A',
        fontWeight: '600',
        fontSize: 34,
        justifyContent: 'center',
        alignSelf: 'center',
    },

    cardTitleContainer: {},
    dataCard: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    realTimeText: {
        color: '#003C43',
        fontSize: 44,
        fontWeight: '700',
        textAlign: 'center',
        justifyContent: 'center',
    },
    plugIcon: {
        color: '#135D66',
        fontWeight: '600',
        fontSize: 34,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    dataTitle: {
        color: '#135D66',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom:10
    },

    scrollContentContainer:{
    },
    midLayerContainer: {
        backgroundColor: '#77B0AA', 
        flexDirection: 'row',
        marginHorizontal:4,
        height: height*0.106, 
        width: width*0.98, // Adjust this width as necessary to match snapToInterval
        borderRadius: 10,
    },
    cardMonthContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width*0.3,
        borderRightWidth:0.2,
        borderColor:'lightgrey',
    },
    monthText: {
        color: '#135D66',
        fontSize: 22,
        fontWeight: '700',
    },
    cardTimeContainer: {
        flex: 1,
        justifyContent: 'center',
        borderRightWidth:0.2,
        borderColor:'lightgrey',
        width:width*0.3,
        paddingRight:width*0.01
    },
    timeTitleText: {
        color: '#135D66',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 14
    },
    timeDataText: {
        color: '#003C43',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700'
    },
    cardCostContainer: {
        flex: 1,
        justifyContent: 'center',
        borderRightWidth:0.2,
        borderColor:'lightgrey',
        margin: 8,
        paddingRight:6,
    },
    costTitleText: {
        color: '#135D66',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 14
    },
    costDataText: {
        color: '#003C43',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700'
    },
    cardUnitsContainer: {
        flex: 1,
        justifyContent: 'center',
        margin: 8,
        paddingRight:6,
    },
    unitsTitleText: {
        color: '#135D66',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 14
    },
    unitsDataText: {
        color: '#003C43',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700'
    },

    scrollContainer: {
        marginTop: height*0.026,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: height*0.022,
        justifyContent: 'space-around',
        marginHorizontal:width*0.04
    },
    button: {
        backgroundColor: '#77B0AA',
        height:height*0.062,
        width:'30%',
        borderRadius: 10,
        justifyContent:'center'
    },
    buttonText: {
        color: '#003C43',
        fontSize: 16,
        fontWeight: '800',
        textAlign:'center',  
    },
    buttonSelected:{
        backgroundColor:'#77B0AA'
    },
    buttonUnselected: { 
        backgroundColor: '#EEF7FF',
    },

    bottomButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: height*0.03,
    },
    bottomButton: {
        backgroundColor: '#77B0AA',
        height: height*0.12,
        width: width*0.36,
        borderRadius: 10,
        justifyContent: 'center'
    },
    bottomButtonText: {
        color: '#003C43',
        fontSize: 18,
        fontWeight: '800',
        textAlign: 'center', 
        margin: 2
    },
    iconPeak: {
        fontSize: 42,
        color: '#003C43',
        textAlign: 'center',
    },
    iconGraph: {
        fontSize: 36,
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
});


