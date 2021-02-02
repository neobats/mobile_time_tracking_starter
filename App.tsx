import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import EditableTimer from "./components/EditableTimer";
import ToggleableTimerForm from "./components/ToggleableTimerForm";
import { useTimers } from "./utils/hooks";

export default function App() {
  const [timers, timerFns] = useTimers([
    {
      id: "1",
      title: "Mow the lawn",
      project: "House Chores",
      elapsed: 8986300,
      isRunning: true,
    },
    {
      id: "2",
      title: "Bake squash",
      project: "Kitchen Chores",
      elapsed: 3890985,
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Timers</Text>
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        // style={styles.titleListContainer}
      >
        <ScrollView style={styles.timerList}>
          <ToggleableTimerForm />
          {timers.map((timer) => (
            <EditableTimer
              key={timer.id}
              {...timer}
              editTimer={timerFns.update}
              removeTimer={timerFns.remove}
            />
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D6D7DA",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  timerList: {
    paddingBottom: 15,
  },
});
