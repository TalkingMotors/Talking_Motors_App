import React, { Component } from 'react'
import * as DeviceHelper from "../helpers/Device";
import Storage from "../helpers/Storage";
import DeviceInfo from 'react-native-device-info';
import PushNotificationIOS from "@react-native-community/push-notification-ios";


export default class IOSNotifiction extends Component {
  componentDidMount() {
    if (Storage.networkStatus.isConnected) {
      PushNotificationIOS.addEventListener('register', apnsToken => {
        let udid = DeviceInfo.getUniqueID();
        let params = { udid : udid, deviceType : 2, token : apnsToken }
        DeviceHelper.saveUpdateDevice(params)
      })
    } else {
      console.log('PushNotificationHandler : isConnected ');
    }
    PushNotificationIOS.addEventListener('registrationError', registrationError => {
      console.log(registrationError, '--')
    })

    PushNotificationIOS.addEventListener('notification', function (notification) {
      if (!notification) {
        return
      }
      DeviceHelper.showIOSNotification(notification);
    })

    PushNotificationIOS.getInitialNotification().then(notification => {
      if (!notification) {
        return
      }
      DeviceHelper.showNotification(notification);
      PushNotificationIOS.removeAllDeliveredNotifications();
    })
    PushNotificationIOS.requestPermissions()
  }

  render() {
    return null
  }
}
