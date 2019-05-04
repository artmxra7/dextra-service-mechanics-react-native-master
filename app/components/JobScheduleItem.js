import React, {Component} from 'react';
import {
    TouchableOpacity,
    TextInput,
    Text,
    View,
    StyleSheet
} from 'react-native';
import List from '../components/List';
import {styles} from '../assets/styles/Style';
import { Icon} from 'react-native-elements';

export default class JobScheduleItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            onPress,
            customer_name,
            customer_company,
            date,
            days,
            working_hours,
        } = this.props;

        return (
            <TouchableOpacity
                onPress={onPress}>
                <List>
                    <View style={[styles.col_list, {flexDirection:'row', flex:1}]}>
                        <View style={local_styles.content}>
                            <View style={local_styles.status}>
                                <Text style={[local_styles.status_text, {flex:1}]}>Day {days}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={[styles.content_body_font, {flex:1}]}>Date: {date}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={[styles.content_body_font, {flex:1}]}>Working hours: {working_hours}</Text>
                            </View>
                            <View style={local_styles.paragraph}>
                                <Icon name="person" size={14} style={{flex: 0.7}}/>
                                <Text style={[local_styles.paragraph_text, {flex:1, marginLeft: 5}]}>{customer_name}</Text>
                            </View>
                            <View style={local_styles.paragraph}>
                                <Icon name="domain" size={14} style={{flex: 0.7}}/>
                                <Text style={[local_styles.paragraph_text, {flex:1, marginLeft: 5}]}>{customer_company}</Text>
                            </View>
                        </View>
                    </View>
                </List>
            </TouchableOpacity>
        );
    }
}

const local_styles = StyleSheet.create({
    content: {
        flexDirection:'column',
        flex: 2,
        position: 'relative',
    },
    status: {
        position: 'absolute',
        right: 5,
        top: 0,
    },
    status_text: {
        backgroundColor: '#333',
        color: '#fff',
        fontSize: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    paragraph: {
        flexDirection:'row',
        marginTop: 10,
    },
    paragraph_text: {
        color: '#363636',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
