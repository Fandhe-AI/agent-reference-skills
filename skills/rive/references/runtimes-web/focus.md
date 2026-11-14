# Focus (Web)

Let users move through a Rive graphic with Tab and arrow keys in the Web (JS) runtime. Focus nodes are defined in the Rive Editor; the runtime connects them to the keyboard.

## Signature / Usage

```js
const rive = new Rive({
  canvas: document.getElementById("rive-canvas"),
  src: "menu.riv",
  stateMachine: "State Machine 1",
  autoplay: true,
  autoBind: true,
  focusOptions: {
    allowFocusInterrupt: true,
  },
});

// Remove focus from the focus nodes in the graphic (does not move browser focus)
rive.clearFocus();
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `tabIndex` | `number` | `0` when the graphic has focus nodes | Set on the `<canvas>` when it has no `tabindex` (or `-1`). Pass `-1` to keep the canvas out of the tab order (reachable by click) |
| `focusOptions.allowFocusInterrupt` | `boolean` | `false` | When `true`, the canvas takes browser focus whenever the graphic goes from no focused node to one, even if the user's focus is elsewhere on the page |
| `clearFocus()` | `() => void` | - | Clears focus from the graphic's focus nodes only; the next Tab leaves the canvas |

Keyboard behavior:

| Key | Behavior |
|-----|----------|
| Tab | Moves focus to the next focus node |
| Shift + Tab | Moves focus to the previous focus node |
| Arrow keys | Moves focus to the nearest focus node in that direction (based on on-screen position) |

## Notes

- When the playing state machine has focus nodes, the runtime allows the `<canvas>` to be focusable (one tab stop in the page) and routes keyboard events on the canvas to the focus nodes. With no focus nodes, or after tabbing past the last one, focus moves on to the next page element.
- The runtime draws no visual focus indicator; design the focused look in the graphic itself.
- When `shouldDisableRiveListeners` is `true`, Rive won't receive focus from the browser.
- When the graphic handles a key press, the browser's default action is suppressed; otherwise the browser handles it as usual. Arrow keys with Alt, Ctrl or Cmd are left to the browser. If the focused node handles the key itself (for example with a keyboard listener), focus does not move; this applies to Tab too.
- Entering and leaving: tabbing onto the canvas lands on the first focus node (Shift + Tab from a later element lands on the last); an already-focused node stays focused. Clicking the canvas gives it browser focus but does not move focus to a node. Tabbing past the first or last node releases focus to the page unless the nodes are set to wrap around or stop at the edges. When browser focus leaves the canvas, focus inside the graphic is cleared; switching browser tabs or windows does not clear it.
- By default a graphic's own focus changes (for example a state action focusing a node) do not move browser focus. `allowFocusInterrupt` is opt-in because pulling focus can be jarring (users lose their place, the browser may scroll, screen reader users can be pulled out of a form field); it fits full-page menus or game interfaces.
- Source: https://rive.app/docs/runtimes/web/focus.md (fetched 2026-11-14)
- Source: https://rive.app/docs/runtimes/web/rive-parameters.md (fetched 2026-11-14)

## Related

- [text-and-key-input.md](./text-and-key-input.md)
- [gamepad.md](./gamepad.md)
- [semantics.md](./semantics.md)
- [rive-constructor.md](./rive-constructor.md)
