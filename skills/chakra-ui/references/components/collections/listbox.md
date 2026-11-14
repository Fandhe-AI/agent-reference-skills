# Listbox

Scrollable list of selectable items without a dropdown trigger.

## Import

```tsx
import { Listbox, createListCollection } from "@chakra-ui/react"
```

## Usage

```tsx
const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
})

<Listbox.Root collection={frameworks} width="320px">
  <Listbox.Label>Select framework</Listbox.Label>
  <Listbox.Content>
    {frameworks.items.map((item) => (
      <Listbox.Item item={item} key={item.value}>
        <Listbox.ItemText>{item.label}</Listbox.ItemText>
        <Listbox.ItemIndicator />
      </Listbox.Item>
    ))}
  </Listbox.Content>
</Listbox.Root>
```

## Props

### Listbox.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `collection` | `ListCollection<T>` | **required** | The collection of items |
| `variant` | `"subtle" \| "solid" \| "plain"` | `"subtle"` | The visual variant |
| `colorPalette` | `string` | `"gray"` | The color palette |
| `selectionMode` | `"single" \| "multiple" \| "extended"` | `"single"` | Selection behavior |
| `deselectable` | `boolean` | — | Whether selected items can be deselected |
| `loopFocus` | `boolean` | `false` | Whether keyboard navigation loops |
| `typeahead` | `boolean` | — | Whether typeahead search is enabled |
| `disabled` | `boolean` | — | Whether the listbox is disabled |
| `defaultValue` | `string[]` | `[]` | Initial selected values |
| `value` | `string[]` | — | Controlled selected values |
| `onValueChange` | `(details: ValueChangeDetails) => void` | — | Callback when selection changes |

### Listbox.Input

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoHighlight` | `boolean` | `false` | Whether to automatically highlight the item when typing |
| `keyboardPriority` | `"caret" \| "navigate"` | `"caret"` | How keyboard conflicts in the input are resolved: `"caret"` keeps native text-editing behavior, `"navigate"` forwards supported keys to listbox navigation |

## Sub-parts

`Root`, `Label`, `Content`, `Input`, `Item`, `ItemText`, `ItemIndicator`, `ItemGroup`, `ItemGroupLabel`, `Empty`, `ValueText`

## Variants

- **variants**: `subtle`, `solid`, `plain`

## Notes

- Unlike `Select`, `Listbox` renders items inline (no dropdown), making it suitable for visible selection panels.
- `selectionMode: "extended"` allows range selection with Shift+click.
- 3.35.0 (Ark UI 5.36.0): `keyboardPriority` for Home/End and arrow keys in the input, and the api methods `highlightFirst`, `highlightLast`, `highlightNext` and `highlightPrevious`.
- 3.38.0 (Ark UI 5.39.3): `Listbox.ItemText` now renders a `span` instead of a `div` (ref typed as `HTMLSpanElement`), and Shift+click range selection anchors on the clicked item instead of the highlighted one. Listbox items use `tokens.cursor.option`.
- Source: https://github.com/chakra-ui/chakra-ui/blob/f0387b6e832a41663eb7186a375db7879337724e/packages/react/CHANGELOG.md (3.38.0 entry, tag @chakra-ui/react@3.38.0, retrieved 2026-11-14)

## Related

- [select.md](./select.md)
- [combobox.md](./combobox.md)
