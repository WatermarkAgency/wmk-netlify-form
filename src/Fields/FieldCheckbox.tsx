import * as React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FieldCheckboxProps } from "../types";

export const FieldCheckbox = ({
  label,
  name,
  text,
  isRequired,
  showLabel = false
}: FieldCheckboxProps) => {
  return (
    <Row>
      <Col>
        <Form.Label
          htmlFor={name}
          className="show"
          visuallyHidden={showLabel ? undefined : true}>
          {label} {isRequired ? <span>*</span> : null}
        </Form.Label>
        <Form.Check
          type="checkbox"
          id={name}
          name={name}
          label={text}
          required={isRequired}
        />
      </Col>
    </Row>
  );
};
