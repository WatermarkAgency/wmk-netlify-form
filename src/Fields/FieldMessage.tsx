import * as React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FieldBasicProps } from "../types";

export const FieldMessage = ({
  isRequired,
  showLabel = false
}: FieldBasicProps) => {
  return (
    <>
      <Row>
        <Col>
          <Form.Label
            htmlFor="message"
            visuallyHidden={showLabel ? undefined : true}>
            Message {isRequired ? <span>*</span> : null}
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Message"
            id="message"
            name="message"
            required={isRequired}
          />
        </Col>
      </Row>
    </>
  );
};
