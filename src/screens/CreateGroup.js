import React from 'react';
import {
    ScrollView,
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Alert,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Constants from "../helpers/Constants";
import * as Utilities from "../helpers/Utilities";
import * as MessagesService from '../services/Messages';
import Storage from '../helpers/Storage';
import Labels from "../languages/Labels";
import Topbar from '../components/Topbar';
import * as vehicleService from '../services/Vehicle';
import { TextField } from 'react-native-material-textfield';
import CommonStyle, { Apptheme, lightText, lightBg, darkText, LinearColor, linkText } from '../helpers/CommponStyle';
var screenheight = Dimensions.get('window').height;

export default class CreateGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            List: [],
            registerNo: '',
            groupName: '',

            isKeyboard: false,
            users: [],
            isModal: false,
            isgroupModal: false,
        }
        this._keyboardDidShow = this._keyboardDidShow.bind(this);
        this._keyboardDidHide = this._keyboardDidHide.bind(this);
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {


        })

    }

    _keyboardDidShow() {
        this.setState({
            isKeyboard: true
        })
    }
    onChangeText = (key, value) => {
        this.setState({ [key]: value, })
    }

    _keyboardDidHide() {
        this.setState({
            isKeyboard: false
        })
    }
    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
    }


    addPerson = () => {
        this.setState({
            isModal: !this.state.isModal,
            registerNo: ''
        })
    }

    searchRegistration = async () => {
        var registerNo = this.state.registerNo;
        if (!Utilities.stringIsEmpty(registerNo)) {
            var response = await vehicleService.searchRegisterNo(registerNo)
            if (response.success) {
                if (!Utilities.stringIsEmpty(response.vehicle)) {
                    this.addPerson()
                    if (response.vehicle.userID != Storage.userData.userId) {
                        this.state.List.push(response.vehicle)
                        this.setState({
                            List: this.state.List
                        })
                    }
                    else {
                        Alert.alert(
                            'You cannot message yourself'
                        )
                    }


                }
                else {
                    this.addPerson()
                    Alert.alert(
                        'Vehicle not found'
                    )
                }
            }

        }

    }

    isgroupModal = () => {
        this.setState({
            isgroupModal: !this.state.isgroupModal
        })
    }

    createGroup = async () => {
        try {
            var arr = [];
            for (var i = 0; i < this.state.List.length; i++) {
                arr.push(this.state.List[i].userID)
            }
            var param = {
                name: this.state.groupName,
                users: arr
            }
            var response = await MessagesService.createGroup(param)
             if(response.success){
                this.isgroupModal()
                this.props.navigation.navigate("Messenger", { conversationId: response.conversation.id })
            }

        }
        catch (e) {
            console.log("createGroup Exception", e);
        }
    }
    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar ParentPage="Create Group"
                    addPerson={this.addPerson}
                    List={this.state.List}
                    createGroup={this.createGroup}
                    isgroupModal={this.isgroupModal}
                    navigation={this.props} />

                {this.state.isLoad &&
                    <View style={styles.menuLoaderView}>
                        <ActivityIndicator
                            color="#ed0000"
                            size="large"
                        />
                    </View>
                }
                <ScrollView >
                    <View style={{ width: '96%', height: screenheight, marginHorizontal: '2%', marginVertical: 10 }}>
                        <View style={{ height: 40, paddingHorizontal: 5, borderBottomColor: "#d2d2d2", borderBottomWidth: 1 }}>
                            <Text>
                                You
                            </Text>
                            <Text>
                                {Storage.userData.name}
                            </Text>
                        </View>
                        {this.state.List.length > 0 &&
                            <View>
                                {this.state.List.map((item, index) => {
                                    return (
                                        <View key={index} style={{ justifyContent: 'center', height: 40, paddingHorizontal: 5, borderBottomColor: "#d2d2d2", borderBottomWidth: 1 }}>
                                            <Text>
                                                {item.user.name}
                                                {'\t\t'}
                                                {"(" + item.registrationNumber + ")"}
                                            </Text>
                                        </View>
                                    )
                                })}
                            </View>
                        }

                    </View>
                </ScrollView>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.isModal}
                    onRequestClose={() => {
                        console.warn("Modal has been closed.");
                        this.addPerson()
                    }}

                >
                    <TouchableOpacity onPress={() => this.addPerson()} style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', height: '100%', position: 'absolute', width: '100%' }}>
                    </TouchableOpacity>
                    <SafeAreaView style={{ elevation: 10, backgroundColor: '#fff', borderRadius: 5, top: (this.state.isKeyboard) ? 60 : 150, height: 240, width: '80%', marginHorizontal: "10%", position: 'absolute' }}>
                        <ScrollView keyboardShouldPersistTaps='handled'>
                            <View style={{ padding: 10, }}>
                                <Text style={{ fontSize: 20, color: darkText, fontWeight: 'bold' }}>
                                    Add user
                                    </Text>

                                <Text style={{ fontSize: 16, paddingVertical: 5, color: darkText, }}>
                                    To add a new user to this group, just enter their registration number below.
                                </Text>
                            </View>
                            <View style={{ width: '100%', height: 200, justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={styles.TextFieldView}>
                                    <TextField
                                        label='Registration number'
                                        fontSize={13}
                                        keyboardType='default'
                                        tintColor={Apptheme}
                                        baseColor={Apptheme}
                                        errorColor="red"
                                        activeLineWidth={2}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        labelFontSize={13}
                                        value={this.state.registerNo}
                                        onChangeText={val => {
                                            this.onChangeText('registerNo', val.trim())
                                        }}
                                    />
                                </View>
                                <View style={{ width: '90%', marginTop: 5, marginHorizontal: '5%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <TouchableOpacity onPress={() => this.addPerson()} style={styles.Modalbtn}>
                                        <Text style={styles.ModalBtnText}>CANCEL</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity disabled={this.state.registerNo.length == 0} onPress={() => this.searchRegistration()} style={styles.Modalbtn}>
                                        <Text style={[styles.ModalBtnText, { opacity: (this.state.registerNo.length == 0) ? 0.4 : 1 }]}>ADD</Text>
                                    </TouchableOpacity>
                                </View>
                            </View >

                        </ScrollView>
                    </SafeAreaView>
                </Modal >


                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.isgroupModal}
                    onRequestClose={() => {
                        console.warn("Modal has been closed.");
                        this.isgroupModal()
                    }}

                >
                    <TouchableOpacity onPress={() => this.isgroupModal()} style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', height: '100%', position: 'absolute', width: '100%' }}>
                    </TouchableOpacity>
                    <SafeAreaView style={{ elevation: 10, backgroundColor: '#fff', borderRadius: 5, top: (this.state.isKeyboard) ? 60 : 150, height: 240, width: '80%', marginHorizontal: "10%", position: 'absolute' }}>
                        <ScrollView keyboardShouldPersistTaps='handled'>
                            <View style={{ padding: 10, }}>
                                <Text style={{ fontSize: 20, color: darkText, fontWeight: 'bold' }}>
                                    Create group
                                    </Text>

                                <Text style={{ fontSize: 16, paddingVertical: 5, color: darkText, }}>
                                    Please enter a name for this group.
                                </Text>
                            </View>
                            <View style={{ width: '100%', height: 200, justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={styles.TextFieldView}>
                                    <TextField
                                        label='Group Name'
                                        fontSize={13}
                                        keyboardType='default'
                                        tintColor={Apptheme}
                                        baseColor={Apptheme}
                                        errorColor="red"
                                        maxLength={15}
                                        activeLineWidth={2}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        labelFontSize={13}
                                        value={this.state.groupName}
                                        onChangeText={val => {
                                            this.onChangeText('groupName', val.trim())
                                        }}
                                    />
                                </View>
                                <View style={{ width: '90%', marginTop: 5, marginHorizontal: '5%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <TouchableOpacity onPress={() => this.isgroupModal()} style={styles.Modalbtn}>
                                        <Text style={styles.ModalBtnText}>CANCEL</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity disabled={this.state.groupName.length == 0} onPress={() => this.createGroup()} style={styles.Modalbtn}>
                                        <Text style={[styles.ModalBtnText, { opacity: (this.state.groupName.length == 0) ? 0.4 : 1 }]}>CREATE</Text>
                                    </TouchableOpacity>
                                </View>
                            </View >

                        </ScrollView>
                    </SafeAreaView>
                </Modal >
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ParentView: {
        width: '100%',
        height: '100%',
        backgroundColor: lightBg,

        // paddingBottom: 50
        // backgroundColor: 'lightgray',

    },
    MainItemView: {
        width: '96%',
        marginHorizontal: '2%',
        flexDirection: 'row',
        // marginVertical: 5,
        // paddingHorizontal: 10
    },
    ItemViewBox1: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '50%'
    },
    ItemViewBox2: {

        width: '50%'
    },
    TextHead: {
        color: "#333",
        fontSize: 12
        // fontWeight: 'bold'
    },
    TextTail: {
        color: "#777",
        fontSize: 14
    },
    ChatBoxView: {
        height: 75,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: "#d2d2d2"
    },
    UserImageView: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    UserImage: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    UserDetailView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    UserNameText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: darkText
    },
    UserCountText: {
        fontWeight: 'bold',
        color: darkText
    },
    UserFriendsText: {
        color: "#777"
    },
    menuLoaderView: {
        ...CommonStyle.menuLoaderView
    },
    MessageCountView: {
        marginLeft: 20,
        minWidth: 20,
        // width: 20,
        height: 20,
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: Apptheme,
        color: lightText,
    },
    MessageCountText: {
        color: lightText,
        textAlign: 'center',
        fontSize: 12,
        fontWeight: "bold"
    },
    noRecordFoundText: {
        textAlign: 'center',
        fontSize: 14,
        paddingTop: 5,
    },
    ImageIconView: {
        borderColor: "#d2d2d2",
        borderWidth: 1,
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        borderRadius: 50
    },
    TextFieldView: {
        width: '80%',
        marginHorizontal: '10%'
    },
    Modalbtn: {
        height: 35, margin: 10, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'
    },
    ModalBtnText: {
        color: Apptheme
    }
})