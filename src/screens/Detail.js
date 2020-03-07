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
export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        // this.props.navigation.navigate('details', { item, index });
    }

    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar ParentPage="Detail" navigation={this.props} />
                <ScrollView style={{ paddingBottom: 20 }}>
                    <View style={{ width: '100%', height: 270, justifyContent: 'center', alignItems: 'center' }}>
                        <Transition shared={`image${this.props.navigation.state.params.index}`}>
                            <Image
                                resizeMode="contain"
                                style={{ width: '100%', height: '100%' }}
                                source={this.props.navigation.state.params.item.image}
                            />
                        </Transition>

                    </View>
                    <View>
                        <Text style={{ textAlign: 'center', color: Apptheme, fontWeight: 'bold', fontSize: 16, paddingTop: 10 }}>
                            {this.props.navigation.state.params.item.title}
                        </Text>
                    </View>

                    <View>
                        <Text style={{ textAlign: 'center', color: Apptheme, fontWeight: 'bold', fontSize: 16, paddingVertical: 5 }}>
                            £600.00
                        </Text>
                    </View>


                    <View style={[styles.MainItemView, { backgroundColor: '#FFF3E0', height: 50 }]}>
                        <View style={styles.ItemViewBox1}>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: "center" }}>
                                <Ionicons name="logo-model-s" size={16} color="#777" />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center', }}>
                                <Text style={styles.TextHead}>
                                    Registration No
                                </Text>
                                <Text style={styles.TextTail}>
                                    H5GTT
                                </Text>
                            </View>
                        </View>
                        <View style={styles.ItemViewBox1}>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: "center" }}>
                                <FontAwesome name="dashboard" size={16} color="#777" />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center', }}>
                                <Text style={styles.TextHead}>
                                    Make
                            </Text>
                                <Text style={styles.TextTail}>
                                    PROSCHE
                            </Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.MainItemView, { backgroundColor: '#FFF', height: 50 }]}>
                        <View style={styles.ItemViewBox1}>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: "center" }}>
                                <MaterialCommunityIcons name="car-door" size={16} color="#777" />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center', }}>
                                <Text style={styles.TextHead}>
                                    Model
                            </Text>
                                <Text style={styles.TextTail}>
                                    CAYENNE V6 D
                                </Text>
                            </View>
                        </View>
                        <View style={styles.ItemViewBox1}>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: "center" }}>
                                <MaterialCommunityIcons name="seat" size={16} color="#777" />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center', }}>
                                <Text style={styles.TextHead}>
                                    Year
                                </Text>
                                <Text style={styles.TextTail}>
                                    2012
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.MainItemView, { backgroundColor: '#FFF3E0', height: 50 }]}>
                        <View style={styles.ItemViewBox1}>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: "center" }}>
                                <Ionicons name="logo-model-s" size={16} color="#777" />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center', }}>
                                <Text style={styles.TextHead}>
                                    Trasnmission
                            </Text>
                                <Text style={styles.TextTail}>
                                    Automatic
                            </Text>
                            </View>
                        </View>
                        <View style={styles.ItemViewBox1}>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: "center" }}>
                                <FontAwesome name="dashboard" size={16} color="#777" />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center', }}>
                                <Text style={styles.TextHead}>
                                    Engine
                            </Text>
                                <Text style={styles.TextTail}>
                                    3.00 Diesel
                            </Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.MainItemView, { backgroundColor: '#FFF', height: 50 }]}>
                        <View style={styles.ItemViewBox1}>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: "center" }}>
                                <MaterialCommunityIcons name="car-door" size={16} color="#777" />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center', }}>
                                <Text style={styles.TextHead}>
                                    Doors
                            </Text>
                                <Text style={styles.TextTail}>
                                    5
                            </Text>
                            </View>
                        </View>
                        <View style={styles.ItemViewBox1}>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: "center" }}>
                                <MaterialCommunityIcons name="seat" size={16} color="#777" />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center', }}>
                                <Text style={styles.TextHead}>
                                    Seats
                                </Text>
                                <Text style={styles.TextTail}>
                                    5
                                </Text>
                            </View>
                        </View>
                    </View>


                    <View style={[styles.MainItemView, { backgroundColor: '#FFF3E0', height: 50 }]}>
                        <View style={styles.ItemViewBox1}>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: "center" }}>
                                <Ionicons name="logo-model-s" size={16} color="#777" />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center', }}>
                                <Text style={styles.TextHead}>
                                    Body Type
                            </Text>
                                <Text style={styles.TextTail}>
                                    Estate
                            </Text>
                            </View>
                        </View>
                        <View style={styles.ItemViewBox1}>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: "center" }}>
                                <FontAwesome name="dashboard" size={16} color="#777" />
                            </View>
                            <View style={{ width: '80%', justifyContent: 'center', }}>
                                <Text style={styles.TextHead}>
                                    Color
                            </Text>
                                <Text style={styles.TextTail}>
                                    Black
                            </Text>
                            </View>
                        </View>
                    </View>


                   
                    <View style={{ width: '100%', paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: Apptheme, fontSize: 16 }}>MORE DESCRPTION</Text>
                    </View>

                    <View style={{ width: '100%', paddingHorizontal: 20 }}>
                        <Text>
                            V6 Turbo Diesel
                        </Text>
                    </View>

                    <LinearGradient colors={LinearColor} style={{ borderRadius: 10, justifyContent: 'center', width: '96%', marginHorizontal: '2%', height: 50, marginVertical: 20 }} >
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate("Message")}>

                            <Feather
                                // onPress={() => this.props.navigation.navigation.goBack()}
                                name="message-circle" color={lightText} size={22} style={{ paddingHorizontal: 10 }} />
                            <Text style={{ fontWeight: 'bold', textAlign: 'center', color: lightText }}>VIEW MESSAGES</Text>
                        </TouchableOpacity>
                    </LinearGradient>


                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ParentView: {
        width: '100%',
        // height: '100%',
        backgroundColor: lightBg,
        paddingBottom: 50
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
        color:"#333",
        fontSize: 12
        // fontWeight: 'bold'
    },
    TextTail: {
        color:"#777",
        fontSize: 14
    }
})