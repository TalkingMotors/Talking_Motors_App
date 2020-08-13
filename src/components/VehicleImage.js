
import React from 'react';
import { FluidNavigator, Transition } from '../../lib';
import { View, Image, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Apptheme, lightText, darkText, LinearColor, lightBg } from '../helpers/CommponStyle';
export default function VehicleImage(item) {
    if (item.param != [] && item.param.length > 0 && item.display==undefined) {
        return (
            <Transition >
                <Image
                    resizeMode='cover'
                    style={{ marginLeft: 5, borderRadius: 240, width: '100%', height: '100%', }}
                    source={{ uri: item.param[0].url }}
                />
            </Transition>
        )
    }
    else if (item.param != [] && item.param.length > 0 && item.display!=undefined){
        return (
            <Transition >
                <Image
                    resizeMode='cover'
                    style={{ marginLeft: 5, borderRadius: 240, width: '100%', height: '100%', }}
                    source={{ uri: item.param[0].url }}
                />
            </Transition>
        )
    }
    else if(item.display!=undefined){
        return (
        <View style={{ width: '100%', height: '100%', marginLeft: 5, borderRadius: 240, alignItems: 'center', justifyContent: 'center', backgroundColor: "#fff" }}>
        <FontAwesome name="car" size={80} color={Apptheme} />
    </View>
        )
    }
    else {
        return (
            <View style={{ width: '100%', height: '100%',marginLeft: 5, borderRadius: 240, alignItems: 'center', justifyContent: 'center', backgroundColor: "#fff" }}>
                <FontAwesome name="car" size={80} color={Apptheme} />
            </View>
        )
    }
}
