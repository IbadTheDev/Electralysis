import {Dimensions, Image, StyleSheet, Text, Alert, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Progress from 'react-native-progress';
import BleManager from 'react-native-ble-manager';
import {NativeEventEmitter, NativeModules} from 'react-native';
import SendCredentials from './SendCredentials';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {
  AuthStackParamList,
  ConnectDeviceNavigationProp,
  ConnectDeviceRouteProp,
} from '../src/types/navigation';
import Snackbar from 'react-native-snackbar';

const {width, height} = Dimensions.get('window');

type ConnectDeviceProps = {
  route: ConnectDeviceRouteProp;
  navigation: ConnectDeviceNavigationProp;
};

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

interface Device {
  id: string;
  name: string;
}

const ConnectDevice = ({route, navigation}: ConnectDeviceProps) => {
  const [progress, setProgress] = useState(0);
  const [connecting, setConnecting] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null); // State to store the discovered device

  useEffect(() => {
    BleManager.start({showAlert: false});
    //add esp ka name yahan par
        const handleDiscoverPeripheral = (peripheral: Device)=> {
          if (peripheral.name === 'ESP32_BLE') {
            console.log('Discovered peripheral:', peripheral);
            connectToDevice(peripheral);
          }
        };
    
        const handleStopScan = () => {
          console.log('Scan stopped');
        };
    
        bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
        bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
    
        startScan();
    
        return () => {
            bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
            bleManagerEmitter.removeAllListeners('BleManagerStopScan');
        };
      }, []);
    
      const startScan = () => {
        setConnecting(true);
        setProgress(0);
        BleManager.scan([], 5, true).then(() => {
          console.log('Scanning...');
        });
      };
    // check kitna time lag raha hai then yahan par change karna interval progress bar ka
      const connectToDevice = (device: Device) => {
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 1) {
              clearInterval(interval);
              return prev;
            }
            return prev + 0.2;
          });
        }, 1000);
    
        BleManager.connect(device.id)
          .then(() => {
            clearInterval(interval);
            setProgress(1);
            setConnecting(false);
            console.log('Connected to', device.id);
            Snackbar.show({
              text: 'Success: Connected to Electralysis Device',
              duration: Snackbar.LENGTH_LONG
          })


        // Set the connected device
        setConnectedDevice(device);

        // navigation to wifi credentials input jub connect ho jaye bluetooth

        navigation.navigate('SendCredentials', {device});
      })
      .catch((error: any) => {
        clearInterval(interval);
        setConnecting(false);
        setProgress(0);
        console.log('Connection error', error);
        Snackbar.show({
          text: 'Connection Error: Failed to connect to device. Please try again.',
          duration: Snackbar.LENGTH_LONG,
        });
      });
  };

  useEffect(() => {
    if (connectedDevice) {
      navigation.navigate('SendCredentials', {device: connectedDevice});
    }
  }, [connectedDevice, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Connecting</Text>
      </View>
      <View style={styles.progressContainer}>
        <Image
          source={require('../Assets/device-icon.jpg')}
          style={styles.deviceIcon}
        />
        <Progress.Bar
          progress={progress}
          width={width * 0.4}
          color="#003C43"
          style={styles.progressBar}
        />
        <Image
          source={require('../Assets/mobile-icon.jpg')}
          style={styles.mobileIcon}
        />
      </View>
      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitle}>Pairing up Via Buetooth</Text>
        <Text style={styles.subTitle}>Please Wait</Text>
      </View>
      <Image
        source={require('../Assets/finding.png')}
        style={styles.cardImage}
      />
    </View>
  );
};

export default ConnectDevice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3FEF7',
    padding: width * 0.05,
  },
  titleContainer: {
    height: height * 0.25,
    marginTop: height * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#135D66',
    fontWeight: '600',
    fontSize: width * 0.12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    width: width * 0.56,
    height: height * 0.01,
    marginTop: height * 0.03,
    marginHorizontal: width * 0.02, // Add some margin to separate the images and progress bar
  },
  deviceIcon: {
    height: height * 0.08,
    width: width * 0.16,
    opacity: 0.84,
    borderRadius: 16,
  },

  mobileIcon: {
    height: height * 0.08,
    width: width * 0.16,
    opacity: 0.84,
    borderRadius: 16,
    marginRight: width * 0.003,
  },
  subTitleContainer: {
    height: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  subTitle: {
    color: '#135D66',
    fontSize: width * 0.044,
    fontWeight: '600',
  },
  cardImage: {
    height: height * 0.26,
    width: width * 0.86,
    marginRight: width * 0.04,
    alignSelf: 'center',
    marginTop: height * 0.08,
    opacity: 0.96,
  },

  elevatedText: {
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 1, height: 3},
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
});
