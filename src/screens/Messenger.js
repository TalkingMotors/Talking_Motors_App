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
    ImageBackground,
    Alert,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { GiftedChat } from 'react-native-gifted-chat'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Topbar from '../components/Topbar';
import { TextField } from 'react-native-material-textfield';
import Constants from "../helpers/Constants";
import * as Utilities from "../helpers/Utilities";
import * as MessagesService from '../services/Messages';
import * as VehicleService from '../services/Vehicle';
import Storage from '../helpers/Storage';
import Labels from "../languages/Labels";
import CommonStyle, { Apptheme, lightText, lightBg, darkText, LinearColor, linkText, GreenBg } from '../helpers/CommponStyle';
import * as vehicleService from '../services/Vehicle';
import RemoveGroup from '../components/RemoveGroup';
import ImagePicker from 'react-native-image-crop-picker';
const image = require('../images/userImage.jpg')
const win = Dimensions.get('window');
const screen_height = Dimensions.get('window').height;
export var getConverationDetail
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
            isGroup: false,
            isAdduser: false,
            isKeyboard: false,
            convoname: '',
            isChangeConversationNamePopup: false,
            isclearHostoryPopup: false,
            isBlockUserPopup: false,
            members: {},
            membersCount: [],
            registerNo: '',
            isremoveModal: false,
            isGroupOwner: false,
            groupMembersActive: 0,
            isCameraModal: false
        }
        this.MoreItemsModal = this.MoreItemsModal.bind(this);
        this._keyboardDidShow = this._keyboardDidShow.bind(this);
        this._keyboardDidHide = this._keyboardDidHide.bind(this);

        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            this.componentDidAppear()
        })
    }
    cameraModal = () => {
        this.setState({
            isCameraModal: !this.state.isCameraModal
        })
    }

    openCamera = () => {
        try {
            ImagePicker.clean();
            this.cameraModal();
            ImagePicker.openCamera({
                width: 200,
                height: 200,
                cropping: true,
                includeBase64: true,
                useFrontCamera: true
            }).then(imageDetail => {
                if (Object.keys(imageDetail).length > 0) {
                    var base64Image = `${imageDetail.data}`

                    this.sendMessageToImage(base64Image)
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
                isCameraModal: !this.state.isCameraModal
            }, () => {
                ImagePicker.openPicker({
                    width: 200,
                    height: 200,
                    cropping: true,
                    includeBase64: true,
                }).then(imageDetail => {
                    if (Object.keys(imageDetail).length > 0) {
                        var base64Image = `${imageDetail.data}`
                        this.sendMessageToImage(base64Image)
                    }

                });
            }
            )
        } catch (e) {
            console.log("openGallery EditVehicleImage", e)
        }
    }

      sendMessageToImage = (image) => {
        Keyboard.dismiss()
        var params = {
            conversationId: this.state.conversationId,
            message: null,
            image: image
        }
        this.setState({
            isLoad: true,

        })

        MessagesService.sendMessageToConversation(params).then(response => {
            this.setState(prevState => ({
                messages: [...prevState.messages, response.conversationMessage],
                typeMessage: "",
                isLoad: false,
                sendButtonVisible: false
            }));
            this.getConverationDetail(this.state.conversationId)
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
        // this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
        //     this.setState({
        //         conversationId: 0,
        //         conversationDetail: [],
        //         messages: [],
        //         membersCount: [],
        //         userId: Storage.userData.userId,
        //         sendButtonVisible: false,
        //         typeMessage: '',
        //         vehicleId: 0,
        //         vrn: "",
        //         userIds: {},
        //         messageBody: {},
        //         lastReadMessageId: 0,
        //         isLoad: true,

        //     })
        // })

        // this.setState({
        //     messages: [
        //       {
        //         _id: 1,
        //         text: 'Hello developer',
        //         createdAt: new Date(),
        //         user: {
        //           _id: 1,
        //           name: 'React Native',
        //           avatar: 'https://placeimg.com/140/140/any',
        //         },
        //       },
        //       {
        //         _id: 2,
        //         text: 'Hello engineer',
        //         createdAt: new Date(),
        //         user: {
        //           _id: 2,
        //           name: 'React Native',
        //           avatar: 'https://placeimg.com/140/140/any',
        //         },
        //       },
        //     ],
        //     isLoad: false,
        //   })
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
    getConverationDetail = getConverationDetail = (id) => {
        try {
            MessagesService.GetConversationDetail(id).then(respose => {
                if (respose) {
                    if (respose.success) {
                        this.state.conversationDetail = respose.conversation
                        console.log("ikm-messages", this.state.conversationDetail)
                        //var obj = JSON.parse(jsonObj)[0];

                        // respose.conversation.messages.forEach(element => {
                        //     element._id = element.id;
                        //     element.text = element.message;
                        //     element.createdAt = element.time
                        //     element.user._id = element.user.userId
                        //     element.user.avatar = element.user.thumbUrl
                        // });
                        //this.state.messages = respose.conversation.messages.reverse()
                        this.state.messages = respose.conversation.messages.sort(function (a, b) {
                            return b.time.localeCompare(a.time);
                        });
                        var previousDate = ""
                        this.state.messages.forEach(element => {
                            if (Utilities.stringIsEmpty(previousDate)) {
                                element.dateSeprator = Utilities.FormatDate(element.time)
                                previousDate = Utilities.FormatDate(element.time)
                            } else if (previousDate != Utilities.FormatDate(element.time)) {
                                element.dateSeprator = Utilities.FormatDate(element.time)
                                previousDate = Utilities.FormatDate(element.time)
                            } else {
                                element.dateSeprator = ""
                            }

                            element.time = Utilities.FormatTime(element.time).toLowerCase()

                        });

                        if (this.state.messages.length > 0 && this.state.conversationDetail.numberOfUnreadMessages > 0) {
                            this.updateConversationStatus(this.state.messages[this.state.messages.length - 1].id);
                        }

                        this.state.lastReadMessageId = this.state.conversationDetail.lastReadMessageId
                        var isGroupOwner = false;
                        isGroupOwner = (this.state.conversationDetail.owner.userId == Storage.userData.userId)
                        this.state.vrn = this.state.conversationDetail.name
                        var groupMembersActive = 0
                        if (this.state.conversationDetail.members.length > 0) {
                            groupMembersActive = this.state.conversationDetail.members.filter((val) => val.status.id == 3)

                        }
                        this.setSenderProps(this.state.conversationDetail.members)
                        //this.getUserIds(this.state.conversationDetail.members);
                        this.setState({
                            conversationDetail: this.state.conversationDetail,
                            lastReadMessageId: this.state.lastReadMessageId,
                            messages: this.state.messages,
                            convoname: this.state.conversationDetail.name,
                            senderName: this.state.conversationDetail.name,
                            isLoad: false,
                            membersCount: this.state.conversationDetail.members,
                            members: this.state.conversationDetail.members,
                            isGroupOwner: isGroupOwner,
                            groupMembersActive: groupMembersActive
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
        Keyboard.dismiss()
        var params = {
            conversationId: this.state.conversationId,
            message: this.state.typeMessage,
            image: null
        }
        this.setState({
            isLoad: true,

        })

        MessagesService.sendMessageToConversation(params).then(response => {
            this.setState(prevState => ({
                messages: [...prevState.messages, response.conversationMessage],
                typeMessage: "",
                isLoad: false,
                sendButtonVisible: false
            }));
            this.getConverationDetail(this.state.conversationId)
        })
    }

    sendMessageToOwner = () => {
        var params = this.state.messageBody
        params.message = this.state.typeMessage
        this.setState({
            isLoad: true
        })
        MessagesService.sendMessage(params).then(response => {
            this.setState(prevState => ({
                messages: [...prevState.messages, response.conversationMessage],
                typeMessage: "",
                isLoad: false,
                sendButtonVisible: false
            }));
            this.getConverationDetail(response.conversation.id)
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
    addUserToGroup() {
        this.state.isPopup = false
        this.setState({
            isPopup: this.state.isPopup
        })
        this.setState({
            isAdduser: !this.state.isAdduser
        })
    }

    removeGroupToUser = () => {
        this.state.isPopup = false
        this.setState({
            isPopup: this.state.isPopup
        })
        this.setState({
            isremoveModal: !this.state.isremoveModal
        })
    }
    confromRemoveUser = async (userId) => {
        try {
            var param = {
                conversationId: this.state.conversationId,
                userId: userId
            }
            console.log("param", param)
            var response = await MessagesService.removeUserToGroup(param);
            console.log("response", response);
            if (response.success) {
                this.getConverationDetail(this.state.conversationId);
            }
            else {
                Alert.alert(
                    'Remove user operation failed.'
                )
            }

        }
        catch (e) {
            console.log("confromRemoveUser Exception", e)
        }
    }
    addUserGroup = async () => {
        try {
            var registerNo = this.state.registerNo;
            if (!Utilities.stringIsEmpty(registerNo)) {
                var response = await vehicleService.searchRegisterNo(registerNo)
                if (response.success) {
                    if (!Utilities.stringIsEmpty(response.vehicle)) {
                        this.addUserToGroup();

                        var param = {
                            conversationId: this.state.conversationId,
                            vrm: registerNo.toUpperCase(),
                            email: response.vehicle.user.email
                        }
                        var messageResponse = await MessagesService.addUserToGroup(param)
                        if (messageResponse.success) {
                            this.getConverationDetail(this.state.conversationId);
                        }
                    }
                    else {
                        this.addUserToGroup();
                        Alert.alert(
                            'Vehicle not found'
                        )
                    }
                }

            }
        }
        catch (e) {
            console.log("addUserGroup Exception", e);
        }
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
            this.setState({
                messages: {}
            })
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
            this.setState({
                senderName: this.state.convoname
            })
        })
    }

    leaveGroup = async () => {
        try {
            this.setState({
                isLoad: true
            })
            var param = {
                conversationId: this.state.conversationId,
                inviteStatus: 5 //leave group status id

            }
            var response = await MessagesService.updateGroupInvite(param)
            if (response.success) {
                this.setState({
                    isLoad: false
                })
            }
            else {
                this.setState({
                    isLoad: false
                })
            }
        }
        catch (e) {
            console.log("confromInvitation Exception", e)
            this.setState({
                isLoad: false
            })
        }


    }

    navigateToUser = () => {
        if (this.state.membersCount.length > 0) {
            this.props.navigation.navigate("Users", {
                members: this.state.members
            })
        }
    }
    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar
                    navigateToUser={this.navigateToUser}
                    MoreItemsModal={this.MoreItemsModal}
                    ConversationNamePopup={this.ConversationNamePopup}
                    ParentPage="Messenger"
                    username={this.state.senderName}
                    image={this.state.senderImageUrl}
                    navigation={this.props}
                    conversationDetail={this.state.conversationDetail}
                    conversationId={this.state.conversationId}
                    groupMembersActive={this.state.groupMembersActive}
                    membersCount={this.state.membersCount} />
                {this.state.isLoad &&
                    <View style={styles.menuLoaderView}>
                        <ActivityIndicator
                            color="#ed0000"
                            size="large"
                        />
                    </View>
                }
                <ScrollView ref={ref => this.scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        this.scrollView.scrollResponderScrollToEnd({ animated: true });
                    }} style={{ marginBottom: 0 }}>
                    <View >
                        <KeyboardAvoidingView
                            keyboardVerticalOffset="80"
                            enabled>

                            <ScrollView >
                                <ImageBackground style={{ width: '100%' }} source={require('../images/tmmesbackan.png')} >
                                    <View style={styles.MessengerView}>
                                        <View style={styles.MessengerViewList}>

                                            <FlatList
                                                inverted
                                                data={this.state.messages}
                                                initialScrollIndex={this.state.messages - 1}
                                                renderItem={({ item, index }) =>
                                                    <View >
                                                        {
                                                            item.user.userId != this.state.userId ?
                                                                <View>
                                                                    {
                                                                        item.dateSeprator != "" ?
                                                                            <View style={{ alignItems: 'center' }}>
                                                                                <Text style={styles.TimingText}>{item.dateSeprator}</Text>
                                                                            </View> :
                                                                            null
                                                                    }
                                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                                                        <View style={{ borderWidth: 1, alignItems: 'center', borderColor: "#d2d2d2", justifyContent: 'center', backgroundColor: lightBg, width: 50, height: 50, borderRadius: 50, }}>
                                                                            {this.senderImage(item)}
                                                                        </View>


                                                                        <View style={styles.ReceivedMessageView}>
                                                                            <Text style={{ paddingHorizontal: 5, paddingVertical: 4 }}>

                                                                                <Text style={{ color: GreenBg, fontSize: 14, fontWeight: 'bold' }}>{item.user.name} </Text>
                                                                                <Text style={styles.ReceivedMessageTextTime}>
                                                                                    {item.time}
                                                                                </Text>
                                                                            </Text>
                                                                            {item.message != null &&
                                                                                <Text style={styles.ReceivedMessageText}>
                                                                                    {item.message}
                                                                                </Text>
                                                                            }
                                                                            {item.imageUrl != null &&
                                                                               <Image
                                                                                // resizeMode="center"
                                                                                  resizeMode="stretch"
                                                                                style={{width:150,height:260,marginBottom:10,}}
                                                                                source={{ uri: item.imageUrl }}
                                                                            />
                                                                            }
                                                                        </View>
                                                                    </View>
                                                                </View>

                                                                :
                                                                <View >

                                                                    {
                                                                        item.dateSeprator != "" ?
                                                                            <View style={{ alignItems: 'center', }}>
                                                                                <Text style={styles.TimingText}>{item.dateSeprator}</Text>
                                                                            </View> :
                                                                            null
                                                                    }
                                                                    <View style={styles.SendMessageView}>
                                                                        <View style={styles.SendMessageBox}>
                                                                            <Text style={styles.SendMessageTextTime}>
                                                                                {item.time}
                                                                            </Text>
                                                                            

                                                                             {item.message != null &&
                                                                                <Text style={styles.SendMessageTextTime}>
                                                                                    {item.message}
                                                                                </Text>
                                                                            }
                                                                            {item.imageUrl != null &&
                                                                               
                                                                              <Image
                                                                                // resizeMode="center"
                                                                                  resizeMode="stretch"
                                                                                style={{width:150,height:260,marginBottom:10,}}
                                                                                source={{ uri: item.imageUrl }}
                                                                            />

                                                                            }
                                                                            {(item.allRead || item.id < this.state.lastReadMessageId) ?
                                                                                <FontAwesome5 name="check-double" color={"#4FC3F7"} style={{ position: 'absolute', right: 5, bottom: 5 }} size={10} />
                                                                                :
                                                                                <FontAwesome5 name="check" color={"#d2d2d2"} style={{ position: 'absolute', right: 5, bottom: 5 }} size={10} />
                                                                            }
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                        }
                                                    </View>
                                                }

                                                keyExtractor={(item, index) => index.toString()}
                                            />

                                            {this.state.messages.length == 0 &&
                                                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                        <FontAwesome name="comments" color={Apptheme} style={{ alignItems: 'center' }} size={80} />
                                                        <Text style={{ paddingVertical: 10, textAlign: 'center', fontSize: 20, color: Apptheme, fontWeight: 'bold' }}>
                                                            {this.state.convoname}
                                                        </Text>
                                                        <Text style={{ color: darkText }}>
                                                            No messages to display
                                                    </Text>
                                                    </View>
                                                </View>
                                            }

                                        </View>
                                    </View>
                                </ImageBackground>
                            </ScrollView>
                        </KeyboardAvoidingView>

                    </View>
                </ScrollView>
                <View style={{ flexDirection: 'row', width: '100%', height: 55, }}>
                    <TouchableOpacity
                        onPress={() => this.cameraModal()}
                        style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesome name="camera" size={22} color={Apptheme} />
                    </TouchableOpacity>
                    <View style={{ width: '85%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>

                        <TextInput
                            placeholderTextColor="#333"
                            style={{ backgroundColor: '#d2d2d2', width: '96%', borderRadius: 60, paddingLeft: 20, paddingRight: 60, height: 40 }}
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

                {this.state.isCameraModal &&
                    <View style={{ position: 'absolute', top:'25%', height:260, width: '80%',marginHorizontal:'10%' }}>
                        <SafeAreaView style={{borderColor:Apptheme,borderWidth:2, borderRadius: 10, height: '100%', width: '96%', marginHorizontal: '2%', backgroundColor: "#fff" }}>
                               <View style={{margin:10,}}>
                                 <Text style={{fontWeight:'bold',textAlign:'center',fontSize:18,color:darkText}}>
                                     Edit main picture
                                </Text>
                               </View>
                            
                            <View style={styles.ModalMainRow}>
                            <View style={styles.ModalSubRow}>
                                    <TouchableOpacity
                                        onPress={() => this.openCamera()}
                                        style={styles.ModalButton}>

                                        <FontAwesome name="camera" color={Apptheme} style={{ fontSize: 30, }} />
                                        <Text style={styles.ModalText}>
                                            TAKE A PHOTO
                                             </Text>
                                    </TouchableOpacity>
                                </View>

                            <View style={styles.ModalSubRow}>
                                <TouchableOpacity
                                    onPress={() => this.openGallery()}
                                    style={styles.ModalButton}>
                                    <FontAwesome name="photo" color={Apptheme} style={{ fontSize: 30, }} />
                                    <Text style={styles.ModalText}>
                                        GALLERY
                                             </Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                            {/* <View style={{ justifyContent: 'center', alignItems: 'center',marginTop:10 }}> */}
                                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: 40, }} activeOpacity={1} onPress={() => this.cameraModal()} >
                                    <View style={styles.headerModalView}>
                                        <Text style={{ fontSize: 20, color:darkText }}>
                                            CANCEL
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            {/* </View> */}
                        </SafeAreaView>
                    </View>
                }
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
                        <SafeAreaView style={{ elevation: 10, backgroundColor: '#fff', borderRadius: 5, top: 50, height: (this.state.membersCount.length > 2 && this.state.isGroupOwner) ? 250 : (this.state.membersCount.length > 2 && !this.state.isGroupOwner) ? 100 : 150, width: '70%', right: 0, position: 'absolute' }}>
                            <ScrollView keyboardShouldPersistTaps='handled'>
                                <View style={{ width: '100%', height: '100%' }}>

                                    {this.state.membersCount.length > 2 && this.state.isGroupOwner &&
                                        <TouchableOpacity onPress={() => this.addUserToGroup()} style={{ height: 40, margin: 5, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                            <FontAwesome style={{ paddingHorizontal: 15 }} name="plus" size={24} color={Apptheme} />
                                            <Text>Add user</Text>
                                        </TouchableOpacity>

                                    }

                                    {this.state.membersCount.length > 2 && this.state.isGroupOwner &&
                                        <TouchableOpacity onPress={() => this.removeGroupToUser()} style={{ height: 40, margin: 5, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                            <FontAwesome style={{ paddingHorizontal: 15 }} name="remove" size={24} color={Apptheme} />
                                            <Text>Remove user</Text>
                                        </TouchableOpacity>

                                    }
                                    {(this.state.membersCount.length > 2 && !this.state.isGroupOwner) ?
                                        null
                                        :
                                        <TouchableOpacity onPress={() => this.ConversationNamePopup()} style={{ height: 40, margin: 5, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                            <FontAwesome style={{ paddingHorizontal: 15 }} name="edit" size={24} color={Apptheme} />
                                            <Text>Edit conversation name</Text>
                                        </TouchableOpacity>
                                    }

                                    <TouchableOpacity onPress={() => this.clearHostoryPopup()} style={{ height: 40, margin: 5, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <FontAwesome style={{ paddingHorizontal: 15 }} name="history" size={24} color={Apptheme} />
                                        <Text>Clear chat history</Text>
                                    </TouchableOpacity>

                                    {(this.state.membersCount.length > 2) ?
                                        <TouchableOpacity onPress={() => {
                                            this.MoreItemsModal()
                                            this.leaveGroup()
                                        }} style={{ height: 40, margin: 5, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                            <AntDesign style={{ paddingHorizontal: 15 }} name="deleteusergroup" size={24} color={Apptheme} />
                                            <Text>Leave group</Text>
                                        </TouchableOpacity>

                                        :
                                        <TouchableOpacity onPress={() => this.BlockUserPopup()} style={{ height: 40, margin: 5, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                            <Entypo style={{ paddingHorizontal: 15 }} name="block" size={24} color={Apptheme} />
                                            <Text>Block</Text>
                                        </TouchableOpacity>
                                    }


                                </View >

                            </ScrollView>
                        </SafeAreaView>
                    </Modal >
                }
                {/* ConversationNamePopup */}
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
                {/* clearHostory */}
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
                                <Text style={{ color: Apptheme }}  >CLEAR CHAT HISTORY</Text>
                            </TouchableOpacity>

                        </View>
                    </SafeAreaView>
                </Modal >

                {/* isBlockUser */}
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

                {/* Add group to user */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.isAdduser}
                    onRequestClose={() => {
                        console.warn("Modal has been closed.");
                        this.addUserToGroup()
                    }}

                >
                    <TouchableOpacity onPress={() => this.addUserToGroup()} style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', height: '100%', position: 'absolute', width: '100%' }}>
                    </TouchableOpacity>
                    <SafeAreaView style={{ elevation: 10, backgroundColor: '#fff', borderRadius: 5, top: (this.state.isKeyboard) ? 60 : 150, height: 230, width: '80%', marginHorizontal: "10%", position: 'absolute' }}>
                        <ScrollView keyboardShouldPersistTaps='handled'>
                            <View style={{ padding: 10, }}>
                                <Text style={{ fontSize: 20, color: darkText, fontWeight: 'bold' }}>
                                    Add  user
                                    </Text>

                                <Text style={{ fontSize: 16, paddingVertical: 5, color: darkText, }}>
                                    To add a new user to this group, just enter their registration number below.
                                </Text>
                            </View>
                            <View style={{ width: '100%', height: 250, justifyContent: 'flex-start', alignItems: 'center' }}>
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
                                <View style={{ width: '90%', marginHorizontal: '5%', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <TouchableOpacity onPress={() => this.addUserGroup()} style={styles.Modalbtn}>
                                        <Text style={styles.ModalBtnText}>ADD</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.addUserToGroup()} style={styles.Modalbtn}>
                                        <Text style={styles.ModalBtnText}>CANCEL</Text>
                                    </TouchableOpacity>
                                </View>
                            </View >

                        </ScrollView>
                    </SafeAreaView>
                </Modal >

                {/* remove user to Group  */}

                {this.state.isremoveModal &&
                    <RemoveGroup
                        removeGroupToUser={this.removeGroupToUser}
                        confromRemoveUser={this.confromRemoveUser}
                        members={this.state.members}
                        membersCount={this.state.membersCount}
                    />

                }

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
        height: screen_height - 130,
        justifyContent: 'flex-end'
    },
    MessengerViewList: {
        width: '96%',
        marginHorizontal: '2%',
        // marginVertical: 10,

    },
    SendMessageView: {
        // width: '100%',
        alignSelf: 'flex-end',
        alignItems: 'flex-start',


    },
    SendMessageBox: {
        marginVertical: 5,
        backgroundColor: Apptheme,
        minWidth: 100,
        width: '80%',
        borderRadius: 10,
        paddingVertical: 10,
        paddingRight: 10,
        paddingLeft: 10

        // paddingLeft:30,
        // alignItems:'flex-start',

    },
    SendMessageTextTime: {

        // textAlign:'left',
        color: lightText,
        fontSize: 12,
    },
    SendMessageText: {
        paddingHorizontal: 1,
        color: lightText,
        fontSize: 16,
        paddingRight: 10
    },
    ReceivedMessageView: {
        backgroundColor: '#eee',
        // opacity:0.8,
        // width: '80%',
        alignSelf: 'flex-start',
        marginHorizontal: '2%',
        borderRadius: 10,
        marginVertical: 5,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    ReceivedMessageTextTime: {
        alignItems: 'flex-end',
        color: darkText,

        fontSize: 12
    },
    ReceivedMessageText: {
        paddingHorizontal: 10,
        color: darkText,
        fontSize: 16
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
    TimingText: {
        color: Apptheme, fontWeight: 'bold', padding: 5
    },
    TextFieldView: {
        width: '80%',
        marginHorizontal: '10%'
    },
    Modalbtn: {
        height: 35, margin: 3, marginHorizontal: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'
    },
    ModalBtnText: {
        color: Apptheme
    },
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

    },
        ModalMainRow: {
        marginHorizontal: '5%',
        marginTop: 4,
        flexDirection: 'column',
        width: '90%',
        // height: '60%'
    },
    ModalSubRow:{
        width: '100%', 
         marginVertical: 20
    },
    ModalButton:{
        paddingLeft:20,
        flexDirection:'row' 
    },
    ModalText: {
        fontSize: 18
        , color: Apptheme,
        paddingLeft: 20
    }
})