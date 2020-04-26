import APIConstants from '../helpers/APIConstants';
import * as Utilities from "../helpers/Utilities";
import Storage from '../helpers/Storage';

export let MyConversations = async () => {
    try {
        if(Storage.networkStatus.isConnected){
        let response = await fetch(APIConstants.GET_MY_CONVERSATIONS_ENDPOINT, {
            method: 'GET',
            headers: Utilities.setHeaders()
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

export let GetConversationDetail = async (id) => {
    try {
        if(Storage.networkStatus.isConnected){
        let response = await fetch(APIConstants.GET_CONVERSATION_MESSAGE_ENDPOINT + "?id=" + id, {
            method: 'GET',
            headers: Utilities.setHeaders()
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

