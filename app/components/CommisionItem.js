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

export default class CommisionItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            onPress,
            amount,
            date,
            type,
            description
        } = this.props;

        date = moment(date).format('dddd, Do MMM YYYY | h:mm:ss');
        type = type.replace(/\b\w/g, (char) => char.toUpperCase());

        return (
            <TouchableOpacity
                onPress={onPress}>
                <List>
                    <View style={[styles.col_list, styles.container]}>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.content_body_font, styles.date]}>{date}</Text>
                            <Text style={[styles.content_body_font, { fontSize: 10 }]}>Type : {type}</Text>
                            <Text style={[styles.content_body_font, { fontSize: 10 }]}>Description : {description}</Text>
                        </View>
                        <View>
                            <Text style={[styles.content_body_font, { fontWeight: 'bold', fontSize: 16 }]}>Rp. {currencyFormat(amount)},-</Text>
                        </View>
                    </View>
                </List>
            </TouchableOpacity>
        );
    }
}

CommisionItem.propTypes = {
    date: PropTypes.string,
    status: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.oneOf(['sparepart', 'job']),
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingHorizontal: 4,
        flexDirection: 'row', 
        flex: 1, 
        justifyContent: 'space-around'
    },
    date: {
        fontSize: 10, 
        marginBottom: 8,
    },
    amount: {
        fontWeight: 'bold', 
        fontSize: 16,
        marginTop: 4
    }
});
