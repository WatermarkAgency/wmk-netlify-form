import * as React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FieldBasicProps } from "../types";

export const FieldPhone = ({
  isRequired = true,
  showLabel = false
}: FieldBasicProps) => {
  return (
    <Row>
      <Col>
        <Form.Label
          htmlFor="phone"
          visuallyHidden={showLabel ? undefined : true}>
          Phone Number {isRequired ? <span>*</span> : null}
        </Form.Label>
        <Form.Control
          type="tel"
          placeholder="Phone Number"
          id="phone"
          name="phone"
          required={isRequired}
        />
      </Col>
    </Row>
  );
};
