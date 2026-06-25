# fullScreenCover

Presents a modal view that covers as much of the screen as possible.

## Signature / Usage

```swift
// Bool binding
.fullScreenCover(isPresented: $isPresenting, onDismiss: didDismiss) {
    VStack {
        Text("A full-screen modal view.")
        Text("Tap to Dismiss")
    }
    .onTapGesture { isPresenting.toggle() }
    .frame(maxWidth: .infinity, maxHeight: .infinity)
    .background(Color.blue)
    .ignoresSafeArea(edges: .all)
}

// Optional item binding
.fullScreenCover(item: $selectedItem) { item in
    ItemFullScreenView(item: item)
}
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `isPresented` | `Binding<Bool>` | Drives presentation. |
| `item` | `Binding<Item?>` | Item-based variant; cover shown when non-nil. |
| `onDismiss` | `(() -> Void)?` | Called after dismissal. Default `nil`. |
| `content` | `() -> Content` | The cover's root view. |

## Notes

- Available: iOS 14+, iPadOS 14+, Mac Catalyst 14+, tvOS 14+, watchOS 7+, visionOS 1+
- Not available on macOS (use `sheet` instead).
- Unlike `sheet`, `fullScreenCover` always fills the screen and ignores `presentationDetents`.
- The presented view must provide its own dismiss mechanism (e.g., a button that sets the binding to `false`/`nil`, or `@Environment(\.dismiss)`).

## Related

- [sheet](./sheet.md)
- [popover](./popover.md)
