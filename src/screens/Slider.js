import React, { Component, createRef } from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    StyleSheet,
    Dimensions,
    FlatList,
} from 'react-native';
let CurrentSlide = 0;
let IntervalTime = 4000;
var screenWidth = Dimensions.get('window').width;
import { Apptheme, lightText, darkText, LinearColor, lightBg } from '../helpers/CommponStyle';

export default class Slider extends Component {
    flatList = createRef();
    constructor(props) {
        super(props)
        this.state = {
            link: this.props.Image
        };


    }
    // TODO _goToNextPage()
    _goToNextPage = () => {
        if (CurrentSlide >= this.state.link.length - 1) CurrentSlide = -1;
        this.flatList.current.scrollToIndex({
            index: ++CurrentSlide,
            animated: true,
        });
    };
    _startAutoPlay = () => {
        this._timerId = setInterval(this._goToNextPage, IntervalTime);
    };
    _stopAutoPlay = () => {
        if (this._timerId) {
            clearInterval(this._timerId);
            this._timerId = null;
        }
    };
    componentDidMount() {
        this._stopAutoPlay();
        this._startAutoPlay();
    }
    componentWillUnmount() {
        this._stopAutoPlay();
    }
    // TODO _renderItem()
    _renderItem({ item, index }) {
        return (
            <View>
                <Image source={{ uri: item.url }} style={styles.sliderItems} />
            </View>
        )
    }
    // TODO _keyExtractor()
    _keyExtractor(item, index) {
        // console.log(item);
        return index.toString();
    }

    render() {
        return (
            <View style={{ marginTop: 0, marginBottom: 0 }}>
                <FlatList
                    style={{
                        // flex: 1,
                        width: screenWidth,
                        height: 270
                        // TODO Remove extera global padding
                        // marginLeft: -size.padding,
                        // marginRight: -size.padding,
                    }}
                    data={this.state.link}
                    keyExtractor={this._keyExtractor.bind(this)}
                    renderItem={this._renderItem.bind(this)}
                    horizontal={true}
                    flatListRef={React.createRef()}
                    ref={this.flatList}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    sliderItems: {
        height: '100%',
        width: Dimensions.get('window').width,
    },
});