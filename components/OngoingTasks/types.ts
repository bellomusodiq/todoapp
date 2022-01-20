export enum StatusEnum {
  IN_PROGRESS = 'in progress',
  DONE = 'done',
}
export interface OngoingTaskProps {
  title: string;
  timeStart?: Date;
  timeEnd?: Date;
  category: string;
  color?: string;
  onPress?: () => void;
  status: StatusEnum;
  progressPercent?: number;
}
