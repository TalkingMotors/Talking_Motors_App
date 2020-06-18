/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import App from './App2';
import {name as appName} from './app.json';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () =>gestureHandlerRootHOC(App));


