# Modifiers

Modifier keys (Shift, Control, Alt/Option, GUI/Super/Command) can be used as standalone key presses or as functions that combine a modifier with another keycode.

## Signature / Usage

```devicetree
// Standalone modifier key press
&kp LEFT_GUI

// Modifier function: Left Shift + A → uppercase A
&kp LS(A)

// Stacked modifier functions: Left Control + Right Alt + B
&kp LC(RA(B))

// Combining two modifiers (no base key)
&kp LS(LALT)
```

## Options / Props

### Modifier Functions

| Function | Modifier Applied |
|----------|-----------------|
| `LS(code)` | Left Shift |
| `RS(code)` | Right Shift |
| `LC(code)` | Left Control |
| `RC(code)` | Right Control |
| `LA(code)` | Left Alt |
| `RA(code)` | Right Alt |
| `LG(code)` | Left GUI (Super / Win / Command) |
| `RG(code)` | Right GUI |

Functions can be nested: `LC(RA(B))` applies Left Control and Right Alt to B.

### Standalone Modifier Keycodes

| Keycode | Aliases |
|---------|---------|
| `LEFT_SHIFT` | `LSHIFT`, `LSHFT`, `LS` |
| `RIGHT_SHIFT` | `RSHIFT`, `RSHFT`, `RS` |
| `LEFT_CONTROL` | `LCTRL`, `LCTL`, `LC` |
| `RIGHT_CONTROL` | `RCTRL`, `RCTL`, `RC` |
| `LEFT_ALT` | `LALT`, `LA` |
| `RIGHT_ALT` | `RALT`, `RA` |
| `LEFT_GUI` | `LGUI`, `LWIN`, `LCMD`, `LG` |
| `RIGHT_GUI` | `RGUI`, `RWIN`, `RCMD`, `RG` |

## Notes

- Some keycodes already embed a modifier (e.g., `DOLLAR` expands to `LS(NUMBER_4)`) — no explicit modifier function is needed
- Modified keys support roll-over safely: modifier functions are released when another key is pressed
- Example roll-over: pressing `LS(A)` then `B` before releasing produces `Ab` — only A is shifted

## Related

- [Keymaps Overview](./overview.md)
- [List of Keycodes](./list-of-keycodes.md)
