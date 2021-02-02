import React from "react";
import { StyleSheet, View } from "react-native";
import { createFn } from "../types";
import { useEditFormToggle } from "../utils/hooks";
import TimerButton from "./TimerButton";
import TimerForm from "./TimerForm";

type Props = {
  createTimer: createFn;
};

const ToggleableTimerForm: React.FC<Props> = ({ createTimer }: Props) => {
  const [isOpen, setIsOpen] = useEditFormToggle();
  const onCreate: createFn = (attrs) => {
    setIsOpen();
    return createTimer(attrs);
  };
  return (
    <View style={[styles.container, !isOpen && styles.buttonPadding]}>
      {isOpen ? (
        <TimerForm onCancel={setIsOpen} onCreate={onCreate} />
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
