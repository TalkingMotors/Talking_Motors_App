import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Apptheme, lightText, darkText, LinearColor } from '../helpers/CommponStyle';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ParentPage: ''
        }
    }
    render() {
        if (this.props.ParentPage == "Home") {
            return (
                <View style={styles.MainView}>

                    <StatusBar
                        barStyle="light-content"
                        translucent={false}
                        backgroundColor={Apptheme}
                    />
                    <Feather
                        onPress={() => this.props.navigation.screenProps.openDraw()}
                        name="menu" color={lightText} size={22} style={styles.Icons} />
                    <Text style={styles.ScreenName}>{this.props.ParentPage}</Text>
                    <FontAwesome onPress={()=>this.props.Dashboard()} name="dashboard" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 10 }]} />
                </View>
            )
        }

        else if (this.props.ParentPage == "Dashboard") {
            return (
                <View style={styles.MainView}>
                    <Feather
                        onPress={() => this.props.navigation.navigation.goBack()}
                        name="arrow-left" color={lightText} size={22} style={styles.Icons} />
                    <Text style={styles.ScreenName}>{this.props.ParentPage}</Text>
                    <FontAwesome name="folder-open" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 10 }]} />
                </View>
            )
        }
        else if (this.props.ParentPage == "Detail") {
            return (
                <View style={styles.MainView}>
                    <Feather
                        onPress={() => this.props.navigation.navigation.goBack()}
                        name="arrow-left" color={lightText} size={22} style={styles.Icons} />
                    <Text style={styles.ScreenName}>{this.props.ParentPage}</Text>
                    <Feather name="share-2" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 10 }]} />
                </View>
            )
        }
        else if (this.props.ParentPage == "Message") {
            return (
                <View style={styles.MainView}>
                    <Feather
                        onPress={() => this.props.navigation.navigation.goBack()}
                        name="arrow-left" color={lightText} size={22} style={styles.Icons} />
                    <Text style={styles.ScreenName}>{this.props.ParentPage}</Text>
                    <Feather name="edit" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 10 }]} />
                    <FontAwesome name="user-times" color={lightText} size={22} style={[styles.Icons, { position: 'absolute', right: 50 }]} />
                </View>
            )
        }
        else {
            return (
                <LinearGradient colors={LinearColor} style={styles.MainView}>
                    <Feather
                        onPress={() => this.props.navigation.navigation.goBack()}
                        name="arrow-left" color={lightText} size={22} style={styles.Icons} />
                    <Text style={styles.ScreenName}>{this.props.ParentPage}</Text>
                </LinearGradient>
            )
        }
    }

}

const styles = StyleSheet.create({
    MainView: {
        width: '100%',
        height: 50,
        backgroundColor: Apptheme,
        // justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    Icons: {
        marginLeft: 10,
    },
    ScreenName: {
        paddingHorizontal: 15,
        color: lightText,
        fontSize: 16
    }
});