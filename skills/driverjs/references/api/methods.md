# Methods

All methods are called on the driver instance returned by `driver()`.

## Signature / Usage

Initialization:

```javascript
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  steps: [
    { element: '#step1', popover: { title: 'Step 1', description: 'First step' }},
    { element: '#step2', popover: { title: 'Step 2', description: 'Second step' }},
  ],
});

driverObj.drive();
driverObj.moveNext();
driverObj.destroy();
```

## Tour Control

| Method | Description |
|--------|-------------|
| `drive()` | Start tour at step 0 |
| `drive(stepIndex)` | Start tour at the given step index |
| `moveNext()` | Move to the next step |
| `movePrevious()` | Move to the previous step |
| `moveTo(stepIndex)` | Jump to a specific step by index. Starts the tour when it isn't running, like `drive()` (1.12.0) |
| `advance()` | Complete the current step the way `advanceOn` does (1.12.0) |

```javascript
driverObj.drive();      // Start from the beginning
driverObj.drive(2);     // Start from step index 2
driverObj.moveNext();   // Advance one step
driverObj.moveTo(0);    // Jump back to the first step
driverObj.advance();    // Complete the current step
```

`advance()` completes the step the way `advanceOn` does: it waits for `advanceDelay`, then runs `onNextClick` or moves on. Use it when your app decides the step is done, like after a save. `moveNext()` moves right away and doesn't run `onNextClick`.

```javascript
{
  element: "#save",
  advanceDelay: 600,
  onHighlighted: (element, step, { signal, driver }) => {
    window.addEventListener("profile-saved", () => driver.advance(), {
      signal,
    });
  },
  popover: {
    title: "Save your profile",
    instruction: "Click <b>Save</b>.",
  },
}
```

`moveNext()` ends the tour on the last step. `movePrevious()` on the first step and `moveTo()` with an index that doesn't exist end the tour. `moveNext()` and `movePrevious()` do nothing when no tour is running.

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
| `getActiveIndex()` | number \| undefined | Index of the currently active step; `undefined` in `highlight()` |
| `getActiveStep()` | DriveStep | Currently active step definition |
| `getPreviousStep()` | DriveStep | Previously active step definition |
| `getNextStep()` | DriveStep \| undefined | The step `moveNext()` would show, or undefined when there is none (1.5.0) |
| `getActiveElement()` | Element | Currently highlighted DOM element |
| `getPreviousElement()` | Element | Previously highlighted DOM element |

These account for steps that `skipMissingElement` would skip. `isFirstStep()` and `isLastStep()` return `false` when no tour is running.

## Status

| Method | Return Type | Description |
|--------|-------------|-------------|
| `isActive()` | boolean | Whether the driver is currently active |

## Changing the Popover

| Method | Description |
|--------|-------------|
| `updatePopover(patch?)` | Change the visible popover in place (1.11.0). Changes merge and last until the step is left. Without an argument, restores the step's own popover |
| `nudge()` | Shake the popover to draw attention to it (1.11.0) |
| `nudge(message)` | Shake it and show a line of feedback under the instruction (1.12.0). The line goes away with the next `nudge()` or step |
| `nudge(patch)` | Shake it and change the popover like `updatePopover()` does (1.11.0) |
| `refresh()` | Redraw the highlight and popover after a layout change. Resizes, scrolling and size changes of the element are followed already |

```javascript
// Change the visible popover. Changes merge, and last until the step
// is left.
driverObj.updatePopover({ description: "Almost there." });
driverObj.updatePopover({
  nextBtnText: "Continue",
  disableButtons: ["previous"],
});

// Restore the step's own popover
driverObj.updatePopover();

// Shake the popover to draw attention to it
driverObj.nudge();

// Shake it and show a line of feedback under the instruction.
// The line goes away with the next nudge() or step.
driverObj.nudge("Not that one. Click <b>Inbox</b>.");

// Shake it and change the popover like updatePopover() does
driverObj.nudge({ description: "Not quite. Choose Editor." });
```

`updatePopover()` takes `title`, `description`, `instruction`, `showButtons`, `disableButtons`, `showProgress`, `progressText`, `nextBtnText`, `prevBtnText`, `closeBtnLabel` and `popoverClass` (the `PopoverPatch` type). Changed text is announced to screen readers. It can change the text of an action step (`popover.instruction`), but not turn a step into one.

## Configuration

