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
        }
        // this.props.navigation.navigate('details', { item, index });
    }

    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar ParentPage="Message" navigation={this.props} />
                <ScrollView style={{ paddingBottom: 0, }}>

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
    }
})