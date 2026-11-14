# Text and key input (React)

Deliver typed text and key presses from the page to a Rive graphic in the React runtime. Text input is new in `@rive-app/react-*` `v4.36.0`.

## Signature / Usage

Key and text input need no extra API: when the playing state machine has focus nodes, the runtime wires them up together with keyboard navigation. To let keyboard users leave a graphic that traps Tab, clear focus from app code (snippet taken from https://rive.app/docs/runtimes/react/focus.md; `rive` comes from `useRive`):

```jsx
rive?.clearFocus();
```

Give the element that wraps the canvas `position: relative` so the hidden input and the canvas resolve positions against the same ancestor.

Adapted (not in the official docs): the following JSX illustrates the documented `position: relative` requirement, which the official page states in prose only.

```jsx
<RiveComponent style={{ position: "relative" }} />
```

## Options / Props

| Input | Delivered as | Details |
|-------|--------------|---------|
| Key input | Key presses and releases (plus auto-repeat) with held Shift / Ctrl / Alt / Cmd modifiers | Goes to keyboard listeners in the graphic; handled keys get `preventDefault()` |
| Text input | Typed, pasted, or IME-composed characters | Inserted into a text input in the graphic through a hidden `<input>` |

Hidden input:

| Property | Value |
|----------|-------|
| Element | `<input type="text">` inserted as a sibling of the canvas |
| Tab order / a11y | `tabindex="-1"` and `aria-hidden="true"` unless semantics is enabled |
| Visibility | Invisible, absolutely positioned over the canvas, `pointer-events: none` |
| Value | Always empty; text is sent to the state machine and cleared immediately |
| Lifetime | Exists whenever the runtime wires up keyboard input; removed by `cleanup()` or `removeRiveListeners()` |

## Notes

- Input reaches the graphic only if a node in the graphic has focus and browser focus is on the `<canvas>`, the semantics overlay, or the hidden input. The runtime does not listen for keys on `document` or `window`. Input goes to the focused node first, then bubbles up through its ancestors until a node handles it.
- Keys pressed while an IME is composing belong to the IME and are not sent to the graphic; the composed text is inserted on commit.
- A keyboard listener on the focused node takes priority over focus traversal: if the graphic handles Tab, focus doesn't move and keyboard users can't Tab out. Provide another exit, such as an Escape key input listener that clears focus, or call `rive.clearFocus()`.
- Pasting with a physical keyboard inserts plain text (line breaks kept for multi-line inputs, removed for single-line); Ctrl/Cmd + C copies selected text, and obscured inputs such as password fields copy nothing. Space, arrow keys, Backspace, Delete, Home, End and Enter don't scroll the page or submit a surrounding form; with Ctrl, Alt or Cmd they keep browser behavior unless the graphic handles them.
- On touch devices the on-screen keyboard opens when the user taps a text input, because the runtime focuses the hidden input during the tap. If a text input gains focus without a tap (for example from a state action), mobile browsers may not open the keyboard. Because the hidden input stays empty, mobile editing tools such as copy, cut, autocorrect and auto-capitalization may be unavailable in this first release.
- With semantics enabled, the hidden input stands in for the focused text field in the accessibility tree (label, hint, states) only when the focused node's semantic role is text field or the node has no semantics.
- In React, the element wrapping the canvas is the `<div>` that `RiveComponent` renders. Pass `style={{ position: "relative" }}` to `RiveComponent`. If you pass a `className` instead, `RiveComponent` drops its default styles, so include `position: relative` in that class.
- The hidden input is a real `<input>` in your page, so generic selectors (`input`, `document.querySelectorAll("input")`) and loops over a surrounding `<form>`'s fields will see it. There is one per Rive instance, even with several text inputs.
- Adapted from the official docs: the `style` snippet under Signature / Usage is not on the source page; it restates the documented behavior.
- Source: https://rive.app/docs/runtimes/react/text-and-key-input.md (fetched 2026-11-14)

## Related

- [focus.md](./focus.md)
- [semantics.md](./semantics.md)
