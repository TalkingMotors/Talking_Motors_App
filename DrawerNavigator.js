import ContentComponent from './ContentComponent';
import { Dimensions } from 'react-native';
import StackNavigator from './StackNavigator';


import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Search from './src/screens/Search';
import Dashboard from './src/screens/Dashboard';
import Detail from './src/screens/Detail';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Message from './src/screens/Message';
import Register from './src/screens/Register';

import ListVehicle from './src/screens/ListVehicle';
import ListingType from './src/screens/ListingType';
import VehicleType from './src/screens/VehicleType';
import ChangePassword from './src/screens/ChangePassword';
import ResetPassword from './src/screens/ResetPassword';
import Messenger from './src/screens/Messenger';
import SearchResultVehicle from './src/screens/SearchResultVehicle';

const MyDrawerNavigator = createDrawerNavigator({
    Home: { screen: StackNavigator },
    Profile: { screen: Profile },
    Search: { screen: Search },
    Login: { screen: Login },
    Register: { screen: Register },
    Dashboard: { screen: Dashboard },
    Detail: { screen: Detail },
    Message: { screen: Message },
    ListVehicle: { screen: ListVehicle, },
    ListingType: { screen: ListingType, },
    VehicleType: { screen: VehicleType, },
    ChangePassword: { screen: ChangePassword, },
    ResetPassword: { screen: ResetPassword, },
    Messenger: { screen: Messenger, },
    SearchResultVehicle: { screen: SearchResultVehicle, },
},
    {
        initialRouteName: 'Home',
        contentComponent: ContentComponent,
        drawerWidth: '75%',
        drawerPosition: 'left',
    }
);

const AppContainer = createAppContainer(MyDrawerNavigator);

export default class DrawerNavigator extends Component {
    render() {
        return <AppContainer />;
    }
}



