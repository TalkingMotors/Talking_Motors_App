import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image,
    StatusBar,
    ActivityIndicator,
    Dimensions,
    Switch,
    Keyboard,
    Modal,
    CheckBox,
    TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Topbar from '../components/Topbar';
import CommponStyle, { Apptheme, lightText, lightBg, darkText, LinearColor, linkText } from '../helpers/CommponStyle';
import { TextField } from 'react-native-material-textfield';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Utilities from "../helpers/Utilities";
import * as UserService from '../services/User';
import Constants from "../helpers/Constants";
import Storage from '../helpers/Storage';
import * as VehicleService from '../services/Vehicle';
import {GetSpecificVehicle} from './Detail';
export default class EditVehicle extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            postCode: '',
            price: '',
            mileage: '',
            description: '',
            saleSwitch: false,
            image: '',
            allImages:[],
            allData:'',
            isLoader:false,
            PremiumDate:0,
            allfeatures: [],
            features: [],
            isModal:false,
        }
        
    }

    UNSAFE_componentWillMount() {
        try{
        let params = this.props.navigation.state.params.item
        var sortedImage=params.images.sort(function(a, b){return a.position - b.position});
        let allfeatures = this.props.navigation.state.params.allfeatures
        this.setState({
            allData:params,
            description: params.description,
            postCode: params.postcode,
            price: (params.price > 0) ? params.price : "",
            saleSwitch: !params.sold,
            mileage: (!Utilities.stringIsEmpty(params.userMileage) ? params.userMileage : ""),
            image: sortedImage[0],
            features:params.features,
            PremiumDate:params.PremiumDate,
            allImages:params.images,
            allfeatures:allfeatures
        })
    }
    catch(e){
        console.log("componentWillMount",e)
    }
   
    }
    onChangeText = (key, value) => {
        this.setState({ [key]: value, })
    }
    toggleSwitch = (value) => {
        this.setState({ saleSwitch: value })
    }

    navigateToVehicleImage() {
        this.props.navigation.navigate('EditVehicleImage', {PremiumDate:this.state.PremiumDate, allImages:this.state.allImages,item: this.state.image, data: this.props.navigation.state.params.item });
    }

    confirmChange = async () => {
        try {
            this.setState({
                isLoader:true
            })
            let param = {
                id: this.state.allData.id,
                userMileage: this.state.mileage,
                postcode: this.state.postCode,
                description: this.state.description,
                price: this.state.price,
                sold: this.state.saleSwitch
            }
             var response = await VehicleService.UpdateVehicle(param)
            if(response){
                GetSpecificVehicle(this.state.allData.id)
                this.setState({
                    isLoader:false
                })
                this.props.navigation.goBack();
            }
        }
        catch (e) {
            this.setState({
                isLoader:false
            })
            console.log("confirmChange EditVehicle", e);
        }
    }

    ToggleModal = () => {
        this.setState({
            isModal: !this.state.isModal
        })

    }

    checkBoxChange(item,checked,index){
        item.checkBox=checked;
        this.state.allfeatures.splice(index, 1, item);
        this.setState({
            allfeatures:this.state.allfeatures
        })
   }

    confirmFeatueUpdate =async () => {
        var selectedFeatures = []
        this.ToggleModal()
        this.setState({
            isLoader:true
        })
        for (var i = 0; i < this.state.allfeatures.length; i++) {
            if (this.state.allfeatures[i].checkBox) {
                selectedFeatures.push(this.state.allfeatures[i].id)
            }
        }
        this.state.allData.features = selectedFeatures;
         var response = await VehicleService.UpdateVehicle(this.state.allData)
         if(response){
            GetSpecificVehicle(this.state.allData.id)
            this.setState({
                isLoader:false
            })
            this.props.navigation.goBack();

    }
    }
    render() {
        return (


            <View style={styles.ParentView}>
                <Topbar ParentPage="Edit Your Vehicle" navigation={this.props} />

                {this.state.isloader &&
                    <View style={styles.menuLoaderView}>
                        <ActivityIndicator
                            color="#ed0000"
                            size="large"
                        />
                    </View>
                }
                <ScrollView keyboardShouldPersistTaps="always">
                      <View style={styles.TextFieldView}>
                        <TextField
                            label='Post Code'
                            fontSize={13}
                            keyboardType='default'
                            tintColor={Apptheme}
                            baseColor={darkText}
                            errorColor="red"
                            activeLineWidth={2}
                            autoCapitalize="none"
                            autoCorrect={false}
                            labelFontSize={13}
                            value={this.state.postCode}
                            onChangeText={val => {
                                this.onChangeText('postCode', val)
                               
                            }}
                        />

                        <TextField
                            label='Price'
                            fontSize={13}
                            keyboardType='default'
                            tintColor={Apptheme}
                            baseColor={darkText}
                            errorColor="red"
                            activeLineWidth={2}
                            autoCapitalize="none"
                            autoCorrect={false}
                            labelFontSize={13}
                            value={this.state.price}
                            onChangeText={val => {
                                this.onChangeText('price', val)
                               
                            }}
                        />
                        <TextField
                            label='Mileage'
                            fontSize={13}
                            keyboardType='default'
                            tintColor={Apptheme}
                            baseColor={darkText}
                            errorColor="red"
                            activeLineWidth={2}
                            autoCapitalize="none"
                            autoCorrect={false}
                            labelFontSize={13}
                            value={this.state.mileage}
                            onChangeText={val => {
                                this.onChangeText('mileage', val)
                            }}
                        />
                        <TextField
                            label='Description'
                            fontSize={13}
                            keyboardType='default'
                            tintColor={Apptheme}
                            baseColor={darkText}
                            errorColor="red"
                            activeLineWidth={2}
                            autoCapitalize="none"
                            autoCorrect={false}
                            labelFontSize={13}
                            value={this.state.description}
                            onChangeText={val => {
                                this.onChangeText('description', val)
                            }}
                        />
                        <View style={[styles.ButtonView, { marginTop: 20, flexDirection: 'row', }]}>
                            <Text >For Sale? </Text>
                            <Switch
                                thumbColor={Apptheme}
                                onValueChange={this.toggleSwitch}
                                value={this.state.saleSwitch} />
                        </View>

                            {this.state.PremiumDate > 0 && 
                             <View style={styles.LoginButtonView}>
                             <TouchableOpacity style={styles.GradientButtonView} onPress={() => this.ToggleModal()} >
                                 <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                     <Text style={styles.ButtonInnerText}>
                                         EDIT FEATURES {this.state.features.length >0 ? `(${this.state.features.length})`:""}
                                 </Text>
                                 </LinearGradient>
                             </TouchableOpacity>
                         </View>
                            } 
                        <View style={styles.LoginButtonView}>
                            <TouchableOpacity style={styles.GradientButtonView} onPress={() => this.navigateToVehicleImage()} >
                                <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                    <Text style={styles.ButtonInnerText}>
                                        EDIT PHOTO {this.state.allImages.length > 1 ? `(${this.state.allImages.length})`:""}
                                </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.LoginButtonView}>
                            <TouchableOpacity style={styles.GradientButtonView} onPress={() => { this.confirmChange() }} >
                                <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                    <Text style={styles.ButtonInnerText}>
                                        CONFIRM CHANGES
                                </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
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
                <SafeAreaView style={{ elevation: 10, backgroundColor: '#fff', borderRadius: 10, top: '10%', height: '80%', width: '86%', marginHorizontal: '7%', }}>
                    <View style={{ width: '100%', height: '100%' }}>
                        <View style={{ margin: 5, marginVertical: 5, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.headerModalText, { paddingTop: 0,fontSize:18,fontWeight:'bold' }]}>
                                Features
                            </Text>
                        </View>
                        <View style={{height:'78%'}}>
                        <ScrollView keyboardShouldPersistTaps='handled'>
                            <View style={{ width: '98%', marginHorizontal: '1%', justifyContent: 'center' }}>
                             {this.state.allfeatures.map((item, index) => {
                                 if(item.checkBox){
                                    return (
                                        <TouchableOpacity
                                        key={index}
                                         onPress={() => this.checkBoxChange(item,false,index)} 
                                         style={{ flexDirection:'row',width: '100%', marginVertical: 10, marginHorizontal: 1 }} key={index}>
                                            <Text style={{ paddingHorizontal: 10, color: "#333", fontSize: 14 }}>{item.name}</Text>
                                            <TouchableOpacity  onPress={() => this.checkBoxChange(item,true,index)}  style={{justifyContent:'center',backgroundColor:Apptheme,alignItems:'center',width:15,height:15,position:'absolute',right:25}}>
                                           <Feather onPress={() => this.checkBoxChange(item,true,index)} name="check" size={14} color={'#fff'}/>
                                            </TouchableOpacity>
                                         </TouchableOpacity>
                                    )
                                        }
                                     
                                        else{
                                            return (
                                            <TouchableOpacity
                                            key={index}
                                             onPress={() => this.checkBoxChange(item,true,index)} 
                                             style={{ flexDirection:'row',width: '100%', marginVertical: 10, marginHorizontal: 1 }} key={index}>
                                                <Text style={{ paddingHorizontal: 10, color: "#333", fontSize: 14 }}>{item.name}</Text>
                                                <TouchableOpacity onPress={() => this.checkBoxChange(item,true,index)}  style={{justifyContent:'center',alignItems:'center',width:15,height:15,position:'absolute',right:25,borderColor:'#d2d2d2',borderWidth:1}}>
                                               </TouchableOpacity>
                                             </TouchableOpacity>
                                        )
                                        }
                                })}
                            </View>
                        </ScrollView>
                        </View>
                        <View style={styles.TextFieldView}>
                        <View style={styles.LoginButtonView}>
                            <TouchableOpacity style={styles.GradientButtonView} onPress={() => { this.confirmFeatueUpdate()  }} >
                                <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                    <Text style={styles.ButtonInnerText}>
                                       SAVE
                                </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>     
                        </View>     
                    </View >


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
        backgroundColor: lightBg
    },
    LogoView: {
        width: '100%',
        height: 120,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    LogoGradient: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        borderRadius: 10
    },
    LoginView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    LoginText: {
        color: darkText,
        fontSize: 24,
        fontWeight: 'bold'
    },
    TextFieldView: {
        width: '92%',
        marginHorizontal: '4%'
    },
    LoginButtonView: {
        marginTop: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    GradientButtonView: {
        ...CommponStyle.GradiendButtonView
    },
    ButtonInnerText: {
        ...CommponStyle.ButtonInnerText
    },
    ForgetPasswordView: {
        marginHorizontal: 30,
        marginTop: 10,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    ForgetPasswordText: {
        color: linkText,
        fontSize: 14
    },
    TextView: {
        width: '90%',
        color: darkText
    },
    PasswordSecureView: {
        position: 'absolute',
        top: 15,
        right: 0,
        padding: 10
    },
    errorView: {
        alignSelf: "center"
    },
    errorViewText: {
        borderRadius: 10,
        color: '#fa3335',
        textAlign: 'center',
        backgroundColor: '#ffe0e0',
        padding: 2,
        paddingHorizontal: 20,
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
});