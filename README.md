# wmk-netlify-form

Used to aid creating Netlify forms utilizing the _<NetlifyForm>_ component.

There are four main props, two of which are configuration objects:

```ts
export interface NetlifyFormProps {
  title?: string | React.FunctionComponent<any>; // A form title or Compononet in place of a form title

  /* 
  An array of input field properties. 
  You can use either a pre-configured component or a custom component 
  */
  fields: {
    as?: NetlifyFormAs; // An optional pre-configured input component
    props?: { [key: string]: any }; // Props that will be sent to the component
    Component?: React.FunctionComponent<{ [key: string]: any } | {}>; // An optional custom component
  }[];
  /* Configure the form itself */
  config: {
    name: string; // A unique name that will be used in the Netlify forms backend
    thankYou?: React.ReactNode; // A thank you message (string) or thank you component
    thankYouPage?: string; // An URL or path to a thank you page.
    consoleMessage?: boolean; // Show submitted form data for debugging
    submit?: string; // Change the text on the submit button
    postUrl?: string; // A valid local Netlify URL
    keepDom?: boolean; // Retain or destroy element in DOM after suubmission
    encType?: "multipart/form-data" | "application/x-www-form-urlencoded"; // Only change to multipart if submitting a file
    testing?: boolean; // Set to true to test form without submitting
  };
  onSubmit?: (data: { [key: string]: string }) => void;
}
```
