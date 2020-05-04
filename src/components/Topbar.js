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
import LinearGradient from 'react-native-linear-gradient';
import { Apptheme, lightText, darkText, LinearColor, lightBg } from '../helpers/CommponStyle';
import * as Utilities from "../helpers/Utilities";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ParentPage: ''
        }
        console.log("props", this.props)
    }
    render() {
        if (this.props.ParentPage == "Home") {
            return (
                <View style={styles.MainView}>

                    <StatusBar
                        barStyle="light-content"
                        translucent={false}
                        backgroundColor={Apptheme}
                    />
                    <Feather
                        onPress={() => this.props.navigation.screenProps.openDraw()}
                        name="menu" color={lightText} size={22} style={styles.Icons} />
                    {/* <Text style={styles.ScreenName}>{this.props.ParentPage}</Text> */}
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '75%' }}>
                        <Image
                            resizeMode="contain"
                            style={{ height: 50, width: 50 }}
                            source={require('../images/header-logo.png')}
                        />
                    </View>
                    <FontAwesome onPress={() => this.props.Dashboard()} name="dashboard" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 10 }]} />
                </View>
            )
        }

        else if (this.props.ParentPage == "Dashboard") {
            return (
                <View style={styles.MainView}>
                    <Feather
                        onPress={() => this.props.navigation.goBack()}
                        name="arrow-left" color={lightText} size={22} style={styles.Icons} />
                    <Text style={styles.ScreenName}>{this.props.ParentPage}</Text>
                    <FontAwesome name="folder-open" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 50 }]} />
                    <FontAwesome
                        onPress={() => this.props.navigation.navigate("ListVehicle")}
                        name="plus" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 10 }]} />
                </View>
            )
        }
        else if (this.props.ParentPage == "Detail") {
            return (
                <View style={styles.MainView}>
                    <Feather
                        onPress={() => this.props.navigation.navigation.goBack()}
                        name="arrow-left" color={lightText} size={22} style={styles.Icons} />
                    <Text style={styles.ScreenName}>{this.props.ParentPage}</Text>
                    {this.props.parent == "talk" &&
                        <FontAwesome
                            onPress={() => this.props.EditVehicle()}
                            name="edit" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 50 }]} />
                    }
                    <Feather name="share-2" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 10 }]} />
                </View>
            )
        }
        else if (this.props.ParentPage == "Message") {
            return (
                <View style={styles.MainView}>
                    <Feather
                        onPress={() => this.props.navigation.navigation.goBack()}
                        name="arrow-left" color={lightText} size={22} style={styles.Icons} />
                    <Text style={styles.ScreenName}>{this.props.ParentPage}</Text>
                    <Feather name="edit" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 10 }]} />
                    <FontAwesome onPress={() => this.props.BlockUser()} name="user-times" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 50 }]} />
                </View>
            )
        }
        else if (this.props.ParentPage == "Messenger") {
            return (
                <View style={styles.MainView}>
                    <Feather
                        onPress={() => this.props.navigation.navigation.navigate("Message")}
                        name="arrow-left" color={lightText} size={22} style={styles.Icons} />
                    {Utilities.stringIsEmpty(this.props.image) ?
                        <View style={{ marginLeft: 15, width: 35, height: 35, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 50, }}>
                            <FontAwesome name="user" size={24} color={Apptheme} />
                        </View>
                        :
                        <Image
                            style={{ width: 34, height: 34, borderRadius: 17, marginLeft: 15 }}
                            source={{ uri: this.props.image }}
                        />

                    }

                    <Text style={styles.ScreenName}>{this.props.username}</Text>
                    <Feather onPress={() => this.props.MoreItemsModal()} name="more-vertical" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 10 }]} />
                </View>
            )
        }
        else {
            return (
                <LinearGradient colors={LinearColor} style={styles.MainView}>
                    <Feather
                        onPress={() => this.props.navigation.navigation.goBack()}
                        name="arrow-left" color={lightText} size={22} style={styles.Icons} />
                    <Text style={styles.ScreenName}>{this.props.ParentPage}</Text>
                </LinearGradient>
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