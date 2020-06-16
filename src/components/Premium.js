import React, { Component } from 'react';
import {
    StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, Dimensions,
    SafeAreaView,
    Keyboard,
    KeyboardAvoidingView,
    Modal, ImageBackground, ActivityIndicator
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import CommponStyle, { Apptheme, lightText, lightBg, darkText, LinearColor, linkText } from '../helpers/CommponStyle';
import { TextField } from 'react-native-material-textfield';
import LinearGradient from 'react-native-linear-gradient';

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
      'com.cooni.point1000',
      'com.cooni.point5000', // dooboolab
    ],
    android: [
        // 'android.test.purchased', // subscription
      'premium_listing_2_months', // subscription
      'premium_listing', // subscription
      // 'point_1000', '5000_point', // dooboolab
    ],
  });
  
  
  let purchaseUpdateSubscription;
  let purchaseErrorSubscription;
export default class PremiumModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PremiumModal: true,
            productList: [],
            receipt: '',
            availableItemsMessage: '',
        }


    }

    componentWillMount(){
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
                // if (Platform.OS === 'ios') {
                //   finishTransactionIOS(purchase.transactionId);
                // } else if (Platform.OS === 'android') {
                //   // If consumable (can be purchased again)
                //   consumePurchaseAndroid(purchase.purchaseToken);
                //   // If not consumable
                //   acknowledgePurchaseAndroid(purchase.purchaseToken);
                // }
                const ackResult = await finishTransaction(purchase);
              } catch (ackErr) {
              }
    
              this.setState({receipt}, () => this.goNext());
            }
          },
        );
    
        purchaseErrorSubscription = purchaseErrorListener(
          (error) => {
            Alert.alert('purchase error', JSON.stringify(error));
          },
        );
      }
    
      componentWillUnmount(){
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
      getItems = async () => {
        try {
          const products = await RNIap.getProducts(itemSkus);
          // const products = await RNIap.getSubscriptions(itemSkus);
          this.setState({productList: products});
        } catch (err) {
          console.warn(err.code, err.message);
        }
      };

      getAvailablePurchases = async ()=> {
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
          Alert.alert(err.message);
        }
      };
      requestPurchase = async (sku)=> {
        try {

         let result = await RNIap.requestPurchase(sku);
            if (result) {
                console.log("Premimum Package Purchase")
                
            }
        } catch (err) {
          console.warn(err.code, err.message);
        }
      };
    PremiumModalToggle = () => {
        this.setState({
            PremiumModal: !this.state.PremiumModal
        })
        this.props.PremiumModalToggle();
    }
    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.PremiumModal}
                onRequestClose={() => {
                    console.warn("Modal has been closed.");
                    this.PremiumModalToggle()
                }}

            >
                <TouchableOpacity onPress={() => this.PremiumModalToggle()} style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', height: '100%', position: 'absolute', width: '100%' }}>
                </TouchableOpacity>
                <SafeAreaView style={{ elevation: 10, backgroundColor: '#fff', borderRadius: 10, top: '25%', height: '50%', width: '86%', marginHorizontal: '7%', }}>
                    <ScrollView keyboardShouldPersistTaps='handled'>
                        <View style={{ width: '100%', height: '100%' }}>
                            <View style={{ margin: 5, marginVertical: 10, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.headerModalText, { paddingTop: 0 }]}>
                                    Upgrade to PREMIUM
                            </Text>
                            </View>
                            <Text style={{ paddingHorizontal: 15, }}>
                                PREMIUM listing gives you 10 photo, increased descriptions, and puts you at the top
                                of the search results, so you can sell your vehicle more quickly.
                            </Text>

                            <Text style={{ paddingHorizontal: 15, marginTop: 20 }}>
                                You can add your vehicles as a PREMIUM listing for one or two months.
                            </Text>
                            <View style={{ marginTop:20,width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                {(this.state.productList.length > 0) ?
                                    <View>
                                        {/* <TouchableOpacity onPress={() => {
                                            this.requestPurchase(this.state.productList[0].productId)
                                            this.PremiumModalToggle()
                                        }} style={styles.modalFooterButton}>
                                            <Text style={{ color: Apptheme }} >1 MONTH - Free</Text>
                                        </TouchableOpacity> */}
                                        <TouchableOpacity onPress={() => {
                                            this.requestPurchase(this.state.productList[0].productId)
                                            this.PremiumModalToggle()
                                        }} style={styles.modalFooterButton}>
                                            <Text style={{ color: Apptheme }} >1 MONTH - {this.state.productList[0].localizedPrice}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => 
                                            {  this.requestPurchase(this.state.productList[1].productId)
                                                this.PremiumModalToggle()
                                                }} style={styles.modalFooterButton}>
                                            <Text style={{ color: Apptheme }} >2 MONTHS - {this.state.productList[1].localizedPrice}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :

                                    <ActivityIndicator
                                        color="#ed0000"
                                        size="large"
                                    />

                                }
                                <TouchableOpacity onPress={() => this.PremiumModalToggle()} style={styles.modalFooterButton}>
                                    <Text style={{ color: Apptheme }} >NO THANKS</Text>
                                </TouchableOpacity>
                            </View>
                        </View >
                    </ScrollView>
                </SafeAreaView>
            </Modal >

        )
    }
}

const styles = StyleSheet.create({
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