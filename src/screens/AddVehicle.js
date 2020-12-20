import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image,
    StatusBar,
    ActivityIndicator,
    Dimensions,
    Switch,
    Keyboard,
    Modal,
    CheckBox,
    TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Topbar from '../components/Topbar';
import CommponStyle, { Apptheme, lightText, lightBg, darkText, LinearColor, linkText } from '../helpers/CommponStyle';
import { TextField } from 'react-native-material-textfield';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Utilities from "../helpers/Utilities";
import * as UserService from '../services/User';
import Constants from "../helpers/Constants";
import Storage from '../helpers/Storage';
import * as VehicleService from '../services/Vehicle';
import * as VehicleLooks from '../services/SearchVehicleType';
import { GetSpecificVehicle } from './Detail';
import CalenderPicker from '../components/CalenderPicker';
import { StackActions, NavigationActions } from 'react-navigation';
const moment = require('moment-timezone');
// import CalendarPicker from 'react-native-calendar-picker';
export default class AddVehicle extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            postCode: '',
            price: '',
            mileage: '',
            description: '',
            // description: this.props.navigation.state.params.item.description,
            saleSwitch: false,
            image: '',
            allImages: [],
            allData: '',
            isLoader: true,
            PremiumDate: 0,
            allfeatures: [],
            features: [],
            isModal: false,
            insuranceDueDate: '',
            motDueDate: '',
            taxDueDate: '',
            isDate: true,
            insuranceDate: '',
            seletedId: 0,
            isInsurance: false,
            imageData: '',
            param: this.props.navigation.state.params.param,
            display:false


        }
        if(this.state.param == 1){
            this.state.saleSwitch = true
        }
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
            this.componentDidAppear()
        })

        this.addImage = this.addImage.bind(this);
    }
    VehicleLookupAllFeatures = async () => {
        var response = await VehicleLooks.VehicleLookupAllFeatures()
        var allfeatures = response.features
        for (var i = 0; i < allfeatures.length; i++) {
            allfeatures[i].checkBox = false
            for (var j = 0; j < this.state.features.length; j++) {
                if (allfeatures[i].id == this.state.features[j].id) {
                    allfeatures[i].checkBox = true
                }
            }
        }
        this.setState({
            allfeatures: allfeatures,

        })

    }
    componentDidAppear() {
        try {
            let params = this.props.navigation.state.params.item
            // var sortedImage = params.images.sort(function (a, b) { return a.position - b.position });
            let allfeatures = this.props.navigation.state.params.allfeatures
            if (allfeatures == undefined) {
                allfeatures = []
                this.VehicleLookupAllFeatures()
            }
            this.setState({
                allData: params,
                description: params.description,
                postCode: params.postcode,
                price: (params.price > 0) ? params.price : "",
                // saleSwitch: params.sold,
                mileage: (!Utilities.stringIsEmpty(params.userMileage) ? params.userMileage : ""),
                image: '',
                features: params.features,
                PremiumDate: params.PremiumDate,
                allImages: params.images,
                allfeatures: allfeatures,
                insuranceDueDate: (params.insuranceDueDate == null) ? "" : params.insuranceDueDate,
                motDueDate: (params.motDueDate == null) ? "" : params.motDueDate,
                taxDueDate: (params.taxDueDate == null) ? "" : params.taxDueDate,
                isLoader: false
            })
            this.onChangeText('description', params.description)
        }
        catch (e) {
            console.log("componentDidAppear", e)
        }

    }

    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
            // this.setState({
            //     postCode: '',
            //     price: '',
            //     mileage: '',
            //     description: '',
            //     saleSwitch: false,
            //     image: '',
            //     allImages: [],
            //     // allData: '',
            //     isLoader: false,
            //     PremiumDate: 0,
            //     allfeatures: [],
            //     features: [],
            //     isModal: false,
            //     insuranceDueDate: '',
            //     motDueDate: '',
            //     taxDueDate: '',
            //     isDate: true,
            //     insuranceDate: '',
            //     seletedId: 0,
            //     isInsurance: false,


            // })
        })
    }
    onChangeText = (key, value) => {
        this.setState({ [key]: value, })
    }
    toggleSwitch = (value) => {
        this.setState({ saleSwitch: value })
    }

    addImage = (param) => {
        this.setState({
            imageData: param
        })

    }

    navigateToVehicleImage() {
        this.props.navigation.navigate('AddVehicleImage',
            {
                // PremiumDate: this.state.PremiumDate,
                // allImages: this.state.allImages,
                item: this.state.image,
                data: this.props.navigation.state.params.item,
                addImage: this.addImage
            });
    }

    confirmChange = async () => {
        try {
            this.setState({
                isLoader: true
            })
            let param = {
                // id: this.state.allData.id,
                userMileage: this.state.mileage,
                postcode: this.state.postCode,
                description: this.state.description,
                price: this.state.price,
                sold: this.state.saleSwitch,
                insuranceDueDate: this.state.insuranceDueDate,
                motDueDate: this.state.motDueDate,
                taxDueDate: this.state.taxDueDate,
            }
            // console.log("param",param);
            // console.log("this.state.allData",this.state.allData);
            let data = Object.assign({}, param, this.state.allData);
            var response = await VehicleService.addNewVehicle(data)
            if (response.success) {
                if (this.state.imageData != "") {
                    this.state.imageData.vehicleId = response.vehicle.id
                    var res = await VehicleService.InsertVehicleImage(this.state.imageData);
                    if (res.success) {
                        // this.props.navigation.navigate('Detail', { item: response.vehicle, index: 0, parent: "talk" });
                        const resetAction = StackActions.reset({
                            index: 1,
                            actions: [
                            NavigationActions.navigate({ routeName: 'Home' }),
                              NavigationActions.navigate({
                                routeName: 'Detail',
                                params: {  item: response.vehicle, index: 0, parent: "talk"}
                                
                              }),
                            ],
                          });
                          this.props.navigation.dispatch(resetAction);
                   
                   
                    }
                }
                else {
                    const resetAction = StackActions.reset({
                        index: 1,
                        actions: [
                        NavigationActions.navigate({ routeName: 'Home' }),
                          NavigationActions.navigate({
                            routeName: 'Detail',
                            params: {  item: response.vehicle, index: 0, parent: "talk"}
                            
                          }),
                        ],
                      });
                      this.props.navigation.dispatch(resetAction);

                }

            }
            // var response = await VehicleService.UpdateVehicle(param)
            // if (response) {
            //     console.log("response", response);
            //     GetSpecificVehicle(this.state.allData.id)
            //     this.setState({
            //         isLoader: false
            //     })
            //     this.props.navigation.goBack();
            // }
        }
        catch (e) {
            this.setState({
                isLoader: false
            })
            console.log("confirmChange EditVehicle", e);
            this.props.navigation.goBack();

        }
    }

    ToggleModal = () => {
        this.setState({
            isModal: !this.state.isModal
        })

    }

    checkBoxChange(item, checked, index) {
        item.checkBox = checked;
        this.state.allfeatures.splice(index, 1, item);
        this.setState({
            allfeatures: this.state.allfeatures
        })
    }

    confirmFeatueUpdate = async () => {
        var selectedFeatures = []
        this.ToggleModal()
        this.setState({
            isLoader: true
        })
        for (var i = 0; i < this.state.allfeatures.length; i++) {
            if (this.state.allfeatures[i].checkBox) {
                selectedFeatures.push(this.state.allfeatures[i].id)
            }
        }
        this.state.allData.features = selectedFeatures;
        var response = await VehicleService.UpdateVehicle(this.state.allData)
        if (response) {
            GetSpecificVehicle(this.state.allData.id)
            this.setState({
                isLoader: false
            })
            this.props.navigation.goBack();

        }
    }

    getDate = (id) => {
        this.setState({
            seletedId: id
        })
    }

    DateModal = () => {
        this.setState({
            isInsurance: !this.state.isInsurance
        })
    }
    doneDate = (param) => {
        if (this.state.seletedId == 1) {
            this.setState({
                insuranceDueDate: param
            })
        }
        if (this.state.seletedId == 2) {
            this.setState({
                motDueDate: param
            })
        }
        if (this.state.seletedId == 3) {
            this.setState({
                taxDueDate: param
            })
        }
    }

    render() {
        let description = this.state.description;
        return (
            <View style={styles.ParentView}>
                <Topbar ParentPage="List Vehicle" navigation={this.props} />

                {this.state.isLoader &&
                    <View style={styles.menuLoaderView}>
                        <ActivityIndicator
                            color="#ed0000"
                            size="large"
                        />
                    </View>
                }
                <ScrollView keyboardShouldPersistTaps="always">
                    {/* <View>
                        <Text style={{ color: Apptheme, fontSize: 20, textAlign: 'center', fontWeight: 'bold', marginTop: 10 }}>VEHICLE STATUS</Text>
                    </View>
                    <View style={[styles.ButtonView, { alignItems: 'center', justifyContent: 'center', marginTop: 20, flexDirection: 'row', }]}>
                        <Text >For Sale? </Text>
                        <Switch
                            thumbColor={Apptheme}
                            onValueChange={this.toggleSwitch}
                            value={this.state.saleSwitch} />
                    </View> */}

                    <View>
                        <Text style={{ color: Apptheme, fontSize: 20, textAlign: 'center', fontWeight: 'bold', marginTop: 10 }}>VEHICLE DETAILS</Text>
                    </View>

                    <View style={styles.TextFieldView}>
                        {!this.state.display &&
                            <View>
                            <TextField
                                label='Description'
                                fontSize={15}
                                keyboardType='default'
                                tintColor={Apptheme}
                                baseColor={darkText}
                                style={{fontWeight:'bold'}}
                                errorColor="red"
                                activeLineWidth={2}
                                autoCapitalize="none"
                                autoCorrect={false}
                                labelFontSize={15}
                                value={description}
                                onChangeText={val => {
                                    this.onChangeText('description', val)
                                }}
                            />
                             <TextField
                                    label='Mileage'
                                    fontSize={15}
                                    keyboardType='default'
                                    tintColor={Apptheme}
                                    baseColor={darkText}
                                    style={{fontWeight:'bold'}}
                                    errorColor="red"
                                    activeLineWidth={2}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    labelFontSize={15}
                                    value={this.state.mileage}
                                    onChangeText={val => {
                                        this.onChangeText('mileage', val)
                                    }}
                                />
                                <TextField
                                    label='Postcode'
                                    fontSize={15}
                                    keyboardType='default'
                                    tintColor={Apptheme}
                                    baseColor={darkText}
                                    errorColor="red"
                                    style={{fontWeight:'bold'}}
                                    activeLineWidth={2}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    labelFontSize={15}
                                    value={this.state.postCode}
                                    onChangeText={val => {
                                        this.onChangeText('postCode', val)

                                    }}
                                />

                                <TextField
                                    label='Price'
                                    fontSize={15}
                                     style={{fontWeight:'bold'}}
                                    keyboardType='default'
                                    tintColor={Apptheme}
                                    baseColor={darkText}
                                    errorColor="red"
                                    activeLineWidth={2}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    labelFontSize={15}
                                    value={this.state.price}
                                    onChangeText={val => {
                                        this.onChangeText('price', val)

                                    }}
                                />
                               
                            </View>
                        }
                       


                        {/* {this.state.PremiumDate > 0 &&
                            <View style={styles.LoginButtonView}>
                                <TouchableOpacity style={styles.GradientButtonView} onPress={() => this.ToggleModal()} >
                                    <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                        <Text style={styles.ButtonInnerText}>
                                            EDIT FEATURES {this.state.features.length > 0 ? `(${this.state.features.length})` : ""}
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        } */}

                        {this.state.display &&
                            <View>
                                <View>
                                    <Text style={{ color: Apptheme, fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>IMPORTANT DATES</Text>
                                </View>

                                <TouchableOpacity onPress={() => {
                                    this.DateModal()
                                    this.getDate(1)
                                }} style={styles.DateView}>
                                    <Text style={styles.dateHeading}>
                                        Insurance Date:
                                    </Text>
                                    <Text style={styles.dates}>
                                        {(this.state.insuranceDueDate == "") ?
                                            this.state.insuranceDueDate
                                            :
                                            moment(this.state.insuranceDueDate).format('L')
                                        }
                                    </Text>

                                    <FontAwesome style={{ position: 'absolute', right: 10 }} name="calendar" size={18} color={Apptheme} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this.DateModal()
                                    this.getDate(2)
                                }} style={styles.DateView}>
                                    <Text style={styles.dateHeading}>
                                        MOT Due:
                                    </Text>
                                    <Text style={styles.dates}>

                                        {(this.state.motDueDate == "") ?
                                            this.state.taxDmotDueDateueDate
                                            :
                                            moment(this.state.motDueDate).format('L')
                                        }
                                    </Text>

                                    <FontAwesome style={{ position: 'absolute', right: 10 }} name="calendar" size={18} color={Apptheme} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this.DateModal()
                                    this.getDate(3)
                                }} style={styles.DateView}>
                                    <Text style={styles.dateHeading}>
                                        TAX Due:
                                    </Text>
                                    <Text style={styles.dates}>
                                        {(this.state.taxDueDate == "") ?
                                            this.state.taxDueDate
                                            :
                                            moment(this.state.taxDueDate).format('L')
                                        }

                                    </Text>

                                    <FontAwesome style={{ position: 'absolute', right: 10 }} name="calendar" size={18} color={Apptheme} />
                                </TouchableOpacity>
                                {this.state.isInsurance &&
                                    <CalenderPicker
                                        DateModal={this.DateModal}
                                        doneDate={this.doneDate}

                                    />
                                }
                            </View>
                        }


                        <View style={styles.LoginButtonView}>
                            <TouchableOpacity style={styles.GradientButtonView} onPress={() => this.navigateToVehicleImage()} >
                                <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                    <Text style={styles.ButtonInnerText}>
                                        ADD PHOTO
                                    </Text>

                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        {
                            (this.state.param == 0)?

                            <View style={styles.LoginButtonView}>
                            <TouchableOpacity style={styles.GradientButtonView} onPress={() => { this.confirmChange() }} >
                                <LinearGradient colors={LinearColor} style={[styles.GradientButtonView, { height: 55 }]}>
                                    <Text style={styles.ButtonInnerText}>
                                        ADD VEHICLE
                                </Text>
                                    <Text style={[styles.ButtonInnerText, { fontSize: 12 }]}>
                                        To join the community
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                            
                            :
                            <View style={styles.LoginButtonView}>
                            <TouchableOpacity style={styles.GradientButtonView} onPress={() => { this.confirmChange() }} >
                                <LinearGradient colors={LinearColor} style={[styles.GradientButtonView, ]}>
                                    <Text style={styles.ButtonInnerText}>
                                        SELL VEHICLE
                                </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        }

                        
                    </View>

                </ScrollView>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.isModal}
                    onRequestClose={() => {
                        console.warn("Modal has been closed.");
                        this.ToggleModal()
                    }}

                >
                    <TouchableOpacity onPress={() => this.ToggleModal()} style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', height: '100%', position: 'absolute', width: '100%' }}>
                    </TouchableOpacity>
                    <SafeAreaView style={{ elevation: 10, backgroundColor: '#fff', borderRadius: 10, top: '10%', height: '80%', width: '86%', marginHorizontal: '7%', }}>
                        <View style={{ width: '100%', height: '100%' }}>
                            <View style={{ margin: 5, marginVertical: 5, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.headerModalText, { paddingTop: 0, fontSize: 18, fontWeight: 'bold' }]}>
                                    Features
                            </Text>
                            </View>
                            <View style={{ height: '78%' }}>
                                <ScrollView keyboardShouldPersistTaps='handled'>
                                    {this.state.allfeatures.length > 0 &&
                                        <View style={{ width: '98%', marginHorizontal: '1%', justifyContent: 'center' }}>
                                            {this.state.allfeatures.map((item, index) => {
                                                if (item.checkBox) {
                                                    return (
                                                        <TouchableOpacity
                                                            key={index}
                                                            onPress={() => this.checkBoxChange(item, false, index)}
                                                            style={{ flexDirection: 'row', width: '100%', marginVertical: 10, marginHorizontal: 1 }} key={index}>
                                                            <Text style={{ paddingHorizontal: 10, color: "#333", fontSize: 14 }}>{item.name}</Text>
                                                            <TouchableOpacity onPress={() => this.checkBoxChange(item, true, index)} style={{ justifyContent: 'center', backgroundColor: Apptheme, alignItems: 'center', width: 15, height: 15, position: 'absolute', right: 25 }}>
                                                                <Feather onPress={() => this.checkBoxChange(item, true, index)} name="check" size={14} color={'#fff'} />
                                                            </TouchableOpacity>
                                                        </TouchableOpacity>
                                                    )
                                                }

                                                else {
                                                    return (
                                                        <TouchableOpacity
                                                            key={index}
                                                            onPress={() => this.checkBoxChange(item, true, index)}
                                                            style={{ flexDirection: 'row', width: '100%', marginVertical: 10, marginHorizontal: 1 }} key={index}>
                                                            <Text style={{ paddingHorizontal: 10, color: "#333", fontSize: 14 }}>{item.name}</Text>
                                                            <TouchableOpacity onPress={() => this.checkBoxChange(item, true, index)} style={{ justifyContent: 'center', alignItems: 'center', width: 15, height: 15, position: 'absolute', right: 25, borderColor: '#d2d2d2', borderWidth: 1 }}>
                                                            </TouchableOpacity>
                                                        </TouchableOpacity>
                                                    )
                                                }
                                            })}
                                        </View>
                                    }
                                </ScrollView>
                            </View>
                            <View style={styles.TextFieldView}>
                                <View style={styles.LoginButtonView}>
                                    <TouchableOpacity style={styles.GradientButtonView} onPress={() => { this.confirmFeatueUpdate() }} >
                                        <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                            <Text style={styles.ButtonInnerText}>
                                                SAVE
                                </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View >


                    </SafeAreaView>
                </Modal >
            </View>
        )

    }
}

