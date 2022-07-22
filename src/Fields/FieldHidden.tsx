import * as React from "react";
import { FieldHiddenProps } from "../types";

export const FieldHidden = ({ name, value }: FieldHiddenProps) => {
  return <input type="hidden" name={name} value={value} />;
};
