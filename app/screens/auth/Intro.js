import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  ScrollView,
  Alert,
  AsyncStorage,
  PermissionsAndroid
} from "react-native";
import { styles } from "../../assets/styles/Style";
import Data from "../../config/Data";
import Button from "../../components/Button";
import { config } from "../../config/Config";

import { NavigationActions } from "react-navigation";
import Axios from "axios";

const data = new Data();
export default class Intro extends Component {
  constructor(props) {
    super(props);

    this.getUser = this.getUser.bind(this);
  }

  redirect(route) {
    this.props.navigation.navigate(route);
  }

  async componentDidMount() {
    this.requestLocationPermissions(() => {
      this.getUser();
    });
  }

  async requestLocationPermissions(callback) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Dextra Location Permission",
          message: "Dextra need to access your location"
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        alert("Location access granted !");
      } else {
        alert("Location access not permitted !");
      }
      callback();
    } catch (err) {
      console.warn(err);
    }
  }

  async getUser() {
    let { navigation } = this.props;

    const user = await data.select("user");
    const token = await data.select("api_token");

    if (user) {
      let resetAction = null;

      try {
        Axios.defaults.headers.common["Authorization"] = "Bearer " + token;

        let response = await Axios.get(config.url + "jobs/days/check-wip");
        let data = response.data.data;

        const isJobWIP = data ? data.length > 0 : false;

        if (isJobWIP) {
          resetAction = NavigationActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({ routeName: "FeedMechanic" }),
              NavigationActions.navigate({
                routeName: "WorkInProgress",
                params: {
                  isDirect: true
                }
              })
            ]
          });
        } else {
          resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "FeedMechanic" })]
          });
        }
      } catch (error) {
        console.error(error);
        resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "Login" })]
        });
        await data.insert("api_token", null);
        await data.insert("user", null);
        alert("You' logged out, please login again.");
      }

      navigation.dispatch(resetAction);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {/*logo*/}
          <Image
            style={styles.logo}
            source={require("../../assets/images/logo.png")}
            resizeMode="contain"
          />
          {/*header text*/}
          <Text style={styles.header_text}>
            {/*content text*/}
            <Text style={styles.content_text}>Selamat datang di {"\n"}</Text>
            {/*header text big*/}
            <Text style={styles.header_text_big}>
              D’extra Mechanic Apps {"\n"}
            </Text>
            {/*header text small*/}
            <Text style={styles.header_text_small}>
              By PT Dextratama Nitya Sanjaya
            </Text>
          </Text>
        </View>
        {/*Content*/}
        <View style={styles.content}>
          <Image
            style={styles.bg_excavators}
            source={require("../../assets/images/bg-excavators.png")}
          />
          <View>
            <Text style={styles.content_text}>
              Aplikasi untuk pemesanan jasa Mekanik, Suku Cadang, dan Alat Berat
              yang Terpercaya
            </Text>
          </View>
          <View style={styles.button_container}>
            <Button
              text="Login"
              onPress={() => {
                this.redirect("Login");
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}
