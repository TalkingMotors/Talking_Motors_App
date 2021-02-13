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
    Modal,
    BackHandler,
    StyleSheet, Linking,
    ImageBackground,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { Apptheme, GreenBg, lightText, darkText, LinearColor, lightBg, TooltipBg } from '../helpers/CommponStyle';
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
export var TalkModalToggle;
import { NavigationEvents } from 'react-navigation';
import Sidebar from '../../ContentComponent';
import SideMenu from 'react-native-side-menu';
var headerHeight = 50;
let screenheight = Dimensions.get('window').height;
import DeepLinking from 'react-native-deep-linking';
import Firebase from 'react-native-firebase';
import * as VehicleService from '../services/Vehicle';
var _dynamicLinkListener;
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
            parent: '',
            isTalkModal: false,
            isModal: false,
            check: true,
            isOpen: false,
            toolTipVisible: false,
        }
        this.updateTopBar = this.updateTopBar.bind(this)
        this.toggle = this.toggle.bind(this)
        this.updateMenuState = this.updateMenuState.bind(this)
        this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
        // this.backAndroidHandler=this.backAndroidHandler.bind(this);

        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            this.updateTopBar()
            this.setState({
                parent: ''
            })
            if (Object.keys(Storage.userData).length > 0) {
                this.setState({
                    toolTipVisible: (Storage.userData.thumbUrl != null) ? false : true,
                })

            }

        })
        this.TalkModalToggle = this.TalkModalToggle.bind(this)
        this.SearchVehicleModalToggle = this.SearchVehicleModalToggle.bind(this)
        this.navigateToVehicleType = this.navigateToVehicleType.bind(this)
        Utilities.asyncStorage_GetKey(Constants.JWT_TOKEN).then(response => {
            Storage.jwt_Token = JSON.parse(response)
        })
        Utilities.asyncStorage_GetKey(Constants.DashboardDisplay).then(response => {
            if (JSON.parse(response) == null) {
                Storage.dashboardDisplay = 0
            }
            else {
                Storage.dashboardDisplay = JSON.parse(response)
            }
        })

    }


    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }
    onMenuItemSelected = item =>
        this.setState({
            isOpen: false,
            selectedItem: item,
        });
    updateTopBar = () => {
        this.setState({
            check: !this.state.check
        })
    }

    // backAndroidHandler() {
    //     console.log("this.props",this.props);
    //     // BackHandler.exitApp();
    //     // return true
    // }
    ToggleModal = () => {
        this.setState({
            isModal: !this.state.isModal
        })
    }


    componentDidMount = () => {
        if (Object.keys(Storage.userData).length > 0) {
            this.getUserBy(Storage.userData.userId)


        }

        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
            // BackHandler.removeEventListener('hardwareBackPress', this.backAndroidHandler)
            // this.setState({
            //     isOpen: false
            // })
        })
        this.setUpDynamicLink();
        this.setUpDeepLink();
        // Firebase.links()
        // .getInitialLink()
        // .then((url) => {
        //     console.log("Firebase",url)
        //     // this.handleURL(url);
        // });



    }
    handleUrl = ({ url }) => {
    
    }
    componentWillUnmount() {
        this.cleanUpDynamicLink();
        this.cleanUpDeepLink();
        Linking.removeEventListener('url', this.handleUrl);
        // this.setState({
        //     isOpen: false
        // })
        // BackHandler.removeEventListener('hardwareBackPress', this.backAndroidHandler)
    }
    setUpDynamicLink = () => {
        // will work when link is opening the app
        Firebase.links()
            .getInitialLink()
            .then((url) => {
                this.handleURL(url);
            });

        // listener will work when app is already opened or in background
        this._dynamicLinkListener = Firebase.links().onLink((url) => {
            this.handleURL(url);
        });
    }

setUpDeepLink = () => {
        // will work when link is opening the app
        Linking.getInitialURL().then(url => {
            this.handleURL(url);
        });

        // listener will work when app is already opened or in background
        Linking.addEventListener('url', this.handleURL);
    }

