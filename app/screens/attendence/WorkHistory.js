import React, { Component } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { styles } from "../../assets/styles/Style";
import Axios from "axios";
import { config } from "../../config/Config";
import JobScheduleItem from "../../components/JobScheduleItem";
import { Spinner } from "native-base";

export default class WorkHistory extends Component {
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
    this.props.navigation.navigate("WorkInProgress", { id });
  }

  async getJobs() {
    this.setState({ isProgress: true });

    try {
      let response = await Axios.get(config.url + "jobs/days/schedule/done");

      this.setState({
        isProgress: false,
        data: response.data.data
      });
    } catch (error) {
      this.setState({ isProgress: false });
      console.error(error);
    }
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
            data.length == 0 && (
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
