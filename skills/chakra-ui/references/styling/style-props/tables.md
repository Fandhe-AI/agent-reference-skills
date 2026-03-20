# Tables Style Props

JSX style props for styling table elements, including border spacing and caption placement.

## Props

| Prop | CSS Property | Token Category |
|------|-------------|----------------|
| `borderCollapse` | `border-collapse` | — |
| `borderSpacing` | `border-spacing` | `spacing` |
| `borderSpacingX` | `border-spacing` (horizontal) | `spacing` |
| `borderSpacingY` | `border-spacing` (vertical) | `spacing` |
| `captionSide` | `caption-side` | — |
| `tableLayout` | `table-layout` | — |

## Examples

```tsx
// Border spacing (requires borderCollapse="separate")
<chakra.table borderSpacing="2" borderCollapse="separate">
  <tbody>
    <tr>
      <td>Cell 1</td>
      <td>Cell 2</td>
    </tr>
  </tbody>
</chakra.table>

// Caption placement
<table>
  <chakra.caption captionSide="bottom">
    Table caption
  </chakra.caption>
</table>
```

## Notes

- `borderSpacingX` and `borderSpacingY` require `borderSpacing="auto"` to function independently
- `borderSpacing` only takes effect when `borderCollapse` is set to `"separate"`

## Related

- [Border Style Props](./border.md)
- [Spacing Style Props](./spacing.md)
