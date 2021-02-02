import { useState } from "react";
import { ITimer } from "../../types";
import { createFn, ITimerFns, removeFn, updateFn } from "../../types/timerFns";
import { newTimer } from "../TimerUtils";

export const useTimers = (initialTimers: ITimer[]): [ITimer[], ITimerFns] => {
  const [timers, setTimers] = useState(initialTimers);

  const create: createFn = (timerAttributes) => {
    const t = newTimer(timerAttributes) as ITimer;
    setTimers([t, ...timers]);
    return t;
  };

  const remove: removeFn = (idToBeRemoved) => {
    const newTimerList = timers.filter(({ id }) => id !== idToBeRemoved);
    const wasDeleted = newTimerList.length === timers.length;
    setTimers(newTimerList);
    return wasDeleted;
  };

  const update: updateFn = (id, timer) => {
    let newTimer = {} as ITimer;
    setTimers(
      timers.map((t) => {
        if (t.id === id) {
          newTimer = { ...t, ...timer };
          return newTimer;
        } else {
          return t;
        }
      })
    );
    return newTimer || null;
  };

  return [timers, { create, remove, update }];
};
