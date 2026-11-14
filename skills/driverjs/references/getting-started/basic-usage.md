# Basic Usage

Driver.js does three things: tours, single highlights and hints. Each starts with a few lines.

## Multi-Step Tour

Pass `steps` to `driver()` and call `drive()`. Each step points at an element and describes it in a popover.

```javascript
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  showProgress: true,
  steps: [
    { element: '#step1', popover: { title: 'Step 1', description: 'Description for step 1' }},
    { element: '#step2', popover: { title: 'Step 2', description: 'Description for step 2' }},
    { element: '#step3', popover: { title: 'Step 3', description: 'Description for step 3' }},
  ]
});

driverObj.drive();
```

Each step targets a DOM element via CSS selector and displays a popover with a title and description. More in Tour Basics; to make steps wait for the user, see Interactive Tours and Action-Driven Tours (action steps need 1.12.0+).

## Single Element Highlight

`highlight()` takes one step and shows it on its own, without navigation buttons:

```javascript
const driverObj = driver();

driverObj.highlight({
  element: '#some-element',
  popover: {
    title: 'Important Feature',
    description: 'This is an important feature you should know about.'
  }
});
```

The `highlight()` method accepts the same step definition as tour steps but applies to one element only.

## Without Element (Modal)

Omitting the `element` property displays the popover as a centered modal:

```javascript
driverObj.highlight({
  popover: {
    title: 'Welcome',
    description: 'Welcome to our application!'
  }
});
```

## Hints

Hints are pulsing beacons that open a popover when clicked. There is no overlay and the page stays usable. They come from their own entry.

```javascript
import { hints } from "driver.js/hints";
import "driver.js/dist/hints.css";

const productHints = hints({
  hints: [
    { element: '#export-btn', popover: { title: 'Export your data', description: 'Download this report as CSV or PDF.' } },
    { element: '#summary', popover: { title: 'Auto-generated summary', description: 'Written for you from the numbers.' } },
  ],
});

productHints.show();
```

See the hints category for beacons, dismissals and the optional overlay: [Hints](../hints/README.md). For onboarding task lists, see [Checklists](../checklists/README.md).

## Notes

- `drive()` starts the tour at step 0 by default; pass an index to start at a different step: `drive(2)`
- When using `highlight()`, only the close button is shown by default (no next/previous)
- The popover `title` and `description` both support HTML content
- Driver.js needs no wrapper for React, Vue or Next.js; see the React and Vue guide for the setup and cleanup (not covered by a page in this skill)
- A tour that draws no UI of its own (since 1.13.0) imports from `driver.js/headless`; see [Installation](./installation.md)
- Source: https://driverjs.com/docs/basic-usage (driver.js 1.14.0 docs source, apps/docs/src/content/guides/basic-usage.mdx at tag 1.14.0).

## Related

- [Configuration](../api/configuration.md)
- [Methods](../api/methods.md)
