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
    Linking,
    Switch,
    Platform,
    Share,
    Alert,
    Dimensions,
    ActivityIndicator,
    Modal,

    TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Apptheme, lightText, darkText, LinearColor, lightBg, LinearColorGreen, GreenBg } from '../helpers/CommponStyle';
import Topbar from '../components/Topbar';
import { FluidNavigator, Transition } from '../../lib';
import * as Utilities from "../helpers/Utilities";
import Storage from '../helpers/Storage';
import Slider from './Slider';
import * as VehicleLooks from '../services/SearchVehicleType';
import * as VehicleService from '../services/Vehicle';

import RNIap, {
    InAppPurchase,
    PurchaseError,
    SubscriptionPurchase,
    acknowledgePurchaseAndroid,
    consumePurchaseAndroid,
    finishTransaction,
    finishTransactionIOS,
    purchaseErrorListener,
    purchaseUpdatedListener,
} from 'react-native-iap';
export var GetSpecificVehicle;
const itemSkus = Platform.select({
    ios: [
        'uk.co.talkingMotors.talkingMotors.iapFinanceCheck',
        'uk.co.talkingMotors.talkingMotors.iapMotAndMileageCheck', // dooboolab
    ],
    android: [
        // 'android.test.purchased', // subscription
        'mot_details', // subscription
        'dvla_details', // subscription
        // 'point_1000', '5000_point', // dooboolab
    ],
});


