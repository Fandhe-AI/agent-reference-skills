# Basic Usage

Driver.js provides two primary methods for guiding users: multi-step tours and single element highlighting.

## Multi-Step Tour

Create a driver instance with a `steps` array and call `drive()` to start:

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

Each step targets a DOM element via CSS selector and displays a popover with a title and description.

## Single Element Highlight

Use the `highlight()` method to focus on a single element:

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

## Notes

- `drive()` starts the tour at step 0 by default; pass an index to start at a different step: `drive(2)`
- When using `highlight()`, only the close button is shown by default (no next/previous)
- The popover `title` and `description` both support HTML content

## Related

- [Configuration](../api/configuration.md)
- [Methods](../api/methods.md)
