# Checkbox Card

Card-style checkbox with optional description and addon sections.

## Import

```tsx
import { CheckboxCard } from "@chakra-ui/react"
```

## Usage

```tsx
<CheckboxCard.Root>
  <CheckboxCard.HiddenInput />
  <CheckboxCard.Control>
    <CheckboxCard.Indicator />
    <CheckboxCard.Content>
      <CheckboxCard.Label>Option label</CheckboxCard.Label>
      <CheckboxCard.Description>Description text</CheckboxCard.Description>
    </CheckboxCard.Content>
  </CheckboxCard.Control>
</CheckboxCard.Root>
```

## Props

### CheckboxCard.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | The size of the card |
| `variant` | `"surface" \| "subtle" \| "outline" \| "solid"` | `"surface"` | The visual variant |
| `colorPalette` | `string` | `"gray"` | The color palette |
| `align` | `"start" \| "center" \| "end"` | — | Alignment of card content |
| `orientation` | `"horizontal" \| "vertical"` | — | Layout orientation |
| `checked` | `boolean` | — | Controlled checked state |
| `defaultChecked` | `boolean` | — | Initial checked state |
| `disabled` | `boolean` | — | Whether the card is disabled |
| `invalid` | `boolean` | — | Whether the card is invalid |

## Sub-parts

`Root`, `HiddenInput`, `Control`, `Indicator`, `Label`, `Content`, `Description`, `Addon`

## Variants / Sizes

- **sizes**: `sm`, `md`, `lg`
- **variants**: `surface`, `subtle`, `outline`, `solid`

## Related

- [checkbox.md](./checkbox.md)
- [radio-card.md](./radio-card.md)
