import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Image,
    TouchableHighlight,
    StyleSheet

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

    }
    render() {
        return (
            <View style={styles.ParentView}>
                <LinearGradient colors={LinearColor} style={styles.SidebarProfileView}>
                    <View style={styles.userProfileView}>
                        {/* <FontAwesome name='user' color="gray" size={40} /> */}
                        <Image
                                style={{ borderRadius: 55, width: '100%', height: '100%' }}
                                source={{ uri: Storage.userData.thumbUrl }}
                            />
                    </View>
                    <Text style={styles.userEmail}>
                        Wellcome  {'\n'} {Storage.userData.name}
                    </Text>
                </LinearGradient>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={styles.SideMenuItemView}>
                    <View style={styles.IconView}>
                        <FontAwesome name='home' style={styles.SideMenuIcon} />
                    </View>
                    <Text style={styles.SideMenuText}>
                        Home
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={styles.SideMenuItemView}>
                    <View style={styles.IconView}>
                        <FontAwesome name='address-card' style={styles.SideMenuIcon}
                        />
                    </View>
                    <Text style={styles.SideMenuText}>
                        Profile
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')} style={styles.SideMenuItemView}>
                    <View style={styles.IconView}>
                        <FontAwesome name='dashboard' style={styles.SideMenuIcon}
                        />
                    </View>
                    <Text style={styles.SideMenuText}>
                        My dashboard
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    this.props.navigation.closeDrawer()
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

                <TouchableOpacity onPress={() => this.props.navigation.navigate('ListingType')} style={styles.SideMenuItemView}>
                    <View style={styles.IconView}>
                        <FontAwesome name='tags' style={styles.SideMenuIcon}
                        />
                    </View>
                    <Text style={styles.SideMenuText}>
                        Sell your Vehicle
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Message')} style={styles.SideMenuItemView}>
                    <View style={styles.IconView}>
                        <Feather name='message-square' style={styles.SideMenuIcon}
                        />
                    </View>
                    <Text style={styles.SideMenuText}>
                        Messages
                    </Text>
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')} style={styles.SideMenuItemView}>
                    <View style={styles.IconView}>
                        <FontAwesome name='star' style={styles.SideMenuIcon}
                        />
                    </View>
                    <Text style={styles.SideMenuText}>
                        Favourites
                    </Text>
                </TouchableOpacity> */}

                <TouchableOpacity 
                // onPress={() => this.props.navigation.navigate('Search')}
                 style={styles.SideMenuItemView}>
                    <View style={styles.IconView}>
                        <Feather name='settings' style={styles.SideMenuIcon}
                        />
                    </View>
                    <Text style={styles.SideMenuText}>
                        Settings
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { 
                    Utilities.asyncStorage_RemoveKey(Constants.USER_DATA)
                    Utilities.asyncStorage_RemoveKey(Constants.JWT_TOKEN)
                    Storage.userData = {}
                    this.props.navigation.navigate('Login')}
                    } style={styles.SideMenuItemView}>
                    <View style={styles.IconView}>
                        <FontAwesome name='user' style={styles.SideMenuIcon}
                        />
                    </View>
                    <Text style={styles.SideMenuText}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    ParentView: {
        width: '100%',
        height: '100%',
        backgroundColor: lightBg
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
        backgroundColor: lightText
    },
    userEmail: {
        color: lightText,
        textAlign: 'center'
    },


})