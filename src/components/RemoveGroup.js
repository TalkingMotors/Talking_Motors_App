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

export default class RemoveGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModal: true,
            seletedItem: 0,

        }
    }

    ToggleModal = () => {
        this.setState({
            isModal: !this.state.isModal
        })
        this.props.removeGroupToUser();
    }
    seletedItem = (item) => {
        // console.log("item", item)
        this.setState({
            seletedItem: item.user.userId
        })
    }
    confromRemoveUser = () => {
        this.ToggleModal()
        if (this.state.seletedItem > 0) {
            this.props.confromRemoveUser(this.state.seletedItem)
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
                            Remove  user
                    </Text>
                    </View>




                    <ScrollView keyboardShouldPersistTaps='handled'>
                        <View style={{ padding: 10, }}>

                            <Text style={{ fontSize: 16, paddingVertical: 5, color: darkText, }}>
                                To remove a user from this group, select them from the list and press 'Remove user'
                        </Text>
                        </View>
                        <View style={{ width: '100%', height: screen_height - 200, }}>

                            {this.props.members.length > 0 &&
                                <View >
                                    {this.props.members.map((item, index) => {
                                        if (item.status.status == "Joined" && item.user.userId != Storage.userData.userId) {
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => { this.seletedItem(item) }}
                                                    style={{ height: 45, paddingTop: 10, paddingHorizontal: '5%', borderBottomColor: "#d2d2d2", borderBottomWidth: 1 }}
                                                    key={index}>
                                                    <Text>
                                                        {item.user.name}
                                                    </Text>

                                                    {(this.state.seletedItem == item.user.userId) ?
                                                        <MaterialIcons name="radio-button-checked" style={{ position: 'absolute', right: 25 }} size={20} color={Apptheme} />
                                                        :
                                                        <MaterialIcons name="radio-button-unchecked" style={{ position: 'absolute', right: 25 }} size={20} color={Apptheme} />
                                                    }
                                                </TouchableOpacity>
                                            )
                                        }
                                    })
                                    }
                                </View>
                            }

                        </View >

                    </ScrollView>

                    <View style={{ width: '100%', marginVertical: 5, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>


                        <TouchableOpacity onPress={() => this.ToggleModal()} style={[styles.footerBtn, { backgroundColor: '#d2d2d2' }]}>
                            <Text style={styles.ModalBtnText}>CANCEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.confromRemoveUser()} style={[styles.footerBtn, { backgroundColor: Apptheme }]}>
                            <Text style={{ color: lightText }}>REMOVE USER</Text>
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