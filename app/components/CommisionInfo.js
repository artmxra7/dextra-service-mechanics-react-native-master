import React, { Component } from 'react';
import {
    TouchableOpacity,
    TouchableWithoutFeedback,
    Text,
    View,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

import {
    Thumbnail
} from 'native-base';

import Button from '../components/Button';
import { styles } from '../assets/styles/Style';
import { config } from '../config/Config';
import { currencyFormat } from '../config/Helper';

export default class CommisionInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            saldo,
            onPressWithdraw,
        } = this.props;

        saldo = currencyFormat(saldo);

        return (
            <View style={localStyles.container}>
                <View style={{ flex: 1.5, flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <Text style={{ color: '#fff' }}>Your Saldo</Text>
                    <Text style={localStyles.price}>Rp. {saldo},-</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', paddingRight: 8 }}>
                    <Button text="Withdraw" lowerCase={true} onPress={onPressWithdraw} />
                </View>
            </View>
        );
    }
}

CommisionInfo.propTypes = {
    saldo: PropTypes.number,
    onPressWithdraw: PropTypes.func,
};

CommisionInfo.defaultProps = {
    saldo: 0,
};

export const localStyles = StyleSheet.create({
    container: {
        backgroundColor: '#4C4949',
        flexDirection: 'row', 
        paddingLeft: 20, 
        paddingVertical: 16, 
    },
    price: {
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#fff'
    }
});