import * as React from "react";
import { Form } from "react-bootstrap";
import { FieldRadioProps } from "../types";

export const FieldRadio = ({
  options,
  inline = true,
  name,
  label,
  showLabel
}: FieldRadioProps) => {
  return (
    <Form.Group>
      <Form.Label
        style={{ marginRight: ".5rem" }}
        visuallyHidden={showLabel ? undefined : true}>
        {label}
      </Form.Label>
      {Array.isArray(options)
        ? options.map((o, i) => {
            const radioLabel = o.label;
            const disabled = o.disabled;
            return (
              <Form.Check
                key={radioLabel + i}
                inline={inline ? true : undefined}
                label={radioLabel}
                name={name}
                type="radio"
                id={name + "-" + i}
                disabled={disabled ? true : undefined}
              />
            );
          })
        : null}
    </Form.Group>
  );
};
