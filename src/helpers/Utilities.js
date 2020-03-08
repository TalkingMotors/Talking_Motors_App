import Storage from './Storage';

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

export let setHeaders = () => {
    try{
        if(Object.keys(Storage.userData).length > 0){
            return   {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'ApplicationId': Settings.gv_applicationId,
                'AuthenticationTicket': Storage.userLoginDetails.AuthenticationToken,
                'UserID' : Storage.userLoginDetails.MembershipUserId,
                'DeviceID' : Storage.deviceUUID
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