// import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	Image,
	Dimensions,
	Animated,
	Easing,
	Platform,
	Alert,
	TouchableWithoutFeedback
} from 'react-native';
import { withNavigation } from 'react-navigation';
screenHeight = Dimensions.get('window').height;
screenWidth = Dimensions.get('window').width;
import Storage from '../helpers/Storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Utilities from '../helpers/Utilities';
import { Apptheme, lightText, darkText, LinearColor, lightBg, LinearColorGreen, GreenBg } from '../helpers/CommponStyle';
import Constants from '../helpers/Constants';
import { getConverationDetail } from '../screens/Messenger';
var IntervalStart;
var isPaused = false;
var myVar;
class NotificationBadges extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: false,
			count: -1,
			title: '',
			message: '',
			buttonText: '',
			data: {},
			membershipId: '',
			notificationType: '',
			image: '',
			progress: 0,
			indeterminate: true,
			isSoundPlayed: false

		}
		this.animatedValue3 = new Animated.Value(0)
		this.animatedValue2 = new Animated.Value(0)

		this.TimerClock = this.TimerClock.bind(this)
		this.handlerLongClick = this.handlerLongClick.bind(this)
		this.progressBar = this.progressBar.bind(this)
		this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
			if (myVar != undefined) {
				clearInterval(myVar)
			}
			this.updateTimerClock();
		})
	}
	componentDidMount() {

		this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
			if (myVar != undefined) {
				clearInterval(myVar)
			}
			this.updateTimerClock();
		})
	}
	handlerLongClick() {
		try {
			this.StopInterval();
		}
		catch (e) {
			Utilities.logAppException("NotificationBadges", "handlerLongClick", "", "Exception", e.message)

		}
	}
	StopInterval = () => {
		try {
			clearInterval(IntervalStart);
			IntervalStart = undefined;
		}
		catch (e) {
			Utilities.logAppException("NotificationBadges", "StopInterval", "", "Exception", e.message)
		}
	}

	updateTimerClock = () => {
		try {
			myVar = setInterval(this.TimerClock, 5000);
		}
		catch (e) {
			Utilities.logAppException("NotificationBadges", "updateTimerClock", "", "Exception", e.message)
		}
	}

	TimerClock = () => {
		try {
			if (Object.keys(Storage.NotificationObject).length > 0) {

				if (this.state.count == -1) {
					this.setState({
						isActive: true,
					})
					this.animate();

					this.showNotificationAndroid(Storage.NotificationObject)
				}
			}
			else {
				this.setState({
					isActive: false,
					count: -1
				})
			}
		}
		catch (e) {
			Utilities.logAppException("NotificationBadges", "TimerClock", "", "Exception", e.message)
		}
	}

	progressBar = () => {
		try {
			let progress = 0;
			this.setState({ progress: progress });
			this.setState({ indeterminate: false });
			IntervalStart = setInterval(() => {
				if (!isPaused) {
					progress += 0.01;
					if (progress > 1.1) {
						progress = 0;
						this.hideBadge();
						this.StopInterval()
					}
					this.setState({ progress: progress });
				}
			}, 50);

		}
		catch (e) {
			Utilities.logAppException("NotificationBadges", "progressBar", "", "Exception", e.message)
		}
	}
	animate = () => {
		try {
			this.state.count = 0
			this.setState({
				count: 0
			})
			this.animatedValue3.setValue(0)
			const createAnimation = function (value, duration, easing, delay = 0) {
				return Animated.timing(
					value,
					{
						toValue: 1,
						duration,
						easing,
						delay
					}
				)
			}
			Animated.parallel([
				createAnimation(this.animatedValue3, 1000, Easing.ease, 0)
			]).start()
			if (IntervalStart == undefined) {
				this.progressBar()
			}
		}
		catch (e) {
			Utilities.logAppException("NotificationBadges", "animate", "", "Exception", e.message)
		}
	}
	animateHide = () => {
		try {
			this.animatedValue2.setValue(0)
			const createAnimation = function (value, duration, easing, delay = 0) {
				return Animated.timing(
					value,
					{
						toValue: 1,
						duration,
						easing,
						delay
					}
				)
			}
			Animated.parallel([
				createAnimation(this.animatedValue2, 500, Easing.ease, 0)
			]).start()
		} catch (e) {
			Utilities.logAppException("NotificationBadges", "animateHide", "", "Exception", e.message)
		}
	}
	hideBadge = () => {
		try {

			this.setState({
				isActive: false,
				title: '',
				message: '',
				buttonText: '',
				data: {},
				membershipId: '',
				notificationType: '',
				image: '',
				count: -1,
				progress: 0.0, LongPress: false,
				isSoundPlayed: false
			})
			Storage.NotificationObject = {};
		} catch (e) {
			Utilities.logAppException("NotificationBadges", "hideBadge", "", "Exception", e.message)
		}
	}

	showNotificationAndroid = (notification) => {
		try {
			const data = notification.data;
			console.log("Notification Badges", notification.data)
			console.log("title", data.title);
			console.log("message", data.message);
			let message = JSON.parse(data.message);
			getConverationDetail(message.message.conversationId)
			this.setState({
				title: data.title,
				message: message
			})
		} catch (e) {
			Utilities.logAppException("NotificationBadges", "showNotificationAndroid", "", "Exception", e.message)
		}
	}
	notificationApplyButton = () => {
		try {
			this.hideBadge();
			this.props.navigation.navigate("Messenger", { conversationId: this.state.message.message.conversationId })
			clearInterval(myVar);

		} catch (e) {
			Utilities.logAppException("NotificationBadges", "notificationApplyButton", "", "Exception", e.message)
		}
	}
	render() {
		const introButton = this.animatedValue3.interpolate({
			inputRange: [0, 1],
			outputRange: [-500, 0]
		})
		const hide = this.animatedValue2.interpolate({
			inputRange: [0, 1],
			outputRange: [20, -500]
		})
		if (this.state.isActive == true) {
			return (

				<Animated.View style={{ top: introButton, paddingVertical: 10, zIndex: 99, position: 'absolute', width: '100%', backgroundColor: GreenBg }}>
					<TouchableWithoutFeedback
					>
						<View>


							<View style={{ flexDirection: 'row', height: 45, alignItems: 'center' }}>
								<View style={{ width: 50, justifyContent: 'center' }}>

									<Image
										resizeMode="contain"
										style={{ marginLeft: 10, height: 30, width: 30 }}
										source={require('../images/header-logo.png')}
									/>
								</View>
								<View style={{ width: 220, marginHorizontal: 5 }}>

									<Text style={{ fontSize: 12, padding: 5, paddingLeft: 20, color: lightText, fontWeight: 'bold' }}>
										{this.state.title}
									</Text>
								</View>

								<TouchableOpacity onPress={() => this.notificationApplyButton()} style={{ height: "100%", width: 50, justifyContent: 'center', alignItems: 'center' }}>
									<Text style={{ color: lightBg, fontSize: 16, fontWeight: 'bold' }}>
										VIEW
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</Animated.View >
			)
		}
		else {
			return (
				null
			)
		}
	}
}

const styles = StyleSheet.create({

})

export default withNavigation(NotificationBadges);