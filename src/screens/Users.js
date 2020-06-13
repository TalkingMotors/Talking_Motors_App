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
var screenheight= Dimensions.get('window').height;

export default class Users extends React.Component {
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
            let members=this.props.navigation.state.params.members;
            this.setState({
                isLoad: false,
                List: members
            })
        }
        catch(e){
            console.log("Exception",e);
        }
    }
   

    flatListEmptyMessage = () => {
        if (this.state.List.length == 0 ) {
            return (
            <View style={{justifyContent:'center',alignItems:'center',height:screenheight-120,width:'100%',}}>
                 <FontAwesome name="user" size={60} color={Apptheme} />
                    <Text style={{fontSize:24,color:Apptheme,fontWeight:'bold'}}>BLOCKED USERS</Text>
                 <Text style={styles.noRecordFoundText}>No blocked users to display</Text>
            </View>
      ) }
    }

    UsersVehicle =(item)=>{
        item.user.userID=item.user.userId
        this.props.navigation.navigate("UsersVehicle",{
            userId:item.user
        })

    }
   
    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar  ParentPage="Users" navigation={this.props} />

                {this.state.isLoad &&
                    <View style={styles.menuLoaderView}>
                        <ActivityIndicator
                            color="#ed0000"
                            size="large"
                        />
                    </View>
                }
                <ScrollView >
                    <View style={{ width: '96%',height:screenheight, marginHorizontal: '2%', marginVertical: 10 }}>
                        <Text style={{color:Apptheme,textAlign:'center',fontSize:20,fontWeight:'bold'}}> JOINED</Text>
                      
                        <FlatList
                            data={this.state.List}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity
                                    onPress={() => this.UsersVehicle(item)}
                                    key={index} style={styles.ChatBoxView}>
                                    <View style={styles.UserImageView}>
                                        {
                                            Utilities.stringIsEmpty(item.user.imageUrl) ?
                                                <View style={styles.ImageIconView}>
                                                    <FontAwesome name="user" size={40} color={Apptheme} />
                                                </View>
                                                :
                                                <Image
                                                    style={styles.UserImage}
                                                    source={{ uri: item.user.imageUrl }}
                                                />
                                        }

                                    </View>
                                    <View style={{ width: '50%', marginTop: 30 }}>
                                        <Text style={styles.UserNameText}>
                                            {item.user.name}
                                        </Text>

                                        <View style={styles.UserDetailView}>



                                        </View>
                                    </View>
                                    {Storage.userData.userId == item.user.userId &&
                                    <View style={[styles.UserImageView,]}>
                                        <FontAwesome name="unlock-alt" size={24} color={Apptheme} />
                                     </View>
                                  }
                                </TouchableOpacity>
                            }
                           
                            ListEmptyComponent={this.flatListEmptyMessage}
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
        height: 90,
        flexDirection: 'row',
        borderBottomWidth:1,
        borderBottomColor:"#d2d2d2"
    },
    UserImageView: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    UserImage: {
        borderColor:Apptheme,
        borderWidth:1,
        width: 75,
        height: 75,
        borderRadius: 50
    },
    UserDetailView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    UserNameText: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop:5,
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
    noRecordFoundText :{ 
        textAlign:'center',
        fontSize:14,
        paddingTop:5,
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