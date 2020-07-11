import Storage from './Storage';
import AsyncStorage from '@react-native-community/async-storage'
import Moment from 'moment';
export let stringIsEmpty = (str) => {
    return (!str || /^\s*$/.test(str));
};

export let asyncStorage_SaveKey = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log("Error saving data" + error);
    }
}

export let asyncStorage_GetKey = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        console.log("Error retrieving data" + error);
    }
}

export let asyncStorage_RemoveKey = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log("Error resetting data" + error);
    }
}

export let Generate_GET_Params = (params) => {
    try {
        var Keys = Object.keys(params)
        var parameters = Keys.length > 0 ? "?" : "";

        Keys.forEach((element, index) => {
            parameters += element + "=" + params[element] + "&"
        });
        parameters = Keys.length > 0 ? parameters.substring(0, parameters.length - 1) : parameters
        return parameters
    }
    catch (e) {
        console.log("Generate_GET_Params", e)
    }
}


export let setHeaders = () => {
    try{
        if(Object.keys(Storage.userData).length > 0){
            return   {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':  "Bearer "+ Storage.jwt_Token   
            }
        }else{
            return   {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
             }
        }
     
    }
    catch(e){
        return   {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         }
    }
        
}

export let FormatDate = (dateTimeValue) => {
    try {
        if (!stringIsEmpty(dateTimeValue)) {
          var formateDate =  Moment(dateTimeValue).format('dddd DD MMM YYYY')
        }
            return formateDate;
        }
    catch (e) {
        console.log("FormatDate", e)
    }
}

export let FormatTime = (dateTimeValue) => {
    try {
        if (!stringIsEmpty(dateTimeValue)) {
          var formateDate =  Moment(dateTimeValue).format('hh:mm A')
        }
            return formateDate;
        }
    catch (e) {
        console.log("FormatDate", e)
    }
}

export const emailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);