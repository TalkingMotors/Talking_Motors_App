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
    TouchableOpacity
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Topbar from '../components/Topbar';
import CommponStyle, { Apptheme, lightText, lightBg, darkText, LinearColor, linkText } from '../helpers/CommponStyle';
import { TextField } from 'react-native-material-textfield';
import { FluidNavigator, Transition } from '../../lib';
import * as Utilities from "../helpers/Utilities";
import * as UserService from '../services/User';
import Constants from "../helpers/Constants";
import Storage from '../helpers/Storage';
import * as VehicleService from '../services/Vehicle';
export default class EditVehicleImage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            image: '',
            ModalOpen: false,
            vehicleId: 0,
            isLoader:false

        }
    }
    componentWillMount() {
        let params = this.props.navigation.state.params.item
        let vehicleData = this.props.navigation.state.params.data
        // let params = undefined
        if (!Utilities.stringIsEmpty(params)) {
            this.setState({
                image: params,
                vehicleId: vehicleData.id
            })
        }
    }

    ToggleModal() {
        this.setState({
            ModalOpen: !this.state.ModalOpen
        })
    }
    openCamera = () => {
        try {
            ImagePicker.openCamera({
                width: 200,
                height: 200,
                cropping: true,
                includeBase64: true,
                useFrontCamera: true
            }).then(imageDetail => {
                if (Object.keys(imageDetail).length > 0) {
                    var base64Image = `${imageDetail.data}`
                    this.InsertVehicleImage(base64Image)
                }

            });
        }
        catch (e) {
            console.log("openCamera Exception EditVehicleImage", e)
        }
    }
    openGallery = () => {
        try {
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
                        this.InsertVehicleImage(base64Image)
                    }

                });
            }
            )
        } catch (e) {
            console.log("openGallery EditVehicleImage", e)
        }
    }

    deletePhoto = async () => {
        try{
        var response = await VehicleService.RemoveVehicleImage()
        this.ToggleModal();
        this.setState({
            image: ''
        })
    }
    catch(e){
        console.log("deletePhoto EditVehicleImage", e)
    }
    }

    InsertVehicleImage = async (image) => {
        try{
        var params = {
            vehicleId: this.state.vehicleId,
            image: image,
            position: 0
        }
        this.setState({
            isLoader:true
        })
        var response = await VehicleService.InsertVehicleImage(params)
        if (response.success) {
            this.setState({
                image: response.vehicleImage,
                isLoader:false
            })
        }
        }
        catch(e){
            this.setState({
                isLoader:false
            })
            console.log("InsertVehicleImage EditVehicleImage", e)
        }

    }
    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar ParentPage="Edit Vehicle Image" navigation={this.props} />

                {this.state.isloader &&
                    <View style={styles.menuLoaderView}>
                        <ActivityIndicator
                            color="#ed0000"
                            size="large"
                        />
                    </View>
                }
                <ScrollView keyboardShouldPersistTaps="always">
                    <View style={{ width: '100%', height: 270, justifyContent: 'center', alignItems: 'center', borderBottomColor: "#d2d2d2", borderBottomWidth: 1 }}>
                        {!Utilities.stringIsEmpty(this.state.image) ?
                            <Transition >
                                <Image
                                    resizeMode='cover'
                                    style={{ width: '100%', height: '100%' }}
                                    source={{ uri: this.state.image.url }}
                                />
                            </Transition>
                            :
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', backgroundColor: lightBg }}>
                                <FontAwesome name="car" size={150} color={Apptheme} />
                            </View>
                        }

                    </View>

                    <View style={styles.TextFieldView}>


                        <View style={styles.LoginButtonView}>
                            <TouchableOpacity style={styles.GradientButtonView} onPress={() => { this.ToggleModal() }} >
                                <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                    <Text style={styles.ButtonInnerText}>
                                        CHANGE PHOTO
                                </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.LoginButtonView}>
                            <TouchableOpacity style={styles.GradientButtonView} onPress={() => { }} >
                                <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                    <Text style={styles.ButtonInnerText}>
                                        SAVE PHOTO
                                </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                {this.state.ModalOpen &&
                    <View style={{ position: 'absolute', top: '70%', height: 140, width: '100%' }}>
                        <SafeAreaView style={{ top: '20%', borderRadius: 10, height: '100%', width: '96%', marginHorizontal: '2%', backgroundColor: "#d2d2d2" }}>
                            <View style={{ marginHorizontal: '5%', marginTop: 4, flexDirection: 'row', width: '90%', justifyContent: 'center', alignItems: 'center', height: '60%' }}>
                                <View style={{ width: '30%', paddingRight: 40, justifyContent: 'center', alignItems: 'flex-end', height: '100%' }}>
                                    <TouchableOpacity
                                        onPress={() => this.openCamera()}
                                        style={{ justifyContent: 'center', alignItems: 'center' }}>

                                        <FontAwesome name="camera" color={Apptheme} style={{ fontSize: 40, }} />
                                        <Text style={{ fontSize: 12 }}>
                                            Camera
                                             </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '30%', paddingLeft: 40, justifyContent: 'center', alignItems: 'flex-start', height: '100%' }}>
                                    <TouchableOpacity
                                        onPress={() => this.openGallery()}
                                        style={{ justifyContent: 'center', alignItems: 'center' }}>

                                        <FontAwesome name="photo" color={Apptheme} style={{ fontSize: 40, }} />
                                        <Text style={{ fontSize: 12 }}>
                                            Gallery
                                             </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '30%', paddingLeft: 40, justifyContent: 'center', alignItems: 'flex-start', height: '100%' }}>
                                    <TouchableOpacity
                                        onPress={() => this.deletePhoto()}
                                        style={{ justifyContent: 'center', alignItems: 'center' }}>

                                        <AntDesign name="delete" color={Apptheme} style={{ fontSize: 40, }} />
                                        <Text style={{ fontSize: 12 }}>
                                            Remove
                                             </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: '50%', height: 40, }} activeOpacity={1} onPress={() => this.ToggleModal()} >
                                    <View style={styles.headerModalView}>
                                        <Text style={{ fontSize: 18, color: '#333' }}>
                                            CANCEL
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </View>
                }
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