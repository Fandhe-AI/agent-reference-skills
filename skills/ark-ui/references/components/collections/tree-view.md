# Tree View

Displays hierarchical data with controlled expansion/selection, lazy loading, virtualization, checkboxes, filtering, and inline renaming.

## Signature / Usage

```tsx
import { TreeView, createTreeCollection } from "@ark-ui/react"

interface Node {
  id: string
  name: string
  children?: Node[]
}

const collection = createTreeCollection<Node>({
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      { id: "node1", name: "Node 1" },
      { id: "node2", name: "Node 2", children: [{ id: "node2.1", name: "Node 2.1" }] },
    ],
  },
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
})

// Recursive: branch nodes (with children) render TreeView.Branch, leaf nodes render TreeView.Item.
// indexPath must be extended for each nesting level so deep nodes render correctly.
const TreeNode = ({ node, indexPath }: { node: Node; indexPath: number[] }) => {
  return (
    <TreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      {node.children ? (
        <TreeView.Branch>
          <TreeView.BranchControl>
            <TreeView.BranchIndicator>▶</TreeView.BranchIndicator>
            <TreeView.BranchText>{node.name}</TreeView.BranchText>
          </TreeView.BranchControl>
          <TreeView.BranchContent>
            <TreeView.BranchIndentGuide />
            {node.children.map((child, index) => (
              <TreeNode key={child.id} node={child} indexPath={[...indexPath, index]} />
            ))}
          </TreeView.BranchContent>
        </TreeView.Branch>
      ) : (
        <TreeView.Item>
          <TreeView.ItemText>{node.name}</TreeView.ItemText>
        </TreeView.Item>
      )}
    </TreeView.NodeProvider>
  )
}

const App = () => (
  <TreeView.Root collection={collection}>
    <TreeView.Label>Tree</TreeView.Label>
    <TreeView.Tree>
      {collection.rootNode.children?.map((node, index) => (
        <TreeNode key={node.id} node={node} indexPath={[index]} />
      ))}
    </TreeView.Tree>
  </TreeView.Root>
)
```

## Anatomy

- `TreeView.Root` — main container
- `TreeView.Label` — optional heading
- `TreeView.Tree` — container for all nodes
- `TreeView.NodeProvider` — context wrapper for individual nodes
- `TreeView.Branch` — parent node with expandable content
  - `TreeView.BranchControl` — header area
  - `TreeView.BranchIndicator` — toggle icon
  - `TreeView.BranchText` — label text
  - `TreeView.BranchContent` — collapsible children area
  - `TreeView.BranchIndentGuide` — visual indent line
- `TreeView.Item` — leaf node
  - `TreeView.ItemText` — label text
  - `TreeView.ItemIndicator` — selection/checkbox indicator

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `collection` | `TreeCollection` | Tree data source, built via `createTreeCollection` |
| `expandedValue` / `defaultExpandedValue` | `string[]` | Expansion state |
| `selectedValue` / `defaultSelectedValue` | `string[]` | Selection state |
| `checkedValue` / `defaultCheckedValue` | `string[]` | Checkbox mode state |
| `lazyMount` | `boolean` | Render content only when expanded |
| `unmountOnExit` | `boolean` | Unmount content when collapsed |
| `loadChildren` | `function` | Async loader for child nodes |
| `onExpandedChange` / `onSelectionChange` / `onCheckedChange` | `function` | Event callbacks |
| `canRename` / `onRenameComplete` | `function` | Enable inline node renaming |
| `selectionMode` | `"single" \| "multiple"` | Selection behavior |
| `typeahead` | `boolean` | Enable keyboard search (default: `true`) |

## Notes

- Complies with the WAI-ARIA Tree View pattern. Keyboard: Arrow keys to navigate, Enter/Space to select, Home/End for boundaries, `*` to expand all siblings, Shift+Arrow for multi-select, Ctrl+A to select all.
- Data attributes: `[data-state="open"|"closed"]`, `[data-selected]`, `[data-checked]`, `[data-focus]`, `[data-depth]`, `[data-loading]`, `[data-disabled]`.
- Requires a collection built with `createTreeCollection`; the `useTreeView` hook provides programmatic control over expansion, selection, and other state.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Listbox](./listbox.md)
