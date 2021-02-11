import { CRUDFuncs } from "../utils/hooks"
import { ITimer } from "./timer"

export interface ITimerFns extends CRUDFuncs<ITimer> {}

export type createFn = ITimerFns["create"]
export type removeFn = ITimerFns["remove"]
export type updateFn = ITimerFns["update"]
export type findFn = ITimerFns["find"]
export type updateAllFn = ITimerFns["updateAll"]
