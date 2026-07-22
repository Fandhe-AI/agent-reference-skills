# Combobox with Filtering

Filter a list collection as the user types with `useListCollection` and a `useFilter` matcher, reacting to `onInputValueChange`.

```tsx
import { Combobox, useListCollection } from '@ark-ui/react/combobox'
import { useFilter } from '@ark-ui/react/locale'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
]

export const Example = () => {
  const { contains } = useFilter({ sensitivity: 'base' })
  const { collection, filter } = useListCollection({
    initialItems: items,
    filter: contains,
  })

  return (
    <Combobox.Root collection={collection} onInputValueChange={(e) => filter(e.inputValue)}>
      <Combobox.Label>Framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.Trigger>▼</Combobox.Trigger>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.List>
            {collection.items.map((item) => (
              <Combobox.Item key={item.value} item={item}>
                <Combobox.ItemText>{item.label}</Combobox.ItemText>
              </Combobox.Item>
            ))}
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  )
}
```

## Notes

- `useListCollection` (from `@ark-ui/react/combobox`) manages the item list and exposes a `filter(query)` helper; it needs a `filter` matcher function to know how to compare items to the query.
- `useFilter` (from `@ark-ui/react/locale`) provides locale-aware matchers such as `contains`, `startsWith`, and `endsWith` built on `Intl.Collator`.
- Call `filter(e.inputValue)` inside `Combobox.Root`'s `onInputValueChange` so `collection.items` narrows on every keystroke.
