# Format Relative Time

`Format.RelativeTime` formats time intervals relative to the current moment in a locale-aware manner, leveraging the native `Intl.RelativeTimeFormat` API with caching for performance.

## Signature / Usage

```tsx
import { Format } from '@ark-ui/react/format'

export const App = () => <Format.RelativeTime value={-3} unit="day" />
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | — | The numeric offset relative to now |
| `unit` | `string` | — | The unit of time, e.g. `"day"`, `"hour"` |
| `style` | `'long' \| 'short' \| 'narrow'` | `'long'` | Formatting style; `"short"` produces a condensed output |
| `locale` | `string` | — | Locale used for formatting |

## Notes

- Built on the native `Intl.RelativeTimeFormat` API
- Caches results for identical locale/options combinations

## Related

- [Format Time](./format-time.md)
- [Locale](./locale.md)
