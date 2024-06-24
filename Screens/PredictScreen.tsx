import { StyleSheet, Text, TextInput, Dimensions, View, TouchableOpacity, ScrollView, Image, Modal, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Header from '../Components/Header';
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {AppStackParamList} from '../src/routes/AppStack'
import FooterNav from '../Components/FooterNav';
import axios from 'axios';


const { width, height } = Dimensions.get('window');
const transparent = 'rgba(0, 0, 0, 0.5)';


type PredictScreenProps = NativeStackScreenProps<AppStackParamList, 'PredictScreen'>

const PredictScreen = ({navigation}: PredictScreenProps) => {
    const [openModal, setopenModal] = useState(false);
    const [prediction, setPrediction] = useState<number[][]>([]);

    const [inp1, setInp1] = useState('');
    const [inp2, setInp2] = useState('');
    const [inp3, setInp3] = useState('');
    const [inp4, setInp4] = useState('');
    const [inp5, setInp5] = useState('');
    const [inp6, setInp6] = useState('');
    const [inp7, setInp7] = useState('');
    const [inp8, setInp8] = useState('');
    const [inp9, setInp9] = useState('');
    const [inp10, setInp10] = useState('');
    const [inp11, setInp11] = useState('');
    const [inp12, setInp12] = useState('');

    const et1 = useRef<TextInput>(null);
    const et2 = useRef<TextInput>(null);
    const et3 = useRef<TextInput>(null);
    const et4 = useRef<TextInput>(null);
    const et5 = useRef<TextInput>(null);
    const et6 = useRef<TextInput>(null);
    const et7 = useRef<TextInput>(null);
    const et8 = useRef<TextInput>(null);
    const et9 = useRef<TextInput>(null);
    const et10 = useRef<TextInput>(null);
    const et11 = useRef<TextInput>(null);
    const et12 = useRef<TextInput>(null);

    const data = {
        month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        units: [
          parseInt(inp1),
          parseInt(inp2),
          parseInt(inp3),
          parseInt(inp4),
          parseInt(inp5),
          parseInt(inp6),
          parseInt(inp7),
          parseInt(inp8),
          parseInt(inp9),
          parseInt(inp10),
          parseInt(inp11),
          parseInt(inp12),
        ],
      };

      const predictData = async () => {
        try {
            console.log('Attempting to send request...');
            const apiUrl = 'https://2105-35-231-228-99.ngrok-free.app/predict';
    
            console.log('Sending request to:', apiUrl);
            console.log('Request data:', data);
    
            const response = await axios.post(apiUrl, data);
    
            console.log('Prediction response:', response.data);
            setPrediction(response.data.prediction); 
            setopenModal(true); 
        } catch (error) {
            console.error('Prediction error:', error);
        
        }
    };
    

    const renderModal = () => {
        

    // Determine current month and next month index
    const currentMonth = new Date().getMonth();
    const nextMonthIndex = (currentMonth + 1) % 12;

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
  
      // Format prediction to one decimal place
      const formattedPrediction = prediction.length > 0 ? prediction[nextMonthIndex][0].toFixed(1) : '';
      const nextMonthName = months[nextMonthIndex];

        return (
          <Modal
            visible={openModal}
            animationType='fade'
            transparent={true}
            onRequestClose={() => setopenModal(false)}
          >
            <View style={styles.modalContainer}>
                {/* <View style={styles.infoContainer}> */}
                <View style={[styles.predictionContainer, styles.elevatedLogo]}>
                    <Text style={styles.units}>Prediction for {nextMonthName}: {"\n\n"}{formattedPrediction} units </Text>
                </View>
                <TouchableOpacity onPress={ ()=> setopenModal(false)} activeOpacity={0.8} style={[styles.doneButton, styles.elevatedLogo]}>
                  <Text style={styles.doneButtonText}>Seen</Text>
                  <Icon2 name="check-circle-outline" style={[styles.iconDoneButton]} />
                </TouchableOpacity>
    
                {/* </View> */}
              </View>
          </Modal>
        );
      };
      
  return (
    <>
    <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container} >
        <Header/>
        <View style={[styles.logoContainer]}>
            <Text style={[styles.title, styles.elevatedText]}>Bill Prediction</Text>
            <Text style={styles.subText}>Enter your last years monthly units to predict next month</Text>
            <Text style={styles.subText2}>Tip: Use K-Electric mobile app to get the monthly units of last year</Text>
        </View>

   <View style={styles.entryContainer}>

                    <View style={[styles.inputContainer]}>
                        <View style={styles.subInputContainer}>
                            <Text style={styles.inputText}>January:</Text>
                            <TextInput
                                ref={et1}
                                value={inp1}
                                keyboardType="number-pad"
                                maxLength={3}
                                placeholder='units'
                                placeholderTextColor={'#a9a9a9'}
                                style={[styles.inputBox, styles.elevatedLogo]}
                                onChangeText={txt => {
                                    setInp1(txt);
                                    if (txt.length === 3) {
                                        et2.current?.focus();
                                    }
                                }}
                            />
                        </View>
                        <View style={styles.subInputContainer}>
                            <Text style={styles.inputText}>February:</Text>
                            <TextInput
                                ref={et2}
                                value={inp2}
                                keyboardType="number-pad"
                                maxLength={3}
                                placeholder='units'
                                placeholderTextColor={'#a9a9a9'}
                                style={[styles.inputBox, styles.elevatedLogo]}
                                onChangeText={txt => {
                                    setInp2(txt);
                                    if (txt.length === 3) {
                                        et3.current?.focus();
                                    } else if (txt.length === 0) {
                                        et1.current?.focus();
                                    }
                                }}
                            />
                        </View>
                    </View>

                    <View style={[styles.inputContainer]}>
                        <View style={styles.subInputContainer}>
                            <Text style={styles.inputText}>March:</Text>
                            <TextInput
                                ref={et3}
                                value={inp3}
                                keyboardType="number-pad"
                                maxLength={3}
                                placeholder='units'
                                placeholderTextColor={'#a9a9a9'}
                                style={[styles.inputBox, styles.elevatedLogo]}
                                onChangeText={txt => {
                                    setInp3(txt);
                                    if (txt.length === 3) {
                                        et4.current?.focus();
                                    } else if (txt.length === 0) {
                                        et2.current?.focus();
                                    }
                                }}
                            />
                        </View>
                        <View style={styles.subInputContainer}>
                            <Text style={styles.inputText}>April:</Text>
                            <TextInput
                                ref={et4}
                                value={inp4}
                                keyboardType="number-pad"
                                maxLength={3}
                                placeholder='units'
                                placeholderTextColor={'#a9a9a9'}
                                style={[styles.inputBox, styles.elevatedLogo]}
                                onChangeText={txt => {
                                    setInp4(txt);
                                    if (txt.length === 3) {
                                        et5.current?.focus();
                                    } else if (txt.length === 0) {
                                        et3.current?.focus();
                                    }
                                }}
                            />
                        </View>
                    </View>

                    <View style={[styles.inputContainer]}>
                        <View style={styles.subInputContainer}>
                            <Text style={styles.inputText}>May:</Text>
                            <TextInput
                                ref={et5}
                                value={inp5}
                                keyboardType="number-pad"
                                maxLength={3}
                                placeholder='units'
                                placeholderTextColor={'#a9a9a9'}
                                style={[styles.inputBox, styles.elevatedLogo]}
                                onChangeText={txt => {
                                    setInp5(txt);
                                    if (txt.length === 3) {
                                        et6.current?.focus();
                                    } else if (txt.length === 0) {
                                        et4.current?.focus();
                                    }
                                }}
                            />
                        </View>
                        <View style={styles.subInputContainer}>
                            <Text style={styles.inputText}>June:</Text>
                            <TextInput
                                ref={et6}
                                value={inp6}
                                keyboardType="number-pad"
                                maxLength={3}
                                placeholder='units'
                                placeholderTextColor={'#a9a9a9'}
                                style={[styles.inputBox, styles.elevatedLogo]}
                                onChangeText={txt => {
                                    setInp6(txt);
                                    if (txt.length === 3) {
                                        et7.current?.focus();
                                    } else if (txt.length === 0) {
                                        et5.current?.focus();
                                    }
                                }}
                            />
                        </View>
                    </View>

                    <View style={[styles.inputContainer]}>
                        <View style={styles.subInputContainer}>
                            <Text style={styles.inputText}>July:</Text>
                            <TextInput
                                ref={et7}
                                value={inp7}
                                keyboardType="number-pad"
                                maxLength={3}
                                placeholder='units'
                                placeholderTextColor={'#a9a9a9'}
                                style={[styles.inputBox, styles.elevatedLogo]}
                                onChangeText={txt => {
                                    setInp7(txt);
                                    if (txt.length === 3) {
                                        et8.current?.focus();
                                    } else if (txt.length === 0) {
                                        et6.current?.focus();
                                    }
                                }}
                            />
                        </View>
                        <View style={styles.subInputContainer}>
                            <Text style={styles.inputText}>August:</Text>
                            <TextInput
                                ref={et8}
                                value={inp8}
                                keyboardType="number-pad"
                                maxLength={3}
                                placeholder='units'
                                placeholderTextColor={'#a9a9a9'}
                                style={[styles.inputBox, styles.elevatedLogo]}
                                onChangeText={txt => {
                                    setInp8(txt);
                                    if (txt.length === 3) {
                                        et9.current?.focus();
                                    } else if (txt.length === 0) {
                                        et7.current?.focus();
                                    }
                                }}
                            />
                        </View>
                    </View>

                    <View style={[styles.inputContainer]}>
                        <View style={styles.subInputContainer}>
                            <Text style={styles.inputText}>September:</Text>
                            <TextInput
                                ref={et9}
                                value={inp9}
                                keyboardType="number-pad"
                                maxLength={3}
                                placeholder='units'
                                placeholderTextColor={'#a9a9a9'}
                                style={[styles.inputBox, styles.elevatedLogo]}
                                onChangeText={txt => {
                                    setInp9(txt);
                                    if (txt.length === 3) {
                                        et10.current?.focus();
                                    } else if (txt.length === 0) {
                                        et8.current?.focus();
                                    }
                                }}
                            />
                        </View>
                        <View style={styles.subInputContainer}>
                            <Text style={styles.inputText}>October:</Text>
                            <TextInput
                                ref={et10}
                                value={inp10}
                                keyboardType="number-pad"
                                maxLength={3}
                                placeholder='units'
                                placeholderTextColor={'#a9a9a9'}
                                style={[styles.inputBox, styles.elevatedLogo]}
                                onChangeText={txt => {
                                    setInp10(txt);
                                    if (txt.length === 3) {
                                        et11.current?.focus();
                                    } else if (txt.length === 0) {
                                        et9.current?.focus();
                                    }
                                }}
                            />
                        </View>
                    </View>

                    <View style={[styles.inputContainer]}>
                        <View style={styles.subInputContainer}>
                            <Text style={styles.inputText}>November:</Text>
                            <TextInput
                                ref={et11}
                                value={inp11}
                                keyboardType="number-pad"
                                maxLength={3}
                                placeholder='units'
                                placeholderTextColor={'#a9a9a9'}
                                style={[styles.inputBox, styles.elevatedLogo]}
                                onChangeText={txt => {
                                    setInp11(txt);
                                    if (txt.length === 3) {
                                        et12.current?.focus();
                                    } else if (txt.length === 0) {
                                        et10.current?.focus();
                                    }
                                }}
                            />
                        </View>
                        <View style={styles.subInputContainer}>
                            <Text style={styles.inputText}>December:</Text>
                            <TextInput
                                ref={et12}
                                value={inp12}
                                keyboardType="number-pad"
                                maxLength={3}
                                placeholder='units'
                                placeholderTextColor={'#a9a9a9'}
                                style={[styles.inputBox, styles.elevatedLogo]}
                                onChangeText={txt => {
                                    setInp12(txt);
                                    if (txt.length === 0) {
                                        et11.current?.focus();
                                    }
                                }}
                            />
                        </View>
                    </View>

                </View>

        <View>
            <TouchableOpacity onPress={predictData} activeOpacity={0.8} style={[styles.buttonContainer, styles.elevatedLogo]}>
                                <Icon style={styles.icon} name="magic" />
                                <Text style={[styles.buttonText, styles.elevatedText]}>Electralysis</Text>
                            </TouchableOpacity>
             <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} activeOpacity={0.8} style={[styles.backButton]} >
                <Icon3 style={styles.backIcon} name="chevron-back" />
                <Text style={[styles.backButtonText, styles.elevatedText]}></Text>
            </TouchableOpacity>
        </View>  
    </View> 
    <FooterNav navigation={navigation}/>
    </ScrollView>
    </KeyboardAvoidingView>
    {renderModal()}
    </>  
  )
}

