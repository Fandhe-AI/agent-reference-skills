# Version Changes (1.5.0 - 1.14.0)

Changelog of Driver.js 1.x releases from 1.5.0 to 1.14.0. For other versions, see the [GitHub releases page](https://github.com/nilbuild/driver.js/releases). For 0.x to 1.x, see [Migrate to 1.x](./migrate-to-1x.md).

## Signature / Usage

```javascript
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  skipMissingElement: true,      // 1.7.0
  waitForElement: 500,           // 1.8.0
  closeBtnLabel: "Cerrar",       // 1.9.0
  overlayClickBehavior: "none",  // 1.9.0
  onDestroyed: (el, step, { reason }) => console.log(reason), // reason: 1.10.0
  scrollIntoView: false,         // 1.13.0
  waitForRemovedElement: 2000,   // 1.14.0
  steps: [
    { element: "#a", advanceOn: "click", popover: { title: "A" } }, // advanceOn: 1.11.0
  ],
});
driverObj.drive();
```

## Changes by Version

### 1.14.0

- Added: `waitForRemovedElement` sets how long a removed element gets to come back, separately from `waitForElement`. Both take `Infinity`.
- Added: `scrollIntoView` takes `{ block, inline }` to say where the element ends up.
- Added: `allowPageInteraction` lets the user use the whole page during a step.
- Added: `focus` puts the keyboard on the popover, in the highlighted element, or leaves it where it is.
- Added: In the headless build, `onInteraction` reports clicks on `allowedElements` as `region: "allowed"`.
- Added: `onPopoverPositioned` runs every time the popover is placed, so you can move it somewhere else and keep it there.
- Changed: The cutout and popover only cover the part of the element in view, so a row wider than its scrolling panel is highlighted inside the panel.
- Changed: The popover scrolls into view only as far as it needs to, so it no longer undoes where the element was scrolled to.
- Changed: When the tour ends, the keyboard goes back where it was only if it is still on the popover.
- Fixed: The highlight follows a panel that scrolls inside the page.
- Fixed: `onDestroyed` runs when the tour is closed before the first step has settled.
- Fixed: A `waitForElement` longer than about 24 days no longer runs out at once.

### 1.13.0

- Added: `driver.js/headless` runs a tour without drawing anything, so you can render your own UI.
- Added: `scrollIntoView: false` stops driver.js from scrolling to the highlighted element and popover.
- Added: `onWaitingForElement` tells you when a step starts waiting for its element, and its `signal` when the wait ends.
- Added: `onElementReplaced` tells you when the app re-renders the highlighted element and the step moves to the new one.

### 1.12.1

- Changed: A new popover focuses Next instead of the close button, so Enter no longer ends the tour.
- Changed: Your CSS can hide or restyle popover parts without `!important`.
- Fixed: The popover shows above a dialog that opens mid-step instead of behind it.
- Fixed: `pointer-events: none` inside the highlighted element is no longer overridden.

### 1.12.0

- Added: `popover.instruction` makes a step an action step: the user has to do what it says. Next looks disabled until they do.
- Added: `advanceOn: { event, strict: true }` lets only that gesture through on the highlighted element.
- Added: `advanceDelay` pauses on a completed step before moving on. Action steps show a done state meanwhile.
- Added: `driverObj.advance()` completes the current step from your code, like `advanceOn` does.
- Added: `driverObj.nudge("message")` shows a line of feedback in the popover and shakes it.
- Added: `onElementMissing` takes `"stay"`, `"previous"` or `"previousAction"` as well as a function.
- Added: `disableActiveInteraction: "clicks"` blocks clicks on the highlighted element but keeps hover working.
- Added: `onHighlightStarted` gets the same `signal` as `onHighlighted`.
- Added: A console warning when `disableActiveInteraction` makes a step's `advanceOn` impossible.
- Added: A highlighted element inside an allowed element, like an item in an open menu, gets a ring instead of a hidden cutout.
- Added: CSS variables for the instruction row, the feedback line and that ring. See Theming.
- Changed: Clicks on the padding around the highlighted element, or on an element with `disableActiveInteraction`, no longer reach your app's `document` and `body` listeners. Use `onInteraction` to see them.
- Changed: `disableActiveInteraction: true` also blocks Enter and Space on the highlighted element.
- Changed: A highlighted element that your framework re-renders is followed automatically.
- Changed: `overlayClickBehavior: "nextStep"` does nothing while the popover waits for an element.
- Changed: `onDestroyStarted` gets the step being entered when the tour is closed during its first animation, not `undefined`.
- Changed: The `State` type no longer lists the internal `__` keys added in 1.11.0.
- Fixed: Steps inside a modal `<dialog>` now dim the dialog and cut out the highlighted element.
- Fixed: `moveNext()`, `drive()` and `destroy()` now work when called from `onHighlightStarted`, `onHighlighted` or `onDeselected`.
- Fixed: `moveTo()` starts the tour if it isn't running.
- Fixed: `setSteps()` on a running tour ends it cleanly. Call `drive()` to start the new steps.
- Fixed: A step's `showProgress: false` now wins over `showProgress: true` on the driver.
- Fixed: A fast double-click no longer skips a step that advances on click. `advanceOnClick` ignores clicks while a step animates in, as before 1.11.0.
- Fixed: The key that completes a step, like Enter, no longer presses a button in the next popover.
- Fixed: The highlight and popover stay on their element when it changes size, when a framework rewrites its `className`, and when the page resizes mid-step.
- Fixed: A highlighted element that is removed from the page no longer keeps driver.js classes and aria attributes.
- Fixed: `drive()` without steps no longer locks the page when `onDestroyStarted` is set.
- Fixed: Less layout work while scrolling with hints or a tour, and `waitForElement` checks the page at most once a frame.

### 1.11.0

- Added: `advanceOn` completes a step on any event, like `"contextmenu"`, and `{ event, when }` only completes it when your check passes.
- Added: `onInteraction` sees clicks, right-clicks and double-clicks during a step and can block them with `return false`.
- Added: `allowedElements` keeps menus and popups opened by a step usable above the overlay.
- Added: `onElementMissing` lets you recover when a step's element disappears or a wait times out. Return `false` on a timeout to stay on the current step.
- Added: `driverObj.updatePopover()` changes the popover text in place and announces it to screen readers.
- Added: `driverObj.nudge()` shakes the popover to draw attention, and `nudge({ description })` changes its text at the same time.
- Added: `onHighlighted` gets a `signal` that aborts when the step is left.
- Changed: While `waitForElement` waits, the popover stays visible in a waiting state, keeping the close button usable.
- Changed: Escape and arrow keys pressed in a text field, select or ARIA widget inside the highlighted element now go to your app instead of the tour.
- Changed: The popover no longer takes focus from the highlighted element when a step starts.
- Changed: `showButtons: []` in the driver config now hides all buttons instead of showing all of them.
- Changed: Highlighting no longer overwrites an element's own `aria-haspopup`, `aria-expanded` or `aria-controls`.
- Changed: `advanceOnClick` is deprecated in favor of `advanceOn: "click"`. It keeps working.
- Changed: The tour ignores Escape and arrow keys whose `keydown` your app prevented or stopped.
- Fixed: Hints in an open `<dialog>` no longer get covered when the page styles every `[popover]`, for example with a dark background. (#628)

### 1.10.2

- Fixed: Hints and popovers in an open `<dialog>` with a `transform` or `filter` now stay next to their element, also after the dialog reopens. (#627)
- Fixed: Tour steps scrolled out of a visible scrollable container are now scrolled into view. (#577)
- Fixed: The popover title and footer are `div`s instead of `header` and `footer` landmarks, and the centered dummy element gets no aria attributes. (#434)

### 1.10.1

- Added: `launcher: false` on checklists drops the floating launcher, for pages that open the panel from their own button with `open()` or `toggle()`. Closing the panel hands focus back to whatever opened it.
- Fixed: hints and popovers of tour steps whose element is inside an open `<dialog>` now render inside that dialog, so they show above a modal opened with `showModal()` (#625).
- Fixed: clicking the popover no longer throws when the event's target is a text node (#626).

### 1.10.0

- Added: Checklists, an onboarding widget in its own `driver.js/checklist` entry (with `dist/checklist.css`). Items start a tour, follow a link or run an action, and are ticked when the user finishes the tour, or by `completeWhen` and `complete()`, or by the user with `allowManualComplete`. Progress comes in through `completed` and goes out through `onProgress`; `onEvent` reports everything for analytics. Configurable with `position` and `offset`; can show a different title and launcher text once everything is done.
- Added: `reason` in the options of `onDestroyStarted`, `onDestroyed` and the `onDeselected` that runs on destroy: `"done"` (finished tour), `"close"`, `"escape"`, `"overlay"`, `"replaced"` (replaced by another instance), `"api"` (ended from code). A `destroy()` called from a hook keeps the reason of the user action that started it. The `DestroyReason` and `HookOpts` types are exported.
- Changed: the popover's close button only darkens for keyboard focus (`:focus-visible`).

### 1.9.0

- Added: `closeBtnLabel` (driver and step level) sets the close button's `aria-label`; defaults to `Close` (#623).
- Added: `overlayClickBehavior: "none"` ignores overlay clicks while Escape and the close button still close the tour (#435).
- Changed: keyboard control follows the popover buttons. Arrow keys do nothing when their button is hidden or disabled; Escape does nothing when the close button is disabled (#589).
- Changed: the current popover is hidden while `waitForElement` waits for the next step's element (#578).
- Changed: only one instance is on screen at a time. Starting a tour or highlight closes any other active instance; it gets `onDeselected` and `onDestroyed` but not `onDestroyStarted`.
- Fixed: `destroy()` on an instance that is not active is now a no-op (#504).
- Fixed: the highlighted element's own `aria-controls`, `aria-expanded` and `aria-haspopup` are restored when the highlight moves on or the tour ends (#495).
- Fixed: no more small white square between steps without an element (#549).
- Fixed: `onDeselected` now fires when moving between two steps on the same element, or between two steps without an element.
- Fixed: the driver-level `disableButtons` now applies to tour steps (previously ignored during a tour). A step's own `disableButtons` still replaces it.

### 1.8.0

- Added: Hints, pulsing beacons that open a popover on click; overlay optional, page stays interactive. Entry `driver.js/hints`, about 5KB gzip (#363).
- Added: `advanceOnClick` (driver and step level) advances the tour by clicking the highlighted element itself (#606).
- Added: `waitForElement` (driver and step level) waits up to N ms for a step's element before treating it as missing (#606).
- Added: `sideEffects` field in package.json for better tree-shaking.
- Changed: popover internals shared between tours and hints; tour behaviour verified unchanged against 1.7.0.
- Changed: build migrated from vite to tsdown; artifact names, exports map and CDN globals unchanged, sizes within +/-2%.
- Fixed: `skipMissingElement`: the last reachable step now shows Done and runs `onDoneClick`; step queries like `isLastStep()` account for skips (#616).

### 1.7.0

- Added: `skipMissingElement` (driver and step level) skips a step whose target element is specified but not in the DOM, instead of showing the centered fallback popover. Element-less steps are never skipped (#489, #395).
- Added: `index` on the options passed to every hook, holding the active step index (same as `driverObj.getActiveIndex()`) (#490).
- Added: `--driver-popover-font-family` CSS variable (#607).
- Changed: popover title and description now render in the default font stack (`"Helvetica Neue", ...`) instead of the browser's default `sans-serif`. Set `--driver-popover-font-family` to use your own.
- Fixed: icon fonts (Material Icons, Font Awesome, etc.) inside a step description render correctly (#510, #512).
- Fixed: each `driver()` call keeps its own config, steps and state; creating a second instance no longer overwrites the first (#571).
- Fixed: popover no longer jumps when its content has images that load after render.

### 1.6.0

- Added: `animationDuration` config for the highlight transition (#104).
- Added: `allowScroll` config to lock body scroll while a tour is active.
- Added: `onDoneClick` hook, fired when the done button on the final step is clicked (#500).
- Added: `data` property on a step for arbitrary data accessible from hooks (#539).
- Changed (Breaking): popover footer buttons are styled through the `driver-popover-footer-btn` class instead of the `.driver-popover-footer button` selector. Buttons added through `onPopoverRender` no longer inherit the default styling; add the `driver-popover-footer-btn` class to opt in. The built-in next/previous buttons carry the class (#555).
- Changed: custom buttons added through `onPopoverRender` receive their own click events. Only the built-in next, previous, and close buttons have their default action intercepted.
- Changed: the popover exposes `driver-popover-side-*` and `driver-popover-align-*` classes; arrow positioning was rewritten.
- Fixed: document event listener leak in `onDriverClick` (#452).
- Fixed: dropped the CSS `:has()` selector for broader browser compatibility (#586).
- Fixed: positioned highlighted elements and their children (e.g. dropdown menus) no longer get clipped (#454, #563).
- Fixed: `removeChild` DOMException when re-rendering a popover whose wrapper was already detached (#572).
- Fixed: close button on a single-element `highlight()` popover now closes it by default, respecting `allowClose` and any custom `onCloseClick` (#444).

### 1.5.0

- Added: `getNextStep` method on the driver API (#420).
- Added: `driver-popover-done-btn` class on the next button when it acts as the done button on the final step (#610).
- Changed: the `onDestroyed` hook now receives the final tour state (#553).
- Changed: removed the unicode characters from the default button labels.
- Fixed: the tour no longer closes when pressing the left arrow on the first step (#564).
- Fixed: removed the button text-shadow that left ghost text behind (#605).
- Fixed: `onNextClick` now fires when advancing the tour through an overlay click (#576).

## Notes

- The changelog's Unreleased section is empty as of 1.14.0.
- The 1.10.2 to 1.14.0 sections are transcribed from the changelog with each `### Added` / `### Changed` / `### Fixed` heading folded into an item prefix; issue links are shortened to `(#N)` and `/docs/` links reduced to their link text. Sections 1.10.1 and earlier are the condensed text kept from the earlier pin.
- Since 1.11.0, `advanceOnClick` is deprecated in favor of `advanceOn: "click"` (it keeps working), and `showButtons: []` in the driver config hides all buttons (it showed all of them before). Headless tours (`driver.js/headless`) arrived in 1.13.0.
- Only 1.6.0 is flagged Breaking in the changelog (footer button class).
- Checklists (1.10.0) and hints (1.8.0) are separate entries (`driver.js/checklist`, `driver.js/hints`).
- Source: https://driverjs.com/docs/changelog (driver.js 1.14.0 docs source, apps/docs/src/content/guides/changelog.mdx at tag 1.14.0).

## Related

- [Migrate to 1.x](./migrate-to-1x.md)
- [Configuration](../api/configuration.md)
- [Methods](../api/methods.md)
