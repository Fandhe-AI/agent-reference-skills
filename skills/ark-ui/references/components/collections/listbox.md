# Listbox

A component for selecting a single or multiple items from a list, with keyboard navigation and grouping/filtering support.

## Signature / Usage

```tsx
import { Listbox, createListCollection } from "@ark-ui/react"

const collection = createListCollection({
  items: ["React", "Vue", "Svelte"],
})

const App = () => (
  <Listbox.Root collection={collection} selectionMode="single">
    <Listbox.Label>Framework</Listbox.Label>
    <Listbox.Content>
      {collection.items.map((item) => (
        <Listbox.Item key={item} item={item}>
          <Listbox.ItemText>{item}</Listbox.ItemText>
          <Listbox.ItemIndicator>✓</Listbox.ItemIndicator>
        </Listbox.Item>
      ))}
    </Listbox.Content>
  </Listbox.Root>
)
```

## Anatomy

- `Listbox.Root` — container
- `Listbox.Label` — label text
- `Listbox.Content` — items container
  - `Listbox.ItemGroup` / `Listbox.ItemGroupLabel` — grouped items
  - `Listbox.Item` / `Listbox.ItemText` / `Listbox.ItemIndicator` — individual selectable item
- `Listbox.ValueText` — displays selected values

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `collection` | `ListCollection<T>` | Required item data source |
| `selectionMode` | `"single" \| "multiple" \| "extended"` | Selection behavior (default: `"single"`) |
| `value` / `defaultValue` | `string[]` | Controlled/uncontrolled selection |
| `onValueChange` | `function` | Selection change callback |
| `disabled` | `boolean` | Disable entire component |
| `loopFocus` | `boolean` | Keyboard navigation looping |
| `orientation` | `"vertical" \| "horizontal"` | Layout direction |

## Notes

- Data attributes: `[data-scope="listbox"]`, `[data-part]`, `[data-selected]`, `[data-highlighted]`, `[data-disabled]`, `[data-state="checked"|"unchecked"]`.
- `"extended"` selection mode supports keyboard modifiers (Cmd/Ctrl) for range/multi selection.
- Grid layouts use `createGridCollection` instead of `createListCollection`.
- Programmatic access (e.g. select-all) via `useListboxContext`.
- Uses `createListCollection` for grouped, filtered, or grid-based item collections with type safety and disabled-item support.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Select](./select.md)
- [Combobox](./combobox.md)
