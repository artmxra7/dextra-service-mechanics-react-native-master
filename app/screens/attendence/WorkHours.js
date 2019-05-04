import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  AsyncStorage,
  RefreshControl
} from "react-native";
import { styles } from "../../assets/styles/Style";
import Storage from "react-native-storage";
import Axios from "axios";
import { config } from "../../config/Config";
import JobScheduleItem from "../../components/JobScheduleItem";
import { Spinner } from "native-base";

export default class WorkHours extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isProgress: false
    };

    this.getJobs = this.getJobs.bind(this);
  }

  componentDidMount() {
    this.getJobs();
  }

  openDetail(id) {
    this.props.navigation.navigate("WorkInProgress");
  }

  async getJobs() {
    this.setState({ isProgress: true });

    try {
      let response = await Axios.get(config.url + "jobs/days/schedule/wip");

      this.setState({
        isProgress: false,
        data: response.data.data
      });
    } catch (error) {
      this.setState({ isProgress: false });
      console.error(error);
    }
  }

  cameraPage() {
    var storage = new Storage({
      // maximum capacity, default 1000
      size: 1000,

      // Use AsyncStorage for RN, or window.localStorage for web.
      // If not set, data would be lost after reload.
      storageBackend: AsyncStorage,

      // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
      // can be null, which means never expire.
      defaultExpires: 1000 * 3600 * 24,

      // cache data in the memory. default is true.
      enableCache: true,

      // if data was not found in storage or expired,
      // the corresponding sync method will be invoked and return
      // the latest data.
      sync: {
        // we'll talk about the details later.
      }
    });

    storage.save({
      key: "routes",
      rawData: {
        routeTab: false
      }
    });
    // this.props.navigation.navigate('CameraPage')
  }

  render() {
    let { isProgress, data } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          style={[styles.content, { padding: 0, backgroundColor: "#eee" }]}
          refreshControl={
            <RefreshControl refreshing={isProgress} onRefresh={this.getJobs} />
          }
        >
          {data.map((job_day, index) => (
            <JobScheduleItem
              key={index}
              customer_name={job_day.job.user_member.name}
              customer_company={job_day.job.user_member.company.name}
              date={job_day.date}
              days={job_day.days}
              working_hours={job_day.working_hours}
              onPress={() => this.openDetail(job_day.id)}
            />
          ))}
          {!isProgress &&
            data.length === 0 && (
              <Text style={styles.no_data}>No found data</Text>
            )}
          {isProgress && (
            <View style={{ alignItems: "center" }}>
              <Spinner color="#333" />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}
