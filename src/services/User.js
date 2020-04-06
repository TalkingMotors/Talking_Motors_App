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

export let updateUser = async (userObj) => {
    try {
        console.log(APIConstants.UPDATE_USER_ENDPOINT);
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.UPDATE_USER_ENDPOINT, {
                method: 'PATCH',
                headers: Utilities.setHeaders(),
                body: JSON.stringify({
                    userObj
                })
            })
            let result = response.json()
            return result;
        } else {
            return null
        }
    } catch (e) {
        console.log("error", e.message)
        return null
    }
}


export let changeProfilePhoto = async (image) => {
    try {
        console.log(APIConstants.UPDATE_PROFILE_IMAGE_ENDPOINT);
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(UrlConstant.activeCities, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: image
                })
            })
            let result = response.json()
            return result;
        } else {
            return null
        }
    } catch (e) {
        return null
    }
}



