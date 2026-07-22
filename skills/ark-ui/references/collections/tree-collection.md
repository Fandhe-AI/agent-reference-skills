# Tree Collection

A tree collection manages hierarchical data structures like file systems, navigation menus, or organization charts. It provides methods for traversing, manipulating, and querying tree structures. Tree collections are immutable — all modification methods return a new tree instance rather than modifying the original.

## Signature / Usage

```tsx
import { createTreeCollection } from "@ark-ui/react/collection"

const tree = createTreeCollection({
  rootNode: {
    value: "root",
    label: "Root",
    children: [
      { value: "child-1", label: "Child 1" },
      { value: "child-2", label: "Child 2" },
    ],
  },
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `rootNode` | `T` | The root node of the tree |
| `nodeToValue` | `(node: T) => string` | Maps a node to its value identifier |
| `nodeToString` | `(node: T) => string` | Extracts the display text from a node |
| `nodeToChildren` | `(node: T) => T[]` | Specifies the children property of a node |
| `isNodeDisabled` | `(node: T) => boolean` | Marks a node as disabled |

## Methods

| Name | Description |
|------|-------------|
| `getFirstNode()` / `getLastNode()` | Returns the first/last node in traversal order |
| `getNextNode(value)` / `getPreviousNode(value)` | Moves forward/backward in tree traversal sequence |
| `getParentNode(value)` / `getParentNodes(value)` | Retrieves the immediate parent / all ancestor nodes |
| `getDescendantNodes(value)` / `getDescendantValues(value)` | Returns descendant nodes / descendant values |
| `getNextSibling(indexPath)` / `getPreviousSibling(indexPath)` / `getSiblingNodes(indexPath)` | Sibling navigation |
| `getIndexPath(value)` | Determines the index path of a value |
| `getValue(indexPath)` / `getValuePath(indexPath)` | Retrieves a value / full ancestor chain from an index path |
| `at(indexPath)` | Accesses the node at a specific index path |
| `isBranchNode(node)` | Checks whether a node has children |
| `getBranchValues()` | Lists all parent (branch) node values |
| `visit(options)` | Traverses the tree with custom logic and skip capability |
| `filter(callback)` | Creates a filtered subset of the tree |
| `insertAfter(indexPath, nodes)` / `insertBefore(indexPath, nodes)` | Adds nodes relative to a target index path |
| `remove(indexPaths)` | Deletes the specified nodes |
| `move(fromPaths, toPath)` | Relocates nodes to a new parent |
| `replace(indexPath, node)` | Substitutes an existing node |
| `flatten()` | Converts the tree to a flat array with depth metadata |
| `getValues()` | Retrieves all node values in traversal order |
| `getDepth(value)` | Calculates a node's distance from the root |

## Notes

- All modification methods (`insertAfter`, `insertBefore`, `remove`, `move`, `replace`) return a new tree instance; the original tree is never mutated.
- `createFileTreeCollection(paths)` builds a hierarchical tree from an array of file path strings.

## Related

- [List Collection](./list-collection.md)
- [Async List](./async-list.md)
- [List Selection](./list-selection.md)
