# Combobox

Searchable dropdown with autocomplete and custom value support.

## Import

```tsx
import { Combobox, createListCollection } from "@chakra-ui/react"
```

## Usage

```tsx
const frameworks = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
  ],
})

<Combobox.Root collection={frameworks} width="320px">
  <Combobox.Label>Framework</Combobox.Label>
  <Combobox.Control>
    <Combobox.Input placeholder="Search..." />
    <Combobox.IndicatorGroup>
      <Combobox.Trigger />
    </Combobox.IndicatorGroup>
  </Combobox.Control>
  <Portal>
    <Combobox.Positioner>
      <Combobox.Content>
        {frameworks.items.map((item) => (
          <Combobox.Item key={item.value} item={item}>
            <Combobox.ItemText>{item.label}</Combobox.ItemText>
            <Combobox.ItemIndicator />
          </Combobox.Item>
        ))}
      </Combobox.Content>
    </Combobox.Positioner>
  </Portal>
</Combobox.Root>
```

## Props

### Combobox.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `collection` | `ListCollection<T>` | **required** | The collection of items |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | The size of the combobox |
| `variant` | `"outline" \| "subtle" \| "flushed"` | `"outline"` | The visual variant |
| `colorPalette` | `string` | `"gray"` | The color palette |
| `multiple` | `boolean` | — | Whether multiple selection is allowed |
| `inputBehavior` | `"none" \| "autohighlight" \| "autocomplete"` | `"none"` | Input auto-complete behavior |
| `selectionBehavior` | `"replace" \| "clear" \| "preserve"` | `"replace"` | What happens to input value after selection |
| `openOnClick` | `boolean` | `false` | Open dropdown on initial input click |
| `allowCustomValue` | `boolean` | — | Whether custom (non-list) values are allowed |
| `closeOnSelect` | `boolean` | — | Close dropdown after item selection |
| `disabled` | `boolean` | — | Whether the combobox is disabled |
| `readOnly` | `boolean` | — | Whether the combobox is read-only |
| `invalid` | `boolean` | — | Whether the combobox is invalid |
| `defaultValue` | `string[]` | `[]` | Initial selected values |
| `value` | `string[]` | — | Controlled selected values |
| `defaultInputValue` | `string` | `""` | Initial input text |
| `inputValue` | `string` | — | Controlled input text |
| `open` | `boolean` | — | Controlled open state |
| `onValueChange` | `(details: ValueChangeDetails) => void` | — | Callback when selection changes |
| `onInputValueChange` | `(details: InputValueChangeDetails) => void` | — | Callback when input text changes |
| `onOpenChange` | `(details: OpenChangeDetails) => void` | — | Callback when open state changes |
| `positioning` | `PositioningOptions` | `{ placement: "bottom-start" }` | Popover positioning |

## Sub-parts

`Root`, `Label`, `Control`, `Input`, `Trigger`, `ClearTrigger`, `IndicatorGroup`, `Content`, `Positioner`, `Item`, `ItemText`, `ItemIndicator`, `ItemGroup`, `ItemGroupLabel`, `List`, `Empty`

## Variants / Sizes

- **sizes**: `xs`, `sm`, `md`, `lg`
- **variants**: `outline`, `subtle`, `flushed`

## Notes

- Use `createListCollection` to create the required `collection` prop.
- Wrap `Combobox.Positioner` in `Portal` to prevent overflow clipping.
- For async/filtered items, update the collection on `onInputValueChange`.
- 3.38.0 (Ark UI 5.40.0): `Combobox.Root` gained a `loading` prop that sets `aria-busy` on the list and holds back the empty state while loading; the content stays visible while loading, so a loading indicator shows even when there are no items. `onSelect` details gained `modifiers`, and `onSelect` is called when a link item is modifier-clicked (also for Menu).
- For a searchable command menu that runs actions instead of keeping a selected value, see Command (added in 3.38.0).
- Source: https://github.com/chakra-ui/chakra-ui/blob/f0387b6e832a41663eb7186a375db7879337724e/packages/react/CHANGELOG.md (3.38.0 entry, tag @chakra-ui/react@3.38.0, retrieved 2026-11-14)

## Related

- [select.md](./select.md)
- [listbox.md](./listbox.md)
