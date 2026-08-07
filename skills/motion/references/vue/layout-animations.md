# Layout animations

FLIP-powered layout animation for Vue, animating CSS layout changes via the `layout` prop and shared elements via `layoutId`.

## Signature / Usage

```vue
<motion.div layout />

<motion.div
  layout
  :style="{ justifyContent: isOn ? 'flex-start' : 'flex-end' }"
/>
```

## Options / Props

| Name | Description |
|------|-------------|
| `layout` | Animates layout changes automatically |
| `layoutId` | Matches two elements and animates between them |
| `layoutScroll` | Accounts for scroll offset in scrollable containers |
| `layoutRoot` | Accounts for page scroll in fixed elements |
| `transition` | Customizes animation timing and easing |

## Notes

- Elements cannot use `display: inline` (transforms don't apply).
- SVG layout animations are not currently supported.
- Scale transforms may distort `borderRadius`/`boxShadow`; Motion auto-corrects when set via `style`.
- Border rendering cannot scale below 1px.

## Related

- [layout-group](./layout-group.md)
- [motion](./motion.md)
- [overview](./overview.md)
