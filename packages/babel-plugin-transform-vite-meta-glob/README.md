# babel-plugin-transform-vite-meta-glob

<!-- prettier-ignore-start -->
[![Build Status](https://img.shields.io/github/workflow/status/OpenSourceRaidGuild/babel-vite/validate?logo=github&style=flat-square)](https://github.com/OpenSourceRaidGuild/babel-vite/actions?query=workflow%3Avalidate)
[![codecov](https://img.shields.io/codecov/c/github/OpenSourceRaidGuild/babel-vite.svg?style=flat-square)](https://codecov.io/gh/OpenSourceRaidGuild/babel-vite)
[![version](https://img.shields.io/npm/v/babel-plugin-transform-vite-meta-glob.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-transform-vite-meta-glob)
[![downloads](https://img.shields.io/npm/dm/babel-plugin-transform-vite-meta-glob.svg?style=flat-square)](http://www.npmtrends.com/babel-plugin-transform-vite-meta-glob)
[![MIT License](https://img.shields.io/npm/l/babel-plugin-transform-vite-meta-glob.svg?style=flat-square)](https://github.com/OpenSourceRaidGuild/babel-vite/blob/master/LICENSE.md)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square)](https://github.com/OpenSourceRaidGuild/babel-vite/blob/master/CODE_OF_CONDUCT.md)
[![Discord](https://img.shields.io/discord/808364903822917662.svg?color=7389D8&labelColor=6A7EC2&logo=discord&logoColor=ffffff&style=flat-square)](https://discord.gg/grS89HWeYh)

[![Watch on GitHub](https://img.shields.io/github/watchers/OpenSourceRaidGuild/babel-vite.svg?style=social)](https://github.com/OpenSourceRaidGuild/babel-vite/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/OpenSourceRaidGuild/babel-vite.svg?style=social)](https://github.com/OpenSourceRaidGuild/babel-vite/stargazers)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/OpenSourceRaidGuild/babel-vite.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20out%20babel-plugin-transform-vite-meta-glob%20by%20OpenSourceRaidGuild%20https%3A%2F%2Fgithub.com%2FOpenSourceRaidGuild%2Fbabel-vite%20%F0%9F%91%8D)
<!-- prettier-ignore-end -->

> Please note: this plugin is intended to provide an approximation of some of Vite specific
> transformations when running the code in non-Vite environment, for example, running tests with a
> NodeJS based test runner.
>
> **The functionality within these transformations should not be relied upon in production.**

## Example

**In**

```js
const modules = import.meta.glob('./path/to/files/**/*')

// eager
const eagerModules = import.meta.glob('./path/to/files/**/*', { eager: true })

// deprecated eager
const deprecatedEagerModules = import.meta.globEager('./path/to/files/**/*')
```

**Out**

> For the purposes of this example, assume there are 3 files, `files1.js`, `files2.js` and
> `file3.js` at the path of `./path/to/files/` relative the files being transformed.

```js
const modules = {
  './path/to/files/file1.js': () => import('./path/to/files/file1.js'),
  './path/to/files/file2.js': () => import(('./path/to/files/file2.js'),
  './path/to/files/file3.js': () => import(('./path/to/files/file3.js')
}

// eager
import * as __glob__0_0 from './path/to/files/file1.js'
import * as __glob__0_1 from './path/to/files/file2.js'
import * as __glob__0_2 from './path/to/files/file3.js'
const eagerModules =  {
  './path/to/files/file1.js': __glob__0_1,
  './path/to/files/file2.js': __glob__0_2,
  './path/to/files/file3.js': __glob__0_3
}

// deprecated eager
const deprecatedEagerModules = {
  './path/to/files/file1.js': require('./path/to/files/file1.js'),
  './path/to/files/file2.js': require('./path/to/files/file2.js'),
  './path/to/files/file3.js': require('./path/to/files/file3.js')
}
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-vite-meta-glob
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["babel-plugin-transform-vite-meta-glob"]
}
```

### Via CLI

```sh
babel --plugins babel-plugin-transform-vite-meta-glob script.js
```

### Via Node API

```javascript
require('@babel/core').transformSync('code', {
  plugins: ['babel-plugin-transform-vite-meta-glob']
})
```