const styles = StyleSheet.create({
    ParentView: {
        width: '100%',
        height: '100%',
        backgroundColor: lightBg
    },
    LogoView: {
        width: '100%',
        height: 120,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    LogoGradient: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        borderRadius: 10
    },
    LoginView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    LoginText: {
        color: darkText,
        fontSize: 24,
        fontWeight: 'bold'
    },
    TextFieldView: {
        width: '92%',
        marginHorizontal: '4%'
    },
    LoginButtonView: {
        marginTop: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    GradientButtonView: {
        ...CommponStyle.GradiendButtonView
    },
    ButtonInnerText: {
        ...CommponStyle.ButtonInnerText
    },
    ForgetPasswordView: {
        marginHorizontal: 30,
        marginTop: 10,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    ForgetPasswordText: {
        color: linkText,
        fontSize: 14
    },
    TextView: {
        width: '90%',
        color: darkText
    },
    PasswordSecureView: {
        position: 'absolute',
        top: 15,
        right: 0,
        padding: 10
    },
    errorView: {
        alignSelf: "center"
    },
    errorViewText: {
        borderRadius: 10,
        color: '#fa3335',
        textAlign: 'center',
        backgroundColor: '#ffe0e0',
        padding: 2,
        paddingHorizontal: 20,
        fontSize: 14
    },
    dates: {
        textAlign: 'center', paddingLeft: 20, color: darkText, fontWeight: 'bold'
    },
    DateView: {
        borderBottomColor: darkText,
        borderBottomWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: 50,
    },
    dateHeading: {
        paddingLeft: 10, color: Apptheme, fontWeight: "bold"
    },
    menuLoaderView: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: '100%',
        backgroundColor: 'rgba(255,255,255, 0.7)',
        // backgroundColor: 'red',
        zIndex: 10000,
        alignItems: 'center',
        justifyContent: 'center',
        top: 60
    },
});