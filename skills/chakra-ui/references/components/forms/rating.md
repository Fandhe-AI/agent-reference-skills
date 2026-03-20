# Rating

Star rating input with optional half-star support and read-only display mode.

## Import

```tsx
import { RatingGroup } from "@chakra-ui/react"
```

## Usage

```tsx
<RatingGroup.Root count={5} defaultValue={3}>
  <RatingGroup.Label>Rate this product</RatingGroup.Label>
  <RatingGroup.Control>
    {Array.from({ length: 5 }).map((_, i) => (
      <RatingGroup.Item key={i} index={i + 1}>
        <RatingGroup.ItemIndicator />
      </RatingGroup.Item>
    ))}
  </RatingGroup.Control>
</RatingGroup.Root>
```

## Props

### RatingGroup.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | The size of the stars |
| `colorPalette` | `string` | `"gray"` | The color palette |
| `count` | `number` | `5` | Total number of stars |
| `defaultValue` | `number` | — | Initial rating value |
| `value` | `number` | — | Controlled rating value |
| `allowHalf` | `boolean` | `false` | Whether half-star ratings are allowed |
| `readOnly` | `boolean` | `false` | Whether the rating is read-only |
| `disabled` | `boolean` | — | Whether the rating is disabled |
| `onValueChange` | `(details: ValueChangeDetails) => void` | — | Callback when value changes |

## Sub-parts

`Root`, `HiddenInput`, `Control`, `Item`, `ItemIndicator`, `Label`

## Variants / Sizes

- **sizes**: `xs`, `sm`, `md`, `lg`

## Notes

- The component is exported as `RatingGroup` from `@chakra-ui/react` (not `Rating`).

## Related

- [field.md](./field.md)
