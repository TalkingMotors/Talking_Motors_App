import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Button,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Topbar from '../components/Topbar';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CommponStyle, { Apptheme, linkText, lightText, darkText, LinearColor, lightBg, darkBg } from '../helpers/CommponStyle';
import { TextField } from 'react-native-material-textfield';
import Storage from '../helpers/Storage';
import * as UserService from '../services/User';
import * as Utilities from "../helpers/Utilities";
export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errorEmail: false,
            errorEmailMessage: '',
            isloader:false,
        }

    }
    componentWillMount() {
        if (Object.keys(Storage.userData).length > 0) {
            this.setState({
                email: Storage.userData.email
            })
        }
    }

    onChangeText = (key, value) => {
        this.setState({ [key]: value, loginFail: false })
    }

    navigateToResetPassword = async () => {
        try {
            if (Utilities.stringIsEmpty(this.state.email)) {
                this.setState({
                    errorEmail: true,
                    errorEmailMessage: "Enter your email."
                })
                return
            }
            if (Utilities.emailRegex.test(this.state.email) == false) {
             this.setState({
                    errorEmail: true,
                    errorEmailMessage: "Enter correct email address."
                })
                return
            }
            let params = { "email": this.state.email }
            let response = await UserService.ForgetPasswordCode(params)
            if (response.success) {
                this.props.navigation.navigate("ResetPassword")
            }
        }
        catch (e) {
            console.log("navigateToResetPassword Exception", e);
        }
    }

    navigateToResetPassword = async () => {
        try {
            if (Utilities.stringIsEmpty(this.state.email)) {
                this.setState({
                    errorEmail: true,
                    errorEmailMessage: "Enter your email."
                })
                return
            }
            if (Utilities.emailRegex.test(this.state.email) == false) {
             this.setState({
                    errorEmail: true,
                    errorEmailMessage: "Enter correct email address."
                })
                return
            }
            this.setState({
                isloader: true
            })
            var params = { "email": this.state.email }
            let response = await UserService.ForgetPasswordCode(params)
             if (response.success) {
                this.setState({
                    isloader:false
                })
                this.props.navigation.navigate("ResetPassword")
            }
            else {
                this.setState({
                    errorEmail: true,
                    isloader: false,
                    errorEmailMessage: response.message
                })
            }
        }
        catch (e) {
            console.log("navigateToResetPassword Exception", e);
            this.setState({
                errorEmail: true,
                isloader: false,
                errorEmailMessage: "Failed to connect to server"
            })
        }
    }

    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar ParentPage="Change Password" navigation={this.props} />
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

                    <View>
                        <Text style={{ textAlign: 'center', color: darkText, paddingHorizontal: 10 }}>
                            To change your password just enter your email below
                            and we will send a link with a code to reset it.
                        </Text>

                        <Text style={{ paddingTop: 15, textAlign: 'center', color: darkText, paddingHorizontal: 10 }}>
                            In the next step, you will have a limited time in which
                            to enter the code and a new password to reset it.
                        </Text>
                    </View>

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
                            onChangeText={val => {
                                this.onChangeText('email', val.trim())
                                this.setState({
                                    errorEmailMessage: '',
                                    errorEmail: false
                                })

                            }}
                            value={this.state.email}
                        />

                    </View>
                    {this.state.errorEmail &&
                        <View style={styles.errorView}>
                            <Text style={styles.errorViewText}>
                                {this.state.errorEmailMessage}
                            </Text>
                        </View>
                    }
                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate("ResetPassword")
                        }
                        style={styles.ChangePasswordView}>
                        {/* <FontAwesome name="edit" style={{ paddingHorizontal: 5 }} color={linkText} size={16} /> */}
                        <Text style={styles.ChangePasswordText}>
                            Got reset password code?
                        </Text>
                    </TouchableOpacity>


                    <View style={styles.LoginButtonView}>
                        <TouchableOpacity onPress={() =>
                            this.navigateToResetPassword()
                        } style={styles.GradientButtonView} >
                            <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                <Text style={styles.ButtonInnerText}>
                                    RESET PASSWORD
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
        ...CommponStyle.errorView
    },
    errorViewText: {
        ...CommponStyle.errorViewText
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