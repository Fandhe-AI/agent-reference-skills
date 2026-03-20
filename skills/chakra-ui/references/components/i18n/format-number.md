# FormatNumber

Formats a number according to the current locale and specified options, supporting currency, percentage, unit, and compact notations.

## Import

```tsx
import { FormatNumber } from "@chakra-ui/react"
```

## Usage

```tsx
<Text textStyle="lg">
  <FormatNumber value={1450.45} />
</Text>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — (required) | The number to format |
| `style` | `"decimal" \| "currency" \| "percent" \| "unit"` | `"decimal"` | The formatting style |
| `currency` | `string` | — | The currency code (e.g. `"USD"`), required when `style="currency"` |
| `unit` | `string` | — | The unit to use (e.g. `"kilometer"`), required when `style="unit"` |
| `notation` | `"standard" \| "scientific" \| "engineering" \| "compact"` | `"standard"` | The notation to use |
| `compactDisplay` | `"short" \| "long"` | — | Display for compact notation |
| `maximumFractionDigits` | `number` | — | Maximum number of fraction digits |
| `minimumFractionDigits` | `number` | — | Minimum number of fraction digits |

## Variants / Sizes

```tsx
{/* Currency */}
<FormatNumber value={1234.45} style="currency" currency="USD" />

{/* Percentage */}
<FormatNumber value={0.145} style="percent" maximumFractionDigits={2} minimumFractionDigits={2} />

{/* Unit */}
<FormatNumber value={384.4} style="unit" unit="kilometer" />

{/* Compact */}
<FormatNumber value={1500000} notation="compact" compactDisplay="short" />

{/* With locale */}
<LocaleProvider locale="de-DE">
  <FormatNumber value={1450.45} />
</LocaleProvider>
```

## Notes

- Reads locale from the nearest `LocaleProvider`; defaults to `"en-US"` if none is present
- Accepts all options from the [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) API

## Related

- [LocaleProvider](./locale-provider.md)
- [FormatByte](./format-byte.md)
