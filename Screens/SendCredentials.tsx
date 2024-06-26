import { StyleSheet, Text, TextInput, View, TouchableOpacity, Dimensions, Image, NativeModules, NativeEventEmitter } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import BleManager, { PeripheralInfo } from 'react-native-ble-manager';
import { Buffer } from 'buffer';
import { SendCredentialsRouteProp, HomeScreenNavigationProp } from '../src/types/navigation';
import { Context } from '../src/appwrite/Context';
import Snackbar from 'react-native-snackbar';

const { width, height } = Dimensions.get('window');


interface Service {
  uuid: string;
  characteristics: {
    uuid: string;
  }[];
}


  type SendCredentialsProps = {
    route: SendCredentialsRouteProp;
    navigation: HomeScreenNavigationProp;
  };

  const BleManagerModule = NativeModules.BleManager;
  const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

  const SendCredentials = ({ route, navigation }: SendCredentialsProps) => {
    const { device } = route.params;
    const [ssid, setSsid] = useState('');
    const [password, setPassword] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [serviceUUID, setServiceUUID] = useState<string | null>(null);
    const [characteristicUUID, setCharacteristicUUID] = useState<string | null>(null);    
    const { appwrite, setIsInitialSetupComplete } = useContext(Context);
    const keepAliveInterval = useRef<NodeJS.Timeout | null>(null);


        const fetchUUIDs = async (device: { id: string }) => {
          try {
            const peripheralInfo: PeripheralInfo = await BleManager.retrieveServices(device.id);
            console.log('Peripheral Info:', peripheralInfo);

            const desiredServiceUUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
            const desiredCharacteristicUUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";

            if (peripheralInfo.services && peripheralInfo.characteristics) {
              const services: Service[] = peripheralInfo.services.map(service => ({
                uuid: service.uuid,
                characteristics: peripheralInfo.characteristics!
                  .filter(char => char.service === service.uuid)
                  .map(char => ({
                    uuid: char.characteristic
                  }))
              }));


                let foundCharacteristic = false;

                for (const service of services) {
                  if (service.uuid === desiredServiceUUID){
                    const characteristic = service.characteristics?.find(char => char.uuid === desiredCharacteristicUUID);
                  if (characteristic) {
                    setServiceUUID(service.uuid);
                    setCharacteristicUUID(characteristic.uuid);
                    console.log('Service UUID:', service.uuid);
                    console.log('Characteristic UUID:', characteristic.uuid);
                    foundCharacteristic = true;
                    break;
                  }
                }
              }
                if (!foundCharacteristic) {
                  Snackbar.show({
                    text: 'Error: No suitable characteristics found on device',
                    duration: Snackbar.LENGTH_LONG
                  });
                }
                } else {
                    Snackbar.show({
                        text: 'Error: No services found on device',
                        duration: Snackbar.LENGTH_LONG
                    });
                }
            } catch (error) {
                console.error('Error retrieving services:', error);
                Snackbar.show({
                    text: 'Error: Failed to retrieve services. Please try again.',
                    duration: Snackbar.LENGTH_SHORT
                });
            }
        };
        const handleNotification = (data: any) => {
          const receivedData = Buffer.from(data.value).toString('utf-8');
          console.log('message from the device: ', receivedData);
      
          if (receivedData === 'WiFi Connected') {
            Snackbar.show({
              text: 'Success: Device connected to WiFi!',
              duration: Snackbar.LENGTH_LONG
            });
      
            // Mark initial setup as complete
            appwrite.markInitialSetupComplete();
            setIsInitialSetupComplete(true);
      
            // Navigate to HomeScreen
            navigation.navigate('HomeScreen');
          }
        };
      
        useEffect(() => {
          fetchUUIDs(device); // Ensure fetchUUIDs is called when the component mounts
        }, []);

        useEffect(() => {
            const handleDisconnectedPeripheral = (data: any) => {
                const { peripheral, reason } = data;
              if (peripheral === device.id) {
                Snackbar.show({
                  text: `Disconnected from device: ${reason}`,
                  duration: Snackbar.LENGTH_LONG
                });
                BleManager.connect(device.id)
                  .then(() => {
                    Snackbar.show({
                      text: 'Reconnected to device.',
                      duration: Snackbar.LENGTH_SHORT
                    });
                    fetchUUIDs(device);
                  })
                  .catch((error) => {
                    console.error('Failed to reconnect:', error);
                  });
              }
            };
    
            bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
              return () => {
                bleManagerEmitter.removeAllListeners('BleManagerDisconnectPeripheral');
                clearInterval(keepAliveInterval.current!);
                };
            }, [device.id]);

            useEffect(() => {
                if (serviceUUID && characteristicUUID) {
                  console.log("SeriveUUID: ", serviceUUID, ", CharacteristicUUID: ", characteristicUUID)
                  keepAliveInterval.current = setInterval(async () => {
                    try {
                      const keepAliveData = Array.from(Buffer.from('keepalive', 'utf-8'));
                      await BleManager.write(device.id, serviceUUID, characteristicUUID, keepAliveData);
                    } catch (error) {
                      console.error('Error: sending keep-alive:', error);
                    }
                  }, 5000); // Send keep-alive every 5 seconds
                                // Start notification listener
                  BleManager.startNotification(device.id, serviceUUID, characteristicUUID)
                  .then(() => {
                    console.log('Started notification on ', characteristicUUID);
                    bleManagerEmitter.addListener(
                      'BleManagerDidUpdateValueForCharacteristic', handleNotification);
                  })
                  .catch(error => {
                    console.error('Error: starting notification:', error);
                  });
                }
                return () => {
                  clearInterval(keepAliveInterval.current!);
                    bleManagerEmitter.removeAllListeners('BleManagerDidUpdateValueForCharacteristic');
                };
              }, [serviceUUID, characteristicUUID]); 
    
  const sendCredentials = async () => {
    if (!ssid || !password) {
        Snackbar.show({
            text: 'Error: Please enter both SSID and Password',
            duration: Snackbar.LENGTH_LONG
        })
      
      return;
    }

    setIsSending(true);
    
    try {
        const data = JSON.stringify({ ssid, password });
        const encodedData: number[] = Array.from(Buffer.from(data, 'utf-8'));

        if (!serviceUUID || !characteristicUUID) {
            Snackbar.show({
                text: 'Error: No suitable service found on device',
                duration: Snackbar.LENGTH_LONG
            });
            setIsSending(false);
            return;
        }

        console.log("Service UUID: ", serviceUUID, ", Characteristic UUID: ", characteristicUUID);
        
        await BleManager.write(device.id, serviceUUID, characteristicUUID, encodedData);
  
        setIsSending(false);
        Snackbar.show({
            text: 'Success: Credentials sent successfully!',
            duration: Snackbar.LENGTH_LONG
        })
        
         // Mark initial setup as complete
      // await appwrite.markInitialSetupComplete();
      // setIsInitialSetupComplete(false);
      // //navigation.navigate('HomeScreen');

      } catch (error) {
        setIsSending(false);
        console.error('Error: sending credentials:', error);
        Snackbar.show({
            text: 'Error: Failed to send credentials. Please try again.',
            duration: Snackbar.LENGTH_LONG
        })
        
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
                    style={styles.inputText}
                    value={ssid}
                    onChangeText={setSsid}
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon style={styles.icon} name="lock" />
                <TextInput
                    placeholder='WIFI Password'
                    placeholderTextColor={'#a9a9a9'}
                    style={styles.inputText}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>
            <View style={[styles.buttonContainer, styles.elevatedLogo]}>
                <TouchableOpacity onPress={sendCredentials} >
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
    inputText: {
        marginLeft: width * 0.02,
        fontSize: width * 0.04,
        flex: 1,
        color:'#003C43'
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