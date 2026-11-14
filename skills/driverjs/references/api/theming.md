# Theming

Driver.js is styled with plain CSS. Override its classes, set its CSS variables, or change the popover's DOM in a hook. All popover and overlay elements use stable CSS class names that can be targeted directly or scoped via the `popoverClass` option.

## Signature / Usage

```javascript
const driverObj = driver({ popoverClass: 'my-theme', steps: [/* ... */] });
```

```css
.my-theme .driver-popover-title { color: #1a73e8; }
```

## CSS Classes

| Class | Description |
|-------|-------------|
| `.driver-popover` | Main popover wrapper |
| `.driver-popover-arrow` | Arrow element pointing to the highlighted element |
| `.driver-popover-arrow-side-{top,right,bottom,left}` | Arrow, named after the popover's side. The arrow is a border, so color it with one rule per side (`border-<side>-color`) |
| `.driver-popover-arrow-none` | Arrow hidden: popover centered or over |
| `.driver-popover-title` | Title text |
| `.driver-popover-description` | Description text |
| `.driver-popover-close-btn` | Close button, top right |
| `.driver-popover-footer` | Footer area containing buttons and progress |
| `.driver-popover-navigation-btns` | Holds the buttons (the `footerButtons` element) |
| `.driver-popover-progress-text` | Progress text (e.g., "1 of 5") |
| `.driver-popover-prev-btn` | Previous button |
| `.driver-popover-next-btn` | Next button |
| `.driver-popover-side-{top,right,bottom,left}` | Rendered side of the popover. Reflects the actual position after Driver.js flips the popover to fit the viewport, so it may differ from the configured `side` (1.6.0) |
| `.driver-popover-align-{start,center,end}` | Rendered alignment of the popover, same flipping caveat (1.6.0) |
| `.driver-popover-footer-btn` | Shared style for footer buttons. Built-in prev/next carry it; add it to custom buttons created in `onPopoverRender` for the default look (1.6.0) |
| `.driver-popover-done-btn` | Next button on the last step, when it acts as the "Done" button (1.5.0); selector form `.driver-popover-next-btn.driver-popover-done-btn` |
| `.driver-popover-btn-disabled` | On a disabled button |
| `.driver-popover-has-instruction` | On the popover of an action step (1.12.0) |
| `.driver-popover-instruction` | The instruction row of an action step (1.12.0) |
| `.driver-popover-instruction-text` | The instruction row's text (1.12.0) |
| `.driver-popover-instruction-indicator` | The dot at the end of the instruction row; a check mark once done (1.12.0) |
| `.driver-popover-instruction-done` | On the popover while it pauses for `advanceDelay` (1.12.0) |
| `.driver-popover-btn-disabled[aria-disabled]` | Next, while the step waits for the user (1.12.0) |
| `.driver-popover-feedback` | The line shown by `nudge("...")` (1.12.0) |
| `.driver-popover-waiting` | On the popover while it waits for an element (1.11.0) |
| `.driver-popover-nudge` | On the popover while `nudge()` shakes it (1.11.0) |
| `.driver-active` | Added to `<body>` when driver is active |
| `.driver-fade` | Added to `<body>` when animated mode is active |
| `.driver-simple` | Added to `<body>` when non-animated mode is active |
| `.driver-no-scroll` | Added to `<body>` with `allowScroll: false` |
| `.driver-overlay` | Overlay element covering the page, an `<svg>` |
| `.driver-active-element` | Added to the currently highlighted element |
| `.driver-allowed-element` | Added to each of the `allowedElements` |
| `.driver-active-element-raised` | The highlighted element inside an allowed element |
| `.driver-no-interaction` | With `disableActiveInteraction: true` |
| `.driver-active-element-parent` | The highlighted element's parent; if it scrolls, `.driver-active-element-parent-no-scroll` is added too, which stops it scrolling during the step |

