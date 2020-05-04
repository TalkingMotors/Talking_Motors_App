import APIConstants from '../helpers/APIConstants';
import * as Utilities from "../helpers/Utilities";
import Storage from '../helpers/Storage';

export let MyConversations = async () => {
    try {
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.GET_MY_CONVERSATIONS_ENDPOINT, {
                method: 'GET',
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

export let GetConversationDetail = async (id) => {
    try {
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.GET_CONVERSATION_MESSAGE_ENDPOINT + "?id=" + id, {
                method: 'GET',
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

export let sendMessageToConversation = async (params) => {
    try {
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.SEND_MESSAGE_TO_CONVERSATION_ENDPOINT, {
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

export let sendMessage = async (params) => {
    try {
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.SEND_MESSAGE_TO_USER_ENDPOINT, {
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

export let updateMessageStatusToRead = async (params) => {
    try {
        console.log(APIConstants.UPDATE_LAST_READ_ID_ENDPOINT);
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.UPDATE_LAST_READ_ID_ENDPOINT, {
                method: 'PATCH',
                headers: Utilities.setHeaders(),
                body: JSON.stringify({
                    params
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
export let updateConversationName = async (params) => {
    try {
        console.log(APIConstants.SET_CONVERSATION_NAME_ENDPOINT);
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.SET_CONVERSATION_NAME_ENDPOINT, {
                method: 'PATCH',
                headers: Utilities.setHeaders(),
                body: JSON.stringify({
                    params
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
export let ClearChatHistory = async (params) => {
    try {
        console.log(APIConstants.CLEAR_CHAT_HISTORY_ENDPOINT);
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.CLEAR_CHAT_HISTORY_ENDPOINT, {
                method: 'PATCH',
                headers: Utilities.setHeaders(),
                body: JSON.stringify({
                    params
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

export let BlockUser = async (params) => {
    try {
        console.log(APIConstants.BLOCK_USER_ENDPOINT);
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.BLOCK_USER_ENDPOINT, {
                method: 'POST',
                headers: Utilities.setHeaders(),
                body: JSON.stringify({
                    params
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
export let GetBlockUser = async () => {
    try {
        console.log(APIConstants.GET_BLOCKED_USERS);
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.GET_BLOCKED_USERS, {
                method: 'GET',
                headers: Utilities.setHeaders(),
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
export let UnBlockUsers = async (params) => {
    try {
        console.log(APIConstants.UNBLOCK_USER_ENDPOINT);
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.UNBLOCK_USER_ENDPOINT, {
                method: 'DELETE',
                headers: Utilities.setHeaders(),
                body: JSON.stringify({
                    params
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

