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
| `autoSubmit` | `boolean` | — | Whether to auto-submit the owning form when all inputs are filled |
| `sanitizeValue` | `(value: string) => string` | — | Sanitize pasted values before validation (e.g. strip dashes or spaces) |

## With separator

Wrap each segment in `Group` with `attached`, add a separator between segments in `PinInput.Control`, and set `count` on `PinInput.Root` to the input count.

```tsx
<PinInput.Root count={6}>
  <PinInput.HiddenInput />
  <PinInput.Control alignItems="center" gap="3">
    <Group attached>
      <PinInput.Input index={0} />
      <PinInput.Input index={1} />
      <PinInput.Input index={2} />
    </Group>
    <Span color="fg.subtle">–</Span>
    <Group attached>
      <PinInput.Input index={3} />
      <PinInput.Input index={4} />
      <PinInput.Input index={5} />
    </Group>
  </PinInput.Control>
</PinInput.Root>
```

## Sub-parts

`Root`, `HiddenInput`, `Control`, `Field`, `Label`

## Variants / Sizes

- **sizes**: `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
- **variants**: `outline`, `subtle`, `flushed`

## Notes

- 3.35.0 (Ark UI 5.36.0): `PinInput` also gained `enterKeyHint`, Home/End key handling and improved deletion/focus behavior. `enterKeyHint` is not listed in the Pin Input prop types at 3.37.0.

## Related

- [input.md](./input.md)
- [field.md](./field.md)
