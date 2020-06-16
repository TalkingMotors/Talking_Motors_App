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
    Keyboard,
    ActivityIndicator,
    Image
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Topbar from '../components/Topbar';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CommponStyle, { Apptheme, linkText, lightText, darkText, LinearColor, lightBg, darkBg } from '../helpers/CommponStyle';
import { TextField } from 'react-native-material-textfield';
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
            disableButton: false,
            isloader: false,
            errorMessage: "This is a required field.",
            errordisplayName: false,
            errornickName: false,
            errorEmaill: false,
            ModalOpen: false


        }
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            this.stateUpdate()

        })


        console.log("Storage.userData", Storage.userData);
    }

    stateUpdate = () => {
        this.setState({
            userData: Storage.userData,
            displayName: Storage.userData.name,
            email: Storage.userData.email,
            nickName: Storage.userData.nickname,
            telephone: Storage.userData.telephone,
            photoUrl: Storage.userData.thumbUrl,
        })
    }

    ToggleModal() {
        this.setState({
            ModalOpen: !this.state.ModalOpen
        })
    }
    componentDidMount = () => {
        if (Object.keys(Storage.userData).length == 0) {
            this.props.navigation.goBack()
        }
    }
    onChangeText = (key, value) => {
        if (key.length == 0) {

        }
        this.setState({ [key]: value, loginFail: false, errorMessage: "This is a required field." })
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
        }, () => {
            ImagePicker.openPicker({
                width: 200,
                height: 200,
                cropping: true,
                includeBase64: true,
            }).then(imageDetail => {
                if (Object.keys(imageDetail).length > 0) {
                    var base64Image = `${imageDetail.data}`
                    this.changeProfileImage(base64Image)
                }

            });
        }
        )
    }
    updateUser = () => {
        try {

            Keyboard.dismiss()
            console.log("this.state", this.state);
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

            if (Utilities.stringIsEmpty(this.state.displayName)) {
                this.setState({
                    errordisplayName: true
                })
                return
            }
            var userObject = {
                email: this.state.email,
                name: this.state.displayName,
                nickname: this.state.nickName,
                telephone: this.state.telephone,
                notificationsEnabled: Storage.userData.notificationsEnabled,
                locationServicesEnabled: Storage.userData.locationServicesEnabled
            }
            this.setState({
                isloader: true
            })
            UserService.updateUser(userObject).then(response => {
                if (response) {
                    if (response.success) {
                        console.log("response", response);
                        Storage.userData = response.user;
                        Utilities.asyncStorage_SaveKey(Constants.USER_DATA, JSON.stringify(response.user))

                        this.setState({
                            userData: Storage.userData,
                            displayName: Storage.userData.name,
                            email: Storage.userData.email,
                            nickName: Storage.userData.nickname,
                            telephone: Storage.userData.telephone,
                            photoUrl: Storage.userData.thumbUrl,
                            isloader: false
                        })

                    }
                }
                else {
                    this.setState({
                        isloader: false
                    })
                }
            });
        }
        catch (e) {
            console.log("Profile", "changeProfileImage", "User", "Exception", e.message)
            this.setState({
                isloader: false
            })
        }
    }
    changeProfileImage = async (base64Image) => {
        try {
            this.setState({
                isloader: true
            })

            UserService.changeProfilePhoto(base64Image).then(response => {
                if (response) {
                    if (response.success) {
                        Storage.userData = response.user;
                        Utilities.asyncStorage_SaveKey(Constants.USER_DATA, JSON.stringify(response.user))
                        this.setState({
                            photoUrl: Storage.userData.thumbUrl,
                            isloader: false
                        })
                    }
                    else {
                        this.setState({
                            isloader: true
                        })
                    }
                }
            });
        }
        catch (e) {
            this.setState({
                isloader: true
            })
        }
    }

    deletePhoto = async () => {

        try {
            this.ToggleModal()
            this.setState({
                isloader: true
            })

            UserService.removeProfileImage().then(response => {
                if (response) {
                     if (response.success) {
                        Storage.userData = response.user;
                        Utilities.asyncStorage_SaveKey(Constants.USER_DATA, JSON.stringify(response.user))
                        this.setState({
                            photoUrl: "",
                            isloader: false
                        })
                    }
                    else {
                        this.setState({
                            isloader: true
                        })
                    }
                }
            });
        }
        catch (e) {
            this.setState({
                isloader: true
            })
        }
    }

    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar ParentPage="Edit your profile" navigation={this.props} />
                {this.state.isloader &&
                    <View style={styles.menuLoaderView}>
                        <ActivityIndicator
                            color="#ed0000"
                            size="large"
                        />
                    </View>
                }
                <ScrollView>
                    <View style={styles.ProfileImage}>
                        <View style={{ borderWidth: 2, justifyContent: 'center', alignItems: 'center', width: 110, height: 110, borderRadius: 55, borderColor: Apptheme }}>
                            <Image
                                style={{ borderRadius: 55, width: '100%', height: '100%' }}
                                source={{ uri: this.state.photoUrl }}
                            />
                            <View style={{ width: 40, justifyContent: 'center', backgroundColor: Apptheme, alignItems: 'center', height: 40, borderColor: lightBg, borderWidth: 1, borderRadius: 20, position: 'absolute', bottom: 1, right: 0 }}>
                                <TouchableOpacity
                                    // onPress={() => this.openCamera()}
                                    onPress={() => this.ToggleModal()}
                                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesome name="camera" size={15} color={lightBg} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>{this.state.displayName}</Text>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("ChangePassword")}
                        style={styles.ChangePasswordView}>
                        <FontAwesome name="edit" style={{ paddingHorizontal: 5 }} color={linkText} size={16} />
                        <Text style={styles.ChangePasswordText}>
                            {Labels.Profile.changePassword}
                        </Text>
                    </TouchableOpacity>

                    <View style={{ borderBottomWidth: 2, borderBottomColor: Apptheme, width: '96%', marginHorizontal: '2%', }}></View>

                    <View style={styles.TextFieldView}>
                        <TextField
                            label={Labels.Profile.email}
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
                            onChangeText={val => {
                                this.setState({
                                    errorEmaill: false
                                })
                                this.onChangeText('email', val)
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
                            label={Labels.Profile.userName}
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
                            onChangeText={val => {
                                this.setState({
                                    errornickName: false
                                })
                                this.onChangeText('nickName', val)
                            }}

                        />
                        {this.state.errornickName &&
                            <View style={styles.errorView}>
                                <Text style={styles.errorViewText}>
                                    {this.state.errorMessage}
                                </Text>
                            </View>
                        }
                        <TextField
                            label={Labels.Profile.displayName}
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
                            onChangeText={val => {
                                this.setState({
                                    errordisplayName: false
                                })
                                this.onChangeText('displayName', val)
                            }}
                        />
                        {this.state.errordisplayName &&
                            <View style={styles.errorView}>
                                <Text style={styles.errorViewText}>
                                    {this.state.errorMessage}
                                </Text>
                            </View>
                        }

                        <TextField
                            label={Labels.Profile.telephone}
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
                            onChangeText={val => { this.onChangeText('telephone', val) }}
                        />

                    </View>

                    <View style={styles.LoginButtonView}>
                        <TouchableOpacity style={styles.GradientButtonView} disabled={this.state.disableButton} onPress={() => { this.updateUser() }} >
                            <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                <Text style={styles.ButtonInnerText}>
                                    {Labels.Profile.save}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    {this.state.ModalOpen &&
                        <View style={{ position: 'absolute', top: (this.state.selectedpositionUrl == "") ? '30%' : '20%', height: (this.state.selectedpositionUrl == "") ? 260 : 320, width: '80%', marginHorizontal: '10%' }}>
                            <SafeAreaView style={{ borderColor: Apptheme, borderWidth: 2, borderRadius: 10, height: '100%', width: '96%', marginHorizontal: '2%', backgroundColor: "#fff" }}>
                                <View style={{ margin: 10, }}>
                                    <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>
                                        Edit profile image
                                </Text>
                                </View>

                                <View style={styles.ModalMainRow}>
                                    <View style={styles.ModalSubRow}>
                                        <TouchableOpacity
                                            onPress={() => this.openCamera()}
                                            style={styles.ModalButton}>

                                            <FontAwesome name="camera" color={Apptheme} style={{ fontSize: 30, }} />
                                            <Text style={styles.ModalText}>
                                                TAKE A PHOTO
                                             </Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.ModalSubRow}>
                                        <TouchableOpacity
                                            onPress={() => this.openGallery()}
                                            style={styles.ModalButton}>
                                            <FontAwesome name="photo" color={Apptheme} style={{ fontSize: 30, }} />
                                            <Text style={styles.ModalText}>
                                                GALLERY
                                             </Text>
                                        </TouchableOpacity>
                                    </View>
                                    {this.state.selectedpositionUrl != "" &&
                                        <View style={styles.ModalSubRow}>
                                            <TouchableOpacity
                                                onPress={() => this.deletePhoto()}
                                                style={styles.ModalButton}>
                                                <AntDesign name="delete" color={Apptheme} style={{ fontSize: 30, }} />
                                                <Text style={styles.ModalText}>
                                                    DELETE THIS PHOTO
                                             </Text>
                                            </TouchableOpacity>
                                        </View>
                                    }


                                </View>
                                {/* <View style={{ justifyContent: 'center', alignItems: 'center',marginTop:10 }}> */}
                                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: 40, }} activeOpacity={1} onPress={() => this.ToggleModal()} >
                                    <View style={styles.headerModalView}>
                                        <Text style={{ fontSize: 20, color: '#333' }}>
                                            CANCEL
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                {/* </View> */}
                            </SafeAreaView>
                        </View>
                    }

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
    ModalMainRow: {
        marginHorizontal: '5%',
        marginTop: 4,
        flexDirection: 'column',
        width: '90%',
        // height: '60%'
    },
    ModalSubRow: {
        width: '100%',
        marginVertical: 20
    },
    ModalButton: {
        paddingLeft: 20,
        flexDirection: 'row'
    },
    ModalText: {
        fontSize: 18
        , color: Apptheme,
        paddingLeft: 20
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