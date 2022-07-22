import * as React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FieldSingleProps } from "../types";

export const FieldSingle = ({
  name,
  label,
  isRequired,
  showLabel = false
}: FieldSingleProps) => {
  return (
    <Row>
      <Col>
        {label && (
          <Form.Label
            htmlFor={name}
            visuallyHidden={showLabel ? undefined : true}>
            {label} {isRequired ? <span>*</span> : null}
          </Form.Label>
        )}
        <Form.Control
          type={name}
          placeholder={label}
          id={name}
          name={name}
          required={isRequired}
        />
      </Col>
    </Row>
  );
};
