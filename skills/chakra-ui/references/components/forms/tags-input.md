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
| `editable` | `boolean` | `false` | Whether tags can be edited inline; editing starts on double-click or `Enter` when a tag is highlighted |
| `allowDuplicates` | `boolean` | `false` | Whether to allow duplicate tags |
| `sanitizeValue` | `(value: string) => string` | `(value) => value.trim()` | Sanitize the tag value before adding (trim, normalize case, strip characters) |
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
- 3.35.0 (Ark UI 5.36.0): added `enterKeyHint` on mobile.
- 3.37.0: fixed an XSS vector in the hidden element that measures input width (it now uses `textContent` instead of `innerHTML`), and native form submit now reflects the current tags in `FormData`.

## Related

- [input.md](./input.md)
- [field.md](./field.md)
