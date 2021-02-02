import { ITimer } from "./timer";

export type createFn = (
  timerAttributes?: Pick<ITimer, "project" | "title">
) => ITimer;
export type removeFn = (idToBeRemoved: string) => boolean;
export type updateFn = (id: string, timer: Partial<ITimer>) => ITimer | null;

export interface ITimerFns {
  create: createFn;
  remove: removeFn;
  update: updateFn;
}
