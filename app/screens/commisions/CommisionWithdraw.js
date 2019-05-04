import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import Axios from 'axios';

import { styles } from '../../assets/styles/Style';
import Input from '../../components/Input';
import CurrencyInput from '../../components/CurrencyInput';
import Button from '../../components/Button';
import { config } from '../../config/Config';
import { currencyFormat } from '../../config/Helper';

export default class CommisionWithdraw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bank_account: '',
            bank_person_name: '',
            bank_name: '',
            amount: '',
        }

        this.submit = this.submit.bind(this);
    }

    async submit() {
        let { navigation } = this.props;
        let { saldo } = navigation.state.params;
        let form = this.state;
        
        // Check if there is blank form exists
        for (let property in form) {
            if (!form[property]) {
                alert('You should fill all data.');
                return;
            }
        }

        if (form.amount > saldo) {
            saldo = currencyFormat(saldo);
            alert(`Cannot withdraw amount greater than Saldo (Rp.${saldo},-) !`);
            return; 
        }

        try {
            let response = await Axios.post(config.url + 'withdraws', form);

            navigation.navigate('RouterCommision');
        } catch (error) {
            console.error(error.response);
        }
    }

    render() {
        let { 
            bank_account,
            bank_person_name,
            bank_name,
            amount,    
        } = this.state;

        return (
            <View style={styles.content}>
                {/*Header*/}
                <View style={{ alignItems: 'center', marginBottom: 18 }}>
                    <Text style={{ fontWeight: 'bold', color: '#363636' }}>Income Withdraw</Text>
                </View>
                {/*Content*/}
                <View>
                    <Input
                        placeholder="No. Rekening"
                        keyboardType="numeric"
                        value={bank_account}
                        onChangeText={(text) => this.setState({ bank_account: text })}
                    />
                    <Input
                        placeholder="Nama Pemilik Akun"
                        autoCapitalize="words"
                        value={bank_person_name}
                        onChangeText={(text) => this.setState({ bank_person_name: text })}
                    />
                    <Input
                        placeholder="Nama Bank"
                        autoCapitalize="words"
                        value={bank_name}
                        onChangeText={(text) => this.setState({ bank_name: text })}
                    />
                    <CurrencyInput
                        placeholder="Nominal Withdraw"
                        value={amount}
                        onChangeText={(text) => this.setState({ amount: text })} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                    <View style={{ width: 80 }}>
                        <Button 
                            text="Submit" 
                            lowerCase={true} 
                            onPress={this.submit} />    
                    </View>
                </View>
            </View>
        );
    }
}
