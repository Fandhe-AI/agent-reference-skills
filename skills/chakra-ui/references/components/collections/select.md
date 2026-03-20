# Select

Accessible dropdown select with support for single and multiple selection.

## Import

```tsx
import { Select, createListCollection } from "@chakra-ui/react"
```

## Usage

```tsx
const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
  ],
})

<Select.Root collection={frameworks} width="320px">
  <Select.Label>Framework</Select.Label>
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText placeholder="Select framework" />
    </Select.Trigger>
    <Select.IndicatorGroup>
      <Select.Indicator />
    </Select.IndicatorGroup>
  </Select.Control>
  <Portal>
    <Select.Positioner>
      <Select.Content>
        {frameworks.items.map((item) => (
          <Select.Item key={item.value} item={item}>
            <Select.ItemText>{item.label}</Select.ItemText>
            <Select.ItemIndicator />
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Positioner>
  </Portal>
</Select.Root>
```

## Props

### Select.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `collection` | `ListCollection<T>` | **required** | The collection of items |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | The size of the select |
| `variant` | `"outline" \| "subtle" \| "ghost"` | `"outline"` | The visual variant |
| `colorPalette` | `string` | `"gray"` | The color palette |
| `multiple` | `boolean` | — | Whether multiple selection is allowed |
| `closeOnSelect` | `boolean` | `true` | Whether to close after selection |
| `deselectable` | `boolean` | — | Whether a selected item can be deselected (single mode only) |
| `disabled` | `boolean` | — | Whether the select is disabled |
| `readOnly` | `boolean` | — | Whether the select is read-only |
| `invalid` | `boolean` | — | Whether the select is invalid |
| `defaultValue` | `string[]` | — | Initial selected values |
| `value` | `string[]` | — | Controlled selected values |
| `open` | `boolean` | — | Controlled open state |
| `positioning` | `PositioningOptions` | — | Popover positioning options |
| `onValueChange` | `(details: ValueChangeDetails) => void` | — | Callback when selection changes |
| `onOpenChange` | `(details: OpenChangeDetails) => void` | — | Callback when open state changes |

## Sub-parts

`Root`, `Label`, `Control`, `Trigger`, `ValueText`, `IndicatorGroup`, `Indicator`, `ClearTrigger`, `Content`, `Positioner`, `Item`, `ItemText`, `ItemIndicator`, `ItemGroup`, `ItemGroupLabel`, `HiddenSelect`, `List`

## Variants / Sizes

- **sizes**: `xs`, `sm`, `md`, `lg`
- **variants**: `outline`, `subtle`, `ghost`

## Notes

- Use `createListCollection` to construct the required `collection` prop.
- Wrap `Select.Positioner` in `Portal` to avoid overflow/clipping issues.
- `Select.HiddenSelect` provides a native `<select>` for form submission.

## Related

- [combobox.md](./combobox.md)
- [listbox.md](./listbox.md)
- [forms/native-select.md](../forms/native-select.md)
