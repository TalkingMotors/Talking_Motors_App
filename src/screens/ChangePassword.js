import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Topbar from '../components/Topbar';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CommponStyle, { Apptheme, linkText, lightText, darkText, LinearColor, lightBg, darkBg } from '../helpers/CommponStyle';
import { TextField } from 'react-native-material-textfield';
export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'Maazmehtabuddin95@gmail.com'
        }
    }
    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar ParentPage="Change Password" navigation={this.props} />
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

                    <View>
                        <Text style={{ textAlign: 'center', color: darkText, paddingHorizontal: 10 }}>
                            To change your password just enter your email below
                            and we will send a link with a code to reset it.
                        </Text>

                        <Text style={{ paddingTop: 15, textAlign: 'center', color: darkText, paddingHorizontal: 10 }}>
                            In the next step, you will have a limited time in which
                            to enterthe code and a newpassword to reset it.
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
                            editable={false}
                            value={this.state.email}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={this.props.navigation.navigate("ResetPassword")}
                        style={styles.ChangePasswordView}>
                        {/* <FontAwesome name="edit" style={{ paddingHorizontal: 5 }} color={linkText} size={16} /> */}
                        <Text style={styles.ChangePasswordText}>
                            Got reset password code?
                        </Text>
                    </TouchableOpacity>


                    <View style={styles.LoginButtonView}>
                        <TouchableOpacity style={styles.GradientButtonView} >
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
})