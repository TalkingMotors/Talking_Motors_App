import React from 'react';
import {
    ScrollView,
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import LinearGradient from 'react-native-linear-gradient';
import Constants from "../helpers/Constants";
import * as Utilities from "../helpers/Utilities";
import * as MessagesService from '../services/Messages';
import Storage from '../helpers/Storage';
import Labels from "../languages/Labels";

import Topbar from '../components/Topbar';
import CommonStyle, { Apptheme, lightText, lightBg, darkText, LinearColor, linkText } from '../helpers/CommponStyle';

//import { FluidNavigator, Transition } from '../../lib';
export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: true,
            myConversation: []
        }
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            this.getMyConversations()

        })

    }
    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
            this.setState({
                isLoad: true,
                myConversation: []
            })
        })
    }
    getMyConversations = () => {
        try {
            MessagesService.MyConversations().then(respose => {
                if (respose) {
                    if (respose.success) {
                        this.state.myConversation = respose.conversations.reverse()
                        console.log("myConversation", this.state.myConversation);
                        this.setState({
                            myConversation: this.state.myConversation,
                            isLoad: false
                        })
                    }
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
                    memberNamesCSV = `${memberNamesCSV}, ${member.user.nickname}`
                }
            });
            return memberNamesCSV;
        }
        catch (e) {
            console.log("get conversation error", e.message)
        }
    }

    viewMessageDetail = (item) => {
        console.log("item", item);
        this.props.navigation.navigate("Messenger", { conversationId: item.id })
    }

    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar ParentPage="Message" navigation={this.props} />

                {this.state.isLoad &&
                    <View style={styles.menuLoaderView}>
                        <ActivityIndicator
                            color="#ed0000"
                            size="large"
                        />
                    </View>
                }
                <ScrollView style={{ paddingBottom: 0, }}>
                    <View style={{ width: '96%', marginHorizontal: '2%', marginVertical: 10 }}>


                        {/* {this.state.myConversation.map((conversation, index) => {
                            return (
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Messenger")} key={index} style={styles.ChatBoxView}>
                                    <View style={styles.UserImageView}>
                                        <Image
                                            style={styles.UserImage}
                                            source={require('../images/userImage.jpg')}
                                        />
                                    </View>
                                    <View style={styles.UserDetailView}>
                                        <Text style={styles.UserNameText}>
                                            {conversation.members.length}
                                            users joined
                                        </Text>

                                        <Text style={styles.UserCountText}>
                                            {conversation.count}
                                            <Text style={styles.UserFriendsText}>
                                                {conversation.friends} 
                                            </Text>
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })} */}

                        <FlatList
                            data={this.state.myConversation}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity onPress={() => this.viewMessageDetail(item)} key={index} style={styles.ChatBoxView}>
                                    <View style={styles.UserImageView}>
                                        {
                                            Utilities.stringIsEmpty(item.owner.thumbUrl) ?
                                                <Image
                                                    style={styles.UserImage}
                                                    source={require('../images/userImage.jpg')}
                                                />
                                                :
                                                <Image
                                                    style={styles.UserImage}
                                                    source={{ uri: item.owner.thumbUrl }}
                                                />
                                        }

                                    </View>
                                    <View >
                                        <Text style={styles.UserNameText}>
                                            {item.name}
                                        </Text>
                                    </View>
                                    <View style={styles.UserDetailView}>
                                        <Text style={styles.UserCountText}>
                                            {`${item.members.length} users joined `}
                                            <Text style={styles.UserFriendsText}>
                                                ({
                                                    this.setMemberNames(item.members)
                                                })
                                    </Text>
                                            {
                                                item.numberOfUnreadMessages > 0 ?
                                                    <Text style={{ color: "red", fontSize: 16, fontWeight: "bold" }}>
                                                        {item.numberOfUnreadMessages}
                                                    </Text>
                                                    :
                                                    null
                                            }

                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </ScrollView>
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
        flexDirection: 'row'
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
        width: '75%',
        justifyContent: 'center',
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
    }
})