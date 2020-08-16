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
import CommponStyle, { Apptheme, lightText, lightBg, darkText, LinearColor, linkText } from '../helpers/CommponStyle';
import { TextField } from 'react-native-material-textfield';
import LinearGradient from 'react-native-linear-gradient';
export default class CommonModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModal: true,
            seletedItem: this.props.ModalSeleted
        }
   }
   
     ToggleModal = () => {
        this.setState({
            isModal: !this.state.isModal
        })
        this.props.ModalToggle();
    }

    seletedItem = (item) => {
        this.props.ModalToggle();
        this.props.seletedItem(item)

    }

    render() {


        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isModal}
                onRequestClose={() => {
                    console.warn("Modal has been closed.");
                    this.ToggleModal()
                }}

            >
                <TouchableOpacity onPress={() => this.ToggleModal()} style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', height: '100%', position: 'absolute', width: '100%' }}>
                </TouchableOpacity>
                <SafeAreaView style={{ elevation: 10, backgroundColor: '#fff', borderRadius: 10, top: '25%', height: '50%', width: '86%', marginHorizontal: '7%', }}>
                    <View style={{ width: '100%', height: '100%' }}>
                        <View style={{ margin: 5, marginVertical: 5, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.headerModalText, { paddingTop: 0 }]}>
                                {this.props.ModalTitle}  
                            </Text>
                        </View>
                        <ScrollView keyboardShouldPersistTaps='handled'>
                            <View style={{ width: '98%', marginHorizontal: '1%', justifyContent: 'center' }}>
                            {this.props.ModalTitle!="Sort by" &&
                            <TouchableOpacity onPress={() => this.seletedItem({id:0 ,name:"Any"})} style={{ width: '100%', marginVertical: 10, marginHorizontal: 1 }} >
                                            <Text style={{ paddingHorizontal: 10, color: "#333", fontSize: 14 }}>Any</Text>
                                            {(this.state.seletedItem == 0) ?
                                                <MaterialIcons name="radio-button-checked" style={{ position: 'absolute', right: 25 }} size={20} color={Apptheme} />
                                                :
                                                <MaterialIcons name="radio-button-unchecked" style={{ position: 'absolute', right: 25 }} size={20} color={Apptheme} />
                                            }
                                        </TouchableOpacity>
    }
                                {this.props.ModalData.map((item, index) => {
                                    return (
                                        <TouchableOpacity onPress={() => this.seletedItem(item)} style={{ width: '100%', marginVertical: 10, marginHorizontal: 1 }} key={index}>
                                            <Text style={{ paddingHorizontal: 10, color: "#333", fontSize: 14 }}>{item.name}</Text>
                                            {(this.state.seletedItem == item.id) ?
                                                <MaterialIcons name="radio-button-checked" style={{ position: 'absolute', right: 25 }} size={20} color={Apptheme} />
                                                :
                                                <MaterialIcons name="radio-button-unchecked" style={{ position: 'absolute', right: 25 }} size={20} color={Apptheme} />
                                            }
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </ScrollView>

                    </View >


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