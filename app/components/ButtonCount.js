import React, { Component } from 'react';
import {
    TouchableNativeFeedback,
    Text,
    View,
    StyleSheet
} from 'react-native';

import { Icon } from 'react-native-elements';

export default class ButtonCount extends Component {
    constructor(props) {
        super(props);

        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
    }

    decrease() {
        let { 
            min = 0, 
            onChange,
            value
        } = this.props;

        if (value - 1 >= min) {
            value--;
            onChange(value);
        }
    }

    increase() {
        let { 
            max, 
            onChange,
            value 
        } = this.props;

        if (max) {
            if (value + 1 <= max) {
                value++;
            }
        } else {
            value++;
        }

        onChange(value);
    }

    render() {
        let {
            styleContainer,
            value
        } = this.props;

        return (
            <View style={[styles.container, styleContainer]}>
                <TouchableNativeFeedback onPress={this.decrease}>
                    <View style={[styles.button, styles.button_minus]}>
                        <Icon
                            name="minus"
                            type="font-awesome"
                            color="#fff"
                            size={16}
                            style={styles.icon} />
                    </View>
                </TouchableNativeFeedback>
                <View style={[styles.button, styles.button_count]}>
                    <Text style={styles.text}>{value}</Text>
                </View>
                <TouchableNativeFeedback onPress={this.increase}>
                    <View style={[styles.button, styles.button_plus]}>
                        <Icon
                            name="plus"
                            type="font-awesome"
                            color="#fff"
                            size={16}
                            style={styles.icon} />
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 128,
        flexDirection: 'row',
        marginVertical: 2,
    },
    button: {
        backgroundColor: 'red',
        width: '33.5%',
        height: 20,
        alignItems: 'center',
    },
    button_minus: {
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2,
        backgroundColor: '#4C4949',
        paddingTop: 2,
    },
    button_count: {
        backgroundColor: '#ffb643',
        alignItems: 'center',
    },
    button_plus: {
        borderTopRightRadius: 2,
        borderBottomRightRadius: 2,
        backgroundColor: '#4C4949',
        paddingTop: 2,
    },
    icon: {
        alignSelf: 'center',
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
