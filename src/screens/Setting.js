import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Image,
    Switch
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { Apptheme, lightText, darkText, LinearColor, lightBg } from '../helpers/CommponStyle';
import Topbar from '../components/Topbar';
import Storage from '../helpers/Storage';
import * as Utilities from "../helpers/Utilities";
import * as UserService from '../services/User';
import Constants from "../helpers/Constants";
export default class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            NotificationSwitch: false,
            NotificationSound: false,
            NotificationVibrate: false,
            NotificationLed: false,
            LocationService: false
        }

        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            if (Object.keys(Storage.userData).length > 0) {
                var notification = Storage.userData.notificationsEnabled;
                var location = Storage.userData.locationServicesEnabled
                this.setState({
                    NotificationSwitch: notification,
                    LocationService: location
                })
            }

        })


    }


    UpdatesUserService = async (userObj) => {
        var userObject = {
            email: userObj.email,
            name: userObj.name,
            nickname: userObj.nickname,
            telephone: userObj.telephone,
            notificationsEnabled: this.state.NotificationSwitch,
            locationServicesEnabled: this.state.LocationService
        }
       UserService.updateUser(userObject).then(response => {
            if (response) {
                if (response.success) {
                }
            }
        })
    }


    NotificationSwitch = (value) => {
        this.setState({ NotificationSwitch: value }, () => {
            Storage.userData.notificationsEnabled = value;
            Utilities.asyncStorage_RemoveKey(Constants.USER_DATA)
            Utilities.asyncStorage_SaveKey(Constants.USER_DATA, JSON.stringify(Storage.userData))
            this.UpdatesUserService(Storage.userData)
        })


    }
    LocationService = (value) => {
        this.setState({ LocationService: value }, () => {
            Storage.userData.locationServicesEnabled = value;
            Utilities.asyncStorage_RemoveKey(Constants.USER_DATA)
            Utilities.asyncStorage_SaveKey(Constants.USER_DATA, JSON.stringify(Storage.userData))
            this.UpdatesUserService(obj)
        })

    }
    NotificationLed = (value) => {
        this.setState({ NotificationLed: value })
    }
    NotificationVibrate = (value) => {
        this.setState({ NotificationVibrate: value })
    }
    NotificationSound = (value) => {
        this.setState({ NotificationSound: value })
    }
    render() {
        return (
            <View>
                <Topbar ParentPage="Setting" navigation={this.props} />
                <Text style={styles.MainText}>
                    Update your settings for the app
                    </Text>

                <LinearGradient colors={LinearColor} style={{ marginHorizontal: '2%', borderRadius: 5, paddingVertical: 10, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                    <Text style={{ fontSize: 18, color: lightText, fontWeight: 'bold' }}>
                        SETTINGS
                        </Text>
                </LinearGradient>

                <View style={styles.MainView}>

                    <View style={styles.TextView}>
                        <Text style={styles.Text}>Notification</Text>
                        <Switch
                            thumbColor={Apptheme}
                            onValueChange={this.NotificationSwitch}
                            value={this.state.NotificationSwitch} />
                    </View>

                    <View style={styles.TextView}>
                        <Text style={styles.Text}>Notification Sound</Text>
                        <Switch
                            thumbColor={Apptheme}
                            onValueChange={this.NotificationSound}
                            value={this.state.NotificationSound} />
                    </View>


                    <View style={styles.TextView}>
                        <Text style={styles.Text}>Notification Vibrate</Text>
                        <Switch
                            thumbColor={Apptheme}
                            onValueChange={this.NotificationVibrate}
                            value={this.state.NotificationVibrate} />
                    </View>


                    <View style={styles.TextView}>
                        <Text style={styles.Text}>Notification LED</Text>
                        <Switch
                            thumbColor={Apptheme}
                            onValueChange={this.NotificationLed}
                            value={this.state.NotificationLed} />
                    </View>


                    <View style={styles.TextView}>
                        <Text style={styles.Text}>Location Services</Text>
                        <Switch
                            thumbColor={Apptheme}
                            onValueChange={this.LocationService}
                            value={this.state.LocationService} />
                    </View>





                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    MainText: {
        padding: 10,
        marginTop: 10,
        fontSize: 14,
        textAlign: 'center'

    },
    MainView: {
        width: '92%',
        marginHorizontal: '4%'
    },
    View: {
        flexDirection: 'row',

    },
    TextView: {
        marginVertical: 5,
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between'
    },
    Text: {
        fontSize: 16
    }

})