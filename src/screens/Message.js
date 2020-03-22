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
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Apptheme, lightText, darkText, LinearColor, lightBg } from '../helpers/CommponStyle';
import Topbar from '../components/Topbar';
import { FluidNavigator, Transition } from '../../lib';
export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listUser: [
                { id: 1, name: "H5GTT", count: "2 users joined", friends: "(You, Dean)" },
                { id: 2, name: "ABCDE", count: "3 users joined", friends: "(You, Almas, Dean)" },
                { id: 3, name: "XYZ", count: "2 users joined", friends: "(You, Maaz)" },
                { id: 4, name: "John", count: "2 users joined", friends: "(You, Maaz, Dean)" },
                { id: 5, name: "H5GTT", count: "2 users joined", friends: "(You, Dean)" },
                { id: 1, name: "H5GTT", count: "2 users joined", friends: "(You, Dean)" },
                { id: 2, name: "ABCDE", count: "3 users joined", friends: "(You, Almas, Dean)" },
                { id: 3, name: "XYZ", count: "2 users joined", friends: "(You, Maaz)" },
                { id: 4, name: "John", count: "2 users joined", friends: "(You, Maaz, Dean)" },
                { id: 5, name: "H5GTT", count: "2 users joined", friends: "(You, Dean)" },
            ]
        }
        // this.props.navigation.navigate('details', { item, index });
    }

    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar ParentPage="Message" navigation={this.props} />
                <ScrollView style={{ paddingBottom: 0, }}>
                    <View style={{ width: '96%', marginHorizontal: '2%', marginVertical: 10 }}>


                        {this.state.listUser.map((users, index) => {
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
                                            {users.name}
                                        </Text>

                                        <Text style={styles.UserCountText}>
                                            {users.count}
                                            <Text style={styles.UserFriendsText}>
                                                {users.friends}
                                            </Text>
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}


                    </View>


                    {/* <View style={{ flexDirection: 'row', marginTop: 0, width: '96%', marginHorizontal: '2%', height: 90, borderRadius: 10, backgroundColor: '#FFF' }}>
                        <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center', }}>
                            <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: Apptheme }}>

                            </View>
                        </View>
                        <View style={{ paddingLeft: 10, width: '75%', justifyContent: 'center' }}>
                            <Text style={{ color: Apptheme }}>H5GTT</Text>
                            <Text style={{ color: '#333' }}>2 users joined
                                <Text style={{ color: "#777" }}>(You , Almas)</Text>
                            </Text>

                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10, width: '96%', marginHorizontal: '2%', height: 90, borderRadius: 10, backgroundColor: '#FFF3E0' }}>
                        <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center', }}>
                            <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: Apptheme }}>

                            </View>
                        </View>
                        <View style={{ paddingLeft: 10, width: '75%', justifyContent: 'center' }}>
                            <Text style={{ color: Apptheme }}>H5GTT</Text>
                            <Text style={{ color: '#333' }}>2 users joined
                                <Text style={{ color: "#777" }}>(You , Almas)</Text>
                            </Text>

                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 0, width: '96%', marginHorizontal: '2%', height: 90, borderRadius: 10, backgroundColor: '#FFF' }}>
                        <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center', }}>
                            <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: Apptheme }}>

                            </View>
                        </View>
                        <View style={{ paddingLeft: 10, width: '75%', justifyContent: 'center' }}>
                            <Text style={{ color: Apptheme }}>H5GTT</Text>
                            <Text style={{ color: '#333' }}>2 users joined
                                <Text style={{ color: "#777" }}>(You , Almas)</Text>
                            </Text>

                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10, width: '96%', marginHorizontal: '2%', height: 90, borderRadius: 10, backgroundColor: '#FFF3E0' }}>
                        <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center', }}>
                            <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: Apptheme }}>

                            </View>
                        </View>
                        <View style={{ paddingLeft: 10, width: '75%', justifyContent: 'center' }}>
                            <Text style={{ color: Apptheme }}>H5GTT</Text>
                            <Text style={{ color: '#333' }}>2 users joined
                                <Text style={{ color: "#777" }}>(You , Almas)</Text>
                            </Text>

                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10, width: '96%', marginHorizontal: '2%', height: 90, borderRadius: 10, backgroundColor: '#FFF' }}>
                        <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center', }}>
                            <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: Apptheme }}>

                            </View>
                        </View>
                        <View style={{ paddingLeft: 10, width: '75%', justifyContent: 'center' }}>
                            <Text style={{ color: Apptheme }}>H5GTT</Text>
                            <Text style={{ color: '#333' }}>2 users joined
                                <Text style={{ color: "#777" }}>(You , Almas)</Text>
                            </Text>

                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10, width: '96%', marginHorizontal: '2%', height: 90, borderRadius: 10, backgroundColor: '#FFF3E0' }}>
                        <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center', }}>
                            <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: Apptheme }}>

                            </View>
                        </View>
                        <View style={{ paddingLeft: 10, width: '75%', justifyContent: 'center' }}>
                            <Text style={{ color: Apptheme }}>H5GTT</Text>
                            <Text style={{ color: '#333' }}>2 users joined
                                <Text style={{ color: "#777" }}>(You , Almas)</Text>
                            </Text>

                        </View>
                    </View> */}

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
    }
})