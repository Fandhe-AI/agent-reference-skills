# sheet

Presents a sheet when a binding to a Boolean value is `true`.

## Signature / Usage

```swift
// Bool binding
.sheet(isPresented: $isShowingSheet, onDismiss: didDismiss) {
    SettingsView()
}

// Optional item binding
.sheet(item: $selectedItem) { item in
    ItemDetailView(item: item)
}
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `isPresented` | `Binding<Bool>` | Drives presentation; set to `false` to dismiss. |
| `item` | `Binding<Item?>` | Item-based variant; sheet is shown when non-nil, dismissed when nil. |
| `onDismiss` | `(() -> Void)?` | Called after the sheet is dismissed. Default `nil`. |
| `content` | `() -> Content` | The sheet's root view. |

## Notes

- Available: iOS 13+, iPadOS 13+, macOS 10.15+, tvOS 13+, watchOS 6+, visionOS 1+
- In vertically compact environments (iPhone landscape), sheets automatically adapt to full-screen covers. Override with `presentationCompactAdaptation(_:)`.
- In visionOS, sheets appear with a breakthrough effect by default; customize with `presentationBreakthroughEffect(_:)`.
- Control sheet height with `presentationDetents(_:)` applied inside the sheet content.

## Related

- [fullScreenCover](./fullscreencover.md)
- [popover](./popover.md)
- [presentationDetents](./presentationdetents.md)
