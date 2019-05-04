import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Spinner, Thumbnail } from "native-base";
import moment from "moment";
import { NavigationActions } from "react-navigation";
import { styles } from "../../assets/styles/Style";
import Button from "../../components/Button";
import { config } from "../../config/Config";
import { getCurrentPosition } from "../../config/Helper";
import CameraScreen from "./CameraScreen";
import Axios from "axios";

export default class StartWorking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        job: {
          job_category: {},
          user_member: {
            company: {}
          }
        }
      },
      isProgress: false,
      dataCamera: null,
      openCamera: false,
      locations: [],
      currentLocationName: null,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5
      },
      timeStartWorking: moment().format("H:mm:ss")
    };

    this.captureCamera = this.captureCamera.bind(this);
    this.getLocations = this.getLocations.bind(this);
    this.startWorking = this.startWorking.bind(this);
    this.validateWorkDate = this.validateWorkDate.bind(this);
  }

  componentDidMount() {
    this.getData(this.validateWorkDate);
  }

  validateWorkDate() {
    let { data } = this.state;
    let { navigation } = this.props;

    const now = new Date();
    const selected = new Date(data.date);

    if (selected.toDateString() != now.toDateString()) {
      alert("You can't work on it now !");

      const back = NavigationActions.back();
      navigation.dispatch(back);
    }
  }

  async getData(callback) {
    const { state } = this.props.navigation;
    this.setState({ isProgress: true });

    try {
      const [response, position] = await Promise.all([
        Axios.get(`${config.url}jobs/days/${state.params.id}`),
        getCurrentPosition()
      ]);
      const { latitude, longitude } = position.coords;

      this.setState(prevState => ({
        isProgress: false,
        data: response.data.data,
        region: {
          ...prevState.region,
          latitude,
          longitude,
          error: null
        }
      }));

      callback();
    } catch (error) {
      this.setState({ isProgress: false }, () => {
        console.error(error);

        if (error instanceof PositionError) {
          alert("Sorry, failed to get your position !");
        } else {
          alert("Sorry, failed to get data !");
        }
      });
    }
  }

  async getLocations(callback = null) {
    let { locations, region } = this.state;

    try {
      const { latitude, longitude } = region;
      const url =
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
      const location = latitude + "," + longitude;
      const radius = 500;
      const key = config.google_api_key;
      const keyword = "Jl,Jalan";

      let response = await Axios.get(url, {
        params: {
          location,
          radius,
          key,
          keyword,
          pagetoken: this.locationNextToken
        }
      });

      let result = response.data;
      let locations = result.results;
      let newLocations = [];

      this.locationNextToken = result.next_page_token;

      this.setState(
        prevState => {
          newLocations = [...prevState.locations, ...locations];
          return { locations: newLocations };
        },
        () => {
          if (callback) callback(newLocations);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  cameraPage() {
    this.setState({ openCamera: true });
  }

  captureCamera(data) {
    this.setState({ locations: [], dataCamera: data, openCamera: false });
    this.setState({ currentLocationName: "Mendeteksi lokasi otomatis..." });
    this.getLocations(locations => {
      if (locations.length > 0) {
        this.setState({
          currentLocationName: locations[0].vicinity,
          timeStartWorking: moment().format("H:mm:ss")
        });
      } else {
        alert("Lokasi tidak dapat ditemukan");
      }
    });
  }

  async startWorking() {
    if (this.state.currentLocationName == "" || !this.state.dataCamera) {
      alert("Harap isi foto dan lokasi otomatis");
      return false;
    }

    const { navigation } = this.props;
    const { state } = navigation;
    const {
      data,
      dataCamera,
      currentLocationName,
      region,
      timeStartWorking,
      isProgress
    } = this.state;

    this.setState({ isProgress: true });

    try {
      let form = new FormData();

      form.append("FormData", true);
      form.append("start_working", timeStartWorking);
      form.append("location_name", currentLocationName);
      form.append("location_lat", region.latitude);
      form.append("location_long", region.longitude);
      form.append("location_description", currentLocationName);
      form.append("status", "wip");

      let photo = {
        uri: dataCamera.path,
        type: "image/jpeg",
        name: "image.jpeg"
      };

      form.append("Content-Type", "image/jpeg");
      form.append("photo_attendance", photo);

      await Axios.post(
        config.url + "jobs/days/" + state.params.id + "/start",
        form
      );

      this.setState({ isProgress: false }, () => {
        navigation.navigate("WorkInProgress");
      });
    } catch (error) {
      this.setState({ isProgress: false });
      console.error(error);
    }
  }

  render() {
    let {
      data,
      timeStartWorking,
      isProgress,
      openCamera,
      currentLocationName,
      dataCamera
    } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          style={[styles.content, { padding: 28, backgroundColor: "#eee" }]}
        >
          {isProgress && (
            <View style={{ alignItems: "center" }}>
              <Spinner color="#333" />
            </View>
          )}
          {!isProgress && (
            <View style={{ marginBottom: 30 }}>
              <View style={{ marginBottom: 24 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 0.5 }}>
                    <Text style={[styles.content_body_font, localStyles.label]}>
                      Working Date
                    </Text>
                    <Text style={[styles.content_body_font, localStyles.value]}>
                      {data.date}
                    </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <Text style={[styles.content_body_font, localStyles.label]}>
                      Days
                    </Text>
                    <Text style={[styles.content_body_font, localStyles.value]}>
                      {data.days}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ marginBottom: 24 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 0.5 }}>
                    <Text style={[styles.content_body_font, localStyles.label]}>
                      Start Working Time
                    </Text>
                    <Text style={[styles.content_body_font, localStyles.value]}>
                      {timeStartWorking}
                    </Text>
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <Text style={[styles.content_body_font, localStyles.label]}>
                      Job Category
                    </Text>
                    <Text style={[styles.content_body_font, localStyles.value]}>
                      {data.job.job_category.name}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ marginBottom: 48 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.content_body_font, localStyles.label]}>
                      Job Description
                    </Text>
                    <Text style={[styles.content_body_font, localStyles.value]}>
                      {data.job.description}
                    </Text>
                  </View>
                </View>
              </View>

              <View>
                <Text
                  style={[
                    styles.font_list,
                    { fontSize: 16, textAlign: "center", marginBottom: 8 }
                  ]}
                >
                  GPS Attendance Location
                </Text>
              </View>
              <View
                style={{
                  padding: 20,
                  borderRadius: 6,
                  backgroundColor: "#fff",
                  marginTop: 4
                }}
              >
                <Text style={{ color: "#e53935" }}>
                  {currentLocationName
                    ? currentLocationName
                    : "GPS Auto dectection location when taking picture of attendance"}
                </Text>
              </View>
              {!dataCamera && (
                <TouchableOpacity
                  onPress={() => this.cameraPage()}
                  style={{
                    backgroundColor: "#868686",
                    marginTop: 10,
                    width: 150,
                    height: 150,
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center"
                  }}
                >
                  <Text style={{ color: "#fff" }}>Take photo</Text>
                </TouchableOpacity>
              )}
              {dataCamera && (
                <Thumbnail
                  square
                  style={{
                    width: 150,
                    height: 150,
                    alignSelf: "center",
                    marginTop: 10
                  }}
                  source={{ uri: dataCamera.path }}
                />
              )}
              <View style={{ padding: 20, paddingLeft: 60, paddingRight: 60 }}>
                <Button onPress={() => this.startWorking()} text="START" />
              </View>
            </View>
          )}
        </ScrollView>
        {openCamera && (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              top: 0,
              left: 0,
              right: 0,
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height
            }}
          >
            <CameraScreen onTakeCapture={data => this.captureCamera(data)} />
          </View>
        )}
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "bold"
  },
  value: {
    fontSize: 14,
    color: "#555"
  }
});
