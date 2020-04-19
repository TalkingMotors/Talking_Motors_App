
import React from 'react';
import { FluidNavigator, Transition } from '../../lib';
import { View, Image, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Apptheme, lightText, darkText, LinearColor, lightBg } from '../helpers/CommponStyle';
export default function VehicleImage(item) {
    if (item.param != [] && item.param.length > 0) {
        return (
            <Transition >
                <Image
                    resizeMode='cover'
                    style={{ marginLeft: 2, borderRadius: 20, width: '100%', height: '98%', }}
                    source={{ uri: item.param[0].url }}
                />
            </Transition>
        )
    }
    else {
        return (
            <View style={{ width: '100%', height: '90%', borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: "#fff" }}>
                <FontAwesome name="car" size={80} color={Apptheme} />
            </View>
        )
    }
}
