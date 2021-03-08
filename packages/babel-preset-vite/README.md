# babel-preset-vite

> Please note: this plugin is intended to provide an approximation of some of Vite specific
> transformations when running the code in non-Vite environment, for example, running tests with a
> NodeJS based test runner.
>
> **The functionality within these transformations should not be relied upon in production.**

This preset includes the following plugins:

- [babel-plugin-transform-vite-meta-env](../babel-plugin-transform-vite-meta-env)
- [babel-plugin-transform-vite-meta-glob](../babel-plugin-transform-vite-meta-glob)

## Installation

```sh
npm install --save-dev babel-preset-vite
```

## Usage

### With a configuration file (Recommended)

Without options:

```json
{
  "presets": ["babel-preset-vite"]
}
```

With options:

```json
{
  "presets": [
    [
      "babel-preset-vite",
      {
        "env": false, // defaults to true
        "glob": false // defaults to true
      }
    ]
  ]
}
```

### Via CLI

```sh
babel --presets babel-preset-vite
```

### Via Node API

```javascript
require('@babel/core').transformSync('code', {
  presets: ['babel-preset-vite']
})
```

## Options

### `env`

`boolean`, defaults to `true`

Toggles whether or not to perform
[`import.meta.env`](https://vitejs.dev/guide/env-and-mode.html#env-variables) transformations.

### `env`

`boolean`, defaults to `true`

Toggles whether or not to perform
[`import.meta.glob` and `import.meta.globEager`](https://vitejs.dev/guide/features.html#glob-import)
transformations.

> You can read more about configuring preset options
> [here](https://babeljs.io/docs/en/presets#preset-options)
