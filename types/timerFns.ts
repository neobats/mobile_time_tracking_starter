import { ITimer } from "./timer"

export type createFn = (
  timerAttributes?: Pick<ITimer, "project" | "title">
) => ITimer
export type removeFn = (idToBeRemoved: string) => boolean
export type updateFn = (id: string, timer: Partial<ITimer>) => ITimer | null
export type findFn = (existingId: string) => ITimer | undefined

export interface ITimerFns {
  create: createFn
  find: findFn
  remove: removeFn
  update: updateFn
}
