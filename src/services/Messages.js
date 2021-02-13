import APIConstants from '../helpers/APIConstants';
import * as Utilities from "../helpers/Utilities";
import Storage from '../helpers/Storage';

export let MyConversations = async () => {
    try {
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.GET_MY_CONVERSATIONS_ENDPOINT + '?inviteStatuses=1&inviteStatuses=3&inviteStatuses=5&numberOfResults=-11', {
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

export let getConversationByUserIds = async (param) => {
    try {
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.GET_CONVERSATION_BY_USER_IDS_ENDPOINT + "?" + param.userIds + "&vrm=" + param.vrm + "&numberOfResults=50", {
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
export let addUserToGroup = async (params) => {
    try {
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.ADD_USER_TO_GROUP_ENDPOINT, {
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
export let removeUserToGroup = async (params) => {
    try {
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.REMOVE_USER_FROM_GROUP_ENDPOINT, {
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
export let createGroup = async (params) => {
    try {
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.CREATE_GROUP_ENDPOINT, {
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

        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.UPDATE_LAST_READ_ID_ENDPOINT, {
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
        console.log("error", e.message)
        return null
    }
}
export let updateGroupInvite = async (params) => {
    try {

        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.UPDATE_GROUP_INVITE_ENDPOINT, {
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
        console.log("error", e.message)
        return null
    }
}

export let updateConversationName = async (params) => {
    try {
         if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.SET_CONVERSATION_NAME_ENDPOINT, {
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
        console.log("error", e.message)
        return null
    }
}

export let ClearChatHistory = async (params) => {
    try {
         if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.CLEAR_CHAT_HISTORY_ENDPOINT, {
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
        console.log("error", e.message)
        return null
    }
}

export let BlockUser = async (params) => {
    try {
         if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.BLOCK_USER_ENDPOINT, {
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
        console.log("error", e.message)
        return null
    }
}
export let GetBlockUser = async () => {
    try {
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
        if (Storage.networkStatus.isConnected) {
            let response = await fetch(APIConstants.UNBLOCK_USER_ENDPOINT, {
                method: 'DELETE',
                headers: Utilities.setHeaders(),
                body: JSON.stringify(params)
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

