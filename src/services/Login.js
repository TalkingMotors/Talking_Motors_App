import APIConstants from '../helpers/APIConstants';
import * as Utilities from "../helpers/Utilities";
import Storage from '../helpers/Storage';
export let login = async (params) => {
    try {
        if(Storage.networkStatus.isConnected){
        let response = await fetch(APIConstants.LOGIN_ENDPOINT, {
            method: 'POST',
            headers: Utilities.setHeaders(),
            body: JSON.stringify(params)
        })
        let result = response.json()
        return result;
    }else{
        return null
    }
    } catch (e) {
        console.log(e.message)
        return null
    }
}

