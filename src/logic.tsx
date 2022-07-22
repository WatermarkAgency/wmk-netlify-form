import * as React from "react";

export const isReactComponent = (V: React.ReactNode) => {
  return (
    (typeof V === "function" && React.isValidElement(<V />)) ||
    (V !== null && React.isValidElement(V))
  );
};

export const parseParams = (search: string) => {
  return JSON.parse(
    '{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    function (key, value) {
      return key === "" ? value : decodeURIComponent(value);
    }
  );
};

export const NullComponent = () => <></>;
