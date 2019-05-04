import React, { Component } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { Spinner } from "native-base";
import { connect } from "react-redux";

import { styles } from "../../assets/styles/Style";
import JobItem from "../../components/JobItem";
import { fetchWipJobs } from "../../store/wipJobs/Actions";
import { setCurrentJobID } from "../../store/currentJobID/Actions";
import { fetchCurrentJob } from "../../store/currentJob/Actions";

class Wip extends Component {
  constructor(props) {
    super(props);

    this.openDetail = this.openDetail.bind(this);
  }

  componentDidMount() {
    const { loadWipJobs } = this.props;

    loadWipJobs();
  }

  openDetail(id) {
    const { navigation, selectJob, loadJob } = this.props;

    selectJob(id);
    loadJob();
    navigation.navigate("ServiceDetail", { id });
  }

  render() {
    const { data, isProgress, loadWipJobs } = this.props;

    return (
      <View style={[styles.container]}>
        <ScrollView
          style={[styles.content, { padding: 0, backgroundColor: "#eee" }]}
          refreshControl={
            <RefreshControl refreshing={isProgress} onRefresh={loadWipJobs} />
          }
          pagingEnabled
        >
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

const mapStateToProps = ({ wipJobs }) => ({
  data: wipJobs.data,
  isProgress: wipJobs.isLoading
});

const mapDispatchToProps = dispatch => ({
  loadWipJobs: () => dispatch(fetchWipJobs()),
  selectJob: jobID => dispatch(setCurrentJobID(jobID)),
  loadJob: () => dispatch(fetchCurrentJob())
});

export default connect(mapStateToProps, mapDispatchToProps)(Wip);
