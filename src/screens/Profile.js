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
export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uname: "Maaz Mehtab",
            dname: "Maaz-Mehtab",
            phone: "03243424011",
            email: 'Maazmehtabuddin95@gmail.com'
        }
    }
    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar ParentPage="Profile" navigation={this.props} />
                <ScrollView>
                    <View style={styles.ProfileImage}>
                        <View style={{ borderWidth: 2, justifyContent: 'center', alignItems: 'center', width: 110, height: 110, borderRadius: 55, borderColor: Apptheme }}>
                            <Image
                                style={{ borderRadius: 55, width: '100%', height: '100%' }}
                                source={require("../images/userImage.jpg")}
                            />
                            <View style={{ width: 40, justifyContent: 'center', backgroundColor: Apptheme, alignItems: 'center', height: 40, borderColor: lightBg, borderWidth: 1, borderRadius: 20, position: 'absolute', bottom: 1, right: 0 }}>
                                <FontAwesome name="camera" size={15} color={lightBg} />
                            </View>
                        </View>
                    </View>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Maaz Mehtab</Text>

                    <TouchableOpacity
                        style={styles.ChangePasswordView}>
                        <FontAwesome name="edit" style={{ paddingHorizontal: 5 }} color={linkText} size={16} />
                        <Text style={styles.ChangePasswordText}>
                            Change Password
                        </Text>
                    </TouchableOpacity>

                    <View style={{ borderBottomWidth: 2, borderBottomColor: Apptheme, width: '96%', marginHorizontal: '2%', }}></View>

                    <View style={styles.TextFieldView}>
                        <TextField
                            label='Email'
                            fontSize={13}
                            keyboardType='default'
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
                        <TextField
                            label='User Name'
                            fontSize={13}
                            keyboardType='default'
                            tintColor={Apptheme}
                            baseColor={Apptheme}
                            errorColor="red"
                            activeLineWidth={2}
                            autoCapitalize="none"
                            autoCorrect={false}
                            labelFontSize={13}
                            value={this.state.uname}
                        />
                        <TextField
                            label='Display Name'
                            fontSize={13}
                            keyboardType='default'
                            tintColor={Apptheme}
                            baseColor={Apptheme}
                            errorColor="red"
                            activeLineWidth={2}
                            autoCapitalize="none"
                            autoCorrect={false}
                            labelFontSize={13}
                            value={this.state.dname}
                        />

                        <TextField
                            label='Telephone Number'
                            fontSize={13}
                            keyboardType='phone-pad'
                            tintColor={Apptheme}
                            baseColor={Apptheme}
                            errorColor="red"
                            activeLineWidth={2}
                            autoCapitalize="none"
                            autoCorrect={false}
                            labelFontSize={13}
                            value={this.state.phone}
                        />

                    </View>

                    <View style={styles.LoginButtonView}>
                        <TouchableOpacity style={styles.GradientButtonView} >
                            <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                <Text style={styles.ButtonInnerText}>
                                    SAVE
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
    ProfileImage: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginVertical: 20
        // height: 200,
        // backgroundColor: 'red'
    },
    TextFieldView: {
        width: '92%',
        marginHorizontal: '4%'
    },
    LoginButtonView: {
        marginTop: 0,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal:'5%',
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
        paddingBottom:2
    },
})