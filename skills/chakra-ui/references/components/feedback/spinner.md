# Spinner

An animated loading indicator used to signal that content is being fetched or an action is in progress.

## Import

```tsx
import { Spinner } from "@chakra-ui/react"
```

## Usage

```tsx
<Spinner size="sm" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"inherit" \| "xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Size of the spinner |
| `colorPalette` | `"gray" \| "red" \| ...` | `"gray"` | Color palette |

## Variants / Sizes

- **size**: `"inherit"`, `"xs"`, `"sm"`, `"md"` (default), `"lg"`, `"xl"`

## Notes

- Use `size="inherit"` to make the spinner match the font size of its container
- Customize the track color via CSS variable `--spinner-track-color`
- Customize animation speed via the `animationDuration` style prop (e.g. `"0.8s"`)
- Customize border thickness via the `borderWidth` style prop

## Related

- [ProgressCircle](./progress-circle.md)
- [Skeleton](./skeleton.md)
