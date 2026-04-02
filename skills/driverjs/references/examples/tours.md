# Tours

Examples of multi-step tour configurations in Driver.js.

## Animated Tour (Default)

By default, Driver.js animates transitions between tour steps.

```javascript
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  showProgress: true,
  steps: [
    { element: '#element1', popover: { title: 'Step 1', description: 'First step', side: 'left', align: 'start' }},
    { element: '#element2', popover: { title: 'Step 2', description: 'Second step', side: 'bottom', align: 'start' }},
    { element: '#element3', popover: { title: 'Step 3', description: 'Third step', side: 'right', align: 'start' }},
  ]
});

driverObj.drive();
```

## Static Tour

Set `animate` to `false` for instant transitions without animation.

```javascript
const driverObj = driver({
  animate: false,
  showProgress: false,
  showButtons: ['next', 'previous', 'close'],
  steps: [
    { element: '#element1', popover: { title: 'Step 1', description: 'Description', side: 'bottom', align: 'start' }},
    { element: '#element2', popover: { title: 'Step 2', description: 'Description', side: 'top', align: 'start' }},
  ]
});

driverObj.drive();
```

## Tour Progress

Enable the built-in progress indicator with `showProgress` and customize with `progressText`.

```javascript
const driverObj = driver({
  showProgress: true,
  progressText: '{{current}} / {{total}}',
  steps: [/* ... */]
});
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| showProgress | boolean | false | Show progress text in popover |
| progressText | string | '{{current}} of {{total}}' | Template with {{current}} and {{total}} placeholders |

## Related

- [Configuration](../api/configuration.md)
- [Methods](../api/methods.md)
