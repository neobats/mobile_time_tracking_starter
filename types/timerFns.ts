import { ITimer } from "./timer"

export type createFn = (
  timerAttributes?: Pick<ITimer, "project" | "title">
) => ITimer
export type removeFn = (idToBeRemoved: string) => boolean
export type updateFn = (id: string, timer: Partial<ITimer>) => ITimer | null
export type findFn = (existingId: string) => ITimer | undefined
export type mappAllFn = (fn: (t: ITimer) => ITimer) => ITimer[]

export interface ITimerFns {
  create: createFn
  find: findFn
  mapAll: mappAllFn
  remove: removeFn
  update: updateFn
}
