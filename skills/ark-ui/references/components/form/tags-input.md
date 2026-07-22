# Tags Input

Allows users to add tags to an input field, providing an interactive way to manage multiple text entries.

## Anatomy

- `Root` — main container wrapper
- `Label` — associated label element
- `Control` — container for input and tags
- `Input` — text entry field for new tags
- `Item` — individual tag container
- `ItemPreview` — tag display area
- `ItemText` — tag text content
- `ItemDeleteTrigger` — remove button for each tag
- `ClearTrigger` — button to clear all tags
- `HiddenInput` — for form submission

## Signature / Usage

```tsx
import { TagsInput } from '@ark-ui/react/tags-input'

<TagsInput.Root value={tags} onValueChange={(details) => setTags(details.value)}>
  <TagsInput.Label>Add tags</TagsInput.Label>
  <TagsInput.Control>
    <TagsInput.Input placeholder="Type and press Enter" />
    <TagsInput.ClearTrigger>Clear</TagsInput.ClearTrigger>
  </TagsInput.Control>
</TagsInput.Root>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `value` | `string[]` | Controlled array of tag strings |
| `onValueChange` | `function` | Callback when tags update |
| `max` | `number` | Maximum tag count, default `Infinity` |
| `disabled` | `boolean` | Disables interaction |
| `readOnly` | `boolean` | Prevents adding/removing tags |
| `validate` | `function` | Rejects invalid tags |
| `delimiter` | `string \| RegExp` | Character triggering tag creation |
| `editable` | `boolean` | Enable tag editing, default `true` |
| `maxLength` | `number` | Character limit per tag |

## Notes

- Keyboard navigation with arrow keys for tag selection
- Validation support for preventing duplicates; configurable paste and blur behavior
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Field](./field.md)
