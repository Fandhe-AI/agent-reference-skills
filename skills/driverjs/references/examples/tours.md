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

## Animation Duration

Use the `duration` option to control how long the transition animation takes, in milliseconds. It controls both the speed at which the highlight moves between steps and the overlay/popover fade-in. It only applies when `animate` is `true` and defaults to `400`. Lower it for a snappier tour, or raise it for a more relaxed one.

```javascript
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  // Speed the whole transition up to 150ms (default is 400ms)
  duration: 150,
  showProgress: true,
  steps: [
    { element: '#some-element', popover: { title: 'Import the Library', description: 'Notice how quickly the highlight snaps over to this line.' }},
    { element: '#another-element', popover: { title: 'Create Driver', description: 'The popover fades in almost instantly at this speed.' }},
  ]
});

driverObj.drive();
```

## Notes

- The official docs page for these examples is now `/docs/tour-basics`.

## Related

- [Configuration](../api/configuration.md)
- [Methods](../api/methods.md)
