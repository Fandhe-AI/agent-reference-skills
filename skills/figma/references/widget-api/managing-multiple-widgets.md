# Managing Multiple Widgets

Patterns for coordinating multiple widget instances in the same file using Plugin API alongside Widget API.

## Signature / Usage

```tsx
const widgetId = useWidgetId()

<AutoLayout onClick={async () => {
  // Find all instances of this widget in the file
  const myWidgets = figma.findWidgetNodesByWidgetId(
    figma.currentPage.findChild(n => n.id === widgetId)!.widgetId
  )

  // Read synced state of each instance
  const totalVotes = myWidgets.reduce((sum, w) => {
    return sum + (w.widgetSyncedState["votes"] ?? 0)
  }, 0)

  setTotal(totalVotes)
}}>
  <Text>Tally</Text>
</AutoLayout>
```

## Options / Props

| Plugin API member | Description |
|-------------------|-------------|
| `WidgetNode.widgetId` | Corresponds to the `id` field in `manifest.json`; identifies widget family |
| `figma.findWidgetNodesByWidgetId(id)` | Returns all `WidgetNode` instances with the given `widgetId` |
| `WidgetNode.widgetSyncedState` | Read-only access to the widget instance's synced state (own widget only) |
| `WidgetNode.cloneWidget(state)` | Clone the widget node with custom initial synced state |
| `WidgetNode.setWidgetSyncedState(state)` | Update an existing widget node's synced state from outside |

## Notes

- `widgetSyncedState` is only readable for widgets sharing the same `widgetId` — cross-widget state access is intentionally restricted.
- Use `cloneWidget` + `setWidgetSyncedState` to build org-chart or board-style multi-widget experiences.
- These Plugin API calls must happen inside event handlers or `useEffect`, not in rendering code.

## Related

- [useWidgetId](./useWidgetId.md)
- [useSyncedState](./useSyncedState.md)
- [using-the-plugin-api](./using-the-plugin-api.md)
