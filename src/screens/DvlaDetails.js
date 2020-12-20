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
import CommponStyle, { Apptheme, lightText, darkText, LinearColor, lightBg ,GreenBg} from '../helpers/CommponStyle';
import Topbar from '../components/Topbar';
import {
    TextField,
} from 'react-native-material-textfield';
import * as VehicleService from '../services/Vehicle';
import * as Utilities from "../helpers/Utilities";
import Storage from '../helpers/Storage';

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
})
let purchaseUpdateSubscription;
let purchaseErrorSubscription;
export default class DvlaDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerNo: '',
            newVehicle: '',
            isLoader: false,
            param: 0,
            selectPackage: 0,
            detail:this.props.navigation.state.params.params,
            productList:[]
        }
      console.log("getItems")
    }
    getItems = async () => {
        try {
            console.log("getItemsssss")
            const products = await RNIap.getProducts(itemSkus);
            console.log("products",products);
            // const products = await RNIap.getSubscriptions(itemSkus);
            this.setState({ productList: products });
        } catch (err) {
            console.warn(err.code, err.message);
        }
    };

    async componentDidMount() {
        console.log("getItems componentDidMount")
        this.getItems()
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

    // UNSAFE_componentWillMount() {
        
    //     this.getItems()

    // }

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

    dvlaMot = (id) => {
        if(this.state.productList.length > 0){
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
        else{
            Alert.alert(
                "No Data Found?"
            )
        }
    }
    dvlaDetailData = (id) => {

        if(this.state.productList.length>0){
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
        else{
            Alert.alert(
                "No Data Found?"
            )
        }
    }

   render() {
       return (
            <View style={styles.ParentView}>
                <Topbar ParentPage="REGiSTERED DVLA DETAILS" navigation={this.props} />
                {this.state.isloader &&
                    <View style={styles.menuLoaderView}>
                        <ActivityIndicator
                            color="#ed0000"
                            size="large"
                        />
                    </View>
                }
             <SafeAreaView style={{ flex: 0, backgroundColor: Apptheme }} />
                <ScrollView style={{ width: '100%' }}>
                   
                 
                        <View style={[styles.TextFieldView], { width: '100%' }}>
                            <View style={{ backgroundColor: "#d2d2d2" }}>
                                <Text style={styles.newVehicleMainViewText}>
                                  PARTIAL VEHICLE DATA
                                    </Text>
                            </View>
                            <View style={{ backgroundColor: "#ebebeb" }}>
                            <View style={styles.newVehicleView}>
                                <Text style={styles.textLabel}>
                                    Make
                                    </Text>
                                <Text style={styles.textValue}>
                                    {this.state.detail.make}
                                    </Text>
                            </View>

                            <View style={styles.newVehicleView}>
                                <Text style={styles.textLabel}>
                                    Model
                                    </Text>
                                <Text style={styles.textValue}>
                                {this.state.detail.exactModel}
                                    </Text>
                            </View>

                            <View style={styles.newVehicleView}>
                                <Text style={styles.textLabel}>
                                    Build year
                                    </Text>
                                <Text style={styles.textValue}>
                                {this.state.detail.buildYear}
                                    </Text>
                            </View>

                            <View style={styles.newVehicleView}>
                                <Text style={styles.textLabel}>
                                    Transmission type
                                    </Text>
                                <Text style={styles.textValue}>
                                {this.state.detail.transmissionType}
                                    </Text>
                            </View>

                            <View style={styles.newVehicleView}>
                                <Text style={styles.textLabel}>
                                    Engine size (Litre)
                                    </Text>
                                <Text style={styles.textValue}>
                                {this.state.detail.engineSizeLitre}
                                    </Text>
                            </View>

                            <View style={styles.newVehicleView}>
                                <Text style={styles.textLabel}>
                                    Color
                                    </Text>
                                <Text style={styles.textValue}>
                                {this.state.detail.colour}
                                    </Text>
                            </View>

                            <View style={styles.newVehicleView}>
                                <Text style={styles.textLabel}>
                                    Door count 
                                    </Text>
                                <Text style={styles.textValue}>
                                {this.state.detail.doorCount}
                                    </Text>
                            </View>

                            <View style={styles.newVehicleView}>
                                <Text style={styles.textLabel}>
                                    Seat count 
                                    </Text>
                                <Text style={styles.textValue}>
                                    {this.state.detail.seatCount == 0?"N/A":this.state.detail.seatCount}
                              
                                    </Text>
                            </View>
                        </View>

                        <View style={{width:'100%',backgroundColor:"#d2d2d2",paddingHorizontal:30,paddingVertical:5}}>
                            <Text style={{color:"#000",fontSize:16,fontWeight:'bold'}}>
                                CEHCK DVLA DATA
                            </Text>
                        </View>

                        <TouchableOpacity 
                        onPress={() => this.dvlaMot(1)}
                        style={{width:'90%',marginHorizontal:'5%',marginVertical:10,justifyContent:'center',alignItems:'center',backgroundColor:GreenBg,paddingHorizontal:30,paddingVertical:10,borderRadius:4}}>
                            <Text style={{color:"#fff",fontSize:16,fontWeight:'bold'}}>
                                CEHCK DVLA MOT & MILEAGE
                            </Text>
                        </TouchableOpacity>

                        <View style={{width:'100%',backgroundColor:"#d2d2d2",paddingHorizontal:30,paddingVertical:5}}>
                            <Text style={{color:"#000",fontSize:16,fontWeight:'bold'}}>
                               FINANCE & DVLA FINANCE DETAILS
                            </Text>
                        </View>

                        <TouchableOpacity 
                        onPress={() => this.dvlaDetailData(2)}
                        style={{width:'90%',marginHorizontal:'5%',marginVertical:10,justifyContent:'center',alignItems:'center',backgroundColor:GreenBg,paddingHorizontal:30,paddingVertical:10,borderRadius:4}}>
                            <Text style={{color:"#fff",fontSize:16,fontWeight:'bold'}}>
                                CEHCK DVLA & FINANCE DETAILS
                            </Text>
                        </TouchableOpacity>
                       </View>

                  
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
        borderBottomColor: "#d2d2d2",
        borderBottomWidth: 1,
        backgroundColor:lightBg,
        alignItems: 'center',
        flexDirection:'row',
        paddingHorizontal:20,
        justifyContent: 'space-between',
        width: '100%',
        height: 40
    },
    newVehicleMainViewText: {
        borderBottomColor: "#777",
        borderBottomWidth: 1,
        textAlign: 'left',
        paddingLeft:20,
        fontSize: 20,
        fontWeight: "bold",
        paddingVertical: 10,
        color: "#000"
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
    textValue:{
        color:"#000",
        // fontWeight:'bold'
    },
    textLabel:{
        color:"#000",
        fontWeight:'bold'
    }
})