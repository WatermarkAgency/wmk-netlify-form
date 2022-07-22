import * as React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FieldSelectProps } from "../types";

export const FieldSelect = ({
  name,
  label,
  options,
  isRequired,
  showLabel = false
}: FieldSelectProps) => {
  return (
    <Row>
      <Col>
        <Form.Label
          htmlFor={name}
          visuallyHidden={showLabel ? undefined : true}>
          {label} {isRequired ? <span>*</span> : null}
        </Form.Label>
        <Form.Control
          as="select"
          id={name}
          name={name}
          required={isRequired}
          defaultValue="">
          <option disabled={true} value="">
            {label}
          </option>
          {options.map((option, i) => {
            return <option key={option + i}>{option}</option>;
          })}
        </Form.Control>
      </Col>
    </Row>
  );
};
