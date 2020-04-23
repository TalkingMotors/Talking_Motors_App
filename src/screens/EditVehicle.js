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
    TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Topbar from '../components/Topbar';
import CommponStyle, { Apptheme, lightText, lightBg, darkText, LinearColor, linkText } from '../helpers/CommponStyle';
import { TextField } from 'react-native-material-textfield';

import * as Utilities from "../helpers/Utilities";
import * as UserService from '../services/User';
import Constants from "../helpers/Constants";
import Storage from '../helpers/Storage';
import * as VehicleService from '../services/Vehicle';
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
            allData:'',
            isLoader:false
        }
    }

    UNSAFE_componentWillMount() {
        try{
        let params = this.props.navigation.state.params.item
        this.setState({
            allData:params,
            description: params.description,
            postCode: params.postcode,
            price: (params.price > 0) ? params.price : "",
            saleSwitch: !params.sold,
            mileage: (!Utilities.stringIsEmpty(params.userMileage) ? params.userMileage : ""),
            image: params.images[0],
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
        this.props.navigation.navigate('EditVehicleImage', { item: this.state.image, data: this.props.navigation.state.params.item });
    }

    confirmChange = async () => {
        try {
            this.setState({
                isLoader:true
            })
            this.state.allData.userMileage=this.state.mileage;
            this.state.allData.postcode=this.state.postCode;
            this.state.allData.price=this.state.price;
            this.state.allData.description=this.state.description;
            this.state.allData.sold=this.state.saleSwitch;
            var response = await VehicleService.UpdateVehicle(this.state.allData)
            if(response){
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


                        <View style={styles.LoginButtonView}>
                            <TouchableOpacity style={styles.GradientButtonView} onPress={() => this.navigateToVehicleImage()} >
                                <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                    <Text style={styles.ButtonInnerText}>
                                        EDIT PHOTO
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