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
import Storage from '../helpers/Storage';
export default class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ParentPage: ''
        }
        // console.log("props", this.props)
        // console.log(" Storage.userData",  Storage.userData)

        
    }
    
    favIcon =()=>{
        if(this.props.isFavourite != undefined){
            if(this.props.isFavourite){
                return <FontAwesome onPress={() => this.props.RemoveFavourite()} name="star" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 50 }]} />
                      
            }
            else{
               return <FontAwesome name="star-o" onPress={() => this.props.AddFavourite()} color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 50 }]} />
              
            }
        }
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
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '75%' }}>
                        <Image
                            resizeMode="contain"
                            style={{ height: 50, width: 50 }}
                            source={require('../images/header-logo.png')}
                        />
                    </View>
                    {(Object.keys(Storage.userData).length > 0)?
                    <FontAwesome onPress={() => this.props.Dashboard()} name="dashboard" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 10 }]} />
                    :
                    <FontAwesome onPress={() => this.props.navigation.navigation.navigate("Login")} name="sign-in" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 10 }]} />
                        }
                    {Object.keys(Storage.userData).length > 0 &&
                        <FontAwesome onPress={() => this.props.Profile()} name="edit" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 60 }]} />
                    }
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
                    {this.props.parent == "talk" && this.props.vehicleData.userID == Storage.userData.userID &&
                       
                       <FontAwesome
                            onPress={() => this.props.EditVehicle()}
                            name="edit" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 50 }]} />
                    }
                        {this.favIcon()}
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