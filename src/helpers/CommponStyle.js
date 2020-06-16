import { StyleSheet,Dimensions } from 'react-native';
// export const Apptheme = '#ff6b00';
// export const Apptheme = '#F97001';
export const Apptheme = '#FE6801';
export const lightText = '#fff';
export const darkText = '#333';
export const lightBg = '#fff';
export const darkBg = '#333';
export const linkText = '#03A9F4';
export const GreenBg = '#A5DD00';
// export const LinearColor=['#ff6b00', '#f57f17', '#ff8f00']
// export const LinearColor = ['#FFA12C', '#FF872C', '#FE612C']
export const LinearColor = ['#FE6801', '#FD6B00', '#E96B15']
// export const LinearColorBlue = ['#66a6ff', '#89f7fe']
export const LinearColorBlue = ['#1f2F98', '#5E72EB']
export const LinearColorPink = ['#Ea4492', '#ff9a9e']
// export const LinearColorPink = ['#fecfef', '#ff9a9e']
export const LinearColorGreen = ['#A5DD00', '#A5DD00']


export default StyleSheet.create({

    GradiendButtonView: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: '100%',
        height: 45,
        marginVertical: 15
    },
    ButtonInnerText: {
        fontSize: 16,
        color: lightText,
        textAlign: 'center'

    },
    LogoView: {
        width: '100%',
        height: 120,
        marginTop: 20,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    LogoGradient: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        height: 110,
        borderRadius: 10
    },
    ButtonView: {
        marginTop: 0,
        width: '90%',
        marginHorizontal: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorView:{
        alignSelf:"center"
    },
    errorViewText: {
        borderRadius: 10,
        color: '#fa3335',
        textAlign: 'center',
        backgroundColor: '#ffe0e0',
        padding: 2,
        paddingHorizontal:20,
        fontSize:14
    },
    menuLoaderView: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: '100%',
        backgroundColor: 'rgba(255,255,255, 0.7)',
        // backgroundColor: 'red',
        zIndex: 10000,
        alignItems: 'center',
        justifyContent: 'center',
        top: 60
    },
})



{/* <resources>
    <color name="colorPrimary">#FF6B00</color>
    <color name="colorPrimaryDark">#FF6B00</color>
    <color name="colorAccent">#FF6B00</color>


    <color name="colorPrimaryAlpha">#A6FF6B00</color>

    <color name="very_light_grey">#F2F2F2</color>
    <color name="background_light_grey">#f5f5f5</color>

    <color name="transparentGrey">#B36D6E71</color>
    <color name="transparentBlack">#B3000000</color>
    <color name="colorInactive">#CCCCCC</color>

    <color name="colorPrimaryText">#6D6E71</color>
    <color name="colorSecondaryText">#645F60</color>
    <color name="colorLightText">#797878</color>


    <color name="gauge_green_alpha">#CCA3D837</color>


    <color name="colorDivider">#DDDDDD</color>
    <color name="colorVeryLightGrey">#F0F0F1</color>


    <color name="orbit_green">#A5DD00</color>
    <color name="orbit_green_dark">@color/green</color>

    <color name="statusBarLight">@color/colorDivider</color>

    <color name="grey">#AEAEAE</color>
    <color name="grey_dark">@color/colorPrimaryText</color>


    <color name="gauge_grey_light">#EBEBEB</color>
    <color name="gauge_orange">#FD7235</color>
    <color name="gauge_red">#E40427</color>

    <color name="red">#E40427</color>
    <color name="green">#9FCC32</color>
    <color name="blue">#0000FF</color>
    <color name="medium_violet_red">#C71585</color>
    <color name="cyan">#00FFFF</color>
    <color name="yellow">#FECC36</color>
    <color name="magenta">#FF00FF</color>
    <color name="indian_red">#CD5C5C</color>
    <color name="greenYellow">#ADFF2F</color>
    <color name="midnight_blue">#191970</color>
    <color name="orange">#FFA500</color>
    <color name="light_pink">#FFB6C1</color>
    <color name="peru">#CD853F</color>
    <color name="purple">#800080</color>
    <color name="dark_red">#8B0000</color>
    <color name="light_steel_blue">#B0C4DE</color>
    <color name="medium_orchid">#BA55D3</color>
    <color name="sky_blue">#87CEEB</color>
    <color name="olive">#808000</color>
    <color name="medium_slate_blue">#7B68EE</color>
    <color name="dark_olive_green">#556B2F</color>
    <color name="dark_slate_gray">#2F4F4F</color>
    <color name="teal">#008080</color>
    <color name="coral">#FF7F50</color>
    <color name="peach_puff">#FFDAB9</color>

</resources> */}
