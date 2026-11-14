# Styling

Customizing the appearance of popovers and overlays in Driver.js.

## Signature / Usage

### Popover Styling with CSS

Give the popover your own class with `popoverClass`, then style it. Set it on the driver for every popover, or on a step's `popover` for one. For the complete list of CSS class names and variables, see [Theming](../api/theming.md).

```js
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  popoverClass: "driverjs-theme",
  steps: [
    // ...
  ],
});

driverObj.drive();
```

```css
.driver-popover.driverjs-theme {
  background-color: #fde047;
  color: #000;
}

.driver-popover.driverjs-theme .driver-popover-title {
  font-size: 20px;
}

.driver-popover.driverjs-theme .driver-popover-title,
.driver-popover.driverjs-theme .driver-popover-description,
.driver-popover.driverjs-theme .driver-popover-progress-text {
  color: #000;
}

.driver-popover.driverjs-theme button:not(.driver-popover-close-btn) {
  flex: 1;
  text-align: center;
  background-color: #000;
  color: #fff;
  border: 2px solid #000;
  text-shadow: none;
  font-size: 14px;
  padding: 5px 8px;
  border-radius: 6px;
}

.driver-popover.driverjs-theme .driver-popover-navigation-btns {
  justify-content: space-between;
  gap: 3px;
}

.driver-popover.driverjs-theme .driver-popover-close-btn {
  color: #9b9b9b;
}

.driver-popover.driverjs-theme .driver-popover-close-btn:hover {
  color: #000;
}

/* The arrow is a border, one rule per side */
.driver-popover.driverjs-theme .driver-popover-arrow-side-left {
  border-left-color: #fde047;
}

.driver-popover.driverjs-theme .driver-popover-arrow-side-right {
  border-right-color: #fde047;
}

.driver-popover.driverjs-theme .driver-popover-arrow-side-top {
  border-top-color: #fde047;
}

.driver-popover.driverjs-theme .driver-popover-arrow-side-bottom {
  border-bottom-color: #fde047;
}
```

### Popover Classes

```css
.driver-popover {}                 /* The popover */
.driver-popover-arrow {}           /* The arrow pointing at the element */
.driver-popover-arrow-side-top {}  /* Named after the popover's side */
.driver-popover-arrow-none {}      /* Hidden: popover centered or over */
.driver-popover-title {}
.driver-popover-description {}
.driver-popover-close-btn {}       /* The close button, top right */

.driver-popover-footer {}          /* Progress text and buttons */
.driver-popover-progress-text {}
.driver-popover-navigation-btns {} /* Holds the buttons */
.driver-popover-footer-btn {}      /* Button look. Add it to yours too */
.driver-popover-prev-btn {}
.driver-popover-next-btn {}
.driver-popover-done-btn {}        /* Next, on the last step */
.driver-popover-btn-disabled {}    /* On a disabled button */

/* Where the popover ended up, after flipping to fit the screen */
.driver-popover-side-top {}        /* or -right, -bottom, -left */
.driver-popover-align-start {}     /* or -center, -end */

/* Action steps */
.driver-popover-has-instruction {} /* On the popover of an action step */
.driver-popover-instruction {}     /* The instruction row */
.driver-popover-instruction-text {} /* Its text */

/* The dot at its end; a check mark once done */
.driver-popover-instruction-indicator {}

/* On the popover while it pauses for advanceDelay */
.driver-popover-instruction-done {}

/* Next, while the step waits for the user */
.driver-popover-btn-disabled[aria-disabled] {}

.driver-popover-feedback {}        /* The line shown by nudge("...") */

/* States */
.driver-popover-waiting {}         /* While it waits for an element */
.driver-popover-nudge {}           /* While nudge() shakes it */
```

The popover also has the id `driver-popover-content`, which the highlighted element's `aria-controls` points to.

Animations use these keyframes, so you can swap one by setting `animation` on the class that runs it: `driver-nudge-shake` on `.driver-popover-nudge`, `driver-nudge-flash` in its place with reduced motion, and `driver-instruction-pulse` on `.driver-popover-instruction-indicator`.

### Popover Styling with onPopoverRender

`onPopoverRender` gets the popover's elements before it shows. Add, move or change anything. The official Custom Buttons page has a live example.

