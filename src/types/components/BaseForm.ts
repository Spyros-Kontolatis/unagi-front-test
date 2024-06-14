import type { Dayjs } from 'dayjs';
export interface Field {
  type: string;
  label: string;
  key: string;
  initialValue?: string | number | Dayjs;
  error: (val: string | number | Dayjs) => string;
}

export interface FieldValues {
  [key: string]: string | number | Dayjs;
}
