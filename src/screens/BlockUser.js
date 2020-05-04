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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Constants from "../helpers/Constants";
import * as Utilities from "../helpers/Utilities";
import * as MessagesService from '../services/Messages';
import Storage from '../helpers/Storage';
import Labels from "../languages/Labels";

import Topbar from '../components/Topbar';
import CommonStyle, { Apptheme, lightText, lightBg, darkText, LinearColor, linkText } from '../helpers/CommponStyle';

export default class BlockUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: true,
            List: []
        }
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            this.GetBlockUser()

        })

    }

    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
            this.setState({
                isLoad: true,
                List: []
            })
        })
    }

    GetBlockUser = () => {
        try {
            MessagesService.GetBlockUser().then(respose => {
                if (respose) {
                    if (respose.success) {
                        this.state.List = respose.users
                        console.log("List", this.state.List);
                        this.setState({
                            List: this.state.List,
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
            console.log(" GetBlockUser error", e.message)
        }
    }
    UnBlockUsers = (user) => {
        try {
            let params = {
                userId: user.userId
            }
            MessagesService.UnBlockUsers(params).then(respose => {
                console.log("respose", respose);
                if (respose) {
                    if (respose.success) {
                        this.props.navigation.goBack();
                    }
                }
            })
        }
        catch (e) {
            console.log('UnBlockUsers Exception', e);
            this.props.navigation.goBack();
        }
    }
    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar ParentPage="Black User" navigation={this.props} />

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
                        <FlatList
                            data={this.state.List}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity
                                    onPress={() => this.UnBlockUsers(item)}
                                    key={index} style={styles.ChatBoxView}>
                                    <View style={styles.UserImageView}>
                                        {
                                            Utilities.stringIsEmpty(item.imageUrl) ?
                                                <View style={styles.ImageIconView}>
                                                    <FontAwesome name="user" size={40} color={Apptheme} />
                                                </View>
                                                :
                                                <Image
                                                    style={styles.UserImage}
                                                    source={{ uri: item.imageUrl }}
                                                />
                                        }

                                    </View>
                                    <View style={{ width: '50%', marginTop: 30 }}>
                                        <Text style={styles.UserNameText}>
                                            {item.name}
                                        </Text>

                                        <View style={styles.UserDetailView}>



                                        </View>
                                    </View>
                                    <View style={[styles.UserImageView,]}>
                                        <FontAwesome name="unlock-alt" size={24} color={Apptheme} />
                                        <Text style={{ fontSize: 12 }}>Unblock User</Text>
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
        flexDirection: 'row',
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
    ImageIconView: {
        borderColor: "#d2d2d2",
        borderWidth: 1,
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        borderRadius: 50
    }
})