import * as React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FieldBasicProps } from "../types";

export const FieldEmail = ({
  isRequired = true,
  showLabel = false
}: FieldBasicProps) => {
  return (
    <Row>
      <Col>
        <Form.Label
          htmlFor="email"
          visuallyHidden={showLabel ? undefined : true}>
          Email {isRequired ? <span>*</span> : null}
        </Form.Label>
        <Form.Control
          type="email"
          placeholder="Email Address"
          id="email"
          name="email"
          required={isRequired}
        />
      </Col>
    </Row>
  );
};
