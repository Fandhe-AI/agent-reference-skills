# Installation

Driver.js is a lightweight (~5kb gzipped), no-dependency JavaScript library for creating powerful product tours, feature introductions, and element highlighting on web pages.

## Package Manager

```bash
npm install driver.js
# or
yarn add driver.js
# or
pnpm add driver.js
# the docs also write it as
pnpm install driver.js
```

## Import

```javascript
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
```

Both the JavaScript module and the CSS file must be imported. The CSS provides default styling for the popover and overlay.

## Hints, Checklists and Headless Entry Points

Hints and checklists ship as separate entries. Import them only when you use them.

```javascript
import { hints } from "driver.js/hints";
import "driver.js/dist/hints.css";

import { checklist } from "driver.js/checklist";
import "driver.js/dist/driver.css"; // checklist items run tours, so keep driver.css
import "driver.js/dist/checklist.css";
```

Hints don't need `driver.css`. Checklists do, because their items run tours.

Headless tours (since 1.13.0) draw nothing, so they need no stylesheet:

```javascript
import { driver } from "driver.js/headless";
```

`driver.js/hints` has a self-contained stylesheet (`driver.js/dist/hints.css`), so `driver.css` is not needed for hints alone. The package.json exports map lists `.`, `./hints`, `./checklist`, `./dist/driver.css`, `./dist/hints.css` and `./dist/checklist.css`. The exports map was read at 1.10.1 and was not re-checked at 1.14.0; the `driver.js/headless` entry above comes from the 1.14.0 Installation page.

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

Hints and checklists have their own CDN builds and globals:

```html
<!-- Only if you use hints -->
<script src="https://cdn.jsdelivr.net/npm/driver.js@latest/dist/hints.iife.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/driver.js@latest/dist/hints.css" />

<!-- Only if you use checklists. Load it after the main script. -->
<script src="https://cdn.jsdelivr.net/npm/driver.js@latest/dist/checklist.iife.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/driver.js@latest/dist/checklist.css" />

<!-- Only if you run headless tours. It replaces the main script. -->
<script src="https://cdn.jsdelivr.net/npm/driver.js@latest/dist/headless.iife.js"></script>
```

```javascript
const driver = window.driver.js.driver;
const hints = window.driverHints.hints;
const checklist = window.driverChecklist.checklist;
const headless = window.driverHeadless.driver;
```

## Notes

- Driver.js works with vanilla JavaScript as well as any frontend framework (React, Vue, Angular, etc.)
- The CSS import is required for default popover and overlay styling
- TypeScript types are included in the package
- The current docs CDN snippet uses `@latest`; the `@1` pin above also works and stays on the 1.x line
- The checklist CDN build must load after the main `driver.js` script, which it uses to run tours
- The headless CDN build (`headless.iife.js`, global `window.driverHeadless.driver`, since 1.13.0) replaces the main script instead of being loaded after it
- Source: https://driverjs.com/docs/installation (driver.js 1.14.0 docs source, apps/docs/src/content/guides/installation.mdx at tag 1.14.0).

## Related

- [Basic Usage](./basic-usage.md)
