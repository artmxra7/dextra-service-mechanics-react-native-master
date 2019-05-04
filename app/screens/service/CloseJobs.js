import React, { Component } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { Spinner } from "native-base";
import { connect } from "react-redux";

import { styles } from "../../assets/styles/Style";
import JobItem from "../../components/JobItem";
import { fetchCloseJobs } from "../../store/closeJobs/Actions";
import { setCurrentJobID } from "../../store/currentJobID/Actions";
import { fetchCurrentJob } from "../../store/currentJob/Actions";

class OpenJobs extends Component {
  constructor(props) {
    super(props);

    this.openDetail = this.openDetail.bind(this);
  }

  componentDidMount() {
    const { loadCloseJobs } = this.props;

    loadCloseJobs();
  }

  openDetail(id) {
    const { navigation, selectJob, loadJob } = this.props;

    selectJob(id);
    loadJob();
    navigation.navigate("ServiceDetail", { id });
  }

  render() {
    const { data, isProgress, loadCloseJobs } = this.props;

    return (
      <View style={[styles.container]}>
        <ScrollView
          style={[styles.content, { padding: 0, backgroundColor: "#eee" }]}
          refreshControl={
            <RefreshControl refreshing={isProgress} onRefresh={loadCloseJobs} />
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

const mapStateToProps = ({ closeJobs }) => ({
  data: closeJobs.data,
  isProgress: closeJobs.isLoading
});

const mapDispatchToProps = dispatch => ({
  loadCloseJobs: () => dispatch(fetchCloseJobs()),
  selectJob: jobID => dispatch(setCurrentJobID(jobID)),
  loadJob: () => dispatch(fetchCurrentJob())
});

export default connect(mapStateToProps, mapDispatchToProps)(OpenJobs);
