# Select with List Collection

Back a `Select` with a `createListCollection`, then map `collection.items` to render options.

```tsx
import { Select } from '@ark-ui/react/select'
import { createListCollection } from '@ark-ui/react/collection'

const collection = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
  ],
})

export const Example = () => (
  <Select.Root collection={collection}>
    <Select.Label>Framework</Select.Label>
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText placeholder="Select framework" />
      </Select.Trigger>
      <Select.Indicator />
    </Select.Control>
    <Select.Positioner>
      <Select.Content>
        <Select.ItemGroup>
          {collection.items.map((item) => (
            <Select.Item key={item.value} item={item}>
              <Select.ItemText>{item.label}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.ItemGroup>
      </Select.Content>
    </Select.Positioner>
    <Select.HiddenSelect />
  </Select.Root>
)
```

## Notes

- `Select.Item` receives the raw collection item via the `item` prop; `Select.ItemText` reads its display label through `itemToString` (default: `item.label`).
- `Select.HiddenSelect` renders a native `<select>` in sync with the state, keeping standard HTML form submission working.
- For non-`{ label, value }` item shapes, pass `itemToString` / `itemToValue` to `createListCollection`.
