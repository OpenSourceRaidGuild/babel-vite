# babel-plugin-transform-vite-meta-env

> Please note: this plugin is intended to provide an approximation of some of Vite specific
> transformations when running the code in non-Vite environment, for example, running tests with a
> NodeJS based test runner.
>
> **The functionality within these transformations should not be relied upon in production.**

## Example

**In**

```
const mode = import.meta.env.MODE;
const baseUrl = import.meta.env.BASE_URL;
const nodeEnv = import.meta.env.NODE_ENV;
const dev = import.meta.env.DEV;
const prod = import.meta.env.PROD;
const viteVar = import.meta.env.VITE_VAR;
const other = import.meta.env.OTHER;
```

**Out**

```
const mode = process.env.MODE;
const baseUrl = '/';
const nodeEnv = process.env.NODE_ENV || 'test';
const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';
const viteVar = process.env.env.VITE_VAR;
const other = undefined;
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-vite-meta-env
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["babel-plugin-transform-vite-meta-env"]
}
```

### Via CLI

```sh
babel --plugins babel-plugin-transform-vite-meta-env script.js
```

### Via Node API

```javascript
require('@babel/core').transformSync('code', {
  plugins: ['babel-plugin-transform-vite-meta-env']
})
```
