import { NavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  OtpScreen: { verificationId: string | null; userData: any };
};

export type AppStackParamList = {
  HomeScreen: undefined;
  GraphScreen: undefined;
  PredictScreen: undefined;
  AddDevice: { userData: any };
  ConnectDevice: { device: any };
  SendCredentials: { device: any };
};


export type OtpScreenRouteProp = RouteProp<AuthStackParamList, 'OtpScreen'>;
export type AddDeviceRouteProp = RouteProp<AppStackParamList, 'AddDevice'>;
export type ConnectDeviceRouteProp = RouteProp<AppStackParamList, 'ConnectDevice'>;
export type SendCredentialsRouteProp = RouteProp<AppStackParamList, 'SendCredentials'>;



export type AddDeviceNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'AddDevice'
>;

export type ConnectDeviceNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'ConnectDevice'

>;

export type HomeScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'HomeScreen'>;
export type PredictScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'PredictScreen'>;
export type GraphScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'GraphScreen'>;