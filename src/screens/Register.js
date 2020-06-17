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
    Alert,
    Modal,
    Dimensions,
    Keyboard,
    TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Topbar from '../components/Topbar';
import CommponStyle, { Apptheme, lightText, lightBg, darkText, LinearColor, linkText ,GreenBg} from '../helpers/CommponStyle';
import { TextField } from 'react-native-material-textfield';
import SplashScreen from 'react-native-splash-screen'
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
            secureTextEntry: true,
            errorMessage: "This is a required field.",
            errorName: false,
            errorUserName: false,
            errorPhone: false,
            errorEmaill: false,
            errorPassword: false,
            errorConfirmPassoword: false,
            isLoader: false,
            isModal: false,
        }
        SplashScreen.hide()

    }
    ToggleModal = () => {
        this.setState({
            isModal: !this.state.isModal
        })
    }

    onChangeText = (key, value) => {
        this.setState({ [key]: value, loginFail: false })
    }
    register = () => {
        try {
            Keyboard.dismiss()
            if (Utilities.stringIsEmpty(this.state.name)) {
                this.setState({
                    errorName: true
                })
                return
            }
            if (Utilities.stringIsEmpty(this.state.nickName)) {
                this.setState({
                    errorUserName: true
                })
                return
            }

            if (Utilities.stringIsEmpty(this.state.email)) {
                this.setState({
                    errorEmaill: true
                })
                return
            }
            else if (Utilities.emailRegex.test(this.state.email) == false) {
                this.setState({
                    errorEmaill: true,
                    errorMessage: "Enter a valid email "
                })
                return 
            }
          
            if (Utilities.stringIsEmpty(this.state.telephone)) {
                this.setState({
                    errorPhone: true
                })
                return
            }
            if (Utilities.stringIsEmpty(this.state.password)) {
                this.setState({
                    errorPassword: true
                })
                return
            }
            else if (Utilities.stringIsEmpty(this.state.confirmPassword)) {
                this.setState({
                    errorConfirmPassoword: true
                })
                return
            }
            else if (this.state.password != this.state.confirmPassword) {
                this.setState({
                    passwordMisMatched: true,
                    errorMessage: "Password mismatch."
                })
                return
            }
            let params = { name: this.state.name, nickName: this.state.nickName, telephone: this.state.telephone, email: this.state.email, password: this.state.password, confirmPassword: this.state.confirmPassword, notificationsEnabled: true, locationServicesEnabled: true }
            this.setState({
                isloader: true
            })
            console.log("params",params);
            UserService.register(params).then(response => {
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
                        this.ToggleModal()
                        // this.props.navigation.navigate("Home")
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
            this.setState({
                isloader: false
            })
            console.log("error", e.message)
        }
    }
    render() {
        return (


            <View style={styles.ParentView}>
                <Topbar ParentPage="Registration" navigation={this.props} />

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
                                style={{ height: 80, width: 80 }}
                                source={require('../images/header-logo.png')}
                            />
                        </LinearGradient>
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
                            onChangeText={val => {
                                this.onChangeText('name', val)
                                this.setState({
                                    errorName: false
                                })
                            }}
                        />
                        {this.state.errorName &&
                            <View style={styles.errorView}>
                                <Text style={styles.errorViewText}>
                                    {this.state.errorMessage}
                                </Text>
                            </View>
                        }

                        <TextField
                            label='Enter Username'
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
                            onChangeText={val => {
                                this.onChangeText('nickName', val)
                                this.setState({
                                    errorUserName: false
                                })
                            }}
                        />
                        {this.state.errorUserName &&
                            <View style={styles.errorView}>
                                <Text style={styles.errorViewText}>
                                    {this.state.errorMessage}
                                </Text>
                            </View>
                        }
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
                            onChangeText={val => {
                                this.onChangeText('telephone', val)
                                this.setState({
                                    errorPhone: false
                                })
                            }}
                        />

                        {this.state.errorPhone &&
                            <View style={styles.errorView}>
                                <Text style={styles.errorViewText}>
                                    {this.state.errorMessage}
                                </Text>
                            </View>
                        }


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
                                onChangeText={val => {
                                    this.onChangeText('password', val)
                                    this.setState({
                                        errorPassword: false,
                                        passwordMisMatched: false
                                    })
                                }}
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
                            onChangeText={val => {
                                this.onChangeText('confirmPassword', val)
                                this.setState({
                                    errorConfirmPassoword: false,
                                    passwordMisMatched: false
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

                        <View style={styles.LoginButtonView}>
                            <TouchableOpacity style={styles.GradientButtonView} onPress={() => this.register()} >
                                <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                    <Text style={styles.ButtonInnerText}>
                                        REGISTER
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
                    <SafeAreaView style={{ elevation: 10, backgroundColor: '#fff', borderRadius: 10, top: '30%', height: '40%', width: '86%', marginHorizontal: '7%', }}>
                        <View style={{ width: '100%', height: '100%' }}>
                            <View style={{ margin: 5, marginVertical: 5, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.headerModalText, { color: darkText, paddingTop: 0, fontSize: 20, fontWeight: 'bold' }]}>
                                    Registration complete
                            </Text>
                            </View>
                            <View style={{ height: '78%',  }}>
                                <View style={{ width: '98%', marginHorizontal: '1%', justifyContent: 'center' }}>
                                    <View style={{alignItems:'center'}}>
                                   <FontAwesome name="check-circle" size={76} style={{paddingVertical:15}} color={GreenBg} />
                                   <Text style={{fontSize:16,color:"black"}}>
                                        Welcome to Talking Motors
                                    </Text>
                                    </View>

                                    <View style={{marginTop:20,flexDirection:'row',justifyContent:"flex-end"}}>
                                    <TouchableOpacity
                                    onPress={()=>{
                                        this.ToggleModal()
                                        this.props.navigation.replace("Home")
                                    }} style={{padding:10,marginHorizontal:5}}>
                                        <Text style={{color:Apptheme,}}>
                                            CONTINUE
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{
                                        this.ToggleModal()
                                        this.props.navigation.replace("ListVehicle")
                                    }} style={{padding:10,marginHorizontal:5}}>
                                    <Text style={{color:Apptheme,}}>
                                            ADD A VEHICLE
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
        ...CommponStyle.LogoGradient
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