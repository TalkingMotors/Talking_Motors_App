import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Button,
    TouchableOpacity,
    Image,
    StyleSheet

} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import CommponStyle, { Apptheme, lightText, darkText, LinearColor, lightBg } from '../helpers/CommponStyle';
import Topbar from '../components/Topbar';
import {
    TextField,
} from 'react-native-material-textfield';
import * as VehicleService from '../services/Vehicle';
import * as Utilities from "../helpers/Utilities";
export default class ListVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            registerNo:''
        }
    }

    onChangeText = (key, value) => {
        this.setState({ [key]: value, })
    }

    searchVehicleBy = async () => {
        let { registerNo } = this.state
        if (!Utilities.stringIsEmpty(registerNo)) {
            var response = await VehicleService.getVehicleBy(registerNo)
            if (!Utilities.stringIsEmpty(response.vehicle) && response.vehicle.registrationNumber.toLowerCase() == registerNo.toLowerCase()) {
                this.props.navigation.navigate('EditVehicle', { item: response.vehicle });
            }
            else {
                alert("this register no is not valid ");
            }
        }
  }
    render() {
        return (
            <View >
                <Topbar ParentPage="List Vehicle" navigation={this.props} />
                <View style={styles.ParentView}>
                    <View style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={{ width: '100%', height: 200 }}
                            resizeMode='stretch'
                            source={require('../images/banner.jpg')}
                        />
                        <View style={{ position: 'absolute', alignItems: 'center' }}>
                            <Text style={{ color: lightText, fontSize: 20, fontWeight: 'bold' }}>
                                List your vehicle to chat with friends,
                        </Text>
                            <Text style={{ color: lightText, fontSize: 20, fontWeight: 'bold' }}>
                                family and other car enthusiats.
                        </Text>
                            <Text style={{ color: lightText, fontSize: 14, paddingTop: 10, textAlign: 'center' }}>
                                Simple and reliable messaging service to keep in touch and share information
                        </Text>
                        </View>
                    </View>

                    <View style={styles.TextFieldView}>
                        <TextField
                            autoFocus={true}
                            label='Registration Number'
                            fontSize={13}
                            keyboardType='default'
                            tintColor={Apptheme}
                            baseColor={Apptheme}
                            errorColor="red"
                            activeLineWidth={2}
                            autoCapitalize="characters"
                            autoCorrect={false}
                            labelFontSize={13}
                            value={this.state.registerNo}
                            onChangeText={val => {
                                this.onChangeText('registerNo', val.trim())
                            }}
                        />
                    </View>
                    <View style={{width:'94%',marginHorizontal:'3%',justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity  style={styles.GradientButtonView} onPress={() => { this.searchVehicleBy()}}>
                            <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                <Text style={styles.ButtonInnerText}>
                                    AUTO COMPLETE DETAILS
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ParentView: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: lightBg
    },
    TextFieldView: {
        width: '92%',
        marginHorizontal: '4%'
    },
    GradientButtonView: {
        ...CommponStyle.GradiendButtonView
    },
    ButtonInnerText: {
        ...CommponStyle.ButtonInnerText
    }
})