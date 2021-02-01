import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TimerButton from "./TimerButton";
import TimerForm from "./TimerForm";

type Props = {
  isOpen: boolean;
  setIsOpen: () => void;
};

const ToggleableTimerForm: React.FC<Props> = ({ isOpen, setIsOpen }) => (
  <View style={[styles.container, !isOpen && styles.buttonPadding]}>
    <Text>{`${isOpen}`}</Text>
    {isOpen ? (
      <TimerForm onCancel={setIsOpen} />
    ) : (
      <TimerButton title="+" color="black" onPress={setIsOpen} />
    )}
  </View>
);
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  buttonPadding: {
    paddingHorizontal: 15,
  },
});

export default ToggleableTimerForm;
