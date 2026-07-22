# Progress - Linear

Displays determinate or indeterminate progress to the user as a horizontal (or vertical) bar. Complies with the ARIA `progressbar` role requirements.

## Signature / Usage

```tsx
import { Progress } from '@ark-ui/react/progress'

export const Basic = () => (
  <Progress.Root defaultValue={40}>
    <Progress.Label>Uploading...</Progress.Label>
    <Progress.ValueText />
    <Progress.Track>
      <Progress.Range />
    </Progress.Track>
  </Progress.Root>
)
```

## Anatomy

- `Progress.Root` — main container
- `Progress.Label` — text label
- `Progress.ValueText` — numerical/percentage value display
- `Progress.Track` — background track container
- `Progress.Range` — filled portion indicating progress

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| null` | `50` | Current progress value; `null` renders an indeterminate state |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction |
| `formatOptions` | `Intl.NumberFormatOptions` | `{ style: "percent" }` | Formatting for the value text |
| `locale` | `string` | `"en-US"` | Locale used to format the value |
| `onValueChange` | `(details: { value: number \| null }) => void` | — | Callback fired when the value changes |

## Notes

- Set `value` to `null` to show an indeterminate animation for tasks of unknown duration.
- Use `RootProvider` with the `useProgress` hook to control state externally.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Progress - Circular](./progress-circular.md)
