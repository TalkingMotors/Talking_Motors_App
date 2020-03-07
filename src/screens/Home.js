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
        }
        this.TalkModalToggle = this.TalkModalToggle.bind(this)
        this.SearchVehicleModalToggle = this.SearchVehicleModalToggle.bind(this)
        this.navigateToVehicleType = this.navigateToVehicleType.bind(this)
    }

    navigateToDashboard = () => {
        this.props.navigation.navigate("Dashboard")
    }

    TalkModalToggle = () => {
        this.setState({
            isTalkModal: !this.state.isTalkModal
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
                <View style={{ height: '93%', flexDirection: 'column', width: '100%' }}>
                    <View style={{ width: '100%', height: '20%' }}>
                        <TouchableHighlight
                            activeOpacity={1}
                            underlayColor="transparent"
                            onPressIn={() => this.setState({ Text1: Apptheme })}
                            onPressOut={() => this.setState({ Text1: darkText })}
                            onPress={() => { this.props.navigation.navigate("ListVehicle") }}
                            style={{ width: '100%', height: '100%' }}>
                            <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontWeight: 'bold', color: this.state.Text1, fontSize: 30, textAlign: 'center' }}>
                                    ADD A VEHICLE
                        </Text>
                                <Text style={{ textAlign: 'center' }}>
                                    list your vehicle to join the community
                        </Text>
                                <FontAwesome5 name="angle-right" size={24} color={Apptheme} style={{ position: 'absolute', right: 20 }} />
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={{ width: '100%', height: '20%' }}>
                        <TouchableHighlight
                            activeOpacity={1}
                            underlayColor="transparent"
                            onPressIn={() => this.setState({ Text2: Apptheme })}
                            onPressOut={() => this.setState({ Text2: lightText })}
                            onPress={() => this.TalkModalToggle()} style={{ backgroundColor: "green", alignItems: 'center', alignContent: 'center', width: '100%', height: '100%', justifyContent: 'center', }}>
                            <View style={{ backgroundColor: 'red', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <Image
                                    source={require('../images/third.png')}
                                    style={{ width: '100%', height: '100%' }}
                                />
                                <View style={{ position: 'absolute' }}>
                                    <Text style={{ fontWeight: 'bold', color: this.state.Text2, fontSize: 30, textAlign: 'center' }}>
                                        TALK
                                     </Text>
                                    <Text style={{ textAlign: 'center', color: lightText }}>
                                        message other Taking Motors users
                                    </Text>
                                </View>
                                <FontAwesome5 name="angle-right" size={24} color={lightText} style={{ position: 'absolute', right: 20 }} />
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={{ width: '100%', height: '20%' }}>
                        <TouchableHighlight
                            activeOpacity={1}
                            underlayColor="transparent"
                            onPressIn={() => this.setState({ Text3: Apptheme })}
                            onPressOut={() => this.setState({ Text3: darkText })}
                            onPress={() => this.props.navigation.navigate("ListingType")} style={{ width: '100%', height: '100%', justifyContent: 'center', }}>
                            <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>

                                <Text style={{ fontWeight: 'bold', color: this.state.Text3, fontSize: 30, textAlign: 'center' }}>
                                    SELL
                        </Text>
                                <Text style={{ textAlign: 'center' }}>
                                    advertise your vehicle for sale
                        </Text>
                                <FontAwesome5 name="angle-right" size={24} color={Apptheme} style={{ position: 'absolute', right: 20 }} />
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={{ width: '100%', height: '20%' }}>
                        <TouchableHighlight
                            activeOpacity={1}
                            // underlayColor="transparent"
                            onPressIn={() => this.setState({ Text4: Apptheme })}
                            onPressOut={() => this.setState({ Text4: lightText })}
                            onPress={() => this.SearchVehicleModalToggle()}
                            style={{ alignItems: 'center', alignContent: 'center', width: '100%', height: '100%', justifyContent: 'center', }}>
                            <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <Image
                                    source={require('../images/third.png')}
                                    style={{ width: '100%', height: '100%' }}
                                />
                                <View style={{ position: 'absolute' }}>
                                    <Text style={{ fontWeight: 'bold', color: this.state.Text4, fontSize: 30, textAlign: 'center' }}>
                                        SEARCH
                                     </Text>
                                    <Text style={{ textAlign: 'center', color: lightText }}>
                                        browse all vehicles that are available now
                                    </Text>
                                </View>
                                <FontAwesome5 name="angle-right" size={24} color={lightText} style={{ position: 'absolute', right: 20 }} />
                            </View>
                        </TouchableHighlight>
                    </View>


                    <View style={{ width: '100%', height: '20%' }}>
                        <TouchableHighlight
                            activeOpacity={1}
                            underlayColor="transparent"
                            onPressIn={() => this.setState({ Text5: Apptheme })}
                            onPressOut={() => this.setState({ Text5: darkText })}
                            onPress={() => this.TalkModalToggle()}
                            style={{ width: '100%', height: '100%', justifyContent: 'center', }}>
                            <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>

                                <Text style={{ fontWeight: 'bold', color: this.state.Text5, fontSize: 30, textAlign: 'center' }}>
                                    VEHICLE CHECK
                        </Text>
                                <Text style={{ textAlign: 'center' }}>
                                    perform an official DVLA vehicle check
                        </Text>
                                <FontAwesome5 name="angle-right" size={24} color={Apptheme} style={{ position: 'absolute', right: 20 }} />
                            </View>
                        </TouchableHighlight>
                    </View>



                </View>

                {this.state.isTalkModal &&
                    <TalkModal TalkModalToggle={this.TalkModalToggle} />
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