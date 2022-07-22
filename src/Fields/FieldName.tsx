import * as React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FieldBasicProps } from "../types";

export const FieldName = ({
  isRequired = true,
  showLabel = false
}: FieldBasicProps) => {
  return (
    <Row>
      <Col lg={6}>
        <Form.Label
          htmlFor="firstName"
          visuallyHidden={showLabel ? undefined : true}>
          First Name {isRequired ? <span>*</span> : null}
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="First Name"
          id="firstName"
          name="firstName"
          required={isRequired}
        />
      </Col>
      <Col lg={6}>
        <Form.Label
          htmlFor="lastName"
          visuallyHidden={showLabel ? undefined : true}>
          Last Name {isRequired ? <span>*</span> : null}
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Last Name"
          id="lastName"
          name="lastName"
          required={isRequired}
        />
      </Col>
    </Row>
  );
};
