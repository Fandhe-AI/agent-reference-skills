# Native Select

Native HTML select element with Chakra styling.

## Import

```tsx
import { NativeSelect } from "@chakra-ui/react"
```

## Usage

```tsx
<NativeSelect.Root size="md" variant="outline">
  <NativeSelect.Field placeholder="Select option">
    <option value="react">React</option>
    <option value="vue">Vue</option>
    <option value="angular">Angular</option>
  </NativeSelect.Field>
  <NativeSelect.Indicator />
</NativeSelect.Root>
```

## Props

### NativeSelect.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | The size of the select |
| `variant` | `"outline" \| "subtle" \| "plain" \| "ghost"` | `"outline"` | The visual variant |
| `colorPalette` | `string` | `"gray"` | The color palette |
| `disabled` | `boolean` | — | Whether the select is disabled |
| `invalid` | `boolean` | — | Whether the select is invalid |
| `readOnly` | `boolean` | — | Whether the select is read-only |

## Sub-parts

`Root`, `Field`, `Indicator`

## Variants / Sizes

- **sizes**: `xs`, `sm`, `md`, `lg`, `xl`
- **variants**: `outline`, `subtle`, `plain`, `ghost`

## Notes

- Use `NativeSelect.Field` (not `NativeSelect.Root`) as the actual `<select>` element.
- For an accessible, styled dropdown, prefer the compound [select.md](../collections/select.md) component.

## Related

- [collections/select.md](../collections/select.md)
- [field.md](./field.md)
