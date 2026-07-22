# Progress - Circular

Displays determinate or indeterminate progress within a circular (SVG) visual format. Complies with the ARIA `progressbar` role requirements.

## Signature / Usage

```tsx
import { Progress } from '@ark-ui/react/progress'

export const Basic = () => (
  <Progress.Root defaultValue={40}>
    <Progress.Label>Loading...</Progress.Label>
    <Progress.ValueText />
    <Progress.Circle>
      <Progress.CircleTrack />
      <Progress.CircleRange />
    </Progress.Circle>
  </Progress.Root>
)
```

## Anatomy

- `Progress.Root` — main container
- `Progress.Label` — optional text label
- `Progress.ValueText` — displays the progress value
- `Progress.Circle` — SVG container for the circular visualization
- `Progress.CircleTrack` — background circle path
- `Progress.CircleRange` — filled progress indicator

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| null` | `50` | Current progress value; `null` renders an indeterminate state |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Display orientation |
| `locale` | `string` | `"en-US"` | Locale used to format the value |
| `onValueChange` | `(details: { value: number \| null }) => void` | — | Callback fired when the value changes |

## Notes

- Renders as SVG circles, giving scalable, sharp graphics at any size.
- Customize via CSS variables `--size` (diameter) and `--thickness` (stroke width).
- Use `RootProvider` with the `useProgress` hook to control state externally.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Progress - Linear](./progress-linear.md)