cleanUpDynamicLink = () => {
        this._dynamicLinkListener();
    }

cleanUpDeepLink = () => {
        Linking.removeEventListener('url', this.handleURL);
    }

handleURL = (event) => {
        let url = "";

        if (!event) {
            return "";
        }

        if (typeof event == 'string') {
            url = event;
            url = url.split('/');
            if(url.length ==5){

                let registerNo = url[4]
                 this.navigateToDetailDeepLinking(registerNo)
            }
        } else {
            url = (event.url) ? event.url : "";
        }

        if (!url) {
            return;
        }


    }
    navigateToDetailDeepLinking = async (registerNo) => {
        try {
            response = await VehicleService.searchRegisterNo(registerNo)
            if (!Utilities.stringIsEmpty(response.vehicle) && response.success) {
                this.props.navigation.navigate('Detail', { item: response.vehicle, index: 1, parent: this.props.parent });

            }
        }
        catch (e) {
            console.log("exception e", e)
        }
    }
    getUserBy = (userId) => {
        try {
            UserService.getUserById(userId).then(respose => {
                if (respose) {
                    if (respose.success) {
                        Storage.userData = respose.user;
                        Utilities.asyncStorage_SaveKey(Constants.USER_DATA, JSON.stringify(respose.user))
                    }
                }
            })
        }
        catch (e) {

        }
    }
    navigateToDashboard = () => {
        if (Object.keys(Storage.userData).length > 0) {
            this.props.navigation.navigate("Dashboard")
        }
        else {
            this.props.navigation.navigate("Login")
        }
    }

    navigateToProfile = () => {
        if (Object.keys(Storage.userData).length > 0) {

            this.props.navigation.navigate("Profile")

        }
        else {
            this.props.navigation.navigate("Login")
        }
    }

    TalkModalToggle = TalkModalToggle = (parent) => {
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
        const { navigation } = this.props;
        this.props.navigation.state.params = { title: 'Home' };

        const menu = <Sidebar navigation={this.props.navigation}
            toggle={this.toggle}
        />;
        return (
            <SideMenu
                menu={menu}
                menuPosition={'left'}
                disableGestures={true}
                openMenuOffset={Dimensions.get('window').width * (2 / 2.35)}
                isOpen={this.state.isOpen}
                onChange={(isOpen) => {
                    this.updateMenuState(isOpen)
                }}

            >

                <SafeAreaView style={{ flex: 0, backgroundColor: Apptheme }} />

                <View onLayout={event => {
                    const layout = event.nativeEvent.layout;
                    headerHeight = layout.height
                }}>
                    <Topbar
                        toggle={this.toggle}
                        updateTopBar={this.updateTopBar}
                        Dashboard={this.navigateToDashboard}
                        Profile={this.navigateToProfile}
                        ParentPage="Home"
                        navigation={this.props} />



                    {Object.keys(Storage.userData).length > 0 && this.state.toolTipVisible &&
                        <View style={{ width: 150, height: 40, borderRadius: 5, position: 'absolute', top: 60, right: 5, backgroundColor: TooltipBg, justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesome name="caret-up"
                                size={26}
                                color={TooltipBg}
                                style={{ position: 'absolute', top: -18 }}
                            />
                            <Text style={{ color: lightText }}>Add a profile image</Text>
                        </View>
                    }
                </View>
                <View style={styles.ParentView}>
                    <View style={styles.BoxView}>


                        <View style={styles.BoxParent}>
                            <TouchableOpacity
                                activeOpacity={1}
                                underlayColor="transparent"
                                onPressIn={() => this.setState({ Text1: Apptheme })}
                                onPressOut={() => this.setState({ Text1: darkText })}
                                onPress={() => {
                                    if (Object.keys(Storage.userData).length > 0) {
                                        this.props.navigation.navigate("ListVehicle");
                                    }
                                    else {
                                        this.ToggleModal();
                                    }
                                }}
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
                            </TouchableOpacity>
                        </View>

                        <View style={styles.BoxParent}>
                            <TouchableOpacity
                                activeOpacity={1}
                                underlayColor="transparent"
                                onPressIn={() => this.setState({ Text2: Apptheme })}
                                onPressOut={() => this.setState({ Text2: lightText })}
                                onPress={() => {
                                    this.state.parent = "talk"
                                    this.setState({
                                        parent: this.state.parent
                                    })
                                    this.TalkModalToggle()
                                }}
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
                                            message other Talking Motors users
                                    </Text>
                                    </View>
                                    <FontAwesome5 name="angle-right" size={24} color={lightText} style={styles.BoxIcon} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.BoxParent}>
                            <TouchableOpacity
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
                            </TouchableOpacity>
                        </View>

                        <View style={styles.BoxParent}>
                            <TouchableOpacity
                                activeOpacity={1}
                                // underlayColor="transparent"
                                onPressIn={() => this.setState({ Text4: Apptheme })}
                                onPressOut={() => this.setState({ Text4: lightText })}
                                onPress={() => {
                                    this.state.parent = "talk"
                                    this.setState({
                                        parent: this.state.parent
                                    })
                                    this.SearchVehicleModalToggle()
                                }}
                                style={styles.ButtonViewImage}>
                                <View style={styles.ImageView}>
                                    <Image
                                        source={require('../images/second.png')}
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
                            </TouchableOpacity>
                        </View>


                        <View style={styles.BoxParent}>
                            <TouchableOpacity
                                activeOpacity={1}
                                underlayColor="transparent"
                                onPressIn={() => this.setState({ Text5: Apptheme })}
                                onPressOut={() => this.setState({ Text5: darkText })}
                                onPress={() => {

                                    this.state.parent = "vehicle_Check"
                                    this.setState({
                                        parent: this.state.parent
                                    })
                                    this.TalkModalToggle()
                                }}
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
                            </TouchableOpacity>
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

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.isModal}
                        onRequestClose={() => {
                            console.warn("Modal has been closed.");
                            this.ToggleModal()
                        }}

                    >
                        <SafeAreaView style={{ elevation: 10, backgroundColor: '#fff', borderRadius: 10, top: '40%', height: '20%', width: '86%', marginHorizontal: '7%', }}>
                            <View style={{ width: '100%', height: '100%' }}>
                                <View style={{ margin: 5, marginVertical: 5, padding: 5, justifyContent: 'center', }}>
                                    <Text style={[styles.headerModalText, { color: darkText, paddingTop: 0, paddingLeft: 10, fontSize: 20, fontWeight: 'bold' }]}>
                                        Add a vehicle
                            </Text>
                                </View>
                                <View style={{ height: '78%', }}>
                                    <View style={{ width: '98%', marginHorizontal: '1%', justifyContent: 'center' }}>

                                        <Text style={{ fontSize: 14, color: "black", paddingHorizontal: 10 }}>
                                            You need to be logged in to add a vehicle.
                                    </Text>
                                        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: "flex-end" }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.ToggleModal()
                                                }} style={{ padding: 10, marginHorizontal: 5 }}>
                                                <Text style={{ color: Apptheme, }}>
                                                    CANCEL
                                        </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => {
                                                this.ToggleModal()
                                                this.props.navigation.replace("Login")
                                            }} style={{ padding: 10, marginHorizontal: 5 }}>
                                                <Text style={{ color: Apptheme, }}>
                                                    LOGIN
                                        </Text>
                                            </TouchableOpacity>
                                        </View>


                                    </View>
                                </View>
                            </View >
                        </SafeAreaView>
                    </Modal>
                </View>
            </SideMenu>
        )
    }
}

const styles = StyleSheet.create({
    ParentView: {
        width: '100%',
        height: '100%',
        backgroundColor: lightBg,
        // zIndex: -1
        // backgroundColor: 'lightgray',

    },
    BoxView: {
        height: screenheight - headerHeight, flexDirection: 'column', width: '100%'
    },
    BoxParent: {
        width: '100%', height: '19%'
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

    ImageView: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Image: {
        width: '100%',
        height: '100%'
    }




})