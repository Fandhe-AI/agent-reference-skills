# Installation

Driver.js is a lightweight (~5kb gzipped), no-dependency JavaScript library for creating powerful product tours, feature introductions, and element highlighting on web pages.

## Package Manager

```bash
npm install driver.js
# or
yarn add driver.js
# or
pnpm add driver.js
```

## Import

```javascript
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
```

Both the JavaScript module and the CSS file must be imported. The CSS provides default styling for the popover and overlay.

## CDN

```html
<script src="https://cdn.jsdelivr.net/npm/driver.js@1/dist/driver.js.iife.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/driver.js@1/dist/driver.css"/>

<script>
  const driverObj = window.driver.js.driver();
  driverObj.highlight({
    element: '#some-element',
    popover: {
      title: 'Title',
      description: 'Description'
    }
  });
</script>
```

When using the CDN version, the library is available via `window.driver.js.driver`.

## Notes

- Driver.js works with vanilla JavaScript as well as any frontend framework (React, Vue, Angular, etc.)
- The CSS import is required for default popover and overlay styling
- TypeScript types are included in the package

## Related

- [Basic Usage](./basic-usage.md)
