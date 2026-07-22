# Format Number

`Format.Number` formats numbers to a specific locale and options, leveraging the native `Intl.NumberFormat` API with intelligent caching for performance.

## Signature / Usage

```tsx
import { Format } from '@ark-ui/react/format'

export const App = () => <Format.Number value={1234.5} style="currency" currency="USD" />
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | — | The number to format |
| `style` | `'decimal' \| 'percent' \| 'currency' \| 'unit'` | `'decimal'` | Formatting style |
| `currency` | `string` | — | Currency code, used when `style="currency"` |
| `unit` | `string` | — | Unit identifier, used when `style="unit"` |
| `notation` | `'standard' \| 'compact' \| 'scientific' \| 'engineering'` | `'standard'` | Formatting notation, e.g. `"compact"` for abbreviated display |
| `locale` | `string` | — | Locale used for formatting |

## Notes

- Built on the native `Intl.NumberFormat` API
- Caches results for repeated locale/option combinations to avoid performance degradation

## Related

- [Format Byte](./format-byte.md)
- [Locale](./locale.md)
