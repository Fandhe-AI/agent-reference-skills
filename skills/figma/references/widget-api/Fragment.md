# Fragment

Renders multiple children without adding a wrapper node to the canvas. Behaves like React's Fragment.

## Signature / Usage

```tsx
// Shorthand (recommended)
<>
  {names.map(name => <Text key={name}>{name}</Text>)}
</>

// Explicit — required when a key prop is needed
<Fragment key={id}>
  <Text>{title}</Text>
  <Text>{subtitle}</Text>
</Fragment>
```

```json
// tsconfig.json — required for Fragment support
{
  "compilerOptions": {
    "jsxFactory": "figma.widget.h",
    "jsxFragmentFactory": "figma.widget.Fragment"
  }
}
```

## Notes

- `Fragment` cannot be the root component returned by `widget.register`.
- No props can be passed to `Fragment` except `key` (required when used inside a `.map()`).
- Use the explicit `<Fragment key={...}>` form for list rendering; the `<>` shorthand cannot accept `key`.

## Related

- [AutoLayout](./AutoLayout.md)
- [Text](./Text.md)
- [overview](./overview.md)
