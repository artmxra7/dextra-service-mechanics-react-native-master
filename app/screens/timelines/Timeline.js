import React, { Component } from "react";
import { View, Text, ScrollView, Image, RefreshControl } from "react-native";
import { Card, Spinner } from "native-base";
import Axios from "axios";
import { styles } from "../../assets/styles/Style";
import Link from "../../components/Link";
import { config } from "../../config/Config";

export default class Timeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isProgress: false
    };

    this.getTimelines = this.getTimelines.bind(this);
  }

  componentDidMount() {
    this.getTimelines();
  }

  openDetail(id) {
    this.props.navigation.navigate("TimelineDetail", { id });
  }

  async getTimelines() {
    this.setState({ isProgress: true });

    try {
      let response = await Axios.get(config.url + "news");

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
    const { data, isProgress } = this.state;

    return (
      <View style={[styles.container]}>
        <ScrollView
          style={[styles.content, { padding: 0, backgroundColor: "#eee" }]}
          refreshControl={
            <RefreshControl
              refreshing={isProgress}
              onRefresh={this.getTimelines}
            />
          }
          pagingEnabled
        >
          {data.map((news, index) => {
            let path = config.base_url + "storage/news/" + news.photo;
            let image = news.photo
              ? { uri: path }
              : require("../../assets/images/default.jpg");

            return (
              <Link onPress={() => this.openDetail(news.id)} key={index}>
                <Card style={{ padding: 10, margin: 0, marginBottom: 0 }}>
                  <View style={{ flexDirection: "row" }}>
                    <View>
                      <Image style={styles.feed_images} source={image} />
                    </View>
                    <View style={{ paddingLeft: 5, paddingRight: 90 }}>
                      <Text style={[styles.feed_text]}>
                        <Text style={styles.feed_text_title}>{news.title}</Text>
                        <Text>{"\n"}</Text>
                        <Text style={styles.feed_text_content}>
                          {news.content_summary}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </Card>
              </Link>
            );
          })}
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
