import React, { Component } from "react";
import { Stack } from "./config/Router";
import FCM, { FCMEvent } from "react-native-fcm";
import { Provider } from "react-redux";

import LibGeolocation from "./libraries/LibGeolocation";
import store from "./store/Store";
import { fetchOpenJobs } from "./store/openJobs/Actions";
import { fetchWipJobs } from "./store/wipJobs/Actions";
import { fetchCloseJobs } from "./store/closeJobs/Actions";
import { fetchCurrentJob } from "./store/currentJob/Actions";

export default class App extends Component {
  componentDidMount() {
    this.getNotification();
    LibGeolocation.watch();
  }

  componentWillUnmount() {
    this.notificationListener.remove();
    LibGeolocation.unwatch();
  }

  getNotification() {
    this.notificationListener = FCM.on(FCMEvent.Notification, async notif => {
      if (notif.data) {
        const data = JSON.parse(notif.data);

        switch (data.notification_type) {
          case "CREATE_JOB":
            // Fetch open jobs data for OpenJobs page
            store.dispatch(fetchOpenJobs());
            break;

          case "UPDATE_JOB":
            // Fetch wip jobs data for Wip page
            store.dispatch(fetchWipJobs());
            // Fetch close jobs data for CloseJobs page
            store.dispatch(fetchCloseJobs());
            break;

          case "UPDATE_JOB_MECHANIC":
            // Fetch current job data for ServiceDetail page
            store.dispatch(fetchCurrentJob());
            break;

          default:
            break;
        }
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Stack />
      </Provider>
    );
  }
}
