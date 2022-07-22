import * as React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import {
  FieldAddressProps,
  FieldBasicProps,
  FieldCheckboxProps,
  FieldFileProps,
  FieldHiddenProps,
  FieldRadioProps,
  FieldSelectProps,
  FieldSingleProps,
  NetlifyFormAs
} from "./types";
import { isReactComponent, NullComponent, parseParams } from "./logic";
import {
  FieldAddress,
  FieldCheckbox,
  FieldEmail,
  FieldFile,
  FieldHidden,
  FieldMessage,
  FieldName,
  FieldPhone,
  FieldRadio,
  FieldSelect,
  FieldSingle
} from "./Fields";

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
      alert("Testing is on. See console for data.");
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
                          {...(props as FieldBasicProps)}
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
