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
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Apptheme, lightText, darkText, LinearColor, lightBg } from '../helpers/CommponStyle';
import Topbar from '../components/Topbar';
import { FluidNavigator, Transition } from '../../lib';
const image = require('../images/userImage.jpg')
const screen_height = Dimensions.get('window').height
export default class Messenger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        // this.props.navigation.navigate('details', { item, index });
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
                                    <View style={styles.SendMessageView}>
                                        <View style={styles.SendMessageBox}>
                                            <Text style={styles.SendMessageTextTime}>
                                                12:04
                                        </Text>
                                            <Text style={styles.SendMessageText}>
                                                Assalam o alekum how are you bro where are you from
                                         </Text>
                                        </View>
                                    </View>

                                    <View style={styles.ReceivedMessageView}>
                                        <Text style={styles.ReceivedMessageTextTime}>
                                            12:04
                                    </Text>
                                        <Text style={styles.ReceivedMessageText}>
                                            Assalam o alekum how are you bro where are you from
                                    </Text>
                                    </View>

                                    <View style={styles.SendMessageView}>
                                        <View style={styles.SendMessageBox}>
                                            <Text style={styles.SendMessageTextTime}>
                                                12:07
                                        </Text>
                                            <Text style={styles.SendMessageText}>
                                                Hello
                                         </Text>
                                        </View>
                                    </View>

                                    <View style={styles.ReceivedMessageView}>
                                        <Text style={styles.ReceivedMessageTextTime}>
                                            12:04
                                    </Text>
                                        <Text style={styles.ReceivedMessageText}>
                                            Assalam o alekum how are you bro where are you from
                                    </Text>
                                    </View>


                                    <View style={styles.SendMessageView}>
                                        <View style={styles.SendMessageBox}>
                                            <Text style={styles.SendMessageTextTime}>
                                                12:07
                                        </Text>
                                            <Text style={styles.SendMessageText}>
                                                Find New Design
                                         </Text>
                                        </View>
                                    </View>

                                    <View style={styles.ReceivedMessageView}>
                                        <Text style={styles.ReceivedMessageTextTime}>
                                            12:04
                                    </Text>
                                        <Text style={styles.ReceivedMessageText}>
                                            Its Fine
                                    </Text>
                                    </View>

                                    <View style={styles.ReceivedMessageView}>
                                        <Text style={styles.ReceivedMessageTextTime}>
                                            12:04
                                    </Text>
                                        <Text style={styles.ReceivedMessageText}>
                                            Assalam o alekum how are you bro where are you from
                                    </Text>
                                    </View>


                                    <View style={styles.SendMessageView}>
                                        <View style={styles.SendMessageBox}>
                                            <Text style={styles.SendMessageTextTime}>
                                                12:07
                                        </Text>
                                            <Text style={styles.SendMessageText}>
                                                Find New Design
                                         </Text>
                                        </View>
                                    </View>

                                    <View style={styles.ReceivedMessageView}>
                                        <Text style={styles.ReceivedMessageTextTime}>
                                            12:04
                                    </Text>
                                        <Text style={styles.ReceivedMessageText}>
                                            Its Fine
                                    </Text>
                                    </View>

                                    <View style={styles.ReceivedMessageView}>
                                        <Text style={styles.ReceivedMessageTextTime}>
                                            12:04
                                    </Text>
                                        <Text style={styles.ReceivedMessageText}>
                                            Assalam o alekum how are you bro where are you from
                                    </Text>
                                    </View>


                                    <View style={styles.SendMessageView}>
                                        <View style={styles.SendMessageBox}>
                                            <Text style={styles.SendMessageTextTime}>
                                                12:07
                                        </Text>
                                            <Text style={styles.SendMessageText}>
                                                Find New Design
                                         </Text>
                                        </View>
                                    </View>

                                    <View style={styles.ReceivedMessageView}>
                                        <Text style={styles.ReceivedMessageTextTime}>
                                            12:04
                                    </Text>
                                        <Text style={styles.ReceivedMessageText}>
                                            Its Fine
                                    </Text>
                                    </View>

                                    <View style={styles.ReceivedMessageView}>
                                        <Text style={styles.ReceivedMessageTextTime}>
                                            12:04
                                    </Text>
                                        <Text style={styles.ReceivedMessageText}>
                                            Assalam o alekum how are you bro where are you from
                                    </Text>
                                    </View>


                                    <View style={styles.SendMessageView}>
                                        <View style={styles.SendMessageBox}>
                                            <Text style={styles.SendMessageTextTime}>
                                                12:07
                                        </Text>
                                            <Text style={styles.SendMessageText}>
                                                Find New Design
                                         </Text>
                                        </View>
                                    </View>

                                    <View style={styles.ReceivedMessageView}>
                                        <Text style={styles.ReceivedMessageTextTime}>
                                            12:04
                                    </Text>
                                        <Text style={styles.ReceivedMessageText}>
                                            Its Fine
                                    </Text>
                                    </View>

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
                        />
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