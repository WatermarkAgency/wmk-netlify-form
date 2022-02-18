import * as React from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import get from "lodash/get";
import { useState, useRef, useEffect } from "react";

const isReactComponent = (V: React.ReactNode) => {
  return (
    (typeof V === "function" && React.isValidElement(<V />)) ||
    (V !== null && React.isValidElement(V))
  );
};

const NullComponent = () => <></>;

const FieldName = ({ isRequired = true, showLabel = false }) => {
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

const FieldEmail = ({ isRequired = true, showLabel = false }) => {
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

type FieldSingleProps = {
  name: string;
  label: string;
  isRequired?: boolean;
  showLabel?: boolean;
};

const FieldSingle = ({
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

type FieldFileProps = {
  isRequired?: boolean;
  showLabel?: boolean;
  name: string;
  label?: string;
  maxKBytes?: number;
};

const FieldFile = ({
  isRequired = true,
  showLabel = false,
  name,
  label = "Upload File",
  maxKBytes
}: FieldFileProps) => {
  const [errorMsg, setErrorMsg] = useState(false);
  const max = maxKBytes * 1024;
  const handleUploadValidation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.currentTarget.files[0];
    if (maxKBytes && file.size > max) {
      event.currentTarget.value = "";
      setErrorMsg(true);
    } else {
      setErrorMsg(false);
    }
  };
  return (
    <Row>
      <Col>
        <Form.Label
          htmlFor={name}
          visuallyHidden={showLabel ? undefined : true}>
          {label} {isRequired ? <span>*</span> : null}{" "}
          {max ? <sup>Max Upload Size {max}KB</sup> : null}
        </Form.Label>
        {errorMsg ? (
          <Alert variant="warning">
            File is too large! Please upload a file less than {max}
            KB.
          </Alert>
        ) : null}
        <Form.Control
          onChange={handleUploadValidation}
          type="file"
          id={name}
          name={name}
          required={isRequired}
        />
      </Col>
    </Row>
  );
};

const FieldPhone = ({ isRequired = true, showLabel = false }) => {
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

type FieldAddressProps = {
  states?: string[];
  isRequired?: boolean;
  showLabel?: boolean;
};

const FieldAddress = ({
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

type FieldSelectProps = {
  name: string;
  label: string;
  options: string[];
  isRequired?: boolean;
  showLabel?: boolean;
};

const FieldSelect = ({
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

type FieldCheckboxProps = {
  label: string;
  name: string;
  text: string;
  isRequired?: boolean;
  showLabel?: boolean;
};

const FieldCheckbox = ({
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

type FieldMessageProps = {
  isRequired?: boolean;
  showLabel?: boolean;
};

const FieldMessage = ({ isRequired, showLabel = false }: FieldMessageProps) => {
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

type FieldRadioProps = {
  options: { label: string; disabled?: boolean }[];
  inline?: boolean;
  name: string;
  label: string;
  showLabel?: boolean;
};

const FieldRadio = ({
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

type FieldHiddenProps = { name: string; value: string };

const FieldHidden = ({ name, value }: FieldHiddenProps) => {
  return <input type="hidden" name={name} value={value} />;
};

const registeredFields = {
  name: FieldName,
  email: FieldEmail,
  phone: FieldPhone,
  address: FieldAddress,
  select: FieldSelect,
  checkbox: FieldCheckbox,
  single: FieldSingle,
  message: FieldMessage,
  radio: FieldRadio,
  hidden: FieldHidden,
  file: FieldFile
};

/**
 * Netlify Form Builder Utility
 */
export interface NetlifyFormProps {
  title: string;
  fields: {
    as?:
      | "name"
      | "email"
      | "phone"
      | "address"
      | "select"
      | "checkbox"
      | "single"
      | "message"
      | "radio"
      | "hidden"
      | "file";
    props?:
      | { isRequired?: boolean; showLabel?: boolean }
      | FieldSingleProps
      | FieldAddressProps
      | FieldFileProps
      | FieldCheckboxProps
      | FieldSelectProps
      | FieldRadioProps
      | FieldHiddenProps;
    Component?: React.FunctionComponent;
  }[];
  config: {
    name: string;
    thankYou?: React.ReactNode;
    thankYouPage?: string;
    consoleMessage: string;
    submit?: string;
    postUrl?: string;
    keepDom?: boolean;
  };
}

export const NetlifyForm = ({ title, fields, config }: NetlifyFormProps) => {
  const [submitted, setSubmitted] = useState<boolean>();
  const [formElement, setFormElement] = useState<HTMLFormElement>();
  const TitleComp = title;
  const formName = config.name;
  const thankYouPage = config.thankYouPage;
  const thankYou: React.ReactNode = config.thankYou
    ? config.thankYou
    : thankYouPage;
  const consoleMessage = config.consoleMessage;
  const submit = config.submit ? config.submit : "Submit";
  const postUrl = config.postUrl ? config.postUrl : "/";
  const keepDom = config.keepDom;
  let ThankYouJsx: React.ReactNode = null;
  switch (true) {
    case isReactComponent(thankYou):
      ThankYouJsx = thankYou;
      break;
    case typeof thankYou === "string" && thankYou.indexOf("/") === 0:
      break;
    case typeof thankYou === "string" && thankYou.indexOf("http") === 0:
      break;
    case typeof thankYou === "string":
      ThankYouJsx = ({ thankYou }: { thankYou: string }) => <>{thankYou}</>;
      break;
    default:
      ThankYouJsx = () => <div>Thank you for your submission!</div>;
  }

  const curForm = useRef();

  useEffect(() => {
    const current = curForm.current;
    setFormElement(current);
  }, [setFormElement]);

  const formSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData: any = new FormData(formElement);
    const body = new URLSearchParams(formData).toString();
    fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body
    })
      .then(() => {
        if (consoleMessage) {
          console.log("Form submit success: ", body);
        }
      })
      .then(() => {
        if (!ThankYouJsx && window && typeof thankYou === "string") {
          window.location.href = thankYou;
        } else {
          setSubmitted(true);
        }
      })
      .catch((error) => console.log(error));
  };
  const showForm = ThankYouJsx && keepDom;
  return (
    <>
      {submitted && !showForm && ThankYouJsx instanceof Function ? (
        <ThankYouJsx />
      ) : (
        <>
          <div style={{ display: submitted && showForm ? "none" : "block" }}>
            {typeof title === "string" ? (
              <h2>{title}</h2>
            ) : isReactComponent(title) ? (
              <TitleComp />
            ) : null}
            <Form
              name={formName}
              method="post"
              ref={curForm}
              data-netlify="true"
              onSubmit={formSubmit}>
              <input type="hidden" name="form-name" value={formName} />
              <Container fluid>
                {Array.isArray(fields)
                  ? fields.map((field, i) => {
                      const fieldType = field.as;
                      const FieldComp = field.Component;
                      const FieldJsx =
                        FieldComp && isReactComponent(FieldComp)
                          ? FieldComp
                          : get(
                              registeredFields,
                              `[${fieldType}]`,
                              NullComponent
                            );
                      const props = get(field, `props`);
                      return <FieldJsx key={fieldType + i} {...props} />;
                    })
                  : null}
                <Row>
                  <Col className="submit-col">
                    <Button type="submit">{submit}</Button>
                  </Col>
                </Row>
              </Container>
            </Form>
          </div>
          {submitted && showForm ? (
            <Row>
              <Col>
                {ThankYouJsx instanceof Function ? <ThankYouJsx /> : null}
              </Col>
            </Row>
          ) : null}
        </>
      )}
    </>
  );
};
