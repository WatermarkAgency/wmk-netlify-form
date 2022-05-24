import * as React from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";

const parseParams = (search: string) => {
  return JSON.parse(
    '{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    function (key, value) {
      return key === "" ? value : decodeURIComponent(value);
    }
  );
};

const NullComponent = () => <></>;

const isReactComponent = (V: React.ReactNode) => {
  return (
    (typeof V === "function" && React.isValidElement(<V />)) ||
    (V !== null && React.isValidElement(V))
  );
};

export type FieldBasicProps = { isRequired?: boolean; showLabel?: boolean };

const FieldName = ({
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

const FieldEmail = ({
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

export type FieldSingleProps = {
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

export type FieldFileProps = {
  isRequired?: boolean;
  showLabel?: boolean;
  name: string;
  label?: string;
  maxKBytes?: number;
  maxMBytes?: number;
};

const FieldFile = ({
  isRequired = true,
  showLabel = false,
  name,
  label = "Upload File",
  maxKBytes,
  maxMBytes
}: FieldFileProps) => {
  const [errorMsg, setErrorMsg] = useState(false);
  const max = maxKBytes
    ? maxKBytes * 1024
    : maxMBytes
    ? maxMBytes * 1024 * 1024
    : 0;
  const handleUploadValidation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.currentTarget.files;
    if (files) {
      const file = files[0];
      if ((maxKBytes && file.size > max) || (maxMBytes && file.size > max)) {
        event.currentTarget.value = "";
        setErrorMsg(true);
      } else {
        setErrorMsg(false);
      }
    } else {
      console.log("Error: no files in FileList");
    }
  };
  return (
    <Row>
      <Col>
        <Form.Label
          htmlFor={name}
          visuallyHidden={showLabel ? undefined : true}>
          {label} {isRequired ? <span>*</span> : null}{" "}
          {max > 0 ? (
            <sub>
              (Max Upload Size {maxKBytes || maxMBytes}
              {maxKBytes ? "KB" : "MB"})
            </sub>
          ) : null}
        </Form.Label>
        {errorMsg ? (
          <Alert variant="danger">
            File is too large! Please upload a file less than{" "}
            {maxKBytes || maxMBytes}
            {maxKBytes ? "KB" : "MB"}.
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

const FieldPhone = ({
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

export type FieldAddressProps = {
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

export type FieldSelectProps = {
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

export type FieldCheckboxProps = {
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

export type FieldMessageProps = {
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

export type FieldRadioProps = {
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

export type FieldHiddenProps = { name: string; value: string };

const FieldHidden = ({ name, value }: FieldHiddenProps) => {
  return <input type="hidden" name={name} value={value} />;
};

export type NetlifyFormAs =
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

/**
 * Netlify Form Builder Utility
 */
export interface NetlifyFormProps {
  title?: string | React.FunctionComponent<any>;
  fields: {
    as?: NetlifyFormAs;
    props?: { [key: string]: any };
    Component?: React.FunctionComponent<{ [key: string]: any } | {}>;
  }[];
  config: {
    name: string;
    thankYou?: React.ReactNode;
    thankYouPage?: string;
    consoleMessage?: boolean;
    submit?: string;
    postUrl?: string;
    keepDom?: boolean;
    encType?: "multipart/form-data" | "application/x-www-form-urlencoded";
    testing?: boolean;
  };
  onSubmit?: (data: { [key: string]: string }) => void;
}

export const NetlifyForm = ({
  title,
  fields,
  config,
  onSubmit
}: NetlifyFormProps) => {
  const [submitted, setSubmitted] = useState<boolean>();
  const [formElement, setFormElement] = useState<HTMLFormElement>();
  const TitleComp = title && typeof title !== "string" ? title : NullComponent;
  const formName = config.name;
  const thankYouPage = config.thankYouPage;
  const thankYou: React.ReactNode = config.thankYou
    ? config.thankYou
    : thankYouPage;
  const consoleMessage = config.consoleMessage;
  const submit = config.submit ? config.submit : "Submit";
  const postUrl = config.postUrl ? config.postUrl : "/";
  const keepDom = config.keepDom;
  const encType = config.encType;
  let ThankYouJsx: React.ReactNode = null;
  const testing = config.testing ? true : false;
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

  const curForm = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const current = curForm.current;
    if (current) {
      setFormElement(current);
    }
  }, [setFormElement]);

  const formSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(formElement);
    const params = new URLSearchParams(formData as any);
    const body = params.toString();
    if (!testing) {
      fetch(postUrl, {
        method: "POST",
        body: encType === "application/x-www-form-urlencoded" ? body : formData
      })
        .then(() => {
          if (consoleMessage) {
            console.log("Form submit success: ", body);
          }
          if (onSubmit) {
            onSubmit(parseParams(body));
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
    } else {
      alert("Testing is on. See console for data.")
      console.log("Test submission data:", body);
      if (onSubmit) {
        onSubmit(parseParams(body));
      }
    }
  };
  const showForm = ThankYouJsx && keepDom;
  return (
    <>
      {submitted && !showForm && ThankYouJsx instanceof Function ? (
        <ThankYouJsx />
      ) : (
        <>
          <div style={{ display: submitted && showForm ? "none" : "block" }}>
            {typeof title === "string" ? <h2>{title}</h2> : <TitleComp />}
            <Form
              name={formName}
              method="post"
              ref={curForm}
              data-netlify="true"
              onSubmit={formSubmit}
              encType={encType}>
              <input type="hidden" name="form-name" value={formName} />
              <Container fluid>
                {Array.isArray(fields)
                  ? fields.map((field, i) => {
                      const fieldType = field.as;
                      const FieldComp = field.Component;
                      const props = field.props;
                      return FieldComp && isReactComponent(FieldComp) ? (
                        <FieldComp {...props} key={fieldType + i} />
                      ) : fieldType === "address" ? (
                        <FieldAddress
                          {...(props as FieldAddressProps)}
                          key={fieldType + i}
                        />
                      ) : fieldType === "checkbox" ? (
                        <FieldCheckbox
                          {...(props as FieldCheckboxProps)}
                          key={fieldType + i}
                        />
                      ) : fieldType === "email" ? (
                        <FieldEmail
                          {...(props as FieldBasicProps)}
                          key={fieldType + i}
                        />
                      ) : fieldType === "file" ? (
                        <FieldFile
                          {...(props as FieldFileProps)}
                          key={fieldType + i}
                        />
                      ) : fieldType === "hidden" ? (
                        <FieldHidden
                          {...(props as FieldHiddenProps)}
                          key={fieldType + i}
                        />
                      ) : fieldType === "message" ? (
                        <FieldMessage
                          {...(props as FieldMessageProps)}
                          key={fieldType + i}
                        />
                      ) : fieldType === "name" ? (
                        <FieldName
                          {...(props as FieldBasicProps)}
                          key={fieldType + i}
                        />
                      ) : fieldType === "phone" ? (
                        <FieldPhone
                          {...(props as FieldBasicProps)}
                          key={fieldType + i}
                        />
                      ) : fieldType === "radio" ? (
                        <FieldRadio
                          {...(props as FieldRadioProps)}
                          key={fieldType + i}
                        />
                      ) : fieldType === "select" ? (
                        <FieldSelect
                          {...(props as FieldSelectProps)}
                          key={fieldType + i}
                        />
                      ) : fieldType === "single" ? (
                        <FieldSingle
                          {...(props as FieldSingleProps)}
                          key={fieldType + i}
                        />
                      ) : null;
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
