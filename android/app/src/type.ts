// src/types.ts
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    AddDevice: undefined;
    ConnectDevice: undefined;
};

export type AddDeviceNavigationProp = StackNavigationProp<
    RootStackParamList,
    'AddDevice'
>;
