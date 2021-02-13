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
    StatusBar
} from 'react-native';
import { createDrawerNavigator, DrawerItems, DrawerActions } from 'react-navigation-drawer';
import LinearGradient from 'react-native-linear-gradient';
import { Apptheme, lightText, darkText, LinearColor, lightBg } from '../helpers/CommponStyle';
import * as Utilities from "../helpers/Utilities";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Storage from '../helpers/Storage';
import NotificationBadges from './NotificationBadge';
import { getConverationDetail } from '../screens/Messenger';
import GeneralStatusBarColor from './GeneralStautsBar';
export default class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ParentPage: ''
        }
        // console.log("props", this.props)
    }
    menuPress = () => {
        Storage.Homepage = true;
        this.props.toggle();
    }
    favIcon = () => {
        if (this.props.isFavourite != undefined) {
            if (this.props.isFavourite) {
                return <FontAwesome onPress={() => this.props.RemoveFavourite()} name="star" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 50 }]} />

            }
            else {
                return <FontAwesome name="star-o" onPress={() => this.props.AddFavourite()} color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 50 }]} />

            }
        }
    }



    render() {
        // this.props.navigation.navigation.openDrawer()
        if (this.props.ParentPage == "Home") {
            return (
                <View >
                    <SafeAreaView style={{ flex: 0, backgroundColor: Apptheme }} />
                <View style={styles.MainView}>

                    
                    <NotificationBadges
                        isActive={Object.keys(Storage.NotificationObject).length > 0 ? true : false}
                    />
                    <Feather
                        // onPress={() => {
                        //     this.props.navigation.navigation.dispatch(DrawerActions.openDrawer())
                        //     this.props.updateTopBar()
                        // }}
                        onPress={this.menuPress}
                        name="menu" color={lightText} size={22} style={styles.Icons} />
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '75%' }}>
                        <Image
                            resizeMode="contain"
                            style={{ height: 50, width: 50 }}
                            source={require('../images/logo.png')}
                        />
                    </View>
                    {(Object.keys(Storage.userData).length > 0) ?
                        <FontAwesome onPress={() => this.props.Dashboard()} name="dashboard" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 10 }]} />
                        :
                        <FontAwesome onPress={() => this.props.navigation.navigation.navigate("Login")} name="sign-in" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 10 }]} />
                    }
                    {Object.keys(Storage.userData).length > 0 &&
                        <FontAwesome onPress={() => this.props.Profile()} name="edit" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 60 }]} />
                    }
                </View>
            </View>
            )
        }

        else if (this.props.ParentPage == "My Dashboard") {
            return (
                <View >
                    <SafeAreaView style={{ flex: 0, backgroundColor: Apptheme }} />
                 <View style={styles.MainView}>
                    <NotificationBadges
                        isActive={Object.keys(Storage.NotificationObject).length > 0 ? true : false}
                    />
                    <Feather
                        onPress={() => this.props.navigation.navigation.goBack()}
                        name="arrow-left" color={lightText} size={22} style={styles.Icons} />
                    <Text style={styles.ScreenName}>{this.props.ParentPage}</Text>
                    <FontAwesome onPress={() => this.props.ToggleModal()} name="folder-open" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 50 }]} />
                    <FontAwesome
                        onPress={() => this.props.navigation.navigation.navigate("ListVehicle")}
                        name="plus" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 10 }]} />
                </View>
               </View>
            )
        }
        else if (this.props.ParentPage == "Detail") {
            return (
                <View >
                    <SafeAreaView style={{ flex: 0, backgroundColor: Apptheme }} />
                <View style={styles.MainView}>
                    <NotificationBadges
                        isActive={Object.keys(Storage.NotificationObject).length > 0 ? true : false}
                    />
                    <Feather
                        onPress={() => this.props.navigation.navigation.goBack()}
                        name="arrow-left" color={lightText} size={22} style={styles.Icons} />
                    <Text style={styles.ScreenName}>{this.props.ParentPage}</Text>
                    {this.props.vehicleData.userID == Storage.userData.userId &&

                        <FontAwesome
                            onPress={() => this.props.EditVehicle()}
                            name="edit" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 50 }]} />
                    }
                    {this.favIcon()}
                    <Feather name="share-2" onPress={() => this.props.shareAction()} color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 10 }]} />
                </View>
                </View>
            )
        }
        else if (this.props.ParentPage == "Message") {
            return (
                <View >
                    <SafeAreaView style={{ flex: 0, backgroundColor: Apptheme }} />
                <View style={styles.MainView}>
                    <NotificationBadges
                        isActive={Object.keys(Storage.NotificationObject).length > 0 ? true : false}
                    />
                    <Feather
                        onPress={() => this.props.navigation.navigation.goBack()}
                        name="arrow-left" color={lightText} size={22} style={styles.Icons} />
                    <Text style={styles.ScreenName}>{this.props.ParentPage}</Text>
                    <Feather onPress={() => this.props.editSetting()} name="edit" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 10 }]} />
                    <FontAwesome onPress={() => this.props.BlockUser()} name="user-times" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 50 }]} />
                </View>
                </View>
            )
        }
        else if (this.props.ParentPage == "Vehicle Type") {
            return (
                <View >
                <SafeAreaView style={{ flex: 0, backgroundColor: Apptheme }} />
                <View style={styles.MainView}>
                    <NotificationBadges
                        isActive={Object.keys(Storage.NotificationObject).length > 0 ? true : false}
                    />
                    <Feather
                        onPress={() => this.props.navigation.navigation.goBack()}
                        name="arrow-left" color={lightText} size={22} style={styles.Icons} />
                    <Text style={styles.ScreenName}>{this.props.ParentPage}</Text>
                    <FontAwesome onPress={() => this.props.resetAllFields()} name="eraser" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 10 }]} />
                </View>
                </View>
            )
        }
        else if (this.props.ParentPage == "Create Group") {
            return (
                <View >
                    <SafeAreaView style={{ flex: 0, backgroundColor: Apptheme }} />
                <View style={styles.MainView}>
                    <NotificationBadges
                        isActive={Object.keys(Storage.NotificationObject).length > 0 ? true : false}
                    />
                    <Feather
                        onPress={() => this.props.navigation.navigation.goBack()}
                        name="arrow-left" color={lightText} size={22} style={styles.Icons} />
                    <Text style={styles.ScreenName}>{this.props.ParentPage}</Text>
                    <FontAwesome onPress={() => this.props.addPerson()} name="plus" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 10 }]} />
                    {this.props.List.length > 0 &&
                        <FontAwesome onPress={() => this.props.isgroupModal()} name="check" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 60 }]} />
                    }
                </View>
                </View>
            )
        }
        else if (this.props.ParentPage == "Messenger") {
            return (
                <View >
                    <SafeAreaView style={{ flex: 0, backgroundColor: Apptheme }} />
                <View style={styles.MainView}>


                    <Feather
                        // onPress={() => this.props.navigation.navigation.navigate("Message")}
                        onPress={() => this.props.navigation.navigation.goBack()}
                        name="arrow-left" color={lightText} size={22} style={styles.Icons} />
                    {Utilities.stringIsEmpty(this.props.image) ?
                        <View style={{ marginLeft: 15, width: 35, height: 35, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 50, }}>
                            <FontAwesome name="user" size={24} color={Apptheme} />
                        </View>
                        :
                        <Image
                            onPress={() => this.props.navigateToUser()}
                            style={{ width: 34, height: 34, borderRadius: 17, marginLeft: 15 }}
                            source={{ uri: this.props.image }}
                        />

                    }
                    <View style={{ paddingLeft: 0 }}>

                        <Text onPress={() => this.props.navigateToUser()} style={styles.ScreenName}>
                            {(this.props.username.length > 0) ? this.props.username : "Conversation"}
                        </Text>
                        {this.props.membersCount.length > 0 &&
                            <Text onPress={() => this.props.navigateToUser()} style={[styles.ScreenName, { fontSize: 12 }]}>{this.props.groupMembersActive.length} users joined</Text>
                        }
                    </View>
                    {(this.props.username.length > 0)
                        ?
                        <Feather onPress={() => this.props.MoreItemsModal()} name="more-vertical" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 10 }]} />
                        :
                        <FontAwesome onPress={() => this.props.ConversationNamePopup()} name="plus" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 10 }]} />

                    }
                </View>
                </View>
            )
        }
        else if (this.props.ParentPage == "Blocked User") {
            return (
                <View >
                <SafeAreaView style={{ flex: 0, backgroundColor: Apptheme }} />
                <LinearGradient colors={LinearColor} style={styles.MainView}>
                    <Feather
                        onPress={() => {
                            this.props.navigation.navigation.navigate("Message")
                        }
                        }
                        name="arrow-left" color={lightText} size={22} style={styles.Icons} />
                    <Text style={styles.ScreenName}>{this.props.ParentPage}</Text>
                </LinearGradient>
                </View>
            )
        }

        else {
            return (
                <View >
                    <SafeAreaView style={{ flex: 0, backgroundColor: Apptheme }} />
                <LinearGradient colors={LinearColor} style={styles.MainView}>
                    <NotificationBadges
                        isActive={Object.keys(Storage.NotificationObject).length > 0 ? true : false}
                    />
                    <Feather
                        onPress={() => this.props.navigation.navigation.goBack()}
                        name="arrow-left" color={lightText} size={22} style={styles.Icons} />
                    <Text style={styles.ScreenName}>{this.props.ParentPage}</Text>
                </LinearGradient>
                </View>
            )
        }
    }

}

const styles = StyleSheet.create({
    MainView: {
        width: '100%',
        height: 50,
        backgroundColor: Apptheme,
        // justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    Icons: {
        marginLeft: 10,
    },
    ScreenName: {
        paddingHorizontal: 15,
        color: lightText,
        fontSize: 16
    }
});