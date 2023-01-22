# babel-preset-vite

<!-- prettier-ignore-start -->
[![Build Status](https://img.shields.io/github/workflow/status/OpenSourceRaidGuild/babel-vite/validate?logo=github&style=flat-square)](https://github.com/OpenSourceRaidGuild/babel-vite/actions?query=workflow%3Avalidate)
[![codecov](https://img.shields.io/codecov/c/github/OpenSourceRaidGuild/babel-vite.svg?style=flat-square)](https://codecov.io/gh/OpenSourceRaidGuild/babel-vite)
[![version](https://img.shields.io/npm/v/babel-preset-vite.svg?style=flat-square)](https://www.npmjs.com/package/babel-preset-vite)
[![downloads](https://img.shields.io/npm/dm/babel-preset-vite.svg?style=flat-square)](http://www.npmtrends.com/babel-preset-vite)
[![MIT License](https://img.shields.io/npm/l/babel-preset-vite.svg?style=flat-square)](https://github.com/OpenSourceRaidGuild/babel-vite/blob/master/LICENSE.md)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square)](https://github.com/OpenSourceRaidGuild/babel-vite/blob/master/CODE_OF_CONDUCT.md)
[![Discord](https://img.shields.io/discord/808364903822917662.svg?color=7389D8&labelColor=6A7EC2&logo=discord&logoColor=ffffff&style=flat-square)](https://discord.gg/grS89HWeYh)

[![Watch on GitHub](https://img.shields.io/github/watchers/OpenSourceRaidGuild/babel-vite.svg?style=social)](https://github.com/OpenSourceRaidGuild/babel-vite/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/OpenSourceRaidGuild/babel-vite.svg?style=social)](https://github.com/OpenSourceRaidGuild/babel-vite/stargazers)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/OpenSourceRaidGuild/babel-vite.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20out%20babel-preset-vite%20by%20OpenSourceRaidGuild%20https%3A%2F%2Fgithub.com%2FOpenSourceRaidGuild%2Fbabel-vite%20%F0%9F%91%8D)
<!-- prettier-ignore-end -->

> Please note: this plugin is intended to provide an approximation of some of Vite specific
> transformations when running the code in non-Vite environment, for example, running tests with a
> NodeJS based test runner.
>
> **The functionality within these transformations should not be relied upon in production.**

This preset includes the following plugins:

- [babel-plugin-transform-vite-meta-env](../babel-plugin-transform-vite-meta-env)
- [babel-plugin-transform-vite-meta-glob](../babel-plugin-transform-vite-meta-glob)
- [babel-plugin-transform-vite-meta-hot](../babel-plugin-transform-vite-meta-hot)

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

```jsonc
{
  "presets": [
    [
      "babel-preset-vite",
      {
        "env": false, // defaults to true
        "glob": false, // defaults to true
        "hot": false // defaults to true
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

### `glob`

`boolean`, defaults to `true`

Toggles whether or not to perform
[`import.meta.glob` and `import.meta.globEager`](https://vitejs.dev/guide/features.html#glob-import)
transformations.

### `hot`

`boolean`, defaults to `true`

Toggles whether or not to perform [`import.meta.hot`](https://vitejs.dev/guide/api-hmr.html)
transformations.

> You can read more about configuring preset options
> [here](https://babeljs.io/docs/en/presets#preset-options)
