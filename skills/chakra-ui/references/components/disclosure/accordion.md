# Accordion

A vertically stacked set of interactive headings that reveal or hide associated sections of content.

## Import

```tsx
import { Accordion } from "@chakra-ui/react"
```

## Usage

```tsx
<Accordion.Root collapsible defaultValue={["b"]}>
  {items.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.ItemTrigger>
        <Span flex="1">{item.title}</Span>
        <Accordion.ItemIndicator />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody>{item.text}</Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  ))}
</Accordion.Root>
```

## Props

### Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `collapsible` | `boolean` | `false` | Whether an item can be collapsed after being expanded |
| `multiple` | `boolean` | `false` | Whether multiple items can be expanded at once |
| `value` | `string[]` | — | Controlled value of expanded items |
| `defaultValue` | `string[]` | — | Initial expanded items (uncontrolled) |
| `disabled` | `boolean` | — | Whether all items are disabled |
| `orientation` | `'horizontal' \| 'vertical'` | `"vertical"` | Orientation of the accordion |
| `lazyMount` | `boolean` | `false` | Whether to enable lazy mounting |
| `unmountOnExit` | `boolean` | `false` | Whether to unmount content on exit |
| `onValueChange` | `(details: ValueChangeDetails) => void` | — | Callback when expanded items change |
| `variant` | `"outline" \| "subtle" \| "enclosed" \| "plain"` | `"outline"` | Visual variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size of the component |
| `colorPalette` | `"gray" \| "red" \| ...` | `"gray"` | Color palette |

### Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | **Required.** Unique value for the item |
| `disabled` | `boolean` | — | Whether the item is disabled |

## Variants / Sizes

- **variant**: `"outline"` (default), `"subtle"`, `"enclosed"`, `"plain"`
- **size**: `"sm"`, `"md"` (default), `"lg"`

## Notes

- Use `collapsible` to allow the active item to be closed by clicking its trigger again
- Use `multiple` to allow more than one item open at a time
- `Accordion.ItemBody` provides internal padding inside `Accordion.ItemContent`
- Use `useAccordionItemContext()` hook to access item open state in child components

## Related

- [Collapsible](./collapsible.md)
- [Tabs](./tabs.md)
