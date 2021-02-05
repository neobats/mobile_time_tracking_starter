import React, { useEffect, useState } from "react"
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import EditableTimer from "./components/EditableTimer"
import ToggleableTimerForm from "./components/ToggleableTimerForm"
import { useInterval, useTimers } from "./utils/hooks"

export default function App() {
  const [delay, setDelay] = useState<number | null>(null)
  const [timers, { create, find, mapAll, remove, update }] = useTimers([
    {
      id: "1",
      title: "Mow the lawn",
      project: "House Chores",
      elapsed: 8986300,
    },
    {
      id: "2",
      title: "Bake squash",
      project: "Kitchen Chores",
      elapsed: 3890985,
    },
  ])

  const toggleRunning = (existingId: string) => {
    const timer = find(existingId)
    if (typeof timer === "undefined") {
      return null
    }
    const isRunning = !timer.isRunning
    return update(existingId, { isRunning })
  }

  // trigger delay for interval
  useEffect(() => {
    const isSomeRunning = timers.some(t => t.isRunning)
    setDelay(isSomeRunning ? 1000 : null)
  }, [timers])

  useInterval(() => {
    mapAll(t => {
      const addedTime = delay ?? 0
      if (t.isRunning) {
        const newTime = t.elapsed + addedTime
        return { ...t, elapsed: newTime }
      }
      return { ...t }
    })
  }, delay) // run every second

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Timers</Text>
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.timerListContainer}
      >
        <ScrollView style={styles.timerList}>
          <ToggleableTimerForm createTimer={create} />
          {timers.map(timer => (
            <EditableTimer
              key={timer.id}
              {...timer}
              editTimer={update}
              removeTimer={remove}
              toggleRunning={toggleRunning}
            />
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timerListContainer: {
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
})