let purchaseUpdateSubscription;
let purchaseErrorSubscription;
const moment = require('moment-timezone');
export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerNo: '',
            derivative: '',
            make: '',
            engineSize: '',
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
            userId: Storage.userData.userId,
            ownerId: 0,
            vehicleId: 0,
            PremiumDate: 0,
            features: [],
            allfeatures: [],
            vehicleData: '',
            isModal: false,
            isFavourite: undefined,
            isLoader: false,
            productList: [],
            selectPackage: 0,
            ismotDataDetail: false,
            motDataDetail: [],
            isfinanceDetail: false,
            forSale: false,
            financeDetail: [],
            userMileage: '',
            postcode: '',
        }
        this.AddFavourite = this.AddFavourite.bind(this);
        this.RemoveFavourite = this.RemoveFavourite.bind(this);
        this.shareAction = this.shareAction.bind(this);
        this.onShare = this.onShare.bind(this);
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            this.GetSpecificVehicle(this.props.navigation.state.params.item.id)

        })
    }
    ToggleModal = () => {
        this.setState({
            isModal: !this.state.isModal
        })
    }
    getItems = async () => {
        try {
            const products = await RNIap.getProducts(itemSkus);
            // const products = await RNIap.getSubscriptions(itemSkus);
            this.setState({ productList: products });
        } catch (err) {
            console.warn(err.code, err.message);
        }
    };

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
    stateupdate = (vehicleData) => {
        try {
            console.log("vehicleData", vehicleData);
            this.setState({
                registerNo: vehicleData.registrationNumber,
                vehicleId: vehicleData.id,
                make: vehicleData.make,
                model: vehicleData.model,
                year: vehicleData.buildYear,
                transmission: vehicleData.transmissionType,
                engine: (!Utilities.stringIsEmpty(vehicleData.engineSize) ? vehicleData.engineSize : "") + " " + vehicleData.fuelType,
                doors: vehicleData.doorCount,
                seats: vehicleData.seatCount,
                engineSize: vehicleData.engineSize,
                bodyType: vehicleData.bodyType,
                color: vehicleData.colour,
                image: vehicleData.images,
                descrption: vehicleData.description,
                price: vehicleData.price,
                saleSwitch: vehicleData.sold,
                forSale: vehicleData.sold,
                ownerId: vehicleData.userID,
                derivative: (!Utilities.stringIsEmpty(vehicleData.derivative) ? vehicleData.derivative : ""),
                features: vehicleData.features,
                userMileage: vehicleData.userMileage,
                postcode: vehicleData.postcode,
                vehicleData: vehicleData,


                isLoader: false,
                shareLoader: false
            }, () => {
                this.favIcon();
            })
        }
        catch (e) {
            console.log("stateupdate", e);
        }
    }
    shareAction() {
        if (!this.state.shareLoader) {
            this.onShare();
            setTimeout(() => {
                this.state.shareLoader = false
            }, 500);
        }
    }
    onShare = async () => {
        try {
            this.state.shareLoader = true
            const result = await Share.share({
                message: `https://t77ry.app.goo.gl/?link=http://talkingmotorsapp.com/vehicles/${this.state.registerNo}&apn=com.talkingmotorsapp.talkingmotors&ibi=com.talkingmotorsapp.talkingmotors&isi=1121996881&ad=0&ius=talkingmotors`
            })

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.log("Error", error);
        }
    };
    GetSpecificVehicle = GetSpecificVehicle = async (id) => {
        try {
            var response = await VehicleService.GetSpecificVehicle(id)
            var vehicleData = response.vehicle
            if (response.success) {
                this.stateupdate(vehicleData);

            }
        }
        catch (e) {
            console.log("Exception GetSpecificVehicle", e)
        }
    }

    UNSAFE_componentWillMount() {
        let vehicleData = this.props.navigation.state.params.item
        let parent = this.props.navigation.state.params.parent
        this.stateupdate(vehicleData);
        this.setState({
            parent: parent,
        })
        this.VehicleLookupAllFeatures();
        this.getItems()

    }

    async componentDidMount() {
        try {
            const result = await RNIap.initConnection();
            await RNIap.consumeAllItemsAndroid();

        } catch (err) {
            console.warn(err.code, err.message);
        }

        purchaseUpdateSubscription = purchaseUpdatedListener(
            async (purchase) => {
                const receipt = purchase.transactionReceipt;
                if (receipt) {
                    try {
                        console.log("receipt", receipt);
                         if (Platform.OS === 'ios') {
                           finishTransactionIOS(purchase.transactionId);
                         } else if (Platform.OS === 'android') {
                           // If consumable (can be purchased again)
                           consumePurchaseAndroid(purchase.purchaseToken);
                           // If not consumable
                           acknowledgePurchaseAndroid(purchase.purchaseToken);
                         }
                        const ackResult = await finishTransaction(purchase);
                    } catch (ackErr) {
                    }

                    //   this.setState({receipt}, () => this.goNext());
                }
            },
        );

        purchaseErrorSubscription = purchaseErrorListener(
            (error) => {
                // Alert.alert('purchase error', JSON.stringify(error));
            },
        );
    }

    componentWillUnmount() {
        if (purchaseUpdateSubscription) {
            purchaseUpdateSubscription.remove();
            purchaseUpdateSubscription = null;
        }
        if (purchaseErrorSubscription) {
            purchaseErrorSubscription.remove();
            purchaseErrorSubscription = null;
        }
        RNIap.endConnection();
    }

    getAvailablePurchases = async () => {
        try {
            console.info(
                'Get available purchases (non-consumable or unconsumed consumable)',
            );
            const purchases = await RNIap.getAvailablePurchases();
            console.info('Available purchases :: ', purchases);
            if (purchases && purchases.length > 0) {
                this.setState({
                    availableItemsMessage: `Got ${purchases.length} items.`,
                    receipt: purchases[0].transactionReceipt,
                });
            }
        } catch (err) {
            console.warn(err.code, err.message);
            //   Alert.alert(err.message);
        }
    };
    requestPurchase = async (sku) => {
        try {

            let result = await RNIap.requestPurchase(sku);
            if (result) {
                console.log("result", result);
                console.log("selectPackage", this.state.selectPackage);
                if (this.state.selectPackage == 1) {
                    this.state.ismotDataDetail = true
                    this.setState({
                        ismotDataDetail: this.state.ismotDataDetail
                    })
                    var response = await VehicleService.modData(this.state.registerNo)
                    console.log("response", response);
                    if (response.success) {
                        if (response.motHistoryData.motHistoryRecordCount > 0) {
                            this.setState({
                                motDataDetail: response.motHistoryData.motHistoryRecordList
                            })
                        }
                    }
                }
                if (this.state.selectPackage == 2) {
                    this.state.isfinanceDetail = true
                    this.setState({
                        isfinanceDetail: this.state.isfinanceDetail
                    })
                    var response = await VehicleService.financeDetail(this.state.registerNo)
                    console.log("response", response);
                    if (response.success) {
                        if (response.financeData.financeRecordList > 0) {
                            this.setState({
                                financeDetail: response.financeData.financeRecordList
                            })
                        }
                    }
                }
            }
        } catch (err) {
            console.warn(err.code, err.message);
        }
    };
    VehicleLookupAllFeatures = async () => {
        var response = await VehicleLooks.VehicleLookupAllFeatures()
        var allfeatures = response.features
        for (var i = 0; i < allfeatures.length; i++) {
            allfeatures[i].checkBox = false
            for (var j = 0; j < this.state.features.length; j++) {
                if (allfeatures[i].id == this.state.features[j].id) {
                    allfeatures[i].checkBox = true
                }
            }
        }
        this.setState({
            allfeatures: allfeatures,

        })
  }

    EditVehicle = () => {
        let data = this.props.navigation.state.params.item;
        this.state.vehicleData.PremiumDate=this.PremiumPackgedDateChecked(this.state.vehicleData.premiumListingExpires)

        this.props.navigation.navigate("EditVehicle", {
            item: this.state.vehicleData,
            allfeatures: this.state.allfeatures
        })
    }
    viewMessage = () => {
        this.props.navigation.navigate("Message")
    }
    sendMessage = () => {
        try {
            if (Object.keys(Storage.userData).length > 0) {


                var message = {
                    vrm: this.state.registerNo,
                    userId: this.state.ownerId,
                    vehicleId: this.state.vehicleId,
                    message: "",
                    image: null
                }
                this.props.navigation.navigate("Messenger", { conversationId: 0, messageBody: message })
            }
            else {
                this.ToggleModal();
            }
        }
        catch (e) {
            console.log("Exception", e)
        }
    }

    RemoveFavourite = async () => {
        try {
            this.setState({
                isLoader: true
            })
            let params = {
                vehicleId: this.state.vehicleData.id
            }
            var response = await VehicleService.removeFavourite(params)
            if (response.success) {
                this.stateupdate(response.vehicle);
            }
        }
        catch (e) {

            console.log("Exception", e)
        }
    }
    AddFavourite = async () => {
        try {
            this.setState({
                isLoader: true
            })
            let params = {
                vehicleId: this.state.vehicleData.id
            }
            console.log("params", params);
            var response = await VehicleService.addFavourite(params)
            if (response.success) {
                this.stateupdate(response.vehicle);
            }
        }
        catch (e) {

            console.log("Exception", e)
        }
    }

    CallNo = (number) => {
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${number}`;
        }
        else { phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
    }

    callUser = () => {
        let phoneNumber = '';
        let number = this.state.vehicleData.user.telephone
        Alert.alert(
            `${number}`,
            // "A vehicle with this registration is already on the system. \n\nIf you think this is an error, or you have recently purchased this vehicle please get in touch with us below.",
            "Are you confirm for call now.",
            [

                {
                    text: "CANCELL",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: 'CALL',
                    onPress: () => {
                        this.CallNo(number)
                    },
                    // onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },

            ],
            { cancelable: false }
        );
    }
    favIcon = () => {
        if (Object.keys(Storage.userData).length > 0) {
            if (Storage.userData.userId != this.state.vehicleData.userID) {
                if (this.state.vehicleData.favourited) {
                    this.setState({
                        isFavourite: true
                    })
                }
                else {
                    this.setState({
                        isFavourite: false
                    })
                }
            }
        }
    }

    toggleSwitch = () => {
        this.setState({
            forSale: !this.state.forSale
        },()=>{
            if(this.state.forSale){
                this.EditVehicle();
            }
        })
    }

    dvlaMot = (id) => {
        Alert.alert(
            "MOT & Mileage check",
            // "A vehicle with this registration is already on the system. \n\nIf you think this is an error, or you have recently purchased this vehicle please get in touch with us below.",
            "Check the details of this vehicle against the official DVLA database so you know exactly what you are buying",

            [

                {
                    text: "NO THANKS",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: `Buy NOW FOR ${this.state.productList[1].localizedPrice}`,
                    onPress: () => {
                        this.setState({
                            selectPackage: id
                        })
                        this.requestPurchase(this.state.productList[1].productId)
                    },
                    // onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },

            ],
            { cancelable: false }
        );
    }
    dvlaDetailData = (id) => {
        Alert.alert(
            "Information check",
            // "A vehicle with this registration is already on the system. \n\nIf you think this is an error, or you have recently purchased this vehicle please get in touch with us below.",
            "The most comprehensive vehicle check available. Includes MOT history, import/export status, V5 issue date, plate changes, number of keepers, VIN number, outstanding finance and history of stolen, scrapped or written off status.",

            [

                {
                    text: "NO THANKS",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: `Buy NOW FOR ${this.state.productList[0].localizedPrice}`,
                    onPress: () => {
                        this.setState({
                            selectPackage: id
                        })
                        this.requestPurchase(this.state.productList[0].productId)
                    },
                    // onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },

            ],
            { cancelable: false }
        );
    }
    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar
                    shareAction={this.shareAction}
                    RemoveFavourite={this.RemoveFavourite}
                    AddFavourite={this.AddFavourite}
                    vehicleData={this.state.vehicleData}
                    isFavourite={this.state.isFavourite}
                    ParentPage="Detail"
                    EditVehicle={this.EditVehicle}
                    parent={this.state.parent}
                    navigation={this.props} />
                  
                {this.state.isloader &&
                    <View style={styles.menuLoaderView}>
                        <ActivityIndicator
                            color="#ed0000"
                            size="large"
                        />
                    </View>
                }
                <ScrollView style={{ paddingBottom: 20,marginBottom:(Platform.OS === 'ios')?50:0 }}>
                    <View style={{ width: '100%', height: 270, justifyContent: 'center', alignItems: 'center' }}>
                        {!Utilities.stringIsEmpty(this.state.image[0]) ?
                            <Transition shared={`imageUrl${this.props.navigation.state.params.index}`}>
                                {(this.state.image.length > 1) ?
                                    <View>

                                        <Text style={{ zIndex: 2, position: 'absolute', top: 22, color: '#fefefe', fontSize: 14, rotation: -40, left: 4, borderRadius: 3, backgroundColor: Apptheme, paddingVertical: 2, paddingHorizontal: 5, }}>Premium</Text>
                                        <Slider Image={this.state.image} />
                                    </View>
                                    :
                                    <Image
                                        resizeMode='cover'
                                        style={{ width: '100%', height: '100%' }}
                                        source={{ uri: this.state.image[0].url }}
                                    />
                                }
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

                    <View>
                        <Text style={{ textAlign: 'center', color: Apptheme, fontWeight: 'bold', fontSize: 16, paddingVertical: 5, paddingHorizontal: 10 }}>
                            {this.state.make + " " + this.state.model + " " + this.state.engineSize + " " + this.state.derivative}
                        </Text>
                    </View>


                    {!Utilities.stringIsEmpty(this.state.price) &&
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
                                    Transmission
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

                    <View style={[styles.MainItemView, { backgroundColor: '#fffff', height: 50 }]}>
                        <View style={styles.ItemViewBox1}>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: "center" }}>
                                <Entypo name="location-pin" size={16} color="#777" />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center', }}>
                                <Text style={styles.TextHead}>
                                    Location
                            </Text>
                                <Text style={styles.TextTail}>
                                    {this.state.postcode}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.ItemViewBox1}>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: "center" }}>
                                <FontAwesome5 name="discourse" size={16} color="#777" />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center', }}>
                                <Text style={styles.TextHead}>
                                    Mileage
                            </Text>
                                <Text style={styles.TextTail}>
                                    {this.state.userMileage}
                                </Text>
                            </View>
                        </View>
                    </View>


                    {this.state.parent == "talk" && !Utilities.stringIsEmpty(this.state.features) &&
                        <View>

                            <View style={{ width: '100%', paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: Apptheme, fontSize: 16 }}>FEATURES</Text>
                            </View>
                            {this.state.features.length > 0 &&
                                <View style={{ width: '100%', paddingHorizontal: 20 }}>
                                    {this.state.features.map((item, index) => {
                                        return (
                                            <Text style={{ textAlign: 'center' }}>
                                                {item.name}
                                            </Text>
                                        )
                                    })}

                                </View>
                            }
                        </View>
                    }

                    <View style={{ width: '100%', paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: Apptheme, fontSize: 16 }}>DESCRIPTION</Text>
                    </View>

                    <View style={{ width: '100%', paddingHorizontal: 20 }}>
                        <Text style={{ textAlign: 'center' }}>
                            {this.state.descrption}
                        </Text>
                    </View>



                    <View style={[styles.ButtonView, { marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                        <Text >For Sale: </Text>
                        {(this.state.userId == this.state.ownerId) ?
                            <Switch
                                thumbColor={Apptheme}
                                onValueChange={this.toggleSwitch}
                                value={this.state.forSale} />
                            :
                            <Text>{(this.state.forSale) ? "Yes" : "No"}</Text>
                        }
                    </View>
                    {((this.state.userId != this.state.ownerId) || Utilities.stringIsEmpty(this.state.userId)) &&
                        <View>
                            {!this.state.ismotDataDetail &&

                                <LinearGradient colors={LinearColorGreen} style={{ borderRadius: 10, justifyContent: 'center', width: '96%', marginHorizontal: '2%', height: 50, marginVertical: 10 }} >
                                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.dvlaMot(1)}>
                                        <Text style={{ fontWeight: 'bold', textAlign: 'center', color: lightText }}>CHECK DVLA MOT & MILEAGE</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            }

                            {this.state.ismotDataDetail &&

                                <View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 10 }}>
                                        <Text style={{ color: Apptheme, fontSize: 16 }}>

                                            DVLA MOT & MILEAGE
                                     </Text>
                                    </View>
                                    {(this.state.motDataDetail.length > 0) ?
                                        <View>
                                            <View style={{ marginVertical: 2, width: '94%', marginHorizontal: '3%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                                                <Text style={{ color: darkText, fontSize: 16, fontWeight: 'bold' }}>
                                                    MOT Test Date
                                           </Text>
                                                <Text style={{ color: darkText, position: 'absolute', right: 10, fontSize: 16 }}>
                                                    {this.state.motDataDetail[0].motTestDate}
                                                </Text>
                                            </View>

                                            <View style={{ marginVertical: 2, width: '94%', marginHorizontal: '3%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                                                <Text style={{ color: darkText, fontSize: 16, fontWeight: 'bold' }}>
                                                    Result
                                           </Text>
                                                <Text style={{ color: darkText, position: 'absolute', right: 10, fontSize: 16 }}>
                                                    {this.state.motDataDetail[0].result}
                                                </Text>
                                            </View>

                                            <View style={{ marginVertical: 2, width: '94%', marginHorizontal: '3%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                                                <Text style={{ color: darkText, fontSize: 16, fontWeight: 'bold' }}>
                                                    Odo Meter Reading
                                           </Text>
                                                <Text style={{ color: darkText, position: 'absolute', right: 10, fontSize: 16 }}>
                                                    {this.state.motDataDetail[0].odometerReading}
                                                </Text>
                                            </View>
                                            <View style={{ marginVertical: 2, width: '94%', marginHorizontal: '3%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                                                <Text style={{ color: darkText, fontSize: 16, fontWeight: 'bold' }}>
                                                    Odo Meter Units
                                           </Text>
                                                <Text style={{ color: darkText, position: 'absolute', right: 10, fontSize: 16 }}>
                                                    {this.state.motDataDetail[0].odometerUnits}
                                                </Text>
                                            </View>
                                        </View>
                                        :
                                        <View style={{ marginVertical: 10 }}>
                                            <Text style={{ textAlign: 'center', fontSize: 14, color: darkText }}>
                                                No DVLA MOT & MILEAGE data found
                                            </Text>
                                        </View>
                                    }
                                </View>

                            }
                            {!this.state.isfinanceDetail &&
                                <LinearGradient colors={LinearColorGreen} style={{ borderRadius: 10, justifyContent: 'center', width: '96%', marginHorizontal: '2%', height: 50, marginVertical: 10 }} >
                                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.dvlaDetailData(2)}>
                                        <Text style={{ fontWeight: 'bold', textAlign: 'center', color: lightText }}>CHECK DVLA & FINANCE DETAILS</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            }
                            {this.state.isfinanceDetail &&
                                <View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 10 }}>
                                        <Text style={{ color: Apptheme, fontSize: 16 }}>
                                            DVLA & FINANCE DETAILS
  </Text>
                                    </View>
                                    {(this.state.financeDetail.length > 0) ?
                                        <View>
                                        </View>
                                        :
                                        <View style={{ marginVertical: 10 }}>
                                            <Text style={{ textAlign: 'center', fontSize: 14, color: darkText }}>
                                                No DVLA & FINANCE DETAILS found
         </Text>
                                        </View>
                                    }
                                </View>
                            }
                        </View>
                    }
                    {
                        this.state.userId == this.state.ownerId ?
                            <LinearGradient colors={LinearColor} style={{ borderRadius: 10, justifyContent: 'center', width: '96%', marginHorizontal: '2%', height: 50, marginVertical: 10 }} >
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.viewMessage()}>

                                    <Feather
                                        // onPress={() => this.props.navigation.navigation.goBack()}
                                        name="message-circle" color={lightText} size={22} style={{ paddingHorizontal: 10 }} />
                                    <Text style={{ fontWeight: 'bold', textAlign: 'center', color: lightText }}>VIEW MESSAGES</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                            :
                            <LinearGradient colors={LinearColor} style={{ borderRadius: 10, justifyContent: 'center', width: '96%', marginHorizontal: '2%', height: 50, marginVertical: 10 }} >
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.sendMessage()}>

                                    <Feather
                                        // onPress={() => this.props.navigation.navigation.goBack()}
                                        name="message-circle" color={lightText} size={22} style={{ paddingHorizontal: 10 }} />
                                    <Text style={{ fontWeight: 'bold', textAlign: 'center', color: lightText }}>SEND MESSAGES</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                    }

                    {
                        this.state.userId != this.state.ownerId && this.state.forSale == true && !Utilities.stringIsEmpty(this.state.vehicleData.user.telephone) &&
                        <LinearGradient colors={LinearColor} style={{ borderRadius: 10, justifyContent: 'center', width: '96%', marginHorizontal: '2%', height: 50, marginVertical: 10 }} >
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.callUser()}>


                                <Text style={{ fontWeight: 'bold', textAlign: 'center', color: lightText }}>CALL USER</Text>
                            </TouchableOpacity>
                        </LinearGradient>

                    }
                    {this.state.PremiumDate == 0 &&
                        <LinearGradient colors={LinearColor} style={{ borderRadius: 10, justifyContent: 'center', width: '96%', marginHorizontal: '2%', height: 50, marginVertical: 10 }} >
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate("ListingType")}>
                                {/* <Feather name="message-circle" color={lightText} size={22} style={{ paddingHorizontal: 10 }} /> */}
                                <Text style={{ fontWeight: 'bold', textAlign: 'center', color: lightText }}>UPGRADE TO PREMIUM</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    }
                    {((this.state.userId != this.state.ownerId) || Utilities.stringIsEmpty(this.state.userId)) &&

                        <LinearGradient colors={LinearColor} style={{ borderRadius: 10, justifyContent: 'center', width: '96%', marginHorizontal: '2%', height: 50, marginVertical: 10 }} >
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() =>
                                this.props.navigation.navigate("UsersVehicle", {
                                    userId: this.state.vehicleData,
                                })}
                            >
                                <Text style={{ fontWeight: 'bold', textAlign: 'center', color: lightText }}>VIEW OTHER VEHICLES FROM THIS USER</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    }





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
                    <SafeAreaView style={{ elevation: 10, backgroundColor: '#fff', borderRadius: 10, top: '30%', height: '25%', width: '86%', marginHorizontal: '7%', }}>
                        <View style={{ width: '100%', height: '100%' }}>
                            <View style={{ margin: 5, marginVertical: 5, padding: 5, justifyContent: 'center', }}>
                                <Text style={[styles.headerModalText, { color: darkText, paddingTop: 0, paddingLeft: 10, fontSize: 20, fontWeight: 'bold' }]}>
                                    Login to your account
                            </Text>
                            </View>
                            <View style={{ height: '78%', }}>
                                <View style={{ width: '98%', marginHorizontal: '1%', justifyContent: 'center' }}>

                                    <Text style={{ fontSize: 14, color: "black", paddingHorizontal: 10 }}>
                                        You must be logged in to message this user Please login or register now
                                    </Text>
                                    <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: "flex-end" }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.ToggleModal()
                                                this.props.navigation.replace("Login")
                                            }} style={{ padding: 10, marginHorizontal: 5 }}>
                                            <Text style={{ color: Apptheme, }}>
                                                Login
                                        </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            this.ToggleModal()
                                            this.props.navigation.replace("Register")
                                        }} style={{ padding: 10, marginHorizontal: 5 }}>
                                            <Text style={{ color: Apptheme, }}>
                                                Register
                                        </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            this.ToggleModal()
                                        }} style={{ padding: 10, marginHorizontal: 5 }}>
                                            <Text style={{ color: Apptheme, }}>
                                                Cancel
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