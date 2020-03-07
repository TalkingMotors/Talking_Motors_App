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
import LinearGradient from 'react-native-linear-gradient';
import { Apptheme, lightText, darkText, LinearColor, lightBg } from '../helpers/CommponStyle';
import Topbar from '../components/Topbar';
import { FluidNavigator, Transition } from '../../lib';
export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    id: 1,
                    image: require("../images/dashboard1.png"),
                    title: 'PORSCHE CAYENNE V6 D TIPTRONIC',
                    detail: '2012 | 5 door | Automatic | 3.00L | Diesel',
                    moredetail: 'V6 Turbo Diesel'
                },
                {
                    id: 2,
                    image: require("../images/car.png"),
                    title: 'PORSCHE CAYENNE V6 D TIPTRONIC',
                    detail: '2012 | 5 door | Automatic | 3.00L | Diesel',
                    moredetail: 'V6 Turbo Diesel'
                },
                {
                    id: 3,
                    image: require("../images/dashboard1.png"),
                    title: 'PORSCHE CAYENNE V6 D TIPTRONIC',
                    detail: '2012 | 5 door | Automatic | 3.00L | Diesel',
                    moredetail: 'V6 Turbo Diesel'
                }
            ]
        }
    }
    detail = (item,index) => {
        // alert("AAaa");
        this.props.navigation.navigate('Detail', { item, index });
    }
    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar ParentPage="Dashboard" navigation={this.props} />
                <ScrollView>
                    <LinearGradient colors={LinearColor} style={{ marginHorizontal: '2%', borderRadius: 5, paddingVertical: 10, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                        <Text style={{ fontSize: 18, color: lightText, fontWeight: 'bold' }}>
                            YOUR VEHICLES
                        </Text>
                    </LinearGradient>
                    <FlatList
                        data={this.state.list}
                        listKey={(item, index) => 'recent-' + index.toString()}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        shouldItemUpdate={this.state.loadMore}
                        renderItem={({ item, index }) =>
                            (
                                <View key={index}>

                                    <LinearGradient
                                        colors={LinearColor} style={{ borderRadius: 10, borderWidth: 1, borderColor: Apptheme, elevation: 3, marginVertical: 10, width: '94%', marginHorizontal: '3%', }}>
                                        <TouchableOpacity
                                            onPress={this.detail.bind(this, item,index)}
                                            style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', height: 120, }}>
                                            <View style={{ width: '35%', alignItems: 'center', justifyContent: 'center' }}>
                                                <Transition shared={`image${index}`}>
                                                    <Image
                                                        resizeMode='cover'
                                                        style={{ marginLeft: 2, borderRadius: 20, width: '100%', height: '98%', }}
                                                        source={item.image}
                                                    />
                                                </Transition>
                                            </View>
                                            <View style={{ width: '65%', justifyContent: 'center' }}>
                                                <Text style={{ color: lightText, textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>{item.title}</Text>
                                                <Text style={{ color: lightText, fontSize: 12, textAlign: 'center', paddingHorizontal: 10 }}>
                                                    {item.detail}
                                                </Text>
                                                <Text style={{ color: lightText, fontSize: 12, textAlign: 'center', paddingHorizontal: 10 }}>
                                                    {item.moredetail}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </View>
                            )}

                    />
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
        // backgroundColor: 'lightgray',

    },
    BoxView: {
        borderWidth: 1.2,
        borderRadius: 5,
        borderColor: Apptheme,
        shadowOffset: { width: 50, height: 50 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
        width: '44%',
        marginHorizontal: '3%',
        marginVertical: 5,
        backgroundColor: lightBg,
        justifyContent: 'center'
    },
    UserView: {
        width: '100%',
        height: 150,
        backgroundColor: Apptheme,
        alignItems: 'center'
    },
    UserImageView: {
        borderWidth: 3,
        borderColor: '#ff8f00',
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: lightText,
        alignItems: 'center',
        justifyContent: 'center'
    },
    UserText: {
        color: lightText,
        paddingLeft: 10,
        paddingTop: 10
    },
    MainBoxView: {
        width: '100%',
        backgroundColor: 'lightgray',
        paddingBottom: 10
    },
    ParentBoxView: {
        width: '92%',
        height: 150,
        marginHorizontal: '4%',
        marginTop: -30,
        flexDirection: 'row'
    },
    TextHeader: {
        backgroundColor: Apptheme,
        color: lightText,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24
    },
    TextDetail: {
        paddingTop: 4,
        paddingHorizontal: 2,
        textAlign: 'center',
        fontSize: 14,
        color: darkText
    },
    BoxIcon: {
        textAlign: 'center',
        paddingBottom: 5
    }
})