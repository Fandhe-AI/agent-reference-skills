# Tags Input

Input that creates, displays, and removes tag/chip values.

## Import

```tsx
import { TagsInput } from "@chakra-ui/react"
```

## Usage

```tsx
<TagsInput.Root defaultValue={["React", "Vue"]}>
  <TagsInput.Label>Technologies</TagsInput.Label>
  <TagsInput.Control>
    <TagsInput.Context>
      {({ value }) =>
        value.map((v, i) => (
          <TagsInput.Item key={i} index={i} value={v}>
            <TagsInput.ItemText>{v}</TagsInput.ItemText>
            <TagsInput.ItemDeleteTrigger />
          </TagsInput.Item>
        ))
      }
    </TagsInput.Context>
    <TagsInput.Input placeholder="Add tag..." />
  </TagsInput.Control>
</TagsInput.Root>
```

## Props

### TagsInput.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | The size of the input |
| `variant` | `"outline" \| "subtle" \| "flushed"` | `"outline"` | The visual variant |
| `colorPalette` | `string` | `"gray"` | The color palette |
| `max` | `number` | — | Maximum number of tags |
| `delimiter` | `string` | `","` | Character that splits new tags on paste |
| `addOnPaste` | `boolean` | `false` | Whether to add tags on paste |
| `blurBehavior` | `"add" \| "clear"` | — | What happens when input loses focus |
| `editable` | `boolean` | `false` | Whether tags can be edited inline |
| `disabled` | `boolean` | — | Whether the input is disabled |
| `readOnly` | `boolean` | — | Whether the input is read-only |
| `invalid` | `boolean` | — | Whether the input is invalid |
| `validate` | `(details: ValidateDetails) => boolean` | — | Custom tag validation function |
| `defaultValue` | `string[]` | `[]` | Initial tag values |
| `value` | `string[]` | — | Controlled tag values |
| `onValueChange` | `(details: ValueChangeDetails) => void` | — | Callback when tags change |

## Sub-parts

`Root`, `Label`, `Control`, `Input`, `Item`, `ItemText`, `ItemDeleteTrigger`, `Items`, `ClearTrigger`, `Context`, `HiddenInput`

## Variants / Sizes

- **sizes**: `xs`, `sm`, `md`, `lg`
- **variants**: `outline`, `subtle`, `flushed`

## Notes

- Press `Enter` or type the delimiter character to add a tag.
- Tags can be removed with `ItemDeleteTrigger` or by pressing `Backspace` when the input is empty.

## Related

- [input.md](./input.md)
- [field.md](./field.md)
