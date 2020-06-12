
const API_Path = {
    IP_URL: "http://54.171.245.252:80/",
    DEV_URL: "http://dev.talkingmotorsapp.com/",
    LIVE_URL: "http://live.talkingmotorsapp.com/",
    // BASE_URL : "http://dev.talkingmotorsapp.com/"
    BASE_URL : "http://live.talkingmotorsapp.com/"
    
};

const APIService = {
    LOGIN_ENDPOINT: API_Path.BASE_URL + "users/login",
    REGISTER_ENDPOINT: API_Path.BASE_URL + "users/register",
    FORGOTTEN_PASSWORD_ENDPOINT: API_Path.BASE_URL + "users/forgotten_password",
    FORGOTTEN_PASSWORD_SECOND_ENDPOINT: API_Path.BASE_URL + "users/forgotten_password_complete",
    INSERT_DEVICE: API_Path.BASE_URL + "users/insert-device",
    REMOVE_DEVICE: API_Path.BASE_URL + "users/remove-device",
    UPDATE_USER_ENDPOINT: API_Path.BASE_URL + "users/update",
    SEARCH_BY_REGISTRATION_NUMBER_ENDPOINT: API_Path.BASE_URL + "search/registration-number/",   //"search/registration-number/{vrm}",
    SEARCH_ENDPOINT: API_Path.BASE_URL + "search",
    MOT_ENDPOINT: API_Path.BASE_URL + "vehicle/mot-data",
    DVLA_ENDPOINT: API_Path.BASE_URL + "vehicle/all-dvla-data",
    MY_VEHICLES_ENDPOINT: API_Path.BASE_URL + "vehicle/my-vehicles",
    VEHICLE_DATA_ENDPOINT: API_Path.BASE_URL + "vehicle/vehicle-data/",    //"vehicle/vehicle-data/{vrm}",
    DVLA_VEHICLE_DATA_ENDPOINT: API_Path.BASE_URL + "vehicle/all-dvla-data/",   //"vehicle/all-dvla-data/{vrm}",
    DVLA_VEHICLE_AND_MOT_DATA_ENDPOINT: API_Path.BASE_URL + "/vehicle/vehicle-and-mot-data/",  //"/vehicle/vehicle-and-mot-data/{vrm}",
    VEHICLE_LOOKUPS_ENDPOINT: API_Path.BASE_URL + "vehicle-lookups",
    VEHICLE_LOOKUPS_FEATURES_ENDPOINT: API_Path.BASE_URL + "vehicle-lookups/features",
    GET_VEHICLE_BY_VRM_ENDPOINT: API_Path.BASE_URL + "vehicle/get-vehicle-by-vrm/",   //"vehicle/get-vehicle-by-vrm/{vrm}",
    VEHICLE_ENDPOINT: API_Path.BASE_URL + "vehicle/",
    INSERT_VEHICLE_IMAGE_ENDPOINT: API_Path.BASE_URL + "vehicle/insert-vehicle-image",
    FAVOURITE_VEHICLE_ENDPOINT: API_Path.BASE_URL +"vehicle/favourites",
    REMOVE_FAVOURITE_VEHICLE_ENDPOINT: API_Path.BASE_URL + "vehicle/remove-favourite",
    ADD_FAVOURITE_VEHICLE_ENDPOINT: API_Path.BASE_URL + "vehicle/add-favourite",
    SEND_MESSAGE_TO_USER_ENDPOINT: API_Path.BASE_URL + "messages/send-message-to-user",
    SEND_MESSAGE_TO_CONVERSATION_ENDPOINT: API_Path.BASE_URL + "messages/send-message-to-conversation",
    CREATE_GROUP_ENDPOINT: API_Path.BASE_URL + "messages/create-group",
    SET_CONVERSATION_NAME_ENDPOINT: API_Path.BASE_URL + "messages/set-name",
    ADD_USER_TO_GROUP_ENDPOINT: API_Path.BASE_URL + "messages/add-user-to-group",
    REMOVE_USER_FROM_GROUP_ENDPOINT: API_Path.BASE_URL + "messages/remove-user-from-group",
    UPDATE_GROUP_INVITE_ENDPOINT: API_Path.BASE_URL + "messages/update-group-invite",
    GET_CONVERSATION_BY_USER_IDS_ENDPOINT: API_Path.BASE_URL + "messages/get-conversation-by-user-ids",
    BLOCK_USER_ENDPOINT: API_Path.BASE_URL + "messages/block-user",
    UNBLOCK_USER_ENDPOINT: API_Path.BASE_URL + "messages/unblock-user",
    GET_BLOCKED_USERS: API_Path.BASE_URL + "messages/blocked-users",
    GET_MY_CONVERSATIONS_ENDPOINT: API_Path.BASE_URL + "messages/get-my-conversations",
    GET_CONVERSATION_MESSAGE_ENDPOINT: API_Path.BASE_URL + "messages/get-conversation-messages",
    UPDATE_LAST_READ_ID_ENDPOINT: API_Path.BASE_URL + "messages/update-last-read-id",
    CLEAR_CHAT_HISTORY_ENDPOINT: API_Path.BASE_URL + "messages/clear-conversation",
    GET_USER_VEHICLES_BY_USER_ID_ENDPOINT: API_Path.BASE_URL + "vehicle/get-vehicles-by-user-id/",   //"vehicle/get-vehicles-by-user-id/{id}",
    GET_USER_BY_USER_ID_ENDPOINT: API_Path.BASE_URL + "users/",   // users/{userId}
    UPDATE_PROFILE_IMAGE_ENDPOINT: API_Path.BASE_URL + "users/update-profile-image",
    GET_VEHICLE_BY_ID_ENDPOINT: API_Path.BASE_URL + "vehicle/",   //"vehicle/{id}",
    GET_USER_BY_EMAIL: API_Path.BASE_URL + "users/email/{email}",
    REMOVE_VEHICLE_IMAGE_ENDPOINT: API_Path.BASE_URL + "vehicle/remove-vehicle-image",
    REMOVE_USER_IMAGE_ENDPOINT: API_Path.BASE_URL + "users/remove-profile-image",
    GET_USER_BY_PHONE_NUMBER: API_Path.BASE_URL + "users/email/",     //"users/email/{telephone}",
}

export default APIService
