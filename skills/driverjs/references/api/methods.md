# Methods

All methods are called on the driver instance returned by `driver()`.

## Initialization

```javascript
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  steps: [
    { element: '#step1', popover: { title: 'Step 1', description: 'First step' }},
    { element: '#step2', popover: { title: 'Step 2', description: 'Second step' }},
  ],
});
```

## Tour Control

| Method | Description |
|--------|-------------|
| `drive()` | Start tour at step 0 |
| `drive(stepIndex)` | Start tour at the given step index |
| `moveNext()` | Move to the next step |
| `movePrevious()` | Move to the previous step |
| `moveTo(stepIndex)` | Jump to a specific step by index |

```javascript
driverObj.drive();      // Start from the beginning
driverObj.drive(2);     // Start from step index 2
driverObj.moveNext();   // Advance one step
driverObj.moveTo(0);    // Jump back to the first step
```

## Navigation Checks

| Method | Return Type | Description |
|--------|-------------|-------------|
| `hasNextStep()` | boolean | Whether there is a next step |
| `hasPreviousStep()` | boolean | Whether there is a previous step |
| `isFirstStep()` | boolean | Whether the current step is the first |
| `isLastStep()` | boolean | Whether the current step is the last |

## Step Information

| Method | Return Type | Description |
|--------|-------------|-------------|
| `getActiveIndex()` | number | Index of the currently active step |
| `getActiveStep()` | DriveStep | Currently active step definition |
| `getPreviousStep()` | DriveStep | Previously active step definition |
| `getActiveElement()` | Element | Currently highlighted DOM element |
| `getPreviousElement()` | Element | Previously highlighted DOM element |

## Status

| Method | Return Type | Description |
|--------|-------------|-------------|
| `isActive()` | boolean | Whether the driver is currently active |

## Configuration

| Method | Description |
|--------|-------------|
| `getConfig()` | Returns the current configuration object |
| `setConfig(config)` | Updates the driver configuration |
| `setSteps(steps)` | Sets or replaces the tour steps array |

```javascript
driverObj.setConfig({ animate: false });
driverObj.setSteps([
  { element: '#new-step', popover: { title: 'New', description: 'Replaced steps' }},
]);
driverObj.drive();
```

## State & Highlighting

| Method | Description |
|--------|-------------|
| `getState()` | Returns the current State object |
| `highlight(step)` | Highlight a single element without starting a tour |
| `refresh()` | Recalculate highlight positioning (useful after DOM/layout changes) |

```javascript
// Single element highlight
driverObj.highlight({
  element: '#feature',
  popover: { title: 'Feature', description: 'Check this out.' },
});

// Refresh after layout change
window.addEventListener('resize', () => {
  driverObj.refresh();
});
```

## Cleanup

| Method | Description |
|--------|-------------|
| `destroy()` | End the tour and remove all overlays and popovers |

```javascript
driverObj.destroy();
```

## Related

- [Configuration](./configuration.md)
- [Theming](./theming.md)