| Method | Description |
|--------|-------------|
| `getConfig()` | Returns the current configuration object |
| `setConfig(config)` | Replaces the whole driver configuration, including `steps` |
| `setSteps(steps)` | Sets or replaces the tour steps array |

```javascript
driverObj.setConfig({ ...driverObj.getConfig(), animate: false });
driverObj.setSteps([
  { element: '#new-step', popover: { title: 'New', description: 'Replaced steps' }},
]);
driverObj.drive();
```

`setConfig()` replaces the whole configuration, including `steps`. Spread `getConfig()` to keep what you had. `setSteps()` on a running tour ends it cleanly (1.12.0); call `drive()` to show the new steps.

## State & Highlighting

| Method | Description |
|--------|-------------|
| `getState(key?)` | Returns the current State object, or one key of it, like `getState("activeIndex")` |
| `highlight(step)` | Highlight a single element without starting a tour |
| `refresh()` | Recalculate highlight positioning (useful after DOM/layout changes); see Changing the Popover |

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
| `destroy()` | End the tour and remove all overlays and popovers. Does not run `onDestroyStarted`, so you can call it from that hook |

```javascript
// Destroy the tour. The destroy hooks receive `options.reason` "api",
// or the reason of the user action when called from inside a hook.
driverObj.destroy();
```

## Driver Interface

From `packages/driver/src/driver.ts` (1.10.1 source snapshot; it does not list the methods added since: `advance`, `nudge` and `updatePopover` — see their sections above):

```typescript
export interface Driver {
  isActive: () => boolean;
  refresh: () => void;
  drive: (stepIndex?: number) => void;
  setConfig: (config: Config) => void;
  setSteps: (steps: DriveStep[]) => void;
  getConfig: () => Config;
  getState: (key?: string) => any;
  getActiveIndex: () => number | undefined;
  isFirstStep: () => boolean;
  isLastStep: () => boolean;
  getActiveStep: () => DriveStep | undefined;
  getActiveElement: () => Element | undefined;
  getPreviousElement: () => Element | undefined;
  getPreviousStep: () => DriveStep | undefined;
  getNextStep: () => DriveStep | undefined;
  moveNext: () => void;
  movePrevious: () => void;
  moveTo: (index: number) => void;
  hasNextStep: () => boolean;
  hasPreviousStep: () => boolean;
  highlight: (step: DriveStep) => void;
  destroy: () => void;
}
```

## Notes

- `destroy()` on an instance that is not active is a no-op instead of tearing down another instance's tour (1.9.0).
- `onDestroyed` receives the final tour state (1.5.0).
- Each `driver()` call returns its own independent instance. You can create as many as you need on the same page, and their configuration, steps, and state never overlap. Only one instance can be on screen at a time, so starting a tour or highlight on one instance closes whichever instance is currently active. The closed instance gets `onDeselected` and `onDestroyed` but not `onDestroyStarted` (1.9.0).
- Since 1.12.0 `moveNext()`, `drive()` and `destroy()` work when called from `onHighlightStarted`, `onHighlighted` or `onDeselected`.
- `updatePopover()` and `nudge()` (1.11.0) and `advance()` (1.12.0) are documented in the 1.14.0 docs with usage examples only, without TypeScript signatures; the forms above are the documented usages.
- The 1.14.0 docs list these exported types: `Config`, `DriveStep`, `Popover`, `Driver`, `State`, `PopoverDOM`, `PopoverPatch`, `DriverHook`, `HookOpts`, `DestroyReason`, `AdvanceOn`, `AdvanceOnEvent`, `AllowedElements`, `InteractionHook`, `ElementMissing`, `ElementMissingHook`, `Side`, `Alignment`, `AllowedButtons`.
- `onDestroyed` runs when the tour is closed before the first step has settled (1.14.0).
- Hints and checklists are separate factories (`hints()` from `driver.js/hints`, `checklist()` from `driver.js/checklist`) with their own methods; see the hints and checklists categories.
- Source: https://driverjs.com/docs/api (driver.js 1.14.0 docs source, apps/docs/src/content/guides/api.mdx at tag 1.14.0); version annotations from https://driverjs.com/docs/changelog. Fetched 2026-11-14.

## Related

- [Configuration](./configuration.md)
- [Theming](./theming.md)
- [Hints methods](../hints/methods.md)
- [Checklists methods](../checklists/methods.md)
