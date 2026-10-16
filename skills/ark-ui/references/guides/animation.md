# Animation

Guide for animating Ark UI components using CSS keyframes or JavaScript animation libraries.

## Signature / Usage

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

[data-scope='tooltip'][data-part='content'][data-state='open'] {
  animation: fadeIn 300ms ease-out;
}
[data-scope='tooltip'][data-part='content'][data-state='closed'] {
  animation: fadeOut 300ms ease-in;
}
```

## Notes

- CSS animations are supported for both mount and unmount phases; Ark UI postpones unmounting a part until its exit animation finishes.
- The `present` prop keeps a component mounted so exit animations can play before removal.
- Kept-mounted content is hidden with `hideMode="display-none"` (HTML `hidden`, effects stay alive) by default; `hideMode="activity"` (5.38.0) uses React 19 `Activity` so effects pause. It does not apply with `unmountOnExit`.
- `onEnterComplete` (5.39.0) is called once the enter animation finishes, mirroring `onExitComplete`.
- JS animation libraries (GreenSock, anime.js, Framer Motion, etc.) are also supported for finer-grained control.
- Drive animations off the same `data-state` attributes described in the Styling guide (e.g. `[data-state='open']` / `[data-state='closed']`).

## Related

- [Styling](./styling.md)
- [Component State](./component-state.md)
