import React, { Component } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { Spinner } from "native-base";
import { connect } from "react-redux";

import { styles } from "../../assets/styles/Style";
import JobItem from "../../components/JobItem";
import Data from "../../config/Data";
import { fetchOpenJobs } from "../../store/openJobs/Actions";
import { setCurrentJobID } from "../../store/currentJobID/Actions";
import { fetchCurrentJob } from "../../store/currentJob/Actions";

const data = new Data();

class OpenJobs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      api_token: null
    };
  }

  async componentDidMount() {
    const { loadOpenJobs } = this.props;
    const api_token = await data.select("api_token");
    const user = await data.select("user");

    this.setState({ api_token, user });
    loadOpenJobs();
  }

  openDetail(id) {
    const { navigation, selectJob, loadJob } = this.props;

    selectJob(id);
    loadJob();
    navigation.navigate("ServiceDetail", { id });
  }

  render() {
    const { data, isProgress, loadOpenJobs } = this.props;

    return (
      <View style={[styles.container]}>
        <ScrollView
          style={[styles.content, { padding: 0, backgroundColor: "#eee" }]}
          refreshControl={
            <RefreshControl refreshing={isProgress} onRefresh={loadOpenJobs} />
          }
          pagingEnabled
        >
          {!isProgress && (
            <View>
              {data.map((job, index) => (
                <JobItem
                  key={index}
                  job_category={job.job_category.name}
                  customer_name={job.user_member.name}
                  customer_company={job.user_member.company.name}
                  location={job.location_name}
                  onPress={() => this.openDetail(job.id)}
                />
              ))}
              {data.length === 0 && (
                <Text style={styles.no_data}>No found data</Text>
              )}
            </View>
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

const mapStateToProps = ({ openJobs }) => ({
  data: openJobs.data,
  isProgress: openJobs.isLoading
});

const mapDispatchToProps = dispatch => ({
  loadOpenJobs: () => dispatch(fetchOpenJobs()),
  selectJob: jobID => dispatch(setCurrentJobID(jobID)),
  loadJob: () => dispatch(fetchCurrentJob())
});

export default connect(mapStateToProps, mapDispatchToProps)(OpenJobs);
