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
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Apptheme, lightText, darkText, LinearColor, lightBg } from '../helpers/CommponStyle';
import Topbar from '../components/Topbar';

import Constants from "../helpers/Constants";
import * as Utilities from "../helpers/Utilities";
import * as MessagesService from '../services/Messages';
import * as VehicleService from '../services/Vehicle';
import Storage from '../helpers/Storage';
import Labels from "../languages/Labels";

const image = require('../images/userImage.jpg')
const screen_height = Dimensions.get('window').height
export default class Messenger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            conversationId : 0,
            conversationDetail: [],
            messages: [],
            userId: Storage.userData.userId,
            sendButtonVisible: false,
            typeMessage: '',
            vehicleId: 0,
            vrn: "",
            userIds: {}
        }
    }
    UNSAFE_componentWillMount() {
        this.state.conversationId = this.props.navigation.state.params.conversationId
        console.log("ikm",this.state.conversationId)
        this.setState({
            conversationId: this.state.conversationId
        })
        this.getConverationDetail(this.state.conversationId);

    }

    getConverationDetail = (id) => {
        try{
            MessagesService.GetConversationDetail(id).then(respose => {
                if(respose){
                    if(respose.success){
                        this.state.conversationDetail = respose.conversation
                        this.state.messages = respose.conversation.messages.reverse()
                        console.log("ikm",this.state.conversationDetail)
                        this.state.vrn = this.state.conversationDetail.name
                        //this.getVehicleDetailBy(this.state.vrn)
                        //this.getUserIds(this.state.conversationDetail.members);
                        this.setState({
                            conversationDetail : this.state.conversationDetail,
                            messages: this.state.messages
                        })
                    }
                }
             })
          }
          catch(e){
              console.log("get conversation error", e.message)
          }
    }
    getVehicleDetailBy = async (vrn) => {
        try{
            var response = await VehicleService.getVehicleBy(vrn)
            if (response && response.success) {
               this.state.vehicleId = response.vehicle.id
            }
            
        }
        catch(e){
            console.log("getVehicleDetailBy", e.message)
        }
        
    }
    getUserIds = (members) =>{
        var userIds = []
        members.forEach(member =>{
            if(this.state.userId != member.user.userId){
                userIds.push({ userId : member.user.userId})
            }
            
        })
        this.state.userIds = userIds;
        console.log("userids", this.state.userIds)
    }
    onChangeText = (key, value) => {
        if(Utilities.stringIsEmpty(value)) {
            this.setState({ [key]: value, sendButtonVisible:false })
        }else{
            this.setState({ [key]: value, sendButtonVisible:true })
        }
        
    }
    sendMessage = () =>{
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


    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar ParentPage="Messenger" username={"Maaz"} image={image} navigation={this.props} />
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
                            <View>
                            {
                                item.user.userId != this.state.userId ?
                                    <View style={styles.ReceivedMessageView}>
                                        <Text style={styles.ReceivedMessageTextTime}>
                                            {item.time}
                                                        </Text>
                                        <Text style={styles.ReceivedMessageText}>
                                            {item.message}
                                                        </Text>
                                    </View>
                                    :
                                    <View style={styles.SendMessageView}>
                                        <View style={styles.SendMessageBox}>
                                            <Text style={styles.SendMessageTextTime}>
                                            {item.time}
                                                        </Text>
                                            <Text style={styles.SendMessageText}>
                                            {item.message}
                                                        </Text>
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
                    <View style={{ width: '85%', justifyContent: 'center', }}>

                        <TextInput
                            placeholderTextColor="#333"
                            style={{ backgroundColor: '#d2d2d2', width: '96%', borderRadius: 60, paddingLeft: 20, height: 40 }}
                            placeholder="Write message"
                            value={this.state.typeMessage}
                            onChangeText={val => { this.onChangeText('typeMessage', val) }}
                        />
                        {
                    this.state.sendButtonVisible ? 
                    <TouchableOpacity onPress={()=> {this.sendMessage()}} style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}>
                                      <Text>Send</Text>  
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
    },
    MessengerViewList: {
        width: '96%',
        marginHorizontal: '2%',
        marginVertical: 10
    },
    SendMessageView: {
        width: '100%',
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
        width: '80%',
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
    }
})