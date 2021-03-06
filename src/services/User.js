import APIConstants from '../helpers/APIConstants';
import * as Utilities from "../helpers/Utilities";
import Storage from '../helpers/Storage';

export let login = async(params) => {
    try {
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.LOGIN_ENDPOINT, {
                method: 'POST',
                headers: Utilities.setHeaders(),
                body: JSON.stringify(params)
            })
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

export let register = async(params) => {
    try {
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.REGISTER_ENDPOINT, {
                method: 'POST',
                headers: Utilities.setHeaders(),
                body: JSON.stringify(params)
            })
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


export let getUserById = async(userId) => {
    try {
        if (Storage.networkStatus.isConnected) {
            console.log(APIConstants.GET_USER_BY_USER_ID_ENDPOINT + userId)
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

export let updateUser = async(userObj) => {
    try {
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.UPDATE_USER_ENDPOINT, {
                method: 'PATCH',
                headers: Utilities.setHeaders(),
                body: JSON.stringify(userObj)
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


export let changeProfilePhoto = async(image) => {
    try {
        console.log(APIConstants.UPDATE_PROFILE_IMAGE_ENDPOINT);
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.UPDATE_PROFILE_IMAGE_ENDPOINT, {
                method: 'PATCH',
                headers: Utilities.setHeaders(),
                body: JSON.stringify({
                    image: image
                })
            })
            let result = response.json()
            return result;
        } else {
            console.log(e.message)
            return null
        }
    } catch (e) {
        return null
    }
}
export let removeProfileImage = async() => {
    try {
        console.log(APIConstants.REMOVE_USER_IMAGE_ENDPOINT);
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.REMOVE_USER_IMAGE_ENDPOINT, {
                method: 'DELETE',
                headers: Utilities.setHeaders(),
            })
            let result = response.json()
            return result;
        } else {
            console.log(e.message)
            return null
        }
    } catch (e) {
        return null
    }
}


export let ForgetPasswordCode = async(params) => {
    try {
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.FORGOTTEN_PASSWORD_ENDPOINT, {
                method: 'POST',
                headers: Utilities.setHeaders(),
                body: JSON.stringify(params)
            })

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
export let ForgotPasswordComplete = async(params) => {
    try {
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.FORGOTTEN_PASSWORD_SECOND_ENDPOINT, {
                method: 'POST',
                headers: Utilities.setHeaders(),
                body: JSON.stringify(params)
            })

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