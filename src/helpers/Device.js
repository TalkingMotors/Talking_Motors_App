export let saveUpdateDevice = async (params) => {
    let response = await DeviceService.registerDevice(params)
    try {
      console.log(response)
    } catch (e) {
      console.log(e);
    }
}

export let showAndroidNotification = (notification) =>{
    try{
        const data = notification.data
        console.log(JSON.stringify(data))
        let notificationTitle =  notification._title != undefined ? notification._title : data.Title;
        let notificationMessage = notification._body;
        Alert.alert(
            notificationTitle,
            notificationMessage,
            [{ text: 'OK', onPress: () => { } }],
            { cancelable: false },
          )
  }
    catch (e) {
      console.log(e);
    }
  }

  export let showIOSNotification = (notification) =>{
    try{
        const data = notification.getData()
        let notificationDetail = data;
        let notificationTitle = data.Title;
        let notificationMessage = notification.getMessage()
        Alert.alert(
            notificationTitle,
            notificationMessage,
            [{ text: 'OK', onPress: () => { } }],
            { cancelable: false },
          )
  }
    catch (e) {
      console.log(e);
    }
  }