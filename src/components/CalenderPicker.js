//This is an example of Calendar// 
import React, { Component } from 'react';
//import react in our code. 

import { StyleSheet, Text, View, Modal, Dimensions, TouchableOpacity} from 'react-native';
//import all the components we are going to use.

import CalendarPicker from 'react-native-calendar-picker';
import { Apptheme, lightText, darkText } from '../helpers/CommponStyle';

//import CalendarPicker from the package we installed
var screenWidth = Dimensions.get('window').width;
const moment = require('moment-timezone');
export default class CalenderPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: moment(new Date()),
            isModal: true
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date) {
      this.setState({
            selectedStartDate: date,
        });
    }

    ToggleModal = () => {
        this.setState({
            isModal: !this.state.isModal
        })
        this.props.DateModal();
    }

    selectedDate =()=>{
        this.ToggleModal()
       this.props.doneDate(this.state.selectedStartDate); 
    }

    render() {
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        var getYear = moment(this.state.selectedStartDate, "DD/MM/YYYY").year();
        var month = moment(this.state.selectedStartDate).format("MMM");
        var weekDayName = moment(this.state.selectedStartDate).format('ddd');
        let date = this.state.selectedStartDate.get('date');
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isModal}
                onRequestClose={() => {
                     this.ToggleModal()
                }}>
                <View style={styles.container}>
                    <View style={{ width: '100%', backgroundColor: Apptheme, height: 100 }}>
                        <Text style={{ paddingLeft: 25, color: lightText, paddingTop: 10, fontSize: 20 }}>
                            {getYear}
                        </Text>
                        <Text style={{ paddingLeft: 25, color: lightText, paddingTop: 5, fontSize: 30, fontWeight: 'bold' }}>{weekDayName}, {month} {date}</Text>
                    </View>
                    <View style={{ width: '100%', position: 'relative', }}>
                        <CalendarPicker
                            width={screenWidth - 50}
                            startFromMonday={true}
                            scaleFactor={425}
                            onDateChange={this.onDateChange}
                            previousTitle="  previous  "
                            selectedDayTextColor="#FFFFFF"
                            selectedDayStyle={{ backgroundColor: Apptheme, color: "#ffffff" }}
                            selectedStartDate={startDate}
                            selectedDayColor="#FFFFFF"
                            selectedDayTextColor="#FFFFFF"
                            nextTitleStyle={{ paddingVertical: 5, fontWeight: 'bold', fontSize: 16, color: Apptheme, paddingHorizontal: 10 }}
                            previousTitleStyle={{ paddingVertical: 5, fontWeight: 'bold', fontSize: 16, color: Apptheme, paddingHorizontal: 10 }}
                            todayBackgroundColor={'transparent'}
                            todayTextStyle="green"
                            textStyle={{
                                fontFamily: 'Cochin',
                                paddingHorizontal: 2,
                                fontSize: 14,
                                color: '#000000',
                            }}
                            nextTitle="  next  "
                        />
                    </View>
                    <View style={styles.bottomView}>

                        <TouchableOpacity style={styles.bottomButton}
                            onPress={() => this.ToggleModal()}>
                            <Text style={styles.bottomBtnText}>CANCEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bottomButton} onPress={() => this.selectedDate()}>
                            <Text style={styles.bottomBtnText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        height: '70%',
        top: '10%',
        marginHorizontal: '10%',
        elevation: 4,
        // flex: 1,
        backgroundColor: '#FFFFFF',
    },
    bottomButton: {
        paddingHorizontal: 10,
        marginHorizontal: 10,
        paddingVertical: 10,
        zIndex:999
    },
    bottomBtnText: {
        color: Apptheme, fontWeight: 'bold'
    },
    bottomView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        height: 50,
        position: 'absolute',
        bottom: 20,
        zIndex:2
    }
});