# ToolbarOverflowMenu / visibilityPriority(_:)

`ToolbarOverflowMenu` places actions always in the toolbar's overflow menu; `visibilityPriority(_:)` controls which items move into the overflow menu first when space runs out.

## Signature / Usage

```swift
ContentView()
    .toolbar {
        ToolbarOverflowMenu {
            Button("Action 1") { }
            Button("Action 2") { }
        }
    }
```

```swift
// View modifier form
nonisolated func toolbarOverflowMenu<C>(@ContentBuilder content: () -> C) -> some View where C : View

ContentView()
    .toolbarOverflowMenu {
        Button("Action 1") { }
        Button("Action 2") { }
    }
```

```swift
@MainActor @preconcurrency func visibilityPriority(_ priority: ToolbarItemVisibilityPriority) -> some ToolbarContent

ContentView()
    .toolbar {
        ToolbarItem {
            SecondaryControl()
        }
        ToolbarItem {
            PrimaryControl()
        }
        .visibilityPriority(.high)
    }
```

## Options / Props

| Name | Description |
|------|-------------|
| `ToolbarOverflowMenu.init(content:)` | Creates an overflow menu from view content. Conforms to `CustomizableToolbarContent` and `ToolbarContent`. |
| `ToolbarItemVisibilityPriority.automatic` | Default priority. |
| `ToolbarItemVisibilityPriority.low` | Moves into the overflow menu earlier. |
| `ToolbarItemVisibilityPriority.high` | Stays visible longer. |
| `init(lowerThan:)` / `init(higherThan:)` | Custom priorities relative to another priority. |

`ToolbarItemVisibilityPriority` conforms to `Comparable`, `Equatable`, `Hashable`, `Sendable`, `SendableMetatype`.

## Notes

- `ToolbarOverflowMenu` and `toolbarOverflowMenu(content:)`: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, visionOS 27.0+ (not macOS).
- `visibilityPriority(_:)` and `ToolbarItemVisibilityPriority`: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 26.1+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+ (per Apple's metadata).
- Overflow menu content is placed there regardless of toolbar mode, platform, or customizability. On iOS and visionOS it goes into the overflow menu in the navigation bar.
- When toolbar space is limited, lower-priority items move into the overflow menu before higher-priority ones.

## Related

- [toolbar](./toolbar.md)
- [toolbaritem](./toolbaritem.md)
- [toolbar-vertical](./toolbar-vertical.md)
