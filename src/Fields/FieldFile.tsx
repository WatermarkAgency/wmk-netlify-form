import * as React from "react";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { FieldFileProps } from "../types";
import { useState } from "react";

export const FieldFile = ({
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
