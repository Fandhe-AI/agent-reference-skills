# Skeleton

A placeholder component that mimics content layout while data is loading.

## Import

```tsx
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react"
```

## Usage

```tsx
<HStack gap="5">
  <SkeletonCircle size="12" />
  <Stack flex="1">
    <Skeleton height="5" />
    <Skeleton height="5" width="80%" />
  </Stack>
</HStack>
```

## Props

### Skeleton

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `"true" \| "false"` | `true` | Whether to show the skeleton |
| `variant` | `"pulse" \| "shine" \| "none"` | `"pulse"` | Animation variant |
| `colorPalette` | `"gray" \| "red" \| ...` | `"gray"` | Color palette |

### SkeletonCircle

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `CircleProps["size"]` | — | Size of the circle |

### SkeletonText

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `noOfLines` | `number` | `3` | Number of skeleton lines to render |

## Variants / Sizes

- **variant**: `"pulse"` (default), `"shine"`, `"none"`

## Notes

- When `loading={false}`, `Skeleton` renders its children normally — use this pattern to toggle real content in
- Customize shine colors via CSS variables `--start-color` and `--end-color` on the `Skeleton` element
- `SkeletonText` renders multiple `Skeleton` lines, with the last line at 80% width
- `SkeletonCircle` wraps `Skeleton` inside a `Circle` container

## Related

- [Spinner](./spinner.md)
- [EmptyState](./empty-state.md)
