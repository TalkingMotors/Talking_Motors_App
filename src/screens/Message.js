import React from 'react';
import {
    ScrollView,
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    SafeAreaView,
    TouchableOpacity,
    Alert
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import LinearGradient from 'react-native-linear-gradient';
import Constants from "../helpers/Constants";
import * as Utilities from "../helpers/Utilities";
import * as MessagesService from '../services/Messages';
import Storage from '../helpers/Storage';
import Labels from "../languages/Labels";
import { TextField } from 'react-native-material-textfield';
import Topbar from '../components/Topbar';
import CommonStyle, { Apptheme, lightText, lightBg, darkText, LinearColor, linkText } from '../helpers/CommponStyle';
import * as vehicleService from '../services/Vehicle';
import InviteGroup from '../components/InviteGroup';
//import { FluidNavigator, Transition } from '../../lib';
export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: true,
            isModal: false,
            isKeyboard: false,
            registerNo: '',
            myConversation: [],
            invitedMembers: [],
            Leftmember: [],
            joinedmember: [],
            isInviteModal: false,
            conversationId: 0

        }
        this._keyboardDidShow = this._keyboardDidShow.bind(this);
        this._keyboardDidHide = this._keyboardDidHide.bind(this);
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            this.getMyConversations()


        })

    }
    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
            this.setState({
                isLoad: true,
                myConversation: [],
            })
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
    getMyConversations = () => {
        try {
            MessagesService.MyConversations().then(respose => {
                if (respose) {
                    if (respose.success) {
                        this.state.myConversation = respose.conversations.reverse()
                        var conversation = this.state.myConversation.sort((a, b) => new Date(b.mostRecentMessageDate) - new Date(a.mostRecentMessageDate))
                        this.state.myConversation = conversation
                        var invitedMembers = [];
                        var Leftmember = [];
                        var joinedmember = []
                        for (var i = 0; i < conversation.length; i++) {
                            for (var j = 0; j < conversation[i].members.length; j++) {
                                if (conversation[i].members[j].user.userId == Storage.userData.userId) {
                                    if (conversation[i].members[j].status.id == 1) {
                                        invitedMembers.push(conversation[i])
                                    }
                                    else if (conversation[i].members[j].status.id == 3) {
                                        joinedmember.push(conversation[i])
                                    }
                                    else if (conversation[i].members[j].status.id == 5) {
                                        Leftmember.push(conversation[i])
                                    }
                                }
                            }
                        }

                        this.setState({
                            myConversation: this.state.myConversation,
                            invitedMembers: invitedMembers,
                            joinedmember: joinedmember,
                            Leftmember: Leftmember,
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
    setMemberNames = (members) => {
        try {
            var memberNamesCSV = ""
            members.forEach(member => {
                if (member.user.userId === Storage.userData.userId) {
                    memberNamesCSV = "You" + memberNamesCSV
                } else {
                    if (memberNamesCSV == "") {
                        memberNamesCSV = ` ${member.user.nickname}`
                    }
                    else {

                        memberNamesCSV = `${memberNamesCSV} , ${member.user.nickname}`
                    }
                }
            });
            return memberNamesCSV;
        }
        catch (e) {
            // console.log("get conversation error", e.message)
        }
    }

    viewMessageDetail = (item) => {
        console.log("viewMessageDetail",item);
        this.props.navigation.navigate("Messenger", { conversationId: item.id })
    }
    BlockUser = () => {

        this.props.navigation.navigate("BlockUser")
    }

    editSetting = () => {
        this.setState({
            isModal: !this.state.isModal,
            registerNo: ''
        })
    }

    createGroup = () => {
        this.editSetting()
        this.props.navigation.navigate("CreateGroup")
    }

    searchRegistration = async () => {
        var registerNo = this.state.registerNo;
        if (!Utilities.stringIsEmpty(registerNo)) {
            var response = await vehicleService.searchRegisterNo(registerNo)
            if (response.success) {
                if (!Utilities.stringIsEmpty(response.vehicle)) {
                    this.editSetting()
                    var param = {
                        userIds: "userIds=" + Storage.userData.userId + "&userIds=" + response.vehicle.userID,
                        vrm: registerNo,
                        numberOfResults: 50
                    }
                    var messageResponse = await MessagesService.getConversationByUserIds(param)
                    if (messageResponse.success) {
                        if (messageResponse.conversations.length > 0) {
                            this.props.navigation.navigate("Messenger", { conversationId: messageResponse.conversations[0].id })
                        }
                        else {
                            var messageParam = {
                                "vrm": registerNo,
                                "userId": response.vehicle.userID,
                                "vehicleId": response.vehicle.id,
                                "image": null
                            }
                            this.props.navigation.navigate("Messenger", { conversationId: 0,messageBody : messageParam })
                        }
                    }
                }
                else {
                    this.editSetting()
                    Alert.alert(
                        'Vehicle not found'
                    )
                }
            }

        }

    }

    inviteModal = () => {
        this.setState({
            isInviteModal: !this.state.isInviteModal
        })
    }
    confromInvitation = async (id) => {
        try {
            this.setState({
                isLoad: true
            })
            var param = {
                conversationId: this.state.conversationId,
                inviteStatus: id

            }
            var response = await MessagesService.updateGroupInvite(param)
            if (response.success) {
                this.getMyConversations()
            }
            else {
                this.setState({
                    isLoad: true
                })
            }
        }
        catch (e) {
            console.log("confromInvitation Exception", e)
            this.setState({
                isLoad: true
            })
        }


    }
    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar
                    BlockUser={this.BlockUser}
                    editSetting={this.editSetting}
                    ParentPage="Message"
                    navigation={this.props} />

                {this.state.isLoad &&
                    <View style={styles.menuLoaderView}>
                        <ActivityIndicator
                            color="#ed0000"
                            size="large"
                        />
                    </View>
                }
                <ScrollView style={{ paddingBottom: 0, }}>

                    {this.state.invitedMembers.length > 0 &&
                        <View style={{ width: '96%', marginHorizontal: '2%', marginVertical: 10 }}>
                            <Text style={{ color: Apptheme, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}> INVITATION</Text>
                            {this.state.invitedMembers.map((item, index) => {
                                var inviteCount = [];
                                var joinedCount = []
                                var invite = "";
                                var joinded = "";
                                joinedCount = item.members.filter(i => i.status.id == 3)
                                inviteCount = item.members.filter(i => i.status.id == 1)
                                joinded = this.setMemberNames(joinedCount);
                                invite = this.setMemberNames(inviteCount);
                                return (
                                    <TouchableOpacity onPress={() => {
                                        this.setState({
                                            conversationId: item.id
                                        })
                                        this.inviteModal()
                                    }} key={index} style={styles.ChatBoxView}>
                                        <View style={styles.UserImageView}>
                                            {
                                                Utilities.stringIsEmpty(item.owner.thumbUrl) ?
                                                    <View style={styles.ImageIconView}>
                                                        <FontAwesome name="user" size={40} color={Apptheme} />
                                                    </View>
                                                    :
                                                    <Image
                                                        style={styles.UserImage}
                                                        source={{ uri: item.owner.thumbUrl }}
                                                    />
                                            }

                                        </View>
                                        <View style={{ width: '100%', justifyContent: "center", flex: 1, overflow: 'hidden' }}>
                                            <Text style={styles.UserNameText}>
                                                {item.name}
                                            </Text>

                                            <View style={styles.UserDetailView}>



                                                {joinedCount.length > 0 &&
                                                    <Text>
                                                        <Text style={styles.UserCountText}>
                                                            {joinedCount.length + ((joinedCount.length > 1) ? " users" : " user") + " joined "}
                                                            <Text style={styles.UserFriendsText}>
                                                                {"(" + joinded + ")"}
                                                            </Text>
                                                        </Text>
                                                    </Text>

                                                }
                                                {inviteCount.length > 0 &&
                                                    <Text>
                                                        <Text style={styles.UserCountText}>
                                                            {inviteCount.length + ((inviteCount.length > 1) ? " users" : " user") + " invited "}
                                                            <Text style={styles.UserFriendsText}>
                                                                {"(" + invite + ")"}
                                                            </Text>
                                                        </Text>
                                                    </Text>

                                                }
                                                {item.numberOfUnreadMessages > 0 &&
                                                    <View style={styles.MessageCountView}>
                                                        <Text style={styles.MessageCountText}>
                                                            {item.numberOfUnreadMessages}

                                                        </Text>
                                                    </View>

                                                }

                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>

                    }


                    {this.state.joinedmember.length > 0 &&
                        <View style={{ width: '96%', marginHorizontal: '2%', marginVertical: 10 }}>
                            <Text style={{ color: Apptheme, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}> CONVERSATIONS</Text>
                            {this.state.joinedmember.map((item, index) => {
                                var inviteCount = [];
                                var joinedCount = []
                                var invite = "";
                                var joinded = "";
                                joinedCount = item.members.filter(i => i.status.id == 3)
                                inviteCount = item.members.filter(i => i.status.id == 1)
                                joinded = this.setMemberNames(joinedCount);
                                invite = this.setMemberNames(inviteCount);
                                return (
                                    <TouchableOpacity onPress={() => this.viewMessageDetail(item)} key={index} style={styles.ChatBoxView}>
                                        <View style={styles.UserImageView}>
                                            {
                                                Utilities.stringIsEmpty(item.owner.thumbUrl) ?
                                                    <View style={styles.ImageIconView}>
                                                        <FontAwesome name="user" size={40} color={Apptheme} />
                                                    </View>
                                                    :
                                                    <Image
                                                        style={styles.UserImage}
                                                        source={{ uri: item.owner.thumbUrl }}
                                                    />
                                            }

                                        </View>
                                        <View style={{ width: '100%', justifyContent: 'center', flex: 1, overflow: 'hidden' }}>
                                            <Text style={styles.UserNameText}>
                                                {item.name}
                                            </Text>

                                            <View style={styles.UserDetailView}>

                                                {joinedCount.length > 0 &&
                                                    <Text>
                                                        <Text style={styles.UserCountText}>
                                                            {joinedCount.length + ((joinedCount.length > 1) ? " users" : " user") + " joined "}
                                                            <Text style={styles.UserFriendsText}>
                                                                {"(" + joinded + ")"}
                                                            </Text>
                                                        </Text>
                                                    </Text>

                                                }
                                                {inviteCount.length > 0 &&
                                                    <Text>
                                                        <Text style={styles.UserCountText}>
                                                            {inviteCount.length + ((inviteCount.length > 1) ? " users" : " user") + " invited "}
                                                            <Text style={styles.UserFriendsText}>
                                                                {"(" + invite + ")"}
                                                            </Text>
                                                        </Text>
                                                    </Text>

                                                }
                                                {item.numberOfUnreadMessages > 0 &&
                                                    <View style={styles.MessageCountView}>
                                                        <Text style={styles.MessageCountText}>
                                                            {item.numberOfUnreadMessages}

                                                        </Text>
                                                    </View>

                                                }

                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>

                    }

                    {this.state.Leftmember.length > 0 &&
                        <View style={{ width: '96%', marginHorizontal: '2%', marginVertical: 10 }}>
                            <Text style={{ color: Apptheme, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}> LEFT CONVERSATION</Text>
                            {this.state.Leftmember.map((item, index) => {
                                var inviteCount = [];
                                var joinedCount = []
                                var leftCount = []
                                var invite = "";
                                var joinded = "";
                                var lefted = "";
                                joinedCount = item.members.filter(i => i.status.id == 3)
                                inviteCount = item.members.filter(i => i.status.id == 1)
                                leftCount = item.members.filter(i => i.status.id == 5)
                                joinded = this.setMemberNames(joinedCount);
                                invite = this.setMemberNames(inviteCount);
                                lefted = this.setMemberNames(lefted);
                                return (
                                    <TouchableOpacity onPress={() => this.viewMessageDetail(item)} key={index} style={styles.ChatBoxView}>
                                        <View style={styles.UserImageView}>
                                            {
                                                Utilities.stringIsEmpty(item.owner.thumbUrl) ?
                                                    <View style={styles.ImageIconView}>
                                                        <FontAwesome name="user" size={40} color={Apptheme} />
                                                    </View>
                                                    :
                                                    <Image
                                                        style={styles.UserImage}
                                                        source={{ uri: item.owner.thumbUrl }}
                                                    />
                                            }

                                        </View>
                                        <View style={{ width: '100%', justifyContent: 'center', flex: 1, overflow: 'hidden' }}>
                                            <Text style={styles.UserNameText}>
                                                {item.name}
                                            </Text>

                                            <View style={styles.UserDetailView}>

                                                {leftCount.length > 0 &&
                                                    <Text>
                                                        <Text style={styles.UserCountText}>
                                                            <Text style={[styles.UserFriendsText, { color: "red" }]}>
                                                                You have left this conversation
                                                            </Text>
                                                        </Text>
                                                    </Text>

                                                }


                                                {joinedCount.length > 0 &&
                                                    <Text>
                                                        <Text style={styles.UserCountText}>
                                                            {joinedCount.length + ((joinedCount.length > 1) ? " users" : " user") + " joined "}
                                                            <Text style={styles.UserFriendsText}>
                                                                {"(" + joinded + ")"}
                                                            </Text>
                                                        </Text>
                                                    </Text>

                                                }
                                                {inviteCount.length > 0 &&
                                                    <Text>
                                                        <Text style={styles.UserCountText}>
                                                            {inviteCount.length + ((inviteCount.length > 1) ? " users" : " user") + " invite "}
                                                            <Text style={styles.UserFriendsText}>
                                                                {"(" + invite + ")"}
                                                            </Text>
                                                        </Text>
                                                    </Text>

                                                }
                                                {item.numberOfUnreadMessages > 0 &&
                                                    <View style={styles.MessageCountView}>
                                                        <Text style={styles.MessageCountText}>
                                                            {item.numberOfUnreadMessages}

                                                        </Text>
                                                    </View>

                                                }

                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>

                    }




                    {/* <View style={{ width: '96%', marginHorizontal: '2%', marginVertical: 10 }}>
                        <FlatList
                            data={this.state.myConversation}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity onPress={() => this.viewMessageDetail(item)} key={index} style={styles.ChatBoxView}>
                                    <View style={styles.UserImageView}>
                                        {
                                            Utilities.stringIsEmpty(item.owner.thumbUrl) ?
                                                <View style={styles.ImageIconView}>
                                                    <FontAwesome name="user" size={40} color={Apptheme} />
                                                </View>
                                                :
                                                <Image
                                                    style={styles.UserImage}
                                                    source={{ uri: item.owner.thumbUrl }}
                                                />
                                        }

                                    </View>
                                    <View style={{ width: '100%', marginTop: 15, flex: 1, overflow: 'hidden' }}>
                                        <Text style={styles.UserNameText}>
                                            {item.name}
                                        </Text>

                                        <View style={styles.UserDetailView}>
                                            <Text style={styles.UserCountText}>
                                                {`${item.members.length} users joined `}
                                                <Text style={styles.UserFriendsText}>
                                                    ({
                                                        this.setMemberNames(item.members)
                                                    })
                                    </Text>


                                            </Text>
                                            {
                                                item.numberOfUnreadMessages > 0 &&
                                                <View style={styles.MessageCountView}>
                                                    <Text style={styles.MessageCountText}>
                                                        {item.numberOfUnreadMessages}
                                                    </Text>
                                                </View>

                                            }

                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View> */}
                </ScrollView>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.isModal}
                    onRequestClose={() => {
                        console.warn("Modal has been closed.");
                        this.editSetting()
                    }}

                >
                    <TouchableOpacity onPress={() => this.editSetting()} style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', height: '100%', position: 'absolute', width: '100%' }}>
                    </TouchableOpacity>
                    <SafeAreaView style={{ elevation: 10, backgroundColor: '#fff', borderRadius: 5, top: (this.state.isKeyboard) ? 60 : 150, height: 300, width: '80%', marginHorizontal: "10%", position: 'absolute' }}>
                        <ScrollView keyboardShouldPersistTaps='handled'>
                            <View style={{ padding: 10, }}>
                                <Text style={{ fontSize: 20, color: darkText, fontWeight: 'bold' }}>
                                    Message a user
                                    </Text>

                                <Text style={{ fontSize: 16, paddingVertical: 5, color: darkText, }}>
                                    To message another user, just enter their registration number below.
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
                                <TouchableOpacity disabled={this.state.registerNo.length == 0} onPress={() => this.searchRegistration()} style={styles.Modalbtn}>
                                    <Text style={[styles.ModalBtnText, { opacity: (this.state.registerNo.length == 0) ? 0.4 : 1 }]}>MESSAGE USER</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.createGroup()} style={styles.Modalbtn}>
                                    <Text style={styles.ModalBtnText}>CREATE GROUP</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.editSetting()} style={styles.Modalbtn}>
                                    <Text style={styles.ModalBtnText}>CANCEL</Text>
                                </TouchableOpacity>
                            </View >

                        </ScrollView>
                    </SafeAreaView>
                </Modal >

                {this.state.isInviteModal &&


                    <InviteGroup

                        inviteModal={this.inviteModal}
                        confromInvitation={this.confromInvitation}

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
        borderBottomColor: "#d2d2d2",
        borderBottomWidth: 1,
        marginVertical: 5,
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
        // flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    UserNameText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Apptheme
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
        position: 'absolute',
        right: 10,
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
        height: 35, margin: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'
    },
    ModalBtnText: {
        color: Apptheme
    }
})