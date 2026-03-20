# Installation

Day.js is a lightweight JavaScript library for date/time manipulation designed to work in both the browser and Node.js.

## Installation Overview

All code works in both browser and Node.js environments. Unit tests are run in both environments.

### Browser Support

- Chrome on Windows XP
- Internet Explorer 8, 9, 10 on Windows 7
- Internet Explorer 11 on Windows 10
- Latest Firefox on Linux
- Latest Safari on macOS 10.8 and 10.11

## Node.js

Install via a package manager:

```bash
npm install dayjs
# or
yarn add dayjs
# or
pnpm add dayjs
```

Import and use:

```javascript
const dayjs = require('dayjs')
// import dayjs from 'dayjs' // ES 2015
dayjs().format()
```

Both CommonJS `require` syntax and ES 2015 `import` statements are supported.

## Browser

Include via a local script tag:

```html
<script src="path/to/dayjs/dayjs.min.js"></script>
<script>
  dayjs().format()
</script>
```

Or load from a CDN (jsDelivr):

```html
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
<script>dayjs().format()</script>
```

Day.js is also available on cdnjs.com and unpkg.

## TypeScript

Day.js ships with official type declarations in the NPM package out of the box. No `@types` package needed.

Install via NPM:

```bash
npm install dayjs
```

Default import (requires `esModuleInterop: true` or `allowSyntheticDefaultImports: true` in `tsconfig.json`):

```typescript
import dayjs from 'dayjs'
dayjs().format()
```

Namespace import (works without additional `tsconfig.json` options):

```typescript
import * as dayjs from 'dayjs'
dayjs().format()
```

### Using Locales and Plugins in TypeScript

```typescript
import * as dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear'
import 'dayjs/locale/zh-cn'

dayjs.extend(isLeapYear)
dayjs.locale('zh-cn')
```

### tsconfig.json (with default import)

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  }
}
```

## Download

- **CDN / Latest version**: https://www.jsdelivr.com/package/npm/dayjs
- **Source code & releases**: https://github.com/iamkun/dayjs/releases

## Notes

- Day.js is ~2kB minified and gzipped
- You can test sample code directly in your browser's developer console
