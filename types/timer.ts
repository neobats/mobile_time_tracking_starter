export interface ITimer {
  id: string;
  title: string;
  project: string;
  elapsed: number;
  isRunning?: boolean;
}
