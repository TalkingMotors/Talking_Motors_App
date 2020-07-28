// import React, {Component} from 'react';
// import DrawerNavigator from './DrawerNavigator';
// console.disableYellowBox = true;
// export default class App extends Component {
//   render() {
//     return (
//       <DrawerNavigator />
//     );
//   }
// }

import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image
} from 'react-native';
import { createDrawerNavigator, DrawerItems, DrawerActions } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
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
import CreateGroup from './src/screens/CreateGroup';
import NotificationBadges from './src/components/NotificationBadge';
import ContentComponent from './ContentComponent';
import LoginScreen from './src/screens/Login'
import HomeScreen from './src/screens/Home'
console.disableYellowBox = true;
// export default class App extends React.Component {
//     render() {
//         return <AppDrawer />;
//     }
// }

// const CustomDrawerComponent = props => {
//     return (
//         <ScrollView>
//             <SafeAreaView >
//                 <ContentComponent props={props} />
//             </SafeAreaView>
//         </ScrollView>

//     );
// }

const AppNavigator = createStackNavigator({
    Login: { screen: Login },
    Home: { screen: Home },
    Profile: { screen: Profile },
    Dashboard: { screen: Dashboard },
    Search: { screen: Search },
    ListVehicle: { screen: ListVehicle, },
    Message: { screen: Message },
    Setting: { screen: Setting, },
    Favourites: { screen: Favourites, },
    Messenger: { screen: Messenger, },
    Register: { screen: Register },
    ListingType: { screen: ListingType, },
    Detail: { screen: Detail },
    VehicleType: { screen: VehicleType, },
    ChangePassword: { screen: ChangePassword, },
    ResetPassword: { screen: ResetPassword, },
    SearchResultVehicle: { screen: SearchResultVehicle, },
    EditVehicleImage: { screen: EditVehicleImage, },
    EditVehicle: { screen: EditVehicle, },
    BlockUser: { screen: BlockUser, },
    UsersVehicle: { screen: UsersVehicle, },
    CreateGroup: { screen: CreateGroup, },
    Users: { screen: Users, },
    ForgotPassword: { screen: ForgotPassword, },
    NotificationBadges: { screen: NotificationBadges, }

},
    {
        headerMode: 'none',
        mode: 'modal',
        defaultNavigationOptions: {
            gesturesEnabled: false,
        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 0,
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;

                const height = layout.initHeight;
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0],
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                });

                return { opacity, transform: [{ translateY }] };
            },
        }),
    }
);

const TalkingMotors = createAppContainer(AppNavigator)
export default TalkingMotors

// const AppDrawerContainer = createDrawerNavigator({
// Login: { screen: Login },
// Home: { screen: Home },
// Profile: { screen: Profile },
// Dashboard: { screen: Dashboard },
// Search: { screen: Search },
// ListVehicle: { screen: ListVehicle, },
// Message: { screen: Message },
// Setting: { screen: Setting, },
// Favourites: { screen: Favourites, },
// Messenger: { screen: Messenger, },
// Register: { screen: Register },
// ListingType: { screen: ListingType, },
// Detail: { screen: Detail },
// VehicleType: { screen: VehicleType, },
// ChangePassword: { screen: ChangePassword, },
// ResetPassword: { screen: ResetPassword, },
// SearchResultVehicle: { screen: SearchResultVehicle, },
// EditVehicleImage: { screen: EditVehicleImage, },
// EditVehicle: { screen: EditVehicle, },
// BlockUser: { screen: BlockUser, },
// UsersVehicle: { screen: UsersVehicle, },
// CreateGroup: { screen: CreateGroup, },
// Users: { screen: Users, },
// NotificationBadges: { screen: NotificationBadges, },
// },
//     {
//         initialRouteName: 'Home',
//         contentComponent: ContentComponent,
//         // contentComponent: CustomDrawerComponent,
//         drawerWidth: '75%',
//         drawerPosition: 'left',
//     }
// );

// const AppSwitchNavigator = createSwitchNavigator({
//     Home: { screen: AppDrawerContainer },
//     Login: { screen: StackNavigator },

// }, {
//     initialRouteName: 'Login',
// });

// const AppContainer = createAppContainer(AppSwitchNavigator);

// const AppDrawer = createAppContainer(AppContainer);