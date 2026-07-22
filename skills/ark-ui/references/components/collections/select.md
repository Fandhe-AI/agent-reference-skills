# Select

A dropdown that presents a list of options for single or multiple selection, built on a `collection` data source.

## Signature / Usage

```tsx
import { Select, createListCollection } from "@ark-ui/react"

const collection = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
  ],
})

const App = () => (
  <Select.Root collection={collection}>
    <Select.Label>Framework</Select.Label>
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText placeholder="Select framework" />
        <Select.Indicator />
      </Select.Trigger>
      <Select.ClearTrigger>Clear</Select.ClearTrigger>
    </Select.Control>
    <Select.Positioner>
      <Select.Content>
        {collection.items.map((item) => (
          <Select.Item key={item.value} item={item}>
            <Select.ItemText>{item.label}</Select.ItemText>
            <Select.ItemIndicator>✓</Select.ItemIndicator>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Positioner>
    <Select.HiddenSelect />
  </Select.Root>
)
```

## Anatomy

- `Select.Root` — container
- `Select.Label` — associated text label
- `Select.Control` — wrapper for trigger/indicators
  - `Select.Trigger` — button that opens the dropdown
  - `Select.ValueText` — displays selected value(s)
  - `Select.ClearTrigger` — resets selection
  - `Select.Indicator` — visual cue (e.g. arrow icon)
- `Select.Positioner` — positioning wrapper
  - `Select.Content` — dropdown menu container
    - `Select.ItemGroup` / `Select.ItemGroupLabel` — grouped items
    - `Select.Item` — individual selectable option
      - `Select.ItemText` — option label
      - `Select.ItemIndicator` — selection checkmark/icon
- `Select.HiddenSelect` — native `<select>` for form integration

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `collection` | `ListCollection` | Item data source, built via `createListCollection` |
| `multiple` | `boolean` | Enable multi-select |
| `value` | `string[]` | Controlled selected values |
| `open` | `boolean` | Control open state |
| `disabled` | `boolean` | Disable interactions |
| `closeOnSelect` | `boolean` | Auto-close after selection (default: `true`) |
| `lazyMount` | `boolean` | Defer mounting of content |
| `loopFocus` | `boolean` | Cycle through items with keyboard |

## Notes

- Complies with the WAI-ARIA Listbox pattern. Keyboard: Space/Enter to open/select, Arrow keys to navigate, Escape to close, A-Z for typeahead.
- Data attributes: `[data-scope="select"]`, `[data-part]`, `[data-state="open"|"closed"]`, `[data-disabled]`, `[data-highlighted]`, `[data-invalid]`.
- Requires a collection built with `createListCollection` (supports grouping via `groupBy`, custom object mapping, async loading).
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Combobox](./combobox.md)
- [Listbox](./listbox.md)
