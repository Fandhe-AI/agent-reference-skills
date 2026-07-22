# Format Byte

`Format.Byte` formats byte values with various options and units, extending number formatting capabilities with byte-specific functionality.

## Signature / Usage

```tsx
import { Format } from '@ark-ui/react/format'

export const App = () => <Format.Byte value={1024} unit="byte" unitDisplay="short" />
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | — | The byte value to format |
| `sizes` | `string[]` | — | Custom byte size specifications for formatting |
| `locale` | `string` | — | Locale used for formatting |
| `unit` | `string` | — | Specifies the input byte unit |
| `unitDisplay` | `'short' \| 'long' \| 'narrow'` | — | Controls how units appear in the output |
| `unitSystem` | `'decimal' \| 'binary'` | `'decimal'` | Switches between decimal (1000 bytes) and binary (1024 bytes) conversion |

## Related

- [Format Number](./format-number.md)
- [Locale](./locale.md)
