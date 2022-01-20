export interface CustomDatePickerProps {
  value: any;
  onChange: (value: any) => void;
  mode: 'date' | 'time';
  label: string;
  minimumDate?: Date;
  maximumDate?: Date;
}
