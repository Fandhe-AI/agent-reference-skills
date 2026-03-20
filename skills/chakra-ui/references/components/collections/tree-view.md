# Tree View

Hierarchical tree structure with expand/collapse, selection, and async loading support.

## Import

```tsx
import { TreeView, createTreeCollection } from "@chakra-ui/react"
```

## Usage

```tsx
const collection = createTreeCollection({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "root",
    name: "",
    children: [
      {
        id: "src",
        name: "src",
        children: [
          { id: "app.tsx", name: "app.tsx" },
          { id: "index.ts", name: "index.ts" },
        ],
      },
      { id: "package.json", name: "package.json" },
    ],
  },
})

<TreeView.Root collection={collection}>
  <TreeView.Label>Files</TreeView.Label>
  <TreeView.Tree>
    <TreeView.Node
      render={({ node, nodeState }) =>
        nodeState.isBranch ? (
          <TreeView.BranchControl>
            <TreeView.BranchText>{node.name}</TreeView.BranchText>
          </TreeView.BranchControl>
        ) : (
          <TreeView.Item>
            <TreeView.ItemText>{node.name}</TreeView.ItemText>
          </TreeView.Item>
        )
      }
    />
  </TreeView.Tree>
</TreeView.Root>
```

## Props

### TreeView.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `collection` | `TreeCollection<T>` | **required** | The tree collection |
| `size` | `"xs" \| "sm" \| "md"` | `"md"` | The size of the tree |
| `variant` | `"subtle" \| "solid"` | `"subtle"` | The visual variant |
| `colorPalette` | `string` | `"gray"` | The color palette |
| `selectionMode` | `"single" \| "multiple"` | `"single"` | Node selection behavior |
| `expandOnClick` | `boolean` | `true` | Whether clicking a branch expands it |
| `defaultExpandedValue` | `string[]` | — | Initially expanded node ids |
| `defaultSelectedValue` | `string[]` | — | Initially selected node ids |
| `selectedValue` | `string[]` | — | Controlled selected node ids |
| `expandedValue` | `string[]` | — | Controlled expanded node ids |
| `loadChildren` | `(details: LoadChildrenDetails<T>) => Promise<T[]>` | — | Async function to load branch children |
| `typeahead` | `boolean` | `true` | Whether typeahead search is enabled |
| `onSelectionChange` | `(details: SelectionChangeDetails<T>) => void` | — | Callback when selection changes |
| `onExpandedChange` | `(details: ExpandedChangeDetails<T>) => void` | — | Callback when expanded state changes |
| `onLoadChildrenComplete` | `(details: LoadChildrenCompleteDetails<T>) => void` | — | Callback when async children load |

## Sub-parts

`Root`, `Tree`, `Label`, `Node`, `NodeCheckbox`, `Branch`, `BranchControl`, `BranchTrigger`, `BranchText`, `BranchContent`, `BranchIndicator`, `BranchIndentGuide`, `Item`, `ItemText`, `ItemIndicator`

## Variants / Sizes

- **sizes**: `xs`, `sm`, `md`
- **variants**: `subtle`, `solid`

## Notes

- Use `createTreeCollection` (not `createListCollection`) to build the required `collection` prop.
- The `TreeView.Node` component uses a `render` prop that receives `{ node, nodeState }` — use `nodeState.isBranch` to differentiate branch vs. leaf rendering.
- `loadChildren` enables async lazy-loading of branch children.

## Related

- [listbox.md](./listbox.md)
- [select.md](./select.md)
