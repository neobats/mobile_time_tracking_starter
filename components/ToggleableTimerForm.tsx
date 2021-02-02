import React from "react";
import { StyleSheet, View } from "react-native";
import { useEditFormToggle } from "../utils/hooks";
import TimerButton from "./TimerButton";
import TimerForm from "./TimerForm";

const ToggleableTimerForm: React.FC = () => {
  const [isOpen, setIsOpen] = useEditFormToggle();
  return (
    <View style={[styles.container, !isOpen && styles.buttonPadding]}>
      {isOpen ? (
        <TimerForm onCancel={setIsOpen} />
      ) : (
        <TimerButton title="+" color="black" onPress={setIsOpen} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  buttonPadding: {
    paddingHorizontal: 15,
  },
});

export default ToggleableTimerForm;
