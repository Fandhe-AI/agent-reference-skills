# Configuration

Driver.js accepts a configuration object when creating a driver instance. Options can be set at the driver level (global) and overridden at the step level.

## Config Type (Driver-Level Options)

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

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| steps | DriveStep[] | undefined | Array of tour steps |
| animate | boolean | true | Whether to animate transitions |
| overlayColor | string | `'black'` | Backdrop overlay color |
| smoothScroll | boolean | false | Smooth scroll to highlighted element |
| allowClose | boolean | true | Allow closing via backdrop click |
| overlayOpacity | number | 0.5 | Opacity of backdrop |
| overlayClickBehavior | `'close'` \| `'nextStep'` \| ((e: Event) => void) | `'close'` | Action on backdrop click |
| stagePadding | number | 10 | Distance between element and cutout (px) |
| stageRadius | number | 5 | Border radius of cutout (px) |
| allowKeyboardControl | boolean | true | Enable keyboard navigation |
| disableActiveInteraction | boolean | false | Prevent interaction with highlighted element |
| popoverClass | string | undefined | Custom CSS class for popover |
| popoverOffset | number | 10 | Distance between popover and element (px) |
| showButtons | AllowedButtons[] | `['next','previous','close']` (tours); `[]` (highlight) | Buttons to show |
| disableButtons | AllowedButtons[] | undefined | Buttons to disable |
| showProgress | boolean | false | Show progress text |
| progressText | string | `'{{current}} of {{total}}'` | Progress text template |
| nextBtnText | string | undefined | Custom next button text |
| prevBtnText | string | undefined | Custom previous button text |
| doneBtnText | string | undefined | Custom done button text (last step) |

## Driver Hooks / Callbacks

Hooks can be set at the driver level (apply to all steps) or at the step level (override driver-level).

| Hook | Parameters | Description |
|------|------------|-------------|
| onPopoverRender | (popover: PopoverDOM, options: { config, state }) | Called after popover is rendered |
| onHighlightStarted | (element, step, options: { config, state }) | Called before element is highlighted |
| onHighlighted | (element, step, options: { config, state }) | Called after element is highlighted |
| onDeselected | (element, step, options: { config, state }) | Called when element is deselected |
| onDestroyStarted | (element, step, options: { config, state }) | Called before driver is destroyed |
| onDestroyed | (element, step, options: { config, state }) | Called after driver is destroyed |
| onNextClick | (element, step, options: { config, state }) | Called on next button click |
| onPrevClick | (element, step, options: { config, state }) | Called on previous button click |
| onCloseClick | (element, step, options: { config, state }) | Called on close button click |

When overriding `onNextClick` or `onPrevClick`, automatic navigation is disabled. You must manually call `driverObj.moveNext()` or `driverObj.movePrevious()` to advance:

```javascript
const driverObj = driver({
  onNextClick: (element, step, { config, state }) => {
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
| side | `'top'` \| `'right'` \| `'bottom'` \| `'left'` | auto | Preferred side relative to element |
| align | `'start'` \| `'center'` \| `'end'` | auto | Alignment relative to element |
| showButtons | AllowedButtons[] | inherited | Buttons to show |
| disableButtons | AllowedButtons[] | inherited | Buttons to disable |
| nextBtnText | string | inherited | Next button text |
| prevBtnText | string | inherited | Previous button text |
| doneBtnText | string | inherited | Done button text |
| showProgress | boolean | inherited | Show progress |
| progressText | string | inherited | Progress text template |
| popoverClass | string | inherited | Custom CSS class |
| onPopoverRender | function | inherited | Render callback |
| onNextClick | function | inherited | Next click callback |
| onPrevClick | function | inherited | Previous click callback |
| onCloseClick | function | inherited | Close click callback |

## DriveStep Type

Each entry in the `steps` array has the following shape:

| Option | Type | Description |
|--------|------|-------------|
| element | Element \| string \| (() => Element) | Target element — DOM element, CSS selector, or function returning element |
| popover | Popover | Step popover configuration |
| disableActiveInteraction | boolean | Disable interaction with highlighted element |
| onDeselected | function | Callback when step is deselected |
| onHighlightStarted | function | Callback before highlighting |
| onHighlighted | function | Callback after highlighting |

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
    onHighlighted: (element, step, options) => {
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

## Related

- [Methods](./methods.md)
- [Theming](./theming.md)
