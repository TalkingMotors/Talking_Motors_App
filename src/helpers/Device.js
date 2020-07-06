import * as DeviceService from '../services/Device';
import { Alert } from 'react-native';

export let saveUpdateDevice = async (params) => {
  try {
    let response = await DeviceService.Device(params)
    console.log("saveUpdateDevice response", response)
  } catch (e) {
    console.log(e);
  }
}

export let showAndroidNotification = (notification, props) => {
  try {
    const data = notification.data
    console.log("data", data);
    let message = JSON.parse(data.message);
    props.props.navigation.navigate("Messenger", { conversationId: message.message.conversationId })
  }
  catch (e) {
    console.log(e);
  }
}

export let showIOSNotification = (notification) => {
  try {
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