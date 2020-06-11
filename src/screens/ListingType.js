import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    Modal,
    Image
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import CommponStyle, { GreenBg, Apptheme, lightText, darkText, LinearColor, lightBg } from '../helpers/CommponStyle';
import Topbar from '../components/Topbar';
import PremiumModal from '../components/Premium';
import Storage from '../helpers/Storage';
export default class ListingType extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isPremiumModal:false,
            isModal:false,
        }
        this.PremiumModalToggle=this.PremiumModalToggle.bind(this);
    }
    ToggleModal = () => {
        this.setState({
            isModal: !this.state.isModal
        })
    }
    PremiumModalToggle =()=>{
        this.setState({
            isPremiumModal:!this.state.isPremiumModal
        })
    }

    checkedSession =()=>{
        if(Object.keys(Storage.userData).length >0 ){
            this.PremiumModalToggle();
        }
        else{
            this.ToggleModal()
        }
    }
    checkedSessionFreeListing = () => {
        if (Object.keys(Storage.userData).length > 0) {
            this.props.navigation.navigate("ListVehicle")
        }
        else {
            this.ToggleModal()
        }
    }
    
    render() {
        return (
            <View>
                <Topbar ParentPage="Select Listing Type" navigation={this.props} />
                <View style={styles.ParentView}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ paddingVertical: 10, fontSize: 20, fontWeight: 'bold' }}>PREMIUM Listing</Text>
                        <Text style={{ textAlign: 'center', color: "#333", paddingHorizontal: 10 }}>
                            A PREMIUM listing gives you these great features designedto help sell your vehicle more quickly.
                        </Text>

                        <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: "#333" }}>
                                -10 photos
                            </Text>
                            <Text style={{ color: "#333" }}>
                                -Unlimited description length
                            </Text>
                            <Text style={{ color: "#333" }}>
                                -Feature selection list
                            </Text>
                            <Text style={{ color: "#333" }}>
                                -Bold ads, placed above FREE ads
                            </Text>
                        </View>

                        <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ paddingHorizontal: 10 }}>
                                Increase your chances of selling your vehicle for just
                            </Text>
                            <Text style={{ paddingHorizontal: 10 }}>
                                $4.99 now for a monts's PREMIUM listing!
                            </Text>
                        </View>
                        <View style={{ width: '94%', marginHorizontal: '3%', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={()=>this.checkedSession()} style={styles.Button}>
                                <Text style={{ color: lightText }}>PREMIUM LISTING</Text>
                            </TouchableOpacity>
                        </View>


                        <Text style={{ paddingVertical: 10, fontSize: 20, fontWeight: 'bold' }}>Free Listing</Text>
                        <Text style={{ textAlign: 'center', color: "#333", paddingHorizontal: 10 }}>
                            FREE one month listing including one photo and a short description.
                        </Text>

                        <View style={{ width: '94%', marginHorizontal: '3%', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={()=>this.checkedSessionFreeListing()} style={[styles.Button,{backgroundColor:Apptheme}]}>
                                <Text style={{ color: lightText }}>FREE LISTING</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                {this.state.isPremiumModal && 
                <PremiumModal PremiumModalToggle={this.PremiumModalToggle}/>
                }

<Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.isModal}
                    onRequestClose={() => {
                        console.warn("Modal has been closed.");
                        this.ToggleModal()
                    }}

                >
                    <SafeAreaView style={{ elevation: 10, backgroundColor: '#fff', borderRadius: 10, top: '35%', height: '26%', width: '86%', marginHorizontal: '7%', }}>
                        <View style={{ width: '100%', height: '100%' }}>
                            <View style={{ margin: 5, marginVertical: 5, padding: 5, justifyContent: 'center',  }}>
                                <Text style={[styles.headerModalText, { color: darkText, paddingTop: 10,paddingLeft:10, fontSize: 20, fontWeight: 'bold' }]}>
                                   Sell your Vehicle
                            </Text>
                            </View>
                            <View style={{ height: '78%',  }}>
                                <View style={{ width: '98%', marginHorizontal: '1%', justifyContent: 'center' }}>
                                   
                                    <Text style={{fontSize:16,color:"black", paddingTop: 5,paddingLeft:20,}}>
                                      You need to be logged in to sell a vehicle.
                                    </Text>
                                    <View style={{marginTop:20,flexDirection:'row',justifyContent:"flex-end"}}>
                                    <TouchableOpacity
                                    onPress={()=>{
                                        this.ToggleModal()
                                       
                                    }} style={{padding:10,marginHorizontal:5}}>
                                        <Text style={{color:Apptheme,}}>
                                            CANCEL
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{
                                        this.ToggleModal()
                                        this.props.navigation.replace("Login")
                                    }} style={{padding:10,marginHorizontal:5}}>
                                    <Text style={{color:Apptheme,}}>
                                            Login
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
    Button: {
        ...CommponStyle.GradiendButtonView,
        backgroundColor: GreenBg
    }
})