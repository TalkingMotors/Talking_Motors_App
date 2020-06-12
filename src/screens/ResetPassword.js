import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    Keyboard,
    Image
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Topbar from '../components/Topbar';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CommponStyle, { Apptheme, linkText, lightText, darkText, LinearColor, lightBg, darkBg } from '../helpers/CommponStyle';
import { TextField } from 'react-native-material-textfield';
import Storage from '../helpers/Storage';
import * as Utilities from "../helpers/Utilities";
import * as UserService from '../services/User';
export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            Code:'',
            ConformPassword:'',
            Password:'',
            errorCode: false,
            errorEmaill: false,
            errorPassword: false,
            errorConfirmPassoword: false,
            isLoader: false,
            errorMessage: "This is a required field.",
    }
}


onChangeText = (key, value) => {
    this.setState({ [key]: value, loginFail: false , errorMessage: "This is a required field.",})
}
    submit =()=>{
        try{
            Keyboard.dismiss()
            if (Utilities.stringIsEmpty(this.state.email)) {
                this.setState({
                    errorEmaill: true
                })
                return
            }
            else if (Utilities.emailRegex.test(this.state.email) == false) {
                this.setState({
                    errorEmaill: true,
                    errorMessage: "Enter a valid E-mail."
                })
                return 
            }
            if (Utilities.stringIsEmpty(this.state.Code)) {
                this.setState({
                    errorCode: true
                })
                return
            }
            if (Utilities.stringIsEmpty(this.state.Password)) {
                this.setState({
                    errorPassword: true
                })
                return
            }
            if (Utilities.stringIsEmpty(this.state.ConformPassword)) {
                this.setState({
                    errorConfirmPassoword: true
                })
                return
            }
            else if (this.state.Password != this.state.ConformPassword) {
                this.setState({
                    passwordMisMatched: true,
                    errorMessage: "Passwords don't macth"
                })
                return
            }
            let params = { email: this.state.email, code: this.state.Code, password: this.state.Password, 
                confirmPassword: this.state.ConformPassword, }
                console.log("params",params);
                this.setState({
                    isloader: true
                })
                    // let response=await UserService.ForgotPasswordComplete(params)
                    UserService.ForgotPasswordComplete(params).then(response => {
                        if (response) {
                            console.log("response",response);
                            if (response.success) {
                                Storage.userData = response.user;
                                Storage.jwt_Token = response.token;
                                Utilities.asyncStorage_SaveKey(Constants.USER_DATA, JSON.stringify(response.user))
                                Utilities.asyncStorage_SaveKey(Constants.JWT_TOKEN, JSON.stringify(response.token))
                                this.setState({
                                    isloader: false
                                })
                                 this.props.navigation.navigate("Home")
                            }
                            else {
                                this.setState({
                                    loginFail: true,
                                    isloader: false,
                                    loginFailMessage: response.message
                                })
                            }
                        }
                    })
           
        }
        catch(e){
            console.log("ResetPassword",e)
            this.setState({
                loginFail: true,
                isloader: false,
                loginFailMessage: "Failed to connect to server"
            })
        }
    }
    componentWillMount(){
        if(Object.keys(Storage.userData).length > 0) {
            console.log("Storage.userData",Storage.userData);
            this.setState({
                email:Storage.userData.email
            })
        }
    }
    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar ParentPage="Reset Password" navigation={this.props} />
                <ScrollView keyboardShouldPersistTaps="always">
                {this.state.isloader &&
                    <View style={styles.menuLoaderView}>
                        <ActivityIndicator
                            color="#ed0000"
                            size="large"
                        />
                    </View>
                }
                    <View style={styles.LogoView}>
                        <LinearGradient colors={LinearColor} style={styles.LogoGradient}>
                            <Image
                                resizeMode="contain"
                                style={{ height: 100, width: 100 }}
                                source={require('../images/header-logo.png')}
                            />
                        </LinearGradient>
                    </View>

                    <View>
                        <Text style={{ textAlign: 'center', color: darkText, paddingHorizontal: 10 }}>
                            Please check your email inbox for the code to enter below.
                        </Text>

                        <Text style={{ paddingTop: 15, textAlign: 'center', color: darkText, paddingHorizontal: 10 }}>
                            Along with this code, you will need to enter a new password.
                            Press 'Reset Password' to confirm the reset.
                        </Text>
                    </View>
                    {
                        this.state.loginFail &&
                        <View style={[styles.TextFieldView,{marginTop:10}]}>
                            <View style={styles.LoginView}>
                                <Text style={styles.errorViewText}>
                                    {
                                        this.state.loginFailMessage
                                    }
                                </Text>
                            </View>
                        </View>
                    }
                    <View style={styles.TextFieldView}>
                        <TextField
                            label='Email'
                            fontSize={13}
                            keyboardType='email-address'
                            tintColor={Apptheme}
                            baseColor={Apptheme}
                            errorColor="red"
                            activeLineWidth={2}
                            autoCapitalize="none"
                            autoCorrect={false}
                            labelFontSize={13}
                            editable={true}
                            value={this.state.email}
                            onChangeText={val => {
                                this.onChangeText('email', val)
                                this.setState({
                                    errorEmaill: false
                                })
                            }}
                        />
                        {this.state.errorEmaill &&
                            <View style={styles.errorView}>
                                <Text style={styles.errorViewText}>
                                    {this.state.errorMessage}
                                </Text>
                            </View>
                        }
                        <TextField
                            label='Code'
                            fontSize={13}
                            keyboardType='default'
                            tintColor={Apptheme}
                            baseColor={Apptheme}
                            errorColor="red"
                            activeLineWidth={2}
                            autoCapitalize="none"
                            autoCorrect={false}
                            labelFontSize={13}
                            onChangeText={val => {
                                this.onChangeText('Code', val)
                                this.setState({
                                    errorCode: false
                                })
                            }}
                            value={this.state.Code}
                        />
                          {this.state.errorCode &&
                            <View style={styles.errorView}>
                                <Text style={styles.errorViewText}>
                                    {this.state.errorMessage}
                                </Text>
                            </View>
                        }
                        <View>
                            <TextField
                                label='Password'
                                fontSize={13}
                                keyboardType='default'
                                tintColor={Apptheme}
                                baseColor={Apptheme}
                                errorColor="red"
                                activeLineWidth={2}
                                autoCapitalize="none"
                                autoCorrect={false}
                                labelFontSize={13}
                                value={this.state.Password}
                                onChangeText={val => {
                                    this.onChangeText('Password', val)
                                    this.setState({
                                        errorPassword: false,
                                        passwordMisMatched: false
                                    })
                                }}
                                secureTextEntry={this.state.secureTextEntry}
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
                        {this.state.errorPassword &&
                            <View style={styles.errorView}>
                                <Text style={styles.errorViewText}>
                                    {this.state.errorMessage}
                                </Text>
                            </View>
                        }
                        <TextField
                            label='Confirm password'
                            fontSize={13}
                            keyboardType='default'
                            tintColor={Apptheme}
                            baseColor={Apptheme}
                            errorColor="red"
                            activeLineWidth={2}
                            autoCapitalize="none"
                            autoCorrect={false}
                            labelFontSize={13}
                            value={this.state.ConformPassword}
                            
                            secureTextEntry={this.state.secureTextEntry}
                            onChangeText={val => {
                                this.onChangeText('ConformPassword', val)
                                this.setState({
                                    errorConfirmPassoword: false,
                                    passwordMisMatched:false
                                })
                            }}
                        />
                         {this.state.errorConfirmPassoword &&
                            <View style={styles.errorView}>
                                <Text style={styles.errorViewText}>
                                    {this.state.errorMessage}
                                </Text>
                            </View>
                        }
                        {this.state.passwordMisMatched &&
                            <View style={styles.errorView}>
                                <Text style={styles.errorViewText}>
                                    {this.state.errorMessage}
                                </Text>
                            </View>
                        }
                    </View>



                    <View style={styles.LoginButtonView}>
                        <TouchableOpacity onPress={()=>{
                            this.submit();
                        }} style={styles.GradientButtonView} >
                            <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                <Text style={styles.ButtonInnerText}>
                                    SUBMIT
                                </Text>
                            </LinearGradient>
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
        // backgroundColor: 'lightgray',

    },
    LogoView: {
        ...CommponStyle.LogoView
    },
    LogoGradient: {
        ...CommponStyle.LogoGradient
    },
    TextFieldView: {
        width: '92%',
        marginHorizontal: '4%'
    },
    ChangePasswordView: {
        flexDirection: 'row',
        marginHorizontal: 30,
        marginTop: 10,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ChangePasswordText: {
        color: linkText,
        fontSize: 14,
        paddingBottom: 2
    },
    LoginButtonView: {
        marginTop: 0,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '5%',
    },
    PasswordSecureView: {
        position: 'absolute',
        top: 15,
        right: 0,
        padding: 10
    },
    GradientButtonView: {
        ...CommponStyle.GradiendButtonView
    },
    ButtonInnerText: {
        ...CommponStyle.ButtonInnerText
    },
    ChangePasswordView: {
        flexDirection: 'row',
        marginHorizontal: 30,
        marginTop: 10,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ChangePasswordText: {
        color: linkText,
        fontSize: 14,
        paddingBottom: 2
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
    LoginView: {
        justifyContent: 'center',
        alignItems: 'center'
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