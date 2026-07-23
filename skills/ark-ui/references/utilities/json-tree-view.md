# JSON Tree View

Displays JSON data in an interactive, collapsible tree structure. Supports a wide range of JavaScript data types and follows the WAI-ARIA tree view keyboard interaction pattern.

## Signature / Usage

```tsx
import { JsonTreeView } from '@ark-ui/react/json-tree-view'
import { ChevronRightIcon } from 'lucide-react'

const data = {
  name: 'Ark UI',
  version: 1,
  tags: ['headless', 'accessible'],
  address: { city: 'Anytown', coordinates: { lat: 37.77, lng: -122.42 } },
}

export const Basic = () => (
  <JsonTreeView.Root data={data} defaultExpandedDepth={1}>
    <JsonTreeView.Tree arrow={<ChevronRightIcon />} />
  </JsonTreeView.Root>
)
```

Nested objects/arrays inside `data` (e.g. `address.coordinates`) are expanded recursively by `JsonTreeView.Tree` itself — no manual per-node mapping is required, unlike `TreeView` (see [Tree View](../components/collections/tree-view.md)).

## Anatomy

- `JsonTreeView.Root` — container that owns the `data` and state (expansion/selection/checked/rename)
- `JsonTreeView.Tree` — self-contained recursive renderer; accepts `arrow`, `indentGuide`, `renderValue` for presentation

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `data` | `unknown` | JSON-compatible data to render (objects, arrays, primitives, functions, Map/Set, RegExp, Error, etc.) |
| `defaultExpandedDepth` | `number` | Controls how many levels are expanded initially |
| `quotesOnKeys` | `boolean` | Display quotes around object keys |
| `showNonenumerable` | `boolean` | Reveal non-enumerable properties |
| `maxPreviewItems` | `number` | Limit the number of items shown in collapsed previews |
| `collapseStringsAfterLength` | `number` | Truncate long string values |
| `groupArraysAfterLength` | `number` | Group large arrays instead of listing every item |
| `arrow` (on `Tree`) | `ReactElement` | Icon used for the expand/collapse indicator |
| `indentGuide` (on `Tree`) | `boolean \| ReactElement` | Visual guide line for indentation |
| `renderValue` (on `Tree`) | `(node: JsonNodeHastElement) => ReactNode` | Custom renderer for leaf values |

## Notes

- Supports lazy mounting and asynchronous child loading for large datasets.
- Supports single/multiple selection modes and typeahead search.
- Keyboard navigation: Tab to focus, arrow keys to navigate, Enter/Space to select, `*` to expand siblings, character keys for typeahead — following the WAI-ARIA tree view pattern.
- Every part exposes a `data-part` attribute for DOM identification/styling.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Highlight](./highlight.md)
- [Tree View](../components/collections/tree-view.md)
