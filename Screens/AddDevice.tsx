import { Dimensions, Image, StyleSheet, Text, Alert, TouchableOpacity, View, Linking, Platform, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { PERMISSIONS, request, check, RESULTS } from 'react-native-permissions';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { AddDeviceNavigationProp} from '../src/types/navigation';

const { width, height } = Dimensions.get('window');

type AddDeviceProps = {
    navigation: AddDeviceNavigationProp;
  };

  const AddDevice = ({navigation }: AddDeviceProps) => {
    const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);

    useEffect(() => {
        checkBluetoothState();
    }, []);

    const checkBluetoothState = async () => {
        try {
            // Check Bluetooth state
            const state = await BluetoothStateManager.getState();
            setIsBluetoothEnabled(state === 'PoweredOn');
        } catch (error) {
            console.error('Error checking Bluetooth state:', error);
        }
    };

    const requestBluetoothPermission = async () => {
        try {
            if (Platform.OS === 'android') {
                if (Platform.Version >= 31) { // Android 12 and above
                    const permissions = [
                        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                    ];
                    const granted = await PermissionsAndroid.requestMultiple(permissions);
                    return granted['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
                        granted['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
                        granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED;
                } else { // Android 11 and below
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Permission',
                            message: 'App needs location permission to scan for Bluetooth devices.',
                            buttonPositive: 'OK',
                        }
                    );
                    return granted === PermissionsAndroid.RESULTS.GRANTED;
                }
            } else {
                // iOS permissions can be handled similarly
                const granted = await request(PERMISSIONS.IOS.BLUETOOTH);
                return granted === RESULTS.GRANTED;
            }
        } catch (error) {
            console.error('Error requesting Bluetooth permission:', error);
            return false;
        }
    };

    const enableBluetooth = async () => {
        try {
            await BluetoothStateManager.requestToEnable();
            setIsBluetoothEnabled(true);
            navigation.navigate('ConnectDevice', { device: null });
        } catch (error) {
            console.error('Failed to enable Bluetooth:', error);
            Alert.alert('Bluetooth Error', 'Failed to enable Bluetooth.');
        }
    };

    const handleContinue = async () => {
        try {
            const hasPermission = await requestBluetoothPermission();
            if (hasPermission) {
                const state = await BluetoothStateManager.getState();
                if (state !== 'PoweredOn') {
                    await enableBluetooth();
                } else {
                    setIsBluetoothEnabled(true);
                    navigation.navigate('ConnectDevice', { device: null });   // Additional logic if Bluetooth is already enabled
                }
            } else {
                Alert.alert('Permission Denied', 'Bluetooth functionality requires permission to enable.');
            }
        } catch (error) {
            console.error('Error handling permissions:', error);
            Alert.alert('Permission Error', 'Failed to handle permissions.');
        }
    };
    
  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Manage Device</Text>
        </View>
            <TouchableOpacity  onPress={handleContinue} activeOpacity={0.7} style={[styles.buttonContainer, styles.elevatedLogo]}>
                <Text style={[styles.buttonText, styles.elevatedText]}>Add Device</Text>
                <Icon style={styles.icon} name="plus" />
            </TouchableOpacity>
        <View style={styles.subTitleContainer}>
                <Text style={styles.subTitle}>Please move closer to your device</Text>
        </View>
        <Image source={require('../Assets/connectDevice-shadow.png')}
         style={styles.cardImage}
         />

    </View>
  )
}

export default AddDevice

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#E3FEF7",
        padding: width * 0.05,
    },
    titleContainer:{
        height: height * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        color: '#135D66',
        fontWeight: '600',
        fontSize: width * 0.12,
    },
    buttonContainer:{
        backgroundColor: 'rgba(119, 176, 170, 0.9)',
        height: height * 0.08,
        width: width * 0.85,
        flexDirection:'row',
        borderRadius: 28,
        alignSelf:'center',
        padding:'4%',
        paddingHorizontal:'6%',
        opacity:0.8
    },
    buttonText:{
        fontSize: width * 0.052,
        fontWeight: '500',
        textAlign:'left',
        color: '#003C43',

    },
    icon:{
        fontSize: width * 0.045,
        color: '#003C43',
        alignSelf:'center',
        marginLeft:width*0.45,   
    },
    subTitleContainer:{
        height: height * 0.14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTitle:{
        color: '#135D66',
        fontSize: width * 0.054,
        fontWeight: '600',
    },
    cardImage:{
        height:height*0.34,
        width:width*0.96,
        alignSelf:'center',
        marginRight:width*0.06,
        opacity:0.96     
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
            height: 8,
        },
        shadowOpacity: 0.85,
        shadowRadius: 6,
        elevation: 10,
    },
})

