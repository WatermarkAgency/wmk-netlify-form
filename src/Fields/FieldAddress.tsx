import * as React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FieldAddressProps } from "../types";

export const FieldAddress = ({
  states = [
    "Alabama",
    "Alaska",
    "American Samoa",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "District of Columbia",
    "Federated States of Micronesia",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Marshall Islands",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Northern Mariana Islands",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Palau",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virgin Island",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
  ],
  isRequired = false,
  showLabel = false
}: FieldAddressProps) => {
  return (
    <Row>
      <Col lg={12}>
        <Form.Label
          htmlFor="addressStreet"
          visuallyHidden={showLabel ? undefined : true}>
          Street Address {isRequired ? <span>*</span> : null}
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Street Address"
          id="addressStreet"
          name="addressStreet"
          required={isRequired}
        />
      </Col>
      <Col lg={6}>
        <Form.Label
          htmlFor="addressCity"
          visuallyHidden={showLabel ? undefined : true}>
          City {isRequired ? <span>*</span> : null}
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="City"
          id="addressCity"
          name="addressCity"
          required={isRequired}
        />
      </Col>
      <Col lg={6}>
        <Form.Label
          htmlFor="addressState"
          visuallyHidden={showLabel ? undefined : true}>
          State {isRequired ? <span>*</span> : null}
        </Form.Label>
        <Form.Control
          as="select"
          id="addressState"
          name="addressState"
          required={isRequired}
          defaultValue="">
          <option disabled={true} value="">
            Choose a State
          </option>
          {states.map((state, i) => (
            <option key={`${state}-${i}`}>{state}</option>
          ))}
        </Form.Control>
      </Col>
      <Col lg={6}>
        <Form.Label
          htmlFor="addressPostalCode"
          visuallyHidden={showLabel ? undefined : true}>
          Postal Code {isRequired ? <span>*</span> : null}
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Postal Code"
          id="addressPostalCode"
          name="addressPostalCode"
          required={isRequired}
        />
      </Col>
    </Row>
  );
};
