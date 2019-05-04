import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet
} from 'react-native';

import {
    Thumbnail,
} from 'native-base';

import List from './List';
import { Icon } from 'react-native-elements';
import moment from 'moment';

import {
    currencyFormat,
    formatStatus
} from '../config/Helper';

export default class SparepartHistoryItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            onPress,
            totalPrice,
            date,
            status
        } = this.props;

        date = moment(date).format('dddd, Do MMM YYYY | h:mm:ss');
        status = formatStatus(status);

        return (
            <TouchableOpacity
                onPress={onPress}>
                <List>
                    <View style={[styles.col_list, { flexDirection: 'column', flex: 1, justifyContent: 'space-around' }]}>
                        <View style={{ marginBottom: 8 }}>
                            <Text style={[styles.content_body_font, { fontSize: 10 }]}>{date}</Text>
                            <Text style={[styles.content_body_font, { fontSize: 10 }]}>Status : {status}</Text>
                        </View>
                        <View>
                            <Text style={[styles.content_body_font, { fontWeight: 'bold', fontSize: 16 }]}>Rp. {currencyFormat(totalPrice)},-</Text>
                        </View>
                    </View>
                </List>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#7F7F7F',
        alignItems: 'center',
        borderRadius: 2,
        paddingBottom: 10,
        paddingTop: 10,
        width: '100%',
    },
    button_text: {
        color: '#fff',
    },
});
