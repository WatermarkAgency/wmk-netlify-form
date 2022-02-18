# wmk-netlify-form

Builds a form that will submit its data to the netlify site where the build is hosted. It has several common form fields built in and can be used to create custom fields as needed.

```jsx
const NetlifyForm = ({ title, fields, config })...
```
Title can be a string or a function component

Fields:
  - name { isRequired = true, showLabel = false }
  - email { isRequired = true, showLabel = false }
  - phone { isRequired = true, showLabel = false }
  - address { isRequired = true, showLabel = false }
  - select { name, label, options, isRequired, showLabel = false }
  - checkBox { name, label, text, isRequired, showLabel = false }
  - message { isRequired, showLabel = false }
  - radio {options: [{ label: string }], inline = true, name, label, showLabel }
  - single (custom field) { name, label, isRequired, showLabel = false }

Config:
  - thankYou: string or function component
  - thankYouPage: address for a thank you page
  - name: name of form
  - postUrl: where form is being posted to
  - consoleMessage: display console message on form submit
  - sumbit: text inside the submit button

```jsx
<NetlifyForm
  config={{
    thankYou: () => (
      <>
        <h3>Thank you for your submission.</h3>
      </>
    ),
    name: `form_name`,
    postUrl: `/`,
    consoleMessage: true,
    submit: `SEND`
  }}
  fields={[
    { as: `name` },
    { as: `email` },
    { as: `phone` },
    { as: `address`},
    {
      as: `select`,
      props: {
        name: `choices`,
        label: `Which choice are you interested in?`,
        options: [
          `A`,
          `B`,
          `C`,
        ],
        isRequired: false
      }
    },
    {
      as: `checkbox`,
      props: {
        name: `check`,
        label: `Interested in subject?`,
        text: `Yes, send me information about subject.`
      }
    },
    {
      as: `single`,
      props: {
        name: `company`,
        label: `Company`,
        isRequired: true
      }
    },
    { as: `message` },
    {
      as: `radio`,
      props: {
        name: `submit as`,
        label: `Submit as`,
        showLabel: true,
        options: [{ label: `Business` }, { label: `Customer` }]
      }
    }
  ]}
/>
```
