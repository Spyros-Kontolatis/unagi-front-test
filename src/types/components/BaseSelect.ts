export interface Option {
  label: string;
  value: string | number;
}

export interface BaseSelect {
  label: string;
  options: Option[];
  initialValue?: string | number;
  cb?: (value: string | number) => void;
}
