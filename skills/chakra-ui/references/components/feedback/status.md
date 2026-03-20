# Status

A small indicator component used to communicate the status of an entity.

## Import

```tsx
import { Status } from "@chakra-ui/react"
```

## Usage

```tsx
<HStack gap="6">
  <Status.Root colorPalette="green">
    <Status.Indicator />
    Success
  </Status.Root>
  <Status.Root colorPalette="red">
    <Status.Indicator />
    Error
  </Status.Root>
</HStack>
```

## Props

### Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size of the component |
| `colorPalette` | `"gray" \| "red" \| ...` | `"gray"` | Color palette (determines the indicator color) |

## Variants / Sizes

- **size**: `"sm"`, `"md"` (default), `"lg"`

## Notes

- `Status.Indicator` renders the colored dot
- Color palette directly maps to semantic status: `green` = success, `red` = error, `orange` = warning, `blue` = info
- Text label is placed as a direct child of `Status.Root` alongside `Status.Indicator`

## Related

- [Alert](./alert.md)
- [Badge](../data-display/badge.md)
