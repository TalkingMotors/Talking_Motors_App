import Storage from './Storage';

export let stringIsEmpty = (str) => {
    return (!str || /^\s*$/.test(str));
};
export let setHeaders = () => {
    try{
        if(Object.keys(Storage.userData).length > 0){
            return   {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'ApplicationId': Settings.gv_applicationId,
                'AuthenticationTicket': Storage.userLoginDetails.AuthenticationToken,
                'UserID' : Storage.userLoginDetails.MembershipUserId,
                'DeviceID' : Storage.deviceUUID
            }
        }else{
            return   {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
             }
        }
     
    }
    catch(e){
        return   {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         }
    }
        
}