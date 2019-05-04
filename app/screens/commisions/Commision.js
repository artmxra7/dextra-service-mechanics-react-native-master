import React from "react";
import { ScrollView, Text, RefreshControl } from "react-native";
import CommisionItem from "../../components/CommisionItem";
import { styles } from "../../assets/styles/Style";

const Commision = ({ screenProps }) => {
  const { commisions, isProgress, getData } = screenProps;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: "#eee" }]}
      refreshControl={
        <RefreshControl refreshing={isProgress} onRefresh={getData} />
      }
    >
      {commisions.map(commision => (
        <CommisionItem
          key={commision.id}
          date={commision.created_at}
          type={commision.type}
          amount={commision.amount}
          description={commision.description}
        />
      ))}
      {commisions.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 48 }}>
          You don't have any income
        </Text>
      )}
    </ScrollView>
  );
};

export default Commision;
