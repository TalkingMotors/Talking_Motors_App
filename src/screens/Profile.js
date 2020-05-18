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
import ImagePicker from 'react-native-image-crop-picker';

import Constants from "../helpers/Constants";
import * as Utilities from "../helpers/Utilities";
import * as UserService from '../services/User';
import Storage from '../helpers/Storage';
import Labels from "../languages/Labels";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: Storage.userData,
            displayName: Storage.userData.name,
            email: Storage.userData.email,
            nickName: Storage.userData.nickname,
            telephone: Storage.userData.telephone,
            photoUrl: Storage.userData.thumbUrl,
            disableButton: false
            
        }

        
    }
    componentDidMount = () => {
        if (Object.keys(Storage.userData).length == 0) {
            this.props.navigation.goBack()
        }
    }
    onChangeText = (key, value) => {
        if(key.length == 0) {

        }
        this.setState({ [key]: value, loginFail:false })
    }

    openCamera = () => {
        ImagePicker.openCamera({
            width: 200,
            height: 200,
            cropping: true,
            includeBase64: true,
            useFrontCamera: true
        }).then(imageDetail => {
            if (Object.keys(imageDetail).length > 0) {
                var base64Image = `${imageDetail.data}`
                this.changeProfileImage(base64Image);
            }

        });
    } 
    openGallery = () => {
        ImagePicker.clean();
        this.setState({
            ModalOpen: !this.state.ModalOpen
        }, ()=>{
            ImagePicker.openPicker({
                width: 200,
                height: 200,
                cropping: true,
                includeBase64: true,
            }).then(imageDetail => {
                if (Object.keys(imageDetail).length > 0) {
                    var base64Image = `data:${imageDetail.mime};base64,${imageDetail.data}`
                    //this.changeProfileImage(base64Image, imageName, this.state.userDetail.AuthenticationToken);
                }
    
            });
        }
        ) 
    }
    updateUser = () => {
        try {
            userObject = {
                email: this.state.email,
                name: this.state.displayName,
                nickname: this.state.nickName,
                telephone: this.state.telephone,
                notificationsEnabled: Storage.userData.notificationsEnabled,
                locationServicesEnabled: Storage.userData.locationServicesEnabled
              }
            UserService.updateUser(userObject).then(response => {
                if(response){
                    if(response.success){
                     Storage.userData = response.user;
                     Utilities.asyncStorage_SaveKey(Constants.USER_DATA, JSON.stringify(response.user))
                    }
                }
            });
        }
        catch (e) {
            Utilities.logAppException("Profile", "changeProfileImage", "User", "Exception", e.message)
        }
    }
    changeProfileImage = async (base64Image) => {
        try {

            UserService.changeProfilePhoto(base64Image).then(response => {
                if(response){
                    if(response.success){
                     Storage.userData = response.user;
                     Utilities.asyncStorage_SaveKey(Constants.USER_DATA, JSON.stringify(response.user))
                     this.setState({
                        photoUrl: Storage.userData.thumbUrl
                     })
                    }
                }
            });
        }
        catch (e) {
            
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
                                source={{ uri: this.state.photoUrl }}
                            />
                            <View style={{ width: 40, justifyContent: 'center', backgroundColor: Apptheme, alignItems: 'center', height: 40, borderColor: lightBg, borderWidth: 1, borderRadius: 20, position: 'absolute', bottom: 1, right: 0 }}>
                                 <TouchableOpacity
                                            onPress={() => this.openCamera()}
                                            style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <FontAwesome name="camera" size={15} color={lightBg} />     
                                        </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>{ this.state.displayName }</Text>

                    <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate("ChangePassword")}
                        style={styles.ChangePasswordView}>
                        <FontAwesome name="edit" style={{ paddingHorizontal: 5 }} color={linkText} size={16} />
                        <Text style={styles.ChangePasswordText}>
                           {Labels.Profile.changePassword} 
                        </Text>
                    </TouchableOpacity>

                    <View style={{ borderBottomWidth: 2, borderBottomColor: Apptheme, width: '96%', marginHorizontal: '2%', }}></View>

                    <View style={styles.TextFieldView}>
                        <TextField
                            label= {Labels.Profile.email}
                            fontSize={13}
                            keyboardType='default'
                            tintColor={Apptheme}
                            baseColor={Apptheme}
                            errorColor="red"
                            activeLineWidth={2}
                            autoCapitalize="none"
                            autoCorrect={false}
                            labelFontSize={13}
                            value={this.state.email}
                            onChangeText={val => { this.onChangeText('email', val) }}
                        />
                        <TextField
                            label= {Labels.Profile.userName}
                            fontSize={13}
                            keyboardType='default'
                            tintColor={Apptheme}
                            baseColor={Apptheme}
                            errorColor="red"
                            activeLineWidth={2}
                            autoCapitalize="none"
                            autoCorrect={false}
                            labelFontSize={13}
                            value={this.state.nickName}
                            onChangeText={val => { this.onChangeText('nickName', val)}}
                            
                        />
                        <TextField
                            label= {Labels.Profile.displayName}
                            fontSize={13}
                            keyboardType='default'
                            tintColor={Apptheme}
                            baseColor={Apptheme}
                            errorColor="red"
                            activeLineWidth={2}
                            autoCapitalize="none"
                            autoCorrect={false}
                            labelFontSize={13}
                            value={this.state.displayName}
                            onChangeText={val => { this.onChangeText('displayName', val)}}
                        />

                        <TextField
                            label= {Labels.Profile.telephone}
                            fontSize={13}
                            keyboardType='phone-pad'
                            tintColor={Apptheme}
                            baseColor={Apptheme}
                            errorColor="red"
                            activeLineWidth={2}
                            autoCapitalize="none"
                            autoCorrect={false}
                            labelFontSize={13}
                            value={this.state.telephone}
                            onChangeText={val => { this.onChangeText('telephone', val)}}
                        />

                    </View>

                    <View style={styles.LoginButtonView}>
                        <TouchableOpacity style={styles.GradientButtonView} disabled = {this.state.disableButton} onPress= {()=> {this.updateUser()}} >
                            <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                <Text style={styles.ButtonInnerText}>
                                {Labels.Profile.save}
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