import React from "react";
import { ScrollView, RefreshControl, Text } from "react-native";
import { styles } from "../../assets/styles/Style";
import WithdrawHistory from "../../components/WithdrawHistory";

const History = ({ screenProps }) => {
  const { completedWithdraws, isProgress, getData } = screenProps;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: "#eee" }]}
      refreshControl={
        <RefreshControl refreshing={isProgress} onRefresh={getData} />
      }
    >
      {completedWithdraws.map(withdraw => (
        <WithdrawHistory
          key={withdraw.id}
          date={withdraw.created_at}
          status={withdraw.status}
          amount={withdraw.amount}
          bankName={withdraw.bank_name}
          bankAccount={withdraw.bank_account}
          bankPersonName={withdraw.bank_person_name}
        />
      ))}
      {completedWithdraws.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 48 }}>
          You never withdraw
        </Text>
      )}
    </ScrollView>
  );
};

export default History;
