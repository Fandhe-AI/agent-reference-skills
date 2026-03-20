# ProgressCircle

A circular progress indicator that shows the completion status of a task.

## Import

```tsx
import { ProgressCircle } from "@chakra-ui/react"
```

## Usage

```tsx
<ProgressCircle.Root value={75}>
  <ProgressCircle.Circle>
    <ProgressCircle.Track />
    <ProgressCircle.Range />
  </ProgressCircle.Circle>
</ProgressCircle.Root>
```

## Props

### Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| null` | — | Controlled value (0–100); `null` for indeterminate |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Size of the component |
| `colorPalette` | `"gray" \| "red" \| ...` | `"gray"` | Color palette |

## Variants / Sizes

- **size**: `"xs"`, `"sm"`, `"md"` (default), `"lg"`, `"xl"`

## Notes

- Set `value={null}` for an indeterminate (spinning) animation
- `ProgressCircle.Track` renders the background ring; `ProgressCircle.Range` renders the filled arc
- Use `AbsoluteCenter` + `ProgressCircle.ValueText` to show percentage text in the center
- Customize stroke width via CSS variable `--thickness` on `ProgressCircle.Circle`
- Use `useProgressCircle()` hook with `ProgressCircle.RootProvider` for external state control

## Related

- [Progress](./progress.md)
- [Spinner](./spinner.md)
