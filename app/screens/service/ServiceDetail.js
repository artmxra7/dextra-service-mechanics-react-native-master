import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  Linking
} from "react-native";
import moment from "moment";
import { Spinner } from "native-base";
import MapView from "react-native-maps";
import _ from "lodash";
import Axios from "axios";
import { connect } from "react-redux";
import { styles } from "../../assets/styles/Style";
import Modal from "react-native-modal";
import { config } from "../../config/Config";
import { getCurrentPosition } from "../../config/Helper";
import Data from "../../config/Data";

// Component
import JobDayItem from "../../components/JobDayItem";

const data = new Data();

class ServiceDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        location_lat: -7.449452,
        location_long: 112.697036,
        user_member: {
          company: {}
        },
        job_category: {},
        job_mechanics: []
      },
      isProgress: false,
      isModalProgress: false,
      userID: "",
      alreadyJoin: -1
    };

    this.dayDetail = this.dayDetail.bind(this);
    this.openMaps = this.openMaps.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.getData(nextProps);
  }

  async getData(nextProps) {
    const user = await data.select("user");
    const { data: job, isProgress } = nextProps;
    let alreadyJoin = -1;

    if (job.job_mechanics.length > 0) {
      alreadyJoin = _.findIndex(job.job_mechanics, {
        job_id: job.id,
        user_mechanic_id: user.id
      });
    }

    this.setState({
      isProgress,
      data: job,
      userID: user.id,
      alreadyJoin
    });
  }

  async joinJob() {
    const user = await data.select("user");
    this.setState({ isModalProgress: true });

    try {
      let response = await Axios.post(config.url + "job_mechanics", {
        job_id: this.state.data.id,
        status: "waiting"
      });

      if (response.data.success) {
        let alreadyJoin = -1;
        let data = response.data.data;

        if (data.job_mechanics.length > 0) {
          alreadyJoin = _.findIndex(data.job_mechanics, {
            job_id: data.id,
            user_mechanic_id: user.id
          });
        }

        this.setState({
          isModalProgress: false,
          data,
          alreadyJoin
        });
      } else {
        this.setState({
          isModalProgress: false
        });

        alert(response.data.message);
      }
    } catch (error) {
      this.setState({ isModalProgress: false });
      console.error(error);
    }
  }

  renderBottomButton() {
    let { data, alreadyJoin } = this.state;
    let { width } = Dimensions.get("window");

    switch (data.status) {
      case "waiting":
        return (
          <View style={localStyles.bottomMenu}>
            {alreadyJoin < 0 && (
              <TouchableNativeFeedback onPress={() => this.joinJob()}>
                <View style={[localStyles.bottomButton, { width }]}>
                  <Text style={localStyles.bottomText}>Join Job</Text>
                </View>
              </TouchableNativeFeedback>
            )}
            {alreadyJoin >= 0 &&
              data.job_mechanics[alreadyJoin].status == "waiting" && (
                <View style={[localStyles.bottomButton, { width }]}>
                  <Text style={localStyles.bottomText}>
                    Already Join. Waiting Approve Admin
                  </Text>
                </View>
              )}
            {alreadyJoin >= 0 &&
              data.job_mechanics[alreadyJoin].status == "approved" && (
                <View style={[localStyles.bottomButton, { width }]}>
                  <Text style={localStyles.bottomText}>Approved</Text>
                </View>
              )}
            {alreadyJoin >= 0 &&
              data.job_mechanics[alreadyJoin].status == "rejected" && (
                <View style={[localStyles.bottomButton, { width }]}>
                  <Text style={localStyles.bottomText}>Rejected</Text>
                </View>
              )}
          </View>
        );
      default:
        return null;
    }
  }

  dayDetail(jobDay) {
    let { navigate } = this.props.navigation;

    switch (jobDay.status) {
      case "waiting":
        navigate("StartWorking", { id: jobDay.id });
        break;
      case "wip":
        navigate("WorkInProgress");
        break;
      case "done":
        navigate("WorkInProgress", { id: jobDay.id });
        break;
      default:
        break;
    }
  }

  async openMaps() {
    const { data } = this.state;
    const { location_lat, location_long } = data;

    this.setState({ isModalProgress: true });

    try {
      const { coords } = await getCurrentPosition();
      const { latitude, longitude } = coords;

      let url = `https://www.google.com/maps/dir/?api=1`;
      url = `${url}&origin=${latitude},${longitude}`;
      url = `${url}&destination=${location_lat},${location_long}`;
      url = `${url}&travelmode=driving`;

      const isSupported = await Linking.canOpenURL(url);

      this.setState({ isModalProgress: false }, () => {
        if (isSupported) {
          Linking.openURL(url);
        } else {
          alert("Sorry, URL not supported");
        }
      });
    } catch (error) {
      this.setState({ isModalProgress: false }, () => {
        console.error(error);
        alert("Sorry, cannot open Google Maps !");
      });
    }
  }

  render() {
    let { data } = this.state;
    let date = moment(data.created_at).format("dddd, Do MMM YYYY | h:mm:ss");

    return (
      <View style={[styles.container]}>
        <Modal style={{ height: 40 }} isVisible={this.state.isModalProgress}>
          <View
            style={{
              backgroundColor: "#fff",
              alignItems: "center",
              padding: 20
            }}
          >
            <Spinner color="#333" />
          </View>
        </Modal>
        <ScrollView
          style={[styles.content, { padding: 2, backgroundColor: "#eee" }]}
        >
          {this.state.isProgress && (
            <View style={{ alignItems: "center" }}>
              <Spinner color="#333" />
            </View>
          )}
          {!this.state.isProgress && (
            <View style={{ padding: 18 }}>
              <View style={{ marginBottom: 8 }}>
                <View>
                  <Text
                    style={[
                      styles.content_body_font,
                      { fontSize: 14, fontWeight: "bold" }
                    ]}
                  >
                    Customer Name
                  </Text>
                  <Text style={[styles.content_body_font, { fontSize: 16 }]}>
                    {data.user_member.name}
                  </Text>
                </View>
              </View>
              <View style={{ marginBottom: 8 }}>
                <View>
                  <Text
                    style={[
                      styles.content_body_font,
                      { fontSize: 14, fontWeight: "bold" }
                    ]}
                  >
                    Customer Company
                  </Text>
                  <Text style={[styles.content_body_font, { fontSize: 16 }]}>
                    {data.user_member.company.name}
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 12, marginBottom: 12 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 0.5 }}>
                    <Text
                      style={[
                        styles.content_body_font,
                        { fontWeight: "bold", fontSize: 12 }
                      ]}
                    >
                      Job Category
                    </Text>
                    <Text style={[styles.content_body_font, { color: "#888" }]}>
                      {data.job_category.name}
                    </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <Text
                      style={[
                        styles.content_body_font,
                        { fontSize: 12, fontWeight: "bold" }
                      ]}
                    >
                      Job Description
                    </Text>
                    <Text style={[styles.content_body_font, { color: "#888" }]}>
                      {data.description}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ marginBottom: 8 }}>
                <View>
                  <Text
                    style={[
                      styles.content_body_font,
                      { fontSize: 14, fontWeight: "bold" }
                    ]}
                  >
                    Location Name
                  </Text>
                  <Text style={[styles.content_body_font, { fontSize: 16 }]}>
                    {data.location_name}
                  </Text>
                </View>
              </View>
              <View style={{ marginBottom: 8 }}>
                <View>
                  <MapView
                    style={localStyles.map}
                    initialRegion={{
                      latitude: parseFloat(data.location_lat),
                      longitude: parseFloat(data.location_long),
                      latitudeDelta: 0,
                      longitudeDelta: 0
                    }}
                    onPress={this.openMaps}
                    loadingEnabled
                  >
                    <MapView.Marker
                      title="Job Location"
                      key={1}
                      coordinate={{
                        longitude: parseFloat(data.location_long),
                        latitude: parseFloat(data.location_lat)
                      }}
                    />
                  </MapView>
                </View>
              </View>
              <View style={{ marginBottom: 8 }}>
                <View>
                  <Text
                    style={[
                      styles.content_body_font,
                      { fontSize: 14, fontWeight: "bold" }
                    ]}
                  >
                    Location Description
                  </Text>
                  <Text style={[styles.content_body_font, { fontSize: 16 }]}>
                    {data.location_description}
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 12, marginBottom: 12 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 0.5 }}>
                    <Text
                      style={[
                        styles.content_body_font,
                        { fontWeight: "bold", fontSize: 12 }
                      ]}
                    >
                      Order Date
                    </Text>
                    <Text style={[styles.content_body_font, { color: "#888" }]}>
                      {date}
                    </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <Text
                      style={[
                        styles.content_body_font,
                        { fontSize: 12, fontWeight: "bold" }
                      ]}
                    >
                      Status Order
                    </Text>
                    <Text style={[styles.content_body_font, { color: "#888" }]}>
                      {data.status}
                    </Text>
                  </View>
                </View>
              </View>
              {(data.status == "wip" || data.status == "close") && (
                <View style={{ marginTop: 12, marginBottom: 12 }}>
                  <Text
                    style={[
                      styles.content_body_font,
                      {
                        fontSize: 14,
                        fontWeight: "bold",
                        marginBottom: 16,
                        textAlign: "center"
                      }
                    ]}
                  >
                    Job Schedule
                  </Text>
                  {data.job_days.map(job_day => {
                    return (
                      <JobDayItem
                        key={job_day.id}
                        date={job_day.date}
                        days={job_day.days}
                        working_hours={job_day.working_hours}
                        notes={job_day.notes}
                        recommendation={job_day.recommendation}
                        status={job_day.status}
                        onPress={() => this.dayDetail(job_day)}
                      />
                    );
                  })}
                </View>
              )}
            </View>
          )}
        </ScrollView>
        {this.renderBottomButton()}
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  map: {
    height: 200
  },
  bottomMenu: {
    width: Dimensions.get("window").width,
    height: 48,
    flexDirection: "row"
  },
  bottomButton: {
    width: Dimensions.get("window").width / 3,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffb643",
    borderRightWidth: 0.5,
    borderRightColor: "#e5a43d",
    borderLeftWidth: 0.5,
    borderLeftColor: "#e5a43d"
  },
  bottomText: {
    fontSize: 12,
    color: "white"
  }
});

const mapStateToProps = ({ currentJob }) => ({
  data: currentJob.data,
  isProgress: currentJob.isLoading
});

export default connect(mapStateToProps)(ServiceDetail);
