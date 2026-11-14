# Command

Used to build searchable command menus, search dialogs, and pickers. Added in Chakra UI 3.38.0. Items are data that `useCommandCollection` ranks as you type; `Command.Provider` shares the result with the dialog and the root.

## Signature / Usage

```tsx
import { Command, Portal, useCommandCollection } from "@chakra-ui/react"
```

Part structure (verbatim from the official page):

```jsx
<Command.Provider>
  <Command.Dialog>
    <Command.DialogTrigger />
    <Portal>
      <Command.DialogBackdrop />
      <Command.DialogContent>
        <Command.Root>
          <Command.Label />
          <Command.Control>
            <Command.Indicator />
            <Command.Input />
            <Command.ClearTrigger />
          </Command.Control>
          <Command.List>
            <Command.Loading />
            <Command.ItemGroup>
              <Command.ItemGroupLabel />
              <Command.Item>
                <Command.ItemText />
                <Command.ItemCommand />
              </Command.Item>
            </Command.ItemGroup>
            <Command.Separator />
            <Command.Empty />
          </Command.List>
          <Command.Footer />
        </Command.Root>
      </Command.DialogContent>
    </Portal>
  </Command.Dialog>
</Command.Provider>
```

Sharing the collection (verbatim):

```tsx
const command = useCommandCollection({ initialItems: commands })

<Command.Provider value={command}>
  <Command.Dialog>
    <Portal>
      <Command.DialogBackdrop />
      <Command.DialogContent>
        <Command.Root>{/* ... */}</Command.Root>
      </Command.DialogContent>
    </Portal>
  </Command.Dialog>
</Command.Provider>
```

Adapted (not in the official docs): a minimal runnable composition condensed from the official `command-basic` example (icons, footer and shortcut hints removed).

```tsx
import { Button, Command, Portal, useCommandCollection } from "@chakra-ui/react"

const commands = [
  { label: "New file", value: "new-file" },
  { label: "Open settings", value: "settings" },
]

export const CommandMinimal = () => {
  const command = useCommandCollection({ initialItems: commands })

  return (
    <Command.Provider value={command}>
      <Command.Dialog>
        <Command.DialogTrigger asChild>
          <Button variant="outline" size="sm">Search commands...</Button>
        </Command.DialogTrigger>
        <Portal>
          <Command.DialogBackdrop />
          <Command.DialogContent>
            <Command.Root>
              <Command.Control>
                <Command.Indicator />
                <Command.Input placeholder="Type a command or search..." />
              </Command.Control>
              <Command.List>
                {command.collection.items.map((item) => (
                  <Command.Item item={item} key={item.value}>
                    <Command.ItemText highlight>{item.label}</Command.ItemText>
                  </Command.Item>
                ))}
                <Command.Empty>No commands found</Command.Empty>
              </Command.List>
            </Command.Root>
          </Command.DialogContent>
        </Portal>
      </Command.Dialog>
    </Command.Provider>
  )
}
```

Nested pages (verbatim): give an item a `parent` to put it on that item's page.

```tsx
const command = useCommandCollection({
  initialItems: [
    { label: "Change status...", value: "status" },
    { label: "Done", value: "status:done", parent: "status" },
  ],
  deepSearch: true,
})
```

Bring your own data (verbatim): control the query and pass results in, with `filter: null` so server results show as returned.

```tsx
const [query, setQuery] = useState("")
const people = useQuery({
  queryKey: ["people", query],
  queryFn: () => searchPeople(query),
})

const command = useCommandCollection({
  initialItems: people.data ?? [],
  query,
  onQueryChange: setQuery,
  filter: null,
})

<Command.Root command={command} loading={people.isFetching}>
  {/* ... */}
</Command.Root>
```

Controlling the dialog from outside (condensed from the official `command-with-root-provider` example): `useCommand({ command, onClose })` returns a store passed to `Command.RootProvider value={store}`, and `Command.Dialog` accepts `open` / `onOpenChange`.

## Options / Props

`useCommandCollection` options (from `use-command-collection.ts` at tag `@chakra-ui/react@3.38.0`):

