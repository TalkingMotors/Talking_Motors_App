import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Search from './src/screens/Search';
import Dashboard from './src/screens/Dashboard';
import Detail from './src/screens/Detail';
import Message from './src/screens/Message';
import ListVehicle from './src/screens/ListVehicle';
import ListingType from './src/screens/ListingType';
import VehicleType from './src/screens/VehicleType';
import ChangePassword from './src/screens/ChangePassword';
import ResetPassword from './src/screens/ResetPassword';
import Messenger from './src/screens/Messenger';
import SearchResultVehicle from './src/screens/SearchResultVehicle';
import EditVehicle from './src/screens/EditVehicle';
import EditVehicleImage from './src/screens/EditVehicleImage';
import BlockUser from './src/screens/BlockUser';
import Setting from './src/screens/Setting';
import ForgotPassword from './src/screens/ForgotPassword';
import UsersVehicle from './src/screens/UsersVehicle';
import Favourites from './src/screens/Favourites';
import Users from './src/screens/Users';

const MyStackNavigator = createStackNavigator(
    {
        Login: { screen: Login },
        Register: { screen: Register },
        Home: { screen: Home },
        Profile: { screen: Profile },
        Search: { screen: Search },
        Dashboard: { screen: Dashboard },
        Detail: { screen: Detail },
        Message: { screen: Message },
        ListVehicle: { screen: ListVehicle },
        ListingType: { screen: ListingType },
        VehicleType: { screen: VehicleType },
        ChangePassword: { screen: ChangePassword },
        ResetPassword: { screen: ResetPassword },
        Messenger: { screen: Messenger },
        SearchResultVehicle: { screen: SearchResultVehicle },
        EditVehicle: { screen: EditVehicle },
        EditVehicleImage: { screen: EditVehicleImage },
        BlockUser: { screen: BlockUser },
        Setting: { screen: Setting },
        ForgotPassword: { screen: ForgotPassword },
        UsersVehicle: { screen: UsersVehicle },
        Favourites: { screen: Favourites },
        Users: { screen: Users },
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'
    }
);

const AppContainer = createAppContainer(MyStackNavigator);

export default class StackNavigator extends Component {
    render() {
       return <AppContainer screenProps={{ openDraw: () => this.props.navigation.dispatch(DrawerActions.openDrawer()) }} />;
    }
}