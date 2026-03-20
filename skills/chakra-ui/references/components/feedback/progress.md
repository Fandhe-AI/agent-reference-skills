# Progress

A linear progress bar that shows the completion status of a task.

## Import

```tsx
import { Progress } from "@chakra-ui/react"
```

## Usage

```tsx
<Progress.Root defaultValue={40} maxW="240px">
  <HStack justify="space-between" mb="1">
    <Progress.Label>Token usage</Progress.Label>
    <Progress.ValueText />
  </HStack>
  <Progress.Track>
    <Progress.Range />
  </Progress.Track>
</Progress.Root>
```

## Props

### Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Controlled value |
| `defaultValue` | `number` | `50` | Initial value (uncontrolled) |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `orientation` | `'horizontal' \| 'vertical'` | `"horizontal"` | Orientation |
| `formatOptions` | `NumberFormatOptions` | `{ style: "percent" }` | Value formatting options |
| `striped` | `"true" \| "false"` | — | Whether to show stripes |
| `animated` | `"true" \| "false"` | — | Whether stripes are animated |
| `variant` | `"outline" \| "subtle"` | `"outline"` | Visual variant |
| `shape` | `"square" \| "rounded" \| "full"` | `"rounded"` | Shape of the bar |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Size of the component |
| `colorPalette` | `"gray" \| "red" \| ...` | `"gray"` | Color palette |
| `onValueChange` | `(details: ValueChangeDetails) => void` | — | Callback when value changes |

## Variants / Sizes

- **variant**: `"outline"` (default), `"subtle"`
- **shape**: `"square"`, `"rounded"` (default), `"full"`
- **size**: `"xs"`, `"sm"`, `"md"` (default), `"lg"`, `"xl"`

## Notes

- Set `value={null}` for an indeterminate animation
- `Progress.Label` and `Progress.ValueText` are optional sibling elements outside the track
- Use `striped` + `animated` together for an animated stripe effect
- Use `useProgress()` hook with `Progress.RootProvider` for external state control

## Related

- [ProgressCircle](./progress-circle.md)
- [Spinner](./spinner.md)
