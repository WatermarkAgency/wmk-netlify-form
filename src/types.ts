export interface FieldBasicProps {
  isRequired?: boolean;
  showLabel?: boolean;
}

export interface FieldSingleProps extends FieldBasicProps {
  name: string;
  label: string;
}

export interface FieldFileProps extends FieldBasicProps {
  name: string;
  label?: string;
  maxKBytes?: number;
  maxMBytes?: number;
}

export interface FieldAddressProps extends FieldBasicProps {
  states?: string[];
}

export interface FieldSelectProps extends FieldSingleProps {
  options: string[];
}

export interface FieldCheckboxProps extends FieldSingleProps {
  text: string;
}

export interface FieldRadioProps {
  options: { label: string; disabled?: boolean }[];
  inline?: boolean;
  name: string;
  label: string;
  showLabel?: boolean;
}

export interface FieldHiddenProps {
  name: string;
  value: string;
}

export type NetlifyFormAs =
  | "name"
  | "email"
  | "phone"
  | "address"
  | "select"
  | "checkbox"
  | "single"
  | "message"
  | "radio"
  | "hidden"
  | "file";
