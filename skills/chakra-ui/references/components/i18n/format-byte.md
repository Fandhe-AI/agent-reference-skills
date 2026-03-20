# FormatByte

Formats a byte value into a human-readable string (e.g. `1450 → "1.45 kB"`), respecting the current locale.

## Import

```tsx
import { FormatByte } from "@chakra-ui/react"
```

## Usage

```tsx
<Text textStyle="lg">
  File size: <FormatByte value={1450.45} />
</Text>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — (required) | The byte size to format |
| `unit` | `"bit" \| "byte"` | `"byte"` | The unit granularity to display |
| `unitDisplay` | `"short" \| "long" \| "narrow"` | `"short"` | How the unit label is displayed |
| `unitSystem` | `"decimal" \| "binary"` | `"decimal"` | Unit system: decimal (kB, MB) or binary (KiB, MiB) |

## Variants / Sizes

```tsx
{/* Unit display options */}
<FormatByte value={50345.53} unitDisplay="narrow" />
<FormatByte value={50345.53} unitDisplay="short" />
<FormatByte value={50345.53} unitDisplay="long" />

{/* Bit unit */}
<FormatByte value={1450.45} unit="bit" />

{/* With locale */}
<LocaleProvider locale="de-DE">
  <FormatByte value={1450.45} />
</LocaleProvider>
```

## Notes

- Reads locale from the nearest `LocaleProvider`; defaults to `"en-US"` if none is present
- Built on Ark UI's format-byte utility

## Related

- [LocaleProvider](./locale-provider.md)
- [FormatNumber](./format-number.md)
