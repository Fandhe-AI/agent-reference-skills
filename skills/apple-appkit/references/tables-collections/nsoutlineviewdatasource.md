# NSOutlineViewDataSource

A protocol that provides hierarchical data to an `NSOutlineView` and optionally supports editing, sorting, and drag-and-drop.

## Signature / Usage

```swift
protocol NSOutlineViewDataSource: NSObjectProtocol
```

```swift
class MyDataSource: NSObject, NSOutlineViewDataSource {
    func outlineView(_ outlineView: NSOutlineView,
                     numberOfChildrenOfItem item: Any?) -> Int {
        guard let node = item as? TreeNode else { return rootNodes.count }
        return node.children.count
    }

    func outlineView(_ outlineView: NSOutlineView,
                     child index: Int,
                     ofItem item: Any?) -> Any {
        guard let node = item as? TreeNode else { return rootNodes[index] }
        return node.children[index]
    }

    func outlineView(_ outlineView: NSOutlineView,
                     isItemExpandable item: Any) -> Bool {
        return (item as? TreeNode)?.children.isEmpty == false
    }

    func outlineView(_ outlineView: NSOutlineView,
                     objectValueFor tableColumn: NSTableColumn?,
                     byItem item: Any?) -> Any? {
        return (item as? TreeNode)?.title
    }
}
```

## Options / Props

**Required (without Cocoa Bindings):**

| Method | Description |
|---|---|
| `outlineView(_:numberOfChildrenOfItem:)` | Number of children for a given item (`nil` = root) |
| `outlineView(_:child:ofItem:)` | The child item at the given index |
| `outlineView(_:isItemExpandable:)` | Whether the item can be expanded |
| `outlineView(_:objectValueFor:byItem:)` | Data value for a cell (cell-based) |

**Optional:**

| Method | Description |
|---|---|
| `outlineView(_:setObjectValue:for:byItem:)` | Handle user edits |
| `outlineView(_:sortDescriptorsDidChange:)` | Respond to sort descriptor changes |
| `outlineView(_:persistentObjectForItem:)` | Archive an item for state persistence |
| `outlineView(_:itemForPersistentObject:)` | Restore an item from archived state |
| `outlineView(_:pasteboardWriterForItem:)` | Enable multi-item drag |
| `outlineView(_:validateDrop:proposedItem:proposedChildIndex:)` | Validate a drop target |
| `outlineView(_:acceptDrop:item:childIndex:)` | Handle accepted drop |
| `outlineView(_:draggingSession:willBeginAt:forItems:)` | Respond to drag session start |
| `outlineView(_:draggingSession:endedAt:operation:)` | Respond to drag session end |
| `outlineView(_:updateDraggingItemsForDrag:)` | Update drag items mid-drag |

## Notes

- macOS only.
- `nil` item always refers to the root level.
- Each item object must be unique and return consistent `isEqual(_:)` results across reloads to preserve expansion state.
- Data-returning methods are called frequently; keep them efficient.

## Related

- [NSOutlineView](./nsoutlineview.md)
- [NSTableViewDataSource](./nstableviewdatasource.md)
