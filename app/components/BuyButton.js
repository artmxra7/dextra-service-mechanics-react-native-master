import React, {Component} from 'react';
import {
    TouchableNativeFeedback,
    Text,
    View,
    StyleSheet
} from 'react-native';

export default class BuyButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            onPress,
            style,
            text,
            textStyle,
        } = this.props;

        return (
            <View style={styles.container}>
                <TouchableNativeFeedback onPress={onPress}>
                    <View style={[styles.button, style]}>
                        <Text style={[styles.text, textStyle]}>{text}</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#4C4949',
        width: '100%',
        height: 24,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#fff',
    },
})