The popover also has the id `driver-popover-content`, which the highlighted element's `aria-controls` points to. Classes not listed here, like the ones driver.js uses to position layers or announce steps to screen readers, are internal and may change.

Animations use these keyframes, so you can swap one by setting `animation` on the class that runs it: `driver-nudge-shake` on `.driver-popover-nudge`, `driver-nudge-flash` in its place with reduced motion, and `driver-instruction-pulse` on `.driver-popover-instruction-indicator`.

### Popover Theme Example

```css
.driver-popover.driverjs-theme {
  background-color: #fde047;
  color: #000;
}

.driver-popover.driverjs-theme .driver-popover-title {
  font-size: 20px;
}
```

### CSS Variables

Set them on `:root`, or on your `popoverClass` to scope them.

```css
:root {
  /* Font of the popover, and of checklists */
  --driver-popover-font-family: "Inter", sans-serif;

  /* Action steps: the instruction row */
  --driver-instruction-background: #f2f2f2;
  --driver-instruction-color: inherit;
  --driver-instruction-padding: 8px 10px;
  --driver-instruction-radius: 4px;

  /* Action steps: the dot at the end of the row, and the disabled Next */
  --driver-instruction-indicator-color: #f59e0b;
  --driver-instruction-indicator-size: 8px;
  --driver-instruction-next-color: #a3a3a3;

  /* Action steps: the done state, for the row, the check mark and Next */
  --driver-instruction-done-background: #dcfce7;
  --driver-instruction-done-color: #15803d;

  /* The line shown by nudge("...") */
  --driver-feedback-color: #b45309;

  /* The shake of nudge(), and the flash shown with reduced motion */
  --driver-nudge-distance: 6px;
  --driver-nudge-duration: 500ms;
  --driver-nudge-color: #f59e0b;

  /* Read-only: set from the duration option while a tour runs, for
     your own transitions to match */
  --driver-animation-duration: 400ms;

  /* Stacking of allowedElements above the overlay */
  --driver-allowed-z-index: 10001;

  /* The highlighted element inside an allowed element, like an item in an
     open menu: a ring and a tint instead of the cutout */
  --driver-raised-highlight-color: #2563eb;
  --driver-raised-highlight-width: 2px;
  --driver-raised-highlight-offset: -2px;
  --driver-raised-highlight-background: rgb(37 99 235 / 0.1);
}
```

The values above are the defaults, except the font.

### Action Steps

An action step (a step with `popover.instruction`, 1.12.0) shows an instruction row that ends in a pulsing dot, and a Next button that looks disabled until the user has done it. While the step pauses for `advanceDelay` the dot becomes a check mark and the row and Next turn green. The dot and the check are drawn in CSS, don't animate with `prefers-reduced-motion`, and are hidden from screen readers. The variables cover the colors and sizes, and the classes the rest.

```css
.my-theme {
  --driver-instruction-background: #eef2ff;
  --driver-instruction-color: #3730a3;
  --driver-instruction-radius: 999px;
  --driver-instruction-padding: 8px 14px;
  --driver-instruction-indicator-color: #6366f1;
  --driver-instruction-indicator-size: 10px;
  --driver-instruction-done-background: #dcfce7;
  --driver-instruction-done-color: #166534;
}

.my-theme.driver-popover-instruction-done .driver-popover-instruction {
  font-weight: 600;
}
```

To drop the dot and the check, hide the indicator. To change the row altogether, replace the content of `popover.instruction` in `onPopoverRender`; driver.js leaves it alone from then on. `popover.instructionIndicator` is the dot itself.

```css
.driver-popover-instruction-indicator {
  display: none;
}
```

### Overlay

`overlayColor` takes any CSS color and `overlayOpacity` a number from 0 to 1. The defaults are `"#000"` and `0.7`. `stagePadding` and `stageRadius` set the size and corner radius of the cutout around the element.

```javascript
const driverObj = driver({
  overlayColor: "red",
  overlayOpacity: 0.3,
});

driverObj.highlight({
  popover: { title: "A red overlay", description: "Any CSS color works." },
});
```

