# Migrate to 1.x

Guide for migrating from Driver.js 0.x to 1.x.

## Import Changes

```javascript
// 0.x
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';

// 1.x
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
```

The default export has been replaced with a named export. The CSS filename changed from `driver.min.css` to `driver.css`.

## Initialization Changes

```javascript
// 0.x
const driverObj = new Driver();
driverObj.defineSteps([/* steps */]);
driverObj.start();

// 1.x
const driverObj = driver({
  steps: [/* steps */]
});
driverObj.drive();
```

Steps are now passed directly to the `driver()` function instead of calling `defineSteps()` separately.

## Renamed Options

| 0.x | 1.x | Notes |
|-----|-----|-------|
| opacity | overlayOpacity | Renamed for clarity |
| className | popoverClass | More descriptive name |
| padding | stagePadding | Renamed |
| keyboardControl | allowKeyboardControl | Renamed |
| showButtons | showButtons | Changed from boolean to AllowedButtons[] ('next', 'previous', 'close') |

## Removed Options

| 0.x Option | Notes |
|------------|-------|
| overlayClickNext | Removed |
| closeBtnText | Close button now uses an icon |

## New Options

| Option | Description |
|--------|-------------|
| overlayColor | Custom overlay color |
| stageRadius | Border radius for highlighted element cutout |
| popoverOffset | Distance between popover and element |
| disableButtons | Array of buttons to disable |
| showProgress | Display step progress indicator |
| progressText | Custom progress text template |
| onPopoverRender | Callback after popover renders |
| overlayClickBehavior | Action on backdrop click: 'close', 'nextStep', or function |

## Popover Position Changes

```javascript
// 0.x
{ position: 'left-center' }

// 1.x
{ side: 'left', align: 'center' }
```

The single `position` string has been split into `side` and `align` properties. Element and title/description are now optional (enabling modal-style steps).

## Callback Signature Changes

All callbacks now receive three parameters: `(element, step, options)` where `options` contains `{ config, state }`.

Updated callbacks: `onHighlightStarted`, `onHighlighted`, `onDeselected`, `onDestroyStarted`, `onDestroyed`, `onCloseClick`, `onNextClick`, `onPrevClick`.

When overriding `onNextClick` or `onPrevClick`, you must manually call `moveNext()` or `movePrevious()`. The old `preventMove()` method is no longer needed — async flow control is now built-in.

## Renamed API Methods

| 0.x | 1.x |
|-----|-----|
| start() | drive() |
| reset() | destroy() |
| getHighlightedElement() | getActiveElement() |
| getLastHighlightedElement() | getPreviousElement() |
| highlight(selector) | highlight(stepDefinition) |
| isActivated (property) | isActive() (method) |

## New API Methods

| Method | Description |
|--------|-------------|
| moveTo(stepIndex) | Jump to a specific step |
| getActiveStep() | Get current step definition |
| getPreviousStep() | Get previous step definition |
| isFirstStep() | Check if on first step |
| isLastStep() | Check if on last step |
| getState() | Get current tour state |
| getConfig() | Get current config |
| setConfig(config) | Update config |
| refresh() | Recalculate highlight positioning |

## Related

- [Configuration](../api/configuration.md)
- [Methods](../api/methods.md)
