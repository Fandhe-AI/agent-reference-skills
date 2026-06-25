# ToolbarItem

A model that represents an item that can be placed in the toolbar or navigation bar.

## Signature / Usage

```swift
// Fixed placement
ToolbarItem(placement: .primaryAction) {
    Button("Save") { save() }
}

// Customizable (requires String id)
ToolbarItem(id: "share", placement: .primaryAction) {
    ShareLink(item: document)
}
```

## Options / Props

| Initializer | Description |
|-------------|-------------|
| `init(placement:content:)` | Non-customizable item at the specified placement. |
| `init(id:placement:content:)` | User-customizable item; `id` must be unique and stable. |

### ToolbarItemPlacement values

| Value | Description |
|-------|-------------|
| `.automatic` | System-determined placement. |
| `.principal` | Centered/title area (navigation bar center on iOS). |
| `.navigation` | Navigation actions (back/forward). |
| `.primaryAction` | Primary action (trailing on iOS, toolbar on macOS). |
| `.secondaryAction` | Secondary actions. |
| `.confirmationAction` | Confirm action in a modal. |
| `.cancellationAction` | Cancel action in a modal. |
| `.destructiveAction` | Destructive action in a modal. |
| `.status` | Status display. |
| `.bottomBar` | iOS bottom toolbar. |
| `.topBarLeading` | Leading edge of the top bar. |
| `.topBarTrailing` | Trailing edge of the top bar. |
| `.keyboard` | Above the keyboard. |

## Notes

- Available: iOS 14+, iPadOS 14+, macOS 11+, tvOS 14+, watchOS 7+, visionOS 1+
- `navigationBarLeading` / `navigationBarTrailing` are deprecated; use `topBarLeading` / `topBarTrailing` instead.
- On iOS, tvOS, and macOS, items that don't fit in the visible toolbar area overflow into a menu automatically.
- Group multiple related items with `ToolbarItemGroup` to ensure correct spacing.

## Related

- [toolbar](./toolbar.md)
