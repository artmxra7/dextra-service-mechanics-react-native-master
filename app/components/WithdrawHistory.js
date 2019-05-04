import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

import {
    Thumbnail,
} from 'native-base';

import List from './List';
import { Icon } from 'react-native-elements';
import moment from 'moment';

import { 
    currencyFormat
} from '../config/Helper';

export default class WithdrawHistory extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            onPress,
            amount,
            date,
            bankName,
            bankAccount,
            bankPersonName,
            status
        } = this.props;

        date = moment(date).format('dddd, Do MMM YYYY | h:mm:ss');
        status = status.replace(/\b\w/g, (char) => char.toUpperCase());
        
        let statusColor = status == 'Waiting' ? '#ef9904' : '#3eba37';

        return (
            <TouchableOpacity
                onPress={onPress}>
                <List>
                    <View style={[styles.col_list, styles.container]}>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.content_body_font, styles.date]}>{date}</Text>
                            <Text style={[styles.content_body_font, { fontSize: 10 }]}>Bank : {bankName}</Text>
                            <Text style={[styles.content_body_font, { fontSize: 10 }]}>No. Rek : {bankAccount}</Text>
                            <Text style={[styles.content_body_font, { fontSize: 10 }]}>A/N : {bankPersonName}</Text>
                        </View>
                        <View style={{alignItems: 'flex-end'}}>
                            <Text style={[styles.content_body_font, styles.amount]}>Rp. {currencyFormat(amount)},-</Text>
                            <View style={[styles.status, { backgroundColor: statusColor }]}>
                                <Text style={[styles.content_body_font, styles.statusText]}>{status}</Text>
                            </View>
                        </View>
                    </View>
                </List>
            </TouchableOpacity>
        );
    }
}

WithdrawHistory.propTypes = {
    date: PropTypes.string,
    amount: PropTypes.number,
    status: PropTypes.oneOf(['waiting', 'completed']),
    bankName: PropTypes.string,
    bankAccount: PropTypes.string,
    bankPersonName: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingHorizontal: 4,
        flexDirection: 'row', 
        flex: 1, 
        justifyContent: 'space-around'
    },
    amount: {
        fontWeight: 'bold', 
        fontSize: 16,
        marginTop: 4
    },
    date: {
        fontSize: 10, 
        marginBottom: 8,
    },
    status: {
        padding: 2,
        borderRadius: 2,
        width: 64,
        marginTop: 4,
    },
    statusText: {
        fontSize: 10, 
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    }
});
