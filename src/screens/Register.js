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

export default class Register extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
            nickName: "",
            telephone: "",
            notificationsEnabled: true,
            locationServicesEnabled: true,
            motTestingStation: true,
            secureTextEntry: true
        }
        
    }

    onChangeText = (key, value) => {
        this.setState({ [key]: value, loginFail:false })
    }
    register = () => { 
        try{
            if(Utilities.stringIsEmpty(this.state.password)) {
                return
            }
            else if(Utilities.stringIsEmpty(this.state.confirmPassword)){
                return
            }
            else if(this.state.password != this.state.confirmPassword){
                return
            }
            let params = { name: this.state.name, nickName: this.state.nickName, telephone : this.state.telephone,  email: this.state.email, password: this.state.password, confirmPassword: this.state.confirmPassword, notificationsEnabled : true, locationServicesEnabled: true }
               UserService.register(params).then(response => {
               if(response){
                   if(response.success){
                    Storage.userData = response.user;
                    Storage.jwt_Token = response.token;
                    Utilities.asyncStorage_SaveKey(Constants.USER_DATA, JSON.stringify(response.user))
                    Utilities.asyncStorage_SaveKey(Constants.JWT_TOKEN, JSON.stringify(response.token))
                    this.props.navigation.navigate("Home")
                   }
                   else{
                    this.setState({
                        loginFail: true,
                        loginFailMessage: response.message
                    })
                   }
               }
            })
            
         }
         catch(e){
             console.log("error", e.message)
         }
    }
    render() {
        return (


            <View style={styles.ParentView}>
                 <Topbar ParentPage="Registration" navigation={this.props} />
                <ScrollView keyboardShouldPersistTaps="always">
                    <View style={styles.LogoView}>
                        <LinearGradient colors={LinearColor} style={styles.LogoGradient}>
                            <Image
                                resizeMode="contain"
                                style={{ height: 90, width: 90 }}
                                source={require('../images/header-logo.png')}
                            />
                        </LinearGradient>
                    </View>

                    {/* <View style={styles.LoginView}>
                        <Text style={styles.LoginText}>
                            Registration
                    </Text>
                    </View> */}

                    <View style={styles.TextFieldView}>
                        <TextField
                            label='Enter Name'
                            fontSize={13}
                            keyboardType='default'
                            tintColor={Apptheme}
                            baseColor={darkText}
                            errorColor="red"
                            activeLineWidth={2}
                            autoCapitalize="none"
                            autoCorrect={false}
                            labelFontSize={13}
                            value={this.state.name}
                            onChangeText={val => { this.onChangeText('name', val)}}
                        />
                        <TextField
                            label='Enter User Name'
                            fontSize={13}
                            keyboardType='default'
                            tintColor={Apptheme}
                            baseColor={darkText}
                            errorColor="red"
                            activeLineWidth={2}
                            autoCapitalize="none"
                            autoCorrect={false}
                            labelFontSize={13}
                            value={this.state.nickName}
                            onChangeText={val => { this.onChangeText('nickName', val)}}
                        />

                        <TextField
                            label='Enter Telephone Number'
                            fontSize={13}
                            keyboardType='phone-pad'
                            tintColor={Apptheme}
                            baseColor={darkText}
                            errorColor="red"
                            activeLineWidth={2}
                            autoCapitalize="none"
                            autoCorrect={false}
                            labelFontSize={13}
                            value={this.state.telephone}
                            onChangeText={val => { this.onChangeText('telephone', val)}}
                        />

                        <TextField
                            label='Enter Email'
                            fontSize={13}
                            keyboardType='email-address'
                            tintColor={Apptheme}
                            baseColor={darkText}
                            errorColor="red"
                            activeLineWidth={2}
                            autoCapitalize="none"
                            autoCorrect={false}
                            labelFontSize={13}
                            value={this.state.email}
                            onChangeText={val => { this.onChangeText('email', val)}}
                        />
                        <View>
                            <TextField
                                label='Enter Password'
                                keyboardType='default'
                                fontSize={13}
                                tintColor={Apptheme}
                                baseColor={darkText}
                                errorColor="red"
                                activeLineWidth={2}
                                autoCapitalize="none"
                                autoCorrect={false}
                                labelFontSize={13}
                                secureTextEntry={this.state.secureTextEntry}
                                value={this.state.password}
                                onChangeText={val => { this.onChangeText('password', val)}}
                            />
                            <TouchableOpacity onPress={() =>
                                this.setState({
                                    secureTextEntry: !this.state.secureTextEntry
                                })
                            } style={styles.PasswordSecureView}>

                                <FontAwesome
                                    name={(this.state.secureTextEntry) ? 'eye-slash' : 'eye'}
                                    color='#333'
                                    color={(!this.state.secureTextEntry) ? Apptheme : darkText}
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>

                        <TextField
                            label='Enter Confirm Password'
                            keyboardType='default'
                            fontSize={13}
                            tintColor={Apptheme}
                            baseColor={darkText}
                            errorColor="red"
                            activeLineWidth={2}
                            autoCapitalize="none"
                            autoCorrect={false}
                            labelFontSize={13}
                            secureTextEntry={this.state.secureTextEntry}
                            value={this.state.confirmPassword}
                            onChangeText={val => { this.onChangeText('confirmPassword', val)}}
                        />

                        <View style={styles.LoginButtonView}>
                            <TouchableOpacity style={styles.GradientButtonView} onPress = {()=> this.register() } >
                                <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                    <Text style={styles.ButtonInnerText}>
                                        REGISTER
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
    }
});