# JSON Tree View

Displays JSON data in an interactive, collapsible tree structure. Supports a wide range of JavaScript data types and follows the WAI-ARIA tree view keyboard interaction pattern.

## Signature / Usage

```tsx
import { JsonTreeView } from '@ark-ui/react/json-tree-view'

export const Basic = () => (
  <JsonTreeView.Root data={{ name: 'Ark UI', version: 1 }}>
    <JsonTreeView.Tree>
      {(node) => (
        <JsonTreeView.Node key={node.id}>
          <JsonTreeView.Label />
        </JsonTreeView.Node>
      )}
    </JsonTreeView.Tree>
  </JsonTreeView.Root>
)
```

## Anatomy

- `JsonTreeView.Root` — container for the entire tree view
- `JsonTreeView.Tree` — main tree rendering component
- `JsonTreeView.Node` — individual expandable/collapsible item
- `JsonTreeView.Label` — node identifier and value
- `JsonTreeView.Arrow` — expand/collapse indicator icon

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
| `renderValue` | `(node) => ReactNode` | Custom renderer for leaf values |

## Notes

- Supports lazy mounting and asynchronous child loading for large datasets.
- Supports single/multiple selection modes and typeahead search.
- Keyboard navigation: Tab to focus, arrow keys to navigate, Enter/Space to select, `*` to expand siblings, character keys for typeahead — following the WAI-ARIA tree view pattern.
- Every part exposes a `data-part` attribute for DOM identification/styling.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Highlight](./highlight.md)
