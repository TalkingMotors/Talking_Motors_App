
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
import * as Utilities from "../helpers/Utilities";
import * as VehicleService from '../services/Vehicle';
import VehicleImage from '../components/VehicleImage';
export default class SearchResultVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            result: 0

        }

    }

    componentWillMount() {
        this.setState({
            list: this.props.navigation.state.params.listVehicle,
            result: this.props.navigation.state.params.resultcount,
        })
    }


    detail = (item, index) => {
        // alert("AAaa");
        this.props.navigation.navigate('Detail', { item: item, index: index, parent: "talk" });
    }
    flatListEmptyMessage = () => {
        if (this.state.list == [] || this.state.list.length == 0) {
            return (
                <View style={{ width: '96%',marginHorizontal:'2%',height:450, justifyContent: 'center', alignItems: 'center' }}>
                    <FontAwesome name="car" size={80} style={{marginVertical:20}} color={Apptheme} />
                    <Text style={{color:Apptheme,fontSize:20,fontWeight:'bold'}}>
                        VEHICLE SEARCH
                    </Text>
                    <Text style={{paddingTop:10}}>
                        No vehicle found
                    </Text>
                </View>
            )
        }
    }
    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar ParentPage="Vehicle Search" navigation={this.props} />
                <ScrollView>
                    <View style={{ marginHorizontal: '2%', borderRadius: 5, paddingTop: 10, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                        <Text style={{ fontSize: 18, color: Apptheme, fontWeight: 'bold' }}>
                            {this.state.result} results
                        </Text>
                    </View>
                    <View style={{width:'100%',height:'100%'}}>
                    <FlatList
                        data={this.state.list}
                        listKey={(item, index) => 'recent-' + index.toString()}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={this.flatListEmptyMessage}
                        shouldItemUpdate={this.state.loadMore}
                        renderItem={({ item, index }) =>
                            (
                                <View key={index}>

                                    <LinearGradient
                                        colors={LinearColor} style={{ borderRadius: 10, borderWidth: 1, borderColor: Apptheme, elevation: 3, marginVertical: 10, width: '94%', marginHorizontal: '3%', }}>
                                        <TouchableOpacity
                                            onPress={this.detail.bind(this, item, index)}
                                            style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', height: 120, }}>
                                            <View style={{ width: '35%', alignItems: 'center', justifyContent: 'center' }}>
                                                <VehicleImage param={item.images} />
                                            </View>
                                            <View style={{ width: '65%', justifyContent: 'center' }}>
                                                <Text style={{ color: lightText, textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>
                                                    {item.make + " " + item.model}
                                                </Text>
                                                <Text style={{ color: lightText, fontSize: 12, textAlign: 'center', paddingHorizontal: 10 }}>
                                                    {item.engineSize + " " + item.derivative}
                                                </Text>
                                                <Text style={{ color: lightText, fontSize: 12, textAlign: 'center', paddingHorizontal: 10 }}>
                                                    {item.buildYear + " . " +
                                                        ((item.doorCount > 0) ? item.doorCount + " doors . " : "")
                                                        + item.transmissionType + " . "
                                                        + item.engineSize + " . "
                                                        + item.fuelType
                                                    }
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </View>
                            )}

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