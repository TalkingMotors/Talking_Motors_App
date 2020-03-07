import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Button,
    TouchableOpacity,
    Image
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { Apptheme, lightText, darkText, LinearColor, lightBg } from '../helpers/CommponStyle';
import Topbar from '../components/Topbar';
export default class Search extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                 <Topbar ParentPage="Search" navigation={this.props}/>
                <Text>Search Screen</Text>
               
            </View>
        )
    }
}