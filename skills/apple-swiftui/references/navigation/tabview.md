# TabView

A view that switches between multiple child views using interactive user interface elements.

## Signature / Usage

```swift
// Basic tab bar
TabView {
    Tab("Received", systemImage: "tray.and.arrow.down.fill") {
        ReceivedView()
    }
    .badge(2)

    Tab("Sent", systemImage: "tray.and.arrow.up.fill") {
        SentView()
    }

    Tab("Account", systemImage: "person.crop.circle.fill") {
        AccountView()
    }
}

// Programmatic selection
@State private var selection = 0

TabView(selection: $selection) {
    Tab("Received", systemImage: "tray.and.arrow.down.fill", value: 0) {
        ReceivedView()
    }
    Tab("Sent", systemImage: "tray.and.arrow.up.fill", value: 1) {
        SentView()
    }
}

// Page-style scrolling tabs
TabView {
    ForEach(pages) { page in
        PageView(page)
    }
}
.tabViewStyle(.page)

// Sidebar-adaptable (iPadOS / macOS)
TabView {
    Tab("Home", systemImage: "house") { HomeView() }
    TabSection("Messages") {
        Tab("Received", systemImage: "tray.and.arrow.down.fill") { ReceivedView() }
        Tab("Sent",     systemImage: "tray.and.arrow.up.fill")   { SentView() }
    }
}
.tabViewStyle(.sidebarAdaptable)
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `selection` | `Binding<SelectionValue>?` | Binding to the currently selected tab's value. Omit for automatic management. |
| `content` | `() -> Content` | `Tab` and `TabSection` views built with `TabContentBuilder`. |

Key style modifier: `.tabViewStyle(_:)` — values include `.automatic`, `.page`, `.sidebarAdaptable`.

## Notes

- Available: iOS 13+, iPadOS 13+, macOS 10.15+, tvOS 13+, watchOS 7+, visionOS 1+
- `Tab` struct (iOS 18+) replaces the deprecated `.tabItem(_:)` modifier.
- Use `TabSection` to add hierarchy within the sidebar adaptable style.
- Enable user customization and persistence with `.tabViewCustomization($customization)`.

## Related

- [Tab](./tab.md)
