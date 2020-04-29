import React, { Component } from 'react'
import NetInfo from '@react-native-community/netinfo';
import firebase from 'react-native-firebase';
import * as DeviceHelper from "../helpers/Device";
import Storage from "../helpers/Storage";
import DeviceInfo from 'react-native-device-info';
import Constants from '../helpers/Constants';
export default class AndroidNotification extends Component {
    async componentDidMount() {
            await  firebase.messaging().getToken()
            .then(fcmToken => {
              if (fcmToken) {
                 NetInfo.fetch().then(isConnected => {
                      if (isConnected) {
                        let udid = DeviceInfo.getUniqueId();
                        let params = { udid : udid, deviceType : 2, token : fcmToken }
                        DeviceHelper.saveUpdateDevice(params)
                     }
                   })
               } else {
                  console.log("user doesn't have a device token yet")
              } 
            });
            
      const notificationOpen = await firebase.notifications().getInitialNotification();
            if (notificationOpen) {
                const notification = notificationOpen.notification;
                DeviceHelper.showAndroidNotification(notification)
                firebase.notifications().removeDeliveredNotification(notification.notificationId);
            } 
            const channel = new firebase.notifications.Android.Channel(Constants.firebaseChannelId, 'Talking Motors', firebase.notifications.Android.Importance.Max).setDescription('Talking Motors');
            firebase.notifications().android.createChannel(channel);
            this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
            });
            this.notificationListener = firebase.notifications().onNotification((notification) => {
                notification.android.setChannelId(Constants.firebaseChannelId).android.setSmallIcon('ic_launcher');
                firebase.notifications().displayNotification(notification);
                DeviceHelper.showAndroidNotification(notification)
                firebase.notifications().removeDeliveredNotification(notification.notificationId);
                
            });
            this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
                const notification = notificationOpen.notification;
                DeviceHelper.showAndroidNotification(notification);
                firebase.notifications().removeDeliveredNotification(notification.notificationId);
                
            });
        }
        componentWillUnmount() {
            this.notificationDisplayedListener();
            this.notificationListener();
            this.notificationOpenedListener();
        }
        
  
  render() {
    return null
  }
}

