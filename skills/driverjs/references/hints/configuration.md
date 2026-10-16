# Hints Configuration

Options passed to the `hints()` factory from the `driver.js/hints` entry, and the shape of each hint in the `hints` array.

## Signature / Usage

```typescript
type HintsConfig = {
  // Array of hints to show. See the Hint
  // Configuration section below for the format.
  hints?: DriverHint[];

  // Beacon defaults applied to every hint;
  // a hint's own beacon values win.
  beacon?: HintBeacon;

  // Text of the dismiss button. (default: "Got it")
  buttonText?: string;

  // Custom class and offset for the hint popovers,
  // same meaning as in tours.
  popoverClass?: string;
  popoverOffset?: number;

  // Dim the page while a hint is open, with the hint's
  // element cut out like a tour step. The popover then
  // anchors to the element instead of the beacon, the
  // open hint's beacon steps aside, and the other
  // beacons wait under the dim. Clicking the dimmed
  // page closes the hint. (default: false)
  overlay?: boolean;
  // Color and opacity of the dim. (defaults: "#000" and 0.7)
  overlayColor?: string;
  overlayOpacity?: number;

  // Called when a hint popover is opened, and when a
  // hint is dismissed (via the button or `dismiss()`).
  onOpen?: (element: Element, hint: DriverHint, options: { config: HintsConfig; hints: Hints }) => void;
  onDismiss?: (element: Element, hint: DriverHint, options: { config: HintsConfig; hints: Hints }) => void;

  // Runs instead of dismissing when the built-in button is clicked,
  // like a tour's onNextClick takes over the default advance. Call
  // options.hints.dismiss(hint.id) yourself to also remove the hint.
  // Can be configured per hint as well.
  onButtonClick?: (element: Element, hint: DriverHint, options: { config: HintsConfig; hints: Hints }) => void;
};
```

## Options / Props

### HintsConfig

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| hints | DriverHint[] | — | Array of hints to show |
| beacon | HintBeacon | — | Beacon defaults for every hint; a hint's own values win |
| buttonText | string | "Got it" | Text of the dismiss button |
| popoverClass | string | — | Custom class for hint popovers |
| popoverOffset | number | — | Popover offset, same meaning as in tours |
| overlay | boolean | false | Dim the page while a hint is open |
| overlayColor | string | "#000" | Color of the dim |
| overlayOpacity | number | 0.7 | Opacity of the dim |
| onOpen | function | — | Called when a hint popover is opened |
| onDismiss | function | — | Called when a hint is dismissed (button or `dismiss()`) |
| onButtonClick | function | — | Runs instead of dismissing when the button is clicked |

Hook parameters: `element` (the hint's target DOM element), `hint` (the hint object), `options.config` (the hints configuration), `options.hints` (the hints instance).

## Hint Configuration

Each entry of the `hints` array describes one hint: the element it points at, the beacon that sits on it, and the popover that opens on click.

```typescript
type DriverHint = {
  // The element the hint points at. A DOM element, a function
  // returning one, or a CSS selector. A hint whose element is
  // missing is skipped, and picked up on the next show() if the
  // element has appeared since.
  element: Element | string | (() => Element);

  // Stable identity used by open/dismiss/restore and passed to
  // the hooks; useful for persisting dismissals.
  // Defaults to the hint's index.
  id?: string;

  // Where the beacon sits on the element's box, and how it looks.
  beacon?: {
    side?: "top" | "right" | "bottom" | "left"; // (default: "top")
    align?: "start" | "center" | "end"; // (default: "end")
    offsetX?: number; // pixels, positive right (default: 0)
    offsetY?: number; // pixels, positive down (default: 0)
    animate?: boolean; // (default: true)
    className?: string;
  };

  // The popover that opens when the beacon is clicked.
  // Rendered exactly like a tour popover.
  popover?: {
    title?: string;
    description?: string;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    popoverClass?: string;
    showButton?: boolean; // (default: true)
    buttonText?: string; // overrides instance-level buttonText
    onButtonClick?: (element: Element, hint: DriverHint, options: { config: HintsConfig; hints: Hints }) => void;
    onPopoverRender?: (popover: PopoverDOM, options: { hint: DriverHint; hints: Hints }) => void;
  };

  // Hint-level hooks, taking precedence over the instance-level ones.
  onOpen?: (element: Element, hint: DriverHint, options: { config: HintsConfig; hints: Hints }) => void;
  onDismiss?: (element: Element, hint: DriverHint, options: { config: HintsConfig; hints: Hints }) => void;

  // Arbitrary data to carry along, available wherever the hint object is.
  data?: Record<string, any>;
};
```

### DriverHint

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| element | Element \| string \| (() => Element) | — | Target element, selector, or function returning one |
| id | string | hint's index | Stable identity for open/dismiss/restore and hooks |
| beacon | object | — | Beacon placement and look (`side`, `align`, `offsetX`, `offsetY`, `animate`, `className`) |
| popover | object | — | Popover content and button settings |
| onOpen | function | — | Hint-level hook, takes precedence over the instance-level one |
| onDismiss | function | — | Hint-level hook, takes precedence over the instance-level one |
| data | Record<string, any> | — | Arbitrary data carried with the hint |

## Notes

- The `beacon` defaults in `HintsConfig` are overridden by a hint's own `beacon` values.
- `popover.buttonText` and `popover.onButtonClick` override the instance-level `buttonText` and `onButtonClick`.
- Source: driver.js 1.10.1 docs (https://driverjs.com/docs/configuration#hints-configuration).

## Related

- [Feature Hints](./overview.md)
- [Hints Methods](./methods.md)
- [Styling Hints](./styling.md)
