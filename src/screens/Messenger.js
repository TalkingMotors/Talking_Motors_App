import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Button,
    FlatList,
    Image,
    TextInput,
    StatusBar,
    Modal,
    Dimensions,
    Keyboard,
    ActivityIndicator,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Topbar from '../components/Topbar';
import { TextField } from 'react-native-material-textfield';
import Constants from "../helpers/Constants";
import * as Utilities from "../helpers/Utilities";
import * as MessagesService from '../services/Messages';
import * as VehicleService from '../services/Vehicle';
import Storage from '../helpers/Storage';
import Labels from "../languages/Labels";
import CommonStyle, { Apptheme, lightText, lightBg, darkText, LinearColor, linkText } from '../helpers/CommponStyle';

const image = require('../images/userImage.jpg')
const screen_height = Dimensions.get('window').height
export default class Messenger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            conversationId: 0,
            conversationDetail: [],
            messages: [],
            userId: Storage.userData.userId,
            sendButtonVisible: false,
            typeMessage: '',
            vehicleId: 0,
            vrn: "",
            userIds: {},
            messageBody: {},
            lastReadMessageId: 0,
            isLoad: true,
            senderName: "",
            senderImageUrl: "",
            isPopup: false,
            isKeyboard: false,
            convoname: '',
            isChangeConversationNamePopup: false,
            isclearHostoryPopup: false,
            isBlockUserPopup: false,

        }
        this.MoreItemsModal = this.MoreItemsModal.bind(this);
        this._keyboardDidShow = this._keyboardDidShow.bind(this);
        this._keyboardDidHide = this._keyboardDidHide.bind(this);

        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            this.componentDidAppear()
        })
    }
    componentDidAppear() {
        this.state.conversationId = this.props.navigation.state.params.conversationId
        this.state.messageBody = this.props.navigation.state.params.messageBody
        this.setState({
            conversationId: this.state.conversationId
        })
        this.getConverationDetail(this.state.conversationId);
        //this.updateConversationStatus();
    }
    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
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
    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
            this.setState({
                conversationId: 0,
                conversationDetail: [],
                messages: [],
                userId: Storage.userData.userId,
                sendButtonVisible: false,
                typeMessage: '',
                vehicleId: 0,
                vrn: "",
                userIds: {},
                messageBody: {},
                lastReadMessageId: 0,
                isLoad: true,

            })
        })
    }
    setSenderProps = (members) => {
        try {
            members.forEach(member => {
                if (member.user.userId !== this.state.userId) {
                    this.setState({
                        senderName: member.user.nickname,
                        senderImageUrl: member.user.thumbUrl
                    })
                    return
                }
            });

        }
        catch (e) {
            console.log("get conversation error", e.message)
            return null
        }
    }
    getConverationDetail = (id) => {
        try {
            MessagesService.GetConversationDetail(id).then(respose => {
                if (respose) {
                     if (respose.success) {
                        this.state.conversationDetail = respose.conversation
                        //console.log("ikm",this.state.conversationDetail)
                        this.state.messages = respose.conversation.messages.reverse()
                        if (this.state.messages.length > 0) {
                            this.updateConversationStatus(this.state.messages[0].id);
                        }

                        this.state.lastReadMessageId = this.state.conversationDetail.lastReadMessageId
                        this.state.vrn = this.state.conversationDetail.name
                        this.setSenderProps(this.state.conversationDetail.members)
                        //this.getUserIds(this.state.conversationDetail.members);
                        this.setState({
                            conversationDetail: this.state.conversationDetail,
                            lastReadMessageId: this.state.lastReadMessageId,
                            messages: this.state.messages,
                            convoname: this.state.conversationDetail.name,
                            isLoad: false
                        })
                    }
                    else {
                        this.setState({
                            isLoad: false
                        })
                    }
                }
                else {
                    this.setState({
                        isLoad: false
                    })
                }
            })
        }
        catch (e) {
            this.setState({
                isLoad: false
            })
            console.log("get conversation error", e.message)
        }
    }
    updateConversationStatus = async (messageId) => {
        console.log("messageId", messageId)
        console.log("conversationId", this.state.conversationId)
        var param = {
            conversationId: this.state.conversationId,
            messageId: messageId,

        }
        MessagesService.updateMessageStatusToRead(param).then(response => {
            console.log("updateMessageStatusToRead", response)
        })
    }

    getUserIds = (members) => {
        var userIds = []
        members.forEach(member => {
            if (this.state.userId != member.user.userId) {
                userIds.push({ userId: member.user.userId })
            }

        })
        this.state.userIds = userIds;
        console.log("userids", this.state.userIds)
    }
    onChangeText = (key, value) => {
        if (Utilities.stringIsEmpty(value)) {
            this.setState({ [key]: value, sendButtonVisible: false })
        } else {
            this.setState({ [key]: value, sendButtonVisible: true })
        }

    }
    sendMessageToConversation = () => {
        var params = {
            conversationId: this.state.conversationId,
            message: this.state.typeMessage,
            image: null
        }

        MessagesService.sendMessageToConversation(params).then(response => {
            this.setState(prevState => ({
                messages: [...prevState.messages, response.conversationMessage],
                typeMessage: ""
            }));
        })
    }

    sendMessageToOwner = () => {
        var params = this.state.messageBody
        params.message = this.state.typeMessage

        MessagesService.sendMessage(params).then(response => {
            this.setState(prevState => ({
                messages: [...prevState.messages, response.conversationMessage],
                typeMessage: ""
            }));
        })
    }

    senderImage(item) {
        try {
            if (!Utilities.stringIsEmpty(item.user.thumbUrl)) {
                return (
                    <Image
                        resizeMode='cover'
                        style={{ width: '100%', height: '100%', borderRadius: 50 }}
                        source={{ uri: item.user.thumbUrl }}
                    />
                )
            }
            else {
                return (
                    <FontAwesome name="user" size={40} color={Apptheme} />
                )
            }
        }
        catch (e) {
            console.log("e", e)
        }

    }

    MoreItemsModal() {
        this.setState({
            isPopup: !this.state.isPopup
        })
    }
    ConversationNamePopup = () => {

        this.setState({
            isPopup: false,
            isChangeConversationNamePopup: !this.state.isChangeConversationNamePopup
        })
    }
    clearHostoryPopup = () => {
        this.setState({
            isPopup: false,
            isclearHostoryPopup: !this.state.isclearHostoryPopup
        })
    }
    BlockUserPopup = () => {
        this.setState({
            isPopup: false,
            isBlockUserPopup: !this.state.isBlockUserPopup
        })
        var param = {
            userId: this.state.conversationDetail.owner.userId,
        }
        console.log("param", param);
        MessagesService.BlockUser(param).then(response => {
            console.log("response", response);
        })
        

    }
    clearChatHistoryService = () => {
        this.setState({
            isclearHostoryPopup: false,
        })
        var param = {
            conversationId: this.state.conversationId,
        }
        console.log("param", param);
        MessagesService.ClearChatHistory(param).then(response => {
            console.log("response", response);
        })
    }

    convonameUpdate() {
        this.setState({
            isChangeConversationNamePopup: false,
        })
        var param = {
            id: this.state.conversationId,
            name: this.state.convoname,
        }
        console.log("param", param);
        MessagesService.updateConversationName(param).then(response => {
            console.log("updateConversationName", response)
        })
    }
    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar MoreItemsModal={this.MoreItemsModal} ParentPage="Messenger" username={this.state.senderName} image={this.state.senderImageUrl} navigation={this.props} />
                {this.state.isLoad &&
                    <View style={styles.menuLoaderView}>
                        <ActivityIndicator
                            color="#ed0000"
                            size="large"
                        />
                    </View>
                }
                <ScrollView style={{ paddingBottom: 0, }}>
                    <KeyboardAvoidingView
                        keyboardVerticalOffset="80"
                        enabled>
                        <ScrollView>
                            <View style={styles.MessengerView}>
                                <View style={styles.MessengerViewList}>
                                    <FlatList
                                        data={this.state.messages}
                                        renderItem={({ item, index }) =>
                                            <View >
                                                {
                                                    item.user.userId != this.state.userId ?
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <View style={{ borderWidth: 1, alignItems: 'center', borderColor: "#d2d2d2", justifyContent: 'center', backgroundColor: lightBg, width: 50, height: 50, borderRadius: 50, }}>
                                                                {this.senderImage(item)}
                                                            </View>
                                                            <View style={styles.ReceivedMessageView}>
                                                                <Text style={styles.ReceivedMessageTextTime}>
                                                                    {Utilities.FormatDate(item.time)}
                                                                </Text>
                                                                <Text style={styles.ReceivedMessageText}>
                                                                    {item.message}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        :
                                                        <View style={styles.SendMessageView}>
                                                            <View style={styles.SendMessageBox}>
                                                                <Text style={styles.SendMessageTextTime}>
                                                                    {Utilities.FormatDate(item.time)}
                                                                </Text>
                                                                <Text style={styles.SendMessageText}>
                                                                    {item.message}
                                                                </Text>
                                                                {(item.allRead || item.id < this.state.lastReadMessageId) ?
                                                                    <FontAwesome5 name="check-double" color={"#4FC3F7"} style={{ position: 'absolute', right: 5, bottom: 5 }} size={10} />
                                                                    :
                                                                    <FontAwesome5 name="check" color={"#d2d2d2"} style={{ position: 'absolute', right: 5, bottom: 5 }} size={10} />
                                                                }
                                                            </View>



                                                        </View>
                                                }
                                            </View>
                                        }

                                        keyExtractor={(item, index) => index.toString()}
                                    />

                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </ScrollView>
                <View style={{ flexDirection: 'row', width: '100%', height: 60 }}>
                    <TouchableOpacity style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesome name="camera" size={22} color={Apptheme} />
                    </TouchableOpacity>
                    <View style={{ width: '85%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>

                        <TextInput
                            placeholderTextColor="#333"
                            style={{ backgroundColor: '#d2d2d2', width: '96%', borderRadius: 60, paddingLeft: 20, height: 40 }}
                            placeholder="Write message"
                            value={this.state.typeMessage}
                            onChangeText={val => { this.onChangeText('typeMessage', val) }}
                        />
                        {
                            this.state.sendButtonVisible ?
                                <TouchableOpacity onPress={() => { this.state.conversationId > 0 ? this.sendMessageToConversation() : this.sendMessageToOwner() }} style={{ position: 'absolute', width: '15%', height: 40, zIndex: 2, justifyContent: 'center', alignItems: 'center', right: 10 }}>
                                    <MaterialCommunityIcons name="send-circle" size={36} color={Apptheme} />
                                </TouchableOpacity>
                                : null
                        }
                    </View>


                </View>
                {this.state.isPopup &&

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.isPopup}
                        onRequestClose={() => {
                            console.warn("Modal has been closed.");
                            this.MoreItemsModal()
                        }}

                    >
                        <TouchableOpacity onPress={() => this.MoreItemsModal()} style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', height: '100%', position: 'absolute', width: '100%' }}>
                        </TouchableOpacity>
                        <SafeAreaView style={{ elevation: 10, backgroundColor: '#fff', borderRadius: 5, top: 50, height: 150, width: '70%', right: 0, position: 'absolute' }}>
                            <ScrollView keyboardShouldPersistTaps='handled'>
                                <View style={{ width: '100%', height: '100%' }}>

                                    <TouchableOpacity onPress={() => this.ConversationNamePopup()} style={{ height: 40, margin: 5, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <FontAwesome style={{ paddingHorizontal: 15 }} name="edit" size={24} color={Apptheme} />
                                        <Text>Edit conversation name</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.clearHostoryPopup()} style={{ height: 40, margin: 5, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Feather style={{ paddingHorizontal: 15 }} name="delete" size={24} color={Apptheme} />
                                        <Text>Clear chat history</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.BlockUserPopup()} style={{ height: 40, margin: 5, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Entypo style={{ paddingHorizontal: 15 }} name="block" size={24} color={Apptheme} />
                                        <Text>Block</Text>
                                    </TouchableOpacity>
                                </View >

                            </ScrollView>
                        </SafeAreaView>
                    </Modal >
                }

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.isChangeConversationNamePopup}
                    onRequestClose={() => {
                        console.warn("Modal has been closed.");
                        this.ConversationNamePopup()
                    }}

                >
                    <TouchableOpacity onPress={() => this.ConversationNamePopup()} style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', height: '100%', position: 'absolute', width: '100%' }}>
                    </TouchableOpacity>
                    <SafeAreaView style={{ elevation: 10, backgroundColor: '#fff', borderRadius: 10, top: '30%', height: (this.state.isKeyboard) ? '50%' : '25%', width: '86%', marginHorizontal: '7%', }}>
                        <ScrollView keyboardShouldPersistTaps='handled'>
                            <View style={{ width: '100%', height: '100%' }}>
                                <View style={{ margin: 5, marginVertical: 5, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[styles.headerModalText, { paddingTop: 0 }]}>
                                        Edit conversation name
                            </Text>
                                </View>
                                <View style={styles.TextFieldView}>
                                    <TextField
                                        label='Conversation name'
                                        fontSize={13}
                                        keyboardType='default'
                                        tintColor={Apptheme}
                                        baseColor={Apptheme}
                                        errorColor="red"
                                        activeLineWidth={2}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        labelFontSize={13}
                                        value={this.state.convoname}
                                        onChangeText={val => {
                                            this.onChangeText('convoname', val.trim())
                                        }}
                                    />
                                </View>

                            </View >

                        </ScrollView>

                        <View style={{ justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row', width: '100%', height: 45, position: 'absolute', bottom: 10 }}>
                            <TouchableOpacity onPress={() => this.ConversationNamePopup()} style={styles.modalFooterButton}>
                                <Text style={{ color: Apptheme }} >CANCEL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.convonameUpdate()} style={styles.modalFooterButton}>
                                <Text style={{ color: Apptheme }}  >OK</Text>
                            </TouchableOpacity>

                        </View>
                    </SafeAreaView>
                </Modal >

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.isclearHostoryPopup}
                    onRequestClose={() => {
                        console.warn("Modal has been closed.");
                        this.clearHostoryPopup()
                    }}

                >
                    <TouchableOpacity onPress={() => this.clearHostoryPopup()} style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', height: '100%', position: 'absolute', width: '100%' }}>
                    </TouchableOpacity>
                    <SafeAreaView style={{ elevation: 10, backgroundColor: '#fff', borderRadius: 10, top: '30%', height: (this.state.isKeyboard) ? '50%' : '25%', width: '86%', marginHorizontal: '7%', }}>
                        <ScrollView keyboardShouldPersistTaps='handled'>
                            <View style={{ width: '100%', height: '100%' }}>
                                <View style={{ margin: 5, marginVertical: 5, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[styles.headerModalText, { paddingTop: 0 }]}>
                                        Clear chat history
                            </Text>
                                </View>
                                <View style={styles.TextFieldView}>
                                    <Text>Are you sure you would like to clear this chat history?</Text>
                                </View>

                            </View >

                        </ScrollView>

                        <View style={{ justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row', width: '100%', height: 45, position: 'absolute', bottom: 10 }}>
                            <TouchableOpacity onPress={() => this.clearHostoryPopup()} style={styles.modalFooterButton}>
                                <Text style={{ color: Apptheme }} >CANCEL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.clearChatHistoryService()} style={styles.modalFooterButton}>
                                <Text style={{ color: Apptheme }}  >CLEAR CHAT history</Text>
                            </TouchableOpacity>

                        </View>
                    </SafeAreaView>
                </Modal >


                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.isBlockUserPopup}
                    onRequestClose={() => {
                        console.warn("Modal has been closed.");
                        this.BlockUserPopup()
                    }}

                >
                    <TouchableOpacity onPress={() => this.BlockUserPopup()} style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', height: '100%', position: 'absolute', width: '100%' }}>
                    </TouchableOpacity>
                    <SafeAreaView style={{ elevation: 10, backgroundColor: '#fff', borderRadius: 10, top: '30%', height: (this.state.isKeyboard) ? '50%' : '25%', width: '86%', marginHorizontal: '7%', }}>
                        <ScrollView keyboardShouldPersistTaps='handled'>
                            <View style={{ width: '100%', height: '100%' }}>
                                <View style={{ margin: 5, marginVertical: 5, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[styles.headerModalText, { paddingTop: 0 }]}>
                                        Success
                            </Text>
                                </View>
                                <View style={styles.TextFieldView}>
                                    <Text>You have block this user</Text>
                                </View>

                            </View >

                        </ScrollView>

                        <View style={{ justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row', width: '100%', height: 45, position: 'absolute', bottom: 10 }}>
                            <TouchableOpacity onPress={() => this.setState({ isBlockUserPopup: false })}
                                style={styles.modalFooterButton}>
                                <Text style={{ color: Apptheme }}  >OK</Text>
                            </TouchableOpacity>

                        </View>
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

    },
    MessengerView: {
        width: '100%',
        height: screen_height - 120,
        justifyContent: 'flex-end'
    },
    MessengerViewList: {
        width: '96%',
        marginHorizontal: '2%',
        marginVertical: 10,

    },
    SendMessageView: {
        // width: '100%',
        alignSelf: 'flex-end',
        alignItems: 'flex-end'
    },
    SendMessageBox: {
        marginVertical: 5,
        backgroundColor: Apptheme,
        width: '80%',
        borderRadius: 10,
        paddingVertical: 5

    },
    SendMessageTextTime: {
        paddingHorizontal: 10,
        color: lightText
    },
    SendMessageText: {
        paddingHorizontal: 10,
        color: lightText
    },
    ReceivedMessageView: {
        backgroundColor: '#d2d2d2',
        // width: '80%',
        alignSelf: 'flex-start',
        marginHorizontal: '2%',
        borderRadius: 10,
        marginVertical: 5,
        paddingVertical: 5
    },
    ReceivedMessageTextTime: {
        paddingHorizontal: 10,
        color: darkText
    },
    ReceivedMessageText: {
        paddingHorizontal: 10,
        color: darkText
    },
    menuLoaderView: {
        ...CommonStyle.menuLoaderView
    },
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