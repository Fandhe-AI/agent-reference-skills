# Checkmark

A visual indicator used to show checked, unchecked, or indeterminate states.

## Import

```tsx
import { Checkmark } from "@chakra-ui/react"
```

## Usage

```tsx
<Stack>
  <Checkmark />
  <Checkmark checked />
  <Checkmark indeterminate />
  <Checkmark disabled />
  <Checkmark checked disabled />
</Stack>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Whether the checkmark is checked |
| `indeterminate` | `boolean` | — | Whether the checkmark is in an indeterminate state |
| `disabled` | `boolean` | — | Whether the checkmark is disabled |
| `variant` | `"solid" \| "outline" \| "subtle" \| "plain" \| "inverted"` | `"solid"` | The visual variant |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | The size of the component |
| `colorPalette` | `"gray" \| "red" \| "orange" \| "yellow" \| "green" \| "teal" \| "blue" \| "cyan" \| "purple" \| "pink"` | `"gray"` | The color palette |
| `filled` | `"true" \| "false"` | — | Whether the checkmark background is filled |
| `as` | `React.ElementType` | — | The underlying element to render |
| `asChild` | `boolean` | — | Merge props onto the child element |

## Variants / Sizes

```tsx
{/* Variants */}
<Checkmark variant="solid" checked />
<Checkmark variant="outline" checked />
<Checkmark variant="subtle" checked />
<Checkmark variant="plain" checked />
<Checkmark variant="inverted" checked />

{/* Sizes */}
<Checkmark size="xs" checked />
<Checkmark size="sm" checked />
<Checkmark size="md" checked />
<Checkmark size="lg" checked />

{/* Filled outline */}
<Checkmark variant="outline" filled />
```

## Related

- [Radiomark](./radiomark.md)
