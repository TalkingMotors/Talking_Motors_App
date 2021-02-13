import React, { Component } from 'react';
import {
    StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, Dimensions,
    SafeAreaView,
    Keyboard,
    KeyboardAvoidingView,
    Alert,
    Modal, ImageBackground
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import CommponStyle, { Apptheme, lightText, lightBg, darkText, LinearColor, linkText } from '../helpers/CommponStyle';
import { TextField } from 'react-native-material-textfield';
import LinearGradient from 'react-native-linear-gradient';
import * as Utilities from "../helpers/Utilities";
import * as VehicleService from '../services/Vehicle';
import Storage from '../helpers/Storage';
export default class Talk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TalkModal: true,
            isKeyboard: false,
            registerNo: '',
            parent:''
        }
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            this.state.parent = this.props.parent;
            this.setState({
                parent:this.state.parent
            })
        })
        this._keyboardDidShow = this._keyboardDidShow.bind(this);
        this._keyboardDidHide = this._keyboardDidHide.bind(this);

    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
    }
    TalkModalToggle = () => {
        this.setState({
            TalkModal: !this.state.TalkModal
        })
        this.props.TalkModalToggle();
    }
    _keyboardDidShow() {

        this.setState({
            isKeyboard: true
        })
    }

    _keyboardDidHide() {
        this.setState({
            isKeyboard: false
        })
    }
    onChangeText = (key, value) => {
        this.setState({ [key]: value, })
    }
    searchVehicleBy = async () => {
       var { registerNo } = this.state
        if(!Utilities.stringIsEmpty(this.props.parent) && this.props.parent == "vehicle_Check"){
            var res = await VehicleService.getVehicleData(registerNo);
           if(res.success && res.vehicleData.bodyType != null){
                        this.props.navigation.navigate("DvlaDetails",{params:res.vehicleData})
                        this.TalkModalToggle();
                    }
                   
                    else{
                        Alert.alert(
                            "Vehicle not found",
                            "this vehicle has not been found in the DVLA database.",
                            [
                                {
                                    text: "CLOSE",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                },

                            ],
                            { cancelable: false }
                        );
                        return
                    }

                }
               
               
        else {
            var response;
            if (!Utilities.stringIsEmpty(registerNo)) {
                if (Object.keys(Storage.userData).length > 0) {

                    response = await VehicleService.getVehicleBy(registerNo)
                    if (!Utilities.stringIsEmpty(response.vehicle) && response.vehicle.registrationNumber.toLowerCase() == registerNo.toLowerCase()) {
                        this.TalkModalToggle();
                        this.props.navigation.navigate('Detail', { item: response.vehicle, index: 1, parent: this.props.parent });
                    }
                    else {
                        var res = await VehicleService.getVehicleData(registerNo)
                       if (res.success && res.vehicleData.bodyType != null) {
                            this.props.navigation.navigate("DvlaDetails", { params: res.vehicleData })
                            this.TalkModalToggle();
                        }

                        else {
                            Alert.alert(
                                "Vehicle not found",
                                "this vehicle has not been found in the DVLA database.",
                                [
                                    {
                                        text: "CLOSE",
                                        onPress: () => console.log("Cancel Pressed"),
                                        style: "cancel"
                                    },

                                ],
                                { cancelable: false }
                            );
                            // this.TalkModalToggle();
                        }


                    }
                }
                else {
                    response = await VehicleService.searchRegisterNo(registerNo)
                    if (!Utilities.stringIsEmpty(response.vehicle) && response.success) {
                        this.TalkModalToggle();
                        this.props.navigation.navigate('Detail', { item: response.vehicle, index: 1, parent: this.props.parent });
                    }
                    else {
                        var res = await VehicleService.getVehicleData(registerNo)
                        if(res.success && res.vehicleData.bodyType != null){
                            this.props.navigation.navigate("DvlaDetails", { params: res.vehicleData })
                            this.TalkModalToggle();
                        }

                        else {
                            // this.TalkModalToggle();
                            Alert.alert(
                                "Vehicle not found",
                                "this vehicle has not been found in the DVLA database.",
                                [
                                    {
                                        text: "CLOSE",
                                        onPress: () => console.log("Cancel Pressed"),
                                        style: "cancel"
                                    },

                                ],
                                { cancelable: false }
                            );
                        }

                    }

                }
            }
        }
    }
    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.TalkModal}
                onRequestClose={() => {
                    console.warn("Modal has been closed.");
                    this.TalkModalToggle()
                }}

            >
                <TouchableOpacity onPress={() => this.TalkModalToggle()} style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', height: '100%', position: 'absolute', width: '100%' }}>
                </TouchableOpacity>
                <SafeAreaView style={{ elevation: 10, backgroundColor: '#fff', borderRadius: 10, top: '30%', height: (this.state.isKeyboard) ? '60%' : '35%', width: '86%', marginHorizontal: '7%', }}>
                    <ScrollView keyboardShouldPersistTaps='handled'>
                        <View style={{ width: '100%', height: '100%' }}>
                            <View style={{ margin: 5, marginVertical: 5, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.headerModalText, { paddingTop: 0 }]}>
                                    Vehicle search
                            </Text>
                            </View>
                            <Text style={{ paddingHorizontal: 15, }}>
                                Just enter the registration number of the car you are interested in, and click 'Search' below
                        </Text>

                            <View style={styles.TextFieldView}>
                                <TextField
                                    label='Registration number'
                                    fontSize={15}
                                    keyboardType='default'
                                    tintColor={Apptheme}
                                    baseColor={Apptheme}
                                    errorColor="red"
                                    activeLineWidth={2}
                                    autoCapitalize='characters'
                                    style={{fontWeight:'bold'}}
                                    labelFontSize={15}
                                    value={this.state.registerNo}
                                    onChangeText={val => {
                                        this.onChangeText('registerNo', val.trim())
                                    }}
                                />
                            </View>

                        </View >

                    </ScrollView>

                    <View style={{ justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row', width: '100%', height: 45, position: 'absolute', bottom: 10 }}>
                        <TouchableOpacity onPress={() => this.TalkModalToggle()} style={styles.modalFooterButton}>
                            <Text style={{ color: Apptheme }} >CANCEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.searchVehicleBy()} style={styles.modalFooterButton}>
                            <Text style={{ color: Apptheme }}  >SEARCH</Text>
                        </TouchableOpacity>

                    </View>
                </SafeAreaView>
            </Modal >

        )
    }
}

const styles = StyleSheet.create({
    headerModalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
        color: '#000000'
    },
    TextFieldView: {
        width: '92%',
        marginHorizontal: '4%'
    },
    modalFooterButton: {
        padding: 10,
        marginHorizontal: 5
    },

})