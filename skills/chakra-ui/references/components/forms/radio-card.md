# Radio Card

Card-style radio group with optional description and addon content.

## Import

```tsx
import { RadioCard } from "@chakra-ui/react"
```

## Usage

```tsx
<RadioCard.Root defaultValue="react">
  {["react", "vue", "angular"].map((item) => (
    <RadioCard.Item key={item} value={item}>
      <RadioCard.ItemHiddenInput />
      <RadioCard.ItemControl>
        <RadioCard.ItemText>{item}</RadioCard.ItemText>
        <RadioCard.ItemIndicator />
      </RadioCard.ItemControl>
    </RadioCard.Item>
  ))}
</RadioCard.Root>
```

## Props

### RadioCard.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | The size of the cards |
| `variant` | `"surface" \| "subtle" \| "outline" \| "solid"` | `"surface"` | The visual variant |
| `colorPalette` | `string` | `"gray"` | The color palette |
| `align` | `"start" \| "center" \| "end"` | — | Alignment of card content |
| `orientation` | `"horizontal" \| "vertical"` | — | Layout orientation |
| `defaultValue` | `string` | — | Initial selected value |
| `value` | `string` | — | Controlled selected value |
| `disabled` | `boolean` | — | Whether the group is disabled |
| `onValueChange` | `(details: ValueChangeDetails) => void` | — | Callback when selection changes |

## Sub-parts

`Root`, `Item`, `ItemHiddenInput`, `ItemControl`, `ItemText`, `ItemDescription`, `ItemContent`, `ItemIndicator`, `ItemAddon`, `Label`

## Variants / Sizes

- **sizes**: `sm`, `md`, `lg`
- **variants**: `surface`, `subtle`, `outline`, `solid`

## Notes

- 3.38.0: `cursor` token overrides in the theme are no longer ignored, and disabled elements use `tokens.cursor.disabled` instead of a hardcoded `not-allowed`.
- Source: https://github.com/chakra-ui/chakra-ui/blob/f0387b6e832a41663eb7186a375db7879337724e/packages/react/CHANGELOG.md (3.38.0 entry, tag @chakra-ui/react@3.38.0, retrieved 2026-11-14)

## Related

- [radio.md](./radio.md)
- [checkbox-card.md](./checkbox-card.md)
