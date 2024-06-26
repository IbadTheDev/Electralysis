/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

AppRegistry.registerComponent(appName, () => App);
