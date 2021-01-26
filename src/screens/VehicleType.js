import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Button,
    TouchableOpacity,
    StyleSheet,
    Picker,
    Switch,
    Image,
    Alert
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import CommponStyle, { Apptheme, lightText, darkText, LinearColor, lightBg } from '../helpers/CommponStyle';
import Topbar from '../components/Topbar';
import CommonModal from '../components/CommonModal';
import { TextField } from 'react-native-material-textfield';
import * as Utilities from "../helpers/Utilities";
import * as VehicleLooks from '../services/SearchVehicleType';
import { PriceList, AgeList, mileageList, seatsList, doorsList, distanceList } from '../helpers/Listing'
export default class VehicleType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ModalTitle: '',
            switchValue: true,
            isModal: false,
            ModalProps: {},
            postcode: '',
            selectedsort: 5,
            sort: [
                { id: 1, name: "From lowest price" },
                { id: 2, name: "From highest price" },
                { id: 3, name: "By distance" },
                { id: 4, name: "By mileage" },
                { id: 5, name: "From newest" },
                { id: 6, name: "From oldest" },

            ],
            selectedvehicleMake: 1,
            vehiclemake: [
                { id: 1, value: "Any" },
                { id: 2, value: "AUDI" },
                { id: 3, value: "BMW" },
                { id: 4, value: "FORD" },
                { id: 5, value: "HONDA" },
                { id: 6, value: "MERCEDEZ-BENZ" },
                { id: 7, value: "NISSAN" },
                { id: 8, value: "PROCHE" },
                { id: 9, value: "TOYOTA" },
                { id: 10, value: "VAUXHALL" },
                { id: 11, value: "VOLKSWAGEN" },
            ],
            selectedvehiclemodal: 1,
            vehiclemodal: [
                { id: 1, value: "Any" },
                { id: 2, value: "520D M SPORT AUTO" },
                { id: 3, value: "A3 SPORT TDI 170A" },
                { id: 4, value: "A6 SE TDI" },
                { id: 5, value: "AURIS HYBRIDT SPRINT CVT" },
                { id: 6, value: "CAYENNE V6D TIPTRONIC" },
                { id: 7, value: "CIVIC SE EXECUTIVE IMA" },
                { id: 8, value: "CLA 180 AMG LINE AUTO" },
                { id: 9, value: "CORSA CLUB" },
                { id: 10, value: "JUKE TEKNA" },
                { id: 11, value: "LANDRUISER ll DIESEL" },
                { id: 12, value: "POLO SE 70" },
                { id: 13, value: "TRANSIT BUS D" },
                { id: 14, value: "YARIS HYBRID ICON + CVT" },
                { id: 15, value: "ZAFIRA ENERGY CDTI E-FLEX" },
            ],
            bodyTypes: [],
            selectedbodyTypes: 0,
            colours: [],
            selectedcolours: 0,
            makes: [],
            selectedmakes: 0,
            models: [],
            selectedmodels: 0,
            priceList: PriceList,
            seletedMinPrice: 0,
            selectedMaxPrice: 0,
            ageList: AgeList,
            seletedMinAge: 0,
            seletedMaxAge: 0,
            mileageList: mileageList,
            seletedmileage: 0,
            fuelTypes: [],
            selectedfuelTypes: 0,
            engineSizes: [],
            selectedengineSizes: 0,
            gearbox: [],
            selectedgearbox: 0,
            doors: doorsList,
            selecteddoors: 0,
            seats: seatsList,
            selectedseats: 0,
            distance: distanceList,
            selecteddistance: 0

        }
        this.ModalToggle = this.ModalToggle.bind(this)
        this.resetAllFields = this.resetAllFields.bind(this)
        this.BodyTypeList();
    }

    BodyTypeList = async () => {
        var response = await VehicleLooks.VehicleLookup()
        this.setState({
            makes: response.makes,
            models: response.models,
            bodyTypes: response.bodyTypes,
            colours: response.colours,
            driverSeatPositions: response.driverSeatPositions,
            driveTypes: response.driveTypes,
            engineCylinderConfigs: response.engineCylinderConfigs,
            engineFuelDeliveries: response.engineFuelDeliveries,
            enginePositions: response.enginePositions,
            engineSizes: response.engineSizes,
            features: response.features,
            fuelTypes: response.fuelTypes,
            roadFundLicenseBands: response.roadFundLicenseBands,
            roadFundLicenseStatuses: response.roadFundLicenseStatuses,
            gearbox: response.transmissionTypes,
        })
    }

    toggleSwitch = (value) => {
        this.setState({ switchValue: value })
    }


    ModalToggle() {
        this.setState({
            isModal: !this.state.isModal
        })
    }

    bodyTypes = () => {
        this.setState({
            ModalTitle: 'body Types',
            ModalData: this.state.bodyTypes,
            ModalSeleted: this.state.selectedbodyTypes,
            ModalseletedItem: this.seletedBodyTypeItem

        })
        this.ModalToggle();
    }
    seletedBodyTypeItem = (item) => {
        this.setState({
            selectedbodyTypes: item.id
        })
    }

    colours = () => {
        this.setState({
            ModalTitle: 'body Colours',
            ModalData: this.state.colours,
            ModalSeleted: this.state.selectedcolours,
            ModalseletedItem: this.seletedBodyColours

        })
        this.ModalToggle();
    }
    seletedBodyColours = (item) => {
        this.setState({
            selectedcolours: item.id
        })
    }
    makes = () => {
        this.setState({
            ModalTitle: 'Vehicle Makes',
            ModalData: this.state.makes,
            ModalSeleted: this.state.selectedmakes,
            ModalseletedItem: this.seletedmakes

        })
        this.ModalToggle();
    }
    seletedmakes = (item) => {
        this.setState({
            selectedmakes: item.id
        })
    }
    models = () => {
        this.setState({
            ModalTitle: 'Vehicle Models',
            ModalData: this.state.models,
            ModalSeleted: this.state.selectedmodels,
            ModalseletedItem: this.seletedmodels

        })
        this.ModalToggle();
    }
    seletedmodels = (item) => {
        this.setState({
            selectedmodels: item.id
        })
    }
    minPrice = () => {
        this.setState({
            ModalTitle: 'Min Price',
            ModalData: this.state.priceList,
            ModalSeleted: this.state.seletedMinPrice,
            ModalseletedItem: this.seletedMinPrice

        })
        this.ModalToggle();
    }
    seletedMinPrice = (item) => {
        this.setState({
            seletedMinPrice: item.id
        })
    }

    maxPrice = () => {
        this.setState({
            ModalTitle: 'Max Price',
            ModalData: this.state.priceList,
            ModalSeleted: this.state.selectedMaxPrice,
            ModalseletedItem: this.selectedMaxPrice

        })
        this.ModalToggle();
    }
    selectedMaxPrice = (item) => {
        this.setState({
            selectedMaxPrice: item.id
        })
    }

    minAge = () => {
        this.setState({
            ModalTitle: 'Min Age',
            ModalData: this.state.ageList,
            ModalSeleted: this.state.seletedMinAge,
            ModalseletedItem: this.seletedMinAge

        })
        this.ModalToggle();
    }
    seletedMinAge = (item) => {
        this.setState({
            seletedMinAge: item.id
        })
    }

    maxAge = () => {
        this.setState({
            ModalTitle: 'Max Age',
            ModalData: this.state.ageList,
            ModalSeleted: this.state.seletedMaxAge,
            ModalseletedItem: this.seletedMaxAge

        })
        this.ModalToggle();
    }
    seletedMaxAge = (item) => {
        this.setState({
            seletedMaxAge: item.id
        })
    }
    mileage = () => {
        this.setState({
            ModalTitle: 'Max mileage',
            ModalData: this.state.mileageList,
            ModalSeleted: this.state.seletedmileage,
            ModalseletedItem: this.seletedmileage

        })
        this.ModalToggle();
    }
    seletedmileage = (item) => {
        this.setState({
            seletedmileage: item.id
        })
    }
    fuelTypes = () => {
        this.setState({
            ModalTitle: 'Fuel Type',
            ModalData: this.state.fuelTypes,
            ModalSeleted: this.state.selectedfuelTypes,
            ModalseletedItem: this.selectedfuelTypes

        })
        this.ModalToggle();
    }
    selectedfuelTypes = (item) => {
        this.setState({
            selectedfuelTypes: item.id
        })
    }
    gearbox = () => {
        this.setState({
            ModalTitle: 'Gear Box',
            ModalData: this.state.gearbox,
            ModalSeleted: this.state.selectedgearbox,
            ModalseletedItem: this.selectedgearbox

        })
        this.ModalToggle();
    }
    selectedgearbox = (item) => {
        this.setState({
            selectedgearbox: item.id
        })
    }
    engineSizes = () => {
        this.setState({
            ModalTitle: 'Engine size',
            ModalData: this.state.engineSizes,
            ModalSeleted: this.state.selectedengineSizes,
            ModalseletedItem: this.selectedengineSizes

        })
        this.ModalToggle();
    }
    selectedengineSizes = (item) => {
        this.setState({
            selectedengineSizes: item.id
        })
    }

    doors = () => {
        this.setState({
            ModalTitle: 'Doors',
            ModalData: this.state.doors,
            ModalSeleted: this.state.selecteddoors,
            ModalseletedItem: this.selecteddoors

        })
        this.ModalToggle();
    }
    selecteddoors = (item) => {
        this.setState({
            selecteddoors: item.id
        })
    }

    seats = () => {
        this.setState({
            ModalTitle: 'Seats',
            ModalData: this.state.seats,
            ModalSeleted: this.state.selectedseats,
            ModalseletedItem: this.selectedseats

        })
        this.ModalToggle();
    }
    selectedseats = (item) => {
        this.setState({
            selectedseats: item.id
        })
    }

    distance = () => {
        this.setState({
            ModalTitle: 'Distance',
            ModalData: this.state.distance,
            ModalSeleted: this.state.selecteddistance,
            ModalseletedItem: this.selecteddistance

        })
        this.ModalToggle();
    }
    selecteddistance = (item) => {
        this.setState({
            selecteddistance: item.id
        })
    }

    sort = () => {
        this.setState({
            ModalTitle: 'Sort by',
            ModalData: this.state.sort,
            ModalSeleted: this.state.selectedsort,
            ModalseletedItem: this.seletedSortItem

        })
        this.ModalToggle();
    }
    seletedSortItem = (item) => {
        this.setState({
            selectedsort: item.id
        })
    }



    resetAllFields() {
        this.setState({
            selectedbodyTypes: 0,
            selectedcolours: 0,
            selectedmakes: 0,
            selectedmodels: 0,
            selectedMaxPrice: 0,
            seletedMinPrice: 0,
            seletedMinAge: 0,
            seletedMaxAge: 0,
            seletedmileage: 0,
            selectedfuelTypes: 0,
            selectedengineSizes: 0,
            selectedseats: 0,
            selectedgearbox: 0,
            selecteddoors: 0,
            selecteddistance: 0,
            postcode: '',
        })
    }

    searchVehicle = async () => {
        if (this.state.postcode != "") {
            var tweet = this.state.postcode.toUpperCase();
            var postcode_regex = /[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/g;

            var postcodes = tweet.match(postcode_regex);
            console.log("postcodes", postcodes);
if(postcodes ==null){
    Alert.alert(
        "Post code Error",
        "Please enter a full valid UK postcode including a space between the first part and second part.",
        [
            {
                text: "CLOSE",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },

        ],
        { cancelable: false }
    );
    return
}

console.log("postcodes",postcodes);
        }
        let param = {
            makeID: this.state.selectedmakes,
            modelID: this.state.selectedmodels,
            minPrice: this.state.seletedMinPrice,
            maxPrice: this.state.selectedMaxPrice,
            minAge: this.state.seletedMinAge,
            maxAge: this.state.seletedMaxAge,
            maxMileage: this.state.seletedmileage,
            colourID: this.state.selectedcolours,
            fuelTypeID: this.state.selectedfuelTypes,
            engineSizeID: this.state.selectedengineSizes,
            transmissionTypeID: this.state.selectedgearbox,
            bodyTypeID: this.state.selectedbodyTypes,
            doorCount: this.state.selecteddoors,
            seatCount: this.state.selectedseats,
            postcode: this.state.postcode,
            distance: this.state.selecteddistance,
            stolen: false,
            forSale: this.state.switchValue,
            vehicleId: 0,
            numberOfResults: '',
            orderBy: 0,
            description: '',
            // longitude: 0.0,
            // latitude: 0.0,
        }
        var filterparam = {
            stolen:false,
            distance:200,
            orderBy:this.state.selectedsort,
            numberOfResults:30,
            forSale:this.state.switchValue
        };
        let items = Object.entries(param);
        items.map(item => {
            let key = item[0];
            let value = item[1];
            if (value != '' || value > 0) {
                filterparam[key] = value
            }
        });

        var response = await VehicleLooks.SearchVehicleTypes(filterparam)
        this.props.navigation.navigate("SearchResultVehicle",
        {
        listVehicle:response.vehicles,
        resultcount:response.numberOfResults,
        filterparam:filterparam
        })
    }

    onChangeText = (key, value) => {
        this.setState({ [key]: value, loginFail: false })
    }
    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar 
                resetAllFields={this.resetAllFields}
                ParentPage="Vehicle Type" navigation={this.props} />
                <View style={{ width: '100%', height: 50, position: 'absolute', bottom: 0 }}>
                    <View style={styles.ButtonView}>
                        <TouchableOpacity onPress={() => this.searchVehicle()} style={styles.GradientButtonView} >
                            <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                <Text style={styles.ButtonInnerText}>
                                    SEARCH
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.MainView}>
                        <View>
                            <Text>
                                Enter as many of the details below as you would like.
                            </Text>

                        </View>
                        <View style={styles.BoxView}>
                            <View style={[styles.DropDownButton, styles.InputView]}>
                                <TextField

                                    label='Enter Post Code'
                                    fontSize={13}
                                    keyboardType='default'
                                    tintColor={Apptheme}
                                    baseColor={Apptheme}
                                    errorColor="red"
                                    activeLineWidth={2}
                                    autoCapitalize="characters"
                                    autoCorrect={false}
                                    labelFontSize={13}
                                    value={this.state.postcode}
                                    onChangeText={val => {
                                        this.onChangeText('postcode', val)
                                      
                                    }}

                                />
                            </View>
                        </View>




                        <View style={styles.BoxView}>
                            <TouchableOpacity
                                onPress={() => this.sort()}
                                style={styles.DropDownButton}>
                                <Text style={styles.DropDownLabel}>Sort By</Text>
                                <Text style={styles.DropDownText}>{this.state.sort.filter(a => a.id == this.state.selectedsort)[0].name}</Text>
                            </TouchableOpacity>
                            <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIcon} />

                        </View>

                        <View style={styles.BoxView}>
                            <TouchableOpacity
                                onPress={() => this.makes()}
                                style={styles.DropDownButton}>
                                <Text style={styles.DropDownLabel}>Vehicle make</Text>
                                <Text style={styles.DropDownText}>
                                    {(this.state.selectedmakes == 0) ?
                                        "Any"
                                        :
                                        this.state.makes.filter(a => a.id == this.state.selectedmakes)[0].name
                                    }
                                </Text>
                            </TouchableOpacity>
                            <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIcon} />

                        </View>

                        <View style={styles.BoxView}>
                            <TouchableOpacity
                                onPress={() => this.models()}
                                style={styles.DropDownButton}>
                                <Text style={styles.DropDownLabel}>Vehicle model</Text>
                                <Text style={styles.DropDownText}>
                                    {(this.state.selectedmodels == 0) ?
                                        "Any"
                                        :
                                        this.state.models.filter(a => a.id == this.state.selectedmodels)[0].name
                                    }
                                </Text>
                            </TouchableOpacity>
                            <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIcon} />

                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => this.minPrice()}
                                style={styles.DropDownButtonRow}>
                                <Text style={styles.DropDownLabel}>Min Price</Text>
                                <Text style={styles.DropDownText}>
                                    {(this.state.seletedMinPrice == 0) ?
                                        "Any"
                                        :
                                        this.state.priceList.filter(a => a.id == this.state.seletedMinPrice)[0].name
                                    }
                                </Text>
                            </TouchableOpacity>
                            <View>
                                <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIconRow} />
                            </View>

                            <TouchableOpacity
                                onPress={() => this.maxPrice()}
                                style={styles.DropDownButtonRow}>
                                <Text style={styles.DropDownLabel}>Max Price</Text>
                                <Text style={styles.DropDownText}>
                                    {(this.state.selectedMaxPrice == 0) ?
                                        "Any"
                                        :
                                        this.state.priceList.filter(a => a.id == this.state.selectedMaxPrice)[0].name
                                    }
                                </Text>
                            </TouchableOpacity>
                            <View>
                                <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIcon2} />
                            </View>

                        </View>


                        <View style={{ width: '100%', flexDirection: 'row', marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => this.minAge()}
                                style={styles.DropDownButtonRow}>
                                <Text style={styles.DropDownLabel}>Min Age</Text>
                                <Text style={styles.DropDownText}>
                                    {(this.state.seletedMinAge == 0) ?
                                        "Any"
                                        :
                                        this.state.ageList.filter(a => a.id == this.state.seletedMinAge)[0].name
                                    }
                                </Text>
                            </TouchableOpacity>
                            <View>
                                <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIconRow} />
                            </View>

                            <TouchableOpacity
                                onPress={() => this.maxAge()}
                                style={styles.DropDownButtonRow}>
                                <Text style={styles.DropDownLabel}>Max Age</Text>
                                <Text style={styles.DropDownText}>
                                    {(this.state.seletedMaxAge == 0) ?
                                        "Any"
                                        :
                                        this.state.ageList.filter(a => a.id == this.state.seletedMaxAge)[0].name
                                    }
                                </Text>
                            </TouchableOpacity>
                            <View>
                                <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIcon2} />
                            </View>
                        </View>

                        <View style={styles.BoxView}>
                            <TouchableOpacity
                                onPress={() => this.mileage()}
                                style={styles.DropDownButton}>
                                <Text style={styles.DropDownLabel}>Max mileage</Text>
                                <Text style={styles.DropDownText}>
                                    {(this.state.seletedmileage == 0) ?
                                        "Any"
                                        :
                                        this.state.mileageList.filter(a => a.id == this.state.seletedmileage)[0].name
                                    }
                                </Text>
                            </TouchableOpacity>
                            <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIcon} />

                        </View>

                        <View style={styles.BoxView}>
                            <TouchableOpacity
                                onPress={() => this.bodyTypes()}
                                style={styles.DropDownButton}>
                                <Text style={styles.DropDownLabel}>Body type</Text>
                                <Text style={styles.DropDownText}>
                                    {(this.state.selectedbodyTypes == 0) ?
                                        "Any"
                                        :
                                        this.state.bodyTypes.filter(a => a.id == this.state.selectedbodyTypes)[0].name
                                    }
                                </Text>
                            </TouchableOpacity>
                            <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIcon} />

                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => this.fuelTypes()}
                                style={styles.DropDownButtonRow}>
                                <Text style={styles.DropDownLabel}>Fuel type</Text>
                                <Text style={styles.DropDownText}>
                                    {(this.state.selectedfuelTypes == 0) ?
                                        "Any"
                                        :
                                        this.state.fuelTypes.filter(a => a.id == this.state.selectedfuelTypes)[0].name
                                    }
                                </Text>
                            </TouchableOpacity>
                            <View>
                                <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIconRow} />
                            </View>

                            <TouchableOpacity
                                onPress={() => this.colours()}
                                style={styles.DropDownButtonRow}>
                                <Text style={styles.DropDownLabel}>Color</Text>
                                <Text style={styles.DropDownText}>
                                    {(this.state.selectedcolours == 0) ?
                                        "Any"
                                        :
                                        this.state.colours.filter(a => a.id == this.state.selectedcolours)[0].name
                                    }
                                </Text>
                            </TouchableOpacity>
                            <View>
                                <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIcon2} />
                            </View>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => this.engineSizes()}
                                style={styles.DropDownButtonRow}>
                                <Text style={styles.DropDownLabel}>Engine size</Text>
                                <Text style={styles.DropDownText}>
                                    {(this.state.selectedengineSizes == 0) ?
                                        "Any"
                                        :
                                        this.state.engineSizes.filter(a => a.id == this.state.selectedengineSizes)[0].name
                                    }</Text>
                            </TouchableOpacity>
                            <View>
                                <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIconRow} />
                            </View>

                            <TouchableOpacity
                                onPress={() => this.gearbox()}
                                style={styles.DropDownButtonRow}>
                                <Text style={styles.DropDownLabel}>Gearbox</Text>

                                <Text style={styles.DropDownText}>
                                    {(this.state.selectedgearbox == 0) ?
                                        "Any"
                                        :
                                        this.state.gearbox.filter(a => a.id == this.state.selectedgearbox)[0].name
                                    }
                                </Text>
                            </TouchableOpacity>
                            <View>
                                <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIcon2} />
                            </View>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => this.doors()}
                                style={styles.DropDownButtonRow}>
                                <Text style={styles.DropDownLabel}>Doors</Text>
                                <Text style={styles.DropDownText}>
                                    {(this.state.selecteddoors == 0) ?
                                        "Any"
                                        :
                                        this.state.seats.filter(a => a.id == this.state.selecteddoors)[0].name
                                    }
                                </Text>
                            </TouchableOpacity>
                            <View>
                                <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIconRow} />
                            </View>

                            <TouchableOpacity
                                onPress={() => this.seats()}
                                style={styles.DropDownButtonRow}>
                                <Text style={styles.DropDownLabel}>Seats</Text>
                                <Text style={styles.DropDownText}>
                                    {(this.state.selectedseats == 0) ?
                                        "Any"
                                        :
                                        this.state.seats.filter(a => a.id == this.state.selectedseats)[0].name
                                    }
                                </Text>
                            </TouchableOpacity>
                            <View>
                                <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIcon2} />
                            </View>
                        </View>

                        <View style={styles.BoxView}>
                            <TouchableOpacity
                                onPress={() => this.distance()}
                                style={styles.DropDownButton}>
                                <Text style={styles.DropDownLabel}>Distance</Text>
                                <Text style={styles.DropDownText}>
                                    {(this.state.selecteddistance == 0) ?
                                        "Any"
                                        :
                                        this.state.distance.filter(a => a.id == this.state.selecteddistance)[0].name
                                    }
                                </Text>
                            </TouchableOpacity>
                            <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIcon} />
                        </View>
                    </View>
                    <View style={[styles.ButtonView, { flexDirection: 'row' }]}>
                        <Text >For Sale? </Text>
                        <Switch
                            // style={{ marginTop: 30 }}
                            thumbColor={lightText}
                            onValueChange={this.toggleSwitch}
                            value={this.state.switchValue} />
                    </View>
                    {/* <View style={styles.ButtonView}>
                        <TouchableOpacity style={styles.GradientButtonView}
                            onPress={() => { this.resetAllFields() }}>
                            <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                <Text style={styles.ButtonInnerText}>
                                    RESET
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View> */}

                    {this.state.isModal &&
                        <CommonModal
                            ModalSeleted={this.state.ModalSeleted}
                            ModalTitle={this.state.ModalTitle}
                            ModalData={this.state.ModalData}
                            ModalToggle={this.ModalToggle}
                            seletedItem={this.state.ModalseletedItem}
                        />
                    }
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
        paddingBottom: 55
        // backgroundColor: 'lightgray',

    },
    MainView: {
        width: '94%',
        marginHorizontal: '3%',
        marginTop: 10,

    },
    BoxView: {
        width: '100%',
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    InputView: {
        width: '100%',
        marginTop: 10,
        // backgroundColor: '#aaa',
        // borderColor: '#d2d2d2',
        // borderWidth: 1,
        height: 55,
        // backgroundColor:'red',
        borderRadius: 5,
        paddingBottom: 5,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    DropDownButton: {
        width: '100%',
        marginTop: 10,
        // backgroundColor: '#aaa',
        borderColor: '#d2d2d2',
        borderWidth: 1,
        height: 55,
        borderRadius: 5,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    DropDownIcon: {
        position: 'absolute',
        top: 5,
        right: 15
    },
    DropDownText: {
        paddingLeft: 25
    },
    DropDownButtonRow: {
        width: '48%',
        marginTop: 10,
        marginHorizontal: '2%',
        // backgroundColor: '#aaa',
        borderColor: '#d2d2d2',
        borderWidth: 1,
        height: 55,
        borderRadius: 5,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    DropDownIconRow: {
        position: 'absolute',
        bottom: 0,
        right: 20
    },
    DropDownIcon2: {
        position: 'absolute',
        bottom: 0,
        right: 20
    },
    DropDownText: {
        paddingLeft: 25
    },
    DropDownLabel: {
        // fontWeight: 'bold',
        color: Apptheme
    },
    GradientButtonView: {
        ...CommponStyle.GradiendButtonView
    },
    ButtonInnerText: {
        ...CommponStyle.ButtonInnerText
    },
    ButtonView: {
        ...CommponStyle.ButtonView,

        height: 45
    },

})