| Option | Type | Description |
| --- | --- | --- |
| `initialItems` | `T[]` | Items to rank, as data (`{ label, value, onSelect?, keywords?, parent?, page?, disabled? }`) |
| `filter` | `((item, query) => number) \| null` | Custom score function; `null` shows items as returned (cmdk `shouldFilter={false}`) |
| `limit` | `number` | Maximum number of items to show |
| `load` | `(details) => Promise<T[] \| { items, cursor }>` | Fetch items as you type; receives `query`, `page`, `signal`, `cursor` |
| `query` / `onQueryChange` | `string` / `(query: string) => void` | Control the query in your own state |
| `filterQuery` | `string` | Query used for ranking, e.g. `useDeferredValue(query)` for virtualized lists |
| `deepSearch` | `boolean` | Match items inside nested pages |
| `groupBy` | `(item, index) => string` | (inherited collection option) Group items; ranked within each group, group order fixed |
| `onPageChange` | `(page: T \| null) => void` | Called when the open page changes |

Returned object includes `collection`, `query`, `search`, `loading`, `error`, `reload`, `hasMore`, `loadMore`, `page`, `pages`, `setPage`, `popPage`, `isPage`, `getPath`, `reset`, `highlightedValue`, `getFirstMatch`.

Sub-parts: `Provider`, `Dialog`, `DialogTrigger`, `DialogBackdrop`, `DialogContent`, `Root`, `RootProvider`, `Label`, `Control`, `Indicator`, `Input`, `ClearTrigger`, `List`, `Loading`, `ItemGroup`, `ItemGroupLabel`, `Item`, `ItemText`, `ItemCommand`, `Separator`, `Empty`, `Footer`. Sizes: `Command.Root` `size` sets density, `Command.Dialog` `size` sets width.

## Notes

- Source: https://chakra-ui.com/docs/components/command (docs source: https://github.com/chakra-ui/chakra-ui/blob/f0387b6e832a41663eb7186a375db7879337724e/apps/www/content/docs/components/command.mdx, tag @chakra-ui/react@3.38.0, retrieved 2026-11-14)
- Source: https://github.com/chakra-ui/chakra-ui/blob/f0387b6e832a41663eb7186a375db7879337724e/packages/react/CHANGELOG.md (3.38.0 entry: "[New] Command")
- Selecting an item runs its `onSelect` and closes the dialog. Set `closeOnSelect: false` on the item, or on `Root`, to keep it open. Holding Cmd, Ctrl, Shift or Alt while selecting keeps the dialog open (`onSelect` receives them as `modifiers`). The dialog clears the query after it closes.
- There is no built-in shortcut to open the dialog; bind Cmd+K with the tool your app already uses (see the `useHotkeys` / `useCommand` + `Command.RootProvider` examples on the official page).
- Command runs actions and keeps no selected value. For a picker with a persistent selection, use Combobox or Listbox.
- Nested pages: selecting an item with children opens its page; Escape goes back, then closes the dialog; Backspace on an empty input goes up a page. `command.pages` is the trail for a breadcrumb; `command.getPath(item)` returns where a deep-search match lives; `command.reset("status")` before opening opens a page directly.
- Virtualized lists: pass a deferred copy of the query as `filterQuery` so typing stays responsive.
- Official inconsistency: the 3.38.0 release-note snippet uses `Command.Trigger` / `Command.Backdrop` / `Command.Positioner` / `Command.Panel` and `Command.Root collection=...`, and `apps/www/public/r/types/command.json` lists the same parts. The docs page, examples and `packages/react/src/components/command/index.ts` at the tag export `Command.Dialog` / `DialogTrigger` / `DialogBackdrop` / `DialogContent` / `Provider`. This page follows the docs page and the exports.
- Import from `@chakra-ui/react` (the release note describes it as built on `Combobox` and `Dialog`); do not mix in `@ark-ui/react` imports or props. The cmdk library (`cmdk`) has a different item model (elements filtered in the DOM vs. data ranked by `useCommandCollection`); the official page has a cmdk-to-Chakra mapping table (`<Command.Group heading>` becomes `ItemGroup` + `ItemGroupLabel`, `shouldFilter={false}` becomes `filter: null`).

## Related

- [Combobox](../collections/combobox.md)
- [Listbox](../collections/listbox.md)
- [Dialog](./dialog.md)
- [Kbd](../typography/kbd.md)
