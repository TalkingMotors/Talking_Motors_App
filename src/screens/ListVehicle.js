import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Button,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    Linking,
    Alert

} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import CommponStyle, { Apptheme, lightText, darkText, LinearColor, lightBg } from '../helpers/CommponStyle';
import Topbar from '../components/Topbar';
import {
    TextField,
} from 'react-native-material-textfield';
import * as VehicleService from '../services/Vehicle';
import * as Utilities from "../helpers/Utilities";
import Storage from '../helpers/Storage';
export default class ListVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerNo: '',
            newVehicle: '',
            isLoader: false,
            param: 0
        }
        console.log("!!", this.props.navigation.state.params)
        if (!Utilities.stringIsEmpty(this.props.navigation.state.params)) {
            this.state.param = 1;
            this.setState({
                param: this.state.param
            })
        }

    }

    onChangeText = (key, value) => {
        this.setState({ [key]: value, })
    }

    emailLinking = () => {
        Linking.openURL(`mailto:support@talkingmotorsapp.com?subject=SendMail&body=${this.state.registerNo.toUpperCase()}`)
    }



    addVehicle = async () => {
        this.setState({
            isloader: true
        })
        var data = this.state.newVehicle;
        var obj = {
            bodyTypeID: data.bodyTypeId,
            buildYear: data.buildYear,
            colourChangeCount: data.colourChangeCount,
            colourID: data.colourId,
            driverSeatPositionID: data.driverSeatPositionId,
            derivative: data.derivative,
            description: "",
            doorCount: data.doorCount,
            driveTypeID: data.driveTypeId,
            engineCylinderConfigID: data.engineCylinderConfigId,
            engineFuelDeliveryID: data.engineFuelDeliveryId,
            enginePowerBhp: data.enginePowerBhp,
            engineSizeID: data.engineSizeId,
            engineValveCount: data.engineValveCount,
            exactModel: data.exactModel,
            forSale: false,
            fuelTypeID: data.fuelTypeId,
            gearCount: data.gearCount,
            makeID: data.makeId,
            modelID: data.modelId,
            postcode: "",
            registrationNumber: this.state.registerNo.toUpperCase(),
            roadFundLicenseBandID: data.roadFundLicenseBandId,
            roadFundLicenseSixMonth: data.roadFundLicenseSixMonth,
            roadFundLicenseTwelveMonth: data.roadFundLicenseTwelveMonth,
            seatCount: data.seatCount,
            stolen: true,
            transmissionTypeID: data.transmissionTypeId,
        }
        var response = await VehicleService.addNewVehicle(obj)
        if (response.success) {
            this.props.navigation.navigate('EditVehicle', { item: response.vehicle });
            this.setState({
                isloader: false,
                newVehicle: ''

            })
        }
        else {
            this.setState({
                isloader: false
            })
        }
    }

    searchVehicleBy = async () => {
        //let { registerNo } = this.state
        var  registerNo  = this.state.registerNo.replace(/ /g,'')
        this.setState({
            isloader: true
        })
        if (!Utilities.stringIsEmpty(registerNo)) {
            var response = await VehicleService.getVehicleBy(registerNo)
            if (!Utilities.stringIsEmpty(response.vehicle) && response.vehicle.registrationNumber.toLowerCase() == registerNo.toLowerCase()) {
                if (response.vehicle.userID == Storage.userData.userId) {
                    this.props.navigation.navigate('EditVehicle', { item: response.vehicle });
                    this.setState({
                        isloader: false
                    })
                }
                else if (response.vehicle.userID != Storage.userData.userId) {
                    this.setState({
                        isloader: false
                    })
                    Alert.alert(
                        "This vehicle is already registered",
                        "A vehicle with this registration is already on the system. \n\nIf you think this is an error, or you have recently purchased this vehicle please get in touch with us below.",

                        [
                            {
                                text: "CLOSE",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            {
                                text: "CONTACT US",
                                onPress: () => this.emailLinking(),
                                style: "cancel"
                            },

                        ],
                        { cancelable: false }
                    );
                }

            }
            else {
                var response = await VehicleService.getVehicleData(registerNo)
                console.log("response", response);
                if (Utilities.stringIsEmpty(!response.vehicleData.makeId)) {
                    this.setState({
                        newVehicle: response.vehicleData,
                        isLoader: false
                    })
                }
                else {
                    this.setState({
                        isloader: false
                    })
                    Alert.alert(
                        "Vehicle not found",
                        "This vehicle has not been found in the DVLA database.",
                        [
                            {
                                text: "OK",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },

                        ],
                        { cancelable: false }
                    );
                }

            }
            this.setState({
                isloader: false
            })
        }
        this.setState({
            isloader: false
        })
    }
    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar ParentPage="List Vehicle" navigation={this.props} />
                {this.state.isloader &&
                    <View style={styles.menuLoaderView}>
                        <ActivityIndicator
                            color="#ed0000"
                            size="large"
                        />
                    </View>
                }

                <ScrollView style={{ width: '100%' }}>
                    {(this.state.param == 0) ?
                        <View style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' }}>

                            <Image
                                style={{ width: '100%', height: 200 }}
                                resizeMode='stretch'
                                source={require('../images/banner.jpg')}
                            />
                            <View style={{ position: 'absolute', alignItems: 'center', }}>
                                <Text style={{ color: lightText, fontSize: 20, fontWeight: 'bold', paddingHorizontal: 5 }}>
                                    List your vehicle to chat with friends,
                        </Text>
                                <Text style={{ color: lightText, fontSize: 20, fontWeight: 'bold', paddingHorizontal: 5 }}>
                                    family and other car enthusiasts.
                        </Text>
                                <Text style={{ color: lightText, fontSize: 14, paddingTop: 10, textAlign: 'center', paddingHorizontal: 5 }}>
                                    Simple and reliable messaging service to keep in touch and share information
                        </Text>
                            </View>
                        </View>
                        :
                        <View style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' }}>

                            <Image
                                style={{ width: '100%', height: 200 }}
                                resizeMode='stretch'
                                source={require('../images/background.png')}
                            />
                            <View style={{ position: 'absolute', alignItems: 'center' }}>
                                <Text style={{ textAlign: 'center', color: lightText, fontSize: 20, fontWeight: 'bold' }}>
                                    Sell your vehicle quickly and
                                     </Text>
                                <Text style={{ textAlign: 'center', color: lightText, fontSize: 20, fontWeight: 'bold' }}>
                                    effortlessly with a quick and easy process.
                                    </Text>
                                <Text style={{ color: lightText, fontSize: 14, paddingTop: 10, paddingHorizontal: 5, textAlign: 'center' }}>
                                    Selling has never been easier with our seamless process, you can create am AD in seconds and most
                                    of all it's FREE for a one month listing with one photo.
                                </Text>
                            </View>
                        </View>
                    }
                    {(this.state.newVehicle == "") ?
                        <View style={styles.TextFieldView}>
                            <View>
                                <TextField
                                    style={{
                                        fontWeight: 'bold',
                                    }}
                                    autoFocus={true}
                                    label='Registration Number'
                                    fontSize={15}
                                    keyboardType='default'
                                    tintColor={Apptheme}
                                    baseColor={Apptheme}
                                    errorColor="red"
                                    activeLineWidth={2}
                                    autoCapitalize='characters'
                                    labelFontSize={13}
                                    value={this.state.registerNo}
                                    onChangeText={val => {
                                        this.onChangeText('registerNo', val.trim())
                                    }}
                                />
                            </View>
                            <View style={{ width: '94%', marginHorizontal: '3%', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={styles.GradientButtonView} onPress={() => { this.searchVehicleBy() }}>
                                    <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                        <Text style={styles.ButtonInnerText}>
                                            AUTO COMPLETE DETAILS
                                </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <View style={[styles.TextFieldView], { width: '100%' }}>
                            <View style={{ backgroundColor: lightBg }}>
                                <Text style={styles.newVehicleMainViewText}>
                                    Details found:
                                    </Text>
                            </View>
                            <View style={{ backgroundColor: "#ebebeb" }}>
                                <View style={styles.newVehicleView}>
                                    <Text>
                                        {this.state.newVehicle.make}
                                    </Text>
                                </View>
                                <View style={styles.newVehicleView}>
                                    <Text>
                                        {this.state.newVehicle.model}
                                    </Text>
                                </View>
                                <View style={styles.newVehicleView}>
                                    <Text>
                                        {this.state.newVehicle.colour}
                                    </Text>
                                </View>
                                <View style={styles.newVehicleView}>
                                    <Text>
                                        {this.state.newVehicle.fuelType}
                                    </Text>
                                </View>
                                <View style={styles.newVehicleView}>
                                    <Text>
                                        {this.state.newVehicle.engineSizeLitre + "0 Liter"}
                                    </Text>
                                </View>
                                <View style={styles.newVehicleView}>
                                    <Text>
                                        {this.state.newVehicle.gearCount + " Gears"}
                                    </Text>
                                </View>
                                <View style={styles.newVehicleView}>
                                    <Text>
                                        {this.state.newVehicle.doorCount + " Doors"}
                                    </Text>
                                </View>
                                <View style={styles.newVehicleView}>
                                    <Text>
                                        {this.state.newVehicle.seatCount + " Seats"}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.TextFieldView}>
                                <TouchableOpacity style={styles.GradientButtonView} onPress={() => { this.addVehicle() }}>
                                    <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                        <Text style={styles.ButtonInnerText}>
                                            ADD VEHICLE DETAIL
                                </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>

                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ParentView: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: lightBg
    },
    TextFieldView: {
        width: '92%',
        marginHorizontal: '4%'
    },
    GradientButtonView: {
        ...CommponStyle.GradiendButtonView
    },
    ButtonInnerText: {
        ...CommponStyle.ButtonInnerText
    },
    newVehicleView: {
        borderBottomColor: "#777",
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 40
    },
    newVehicleMainViewText: {
        borderBottomColor: "#777",
        borderBottomWidth: 1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: "bold",
        paddingVertical: 10,
        color: darkText
    },
    menuLoaderView: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: '100%',
        backgroundColor: 'rgba(255,255,255, 0.7)',
        // backgroundColor: 'red',
        zIndex: 10000,
        alignItems: 'center',
        justifyContent: 'center',
        top: 60
    },
})