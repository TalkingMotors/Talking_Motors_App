import APIConstants from '../helpers/APIConstants';
import * as Utilities from "../helpers/Utilities";
import Storage from '../helpers/Storage';

export let getVehicleData = async (vrn) => {
    try {
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.VEHICLE_DATA_ENDPOINT + vrn, {
                method: 'GET',
                crossDomain: true,
                headers: Utilities.setHeaders()
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
export let usersVehicle = async (userId) => {
    try {
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.GET_USER_VEHICLES_BY_USER_ID_ENDPOINT + userId, {
                method: 'GET',
                crossDomain: true,
                headers: Utilities.setHeaders()
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
export let searchRegisterNo = async (vrn) => {
    try {
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.SEARCH_BY_REGISTRATION_NUMBER_ENDPOINT + vrn, {
                method: 'GET',
                crossDomain: true,
                headers: Utilities.setHeaders()
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



export let getVehicleBy = async (vrn) => {
    try {
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.GET_VEHICLE_BY_VRM_ENDPOINT + vrn, {
                method: 'GET',
                crossDomain: true,
                headers: Utilities.setHeaders()
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

export let myVehicle = async () => {
    try {
        if (Storage.networkStatus.isConnected) {
            console.log(APIConstants.MY_VEHICLES_ENDPOINT)
            let response = await fetch(APIConstants.MY_VEHICLES_ENDPOINT, {
                method: 'GET',
                crossDomain: true,
                headers: Utilities.setHeaders()
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


export let RemoveVehicleImage = async (params) => {
    try {
       if (Storage.networkStatus.isConnected) {
            console.log(APIConstants.REMOVE_VEHICLE_IMAGE_ENDPOINT)
            let response = await fetch(APIConstants.REMOVE_VEHICLE_IMAGE_ENDPOINT, {
                method: 'DELETE',
                crossDomain: true,
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
export let InsertVehicleImage = async (params) => {
    try {
        if (Storage.networkStatus.isConnected) {
            console.log(APIConstants.INSERT_VEHICLE_IMAGE_ENDPOINT)
            let response = await fetch(APIConstants.INSERT_VEHICLE_IMAGE_ENDPOINT, {
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
export let UpdateVehicle = async (params) => {
    try {
       if (Storage.networkStatus.isConnected) {
            console.log(APIConstants.VEHICLE_ENDPOINT)
            let response = await fetch(APIConstants.VEHICLE_ENDPOINT, {
                method: 'PATCH',
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

export let GetSpecificVehicle = async (id) => {
    try {
        if (Storage.networkStatus.isConnected) {
            console.log(APIConstants.VEHICLE_ENDPOINT)
           let response = await fetch(APIConstants.VEHICLE_ENDPOINT + id, {
                method: 'GET',
                headers: Utilities.setHeaders(),
                // body: JSON.stringify(params)
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




