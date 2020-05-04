import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image,
    ActivityIndicator,
    StatusBar,
    Keyboard,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import CommponStyle, { Apptheme, lightText, lightBg, darkText, LinearColor, linkText } from '../helpers/CommponStyle';
import { TextField } from 'react-native-material-textfield';

import * as Utilities from "../helpers/Utilities";
import * as UserService from '../services/User';
import Constants from "../helpers/Constants";
import Storage from '../helpers/Storage';

export default class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            secureTextEntry: true,
            username: "maazmehtabuddin95@gmail.com",
            password: "12345678",
            loginFail: false,
            loginFailMessage: "",
            isloader: false,
            errorEmail: false,
            errorEmailMessage: '',
            errorPassword: false,
            errorPasswordMessage: '',
        }

        if (Object.keys(Storage.userData).length > 0) {
            this.props.navigation.navigate("Home")
        } else {
            Utilities.asyncStorage_GetKey(Constants.USER_DATA).then(response => {
                if (response) {
                    Storage.userData = JSON.parse(response);
                    this.props.navigation.navigate("Home")
                }
            })

        }
    }
    componentDidMount = () => {
        this._didFocusSubscription = this.props.navigation.addListener('didFocus', payload => {
            if (Object.keys(Storage.userData).length > 0) {
                this.props.navigation.navigate("Home")
            }
        }
        );
    }
    onChangeText = (key, value) => {
        this.setState({ [key]: value, loginFail: false })
    }
    Login = async () => {
        try {
            if (Utilities.stringIsEmpty(this.state.username)) {
                this.setState({
                    errorEmail: true,
                    errorEmailMessage: "Enter your Email"
                })
                return
            }
            else if (Utilities.stringIsEmpty(this.state.password)) {
                this.setState({
                    errorPassword: true,
                    errorPasswordMessage: "Enter your Password"
                })
                return
            }
            this.setState({
                isloader: true
            })
            let params = { "email": this.state.username, "password": this.state.password }
            UserService.login(params).then(response => {
                if (response) {
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
        catch (e) {
            console.log("error", e.message)
            this.setState({
                isloader: false
            })
        }
    }
    render() {
        return (


            <View style={styles.ParentView}>
                <StatusBar
                    barStyle="light-content"
                    translucent={false}
                    backgroundColor={Apptheme}
                />
                {this.state.isloader &&
                    <View style={styles.menuLoaderView}>
                        <ActivityIndicator
                            color="#ed0000"
                            size="large"
                        />
                    </View>
                }
                <ScrollView keyboardShouldPersistTaps="always">
                    <View style={styles.LogoView}>
                        <LinearGradient colors={LinearColor} style={styles.LogoGradient}>
                            <Image
                                resizeMode="contain"
                                style={{ height: 100, width: 100 }}
                                source={require('../images/header-logo.png')}
                            />
                        </LinearGradient>
                    </View>

                    <View style={styles.LoginView}>
                        <Text style={styles.LoginText}>
                            Login
                    </Text>
                    </View>
                    {
                        this.state.loginFail &&
                        <View style={styles.TextFieldView}>
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
                            label='Enter Email'
                            fontSize={13}
                            keyboardType='email-address'
                            tintColor={Apptheme}
                            baseColor={Apptheme}
                            errorColor="red"
                            activeLineWidth={2}
                            autoCapitalize="none"
                            autoCorrect={false}
                            labelFontSize={13}
                            value={this.state.username}
                            onChangeText={val => {
                                this.onChangeText('username', val.trim())
                                this.setState({
                                    errorEmailMessage: '',
                                    errorEmail: false
                                })
                            }}

                        />
                        {this.state.errorEmail &&
                            <View style={styles.errorView}>
                                <Text style={styles.errorViewText}>
                                    {this.state.errorEmailMessage}
                                </Text>
                            </View>
                        }
                        <View>
                            <TextField
                                label='Enter Password'
                                keyboardType='default'
                                fontSize={13}
                                tintColor={Apptheme}
                                baseColor={Apptheme}
                                errorColor="red"
                                activeLineWidth={2}
                                autoCapitalize="none"
                                autoCorrect={false}
                                labelFontSize={13}
                                secureTextEntry={this.state.secureTextEntry}
                                value={this.state.password}
                                onChangeText={val => {
                                    this.onChangeText('password', val.trim())
                                    this.setState({
                                        errorPasswordMessage: '',
                                        errorPassword: false
                                    })
                                }}
                            />
                            {this.state.errorPassword &&
                                <View style={styles.errorView}>
                                    <Text style={styles.errorViewText}>
                                        {this.state.errorPasswordMessage}
                                    </Text>
                                </View>
                            }
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
                        <TouchableOpacity onPress={() => this.Login.bind(this)} style={styles.ForgetPasswordView}>
                            <Text style={styles.ForgetPasswordText}>
                                Forgot Password?
                        </Text>
                        </TouchableOpacity>

                        <View style={styles.LoginButtonView}>
                            <TouchableOpacity style={styles.GradientButtonView} onPress={() => { this.Login() }} >
                                <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                    <Text style={styles.ButtonInnerText}>
                                        LOGIN
                                </Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")} style={styles.GradientButtonView} >
                                <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                    <Text style={styles.ButtonInnerText}>
                                        REGISTER
                                </Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <Text style={styles.TextView}>
                                You can use the App without an account,but you
                                need to register to message users or list a car.
                        </Text>

                            <TouchableOpacity style={styles.GradientButtonView} onPress={() => { this.props.navigation.navigate("Home") }}>
                                <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                    <Text style={styles.ButtonInnerText}>
                                        USE WITHOUT ACCOUNT
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
        ...CommponStyle.LogoView
        // width: '100%',
        // height: 120,
        // marginTop: 20,
        // justifyContent: 'center',
        // alignItems: 'center'
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
    LoginFail: {
        color: "red",
        fontSize: 12,
        padding: 5,
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
    menuLoaderView: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: '100%',
        backgroundColor: 'rgba(255,255,255, 0.7)',
        // backgroundColor: 'red',
        zIndex: 10000,
        alignItems: 'center',
        justifyContent: 'center',
        top: 0
    },
    errorViewText: {
        ...CommponStyle.errorViewText
    },
    errorView: {
        ...CommponStyle.errorView
    }
});