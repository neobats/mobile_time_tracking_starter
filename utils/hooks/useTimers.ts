import { useState } from "react";
import { ITimer } from "../../types";
import { ITimerFns } from "../../types/timerFns";
import { newTimer } from "../TimerUtils";

export const useTimers = (initialTimers: ITimer[]): [ITimer[], ITimerFns] => {
  const [timers, setTimers] = useState(initialTimers);

  const create = (timerAttributes: Exclude<{ id: string }, ITimer>) => {
    const t = newTimer(timerAttributes) as ITimer;
    setTimers([t, ...timers]);
    return t;
  };

  const remove = (idToBeRemoved: string) => {
    const newTimerList = timers.filter(({ id }) => id !== idToBeRemoved);
    const wasDeleted = newTimerList.length === timers.length;
    setTimers(newTimerList);
    return wasDeleted;
  };

  const update = (id: string, timer: Partial<ITimer>) => {
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
