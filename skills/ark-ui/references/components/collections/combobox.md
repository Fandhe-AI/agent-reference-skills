# Combobox

A single input field that combines the functionality of a select and a text input, enabling search, filter, and select from a list of options.

## Signature / Usage

```tsx
import { Combobox, createListCollection } from "@ark-ui/react"

const collection = createListCollection({
  items: ["React", "Vue", "Svelte"],
})

const App = () => (
  <Combobox.Root collection={collection}>
    <Combobox.Label>Framework</Combobox.Label>
    <Combobox.Control>
      <Combobox.Input />
      <Combobox.Trigger>Open</Combobox.Trigger>
      <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
    </Combobox.Control>
    <Combobox.Positioner>
      <Combobox.Content>
        {collection.items.map((item) => (
          <Combobox.Item key={item} item={item}>
            <Combobox.ItemText>{item}</Combobox.ItemText>
            <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
          </Combobox.Item>
        ))}
      </Combobox.Content>
    </Combobox.Positioner>
  </Combobox.Root>
)
```

## Anatomy

- `Combobox.Root` — container
- `Combobox.Label` — associated label
- `Combobox.Control` — wraps input and trigger buttons
  - `Combobox.Input` — text entry field
  - `Combobox.Trigger` / `Combobox.ClearTrigger` — open dropdown / clear selection
- `Combobox.Positioner` — dropdown positioning wrapper
  - `Combobox.Content` — dropdown menu container
    - `Combobox.ItemGroup` / `Combobox.ItemGroupLabel` — grouped items
    - `Combobox.Item` / `Combobox.ItemText` / `Combobox.ItemIndicator` — individual option

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `collection` | `ListCollection` | Item data source managing options |
| `inputBehavior` | `"none" \| "autohighlight" \| "autocomplete"` | Input matching behavior |
| `multiple` | `boolean` | Enable multi-select mode |
| `value` / `defaultValue` | `string[]` | Controlled/uncontrolled selected values |
| `inputValue` / `defaultInputValue` | `string` | Controlled/uncontrolled search text |
| `open` / `defaultOpen` | `boolean` | Dropdown visibility |
| `selectionBehavior` | `"clear" \| "replace" \| "preserve"` | Behavior of input value on selection |
| `openOnChange` / `openOnClick` / `openOnKeyPress` | `boolean` | Opening triggers |
| `onValueChange` / `onInputValueChange` / `onHighlightChange` / `onOpenChange` | `function` | State change callbacks |

## Notes

- Complies with the WAI-ARIA Combobox pattern. Keyboard: ArrowDown/Up to navigate or open, Home/End to jump, Enter to select, Escape to close.
- Data attributes: `[data-scope="combobox"]`, `[data-part]`, `[data-state="open"|"closed"]`, `[data-highlighted]`, `[data-checked]`, `[data-invalid]`, `[data-disabled]`, `[data-readonly]`.
- Uses `createListCollection` (via `useListCollection`) for item management, supporting `itemToString` / `itemToValue` for custom objects, `groupBy`, and `limit` for performance.
- Supports async search, virtualized rendering, and creatable options for new values.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Select](./select.md)
- [Listbox](./listbox.md)
