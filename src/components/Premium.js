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
export default class PremiumModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PremiumModal: true,
        }


    }


    PremiumModalToggle = () => {
        this.setState({
            PremiumModal: !this.state.PremiumModal
        })
        this.props.PremiumModalToggle();
    }
    render() {


        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.PremiumModal}
                onRequestClose={() => {
                    console.warn("Modal has been closed.");
                    this.PremiumModalToggle()
                }}

            >
                <TouchableOpacity onPress={() => this.PremiumModalToggle()} style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', height: '100%', position: 'absolute', width: '100%' }}>
                </TouchableOpacity>
                <SafeAreaView style={{ elevation: 10, backgroundColor: '#fff', borderRadius: 10, top: '25%', height: '50%', width: '86%', marginHorizontal: '7%', }}>
                    <ScrollView keyboardShouldPersistTaps='handled'>
                        <View style={{ width: '100%', height: '100%' }}>
                            <View style={{ margin: 5, marginVertical: 10, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.headerModalText, { paddingTop: 0 }]}>
                                    Upgrade to PREMIUM
                            </Text>
                            </View>
                            <Text style={{ paddingHorizontal: 15, }}>
                                PREMIUM listing gives you 10 photo, increased description, and puts youat the top
                                of the search results, so you can sell your vehicle more quickly.
                            </Text>

                            <Text style={{ paddingHorizontal: 15, marginTop: 20 }}>
                                You can add your vehicles as a PREMIUM listing for one or two months.
                            </Text>
                            <View style={{ marginTop:20,width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                                <TouchableOpacity onPress={() => {
                                    this.PremiumModalToggle()
                                }} style={styles.modalFooterButton}>
                                    <Text style={{ color: Apptheme }} >1 MONTH - RS 988.04</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.PremiumModalToggle()} style={styles.modalFooterButton}>
                                    <Text style={{ color: Apptheme }} >2 MONTHS - RS 1780.06</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.PremiumModalToggle()} style={styles.modalFooterButton}>
                                    <Text style={{ color: Apptheme }} >NO THANKS</Text>
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