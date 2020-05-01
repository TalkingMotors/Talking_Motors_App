import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Button,
    Image,
    TextInput,
    StatusBar,
    StyleSheet,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { Apptheme, lightText, darkText, LinearColor, lightBg } from '../helpers/CommponStyle';
import Topbar from '../components/Topbar';
import TalkModal from '../components/Talk';
import SearchVehicleModal from '../components/SearchVehicle';
import { TouchableHighlight } from 'react-native-gesture-handler';

import * as UserService from '../services/User';
import * as Utilities from "../helpers/Utilities";
import Storage from '../helpers/Storage';
import Labels from "../languages/Labels";
import Constants from "../helpers/Constants";
import AndroidNotification from '../components/AndroidNotification';
import IOSNotification from '../components/IOSNotification';
export var SearchVehicleModalToggle;
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTalkModal: false,
            isSearchVehicleModal: false,
            Text1: darkText,
            Text2: lightText,
            Text3: darkText,
            Text4: lightText,
            Text5: darkText,
            parent:''
        }
        this.TalkModalToggle = this.TalkModalToggle.bind(this)
        this.SearchVehicleModalToggle = this.SearchVehicleModalToggle.bind(this)
        this.navigateToVehicleType = this.navigateToVehicleType.bind(this)
        Utilities.asyncStorage_GetKey(Constants.JWT_TOKEN).then(response => {
             Storage.jwt_Token = JSON.parse(response)
        })
    }
    componentDidMount = () => {
        if (Object.keys(Storage.userData).length > 0) {
            this.getUserBy(Storage.userData.userId)
        }
        
    }
    getUserBy = (userId) => {
        try{
            UserService.getUserById(userId).then(respose => {
                if(respose){
                    if(respose.success){
                     Storage.userData = respose.user;
                     Utilities.asyncStorage_SaveKey(Constants.USER_DATA, JSON.stringify(respose.user))
                    }
                }
             })
        }
        catch(e){

        }
    }
    navigateToDashboard = () => {
        if (Object.keys(Storage.userData).length > 0) {
        this.props.navigation.navigate("Dashboard")
        }
        else{
            this.props.navigation.navigate("Login")
        }
    }

    TalkModalToggle = (parent) => {
        this.setState({
            isTalkModal: !this.state.isTalkModal,
           
        })
    }
    SearchVehicleModalToggle = SearchVehicleModalToggle = () => {
        this.setState({
            isSearchVehicleModal: !this.state.isSearchVehicleModal
        })
    }
    navigateToVehicleType = () => {
        this.setState({
            isSearchVehicleModal: false
        }, () => {
            this.props.navigation.navigate("VehicleType");
        })
    }
    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar Dashboard={this.navigateToDashboard} ParentPage="Home" navigation={this.props} />
                <View style={styles.BoxView}>
                    <View style={styles.BoxParent}>
                        <TouchableHighlight
                            activeOpacity={1}
                            underlayColor="transparent"
                            onPressIn={() => this.setState({ Text1: Apptheme })}
                            onPressOut={() => this.setState({ Text1: darkText })}
                            onPress={() => { this.props.navigation.navigate("ListVehicle") }}
                            style={styles.ButtonView}>
                            <View style={styles.BoxTitleView}>
                                <Text style={[styles.BoxTitleText, { color: this.state.Text1 }]}>
                                    ADD A VEHICLE
                        </Text>
                                <Text style={styles.BoxListText}>
                                    list your vehicle to join the community
                        </Text>
                                <FontAwesome5 name="angle-right" size={24} color={Apptheme} style={styles.BoxIcon} />
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.BoxParent}>
                        <TouchableHighlight
                            activeOpacity={1}
                            underlayColor="transparent"
                            onPressIn={() => this.setState({ Text2: Apptheme })}
                            onPressOut={() => this.setState({ Text2: lightText })}
                            onPress={() => {
                                this.setState({
                                    parent:"talk"
                                })
                                this.TalkModalToggle()}}
                            style={styles.ButtonViewImage}>
                            <View style={styles.ImageView}>
                                <Image
                                    source={require('../images/third.png')}
                                    style={styles.Image}
                                />
                                <View style={{ position: 'absolute' }}>
                                    <Text style={[styles.BoxTitleText, { color: this.state.Text2 }]}>
                                        TALK
                                     </Text>
                                    <Text style={{ textAlign: 'center', color: lightText }}>
                                        message other Taking Motors users
                                    </Text>
                                </View>
                                <FontAwesome5 name="angle-right" size={24} color={lightText} style={styles.BoxIcon} />
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.BoxParent}>
                        <TouchableHighlight
                            activeOpacity={1}
                            underlayColor="transparent"
                            onPressIn={() => this.setState({ Text3: Apptheme })}
                            onPressOut={() => this.setState({ Text3: darkText })}
                            onPress={() => this.props.navigation.navigate("ListingType")}
                            style={styles.ButtonView}>
                            <View style={styles.BoxTitleView}>

                                <Text style={[styles.BoxTitleText, { color: this.state.Text3 }]}>
                                    SELL
                        </Text>
                                <Text style={styles.BoxListText}>
                                    advertise your vehicle for sale
                        </Text>
                                <FontAwesome5 name="angle-right" size={24} color={Apptheme} style={styles.BoxIcon} />
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.BoxParent}>
                        <TouchableHighlight
                            activeOpacity={1}
                            // underlayColor="transparent"
                            onPressIn={() => this.setState({ Text4: Apptheme })}
                            onPressOut={() => this.setState({ Text4: lightText })}
                            onPress={() => this.SearchVehicleModalToggle()}
                            style={styles.ButtonViewImage}>
                            <View style={styles.ImageView}>
                                <Image
                                    source={require('../images/third.png')}
                                    style={styles.Image}
                                />
                                <View style={{ position: 'absolute' }}>
                                    <Text style={[styles.BoxTitleText, { color: this.state.Text4 }]}>
                                        SEARCH
                                     </Text>
                                    <Text style={{ textAlign: 'center', color: lightText }}>
                                        browse all vehicles that are available now
                                    </Text>
                                </View>
                                <FontAwesome5 name="angle-right" size={24} color={lightText} style={styles.BoxIcon} />
                            </View>
                        </TouchableHighlight>
                    </View>


                    <View style={styles.BoxParent}>
                        <TouchableHighlight
                            activeOpacity={1}
                            underlayColor="transparent"
                            onPressIn={() => this.setState({ Text5: Apptheme })}
                            onPressOut={() => this.setState({ Text5: darkText })}
                            onPress={() => {
                                this.setState({
                                    parent:"vehicle_Check"
                                })
                                this.TalkModalToggle()}}
                            style={styles.ButtonView}>
                            <View style={styles.BoxTitleView}>

                                <Text style={[styles.BoxTitleText, { color: this.state.Text5 }]}>
                                    VEHICLE CHECK
                        </Text>
                                <Text style={styles.BoxListText}>
                                    perform an official DVLA vehicle check
                        </Text>
                                <FontAwesome5 name="angle-right" size={24} color={Apptheme} style={styles.BoxIcon} />
                            </View>
                        </TouchableHighlight>
                    </View>



                </View>
                {
                Platform.OS == "ios" ? <IOSNotification props={this.props} />
                  :
                 <AndroidNotification props={this.props} />
                }
              
                {this.state.isTalkModal &&
                    <TalkModal parent={this.state.parent} navigation={this.props.navigation} TalkModalToggle={this.TalkModalToggle} />
                }
                {this.state.isSearchVehicleModal &&
                    <SearchVehicleModal navigateToVehicleType={this.navigateToVehicleType} TalkModalToggle={this.TalkModalToggle} SearchVehicleModalToggle={this.SearchVehicleModalToggle} />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ParentView: {
        width: '100%',
        height: '100%',
        backgroundColor: lightBg,
        // backgroundColor: 'lightgray',

    },
    BoxView: {
        height: '93%', flexDirection: 'column', width: '100%'
    },
    BoxParent: {
        width: '100%', height: '20%'
    },
    ButtonView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    ButtonViewImage: {
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    BoxTitleView: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    BoxTitleText: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center'
    },
    BoxListText: {
        textAlign: 'center'
    },
    BoxIcon: {
        position: 'absolute',
        right: 20
    },

    ImageView:{
        height: '100%', 
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    Image:{
        width: '100%', 
        height: '100%' 
    }




})