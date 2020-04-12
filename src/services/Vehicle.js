import APIConstants from '../helpers/APIConstants';
import * as Utilities from "../helpers/Utilities";
import Storage from '../helpers/Storage';
export let getVehicleBy = async (vrn) => {
    try {
        if (Storage.networkStatus.isConnected) {
            console.log(APIConstants.GET_VEHICLE_BY_VRM_ENDPOINT + vrn)
            console.log("Bearer "+ Storage.jwt_Token);
            let response = await fetch(APIConstants.GET_VEHICLE_BY_VRM_ENDPOINT + vrn, {
                method: 'GET',
                crossDomain: true,
                headers:Utilities.setHeaders()
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
            console.log(APIConstants.MY_VEHICLES_ENDPOINT )
            let response = await fetch(APIConstants.MY_VEHICLES_ENDPOINT , {
                method: 'GET',
                crossDomain: true,
                headers:Utilities.setHeaders()
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

