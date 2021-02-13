import React from 'react';
import { View, StatusBar ,Platform} from 'react-native';
// import styles from './styles/GeneralStatusBarColorStyles';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 25 : StatusBar.currentHeight;

const GeneralStatusBarColor = ({ backgroundColor, ...props }) => (
<View style={{height:STATUSBAR_HEIGHT, backgroundColor }}>
<StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);
export default GeneralStatusBarColor;