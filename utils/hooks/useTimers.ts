import { useState } from "react"
import {
  createFn,
  findFn,
  ITimer,
  ITimerFns,
  mappAllFn,
  removeFn,
  updateFn,
} from "../../types"
import { newTimer } from "../TimerUtils"

export const useTimers = (initialTimers: ITimer[]): [ITimer[], ITimerFns] => {
  const [timers, setTimers] = useState(initialTimers)

  const create: createFn = timerAttributes => {
    const t = newTimer(timerAttributes) as ITimer
    setTimers([t, ...timers])
    return t
  }

  const remove: removeFn = idToBeRemoved => {
    const newTimerList = timers.filter(({ id }) => id !== idToBeRemoved)
    const wasDeleted = newTimerList.length === timers.length
    setTimers(newTimerList)
    return wasDeleted
  }

  const update: updateFn = (id, timer) => {
    let newTimer = {} as ITimer
    setTimers(
      timers.map(t => {
        if (t.id === id) {
          newTimer = { ...t, ...timer }
          return newTimer
        } else {
          return t
        }
      })
    )
    return newTimer || null
  }

  const find: findFn = existingId => timers.find(({ id }) => existingId === id)

  const mapAll: mappAllFn = fn => {
    const newList = timers.map(fn)
    setTimers(newList)
    return newList
  }

  return [timers, { create, find, mapAll, remove, update }]
}
