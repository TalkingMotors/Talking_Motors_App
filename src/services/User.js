import APIConstants from '../helpers/APIConstants';
import * as Utilities from "../helpers/Utilities";
import Storage from '../helpers/Storage';
export let getUserById = async (userId) => {
    try {
        if (Storage.networkStatus.isConnected) {
            console.log(APIConstants.GET_USER_BY_USER_ID_ENDPOINT+userId)
            let response = await fetch(APIConstants.GET_USER_BY_USER_ID_ENDPOINT + userId)
            let result = response.json()
            return result;
        } else {
            return null
        }
    } catch (e) {
        console.log(e.message)
        return null
    }
}