```typescript
type PopoverDOM = {
  wrapper: HTMLElement;
  arrow: HTMLElement;
  title: HTMLElement;
  description: HTMLElement;
  footer: HTMLElement;
  progress: HTMLElement;
  previousButton: HTMLButtonElement;
  nextButton: HTMLButtonElement;
  closeButton: HTMLButtonElement;
  footerButtons: HTMLElement;

  // Only on steps with popover.instruction: the row, and the indicator at
  // its end.
  instruction?: HTMLElement;
  instructionIndicator?: HTMLElement;

  // Only after nudge("...") showed a message
  feedback?: HTMLElement;
};
```

```js
const driverObj = driver({
  onPopoverRender: popover => {
    const link = document.createElement("a");
    link.href = "/help/tours";
    link.textContent = "Learn more";
    popover.description.append(" ", link);
  },
});
```

### Overlay

`overlayColor` takes any CSS color and `overlayOpacity` a number from 0 to 1. The defaults are `"#000"` and `0.7`.

```js
const driverObj = driver({
  overlayColor: "red",
  overlayOpacity: 0.3,
});

driverObj.highlight({
  popover: { title: "A red overlay", description: "Any CSS color works." },
});
```

`stagePadding` and `stageRadius` set the size and corner radius of the cutout around the element.

### Checklist

Checklists are styled with plain CSS: an accent color for the quick win, or your own class for a full theme.

#### Accent Color

Set the `--driver-checklist-color` variable to recolor the progress bar, the ticks and the focus rings while keeping the default look:

```css
:root {
  --driver-checklist-color: #16a34a;
}
```

#### Custom Theme

Pass `className` to add your own class to the widget, then style its parts:

```js
checklist({
  id: "onboarding",
  className: "checklist-brutalist",
  items,
});
```

#### Class Names

```css
.driver-checklist {}                  /* The widget, in a corner */
.driver-checklist-bottom-right {}     /* or -bottom-left, -top-right… */
.driver-checklist-no-launcher {}      /* With launcher: false */
.driver-checklist-complete {}         /* Added once every item is done */

.driver-checklist-launcher {}         /* The button that opens the panel */
.driver-checklist-launcher-text {}
.driver-checklist-launcher-count {}   /* "1/4" */

.driver-checklist-panel {}
.driver-checklist-header {}
.driver-checklist-title {}
.driver-checklist-description {}
.driver-checklist-close-btn {}

.driver-checklist-progress {}
.driver-checklist-progress-bar {}
.driver-checklist-progress-fill {}
.driver-checklist-progress-text {}    /* "1 of 4" */

.driver-checklist-items {}
.driver-checklist-item {}
.driver-checklist-item-done {}        /* Once the item is done */
.driver-checklist-check {}            /* The circle */
.driver-checklist-item-trigger {}     /* Its link, button or row */
.driver-checklist-item-title {}
.driver-checklist-item-description {}
```

The widget also reads these variables:

```css
.driver-checklist {
  /* Distance from the screen edges. Defaults: 20px, 12px on phones */
  --driver-checklist-offset-x: 20px;
  --driver-checklist-offset-y: 20px;
}
```

The `offset` option sets them for you. The panel opens with the `driver-checklist-in` keyframes, or `driver-checklist-in-down` at the top corners.

It sets `--driver-checklist-progress` to the progress as a percentage, for progress drawn in CSS like the progress ring (see Checklist themes). The font follows `--driver-popover-font-family`.

## Notes

- Since 1.14.0 the styling content lives on the official Theming page (`/docs/theming`, groups "Popover", "Overlay", "Checklist"); the 1.10.1 page used a `my-theme` class, which is replaced here by the official `driverjs-theme` CSS verbatim.
- Overlay defaults are `"#000"` and `0.7` on the 1.14.0 Theming page; the 1.10.1 docs said `0.5` (see the Notes of the configuration reference for the discrepancy).
- Since 1.6.0, buttons added in `onPopoverRender` no longer inherit the default button style. Add the `driver-popover-footer-btn` class to opt in, or leave it off to apply your own styles.
- Since 1.10.2 the popover title and footer are `div`s instead of `header` and `footer` landmarks; selectors should use the `driver-popover-title` and `driver-popover-footer` classes. `instruction` / `instructionIndicator` / `feedback` in `PopoverDOM` and the instruction classes exist since 1.12.0.
- Source: https://driverjs.com/docs/theming (driver.js 1.14.0 docs source, apps/docs/src/content/guides/theming.mdx at tag 1.14.0).

## Related

- [Theming](../api/theming.md)
- [Configuration](../api/configuration.md)
- [Checklist themes](../checklists/themes.md)
