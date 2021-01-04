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
    ActivityIndicator,
    Dimensions,
    StatusBar,
    StyleSheet,
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
const moment = require('moment-timezone');
export default class UsersVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            emptyList:'',
            isLoader:true,
            

        }
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            this.myfavourite();

        })

    }

    componentWillMount() {
        // this.myfavourite();
    }

    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
            this.setState({
                isLoader: true,
                list: []
            })
        })
    }

    PremiumPackgedDateChecked(premiumDate){
        var seconds=0
        if (!Utilities.stringIsEmpty(premiumDate)) {
            var dateNow = moment.tz('Europe/London').format('ll LTS');
            var momentdate = moment(premiumDate, "YYYY/MM/DD H:mm:ss").format('ll LTS');
             seconds = Math.floor((moment(momentdate) - moment(dateNow)) / 1000);
            if(seconds < 0){
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

    myfavourite = async () => {
        try{
            
            var response = await VehicleService.favorites()
            console.log("response",response);
            if (!Utilities.stringIsEmpty(response.vehicles) || response.success) {
            if (response.vehicles.length > 0) {
                for (var i = 0; i < response.vehicles.length; i++) {
                  
                    response.vehicles[i].PremiumDate = this.PremiumPackgedDateChecked(response.vehicles[i].premiumListingExpires)
                }
                this.setState({
                    list: response.vehicles,
                    isLoader:false
                })
            }
            else {
                this.setState({
                    emptyList: "No records found",
                    isLoader:false
                })
            }
        }
        else if(!response.success) {
             this.setState({
                isLoader:false
            })
            alert("invalid operation");
        }
    }
    catch(e){
        this.setState({
            isLoader:false
        })
        console.log("Exception",e);
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
        return price 
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
    postCode = (item) => {
        let postcode = "";
        let price = ""
        if (!Utilities.stringIsEmpty(item.postcode) || item.postcode > 0) {
            postcode = item.postcode + " ";
        }
        
        return postcode
    }
    flatListEmptyMessage = () => {
        if (this.state.list.length == 0 ) {
            return (<Text style={styles.noRecordFoundText}>{this.state.emptyList}</Text>)
        }
    }
    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar ParentPage="Favourites" navigation={this.props} />

                {this.state.isloader &&
                    <View style={styles.menuLoaderView}>
                        <ActivityIndicator
                            color="#ed0000"
                            size="large"
                        />
                    </View>
                }
                <ScrollView>
                    <View style={{ marginHorizontal: '2%', borderRadius: 5, paddingVertical: 10, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                        <Text style={{ fontSize: 18, color: Apptheme, fontWeight: 'bold' }}>
                            {this.state.list.length } results
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
                                                    <View style={{ width: screen_width - 102, justifyContent: 'center' }}>
                                                        <Text style={{ color: '#000', textAlign: 'left',paddingHorizontal:5, fontSize: 14, fontWeight: 'bold' }}>

                                                            {this.mainTitle(item)}
                                                        </Text>
                                                        <Text style={{ color: Apptheme, fontSize: 12,fontWeight:'bold', textAlign: 'left', paddingHorizontal: 5 }}>
                                                            {this.subTitle(item)}

                                                        <Text style={{color:darkText}}>
                                                            {this.postCode(item)}
                                                        </Text>
                                                        </Text>
                                                        <Text style={{ color: darkText, fontSize: 12, textAlign: 'center', paddingHorizontal: 5 }}>
                                                            {this.detailText(item)}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                </View>
                            )}
 ListEmptyComponent={this.flatListEmptyMessage}
                    />
                    
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
    noRecordFoundText :{ 
        textAlign:'center',
        fontSize:14
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