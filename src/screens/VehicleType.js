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
    Image
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import CommponStyle, { Apptheme, lightText, darkText, LinearColor, lightBg } from '../helpers/CommponStyle';
import Topbar from '../components/Topbar';
import CommonModal from '../components/CommonModal';
import {
    TextField,
} from 'react-native-material-textfield';
export default class VehicleType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ModalTitle: '',
            isModal: false,
            ModalProps: {},
            selectedsort: 1,
            sort: [
                { id: 1, value: "From lowest price" },
                { id: 2, value: "From highest price" },
                { id: 3, value: "By distance" },
                { id: 4, value: "By mileage" },
                { id: 5, value: "From newest" },
                { id: 6, value: "From oldest" },

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
            ]
        }
        this.ModalToggle = this.ModalToggle.bind(this)
        this.seletedSortItem = this.seletedSortItem.bind(this)
        this.seletedvehiclemakeItem = this.seletedvehiclemakeItem.bind(this)
        this.seletedvehiclemodelItem = this.seletedvehiclemodelItem.bind(this)
    }
    ModalToggle() {
        this.setState({
            isModal: !this.state.isModal
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
    vehiclemake = () => {
        this.setState({
            ModalTitle: 'Vehicle Make',
            ModalData: this.state.vehiclemake,
            ModalSeleted: this.state.selectedvehicleMake,
            ModalseletedItem: this.seletedvehiclemakeItem

        })
        this.ModalToggle();
    }
    vehiclemodal = () => {
        this.setState({
            ModalTitle: 'Vehicle Model',
            ModalData: this.state.vehiclemodal,
            ModalSeleted: this.state.selectedvehiclemodal,
            ModalseletedItem: this.seletedvehiclemodelItem

        })
        this.ModalToggle();
    }
    seletedSortItem = (item) => {
        this.setState({
            selectedsort: item.id
        })
    }
    seletedvehiclemakeItem = (item) => {
        this.setState({
            selectedvehicleMake: item.id
        })
    }
    seletedvehiclemodelItem = (item) => {
        this.setState({
            selectedvehiclemodal: item.id
        })
    }

    render() {
        return (
            <View style={styles.ParentView}>
                <Topbar ParentPage="Vehicle Type" navigation={this.props} />
                <ScrollView>
                    <View style={styles.MainView}>
                        <View style={styles.BoxView}>
                            <View style={styles.InputView}>
                                <TextField
                                    label='Enter Post Code'
                                    fontSize={13}
                                    keyboardType='default'
                                    tintColor={Apptheme}
                                    baseColor={Apptheme}
                                    errorColor="red"
                                    activeLineWidth={2}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    labelFontSize={13}
                                />
                            </View>
                        </View>


                        <View style={styles.BoxView}>
                            <TouchableOpacity
                                onPress={() => this.sort()}
                                style={styles.DropDownButton}>
                                <Text style={styles.DropDownLabel}>Sort By</Text>
                                <Text style={styles.DropDownText}>{this.state.sort.filter(a => a.id == this.state.selectedsort)[0].value}</Text>
                            </TouchableOpacity>
                            <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIcon} />

                        </View>

                        <View style={styles.BoxView}>
                            <TouchableOpacity
                                onPress={() => this.vehiclemake()}
                                style={styles.DropDownButton}>
                                <Text style={styles.DropDownLabel}>Vehicle make</Text>
                                <Text style={styles.DropDownText}>{this.state.vehiclemake.filter(a => a.id == this.state.selectedvehicleMake)[0].value}</Text>
                            </TouchableOpacity>
                            <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIcon} />

                        </View>

                        <View style={styles.BoxView}>
                            <TouchableOpacity
                                onPress={() => this.vehiclemodal()}
                                style={styles.DropDownButton}>
                                <Text style={styles.DropDownLabel}>Vehicle model</Text>
                                <Text style={styles.DropDownText}>{this.state.vehiclemodal.filter(a => a.id == this.state.selectedvehiclemodal)[0].value}</Text>
                            </TouchableOpacity>
                            <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIcon} />

                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => this.vehiclemodal()}
                                style={styles.DropDownButtonRow}>
                                <Text style={styles.DropDownLabel}>Min Price</Text>
                                {/* <Text style={styles.DropDownText}>{this.state.vehiclemodal.filter(a => a.id == this.state.selectedvehiclemodal)[0].value}</Text> */}
                                <Text style={styles.DropDownText}>$600000</Text>
                            </TouchableOpacity>
                            <View>
                                <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIconRow} />
                            </View>

                            <TouchableOpacity
                                onPress={() => this.vehiclemodal()}
                                style={styles.DropDownButtonRow}>
                                <Text style={styles.DropDownLabel}>Max Price</Text>
                                {/* <Text style={styles.DropDownText}>{this.state.vehiclemodal.filter(a => a.id == this.state.selectedvehiclemodal)[0].value}</Text> */}
                                <Text style={styles.DropDownText}>$600000</Text>
                            </TouchableOpacity>
                            <View>
                                <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIcon2} />
                            </View>

                        </View>


                        <View style={{ width: '100%', flexDirection: 'row', marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => this.vehiclemodal()}
                                style={styles.DropDownButtonRow}>
                                <Text style={styles.DropDownLabel}>Min Age</Text>
                                {/* <Text style={styles.DropDownText}>{this.state.vehiclemodal.filter(a => a.id == this.state.selectedvehiclemodal)[0].value}</Text> */}
                                <Text style={styles.DropDownText}>$600000</Text>
                            </TouchableOpacity>
                            <View>
                                <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIconRow} />
                            </View>

                            <TouchableOpacity
                                onPress={() => this.vehiclemodal()}
                                style={styles.DropDownButtonRow}>
                                <Text style={styles.DropDownLabel}>Max Age</Text>
                                {/* <Text style={styles.DropDownText}>{this.state.vehiclemodal.filter(a => a.id == this.state.selectedvehiclemodal)[0].value}</Text> */}
                                <Text style={styles.DropDownText}>Upto 15 years old</Text>
                            </TouchableOpacity>
                            <View>
                                <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIcon2} />
                            </View>
                        </View>

                        <View style={styles.BoxView}>
                            <TouchableOpacity
                                onPress={() => this.vehiclemodal()}
                                style={styles.DropDownButton}>
                                <Text style={styles.DropDownLabel}>Max mileage</Text>
                                <Text style={styles.DropDownText}>{this.state.vehiclemodal.filter(a => a.id == this.state.selectedvehiclemodal)[0].value}</Text>
                            </TouchableOpacity>
                            <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIcon} />

                        </View>

                        <View style={styles.BoxView}>
                            <TouchableOpacity
                                onPress={() => this.vehiclemodal()}
                                style={styles.DropDownButton}>
                                <Text style={styles.DropDownLabel}>Body type</Text>
                                <Text style={styles.DropDownText}>{this.state.vehiclemodal.filter(a => a.id == this.state.selectedvehiclemodal)[0].value}</Text>
                            </TouchableOpacity>
                            <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIcon} />

                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => this.vehiclemodal()}
                                style={styles.DropDownButtonRow}>
                                <Text style={styles.DropDownLabel}>Fuel type</Text>
                                {/* <Text style={styles.DropDownText}>{this.state.vehiclemodal.filter(a => a.id == this.state.selectedvehiclemodal)[0].value}</Text> */}
                                <Text style={styles.DropDownText}>Hybrid Electric</Text>
                            </TouchableOpacity>
                            <View>
                                <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIconRow} />
                            </View>

                            <TouchableOpacity
                                onPress={() => this.vehiclemodal()}
                                style={styles.DropDownButtonRow}>
                                <Text style={styles.DropDownLabel}>Color</Text>
                                {/* <Text style={styles.DropDownText}>{this.state.vehiclemodal.filter(a => a.id == this.state.selectedvehiclemodal)[0].value}</Text> */}
                                <Text style={styles.DropDownText}>Upto 20000 mi</Text>
                            </TouchableOpacity>
                            <View>
                                <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIcon2} />
                            </View>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => this.vehiclemodal()}
                                style={styles.DropDownButtonRow}>
                                <Text style={styles.DropDownLabel}>Engine size</Text>
                                {/* <Text style={styles.DropDownText}>{this.state.vehiclemodal.filter(a => a.id == this.state.selectedvehiclemodal)[0].value}</Text> */}
                                <Text style={styles.DropDownText}>2.5</Text>
                            </TouchableOpacity>
                            <View>
                                <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIconRow} />
                            </View>

                            <TouchableOpacity
                                onPress={() => this.vehiclemodal()}
                                style={styles.DropDownButtonRow}>
                                <Text style={styles.DropDownLabel}>Gearbox</Text>
                                {/* <Text style={styles.DropDownText}>{this.state.vehiclemodal.filter(a => a.id == this.state.selectedvehiclemodal)[0].value}</Text> */}
                                <Text style={styles.DropDownText}>Automatic</Text>
                            </TouchableOpacity>
                            <View>
                                <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIcon2} />
                            </View>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => this.vehiclemodal()}
                                style={styles.DropDownButtonRow}>
                                <Text style={styles.DropDownLabel}>Doors</Text>
                                {/* <Text style={styles.DropDownText}>{this.state.vehiclemodal.filter(a => a.id == this.state.selectedvehiclemodal)[0].value}</Text> */}
                                <Text style={styles.DropDownText}>4</Text>
                            </TouchableOpacity>
                            <View>
                                <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIconRow} />
                            </View>

                            <TouchableOpacity
                                onPress={() => this.vehiclemodal()}
                                style={styles.DropDownButtonRow}>
                                <Text style={styles.DropDownLabel}>Seats</Text>
                                {/* <Text style={styles.DropDownText}>{this.state.vehiclemodal.filter(a => a.id == this.state.selectedvehiclemodal)[0].value}</Text> */}
                                <Text style={styles.DropDownText}>5</Text>
                            </TouchableOpacity>
                            <View>
                                <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIcon2} />
                            </View>
                        </View>

                        <View style={styles.BoxView}>
                            <TouchableOpacity
                                onPress={() => this.vehiclemodal()}
                                style={styles.DropDownButton}>
                                <Text style={styles.DropDownLabel}>Distance</Text>
                                <Text style={styles.DropDownText}>{this.state.vehiclemodal.filter(a => a.id == this.state.selectedvehiclemodal)[0].value}</Text>
                            </TouchableOpacity>
                            <FontAwesome name="sort-down" size={30} color={Apptheme} style={styles.DropDownIcon} />
                        </View>
                    </View>
                    <View style={styles.ButtonView}>
                        <TouchableOpacity style={styles.GradientButtonView} onPress={() => { this.props.navigation.navigate("Home") }}>
                            <LinearGradient colors={LinearColor} style={styles.GradientButtonView}>
                                <Text style={styles.ButtonInnerText}>
                                    SEARCH
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

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
        // backgroundColor: 'lightgray',

    },
    MainView: {
        width: '94%',
        marginHorizontal: '3%',
        marginTop: 10
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
        borderRadius: 5,
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
        color:Apptheme
    },
    GradientButtonView: {
        ...CommponStyle.GradiendButtonView
    },
    ButtonInnerText: {
        ...CommponStyle.ButtonInnerText
    },
    ButtonView: {
       ...CommponStyle.ButtonView
    },

})