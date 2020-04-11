import APIConstants from '../helpers/APIConstants';
import Settings from '../helpers/Config';
import * as Utilities from "../helpers/Utilities";
import Storage from '../helpers/Storage';
export let Device = async (params) => {
    try {
        if(Storage.networkStatus.isConnected){
        let response = await fetch(APIConstants.INSERT_DEVICE, {
            method: 'POST',
            headers: Utilities.setHeaders(),
            body: JSON.stringify(params)
        })

        let result = response.json()
        return result;
    }else{
        return null
    }
    } catch (error) {
        return null
    }
}