# List Style Props

JSX style props for customizing list marker appearance and position.

## Props

| Prop | CSS Property | Token Category |
|------|-------------|----------------|
| `listStyleType` | `list-style-type` | — |
| `listStylePosition` | `list-style-position` | — |
| `listStyleImage` | `list-style-image` | `assets` |

## Examples

```tsx
// List style type
<Box as="ul" listStyleType="circle">
  <li>Item 1</li>
  <li>Item 2</li>
</Box>

// List style position
<Box as="ul" listStylePosition="inside">
  <li>Item 1</li>
  <li>Item 2</li>
</Box>

// Custom image marker
<Box as="ul" listStyleImage="url('/marker.png')">
  <li>Item 1</li>
</Box>

// Per-item marker color via _marker pseudo-element
<ul>
  <Box as="li" _marker={{ color: "red.500" }}>Item 1</Box>
  <Box as="li" _marker={{ color: "blue.500" }}>Item 2</Box>
</ul>
```

## Notes

- `listStyleImage` references the `assets` token category
- Individual marker colors can be controlled using the `_marker` conditional prop

## Related

- [Conditional Styles](../concepts/conditional-styles.md)
- [Typography Style Props](./typography.md)
