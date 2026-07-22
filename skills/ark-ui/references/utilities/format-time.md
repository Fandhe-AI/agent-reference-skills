# Format Time

`Format.Time` formats time values to a specific locale and options. Accepts both string (`HH:mm[:ss]`) and `Date` object inputs.

## Signature / Usage

```tsx
import { Format } from '@ark-ui/react/format'

export const App = () => <Format.Time value="14:30" withSeconds={false} />
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string \| Date` | — | Time value; string in `HH:mm[:ss]` format or a `Date` object |
| `withSeconds` | `boolean` | `false` | Whether to include seconds in the formatted output |
| `amLabel` | `string` | — | Custom AM label for 12-hour format |
| `pmLabel` | `string` | — | Custom PM label for 12-hour format |
| `locale` | `string` | — | Locale used for formatting |

## Notes

- Automatically adapts based on the `LocaleProvider` settings
- Supports both 24-hour and 12-hour formats with customizable AM/PM labels

## Related

- [Format Relative Time](./format-relative-time.md)
- [Locale](./locale.md)
