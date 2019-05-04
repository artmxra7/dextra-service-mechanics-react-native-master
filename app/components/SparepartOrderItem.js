import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet
} from 'react-native';

import {
    Thumbnail
} from 'native-base';

import Button from '../components/Button';
import Switch from '../components/Switch';
import { styles } from '../assets/styles/Style';
import Link from '../components/Link';
import List from '../components/List';
import { config } from '../config/Config';
import { currencyFormat } from '../config/Helper';

export default class SparepartOrderItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            name,
            brand,
            type,
            price,
            photo,
            quantity,
            onPress
        } = this.props;

        let path = config.base_url + 'storage/products/' + photo;
        let image = photo ? { uri: path } : require('../assets/images/default.jpg');

        price = currencyFormat(price * quantity);

        return (
            <TouchableOpacity onPress={onPress}>
                <List>
                    <View style={[styles.col_list, { flexDirection: 'row', flex: 1 }]}>
                        <View>
                            <Thumbnail square style={{ width: 110, height: 95 }} source={image} />
                        </View>
                        <View style={{flex: 1, marginLeft: 12}}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.font_list, { flex: 0.4 }]}>Name</Text>
                                <Text style={[styles.font_list, { flex: 0.1 }]}>:</Text>
                                <Text style={[styles.font_list, { flex: 1 }]}>{name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.font_list, { flex: 0.4 }]}>Brand</Text>
                                <Text style={[styles.font_list, { flex: 0.1 }]}>:</Text>
                                <Text style={[styles.font_list, { flex: 1 }]}>{brand}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.font_list, { flex: 0.4 }]}>Quantity</Text>
                                <Text style={[styles.font_list, { flex: 0.1 }]}>:</Text>
                                <Text style={[styles.font_list, { flex: 1 }]}>{quantity}</Text>
                            </View>
                            <View style={{marginTop: -8}}>
                                <Text style={localStyles.price}>{'\n'}Rp. {price},-</Text>
                            </View>
                        </View>
                    </View>
                </List>
            </TouchableOpacity>
        );
    }
}

export const localStyles = StyleSheet.create({
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4
    }
});