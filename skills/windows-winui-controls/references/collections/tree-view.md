# TreeView

Displays a hierarchical list with expanding/collapsing nodes, using indentation and chevron icons to show parent/child relationships. Supports N-level nesting, single/multi selection, and drag-and-drop between tree views.

## Signature / Usage

```xaml
<TreeView ItemsSource="{x:Bind DataSource}">
    <TreeView.ItemTemplate>
        <DataTemplate x:DataType="local:Item">
            <TreeViewItem ItemsSource="{x:Bind Children}" Content="{x:Bind Name}"/>
        </DataTemplate>
    </TreeView.ItemTemplate>
</TreeView>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ItemsSource` | `object` | Hierarchical data source; each item's child items are bound through `TreeViewItem.ItemsSource` in the `ItemTemplate`. |
| `RootNodes` | `IVector<TreeViewNode>` | Alternative to `ItemsSource` — add `TreeViewNode` objects directly to build the hierarchy manually. |
| `ItemTemplate` / `ItemTemplateSelector` | `DataTemplate` / `DataTemplateSelector` | Defines/selects the visual for each node's data item. |
| `SelectionMode` | `TreeViewSelectionMode` | `None` (default), `Single`, `Multiple`. Multi-select shows a checkbox per node; selecting a parent selects/deselects all its children (indeterminate state if only some children are selected). |
| `SelectedNode` / `SelectedNodes` | `TreeViewNode` / collection | Selected node(s). |
| `SelectedItem` / `SelectedItems` | `object` / collection | Content of the selected node(s) directly (shortcut over `SelectedNodes`). |
| `ItemContainerStyle` | `Style` | Styles the `TreeViewItem` container (e.g., `CollapsedGlyph`/`ExpandedGlyph`/`GlyphBrush`). |

### TreeViewNode

| Name | Type | Description |
|------|------|-------------|
| `Content` | `object` | The data item the node represents. |
| `Children` | `IVector<TreeViewNode>` | Child nodes; add nodes here to build the hierarchy. |
| `HasChildren` | `bool` | `true` if the node has realized children. |
| `HasUnrealizedChildren` | `bool` | App-managed flag indicating children exist but haven't been added yet (drives the expand/collapse chevron for lazily-filled nodes). |
| `IsExpanded` | `bool` | Expand/collapse state; settable in XAML or code. |
| `Depth` | `int` | Distance from the root node. |
| `Parent` | `TreeViewNode` | Owning node, or `null` for root nodes. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from WPF `TreeView` and web tree components.
- **The `TreeView` control is not UI-virtualized.** For large or unknown-size hierarchies, fill each node lazily: handle the `Expanding` event, check `HasUnrealizedChildren`, and populate `Children` on demand; optionally handle `Collapsed` to clear `Children` and reset `HasUnrealizedChildren = true`, trading re-fetch cost for lower memory use.
- Invoking an item (`ItemInvoked` event) is always enabled (unlike `ListView.IsItemClickEnabled`, which must be opted into).
- `SelectAll` only selects currently *realized* nodes, regardless of `SelectionMode` — call it only when `SelectionMode` is `Multiple` for a consistent UX. Selection of unrealized children is deferred until they are realized.

## Related

- [ListView](./list-view.md)
- [ItemsControl](./items-control.md)
