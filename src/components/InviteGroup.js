import React, { Component } from 'react';
import {
    StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, Dimensions,
    SafeAreaView,
    Keyboard,
    KeyboardAvoidingView,
    Modal, ImageBackground
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import CommponStyle, { Apptheme, lightText, lightBg, darkText, LinearColor, linkText } from '../helpers/CommponStyle';
import { TextField } from 'react-native-material-textfield';
import LinearGradient from 'react-native-linear-gradient';
import Storage from '../helpers/Storage';
const screen_height = Dimensions.get('window').height

export default class InviteGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModal: true,
            seletedItem: 0,
            type: [{ id: 3, name: "JOIN" }, { id: 2, name: "REJECT" }, { id: 5, name: "BLOCK" }]

        }
    }

    ToggleModal = () => {
        this.setState({
            isModal: !this.state.isModal
        })
        this.props.inviteModal();
    }
    seletedItem = (item) => {
        console.log("item", item)
        this.setState({
            seletedItem: item.id
        })
    }
    confromModal = () => {
        this.ToggleModal()
        if (this.state.seletedItem > 0) {
            this.props.confromInvitation(this.state.seletedItem)
        }
    }
    render() {
        return (
            <Modal
                animationType="fade"
                transparent={false}
                visible={this.state.isModal}
                onRequestClose={() => {
                    console.warn("Modal has been closed.");
                    this.ToggleModal()
                }}

            >
                <SafeAreaView style={{ backgroundColor: '#fff', height: '100%', width: '100%', }}>
                    <View style={{ width: '100%', height: 60, alignItems: 'center', backgroundColor: Apptheme, flexDirection: 'row' }}>
                        <Feather onPress={() => this.ToggleModal()} name="arrow-left" color={lightText} size={22} style={styles.Icons} />
                        <Text style={styles.ScreenName}>
                            Invitation
                    </Text>
                    </View>

                    <ScrollView keyboardShouldPersistTaps='handled'>
                        <View style={{ padding: 10, }}>

                            <Text style={{ fontSize: 16, paddingVertical: 5, color: darkText, }}>
                                You have been invited to join a conversation. Please choose an option below.
                        </Text>
                        </View>
                        <View style={{ width: '100%', height: screen_height - 200, }}>



                            {this.state.type.map((item, index) => {

                                return (
                                    <TouchableOpacity
                                        onPress={() => { this.seletedItem(item) }}
                                        style={{ height: 45, paddingTop: 10, paddingHorizontal: '5%', borderBottomColor: "#d2d2d2", borderBottomWidth: 1 }}
                                        key={index}>
                                        <Text>
                                            {item.name}
                                        </Text>

                                        {(this.state.seletedItem == item.id) ?
                                            <MaterialIcons name="radio-button-checked" style={{ position: 'absolute', right: 25,top:10 }} size={20} color={Apptheme} />
                                            :
                                            <MaterialIcons name="radio-button-unchecked" style={{ position: 'absolute', right: 25 ,top:10 }} size={20} color={Apptheme} />
                                        }
                                    </TouchableOpacity>
                                )
                            })
                            }



                        </View >

                    </ScrollView>

                    <View style={{ width: '100%', marginVertical: 5, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>


                        <TouchableOpacity onPress={() => this.ToggleModal()} style={[styles.footerBtn, { backgroundColor: '#d2d2d2' }]}>
                            <Text style={styles.ModalBtnText}>CANCEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.confromModal()} style={[styles.footerBtn, { backgroundColor: Apptheme }]}>
                            <Text style={{ color: lightText }}> DONE</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal >

        )
    }
}
const styles = StyleSheet.create({
    Icons: {
        marginLeft: 10,
    },
    ScreenName: {
        paddingHorizontal: 15,
        color: lightText,
        fontSize: 16
    },
    footerBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: '44%',
        marginHorizontal: '3%',
        height: 45,

    }
})