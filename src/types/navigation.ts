import { NavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  OtpScreen: { verificationId: string | null; userData: any };
  AddDevice: { userData: any };
  ConnectDevice: { device: any };
  SendCredentials: { device: any };
};

export type OtpScreenRouteProp = RouteProp<AuthStackParamList, 'OtpScreen'>;
export type AddDeviceRouteProp = RouteProp<AuthStackParamList, 'AddDevice'>;
export type ConnectDeviceRouteProp = RouteProp<AuthStackParamList, 'ConnectDevice'>;
export type SendCredentialsRouteProp = RouteProp<AuthStackParamList, 'SendCredentials'>;


export type AddDeviceNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'AddDevice'
>;

export type ConnectDeviceNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'ConnectDevice'

>;