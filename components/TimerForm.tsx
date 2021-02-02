import React from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import { createFn, updateFn } from "../types"
import { useTextInput } from "../utils/hooks"
import TimerButton from "./TimerButton"

type Props = {
  id?: string
  title?: string
  project?: string
  onCancel: () => void
  onCreate?: createFn
  onEdit?: updateFn
}

const TimerForm = ({
  id,
  title,
  project,
  onCancel,
  onCreate,
  onEdit,
}: Props) => {
  const [newTitle, setNewTitle] = useTextInput()
  const [newProject, setNewProject] = useTextInput()

  const submitText = id ? "Update" : "Create"
  const handleSubmit = () => {
    if (id && onEdit) {
      onEdit(id, {
        project: newProject || project,
        title: newTitle || title,
      })
    } else if (onCreate) {
      onCreate({ project: newProject, title: newTitle })
    } else {
      return
    }
  }

  return (
    <View style={styles.formContainer}>
      <View style={styles.attributeContainer}>
        <Text style={styles.textInputTitle}>Title</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            value={title}
            onChangeText={setNewTitle}
          />
        </View>
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.textInputTitle}>Project</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            value={project}
            onChangeText={setNewProject}
          />
        </View>
      </View>
      <View style={styles.buttonGroup}>
        <TimerButton
          small
          color="#21BA45"
          title={submitText}
          onPress={handleSubmit}
        />
        <TimerButton small color="#DB2828" title="Cancel" onPress={onCancel} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "white",
    borderColor: "#D6D7DA",
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  attributeContainer: {
    marginVertical: 8,
  },
  textInputContainer: {
    borderColor: "#D6D7DA",
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 5,
  },
  textInput: {
    height: 30,
    padding: 5,
    fontSize: 12,
  },
  textInputTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
})

export default TimerForm
