# Highlight & Popover

Popover positioning, button customization, and single-element highlight patterns.

## Signature / Usage

### Popover Position

Every step and highlight can show a popover next to its element. `side` picks the side of the element the popover sits on: `"top"`, `"right"`, `"bottom"` (default) or `"left"`. `align` places it along that side: `"start"` (default), `"center"` or `"end"`.

```js
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver();

driverObj.highlight({
  element: "#sample-box",
  popover: {
    title: "Left Start",
    description: "On the left, aligned with the top edge.",
    side: "left",
    align: "start",
  },
});
```

When the popover doesn't fit on that side, it moves to one where it does.

| side | align | Position |
|------|-------|----------|
| left | start / center / end | Left side, top / center / bottom aligned |
| right | start / center / end | Right side, top / center / bottom aligned |
| top | start / center / end | Top side, left / center / right aligned |
| bottom | start / center / end | Bottom side, left / center / right aligned |

### Popover Buttons

`showButtons` picks the buttons: `"next"`, `"previous"` and `"close"`. A tour shows all three by default. Set it on the driver for every step, or on a step's `popover`.

```js
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  showButtons: ["next", "previous"],
  steps: [
    { element: "#search", popover: { title: "Search" } },
    { element: "#export", popover: { title: "Export" } },
  ],
});

driverObj.drive();
```

- `disableButtons` takes the same values and shows the button greyed out. Previous is disabled on the first step.
- The arrow keys follow the buttons: they do nothing when their button is hidden or disabled. Escape does nothing when the close button is disabled.
- `highlight()` shows no buttons by default. Outside a tour, Next and Previous only do something if you set `onNextClick` and `onPrevClick`.
- A step with [`popover.instruction`](./action-driven-tours.md) keeps the Next button but shows it disabled until the user has done it.

An empty list hides every button (since 1.11.0 for the driver config); combine it with `advanceOn` (since 1.11.0) so a click on the highlighted element moves the tour on.

Adapted (not in the official docs): the official "No Buttons, Click to Advance" demo only lists its config; the code below is that config written as a minimal driver call.

```js
const driverObj = driver({
  showButtons: [],
  advanceOn: "click",
  steps: [
    // ...
  ],
});
```

### Change Button Text

`nextBtnText`, `prevBtnText` and `doneBtnText` set the button text, and HTML is allowed. `closeBtnLabel` sets the screen reader label of the close button.

```js
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  nextBtnText: "Next &rarr;",
  prevBtnText: "&larr; Back",
  doneBtnText: "Finish",
  closeBtnLabel: "Close tour",
  steps: [
    // ...
  ],
});

driverObj.drive();
```

### Event Handlers

`onNextClick`, `onPrevClick`, `onCloseClick` and `onDoneClick` run instead of the button's default action. The tour then only moves or ends when you call `moveNext()`, `movePrevious()` or `destroy()`. Set them on the driver for every step, or on a step's `popover`. `onDoneClick` runs on the last step instead of `onNextClick`, so it tells you the user finished the tour.

```js
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  steps: [
    // ...
  ],
  onNextClick: () => {
    console.log("Next clicked");
    driverObj.moveNext();
  },
  onPrevClick: () => {
    console.log("Previous clicked");
    driverObj.movePrevious();
  },
  onCloseClick: () => {
    console.log("Close clicked");
    driverObj.destroy();
  },
  onDoneClick: () => {
    console.log("Done clicked");
    driverObj.destroy();
  },
});

driverObj.drive();
```

`onNextClick` also runs when the step is completed another way: the right arrow key, an overlay click with `overlayClickBehavior: "nextStep"`, `advanceOn` or `advance()`. For loading something before the next step, see the `onNextClick` pattern in [Async Tour & Lifecycle Control](./async-and-lifecycle.md).

### Custom Buttons via onPopoverRender

Add the `driver-popover-footer-btn` class to give a custom button the default driver.js styling; leave it out to apply your own styles (1.6.0).

```js
const driverObj = driver({
  onPopoverRender: (popover, { config, state, driver }) => {
    const btn = document.createElement("button");
    btn.className = "driver-popover-footer-btn";
    btn.innerText = "Custom Action";
    popover.footerButtons.appendChild(btn);
    btn.addEventListener("click", () => { /* ... */ });
  },
  steps: [/* ... */]
});
```

### Simple Highlight

`highlight()` shows a single step without a tour. Use it for contextual help: explain a feature, guide a form, or dim the page around one element.

```js
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  popoverClass: "driverjs-theme",
  stagePadding: 4,
});

driverObj.highlight({
  element: "#highlight-me",
  popover: {
    side: "bottom",
    title: "This is a title",
    description: "This is a description",
  },
});
```

A highlight popover has no buttons unless you ask for them with `showButtons`. The user closes it with `Escape` or a click on the overlay, and your code closes it with `destroy()`. Leave out `popover` to only dim the page around the element.

### Highlight Without an Element

Leave out `element` and the popover shows in the middle of the screen, like a modal. The title and description take HTML.

```js
driverObj.highlight({
  popover: {
    description:
      "<img src='/welcome.webp' width='270' />" +
      "<p>Yet another highlight example.</p>",
  },
});
```

## Notes

- Since 1.14.0 the official pages are `/docs/popover` and `/docs/simple-highlight` (group "Tours"). `Side` is `top | right | bottom | left`; there is no `over` side (see the configuration page Notes).
- The 1.14.0 Position section drops the older description of the viewport-fit adjustment in favor of one sentence ("When the popover doesn't fit on that side, it moves to one where it does").
- Adapted from the official docs: the "No Buttons, Click to Advance" demo has no code block upstream (config only), so the minimal `showButtons: []` + `advanceOn: "click"` snippet above was assembled from its config.
- The "Custom Buttons via onPopoverRender" snippet and its 1.6.0 note are kept from the 1.10.1 page; in 1.14.0 custom buttons have their own Custom Buttons page. Since 1.6.0, custom buttons receive their own click events; only the built-in next, previous and close buttons have their default action intercepted by the library, and the close button on a single `highlight()` popover closes it, respecting `allowClose` and any custom `onCloseClick`.
- The 1.10.1 "Form Field Contextual Help" section (focus-event highlights) is replaced in 1.14.0 by a pointer to the Teach a Form recipe (steps that move on once a field is valid) and to hints for help that stays on the page until requested.
- Version gates: `advanceOn` and `showButtons: []` hiding all buttons since 1.11.0; `popover.instruction` since 1.12.0 (action steps, see the changelog).
- Source: https://driverjs.com/docs/popover and https://driverjs.com/docs/simple-highlight (driver.js 1.14.0 docs source, apps/docs/src/content/guides/popover.mdx and simple-highlight.mdx at tag 1.14.0).

## Related

- [Configuration](../api/configuration.md)
- [Theming](../api/theming.md)
