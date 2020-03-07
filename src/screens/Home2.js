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
import LinearGradient from 'react-native-linear-gradient';
import { Apptheme, lightText, darkText, LinearColor, lightBg } from '../helpers/CommponStyle';
import Topbar from '../components/Topbar';
import TalkModal from '../components/Talk';
import SearchVehicleModal from '../components/SearchVehicle';
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTalkModal: false,
            isSearchVehicleModal: false
        }
        this.TalkModalToggle = this.TalkModalToggle.bind(this)
        this.SearchVehicleModalToggle = this.SearchVehicleModalToggle.bind(this)
    }

    navigateToDashboard = () => {
        this.props.navigation.navigate("Dashboard")
    }

    TalkModalToggle = () => {
        this.setState({
            isTalkModal: !this.state.isTalkModal
        })
    }
    SearchVehicleModalToggle = () => {
        this.setState({
            isSearchVehicleModal: !this.state.isSearchVehicleModal
        })
    }
    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar Dashboard={this.navigateToDashboard} ParentPage="Home" navigation={this.props} />
                <ScrollView>
                    {/* <View style={{ width: '96%', borderRadius: 60, alignItems: 'center', borderWidth: 1.5, borderColor: Apptheme, marginHorizontal: '2%', height: 45, marginVertical: 10, flexDirection: 'row' }}>
                        <FontAwesome name="search" color={Apptheme} style={{ paddingHorizontal: 10, paddingVertical: 10 }} size={20} />
                        <TextInput
                            style={{ height: 40 }}
                            placeholder="Type here to translate!"
                        />
                    </View> */}

                    <View style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={{ width: '100%', height: 200 }}
                            resizeMode='stretch'
                            source={require('../images/banner.jpg')}
                        />
                        <View style={{ position: 'absolute', alignItems: 'center' }}>
                            <Text style={{ color: lightText, fontSize: 20, fontWeight: 'bold' }}>Message other Talking </Text>
                            <Text style={{ color: lightText, fontSize: 20, fontWeight: 'bold' }}>Motors users </Text>
                            <Text style={{ color: lightText, fontSize: 14, paddingTop: 10 }}>Join the fast growing community and lets talk! </Text>
                        </View>
                    </View>

                    <LinearGradient colors={LinearColor} style={styles.MainBoxView}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ListVehicle")} style={styles.ParentBoxView}>
                            <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                                <Image
                                    resizeMode='center'
                                    style={{ marginLeft: 30, width: '100%', height: 200 }}
                                    source={require("../images/car.png")}
                                />
                            </View>
                            <View style={{ width: '70%', justifyContent: 'center' }}>
                                <Text style={{ color: lightText, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>ADD A VEHICLE </Text>
                                <Text style={{ color: lightText, fontSize: 14, textAlign: 'center', paddingHorizontal: 10 }}>
                                    list your vehicle to join the community
                                    </Text>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>

                    <LinearGradient colors={LinearColor} style={styles.MainBoxView}>
                        <TouchableOpacity onPress={() => this.TalkModalToggle()} style={styles.ParentBoxView}>
                            <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                                <Image
                                    resizeMode='center'
                                    style={{ marginLeft: 30, width: '100%', height: 200 }}
                                    source={require("../images/talk.jpg")}
                                />
                            </View>
                            <View style={{ width: '70%', justifyContent: 'center' }}>
                                <Text style={{ color: lightText, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>TALK </Text>
                                <Text style={{ color: lightText, fontSize: 14, textAlign: 'center', paddingHorizontal: 10 }}>
                                    list your vehicle to join the community
                                    </Text>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>

                    <LinearGradient colors={LinearColor} style={styles.MainBoxView}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ListingType")} style={styles.ParentBoxView}>
                            <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                                <Image
                                    resizeMode='center'
                                    style={{ marginLeft: 30, width: '100%', height: 200 }}
                                    source={require("../images/sell.jpg")}
                                />
                            </View>
                            <View style={{ width: '70%', justifyContent: 'center' }}>
                                <Text style={{ color: lightText, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>SELL</Text>
                                <Text style={{ color: lightText, fontSize: 14, textAlign: 'center', paddingHorizontal: 10 }}>
                                    list your vehicle to join the community
                                    </Text>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>

                    <LinearGradient colors={LinearColor} style={styles.MainBoxView}>
                        <TouchableOpacity onPress={() => this.SearchVehicleModalToggle()} style={styles.ParentBoxView}>
                            <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                                <Image
                                    resizeMode='center'
                                    style={{ marginLeft: 30, width: '100%', height: 200 }}
                                    source={require("../images/search.png")}
                                />
                            </View>
                            <View style={{ width: '70%', justifyContent: 'center' }}>
                                <Text style={{ color: lightText, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>SEARCH </Text>
                                <Text style={{ color: lightText, fontSize: 14, textAlign: 'center', paddingHorizontal: 10 }}>
                                    browse all vehicles that are available now
                                    </Text>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>

                    <LinearGradient colors={LinearColor} style={styles.MainBoxView}>
                        <TouchableOpacity onPress={() => this.TalkModalToggle()} style={styles.ParentBoxView}>
                            <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                                <Image
                                    resizeMode='center'
                                    style={{ marginLeft: 30, width: '100%', height: 200 }}
                                    source={require("../images/vehiclecheck.jpg")}
                                />
                            </View>
                            <View style={{ width: '70%', justifyContent: 'center' }}>
                                <Text style={{ color: lightText, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>VEHICLE CHECK</Text>
                                <Text style={{ fontSize: 14, color: lightText, textAlign: 'center', paddingHorizontal: 10 }}>
                                    list your vehicle to join the community
                                    </Text>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>

                    {this.state.isTalkModal &&
                        <TalkModal TalkModalToggle={this.TalkModalToggle} />
                    }
                    {this.state.isSearchVehicleModal &&
                        <SearchVehicleModal TalkModalToggle={this.TalkModalToggle} SearchVehicleModalToggle={this.SearchVehicleModalToggle} />
                    }
                </ScrollView>
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
        borderWidth: 1.2,
        borderRadius: 5,
        borderColor: Apptheme,
        shadowOffset: { width: 50, height: 50 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
        width: '44%',
        marginHorizontal: '3%',
        marginVertical: 5,
        backgroundColor: lightBg,
        justifyContent: 'center'
    },
    UserView: {
        width: '100%',
        height: 150,
        backgroundColor: Apptheme,
        alignItems: 'center'
    },
    UserImageView: {
        borderWidth: 3,
        borderColor: '#ff8f00',
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: lightText,
        alignItems: 'center',
        justifyContent: 'center'
    },
    UserText: {
        color: lightText,
        paddingLeft: 10,
        paddingTop: 10
    },
    MainBoxView: {
        // marginVertical:40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Apptheme,
        elevation: 3,
        marginVertical: 10,
        width: '94%',
        marginHorizontal: '3%',

    },

    ParentBoxView: {
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 120,
        marginTop: 10
    },
    TextHeader: {
        backgroundColor: Apptheme,
        color: lightText,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24
    },
    TextDetail: {
        paddingTop: 4,
        paddingHorizontal: 2,
        textAlign: 'center',
        fontSize: 14,
        color: darkText
    },
    BoxIcon: {
        textAlign: 'center',
        paddingBottom: 5
    }
})