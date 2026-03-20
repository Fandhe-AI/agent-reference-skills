# Radiomark

A visual indicator used to show selected and unselected radio states.

## Import

```tsx
import { Radiomark } from "@chakra-ui/react"
```

## Usage

```tsx
<Stack>
  <Radiomark />
  <Radiomark checked />
  <Radiomark disabled />
  <Radiomark checked disabled />
</Stack>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Whether the radiomark is checked |
| `disabled` | `boolean` | — | Whether the radiomark is disabled |
| `variant` | `"solid" \| "subtle" \| "outline" \| "inverted"` | `"solid"` | The visual variant |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | The size of the component |
| `colorPalette` | `"gray" \| "red" \| "orange" \| "yellow" \| "green" \| "teal" \| "blue" \| "cyan" \| "purple" \| "pink"` | `"gray"` | The color palette |
| `filled` | `"true" \| "false"` | — | Whether the radiomark background is filled |
| `as` | `React.ElementType` | — | The underlying element to render |
| `asChild` | `boolean` | — | Merge props onto the child element |

## Variants / Sizes

```tsx
{/* Variants */}
<Radiomark checked variant="solid" />
<Radiomark checked variant="subtle" />
<Radiomark checked variant="outline" />
<Radiomark checked variant="inverted" />

{/* Sizes */}
<Radiomark size="xs" checked />
<Radiomark size="sm" checked />
<Radiomark size="md" checked />
<Radiomark size="lg" checked />

{/* Filled outline */}
<Radiomark variant="outline" filled checked />
```

## Related

- [Checkmark](./checkmark.md)
