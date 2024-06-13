import { StyleSheet, Text, TextInput, View, TouchableOpacity, Dimensions, Alert, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import BleManager, { PeripheralInfo } from 'react-native-ble-manager';
import { Buffer } from 'buffer';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { AuthStackParamList, SendCredentialsRouteProp } from '../src/types/navigation';


const { width, height } = Dimensions.get('window');


interface Device {
    id: string;
    name: string;
  }
  interface Service {
    uuid: string;
    characteristics: Characteristic[];
  }
  interface Characteristic {
    uuid: string;
  }

  type SendCredentialsProps = {
    route: SendCredentialsRouteProp;
  };



  const SendCredentials = ({ route }: SendCredentialsProps) => {
    const { device } = route.params;
    const [ssid, setSsid] = useState('');
    const [password, setPassword] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [serviceUUID, setServiceUUID] = useState('');
    const [characteristicUUID, setCharacteristicUUID] = useState('');

    useEffect(() => {
        const fetchUUIDs = async () => {
            try {
              const peripheralInfo: PeripheralInfo = await BleManager.retrieveServices(device.id);
              if (peripheralInfo.services) {
                const services: Service[] = peripheralInfo.services as Service[];

                for (const service of services) {
                  if (service.characteristics.length > 0) {
                    setServiceUUID(service.uuid);
                    setCharacteristicUUID(service.characteristics[0].uuid);
                    break;
                  }}}
        if (!serviceUUID || !characteristicUUID) {
          Alert.alert('Error', 'No suitable service found on device');
        }
      } catch (error) {
        console.error('Error retrieving services:', error);
        Alert.alert('Error', 'Failed to retrieve services. Please try again.');
      }
    };

    fetchUUIDs();
  }, [device.id, serviceUUID, characteristicUUID]);
        
  const sendCredentials = async () => {
    if (!ssid || !password) {
      Alert.alert('Error', 'Please enter both SSID and Password');
      return;
    }

    setIsSending(true);
    
    try {
        const data = JSON.stringify({ ssid, password });
        const encodedData: number[] = Array.from(Buffer.from(data, 'utf-8'));

  
        await BleManager.write(device.id, serviceUUID, characteristicUUID, encodedData);
  
        setIsSending(false);
        Alert.alert('Success', 'Credentials sent successfully!');
      } catch (error) {
        setIsSending(false);
        console.error('Error sending credentials:', error);
        Alert.alert('Error', 'Failed to send credentials. Please try again.');
      }
    };
    return (
        <View style={styles.container}>
            <View style={styles.topTextContainer}>
                <Text style={styles.topText}>Connect to WIFI</Text>
            </View>
            <View style={styles.subTextContainer}>
                <Text style={styles.subText}>Enter your WIFI name and Password</Text>
            </View>
            <View style={styles.inputContainer}>
                <Icon style={styles.icon} name="wifi" />
                <TextInput
                    placeholder='WIFI Name'
                    placeholderTextColor={'#a9a9a9'}
                    style={styles.inputBox}
                    value={ssid}
                    onChangeText={setSsid}
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon style={styles.icon} name="lock" />
                <TextInput
                    placeholder='WIFI Password'
                    placeholderTextColor={'#a9a9a9'}
                    style={styles.inputBox}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>
            <View style={[styles.buttonContainer, styles.elevatedLogo]}>
                <TouchableOpacity >
                    <Text style={[styles.buttonText, styles.elevatedText]}>Send</Text>
                </TouchableOpacity>
                <Icon style={[styles.elevatedText, styles.sendIcon]} name="cloud-upload" />
            </View>
            <View style={styles.infoTextContainer}>
                <Text style={styles.infoText}>The Electralysis Device needs internet to send the data!</Text>
                <Image source={require('../Assets/wifi.png')}
                style={styles.cardImage}
         />
            </View>
           
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E3FEF7",
        padding: width * 0.05,
    },
    topTextContainer: {
        height: height * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topText: {
        color: '#135D66',
        fontWeight: '600',
        fontSize: width * 0.13,
        textAlign:'center',
    },
    subTextContainer: {
        height: height * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subText: {
        color: '#135D66',
        fontSize: width * 0.04,
        fontWeight: '600',
    },
    inputContainer: {
        height: height * 0.08,
        width: width*0.85,
        marginVertical: height * 0.015,
        backgroundColor: '#ffff',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems:'center',
        paddingHorizontal: width * 0.05,
    },
    inputBox: {
        marginLeft: width * 0.02,
        fontSize: width * 0.04,
        flex: 1,
    },
    icon: {
        fontSize: width * 0.06,
        color: '#135D66',
    },
    buttonContainer: {
        backgroundColor: '#77B0AA',
        height: height * 0.08,
        width: width * 0.6,
        borderRadius: 28,
        marginTop: height * 0.03,
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        alignItems:'center'
    },
    buttonText: {
        fontSize: width * 0.06,
        fontWeight: '500',
        textAlign: 'center',
        color: '#003C43',
    },
    sendIcon: {
        color: '#003C43',
        fontWeight: '600',
        fontSize:  width * 0.08,
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft:width*0.03
    },
    
    infoTextContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * 0.08,
    },
    infoText: {
        textAlign: 'center',
        color: '#135D66',
        fontSize: width * 0.04,
        fontWeight: '600',
    },
    cardImage:{
        height:height*0.22,
        width:width*0.35,
        alignSelf:'center',
        marginTop:height*0.01,
        opacity:0.85
    },
 
    elevatedText: {
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 1, height: 3 },
        textShadowRadius: 10,
    },
    elevatedLogo: {
        shadowColor: 'black',
        shadowOffset: {
            width: 3,
            height: 6,
        },
        shadowOpacity: 0.85,
        shadowRadius: 6,
        elevation: 8,
    },
});

export default SendCredentials