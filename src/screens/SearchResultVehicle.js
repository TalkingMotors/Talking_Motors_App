
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Button,
    FlatList,
    Image,
    Modal,
    TextInput,
    StatusBar,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Apptheme, lightText, darkText, LinearColor, lightBg } from '../helpers/CommponStyle';
import Topbar from '../components/Topbar';
import { FluidNavigator, Transition } from '../../lib';
import * as Utilities from "../helpers/Utilities";
import * as VehicleService from '../services/Vehicle';
import VehicleImage from '../components/VehicleImage';
const moment = require('moment-timezone');
import * as VehicleLooks from '../services/SearchVehicleType';
const screen_width = Dimensions.get('window').width;
export default class SearchResultVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            result: 0,
            sort: [],
            isModal: false,
            selectedsort: 5,
            sort: [
                { id: 1, name: "From lowest price", sorting: "price" },
                { id: 2, name: "From highest price", sorting: "price" },
                { id: 3, name: "By distance", sorting: "latitude" },
                { id: 4, name: "By mileage", sorting: "userMileage" },
                { id: 5, name: "From newest", sorting: "dateAdded" },
                { id: 6, name: "From oldest", sorting: "dateAdded" },

            ],
            filterparam: {}

        }

    }
    ToggleModal = () => {
        this.setState({
            isModal: !this.state.isModal
        })
    }

    seletedItem = async (item) => {
        this.ToggleModal();
        this.state.selectedsort = item.id
        this.setState({
            selectedsort: item.id
        })
        this.state.filterparam.orderBy = this.state.selectedsort
        var response = await VehicleLooks.SearchVehicleTypes(this.state.filterparam)
        for (var i = 0; i < response.vehicles.length; i++) {

            response.vehicles[i].PremiumDate = this.PremiumPackgedDateChecked(response.vehicles[i].premiumListingExpires)
        }
         this.setState({
            list: response.vehicles,
            result: response.numberOfResults,
        })
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
        }
        return seconds;
    }
    componentWillMount() {
        var response=this.props.navigation.state.params.listVehicle
        if(response !=undefined){
           for (var i = 0; i < response.length; i++) {

            response[i].PremiumDate = this.PremiumPackgedDateChecked(response[i].premiumListingExpires)
        }
        this.setState({
            list: response,
            result: this.props.navigation.state.params.resultcount,
            filterparam: this.props.navigation.state.params.filterparam,
        })
    }
    }


    detail = (item, index) => {
        // alert("AAaa");
        this.props.navigation.navigate('Detail', { item: item, index: index, parent: "talk" });
    }
    flatListEmptyMessage = () => {
        if (this.state.list == [] || this.state.list.length == 0) {
            return (
                <View style={{ width: '96%', marginHorizontal: '2%', height: 450, justifyContent: 'center', alignItems: 'center' }}>
                    <FontAwesome name="car" size={80} style={{ marginVertical: 20 }} color={Apptheme} />
                    <Text style={{ color: Apptheme, fontSize: 20, fontWeight: 'bold' }}>
                        VEHICLE SEARCH
                    </Text>
                    <Text style={{ paddingTop: 10 }}>
                        No vehicle found
                    </Text>
                </View>
            )
        }
    }

    mainTitle = (item) => {
        let make = "";
        let model = "";
        let derivative = "";
        let engineSize = "";
        
        if (!Utilities.stringIsEmpty(item.make) || item.make > 0) {
            make = item.make+" ";
        }
        if (!Utilities.stringIsEmpty(item.model) || item.model > 0) {
            model = item.model+" ";
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
            postcode = item.postcode+" ";
        }
        if (!Utilities.stringIsEmpty(item.price) || item.price > 0) {
            price = "£" + item.price.toFixed(2)+" ";
        }
        return price + postcode
    }


    detailText = (item) => {

        let buildYear = "";
        let doorCount = "";
        let transmissionType = "";
        let engineSize = "";
        let fuelType = "";
        let userMileage="";

        if (!Utilities.stringIsEmpty(item.doorCount) || item.doorCount > 0) {
            doorCount = item.doorCount+" doors . ";
        }
        if (!Utilities.stringIsEmpty(item.buildYear) || item.buildYear > 0) {
            buildYear = item.buildYear+" . ";
        }

        if (!Utilities.stringIsEmpty(item.transmissionType) || item.transmissionType > 0) {
            transmissionType = item.transmissionType+" . ";
        }
        if (!Utilities.stringIsEmpty(item.engineSize) || item.engineSize > 0) {
            engineSize = item.engineSize+"| . ";
        }
        if (!Utilities.stringIsEmpty(item.fuelType) || item.fuelType > 0) {
            fuelType = item.fuelType+"  ";
        }
        if (!Utilities.stringIsEmpty(item.userMileage) || item.userMileage > 0) {
            userMileage = item.userMileage+"m . ";
        }

        return buildYear + userMileage + doorCount + transmissionType + engineSize + fuelType

       
    }
    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar ParentPage="Vehicle Search" navigation={this.props} />
                <ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 0, borderRadius: 5, paddingTop: 10, alignItems: 'center', marginVertical: 10 }}>
                        <View>
                            <Text style={{ fontSize: 18, color: Apptheme, fontWeight: 'bold' }}>
                                {this.state.result} results
                        </Text>
                        </View>
                        {this.state.result > 0 &&
                            <TouchableOpacity
                                onPress={() => this.ToggleModal()}
                                style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 12 }}>
                                    Sort by
                            </Text>

                                <FontAwesome name="sort" size={20} style={{ marginVertical: 0, paddingHorizontal: 10 }} color={Apptheme} />
                                <Text style={{ top: 6, position: 'absolute', marginTop: 10 }}>
                                    {this.state.sort.filter(a => a.id == this.state.selectedsort)[0].name}
                                </Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={{ width: '100%', height: '100%' }}>
                        <FlatList
                            data={this.state.list}
                            listKey={(item, index) => 'recent-' + index.toString()}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={this.flatListEmptyMessage}
                            shouldItemUpdate={this.state.loadMore}
                            renderItem={({ item, index }) =>
                                (
                                    <View key={index}>

                                        <View
                                         style={{ borderRadius: 0, borderWidth: 1, borderColor: '#777', elevation: 3, marginVertical: 4, width: '100%', marginHorizontal: 0, }}>
                                              
                                           <TouchableOpacity
                                                onPress={this.detail.bind(this, item, index)}
                                                style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', height: 100, }}>
                                               <View style={{ width: 100, alignItems: 'center', justifyContent: 'center',}}>
                                                        {item.PremiumDate > 0 &&
                                                        <View 
                                                        style={{ width: 0,
                                                            borderTopWidth: 0,
                                                            borderRightWidth: 0,
                                                            borderBottomWidth: 80 / 2.0,
                                                            borderLeftWidth: 40,
                                                            borderTopColor: 'transparent',
                                                            borderRightColor: 'transparent',
                                                            borderBottomColor: 'transparent',
                                                            borderLeftColor: Apptheme,
                                                            justifyContent:'center',
                                                            alignItems:'center',
                                                            position:'absolute',zIndex:2,top:0,
                                                            left:0
                                                           }}
                                                        >
                                                            <Text style={{ color: '#fff',position:'absolute',right:20,zIndex:3,fontWeight:'bold',fontSize:14,top:5  }}>P</Text>
                                                            </View>
                                                        }
                                                        <VehicleImage param={item.images} />
                                                    </View>
                                                <View style={{  width: screen_width - 102, justifyContent: 'center' }}>
                                                <Text style={{ color: "#000", textAlign: 'left', paddingHorizontal:5,fontSize: 14, fontWeight: 'bold' }}>

                                                    {this.mainTitle(item)}
                                                </Text>
                                                <Text style={{ color: "#000", fontSize: 12, textAlign: 'left', paddingHorizontal: 5 }}>
                                                    {this.subTitle(item)}

                                                </Text>
                                                <Text style={{ color: "#000", fontSize: 12, textAlign: 'left', paddingHorizontal: 5 }}>
                                                   {this.detailText(item)}
                                                </Text>
                                            </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}

                        />
                    </View>
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
                    <TouchableOpacity onPress={() => this.ToggleModal()} style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', height: '100%', position: 'absolute', width: '100%' }}>
                    </TouchableOpacity>
                    <SafeAreaView style={{ elevation: 10, backgroundColor: '#fff', borderRadius: 10, top: '25%', height: '45%', width: '86%', marginHorizontal: '7%', }}>
                        <ScrollView keyboardShouldPersistTaps='handled'>
                            <View style={{ width: '100%', height: '100%' }}>
                                <View style={{ margin: 5, marginVertical: 5, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[styles.headerModalText, { paddingTop: 0 }]}>
                                        Sort results by :
                            </Text>
                                </View>

                                <ScrollView keyboardShouldPersistTaps='handled'>
                                    <View style={{ width: '98%', marginHorizontal: '1%', justifyContent: 'center' }}>
                                        {this.state.sort.map((item, index) => {
                                            return (
                                                <TouchableOpacity onPress={() => this.seletedItem(item)} style={{ width: '100%', marginVertical: 10, marginHorizontal: 1 }} key={index}>
                                                    <Text style={{ paddingHorizontal: 10, color: "#333", fontSize: 14 }}>{item.name}</Text>
                                                    {(this.state.selectedsort == item.id) ?
                                                        <MaterialIcons name="radio-button-checked" style={{ position: 'absolute', right: 25 }} size={20} color={Apptheme} />
                                                        :
                                                        <MaterialIcons name="radio-button-unchecked" style={{ position: 'absolute', right: 25 }} size={20} color={Apptheme} />
                                                    }
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </View>
                                </ScrollView>
                            </View >
                        </ScrollView>
                    </SafeAreaView>
                </Modal >
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
    headerModalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
        color: '#000000'
    },
    TextFieldView: {
        width: '92%',
        marginHorizontal: '4%'
    },
    modalFooterButton: {
        padding: 10,
        marginHorizontal: 5
    },
})