## Using popoverClass

Apply a custom CSS class to scope styles to specific driver instances or steps:

```javascript
// Driver-level — applies to all steps
const driverObj = driver({
  popoverClass: 'my-theme',
  steps: [/* ... */],
});

// Step-level — applies to a single step
const driverObj = driver({
  steps: [
    {
      element: '#step1',
      popover: {
        title: 'Styled Step',
        description: 'This step has a custom theme.',
        popoverClass: 'step-theme',
      },
    },
  ],
});
```

```css
.my-theme .driver-popover-title {
  color: #1a73e8;
}

.my-theme .driver-popover-description {
  font-size: 14px;
}
```

## Custom Font

The popover text uses the following font stack by default:

```css
"Helvetica Neue", Inter, ui-sans-serif, "Apple Color Emoji", Helvetica, Arial, sans-serif;
```

To use your own font, override the `--driver-popover-font-family` CSS variable (1.7.0). It's inherited, so you can set it anywhere above the popover (on `:root`, `body`, or a `popoverClass`) and it applies to the title, description, buttons, and progress text at once. Checklists read the same variable.

```css
:root {
  --driver-popover-font-family: "Inter", sans-serif;
}
```

## Using onPopoverRender

For advanced customization, use the `onPopoverRender` callback to directly manipulate the popover DOM before it shows: add, move or change anything. The callback receives a `PopoverDOM` object:

| Property | Description |
|----------|-------------|
| `wrapper` | The popover wrapper element |
| `arrow` | The arrow element |
| `title` | The title element |
| `description` | The description element |
| `footer` | The footer element |
| `progress` | The progress text element |
| `previousButton` | The previous button element |
| `nextButton` | The next button element |
| `closeButton` | The close button element |
| `footerButtons` | The container wrapping the navigation buttons |
| `instruction` | Only on steps with `popover.instruction` (1.12.0): the instruction row |
| `instructionIndicator` | Only on steps with `popover.instruction` (1.12.0): the indicator at the end of the row |
| `feedback` | Only after `nudge("...")` showed a message (1.12.0) |

```javascript
const driverObj = driver({
  onPopoverRender: (popover, { config, state, driver }) => {
    // Add a custom button to the footer
    const customBtn = document.createElement('button');
    customBtn.innerText = 'Skip Tour';
    customBtn.addEventListener('click', () => driver.destroy());
    popover.footerButtons.appendChild(customBtn);
  },
});
```

## Styling Hints

Hint popovers are regular popovers with an extra `driver-hint-popover` class, so everything above applies to them unchanged. The beacons read these variables, set on `.driver-hint` or on a class you pass as `beacon.className`. The values are the defaults:

```css
.driver-hint {
  --driver-hint-size: 24px;
  --driver-hint-color: #818cf8;
  --driver-hint-animation-duration: 2s; /* One pulse */
}
```

```css
.driver-hint {}          /* The beacon, a <button> */
.driver-hint-dot {}      /* Its dot */
.driver-hint-pulse {}    /* The pulsing ring (driver-hint-pulse) */
.driver-hint-hidden {}   /* While its element is scrolled out of view */
.driver-hint-popover {}  /* On the popover, next to .driver-popover */
.driver-hint-overlay {}  /* The dimmed page, with overlay: true */
```

See the hints category: [Hints](../hints/README.md).

## Styling Checklists

The checklist widget has its own stylesheet and classes. Set `--driver-checklist-color` to recolor the progress bar, the ticks and the focus rings, or pass `className` to the checklist and style its parts:

```js
checklist({
  id: "onboarding",
  className: "my-checklist",
  items,
});
```

```css
/* Accent color, globally or scoped to your class */
.my-checklist {
  --driver-checklist-color: #16a34a;
}
```

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

The widget also reads these variables. The `offset` option sets them for you:

