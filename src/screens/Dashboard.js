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
    Modal,
    TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { Apptheme, lightText, darkText, LinearColor, lightBg } from '../helpers/CommponStyle';
import Topbar from '../components/Topbar';
import { FluidNavigator, Transition } from '../../lib';
import * as Utilities from "../helpers/Utilities";
import * as VehicleService from '../services/Vehicle';
import VehicleImage from '../components/VehicleImage';
import Constants from "../helpers/Constants";
import Storage from '../helpers/Storage';
const moment = require('moment-timezone');
export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            emptyList: '',
            isModal: false,
            display: Storage.dashboardDisplay

        }
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            this.myVehicle();

        })

    }

    componentWillMount() {
        this.myVehicle();
    }

    PremiumPackgedDateChecked(premiumDate) {
        var seconds = 0
        if (!Utilities.stringIsEmpty(premiumDate)) {
            var dateNow = moment.tz('Europe/London').format('ll LTS');
            var momentdate = moment(premiumDate, "YYYY/MM/DD H:mm:ss").format('ll LTS');
            seconds = Math.floor((moment(momentdate) - moment(dateNow)) / 1000);
            if (seconds < 0) {
                seconds = 0
            }

            // var minutes = Math.floor(seconds / 60);
            // var hours = Math.floor(minutes / 60);
            // var days = Math.floor(hours / 24);
            // hours = hours = hours - (days * 24);
            // minutes = minutes - (days * 24 * 60) - (hours * 60);
            // seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
            // console.log("days",days);
            // console.log("hours",hours);
            // console.log("minutes",minutes);
            // console.log("seconds",seconds);
        }
        return seconds;
    }

    myVehicle = async () => {
        var response = await VehicleService.myVehicle()
        if (!Utilities.stringIsEmpty(response.vehicles) || response.success) {
            if (response.vehicles.length > 0) {
                for (var i = 0; i < response.vehicles.length; i++) {

                    response.vehicles[i].PremiumDate = this.PremiumPackgedDateChecked(response.vehicles[i].premiumListingExpires)
                }
                this.setState({
                    list: response.vehicles
                })
            }
            else {
                this.setState({
                    emptyList: "No records found"
                })
            }
        }
        else if (!response.success) {
            alert("invalid operation");
        }
    }

    detail = (item, index) => {
        // alert("AAaa");
        this.props.navigation.navigate('Detail', { item: item, index: index, parent: "talk" });
    }
    mainTitle = (item) => {
        let make = "";
        let model = "";
        let derivative = "";
        let engineSize = "";

        if (!Utilities.stringIsEmpty(item.make) || item.make > 0) {
            make = item.make + " ";
        }
        if (!Utilities.stringIsEmpty(item.model) || item.model > 0) {
            model = item.model + " ";
        }
        if (!Utilities.stringIsEmpty(item.derivative) || item.derivative > 0) {
            derivative = item.derivative;
        }
        if (!Utilities.stringIsEmpty(item.engineSize) || item.engineSize > 0) {
            engineSize = item.engineSize;
        }
        return make + model + engineSize + derivative
    }

    subTitle = (item) => {
        let postcode = "";
        let price = ""
        if (!Utilities.stringIsEmpty(item.postcode) || item.postcode > 0) {
            postcode = item.postcode + " ";
        }
        if (!Utilities.stringIsEmpty(item.price) || item.price > 0) {
            price = "£" + item.price.toFixed(2) + " ";
        }
        return price + postcode
    }


    detailText = (item) => {

        let buildYear = "";
        let doorCount = "";
        let transmissionType = "";
        let engineSize = "";
        let fuelType = "";
        let userMileage = "";

        if (!Utilities.stringIsEmpty(item.doorCount) || item.doorCount > 0) {
            doorCount = item.doorCount + " doors . ";
        }
        if (!Utilities.stringIsEmpty(item.buildYear) || item.buildYear > 0) {
            buildYear = item.buildYear + " . ";
        }

        if (!Utilities.stringIsEmpty(item.transmissionType) || item.transmissionType > 0) {
            transmissionType = item.transmissionType + " . ";
        }
        if (!Utilities.stringIsEmpty(item.engineSize) || item.engineSize > 0) {
            engineSize = item.engineSize + "| . ";
        }
        if (!Utilities.stringIsEmpty(item.fuelType) || item.fuelType > 0) {
            fuelType = item.fuelType + "  ";
        }
        if (!Utilities.stringIsEmpty(item.userMileage) || item.userMileage > 0) {
            userMileage = item.userMileage + "m . ";
        }

        return buildYear + userMileage + doorCount + transmissionType + engineSize + fuelType


    }
    flatListEmptyMessage = () => {
        if (this.state.list.length == 0) {
            return (<Text style={styles.noRecordFoundText}>{this.state.emptyList}</Text>)
        }
    }


    ToggleModal = () => {
        this.setState({
            isModal: !this.state.isModal
        })
    }

    flatListDisplatDashboard = (param) => {
        this.setState({
            display: param
        })
        Storage.dashboardDisplay=param
        Utilities.asyncStorage_SaveKey(Constants.DashboardDisplay, JSON.stringify(param))
    }

    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar
                    ToggleModal={this.ToggleModal}
                    ParentPage="My Dashboard" navigation={this.props} />
                <ScrollView>
                
                {this.state.display == 1 &&

                    <Text style={{paddingVertical:10,paddingHorizontal:20,fontSize:16,fontWeight:'bold',color:darkText}}>
                        Keep track of your vehicle's important dates, and setup reminders
                    </Text>
                }

                    <View style={{ marginHorizontal: '2%', borderRadius: 5, paddingVertical: 10,paddingBottom:0, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                        <Text style={{ fontSize: 18, color: Apptheme, fontWeight: 'bold' }}>
                            YOUR VEHICLES
                        </Text>
                    </View>
                    <FlatList
                        data={this.state.list}
                        listKey={(item, index) => 'recent-' + index.toString()}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        shouldItemUpdate={this.state.loadMore}

                        renderItem={({ item, index }) =>
                            (
                                <View key={index}>
                                    {(this.state.display == 0) ?



                                        <LinearGradient
                                            colors={LinearColor} style={{ borderRadius: 10, borderWidth: 1, borderColor: Apptheme, elevation: 3, marginVertical: 10, width: '94%', marginHorizontal: '3%', }}>
                                            <TouchableOpacity
                                                onPress={this.detail.bind(this, item, index)}
                                                style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', height: 120, }}>
                                                <View style={{ width: '35%', alignItems: 'center', justifyContent: 'center' }}>
                                                    {item.PremiumDate > 0 &&
                                                        <Text style={{ zIndex: 2, position: 'absolute', top: 13, color: '#fefefe', fontSize: 10, right: 70, borderRadius: 3, backgroundColor: Apptheme, padding: 2, rotation: -40 }}>Premium</Text>
                                                    }
                                                    <VehicleImage param={item.images} />
                                                </View>
                                                <View style={{ width: '65%', justifyContent: 'center' }}>
                                                    <Text style={{ color: lightText, textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>

                                                        {this.mainTitle(item)}
                                                    </Text>
                                                    <Text style={{ color: lightText, fontSize: 12, textAlign: 'center', paddingHorizontal: 10 }}>
                                                        {this.subTitle(item)}

                                                    </Text>
                                                    <Text style={{ color: lightText, fontSize: 12, textAlign: 'center', paddingHorizontal: 10 }}>
                                                        {this.detailText(item)}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </LinearGradient>
                                        :
                                        <LinearGradient
                                            colors={LinearColor} style={{ borderRadius: 10, borderWidth: 1, borderColor: Apptheme, elevation: 3, marginVertical: 10, width: '94%', marginHorizontal: '3%', }}>
                                            <TouchableOpacity
                                                onPress={this.detail.bind(this, item, index)}
                                                style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', height: 120, }}>
                                                <View style={{ width: '35%', alignItems: 'center', justifyContent: 'center' }}>
                                                    {item.PremiumDate > 0 &&
                                                        <Text style={{ zIndex: 2, position: 'absolute', top: 2, color: '#fefefe', fontSize: 20, left:3,   }}>P</Text>
                                                    }
                                                    <VehicleImage  display={2}  param={item.images} />
                                                </View>
                                                <View style={{ width: '65%', justifyContent: 'center' }}>
                                                    <Text style={{ paddingHorizontal:2,color: lightText, textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>

                                                        {this.mainTitle(item)}
                                                    </Text>
                                                  

                                                    <View style={{ flexDirection: 'row',marginVertical:2 }}>
                                                        <Text style={{ color: lightText, fontSize: 12, textAlign: 'left', paddingHorizontal: 10 }}>
                                                        MOT Due 
                                                  </Text>
                                                        <Text style={{ textAlign: 'right', position: 'absolute', right: 5, color: lightText, fontSize: 12, }}>{(item.motDueDate != null) ? moment(item.motDueDate).format('L') : " - "}</Text>
                                                    </View>
                                                    

                                                    <View style={{ flexDirection: 'row',marginVertical:2 }}>
                                                        <Text style={{ color: lightText, fontSize: 12, textAlign: 'left', paddingHorizontal: 10 }}>
                                                        TAX Due
                                                  </Text>
                                                        <Text style={{ textAlign: 'right', position: 'absolute', right: 5, color: lightText, fontSize: 12, }}>{(item.taxDueDate != null) ? moment(item.taxDueDate).format('L') : " - "}</Text>
                                                    </View>


                                                    <View style={{ flexDirection: 'row',marginVertical:2 }}>
                                                        <Text style={{ color: lightText, fontSize: 12, textAlign: 'left', paddingHorizontal: 10 }}>
                                                            Insurance Due
                                                  </Text>
                                                        <Text style={{ textAlign: 'right', position: 'absolute', right: 5, color: lightText, fontSize: 12, }}>{(item.insuranceDueDate != null) ? moment(item.insuranceDueDate).format('L') : " - "}</Text>
                                                    </View>


                                                </View>
                                            </TouchableOpacity>
                                        </LinearGradient>
                                    }
                                </View>
                            )}
                        ListEmptyComponent={this.flatListEmptyMessage}
                    />

                </ScrollView>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.isModal}
                    onRequestClose={() => {
                        console.warn("Modal has been closed.");
                        this.ToggleModal()
                    }}

                >
                    <SafeAreaView style={{ elevation: 10, backgroundColor: '#fff', borderRadius: 10, top: '30%', height: '40%', width: '86%', marginHorizontal: '7%', }}>
                        <View style={{ width: '100%', height: '100%' }}>
                            <View style={{ margin: 5, marginVertical: 5, padding: 5, justifyContent: 'center', }}>
                                <Text style={[styles.headerModalText, { color: darkText, paddingTop: 10, paddingLeft: 10, fontSize: 20, fontWeight: 'bold' }]}>
                                    My dashboard
                            </Text>
                            </View>
                            <View style={{ height: '78%', }}>
                                <View style={{ width: '98%', marginHorizontal: '1%', justifyContent: 'center' }}>

                                    <Text style={{ fontSize: 16, color: "black", paddingHorizontal: 15 }}>
                                        How would you like to view your vehicle information?
                                    </Text>


                                    <View style={{ marginTop: 20, flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.ToggleModal()
                                                this.flatListDisplatDashboard(1)

                                            }} style={{ padding: 10, marginHorizontal: 5 }}>
                                            <Text style={{ color: Apptheme, }}>
                                                PERSONAL VIEW
                                        </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            this.ToggleModal()
                                            this.flatListDisplatDashboard(0)
                                        }} style={{ padding: 10, marginHorizontal: 5 }}>
                                            <Text style={{ color: Apptheme, }}>
                                                TRADE VIEW
                                        </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            this.ToggleModal()
                                        }} style={{ padding: 10, marginHorizontal: 5 }}>
                                            <Text style={{ color: Apptheme, }}>
                                                CANCEL
                                        </Text>
                                        </TouchableOpacity>
                                    </View>


                                </View>
                            </View>
                        </View >
                    </SafeAreaView>
                </Modal>
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
        width: '100%',
        backgroundColor: 'lightgray',
        paddingBottom: 10
    },
    ParentBoxView: {
        width: '92%',
        height: 150,
        marginHorizontal: '4%',
        marginTop: -30,
        flexDirection: 'row'
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
    },
    noRecordFoundText: {
        textAlign: 'center',
        fontSize: 14
    }
})