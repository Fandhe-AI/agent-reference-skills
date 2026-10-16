# Configuration

Driver.js accepts a configuration object when creating a driver instance. Options can be set at the driver level (global) and overridden at the step level.

## Signature / Usage

```javascript
const driverObj = driver({
  steps: [/* ... */],
  animate: true,
  overlayColor: 'black',
  smoothScroll: false,
  allowClose: true,
  showProgress: true,
  onHighlighted: (element, step, options) => { /* ... */ },
});
```

## Config Type (Driver-Level Options)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| steps | DriveStep[] | undefined | Array of tour steps |
| animate | boolean | true | Whether to animate transitions |
| duration | number | 400 | Duration of the transition animation in milliseconds. Controls both the speed of the stage moving between steps and the overlay/popover fade-in. Only applies when `animate` is true |
| overlayColor | string | `'black'` | Backdrop overlay color |
| smoothScroll | boolean | false | Smooth scroll to highlighted element |
| allowClose | boolean | true | Allow closing via backdrop click |
| allowScroll | boolean | true | Whether to allow scrolling the page while the driver is active |
| overlayOpacity | number | 0.5 | Opacity of backdrop |
| overlayClickBehavior | `'close'` \| `'nextStep'` \| `'none'` \| DriverHook | `'close'` | Action on backdrop click. `'none'` ignores overlay clicks while Escape and the close button still work (1.9.0) |
| stagePadding | number | 10 | Distance between element and cutout (px) |
| stageRadius | number | 5 | Border radius of cutout (px) |
| allowKeyboardControl | boolean | true | Enable keyboard navigation. Arrow keys are ignored when their button is hidden or disabled, and Escape is ignored when the close button is disabled (1.9.0) |
| disableActiveInteraction | boolean | false | Prevent interaction with highlighted element |
| advanceOnClick | boolean | false | Advance the tour when the highlighted element is clicked |
| skipMissingElement | boolean | false | Skip a step whose target element is specified but missing from the DOM |
| waitForElement | number | 0 | Wait up to this many milliseconds for a step's element to appear. The current step stays highlighted, with its popover hidden, while waiting |
| popoverClass | string | undefined | Custom CSS class for popover |
| popoverOffset | number | 10 | Distance between popover and element (px) |
| showButtons | AllowedButtons[] | `['next','previous','close']` (tours); `[]` (highlight) | Buttons to show |
| disableButtons | AllowedButtons[] | `[]` | Buttons to disable |
| showProgress | boolean | false | Show progress text |
| progressText | string | `'{{current}} of {{total}}'` | Progress text template |
| nextBtnText | string | undefined | Custom next button text |
| prevBtnText | string | undefined | Custom previous button text |
| doneBtnText | string | undefined | Custom done button text (last step) |
| closeBtnLabel | string | `'Close'` | Screen reader label (`aria-label`) of the close button (1.9.0) |

## Driver Hooks / Callbacks

Hooks can be set at the driver level (apply to all steps) or at the step level (override driver-level).

All hooks (except `onPopoverRender`) follow the `DriverHook` signature:

```typescript
type DriverHook = (element: Element | undefined, step: DriveStep, opts: HookOpts) => void;

type DestroyReason = "done" | "close" | "escape" | "overlay" | "replaced" | "api";
```

`HookOpts` is `{ config, state, driver, index, reason? }`: `index` is the active step index, or `undefined` for a single highlight (1.7.0); `reason` is set only on the destroy-related hooks (1.10.0). `DestroyReason` and `HookOpts` are exported types.

| Hook | Parameters | Description |
|------|------------|-------------|
| onPopoverRender | (popover: PopoverDOM, options: { config, state, driver, index }) | Called after popover is rendered |
| onHighlightStarted | (element, step, options: { config, state, driver, index }) | Called before element is highlighted |
| onHighlighted | (element, step, options: { config, state, driver, index }) | Called after element is highlighted |
| onDeselected | (element, step, options: { config, state, driver, index, reason? }) | Called when element is deselected. `reason` is set only on the call that runs when the tour is destroyed |
| onDestroyStarted | (element, step, options: { config, state, driver, index, reason }) | Called before driver is destroyed |
| onDestroyed | (element, step, options: { config, state, driver, index, reason }) | Called after driver is destroyed |
| onNextClick | (element, step, options: { config, state, driver, index }) | Called on next button click |
| onPrevClick | (element, step, options: { config, state, driver, index }) | Called on previous button click |
| onCloseClick | (element, step, options: { config, state, driver, index }) | Called on close button click |
| onDoneClick | (element, step, options: { config, state, driver, index }) | Called on done button click (final step) |

`options.index` is the zero-based index of the currently active step (equivalent to `driverObj.getActiveIndex()`), or `undefined` when driving a single highlight. It always reflects the active step, so inside `onDeselected` (which fires for the step being left during a transition) it points at the step being moved to.

`options.reason` tells why the tour ended:

| reason | Meaning |
|--------|---------|
| `"done"` | moved past the last step (including when the remaining steps are skipped as missing) |
| `"close"` | the close button |
| `"escape"` | the escape key |
| `"overlay"` | a click on the overlay |
| `"replaced"` | another driver instance started |
| `"api"` | `destroy()`, or a `moveTo()` / `movePrevious()` that left the steps, from your own code |

