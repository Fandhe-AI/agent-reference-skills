# Pin Input

One-time password or PIN entry with individual character fields.

## Import

```tsx
import { PinInput } from "@chakra-ui/react"
```

## Usage

```tsx
<PinInput.Root count={4} onValueComplete={(details) => console.log(details.value)}>
  <PinInput.HiddenInput />
  <PinInput.Control>
    {Array.from({ length: 4 }).map((_, i) => (
      <PinInput.Field key={i} index={i} />
    ))}
  </PinInput.Control>
</PinInput.Root>
```

## Props

### PinInput.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"2xs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"md"` | The size of each field |
| `variant` | `"outline" \| "subtle" \| "flushed"` | `"outline"` | The visual variant |
| `colorPalette` | `string` | `"gray"` | The color palette |
| `count` | `number` | — | Number of input fields |
| `type` | `"numeric" \| "alphanumeric" \| "alphabetic"` | `"numeric"` | Allowed character type |
| `mask` | `boolean` | `false` | Whether to mask input like a password |
| `otp` | `boolean` | `false` | Whether to use OTP autocomplete attributes |
| `attached` | `boolean` | `false` | Whether fields are visually attached |
| `defaultValue` | `string[]` | — | Initial value array |
| `value` | `string[]` | — | Controlled value array |
| `disabled` | `boolean` | — | Whether the input is disabled |
| `invalid` | `boolean` | — | Whether the input is invalid |
| `onValueChange` | `(details: ValueChangeDetails) => void` | — | Callback when value changes |
| `onValueComplete` | `(details: ValueChangeDetails) => void` | — | Callback when all fields are filled |

## Sub-parts

`Root`, `HiddenInput`, `Control`, `Field`, `Label`

## Variants / Sizes

- **sizes**: `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
- **variants**: `outline`, `subtle`, `flushed`

## Related

- [input.md](./input.md)
- [field.md](./field.md)
