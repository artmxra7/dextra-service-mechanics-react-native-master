import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableNativeFeedback,
    ScrollView,
    Alert
} from 'react-native';
import {Spinner} from 'native-base';
import {styles} from '../../assets/styles/Style';
import Button from '../../components/Button';
import Input from '../../components/Input';
import axios from 'axios';
import {config} from '../../config/Config';
import Ref from '../../components/Ref';
import Modal from 'react-native-modal';

export default class EmailSent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            error: [],
            modalVisible: false,
        };
    }

    redirect(route) {
        this.props.navigation.navigate(route);
    }

    async checkConnection() {
        try {
            let response = await fetch(config.url + 'forgot', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accept' : 'application/json',
                },
            });
            this.sendActivation();
        } catch (error) {
           Alert.alert('Pastikan anda terhubung dengan internet');
        }
    }

    async sendActivation() {
        this.setState({modalVisible:true});
        try {
            let response = await fetch(config.url + 'forgot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email,
                }),
            });
            let res = await response.json();
            if (res.success == false) {
                let error = JSON.stringify(res);
                throw error;
            }

            this.setState({modalVisible:false});
            this.redirect('ResetPassword');
        } catch (errors) {
            formErrors = JSON.parse(errors);
            errorsArray = [];

            for (var key in formErrors.data) {
                if (formErrors.data[key].length >= 1) {
                    formErrors.data[key].map((error) => errorsArray.push(`${error}`));
                }else {
                    errorsArray.push('');
                }
            }
            this.setState({modalVisible:false});
            this.setState({error:errorsArray});
        }
    }

    render() {
        return (
            <ScrollView style={{backgroundColor:'#ffb643'}}>
                <View style={{backgroundColor:'#fff'}}>
                    <Errors errors={this.state.error}/>
                </View>
                <View style={styles.container}>
                    <View style={styles.header}>
                        {/*logo*/}
                        <Image
                            style={styles.logo}
                            source={require('../../assets/images/logo.png')}
                            resizeMode="contain"
                        />
                        {/*header text*/}
                        <Text style={styles.header_text}>
                            {/*content text*/}
                            <Text style={styles.content_text}>Selamat datang di {'\n'}</Text>
                            {/*header text big*/}
                            <Text style={styles.header_text_big}>D’extra Mechanic Apps {'\n'}</Text>
                            {/*header text small*/}
                            <Text style={styles.header_text_small}>By PT Dextratama Nitya
                            Sanjaya</Text>
                        </Text>
                    </View>
                    <View style={[styles.content,{paddingTop:18}]}>
                        <Text style={[styles.header_text, {marginBottom:20}]}>
                            <Text style={styles.header_text_small} >Masukan email untuk mereset password Anda:</Text>
                        </Text>
                        <View style={{marginBottom:20}}>
                            <Input
                              placeholder="Email"
                              keyboardType="email-address"
                              onChangeText={(text) => this.setState({email:text})}
                            />
                        </View>
                        <View style={{alignSelf:'center',marginBottom:20, flexDirection:'row'}}>
                            <Text>Sudah mempunyai kode verifikasi ? </Text><Ref text="klik disini" color="#ffff" onPress={() => {this.redirect('ResetPassword')}}/>
                        </View>
                        <View style={[styles.button_container]}>
                            <Button
                              text="Kirim"
                              onPress={() => this.checkConnection()}/>
                        </View>
                    </View>
                    <Modal
                      style={{height:40}}
                      isVisible={this.state.modalVisible}>
                        <View style={{backgroundColor:'#fff', alignItems:'center', padding:20}}>
                            <Spinner color="#333"/>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        );
    }
}

const Errors = (props) => {
    return(
        <View>
            {props.errors.map((error, i) => <Text key={i} style={{textAlign:'center', color:'red'}}> {error} </Text>)}
        </View>
    )
}
