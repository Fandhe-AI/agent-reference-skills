# Styling

Ark UI is a headless component library compatible with any styling solution, using `data-*` attributes instead of predefined classes to identify parts and states.

## Signature / Usage

```tsx
// Every rendered part carries data-scope / data-part, and interactive
// parts carry data-state reflecting the current state, e.g.:
// <div data-scope="accordion" data-part="item" data-state="open"></div>
```

```css
/* Target a specific part */
[data-scope='accordion'][data-part='item'] {
  border-bottom: 1px solid #e5e5e5;
}

/* Target a part in a given state */
[data-scope='accordion'][data-part='item'][data-state='open'] {
  background-color: #f5f5f5;
}
```

## Notes

- Every part exposes `data-scope` (component name) and `data-part` (part name) attributes for CSS targeting, in addition to `className` props for conventional class-based styling.
- Interactive parts expose `data-state` and other `data-*` attributes (e.g. `data-disabled`, `data-invalid`) reflecting current state; use attribute selectors like `[data-state='open']` to style state transitions.
- Panda CSS: use `defineSlotRecipe` together with the part anatomy exported from `@ark-ui/react/anatomy` to build slot recipes matching each component's parts.
- Tailwind CSS: apply utility classes directly to parts, and use the `data-[state=open]:...` arbitrary variant syntax to style based on `data-state`.
- Z-index: Ark exposes a `--layer-index` CSS variable as a zero-based offset (not an absolute z-index). Keep one shared base z-index for all dismissible overlays so Zag can order nested layers correctly regardless of component combination.

## Related

- [Composition](./composition.md)
- [Animation](./animation.md)
