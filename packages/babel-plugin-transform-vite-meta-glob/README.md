# babel-plugin-transform-vite-meta-glob

> Please note: this plugin is intended to provide an approximation of some of Vite specific
> transformations when running the code in non-Vite environment, for example, running tests with a
> NodeJS based test runner.
>
> **The functionality within these transformations should not be relied upon in production.**

## Example

**In**

```js
const modules = import.meta.glob('./path/to/files/**/*')

const eagerModules = import.meta.globEager('./path/to/files/**/*')
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

const eagerModules = {
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