```css
.driver-checklist {
  /* Distance from the screen edges. Defaults: 20px, 12px on phones */
  --driver-checklist-offset-x: 20px;
  --driver-checklist-offset-y: 20px;
}
```

The panel opens with the `driver-checklist-in` keyframes, or `driver-checklist-in-down` at the top corners. The widget sets `--driver-checklist-progress` to the progress as a percentage, for progress drawn in CSS, and its font follows `--driver-popover-font-family`.

See the checklists category: [Checklists](../checklists/README.md).

## Notes

- Breaking (1.6.0): popover footer buttons are styled through the `driver-popover-footer-btn` class instead of the `.driver-popover-footer button` selector. Buttons added via `onPopoverRender` no longer inherit the default style; add the `driver-popover-footer-btn` class to opt in, or leave it off to apply your own styles.
- The close button darkens only on `:focus-visible` (1.10.0), so it no longer opens dark after a tour is started with a mouse click.
- Since 1.10.2, the popover title and footer are `div`s instead of `header` and `footer` landmarks, so selectors that target `header` / `footer` elements inside the popover no longer match; use `.driver-popover-title` and `.driver-popover-footer`.
- Since 1.12.1, your CSS can hide or restyle popover parts without `!important`.
- The action-step members of `PopoverDOM` and the instruction / feedback / nudge CSS variables and classes arrived with 1.11.0 and 1.12.0 (marked per row above); older versions do not have them.
- For practical styling examples with full CSS snippets, see [Styling Examples](../examples/styling.md)
- Always import `driver.js/dist/driver.css` as the base stylesheet before applying custom themes
- The `popoverClass` approach is preferred for simple styling; `onPopoverRender` is for DOM-level customization
- Step-level `popoverClass` overrides the driver-level value (it does not merge)
- Source: https://driverjs.com/docs/theming (driver.js 1.14.0 docs source, apps/docs/src/content/guides/theming.mdx at tag 1.14.0).

### Popover Position and Buttons

From the Popover guide: `side` picks the side of the element the popover sits on (`"top"`, `"right"`, `"bottom"` (default) or `"left"`), and `align` places it along that side (`"start"` (default), `"center"` or `"end"`). When the popover doesn't fit on that side, it moves to one where it does. `showButtons` picks the buttons (`"next"`, `"previous"` and `"close"`; a tour shows all three by default); `disableButtons` takes the same values and shows the button greyed out.

Adapted (not in the official docs): the snippet below condenses several examples from the Popover guide into one minimal example.

```javascript
const driverObj = driver({
  showButtons: ["next", "previous"],
  steps: [
    { element: "#search", popover: { title: "Search", side: "left", align: "start" } },
    { element: "#export", popover: { title: "Export" } },
  ],
});
```

- The arrow keys follow the buttons: they do nothing when their button is hidden or disabled. Escape does nothing when the close button is disabled.
- `highlight()` shows no buttons by default. Outside a tour, Next and Previous only do something if you set `onNextClick` and `onPrevClick`.
- A step with `popover.instruction` (1.12.0) keeps the Next button but shows it disabled until the user has done it.
- `nextBtnText`, `prevBtnText` and `doneBtnText` set the button text (HTML allowed); `closeBtnLabel` sets the screen reader label of the close button.
- `onNextClick`, `onPrevClick`, `onCloseClick` and `onDoneClick` run instead of the button's default action; the tour only moves or ends when you call `moveNext()`, `movePrevious()` or `destroy()`. `onDoneClick` runs on the last step instead of `onNextClick`. `onNextClick` also runs when the step is completed another way: the right arrow key, an overlay click with `overlayClickBehavior: "nextStep"`, `advanceOn` or `advance()`.
- Source: https://driverjs.com/docs/popover (driver.js 1.14.0 docs source, apps/docs/src/content/guides/popover.mdx at tag 1.14.0).
- Adapted from the official docs: the Popover guide's separate examples are combined into one minimal snippet.

## Related

- [Configuration](./configuration.md)
- [Methods](./methods.md)
