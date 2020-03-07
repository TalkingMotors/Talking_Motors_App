import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    Image
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import CommponStyle, { GreenBg, Apptheme, lightText, darkText, LinearColor, lightBg } from '../helpers/CommponStyle';
import Topbar from '../components/Topbar';
import PremiumModal from '../components/Premium';
export default class ListingType extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isPremiumModal:false
        }
        this.PremiumModalToggle=this.PremiumModalToggle.bind(this);
    }
    PremiumModalToggle =()=>{
        this.setState({
            isPremiumModal:!this.state.isPremiumModal
        })
    }
    render() {
        return (
            <View>
                <Topbar ParentPage="Select Listing Type" navigation={this.props} />
                <View style={styles.ParentView}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ paddingVertical: 10, fontSize: 20, fontWeight: 'bold' }}>PREMIUM Listing</Text>
                        <Text style={{ textAlign: 'center', color: "#333", paddingHorizontal: 10 }}>
                            A PREMIUM listing gives you these great features designedto help sell your vehicle more quickly.
                        </Text>

                        <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: "#333" }}>
                                -10 photos
                            </Text>
                            <Text style={{ color: "#333" }}>
                                -Unlimited description length
                            </Text>
                            <Text style={{ color: "#333" }}>
                                -Feature selection list
                            </Text>
                            <Text style={{ color: "#333" }}>
                                -Bold ads, placed above FREE ads
                            </Text>
                        </View>

                        <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ paddingHorizontal: 10 }}>
                                Increase your chances of selling your vehicle for just
                            </Text>
                            <Text style={{ paddingHorizontal: 10 }}>
                                $4.99 now for a monts's PREMIUM listing!
                            </Text>
                        </View>
                        <View style={{ width: '94%', marginHorizontal: '3%', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={()=>this.PremiumModalToggle()} style={styles.Button}>
                                <Text style={{ color: lightText }}>PREMIUM LISTING</Text>
                            </TouchableOpacity>
                        </View>


                        <Text style={{ paddingVertical: 10, fontSize: 20, fontWeight: 'bold' }}>Free Listing</Text>
                        <Text style={{ textAlign: 'center', color: "#333", paddingHorizontal: 10 }}>
                            FREE one month listing including one photo and a short description.
                        </Text>

                        <View style={{ width: '94%', marginHorizontal: '3%', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate("ListVehicle")} style={[styles.Button,{backgroundColor:Apptheme}]}>
                                <Text style={{ color: lightText }}>FREE LISTING</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                {this.state.isPremiumModal && 
                <PremiumModal PremiumModalToggle={this.PremiumModalToggle}/>
                }

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
    Button: {
        ...CommponStyle.GradiendButtonView,
        backgroundColor: GreenBg
    }
})