import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    Alert,
    StyleSheet,
    WebView
} from 'react-native';
import {
    Card,
    Spinner
} from 'native-base';
import Axios from 'axios';
import moment from 'moment';
import Ref from '../../components/Ref';
import TabBar from '../../components/TabBar';
import {TabNavigator} from 'react-navigation';
import {styles} from '../../assets/styles/Style';
import Link from '../../components/Link';
import {config} from '../../config/Config';
import Data from '../../config/Data';

const data = new Data();
export default class TimelineDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: '',
            isProgress: false,
            height: 0,
        };

        this.getHeight = this.getHeight.bind(this);
        this.wrapHTML = this.wrapHTML.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const { state } = this.props.navigation;
        this.setState({ isProgress: true });

        try {
            let response = await Axios.get(config.url + 'news/' + state.params.id);

            this.setState({
                isProgress: false,
                data: response.data.data,
            });
        } catch (error) {
            this.setState({ isProgress: false });
            console.error(error);
        }
    }

    getHeight(navState) {
        let height = !parseInt(navState.title) ? 0 : parseInt(navState.title) + 16;
        this.setState({ height });
    }

    wrapHTML(content) {
        let script = `
        <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
        <script type="text/javascript">
            $(document).ready(function() {
                $(window).load(function() {
                    window.location.hash = 1;
                    document.title = document.body.clientHeight + 20;
                });
            });
        </script>`;

        let html = `<!DOCTYPE html><html><head<body>${content} ${script}</body></html>`;

        return html;
    }

    render() {
        let { data, height } = this.state;
        let path = config.base_url + 'storage/news/' + data.photo;
        let image = data.photo ? { uri: path } : require('../../assets/images/default.jpg');
        let html = this.wrapHTML(data.content);

        date = moment(data.created_at).format('dddd, Do MMM YYYY | h:mm:ss');

        return (
            <View style={[styles.container]}>
                {this.state.isProgress &&
                    <View style={{ alignItems: 'center' }}>
                        <Spinner color="#333" />
                    </View>
                }
                {!this.state.isProgress &&
                    <ScrollView style={[styles.content, { padding: 0, backgroundColor: '#eee' }]}>
                        {/*Image*/}
                        <View>
                            <Image
                                source={image}
                                style={styles.content_banner_image} />
                        </View>
                        {/*content*/}
                        <View style={styles.content_body}>
                            {/*Heading*/}
                            <View style={localStyles.heading}>
                                <Text style={localStyles.title}>{data.title}</Text>
                                <Text style={localStyles.date}>{date}</Text>
                            </View>
                            {/*Content*/}
                            <View>
                                <WebView
                                    onNavigationStateChange={this.getHeight}
                                    automaticallyAdjustContentInsets={false}
                                    source={{ html }}
                                    style={{ height, backgroundColor: '#eee' }}
                                    scrollEnabled={true} />
                            </View>
                        </View>
                    </ScrollView>
                }
            </View>
        );
    }
}

const localStyles = StyleSheet.create({
    heading: {
        marginBottom: 32,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    date: {
        color: '#888'
    }
});
