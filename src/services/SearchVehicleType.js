import APIConstants from '../helpers/APIConstants';
import * as Utilities from "../helpers/Utilities";
import Storage from '../helpers/Storage';



export let VehicleLookup = async () => {
    try {
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.VEHICLE_LOOKUPS_ENDPOINT , {
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
export let VehicleLookupAllFeatures = async () => {
    try {
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants. VEHICLE_LOOKUPS_FEATURES_ENDPOINT , {
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


export let SearchVehicleTypes = async (param) => {
    try {
        if (Storage.networkStatus.isConnected) {
            var parameters = Utilities.Generate_GET_Params(param)
            let response = await fetch(APIConstants.SEARCH_ENDPOINT + parameters, {
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