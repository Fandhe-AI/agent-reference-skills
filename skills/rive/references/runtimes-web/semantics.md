# Semantics (Web)

Make Rive graphics accessible to screen readers by enabling semantics in the Web (JS) runtime. The runtime builds an invisible DOM tree next to the `<canvas>` from the semantics defined in the editor and keeps it in sync with the state machine.

## Signature / Usage

```js
import { Rive, SemanticMode } from "@rive-app/webgl2";

const rive = new Rive({
  canvas: document.getElementById("rive-canvas"),
  src: "login.riv",
  stateMachine: "State Machine 1",
  autoplay: true,
  autoBind: true,
  semanticsMode: SemanticMode.Enabled,
});
```

Enable after load: construct with `SemanticMode.Disabled` (default) and call `rive.enableSemantics()` when the user opts in.

```js
accessibilityToggle.addEventListener("change", (event) => {
  if (event.target.checked) {
    rive.enableSemantics();
  }
});
```

Label the overlay container (a `role="region"` landmark):

```js
const rive = new Rive({
  canvas: document.getElementById("rive-canvas"),
  src: "login.riv",
  stateMachine: "State Machine 1",
  autoplay: true,
  autoBind: true,
  semanticsMode: SemanticMode.Enabled,
  semanticsOptions: {
    riveCanvasLabel: "Login Experience",
  },
});
```

## Options / Props

`SemanticMode` enum (passed as `semanticsMode`):

| Mode | Description |
|------|-------------|
| `SemanticMode.Disabled` | Default. No semantic tree or accessibility DOM is created. |
| `SemanticMode.Enabled` | Accessibility DOM is created after load and kept up to date as the state machine advances. |

`semanticsOptions`:

| Name | Type | Description |
|------|------|-------------|
| `riveCanvasLabel` | `string` | `aria-label` applied to the overlay container. Defaults to `"Rive animation"`. |

Editor role to DOM output:

| Editor role | DOM output |
|-------------|------------|
| Button | `role="button"` |
| Checkbox | `role="checkbox"` |
| Switch | `role="switch"` |
| Slider | `role="slider"` |
| Text | DOM text content in an inner `<span>` with a parent `<div>`; headers use `role="heading"` with `aria-level` |
| Image | `role="img"` but must have a label |
| Group / None | `role="group"` |
| List / List item | `role="list"` / `role="listitem"` |
| Tab / Tab list | `role="tab"` / `role="tablist"` |
| Dialog / Alert dialog | `role="dialog"` with `aria-modal` when modal / `role="alertdialog"` always with `aria-modal` |
| Radio group / Radio button | `role="radiogroup"` / `role="radio"` |

## Notes

- Semantics are opt-in and experimental: `semanticsMode` and `semanticsOptions` may change behavior without a major version bump; the role/trait set may also change.
- Semantics must be defined in the Rive Editor; elements without semantics are not exposed regardless of mode.
- States and traits map to ARIA attributes (`aria-expanded`, `aria-selected`, `aria-checked`, `aria-pressed`, `aria-required`, `aria-disabled`), set only when the trait is present or ARIA requires it. Label becomes `aria-label` (or DOM text for text nodes); Hint becomes a visually hidden description referenced by `aria-describedby`; slider Value becomes `aria-valuenow` / `aria-valuetext`; Hidden becomes `aria-hidden="true"`; Live Region becomes `aria-live="polite"`.
- An image with no label is treated as decorative and hidden from assistive technologies.
- Interactive, focusable, and list item overlay elements get `tabindex="-1"`, so sighted keyboard-only users cannot Tab into individual elements inside the graphic.
- The overlay is inserted as a sibling of the `<canvas>`; give the canvas's container `position: relative` so both resolve positions against the same ancestor.
- Test with VoiceOver (macOS / iOS), TalkBack (Android), Narrator or NVDA (Windows); inspect the `<div id="rive-a11y-...">` element after the canvas.

## Related

- [rive-constructor.md](./rive-constructor.md)
- [canvas-vs-webgl.md](./canvas-vs-webgl.md)

Source: https://rive.app/docs/runtimes/web/semantics (fetched 2026-10)
