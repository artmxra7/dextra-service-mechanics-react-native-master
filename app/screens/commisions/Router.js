import React, { Component } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { TabNavigator } from "react-navigation";
import _ from "lodash";
import Axios from "axios";

import Commision from "./Commision";
import History from "./History";
import Proccess from "./Proccess";
import CommisionInfo from "../../components/CommisionInfo";
import { config } from "../../config/Config";
import { currencyFormat } from "../../config/Helper";

export const TabCommision = TabNavigator(
  {
    Income: {
      screen: Commision
    },
    Proccess: {
      screen: Proccess
    },
    History: {
      screen: History
    }
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: "#fff"
      },
      activeTintColor: "#f39c12",
      activeBackgroundColor: "red",
      inactiveTintColor: "#3E3C3C",
      upperCaseLabel: false,
      indicatorStyle: {
        backgroundColor: "transparent"
      },
      labelStyle: {
        fontWeight: "bold"
      }
    }
  }
);

export default class Router extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commisions: [],
      waitingWithdraws: [],
      completedWithdraws: [],
      minWithdraw: 0,
      isProgress: false
    };

    this.withdraw = this.withdraw.bind(this);
    this.getTotalSaldo = this.getTotalSaldo.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    this.setState({ isProgress: true });

    try {
      const [
        responseCommissions,
        responseWithdraws,
        responseSetting
      ] = await Promise.all([
        Axios.get(config.url + "commissions"),
        Axios.get(config.url + "withdraws"),
        Axios.get(config.url + "settings")
      ]);

      const commisions = responseCommissions.data.data;
      const withdraws = responseWithdraws.data.data;
      const settings = responseSetting.data.data;

      const byStatus = status => item => item.status === status;
      const isMinWithdraw = item => item.key === "MIN_WITHDRAW";

      const waitingWithdraws = withdraws.filter(byStatus("waiting"));
      const completedWithdraws = withdraws.filter(byStatus("completed"));
      const minWithdraw = settings.find(isMinWithdraw).value;

      this.setState({
        isProgress: false,
        commisions,
        waitingWithdraws,
        completedWithdraws,
        minWithdraw
      });
    } catch (error) {
      console.error(error);
      this.setState({ isProgress: false });
    }
  }

  withdraw() {
    const { navigation } = this.props;
    const { minWithdraw } = this.state;
    const saldo = this.getTotalSaldo();

    if (saldo < minWithdraw) {
      const amount = currencyFormat(minWithdraw);
      alert(`Your saldo minimum should be Rp.${amount},- to withdraw !`);
      return;
    }

    navigation.navigate("CommisionWithdraw", { saldo });
  }

  getTotalSaldo() {
    const { commisions, waitingWithdraws, completedWithdraws } = this.state;

    const totalCommisions = _.sumBy(commisions, "amount");
    const totalWaiting = _.sumBy(waitingWithdraws, "amount");
    const totalCompleted = _.sumBy(completedWithdraws, "amount");
    const saldo = totalCommisions - (totalWaiting + totalCompleted);

    return saldo;
  }

  render() {
    const screenProps = { ...this.state, getData: this.getData };

    return (
      <View style={{ flex: 1 }}>
        <TabCommision screenProps={screenProps} />
        <CommisionInfo
          saldo={this.getTotalSaldo()}
          onPressWithdraw={this.withdraw}
        />
      </View>
    );
  }
}
