import React, { Component } from 'react';
import {
    StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, Dimensions,
    SafeAreaView,
    Keyboard,
    KeyboardAvoidingView,
    Modal, ImageBackground
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import CommponStyle, { Apptheme, lightText, lightBg, darkText, LinearColor, linkText } from '../helpers/CommponStyle';
import { TextField } from 'react-native-material-textfield';
import LinearGradient from 'react-native-linear-gradient';
export default class SearchVehicle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SearchVehicleModal: true,
            isKeyboard: false,
        }

        this._keyboardDidShow = this._keyboardDidShow.bind(this);
        this._keyboardDidHide = this._keyboardDidHide.bind(this);

    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
    }
    SearchVehicleModalToggle = () => {
        this.setState({
            SearchVehicleModal: !this.state.SearchVehicleModal
        })
        this.props.SearchVehicleModalToggle();
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


    render() {


        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.SearchVehicleModal}
                onRequestClose={() => {
                    console.warn("Modal has been closed.");
                    this.SearchVehicleModalToggle()
                }}

            >
                <TouchableOpacity onPress={() => this.SearchVehicleModalToggle()} style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', height: '100%', position: 'absolute', width: '100%' }}>
                </TouchableOpacity>
                <SafeAreaView style={{ elevation: 10, backgroundColor: '#fff', borderRadius: 10, top: '30%', height: (this.state.isKeyboard) ? '60%' : '35%', width: '86%', marginHorizontal: '7%', }}>
                    <ScrollView keyboardShouldPersistTaps='handled'>
                        <View style={{ width: '100%', height: '100%' }}>
                            <View style={{ margin: 5, marginVertical: 5, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.headerModalText, { paddingTop: 0 }]}>
                                    Search for a vehicle
                            </Text>
                            </View>
                            <Text style={{ paddingHorizontal: 15, }}>
                                How would you like to search for a vehicle yo buy?
                        </Text>
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                                <TouchableOpacity onPress={() => {this.SearchVehicleModalToggle()
                                this.props.TalkModalToggle();
                                }} style={styles.modalFooterButton}>
                                    <Text style={{ color: Apptheme }} >ENTER REG NUMBER</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.props.navigateToVehicleType()} style={styles.modalFooterButton}>
                                    <Text style={{ color: Apptheme }} >SEARCH BY FIELD</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.SearchVehicleModalToggle()} style={styles.modalFooterButton}>
                                    <Text style={{ color: Apptheme }} >CANCEL</Text>
                                </TouchableOpacity>
                            </View>
                        </View >
                    </ScrollView>
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