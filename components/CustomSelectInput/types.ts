export interface OptionType {
  label: string;
  value: string | number;
}
export interface CustomSelectInputProps {
  options: any[];
  value: any;
  onChange: (value: any) => void;
  label: string;
  renderRow?: any;
}
