# Changelog: `wmk-netlify-form`

Notable changes to this project will be documented in this file.

### [1.3.1] (2022-05-24)

#### Bug Fix

- Fixed bad logic that was preventing rendering custom components without "as" defined.

### [1.3.0] (2022-05-20)

#### Features

- Can execute an onSubmit function.
- Can disable submissions by setting testing to true in config.

### [1.2.0] (2022-02-23)

#### Features

- Encoding can be explicitly defined via encType prop in config.

#### Bug Fixes

- "multipart/form" is default encoding sent without headers

#### Chores

- Added a changelog file
