import React, { Component } from 'react';
import {
    TouchableNativeFeedback,
    Text,
    View,
    StyleSheet,
    Animated,
    Easing
} from 'react-native';

export default class PackToggle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: props.value || 'pcs',
        };

        this.togglePosX = new Animated.Value(0);
        this.onPress = this.onPress.bind(this);
    }

    componentDidMount() {
        let { type } = this.state;
        let initPosX = type == 'pcs' ? 0 : 64;

        this.togglePosX.setValue(initPosX);
    }

    onPress() {
        let { onPress } = this.props;
        let { type } = this.state;
        let targetPosX = type == 'pcs' ? 64 : 0;

        Animated
            .timing(this.togglePosX, {
                toValue: targetPosX,
                duration: 500,
                easing: Easing.bounce
            })
            .start(() => {
                type = type == 'pcs' ? 'box' : 'pcs';

                this.setState({ type });
                onPress(type);
            });
    }

    render() {
        let { type } = this.state;
        let stylePosX = { left: this.togglePosX };

        return (
            <TouchableNativeFeedback onPress={this.onPress}>
                <View style={localStyles.container}>
                    <Animated.View style={[localStyles.toggle, stylePosX]}>
                        <Text style={localStyles.caption}>
                            {type == 'pcs' ? 'Pcs' : 'Box'}
                        </Text>
                    </Animated.View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

PackToggle.defaultProps = {
    onPress: () => { }
};

const localStyles = StyleSheet.create({
    container: {
        width: 128,
        height: 20,
        backgroundColor: '#efefef',
        borderRadius: 4,
        position: 'relative'
    },
    toggle: {
        width: 64,
        height: 20,
        backgroundColor: '#ffb643',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    caption: {
        color: 'white',
        fontSize: 10,
    }
});
