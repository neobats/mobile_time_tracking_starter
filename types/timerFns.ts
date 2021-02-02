import { ITimer } from "./timer";

export type createFn = (
  timerAttributes: Exclude<{ id: string }, ITimer>
) => ITimer;
export type removeFn = (idToBeRemoved: string) => boolean;
export type updateFn = (id: string, timer: Partial<ITimer>) => ITimer | null;

export interface ITimerFns {
  create: (timerAttributes: Exclude<{ id: string }, ITimer>) => ITimer;
  remove: (idToBeRemoved: string) => boolean;
  update: (id: string, timer: Partial<ITimer>) => ITimer | null;
}
