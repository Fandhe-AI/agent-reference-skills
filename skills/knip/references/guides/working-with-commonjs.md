# Working with CommonJS

Source: https://knip.dev/guides/working-with-commonjs

## Overview

CommonJS uses `require()` and `module.exports`. Knip works with CommonJS without requiring ESM or `tsconfig.json`.

## Challenge

Dynamic nature creates ambiguity about default vs. named exports.

## Named Exports

### Key Assignment

```javascript
const B = function () {};
module.exports.A = { option: true };
module.exports.B = B;
```

### Shorthand Object

```javascript
const A = function () {};
const B = { option: true };
module.exports = { A, B };
```

Any other assignment to `module.exports` is treated as a default export.

## Import Patterns

### Incorrect (reports as unused)

```javascript
const DefaultImport = require('./common.js');
const runtime = [DefaultImport.A, DefaultImport.B];
```

### Correct

```javascript
const { A, B } = require('./common.js');
```

### Alternative

```javascript
const runtime = [require('./common.js').A];
```

## Default Export Conversion

Adding non-shorthand property converts to single default export:

```javascript
module.exports = { __esModule: true, A, B };
```

`__esModule` follows the informal CJS/ESM interop standard.
