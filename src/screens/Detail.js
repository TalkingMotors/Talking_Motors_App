import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Button,
    FlatList,
    Image,
    TextInput,
    StatusBar,
    StyleSheet,
    Switch,
    TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Apptheme, lightText, darkText, LinearColor, lightBg } from '../helpers/CommponStyle';
import Topbar from '../components/Topbar';
import { FluidNavigator, Transition } from '../../lib';
import * as Utilities from "../helpers/Utilities";
export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerNo: '',
            make: '',
            model: '',
            year: '',
            transmission: '',
            engine: '',
            doors: '',
            seats: '',
            bodyType: '',
            color: '',
            image: '',
            descrption: '',
            parent: '',
            price: '',
            saleSwitch: false,
        }
    }

    UNSAFE_componentWillMount() {
        let vehicleData = this.props.navigation.state.params.item
        let parent = this.props.navigation.state.params.parent
        this.setState({
            registerNo: vehicleData.registrationNumber,
            make: vehicleData.make,
            model: vehicleData.model,
            year: vehicleData.buildYear,
            transmission: vehicleData.transmissionType,
            engine: vehicleData.engineSize + " " + vehicleData.fuelType,
            doors: vehicleData.doorCount,
            seats: vehicleData.seatCount,
            bodyType: vehicleData.bodyType,
            color: vehicleData.colour,
            // image: vehicleData.user.imageUrl,
            image: vehicleData.images[0],
            descrption: vehicleData.description,
            price: vehicleData.price,
            saleSwitch: vehicleData.forSale,
            parent: parent,
        })
    }

    toggleSwitch = (value) => {
        this.setState({ saleSwitch: value })
    }

    EditVehicle = () => {
        let data = this.props.navigation.state.params.item;
        this.props.navigation.navigate("EditVehicle", {
            item: data
        })
    }
    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar ParentPage="Detail" EditVehicle={this.EditVehicle} parent={this.state.parent} navigation={this.props} />
                <ScrollView style={{ paddingBottom: 20 }}>
                    <View style={{ width: '100%', height: 270, justifyContent: 'center', alignItems: 'center' }}>
                        {!Utilities.stringIsEmpty(this.state.image) ?
                            <Transition shared={`imageUrl${this.props.navigation.state.params.index}`}>
                                <Image
                                    resizeMode='cover'
                                    style={{ width: '100%', height: '100%' }}
                                    source={{ uri: this.state.image.url }}
                                />
                            </Transition>
                            :
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', backgroundColor: lightBg }}>
                                <FontAwesome name="car" size={150} color={Apptheme} />
                            </View>
                        }

                    </View>
                    <View>
                        <Text style={{ textAlign: 'center', color: Apptheme, fontWeight: 'bold', fontSize: 16, paddingTop: 10 }}>
                            {this.props.navigation.state.params.item.title}
                        </Text>
                    </View>
                    {this.state.price != "" &&
                        <View>
                            <Text style={{ textAlign: 'center', color: Apptheme, fontWeight: 'bold', fontSize: 16, paddingVertical: 5 }}>
                                £{this.state.price.toFixed(2)}
                            </Text>
                        </View>
                    }


                    <View style={[styles.MainItemView, { backgroundColor: '#FFF3E0', height: 50 }]}>
                        <View style={styles.ItemViewBox1}>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: "center" }}>
                                <Ionicons name="logo-model-s" size={16} color="#777" />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center', }}>
                                <Text style={styles.TextHead}>
                                    Registration No
                                </Text>
                                <Text style={styles.TextTail}>
                                    {this.state.registerNo}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.ItemViewBox1}>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: "center" }}>
                                <FontAwesome name="dashboard" size={16} color="#777" />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center', }}>
                                <Text style={styles.TextHead}>
                                    Make
                            </Text>
                                <Text style={styles.TextTail}>
                                    {this.state.make}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.MainItemView, { backgroundColor: '#FFF', height: 50 }]}>
                        <View style={styles.ItemViewBox1}>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: "center" }}>
                                <MaterialCommunityIcons name="car-door" size={16} color="#777" />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center', }}>
                                <Text style={styles.TextHead}>
                                    Model
                            </Text>
                                <Text style={styles.TextTail}>
                                    {this.state.model}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.ItemViewBox1}>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: "center" }}>
                                <MaterialCommunityIcons name="seat" size={16} color="#777" />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center', }}>
                                <Text style={styles.TextHead}>
                                    Year
                                </Text>
                                <Text style={styles.TextTail}>
                                    {this.state.year}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.MainItemView, { backgroundColor: '#FFF3E0', height: 50 }]}>
                        <View style={styles.ItemViewBox1}>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: "center" }}>
                                <Ionicons name="logo-model-s" size={16} color="#777" />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center', }}>
                                <Text style={styles.TextHead}>
                                    Trasnmission
                            </Text>
                                <Text style={styles.TextTail}>
                                    {this.state.transmission}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.ItemViewBox1}>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: "center" }}>
                                <FontAwesome name="dashboard" size={16} color="#777" />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center', }}>
                                <Text style={styles.TextHead}>
                                    Engine
                            </Text>
                                <Text style={styles.TextTail}>
                                    {this.state.engine}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.MainItemView, { backgroundColor: '#FFF', height: 50 }]}>
                        <View style={styles.ItemViewBox1}>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: "center" }}>
                                <MaterialCommunityIcons name="car-door" size={16} color="#777" />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center', }}>
                                <Text style={styles.TextHead}>
                                    Doors
                            </Text>
                                <Text style={styles.TextTail}>
                                    {this.state.doors}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.ItemViewBox1}>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: "center" }}>
                                <MaterialCommunityIcons name="seat" size={16} color="#777" />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center', }}>
                                <Text style={styles.TextHead}>
                                    Seats
                                </Text>
                                <Text style={styles.TextTail}>
                                    {this.state.seats}
                                </Text>
                            </View>
                        </View>
                    </View>


                    <View style={[styles.MainItemView, { backgroundColor: '#FFF3E0', height: 50 }]}>
                        <View style={styles.ItemViewBox1}>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: "center" }}>
                                <Ionicons name="logo-model-s" size={16} color="#777" />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center', }}>
                                <Text style={styles.TextHead}>
                                    Body Type
                            </Text>
                                <Text style={styles.TextTail}>
                                    {this.state.bodyType}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.ItemViewBox1}>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: "center" }}>
                                <FontAwesome name="dashboard" size={16} color="#777" />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center', }}>
                                <Text style={styles.TextHead}>
                                    Color
                            </Text>
                                <Text style={styles.TextTail}>
                                    {this.state.color}
                                </Text>
                            </View>
                        </View>
                    </View>


                    {this.state.parent == "talk" &&
                        <View>
                            <View style={{ width: '100%', paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: Apptheme, fontSize: 16 }}>MORE DESCRPTION</Text>
                            </View>

                            <View style={{ width: '100%', paddingHorizontal: 20 }}>
                                <Text>
                                    {this.state.descrption}
                                </Text>
                            </View>

                            <View style={[styles.ButtonView, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                                <Text >For Sale? </Text>
                                <Switch
                                    thumbColor={Apptheme}
                                    onValueChange={this.toggleSwitch}
                                    value={this.state.saleSwitch} />
                            </View>
                            <LinearGradient colors={LinearColor} style={{ borderRadius: 10, justifyContent: 'center', width: '96%', marginHorizontal: '2%', height: 50, marginVertical: 10 }} >
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate("Message")}>

                                    <Feather
                                        // onPress={() => this.props.navigation.navigation.goBack()}
                                        name="message-circle" color={lightText} size={22} style={{ paddingHorizontal: 10 }} />
                                    <Text style={{ fontWeight: 'bold', textAlign: 'center', color: lightText }}>VIEW MESSAGES</Text>
                                </TouchableOpacity>
                            </LinearGradient>

                            <LinearGradient colors={LinearColor} style={{ borderRadius: 10, justifyContent: 'center', width: '96%', marginHorizontal: '2%', height: 50, marginVertical: 10 }} >
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate("Message")}>
                                    {/* <Feather name="message-circle" color={lightText} size={22} style={{ paddingHorizontal: 10 }} /> */}
                                    <Text style={{ fontWeight: 'bold', textAlign: 'center', color: lightText }}>UPGRADE TO PREMIUM</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    }


                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ParentView: {
        width: '100%',
        // height: '100%',
        backgroundColor: lightBg,
        paddingBottom: 50
        // backgroundColor: 'lightgray',

    },
    MainItemView: {
        width: '96%',
        marginHorizontal: '2%',
        flexDirection: 'row',
        // marginVertical: 5,
        // paddingHorizontal: 10
    },
    ItemViewBox1: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '50%'
    },
    ItemViewBox2: {

        width: '50%'
    },
    TextHead: {
        color: "#333",
        fontSize: 12
        // fontWeight: 'bold'
    },
    TextTail: {
        color: "#777",
        fontSize: 14
    }
})