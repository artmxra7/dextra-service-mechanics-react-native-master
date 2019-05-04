import React, { Component } from 'react';
import {
    TouchableNativeFeedback,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import _ from 'lodash';

import { Icon } from 'react-native-elements';
import { currencyFormat, calculateTotalPrice } from '../config/Helper';

export default class CartInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { 
            items,
            onPressCart,
            onPressFilter
        } = this.props;

        let totalItems = items.length;
        let amounts = calculateTotalPrice(items);
        amounts = currencyFormat(amounts);

        return (
            <TouchableNativeFeedback
                onPress={onPressCart}>
                <View style={localStyles.container}>
                    <View style={{ flex: 1.5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRightWidth: 2, borderRightColor: '#fff' }}>
                        <View>
                            <TouchableOpacity onPress={onPressFilter}>
                                <Icon name="sort" color="#fff" size={30} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingRight: 6, flexDirection: 'row', paddingVertical: 8 }}>
                            <TouchableOpacity onPress={onPressCart} style={{}}>
                                <View style={{ marginRight: 0 }}>
                                    <Icon name="shopping-cart" type="font-awesome" color="#fff" size={30} />
                                </View>
                            </TouchableOpacity>
                            <View style={{ marginRight: 22 }}>
                                <View style={localStyles.quantity}>
                                    <Text style={{ fontSize: 12 }}>{items.length}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1.5, paddingLeft: 8 }}>
                        <Text style={{ color: '#fff', fontSize: 9 }}>Estimated</Text>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Rp. {amounts},-</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

CartInfo.defaultProps = {
    onPressFilter: () => {},
    onPressCart: () => {},
};

const localStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#4C4949',
        paddingHorizontal: 16,
        alignItems: 'center',
        height: 64
    },
    quantity: {
        borderRadius: 100,
        backgroundColor: 'orange',
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -5,
        marginLeft: -5,
    }
});