export default PredictScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#E3FEF7' ,
        shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8, 
    },
    logoContainer:{
        alignItems:'center',
        marginTop: height*0.02
    },
    title:{
        fontSize: 32,
        fontWeight: 'bold',
        color:'#135D66',
    },
    subText:{
        color: '#135D66',
        fontSize:height*0.017,
        marginTop: height*0.02,
        fontWeight:'600'
    },
    subText2:{
        color: '#135D66',
        fontSize:height*0.015,
        marginTop: height*0.01,
        fontWeight:'600'
    },
    entryContainer:{
        flexDirection:'column',
        marginTop:height*0.04,
        alignItems:'center',
        justifyContent:'center',
        height:height*0.5,
        width:width*1,
    },
    inputContainer: {
        
        flexDirection:'row', 
        alignItems:'center',
        height:height*0.08,
        width:width*0.98,
        padding:'2%',
        justifyContent:'center',
        margin:'1%',
        
    },
    subInputContainer:{
        backgroundColor:'rgba(19, 93, 102, 0.1)',
        borderRadius:8,
        height:height*0.07,
        width:width*0.47,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:'2%',
        marginHorizontal:'1%'
    },
    inputBox: {
        height: height * 0.045,
        width: width*0.18,
        marginVertical: height * 0.001,
        marginHorizontal:width*0.01,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 8,
        fontSize: width * 0.036,
        color: '#135D66',
        textAlign:'center',
    },
    inputText:{
        fontSize: 16,
        fontWeight: '500',
        color:'#003C43',
        textAlign:'center',
    },
   buttonContainer:{
    backgroundColor: '#77B0AA',
    height: height*0.078,
    width: width*0.6,
    borderRadius: 28,
    flexDirection:'row',
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    marginTop:height*0.05,
   },
   buttonText:{
    fontSize:width*0.05,
    fontWeight: 'bold',
    color:'#003C43',
    marginLeft:width*0.02,
   },
   icon: {
    fontSize: width * 0.07,
    color: '#003C43',
    },
    backButton:{
    
    height: height*0.07,
    width: width*0.2,
    borderRadius: 10,
    flexDirection:'row',
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    marginTop:height*0.01,
    },
    backButtonText:{
    fontSize:width*0.05,
    fontWeight: 'bold',
    color:'#003C43',
    marginLeft:width*0.02,
    },
    backIcon:{
    fontSize: width * 0.09,
    color: '#003C43',
    },



 //Modal
 modalContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: transparent,
 },
 infoContainer:{
    backgroundColor: 'white',
    padding: '1%',
    height: height * 0.42,
    width: width * 0.96,
    borderRadius: 8,
    alignItems: 'center',
 },
 predictionContainer:{
    backgroundColor: 'rgba(255, 255, 255, 1)',
    height: height * 0.3,
    paddingTop: '5%',
    alignItems: 'center',
    borderRadius: 10,
    width: width * 0.92,
    margin: '2%',
 },
 units:{
    fontSize:height*0.03,
    color:'#003C43',
    fontWeight:'600',
    marginBottom:height*0.08
 },
 bill:{
    fontSize:height*0.03,
    color:'#003C43',
    fontWeight:'600',
    marginBottom:height*0.05
 },

 doneButton:{
    backgroundColor: '#77B0AA',
    height: height * 0.062,
    width: '50%',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: height * 0.01,
    flexDirection: 'row',
 },
 doneButtonText:{
    color: '#003C43',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    padding: 4,
    justifyContent: 'center',
    textAlignVertical: 'center'
 },
 iconDoneButton:{
    fontSize: 38,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
 },
 




//Shadows
   elevatedText: {
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: { width: 1, height: 4 },
    textShadowRadius: 8,
  },
elevatedLogo:{
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
    
})