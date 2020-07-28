import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Image,
    TouchableHighlight,
    StyleSheet,
    Modal,
    StatusBar,

} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { SearchVehicleModalToggle } from './src/screens/Home';
import CommponStyle, { Apptheme, lightText, lightBg, darkText, LinearColor } from './src/helpers/CommponStyle';

import * as Utilities from "./src/helpers/Utilities";
import Constants from "./src/helpers/Constants";
import Storage from './src/helpers/Storage';

export default class ContentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModal: false
        }

    }
    ToggleModal = () => {
        this.setState({
            isModal: !this.state.isModal
        })
    }
    navigatetoComponent = (pageName) => {
        if (Object.keys(Storage.userData).length > 0) {
            this.props.toggle()
            this.props.navigation.navigate(pageName)
        }
        else {
            this.ToggleModal()
            // this.props.navigation.navigate("Login")
        }
    }
    render() {
        return (
            // <ScrollView style={[styles.animatedDrawer]}>
            <View style={styles.ParentView}>
                <LinearGradient colors={LinearColor} style={styles.SidebarProfileView}>
                    <View style={styles.userProfileView}>

                        {!Utilities.stringIsEmpty(Storage.userData.thumbUrl) ?
                            <Image
                                style={{ borderRadius: 55, width: '100%', height: '100%' }}
                                source={{ uri: Storage.userData.thumbUrl }}
                            />
                            :
                            <FontAwesome name='user' color="gray" size={40} />
                        }

                    </View>
                    <View style={{ width: '50%', }}>
                        <Text style={styles.userEmail}>
                            Welcome  {'\n'} {Storage.userData.name}
                        </Text>
                    </View>
                </LinearGradient>
                <TouchableOpacity onPress={() => {
                    this.props.toggle()
                    this.props.navigation.navigate('Home')
                    // this.props.navigation.closeDrawer()
                }
                } style={styles.SideMenuItemView}>
                    <View style={styles.IconView}>
                        <FontAwesome name='home' style={styles.SideMenuIcon} />
                    </View>
                    <Text style={styles.SideMenuText}>
                        Home
                    </Text>
                </TouchableOpacity>
                {Object.keys(Storage.userData).length > 0 &&

                    <TouchableOpacity onPress={() => this.navigatetoComponent('Profile')} style={styles.SideMenuItemView}>
                        <View style={styles.IconView}>
                            <FontAwesome name='address-card' style={styles.SideMenuIcon}
                            />
                        </View>
                        <Text style={styles.SideMenuText}>
                            Profile
                    </Text>
                    </TouchableOpacity>
                }

                <TouchableOpacity onPress={() => this.navigatetoComponent('Dashboard')} style={styles.SideMenuItemView}>
                    <View style={styles.IconView}>
                        <FontAwesome name='dashboard' style={styles.SideMenuIcon}
                        />
                    </View>
                    <Text style={styles.SideMenuText}>
                        My dashboard
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    // this.props.navigation.closeDrawer()
                    this.props.toggle()
                    SearchVehicleModalToggle()
                }
                } style={styles.SideMenuItemView}>
                    <View style={styles.IconView}>
                        <FontAwesome name='search' style={styles.SideMenuIcon}
                        />
                    </View>
                    <Text style={styles.SideMenuText}>
                        Search
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.navigatetoComponent('ListingType')} style={styles.SideMenuItemView}>
                    <View style={styles.IconView}>
                        <FontAwesome name='tags' style={styles.SideMenuIcon}
                        />
                    </View>
                    <Text style={styles.SideMenuText}>
                        Sell your Vehicle
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.navigatetoComponent('Message')} style={styles.SideMenuItemView}>
                    <View style={styles.IconView}>
                        <Feather name='message-square' style={styles.SideMenuIcon}
                        />
                    </View>
                    <Text style={styles.SideMenuText}>
                        Messages
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.navigatetoComponent('Favourites')} style={styles.SideMenuItemView}>
                    <View style={styles.IconView}>
                        <FontAwesome name='star' style={styles.SideMenuIcon}
                        />
                    </View>
                    <Text style={styles.SideMenuText}>
                        Favourites
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        this.props.toggle()
                        this.props.navigation.navigate('Setting')
                    }}
                    style={styles.SideMenuItemView}>
                    <View style={styles.IconView}>
                        <Feather name='settings' style={styles.SideMenuIcon}
                        />
                    </View>
                    <Text style={styles.SideMenuText}>
                        Settings
                    </Text>
                </TouchableOpacity>

                {(Object.keys(Storage.userData).length > 0) ?
                    <TouchableOpacity onPress={() => {
                        Utilities.asyncStorage_RemoveKey(Constants.USER_DATA)
                        Utilities.asyncStorage_RemoveKey(Constants.JWT_TOKEN)
                        Utilities.asyncStorage_RemoveKey(Constants.DashboardDisplay)
                        Storage.userData = {}
                        this.props.toggle()
                        this.props.navigation.navigate('Login')
                    }
                    } style={styles.SideMenuItemView}>
                        <View style={styles.IconView}>
                            <FontAwesome name='user' style={styles.SideMenuIcon}
                            />
                        </View>
                        <Text style={styles.SideMenuText}>
                            Logout
                    </Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => {
                        this.props.toggle()
                        this.props.navigation.navigate('Login')
                    }
                    } style={styles.SideMenuItemView}>
                        <View style={styles.IconView}>
                            <FontAwesome name='user' style={styles.SideMenuIcon}
                            />
                        </View>
                        <Text style={styles.SideMenuText}>
                            Login
                    </Text>
                    </TouchableOpacity>
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
                    <SafeAreaView style={{ elevation: 10, backgroundColor: '#fff', borderRadius: 10, top: '40%', height: '25%', width: '86%', marginHorizontal: '7%', }}>
                        <View style={{ width: '100%', height: '100%' }}>
                            <View style={{ margin: 5, marginVertical: 5, padding: 5, justifyContent: 'center', }}>
                                <Text style={[styles.headerModalText, { color: darkText, paddingTop: 0, paddingLeft: 10, fontSize: 20, fontWeight: 'bold' }]}>
                                    Login
                            </Text>
                            </View>
                            <View style={{ height: '78%', }}>
                                <View style={{ width: '98%', marginHorizontal: '1%', justifyContent: 'center' }}>

                                    <Text style={{ fontSize: 14, color: "black", paddingHorizontal: 10 }}>
                                        This option in only available to authenticated users. Press 'Login' below
                                        to authenticate and continue with this option
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
                                            this.props.toggle()
                                            this.props.navigation.navigate("Login")
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
            // </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    ParentView: {
        width: '100%',
        height: '100%',
        backgroundColor: lightBg
    },
    animatedDrawer: {
        backgroundColor: '#ffffff',
        top: 32,
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        marginBottom: 25
    },
    SidebarProfileView: {
        width: '100%',
        height: 120,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',

        // backgroundColor: Apptheme
    },
    SideMenuItemView: {
        alignItems: 'center',
        color: '#ff6b00',
        // backgroundColor: 'blue',
        marginTop: 10,
        marginHorizontal: 0,
        flexDirection: 'row',
        height: 30
    },
    SideMenuIcon: {
        // paddingHorizontal: 10,
        color: Apptheme,
        fontSize: 22,
    },
    IconView: {
        alignItems: 'center',
        width: '18%',
    },
    SideMenuText: {
        // paddingHorizontal: 10,
        fontSize: 16,
        color: darkText
    },
    userProfileView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        width: 80,
        height: 80,
        borderRadius: 45,
        backgroundColor: lightText,
    },
    userEmail: {
        color: lightText,
        paddingHorizontal: 5,
        textAlign: 'center'
    },


})