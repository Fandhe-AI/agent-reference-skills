# Spacing Style Props

JSX style props for controlling padding and margin of elements.

## Props

### Padding

| Prop | CSS Property | Token Category |
|------|-------------|----------------|
| `p`, `padding` | `padding` | `spacing` |
| `pt`, `paddingTop` | `padding-top` | `spacing` |
| `pr`, `paddingRight` | `padding-right` | `spacing` |
| `pb`, `paddingBottom` | `padding-bottom` | `spacing` |
| `pl`, `paddingLeft` | `padding-left` | `spacing` |
| `px`, `paddingX` | `padding-inline` | `spacing` |
| `py`, `paddingY` | `padding-block` | `spacing` |
| `ps`, `paddingStart` | `padding-inline-start` | `spacing` |
| `pe`, `paddingEnd` | `padding-inline-end` | `spacing` |

### Margin

| Prop | CSS Property | Token Category |
|------|-------------|----------------|
| `m`, `margin` | `margin` | `spacing` |
| `mt`, `marginTop` | `margin-top` | `spacing` |
| `mr`, `marginRight` | `margin-right` | `spacing` |
| `mb`, `marginBottom` | `margin-bottom` | `spacing` |
| `ml`, `marginLeft` | `margin-left` | `spacing` |
| `mx`, `marginX` | `margin-inline` | `spacing` |
| `my`, `marginY` | `margin-block` | `spacing` |
| `ms`, `marginStart` | `margin-inline-start` | `spacing` |
| `me`, `marginEnd` | `margin-inline-end` | `spacing` |

## Examples

```tsx
// Padding with token
<Box p="4" />
<Box px="8" py="4" />

// Padding with hardcoded value
<Box padding="40px" />

// Logical padding (RTL-friendly)
<Box ps="8" pe="4" />

// Margin auto centering
<Box mx="auto" w="container.md" />
```

## Notes

- `paddingStart` / `paddingEnd` (and their aliases `ps` / `pe`) use CSS logical properties (`padding-inline-start` / `padding-inline-end`), making them RTL-friendly

## Related

- [Sizing Style Props](./sizing.md)
- [Layout Style Props](./layout.md)
- [Flex and Grid Style Props](./flex-and-grid.md)
