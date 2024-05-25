import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect  } from 'react';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Foundation';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/Octicons';

interface MonthlyData {
    uid: number;
    month: string;
    unitsUsed: number;
    bill: number;
    time: string;
}[]

interface WeeklyData {
    uid: number;
    week: string;
    unitsUsed: number;
    bill: number;
    time: string;
}[]

interface DailyData {
    uid: number;
    day: string;
    unitsUsed: number;
    bill: number;
    time: string;
}[]

export default function HomeScreen() {

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

    const monthlyData = [
        {
            uid: 1,
            month: "March",
            unitsUsed: 300,
            bill: 25000,
            time: "\u221E"  // Infinite symbol
        },
        {
            uid: 2,
            month: "April",
            unitsUsed: 400,
            bill: 35000,
            time: "\u221E"  // Infinite symbol
        },
        {
            uid: 3,
            month: "May",
            unitsUsed: 500,
            bill: 45000,
            time: "\u221E"  // Infinite symbol
        },
        {
            uid: 4,
            month: "June",
            unitsUsed: 600,
            bill: 55000,
            time: "\u221E"  // Infinite symbol
        },
    ];
    
    const weeklyData = [
        {
            uid: 1,
            week: "Week 1",
            unitsUsed: 75,
            bill: 6250,
            time: "\u221E"  // Infinite symbol
        },
        {
            uid: 2,
            week: "Week 2",
            unitsUsed: 100,
            bill: 8750,
            time: "\u221E"  // Infinite symbol
        },
        {
            uid: 3,
            week: "Week 3",
            unitsUsed: 125,
            bill: 11250,
            time: "\u221E"  // Infinite symbol
        },
        {
            uid: 4,
            week: "Week 4",
            unitsUsed: 150,
            bill: 13750,
            time: "\u221E"  // Infinite symbol
        },
    ];
    
    const dailyData = [
        {
            uid: 1,
            day: "Monday",
            unitsUsed: 10,
            bill: 833,
            time: "\u221E"  // Infinite symbol
        },
        {
            uid: 2,
            day: "Tuesday",
            unitsUsed: 15,
            bill: 1250,
            time: "\u221E"  // Infinite symbol
        },
        {
            uid: 3,
            day: "Wednesday",
            unitsUsed: 20,
            bill: 1666,
            time: "\u221E"  // Infinite symbol
        },
        {
            uid: 4,
            day: "Thursday",
            unitsUsed: 25,
            bill: 2083,
            time: "\u221E"  // Infinite symbol
        },
        {
            uid: 5,
            day: "Friday",
            unitsUsed: 30,
            bill: 2500,
            time: "\u221E"  // Infinite symbol
        },
        {
            uid: 6,
            day: "Saturday",
            unitsUsed: 35,
            bill: 2916,
            time: "\u221E"  // Infinite symbol
        },
        {
            uid: 7,
            day: "Sunday",
            unitsUsed: 40,
            bill: 3333,
            time: "\u221E"  // Infinite symbol
        },
    ];


    const [selectedDataType, setSelectedDataType] = useState<'monthly' | 'weekly' | 'daily'>('daily');
    
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
            <View style={styles.headContainer}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.headText, styles.elevatedText]}>Electralysis</Text>
                </View>
                <View style={styles.profileContainer}>
                    <Icon name="bell" style={[styles.iconBell, styles.elevatedText]} />
                    <Image source={require('../Assets/ibad.png')} style={[styles.profileImage, styles.elevatedLogo]} />
                </View>
            </View>


            
            <View style={[styles.mainCard,  isPeakHours? styles.peakMainCard : styles.elevatedLogo   ]}>
            <View style={styles.peakHoursContainer}>
                    <Text style={[styles.elevatedText, isPeakHours ? styles.peakHoursTextOn: styles.peakHoursTextOff]}>
                        {isPeakHours ? "Peak-Hours: ON" : "Peak-Hours: OFF"}
                    </Text>
                </View>
                <View style={styles.dataCard}>
                    <TouchableOpacity>
                        <Icon style={[styles.elevatedText, isPeakHours? styles.plugIconPeakhours:  styles.plugIcon ]} name="plug" />
                        <Text style={[styles.realTimeText, styles.elevatedText]}>
                            9.98 kWh
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
                <TouchableOpacity activeOpacity={0.8} onPress={handleMonthlyPress} style={[styles.button, styles.elevatedMidLayer, selectedDataType === 'monthly'? styles.buttonSelected : styles.buttonUnselected]}>
                    <Text style={styles.buttonText}>Monthly</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={handleWeeklyPress} style={[styles.button, styles.elevatedMidLayer , selectedDataType === 'weekly'? styles.buttonSelected : styles.buttonUnselected]}>
                    <Text style={styles.buttonText}>Weekly</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={handleDailyPress} style={[styles.button,  styles.elevatedMidLayer , selectedDataType === 'daily'? styles.buttonSelected : styles.buttonUnselected]}>
                    <Text style={styles.buttonText}>Daily</Text>
                </TouchableOpacity>
            </View>


            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContentContainer}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                snapToInterval={392} // Adjust this value to match the width of the card + margin
                decelerationRate="fast"
                snapToAlignment="start"
            > 
            {selectedData.map(data => (
                <View key={data.uid} style={[styles.midLayerContainer, styles.elevatedMidLayer]}>
                    <View style={styles.cardMonthContainer}>
                        <Text style={[styles.monthText, styles.elevatedText]}>
                            {(data as MonthlyData).month ?? (data as WeeklyData).week ?? (data as DailyData).day ?? ''}
                        </Text>
                    </View>
                    <View style={[styles.cardTimeContainer]}>
                        <Text style={[styles.timeDataText, styles.elevatedText]}>
                            {data.time}
                        </Text>
                        <Text style={styles.timeTitleText}>Time</Text>
                    </View>
                    <View style={styles.cardCostContainer}>
                        <Text style={[styles.costDataText, styles.elevatedText]}>
                            {data.bill}
                        </Text>
                        <Text style={styles.costTitleText}>Cost</Text>
                    </View>
                    <View style={styles.cardUnitsContainer}>
                        <Text style={[styles.unitsDataText, styles.elevatedText]}>
                            {data.unitsUsed}
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



            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton}>
                    <Icon name="home" style={styles.footerIcon} />
                    <Text style={styles.footerText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Icon name="bar-chart" style={styles.footerIcon} />
                    <Text style={styles.footerText}>Stats</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Icon name="cog" style={styles.footerIcon} />
                    <Text style={styles.footerText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Icon name="user" style={styles.footerIcon} />
                    <Text style={styles.footerText}>Profile</Text>
                </TouchableOpacity>
            </View>

         
           


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E3FEF7"
    },
    headContainer: {
        flexDirection: "row",
        marginTop: 20,
    },
    titleContainer: {
        width: '50%',
        paddingLeft: 20
    },
    headText: {
        color: '#135D66',
        textAlign: 'left',
        fontWeight: '600',
        fontSize: 20,
    },
    profileContainer: {
        flexDirection: "row",
        width: '50%',
        alignContent: 'space-evenly',
        justifyContent: 'flex-end',
        paddingRight: 10
    },
    iconBell: {
        color: '#135D66',
        fontWeight: '600',
        fontSize: 20,
        verticalAlign: 'middle',
        paddingRight: 14
    },
    profileImage: {
        height: 32,
        width: 32,
        borderRadius: 22
    },
    mainCard: {
        backgroundColor: '#EEF7FF',
        marginTop: 20,
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
        alignSelf:'center',
        justifyContent:'center',
        marginBottom:30,     
    },
    peakHoursTextOn: { 
        color: '#EF4B4B',
        fontWeight: '600',
        fontSize:18,
        width:160,
        height:34,
        textAlign:'center',
        padding:4,
        borderRadius: 12,
       
    },
    peakHoursTextOff: {
        color: 'grey',
        fontWeight: '600',
        fontSize:16,
        width:160,
        height:34,
        textAlign:'center',
        padding:4,
        borderRadius: 12,
    },
    plugIconPeakhours: {
        color: '#BB5A5A',
        fontWeight: '600',
        fontSize: 34,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    cardTitleContainer: {
    },
   
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
        height: 80, 
        width: 384, // Adjust this width as necessary to match snapToInterval
        borderRadius: 10,
        
    },
    cardMonthContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8, 
        padding:14,
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
        margin: 8,
        paddingRight:6,
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
    elevatedText: {
        textShadowColor: 'rgba(0, 0, 0, 0.25)',  // Reduced opacity for a subtler shadow
        textShadowOffset: { width: 1, height: 2 },  
        textShadowRadius: 10,  // Smaller radius for a less blurred effect
    },
    elevatedLogo: {
        shadowColor: 'black',
        shadowOffset: {
            width: 30,    
            height: 20,  
        },
        shadowOpacity: 0.8,  // Increase the opacity for a darker shadow
        shadowRadius: 15,    // Increase the radius for a more blurred effect
        elevation: 20,       // Increase elevation for a stronger shadow on Android
    },
    elevatedMidLayer: {
        shadowColor: 'black',
        shadowOffset: {
            width: 20,   
            height: 10, 
        },
        shadowOpacity: 0.8,  // Increase the opacity for a darker shadow
        shadowRadius: 16,    // Increase the radius for a more blurred effect
        elevation: 8,       // Increase elevation for a stronger shadow on Android
    },
    scrollContainer: {
        marginTop: 20,
    },
    subsContainer: {
        backgroundColor: '#77B0AA',
        height: '30%',
        width: '30%',
        borderRadius: 16,
        margin:10,
        alignItems:'center'
    },
    subsText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#003C43'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 18,
        justifyContent: 'space-around',
        marginHorizontal:10
    },
    button: {
        backgroundColor: '#77B0AA',
        paddingVertical: 10,
        height:46,
        width:108,
        borderRadius: 10,
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
    buttonUnselected:{ 
         backgroundColor: '#EEF7FF',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,
        backgroundColor: '#003C43',
        borderTopLeftRadius:34,
        borderTopRightRadius:34
    },
    footerButton: {
        alignItems: 'center',
    },
    footerIcon: {
        fontSize: 24,
        color: '#FFF',
    },
    footerText: {
        fontSize: 12,
        color: '#FFF',
        marginTop: 4,
    },
    bottomButtonContainer:{
        flexDirection:'row',
        justifyContent: 'space-evenly',
        marginBottom:30,
        
    },
    bottomButton:{
        backgroundColor: '#77B0AA',
        paddingVertical: 10,
        height:100,
        width:150,
        borderRadius: 10,
        justifyContent:'center'
    },
    bottomButtonText: {
        color: '#003C43',
        fontSize: 18,
        fontWeight: '800',
        textAlign:'center', 
        margin:2
    },
    iconPeak:{
        fontSize: 42,
        color: '#003C43',
        textAlign:'center',
    },
    iconGraph:{
        fontSize: 36,
        color: '#003C43',
        textAlign:'center',
        marginBottom:3

    },
});
