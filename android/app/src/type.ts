// src/types.ts
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    AddDevice: undefined;
    ConnectDevice: undefined;
    HomeScreen:undefined;
    GraphScreen:undefined;
    SendCredentials:undefined;
};

export type AddDeviceNavigationProp = StackNavigationProp<
    RootStackParamList,
    'AddDevice'
>;