A `destroy()` you call from a hook (`onDestroyStarted`, `onCloseClick`, `onNextClick` / `onDoneClick` on the last step, an `overlayClickBehavior` function) keeps the reason of the user action that started it. The reason is not set on the other hooks, or on the `onDeselected` that runs between steps. This hook only asks when the user leaves early:

```javascript
onDestroyStarted: (el, step, { reason }) => {
  if (reason === "done" || confirm("Leave?")) {
    driverObj.destroy();
  }
};
```

`onDoneClick` runs instead of `onNextClick` on the last step, and Driver.js does not destroy the tour automatically; call `driverObj.destroy()` yourself. It can be configured at the driver or step level.

When overriding `onNextClick` or `onPrevClick`, automatic navigation is disabled. You must manually call `driverObj.moveNext()` or `driverObj.movePrevious()` to advance:

```javascript
const driverObj = driver({
  onNextClick: (element, step, { config, state, driver }) => {
    // Custom logic before advancing
    driverObj.moveNext();
  },
});
```

## Popover Type (Per-Step Popover Config)

Each step's `popover` property accepts these options, overriding the driver-level defaults:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| title | string | undefined | Popover title (supports HTML) |
| description | string | undefined | Popover description (supports HTML) |
| side | `'top'` \| `'right'` \| `'bottom'` \| `'left'` | `'bottom'` | Side of the target element the popover is placed on. Auto-flips to the opposite side when it doesn't fit the viewport |
| align | `'start'` \| `'center'` \| `'end'` | `'start'` | `'start'` lines its leading edge up with the element, `'center'` centers it, `'end'` lines up the trailing edges |
| showButtons | AllowedButtons[] | inherited | Buttons to show |
| disableButtons | AllowedButtons[] | inherited | Buttons to disable |
| nextBtnText | string | inherited | Next button text |
| prevBtnText | string | inherited | Previous button text |
| doneBtnText | string | inherited | Done button text |
| closeBtnLabel | string | `'Close'` | Screen reader label of the close button |
| showProgress | boolean | inherited | Show progress |
| progressText | string | inherited | Progress text template |
| popoverClass | string | inherited | Custom CSS class |
| onPopoverRender | (popover: PopoverDOM, opts: { config, state, driver, index }) => void | inherited | Render callback |
| onNextClick | function | inherited | Next click callback |
| onPrevClick | function | inherited | Previous click callback |
| onCloseClick | function | inherited | Close click callback |
| onDoneClick | function | inherited | Runs instead of `onNextClick` when the done button (next button on the last step) is clicked |

## DriveStep Type

Each entry in the `steps` array has the following shape:

| Option | Type | Description |
|--------|------|-------------|
| element | Element \| string \| (() => Element) | Target element — DOM element, CSS selector, or function returning element |
| popover | Popover | Step popover configuration |
| disableActiveInteraction | boolean | Disable interaction with highlighted element |
| advanceOnClick | boolean | Advance the tour when this step's highlighted element is clicked. Overrides the driver-level option (default false) |
| skipMissingElement | boolean | Skip this step when its target element is specified but missing from the DOM. Overrides the driver-level option (default false) |
| waitForElement | number | Wait up to this many ms for this step's element to appear. Overrides the driver-level option (default 0, off) |
| data | Record<string, any> | Arbitrary data for custom per-step logic in hooks (1.6.0) |
| onHighlightStarted | DriverHook | Callback before highlighting (options gain `index`) |
| onHighlighted | DriverHook | Callback after highlighting (options gain `index`) |
| onDeselected | DriverHook | Callback when step is deselected (options gain `index` and `reason?`, set only when the tour is destroyed) |

```javascript
const steps = [
  {
    element: '#my-element',
    popover: {
      title: 'Feature',
      description: 'This is a feature.',
      side: 'bottom',
      align: 'start',
    },
  },
  {
    element: () => document.querySelector('.dynamic-el'),
    popover: { title: 'Dynamic', description: 'Resolved at runtime.' },
    onHighlighted: (element, step, { config, state, driver }) => {
      console.log('Highlighted:', element);
    },
  },
];
```

Omitting `element` displays the popover as a centered modal without highlighting any element.

## State Type

The `state` object passed to hooks and available via `getState()`:

```typescript
type State = {
  isInitialized?: boolean;
  activeIndex?: number;
  activeElement?: Element;
  activeStep?: DriveStep;
  previousElement?: Element;
  previousStep?: DriveStep;
  popover?: PopoverDOM;
};
```

## Notes

- Configuration, steps and state belong to the specific `driver()` instance you set them on (1.7.0). Each call to `driver()` is independent, so several instances can coexist and configuring one never affects another. Only one instance is shown at a time: driving or highlighting with one closes any other active instance (1.9.0).
- The driver-level `disableButtons` now applies to tour steps (1.9.0); it used to be ignored during a tour. A step's own `disableButtons` still replaces it.
- Popover `side` no longer includes `'over'`: the 1.10.1 `Side` type is `"top" | "right" | "bottom" | "left"`. The changelog does not mention its removal; the removal version (reported as 1.6.0) was not re-verified against the 1.5.0 / 1.6.0 sources.
- Naming discrepancy: the 1.6.0 changelog entry calls the option `animationDuration`, but the config key in the docs and in `context.ts` is `duration` (default 400). This page uses `duration`.

## Related

- [Methods](./methods.md)
- [Theming](./theming.md)
