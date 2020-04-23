import APIConstants from '../helpers/APIConstants';
import * as Utilities from "../helpers/Utilities";
import Storage from '../helpers/Storage';





export let getVehicleBy = async (vrn) => {
    try {
        if (Storage.networkStatus.isConnected) {
            console.log(APIConstants.GET_VEHICLE_BY_VRM_ENDPOINT + vrn)
            console.log("Bearer " + Storage.jwt_Token);
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


export let RemoveVehicleImage = async () => {
    try {
        if (Storage.networkStatus.isConnected) {
            console.log(APIConstants.REMOVE_VEHICLE_IMAGE_ENDPOINT)
            let response = await fetch(APIConstants.REMOVE_VEHICLE_IMAGE_ENDPOINT, {
                method: 'GET',
                crossDomain: true,
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





