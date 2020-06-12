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
    Dimensions,
    ActivityIndicator,
    Modal,
    TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Apptheme, lightText, darkText, LinearColor, lightBg,LinearColorGreen ,GreenBg } from '../helpers/CommponStyle';
import Topbar from '../components/Topbar';
import { FluidNavigator, Transition } from '../../lib';
import * as Utilities from "../helpers/Utilities";
import Storage from '../helpers/Storage';
import Slider from './Slider';
import * as VehicleLooks from '../services/SearchVehicleType';
import * as VehicleService from '../services/Vehicle';
export var GetSpecificVehicle;
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
            userId: Storage.userData.userId,
            ownerId: 0,
            vehicleId: 0,
            PremiumDate: 0,
            features: [],
            allfeatures: [],
            vehicleData: '',
            isModal: false,
            isFavourite:undefined,
            isLoader:false,
        }
        this.AddFavourite=this.AddFavourite.bind(this);
        this.RemoveFavourite=this.RemoveFavourite.bind(this);
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            this.GetSpecificVehicle(this.props.navigation.state.params.item.id)

        })
    }
    ToggleModal = () => {
        this.setState({
            isModal: !this.state.isModal
        })
    }

    stateupdate = (vehicleData) => {
        try {
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
                bodyType: vehicleData.bodyType,
                color: vehicleData.colour,
                image: vehicleData.images,
                descrption: vehicleData.description,
                price: vehicleData.price,
                saleSwitch: vehicleData.forSale,
                ownerId: vehicleData.userID,
                PremiumDate: vehicleData.PremiumDate,
                features: vehicleData.features,
                vehicleData: vehicleData,
                isLoader:false
            }, () => {
                console.log('this.state', this.state);
                this.favIcon();
            })
        }
        catch (e) {
            console.log("stateupdate", e);
        }
    }


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
        console.log("vehicleData", vehicleData);
        let parent = this.props.navigation.state.params.parent
        this.stateupdate(vehicleData);
        this.setState({
            parent: parent,
        })
        // this.setState({
        //     registerNo: vehicleData.registrationNumber,
        //     vehicleId: vehicleData.id,
        //     make: vehicleData.make,
        //     model: vehicleData.model,
        //     year: vehicleData.buildYear,
        //     transmission: vehicleData.transmissionType,
        //     engine: (!Utilities.stringIsEmpty(vehicleData.engineSize) ? vehicleData.engineSize : "") + " " + vehicleData.fuelType,
        //     doors: vehicleData.doorCount,
        //     seats: vehicleData.seatCount,
        //     bodyType: vehicleData.bodyType,
        //     color: vehicleData.colour,
        //     image: vehicleData.images,
        //     descrption: vehicleData.description,
        //     price: vehicleData.price,
        //     saleSwitch: vehicleData.forSale,
        //     parent: parent,
        //     ownerId: vehicleData.userID,
        //     PremiumDate: vehicleData.PremiumDate,
        //     features: vehicleData.features,
        //     vehicleData: vehicleData
        // })
        this.VehicleLookupAllFeatures();

    }

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
        this.props.navigation.navigate("EditVehicle", {
            item: data,
            allfeatures: this.state.allfeatures
        })
    }
    viewMessage = () => {
        this.props.navigation.navigate("Message")
    }
    sendMessage = () => {
        try{
            if(Object.keys(Storage.userData).length>0){

           
        var message = {
            vrm: this.state.registerNo,
            userId: this.state.ownerId,
            vehicleId: this.state.vehicleId,
            message: "",
            image: null
        }
        this.props.navigation.navigate("Messenger", { conversationId: 0, messageBody: message })
    }
    else{
        this.ToggleModal();
    }
    }
    catch(e){
        console.log("Exception",e)
    }
    }

    RemoveFavourite = async ()=>{
        try{
            this.setState({
                isLoader:true
            })
            let params={
                vehicleId:this.state.vehicleData.id
            }
            console.log("params",params);
            var response = await VehicleService.removeFavourite(params)
            if(response.success){
                this.stateupdate(response.vehicle);
            }
        }
        catch(e){
            
            console.log("Exception",e)
        }
    }
   AddFavourite = async ()=>{
        try{
            this.setState({
                isLoader:true
            })
            let params={
                vehicleId:this.state.vehicleData.id
            }
            console.log("params",params);
            var response = await VehicleService.addFavourite(params)
            if(response.success){
                this.stateupdate(response.vehicle);
            }
        }
        catch(e){
            
            console.log("Exception",e)
        }
    }

    favIcon =()=>{
      if(Object.keys(Storage.userData).length > 0){
            if(Storage.userData.userId != this.state.vehicleData.userID){
                if(this.state.vehicleData.favourited){
                    console.log("if true");
                    this.setState({
                        isFavourite:true
                    })
                }
                else{
                    console.log("else false");
                    this.setState({
                        isFavourite:false
                    })
                }
            }
        }
    }
    render() {
         return (
            <View style={styles.ParentView}>
                <Topbar 
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
                <ScrollView style={{ paddingBottom: 20 }}>
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
                        <Text style={{ color: Apptheme, fontSize: 16 }}>MORE DESCRPTION</Text>
                    </View>

                    <View style={{ width: '100%', paddingHorizontal: 20 }}>
                        <Text style={{ textAlign: 'center' }}>
                            {this.state.descrption}
                        </Text>
                    </View>



                    <View style={[styles.ButtonView, { marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                        <Text >For Sale: </Text>
                        {(this.state.userId == this.state.ownerId )?
                            <Switch
                                thumbColor={Apptheme}
                                onValueChange={this.toggleSwitch}
                                value={this.state.saleSwitch} />
                            :
                            <Text>{(this.state.saleSwitch) ? "Yes" : "No"}</Text>
                        }
                    </View>
                        {( (this.state.userId != this.state.ownerId ) || Utilities.stringIsEmpty(this.state.userId)) &&
                        <View>
                    <LinearGradient colors={LinearColorGreen} style={{ borderRadius: 10, justifyContent: 'center', width: '96%', marginHorizontal: '2%', height: 50, marginVertical: 10 }} >
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate("ListingType")}>
                                {/* <Feather name="message-circle" color={lightText} size={22} style={{ paddingHorizontal: 10 }} /> */}
                                <Text style={{ fontWeight: 'bold', textAlign: 'center', color: lightText }}>CHECK DVLA MOT & MILEAGE</Text>
                            </TouchableOpacity>
                        </LinearGradient>

                        <LinearGradient colors={LinearColorGreen} style={{ borderRadius: 10, justifyContent: 'center', width: '96%', marginHorizontal: '2%', height: 50, marginVertical: 10 }} >
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate("ListingType")}>
                                {/* <Feather name="message-circle" color={lightText} size={22} style={{ paddingHorizontal: 10 }} /> */}
                                <Text style={{ fontWeight: 'bold', textAlign: 'center', color: lightText }}>CHECK DVLA & FINANCE DETAILS</Text>
                            </TouchableOpacity>
                        </LinearGradient>
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