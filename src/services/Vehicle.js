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
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer "+ Storage.jwt_Token,            
                },
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

