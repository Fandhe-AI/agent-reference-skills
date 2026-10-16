# Version Changes (1.5.0 - 1.10.1)

Changelog of Driver.js 1.x releases from 1.5.0 to 1.10.1. For other versions, see the GitHub releases page. For 0.x to 1.x, see [Migrate to 1.x](./migrate-to-1x.md).

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
  steps: [{ element: "#a", popover: { title: "A" } }],
});
driverObj.drive();
```

## Changes by Version

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

- The changelog's Unreleased section is empty as of 1.10.1.
- Only 1.6.0 is flagged Breaking in the changelog (footer button class).
- Checklists (1.10.0) and hints (1.8.0) are separate entries (`driver.js/checklist`, `driver.js/hints`).

## Related

- [Migrate to 1.x](./migrate-to-1x.md)
- [Configuration](../api/configuration.md)
- [Methods](../api/methods.md)
