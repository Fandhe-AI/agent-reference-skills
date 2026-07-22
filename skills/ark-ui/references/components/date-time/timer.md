# Timer

Tracks elapsed time from zero or counts down from a target time, with configurable interval and lifecycle callbacks.

## Signature / Usage

```tsx
import { Timer } from '@ark-ui/react'

export const Countdown = () => (
  <Timer.Root countdown startMs={60000}>
    <Timer.Area>
      <Timer.Item type="minutes" />
      <Timer.Separator />
      <Timer.Item type="seconds" />
    </Timer.Area>
    <Timer.Control>
      <Timer.ActionTrigger action="pause">Pause</Timer.ActionTrigger>
    </Timer.Control>
  </Timer.Root>
)
```

## Anatomy

| Part | Description |
| --- | --- |
| `Root` | Main container, provides context |
| `Area` | Display area for timer values |
| `Item` | Individual time unit display (hours, minutes, seconds, etc.) |
| `Separator` | Visual divider between time units |
| `Control` | Container for action buttons |
| `ActionTrigger` | Button for timer actions (`start`, `pause`, `resume`, `reset`) |

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `autoStart` | `boolean` | — | Automatically start the timer |
| `startMs` | `number` | — | Total duration in milliseconds |
| `countdown` | `boolean` | — | Whether the timer counts down, decrementing on each tick |
| `targetMs` | `number` | — | Minimum/target count in milliseconds |
| `interval` | `number` | `1000` | Update frequency in milliseconds |
| `onTick` | `(details) => void` | — | Called on each update with current state |
| `onComplete` | `(details) => void` | — | Triggered when the timer reaches its target |

## Notes

- Use the `useTimer` hook with `Timer.RootProvider` to access timer state and control it programmatically from outside the component tree.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Date Picker](./date-picker.md)
