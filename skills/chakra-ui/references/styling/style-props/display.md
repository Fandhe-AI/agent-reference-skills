# Display Style Props

JSX style props for controlling element display and visibility across breakpoints.

## Props

| Prop | CSS Property | Token Category |
|------|-------------|----------------|
| `display` | `display` | — |
| `hideFrom` | `display` | `breakpoints` |
| `hideBelow` | `display` | `breakpoints` |

## Examples

```tsx
// Basic display
<Box display="flex" />

// Responsive display
<Box display={{ base: "none", md: "block" }} />

// Hide from md and above
<Box hideFrom="md" />

// Hide below md
<Box hideBelow="md" />
```

## Notes

- `hideFrom` and `hideBelow` are utility props that manipulate `display` under the hood
- Use these in combination with responsive display values for precise visibility control

## Related

- [Responsive Design](../concepts/responsive-design.md)
- [Layout Style Props](./layout.md)
