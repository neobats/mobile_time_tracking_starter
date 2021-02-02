import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { removeFn, updateFn } from "../types";
import { millisecondsToHuman } from "../utils/TimerUtils";
import TimerButton from "./TimerButton";

type Props = {
  id?: string;
  elapsed: number;
  project: string;
  title: string;
  isRunning?: boolean;
  editTimer: updateFn;
  removeTimer: removeFn;
};

const Timer = ({
  editTimer,
  elapsed,
  id,
  project,
  removeTimer,
  title,
}: Props) => {
  const elapsedString = millisecondsToHuman(elapsed);
  const onRemovePress = () => removeTimer(id || "");

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text>{`${project}`}</Text>
      <Text style={styles.elapsedTime}>{elapsedString}</Text>
      <View style={styles.buttonGroup}>
        <TimerButton color="blue" small title="Edit" />
        <TimerButton
          color="blue"
          small
          title="Remove"
          onPress={onRemovePress}
        />
      </View>
      <TimerButton color="#21BA45" small title="Start" />
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    backgroundColor: "white",
    borderColor: "#D6D7DA",
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  elapsedTime: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 15,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Timer;
