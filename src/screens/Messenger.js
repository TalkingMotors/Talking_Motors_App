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
    Dimensions,
    ActivityIndicator,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Topbar from '../components/Topbar';

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

        }
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
        this.updateConversationStatus();
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
    getConverationDetail = (id) => {
        try {
            MessagesService.GetConversationDetail(id).then(respose => {
                if (respose) {
                    if (respose.success) {
                        this.state.conversationDetail = respose.conversation
                        this.state.messages = respose.conversation.messages.reverse()
                        this.state.lastReadMessageId = this.state.conversationDetail.lastReadMessageId
                        this.state.vrn = this.state.conversationDetail.name
                        //this.getUserIds(this.state.conversationDetail.members);
                        this.setState({
                            conversationDetail: this.state.conversationDetail,
                            lastReadMessageId: this.state.lastReadMessageId,
                            messages: this.state.messages,
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
    updateConversationStatus = async () => {
        var param = {
            conversationId: this.state.conversationId,
            messageId: 0,

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

    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar ParentPage="Messenger" username={"Maaz"} image={image} navigation={this.props} />
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
                                                                {
                                                                    item.allRad || item.id < this.state.lastReadMessageId
                                                                }
                                                                <FontAwesome5 name="check-double" color={"#4FC3F7"} style={{ position: 'absolute', right: 5, bottom: 5 }} size={10} />
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
    }
})