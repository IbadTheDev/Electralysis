import {Dimensions, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import React, { useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const transparent = 'rgba(0, 0, 0, 0.5)';

interface PeriodSelectorProps {
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
}

const PeriodSelector = () => {
    const [openModal, setopenModal] = useState(false);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const [selectedStartDate, setselectedStartDate] = useState('Select Date');
    const [selectedEndDate, setselectedEndDate] = useState('Select Date');
    const [selectedStartTime, setselectedStartTime] = useState('Select Time');
    const [selectedEndTime, setselectedEndTime] = useState('Select Time');

    const [currentPicker, setCurrentPicker] = useState<any>(null);

    const showDatePicker = (pickerType: any) => {
      setCurrentPicker(pickerType);
      setDatePickerVisibility(true);
  };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleDateConfirm = (date: any) => {
        const dt = new Date(date);
        const dateString = dt.toISOString().split('T')[0];
        const [year, month, day] = dateString.split('-');
        const formattedDate = `${day}/${month}/${year}`;
        
        if (currentPicker === 'startDate') {
            setselectedStartDate(formattedDate);
        } else if (currentPicker === 'endDate') {
            setselectedEndDate(formattedDate);
        }
        hideDatePicker();
      };


      const showTimePicker = (pickerType: any) => {
        setCurrentPicker(pickerType);
        setTimePickerVisibility(true);
      };
    
      const hideTimePicker = () => {
        setTimePickerVisibility(false);
      };
    
      const handleTimeConfirm = (time: any) => {
        const dt = new Date(time);
        const timeString = dt.toLocaleTimeString();
        
        if (currentPicker === 'startTime') {
            setselectedStartTime(timeString);
        } else if (currentPicker === 'endTime') {
            setselectedEndTime(timeString);
        }
        
        hideTimePicker();
    };

   

      const renderModal= () => {
        return(
        <Modal 
            visible={openModal}
            animationType='fade'
            transparent={true}
            onRequestClose={() => setopenModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.container}>

                        <View style={styles.containerStartEnd}>
                            <Text style={styles.textStartEnd}>Start of usage</Text>
                            <TouchableOpacity activeOpacity={0.8} style={styles.buttonDateTime} onPress={() => showDatePicker('startDate')}>
                            <Icon name="calendar-alt" size={18} color="#003C43" />
                            <Text style={styles.textDateTimeButton}>{selectedStartDate}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={styles.buttonDateTime} onPress={() => showTimePicker('startTime')}>
                            <Icon2 name="clock-outline" size={18} color="#003C43" />
                            <Text style={styles.textDateTimeButton}>{selectedStartTime}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.containerStartEnd}>
                        <Text style={styles.textStartEnd}>End of usage</Text>
                            <TouchableOpacity activeOpacity={0.8} style={styles.buttonDateTime} onPress={() => showDatePicker('endDate')}>
                            <Icon name="calendar-alt" size={18} color="#003C43" />
                            <Text style={styles.textDateTimeButton}>{selectedEndDate}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={styles.buttonDateTime} onPress={() => showTimePicker('endTime')}>
                            <Icon2 name="clock-outline" size={18} color="#003C43" />
                            <Text style={styles.textDateTimeButton}>{selectedEndTime}</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <TouchableOpacity onPress={()=> setopenModal(false)} activeOpacity={0.8} style={styles.doneButton} >
                            <Text style={styles.doneButtonText}>Done</Text>
                            <Icon2 name="check-circle-outline" style={[styles.iconDoneButton]} />
                        </TouchableOpacity>
                        

                    </View>
                </View>
            </Modal>
        );
      };

  return (
    <>
    <View style={[styles.openModalContainer, styles.elevatedBox]}>
    <Text style={[styles.openModalText, styles.elevatedText]}>Find out your Electricity Usage for a specific time?</Text>
        <TouchableOpacity onPress={()=> setopenModal(true)} style={[styles.openModalButton, styles.elevatedLogo]} activeOpacity={0.8}>
        <Icon name="searchengin" style={[styles.iconModalBtn, styles.elevatedText]} />
            <Text style={styles.openModaBtnText}>Set Time and Date</Text>
        </TouchableOpacity>
    </View>



   
        
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />

        {renderModal()}

    </>
  )
}

export default PeriodSelector

const styles = StyleSheet.create({
    openModalContainer:{
        backgroundColor:'rgba(238, 247, 255, 1)',
        margin:'4.2%',
        height:height*0.178,
        padding:'4%',
        borderRadius:20
    },
    openModalText:{
        fontSize:16,
        color: '#135D66',
        fontWeight: '500',
    },
    openModalButton:{
        backgroundColor: '#77B0AA',
        height:height*0.062,
        width:'60%',
        borderRadius: 10,
        alignSelf:'center',
        justifyContent:'center',
        marginTop:height*0.020,
        flexDirection:'row',
        paddingTop:height*0.012
        
    },
    openModaBtnText:{
        color: '#003C43',
        fontSize: 16,
        fontWeight: '800',
        textAlign:'center', 
        padding:4,
        justifyContent:'center'
    },
    iconModalBtn: {
        fontSize: 30,
        color: '#003C43',
        textAlign: 'center',
        justifyContent:'center'
      },

    modalContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:transparent,
    },
    container:{
        backgroundColor: 'white',
        padding:'3%',
        height:height*0.9,
        width:width*0.96,
        borderRadius:8,
        marginTop:height*0.4,
        alignItems:'center',

    },
    containerStartEnd:{
      backgroundColor:'#77B0AA',
      height:height*0.28,
      paddingTop:'5%',
      alignItems:'center',
      borderRadius:10,
      width:width*0.9,
      margin:'2%',
    },
    textStartEnd:{
      color:'#003C43',
      fontSize:26,
      fontWeight:'500',
    },
    buttonDateTime:{
      backgroundColor: '#FFFFFF',
      height:height*0.062,
      width:'50%',
      borderRadius: 10,
      alignSelf:'center',
      justifyContent:'center',
      marginTop:height*0.030,
      flexDirection:'row',
      paddingTop:height*0.012

    },
    textDateTimeButton:{
      color: '#003C43',
      fontSize: 16,
      fontWeight: '800',
      textAlign:'center', 
      padding:4,
      justifyContent:'center'
    },
    
    doneButton:{
      backgroundColor: '#77B0AA',
        height:height*0.062,
        width:'40%',
        borderRadius: 10,
        alignSelf:'center',
        justifyContent:'center',
        marginTop:height*0.026,
        flexDirection:'row',
        
    },
    iconDoneButton: {
      fontSize: 38,
      color: 'white',
      textAlign: 'center',
      justifyContent:'center',
      alignSelf:'center',
    },
    doneButtonText:{
      color: '#003C43',
      fontSize: 22,
      fontWeight: '800',
      textAlign:'center', 
      padding:4,
      justifyContent:'center',
      textAlignVertical:'center'
    },



    elevatedLogo: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.45,
        shadowRadius: 2,
        elevation: 4,
    },
    elevatedBox: {
        shadowColor: 'black',
        shadowOffset: {
            width: 10,
            height: 4,
          },
          shadowOpacity: 0.8,
          shadowRadius: 6,
          elevation: 3,
    },
    elevatedText: {
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0.4, height: 0.6 },
        textShadowRadius: 2,
    },

})