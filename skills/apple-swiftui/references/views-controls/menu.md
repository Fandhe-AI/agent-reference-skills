# Menu

A control for presenting a menu of actions.

## Signature / Usage

```swift
nonisolated struct Menu<Label, Content> where Label : View, Content : View
```

```swift
Menu("Actions") {
    Button("Rename", action: rename)
    Button("Duplicate", action: duplicate)
    Divider()
    Button("Delete", role: .destructive, action: delete)
}

// With primary action
Menu {
    Button("Open in New Window", action: openNew)
    Button("Open in Background", action: openBg)
} label: {
    Label("Open", systemImage: "folder")
} primaryAction: {
    openDefault()
}
```

## Options / Props

| Initializer | Description |
|---|---|
| `init(_:content:)` | Title string key + content view builder |
| `init(content:label:)` | Custom label view builder + content |
| `init(_:systemImage:content:)` | Title + SF Symbol + content |
| `init(_:image:content:)` | Title + image resource + content |
| `init(_:content:primaryAction:)` | Title + content + primary action closure |
| `init(content:label:primaryAction:)` | Custom label + content + primary action |

### Key modifiers

| Modifier | Description |
|---|---|
| `menuStyle(_:)` | `.automatic`, `.button`, `.borderlessButton` |
| `menuOrder(_:)` | `.automatic`, `.fixed`, `.priority` |
| `menuIndicator(_:)` | Show/hide the chevron indicator |

## Notes

- Available on iOS 14.0+, macOS 11.0+, tvOS 17.0+, visionOS 1.0+. Not available on watchOS.
- Nest `Menu` inside another `Menu` to create submenus.
- When `primaryAction` is set, a tap triggers the primary action while a long-press/chevron opens the menu.
- Content can include `Button`, `Divider`, `Picker`, `Toggle`, and nested `Menu` views.

## Related

- [Button](./button.md)
- [Picker](./picker.md)
