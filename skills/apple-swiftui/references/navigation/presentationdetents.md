# presentationDetents

Sets the available detents (resting heights) for the enclosing sheet, enabling resizable bottom sheets.

## Signature / Usage

```swift
// Fixed detents
.sheet(isPresented: $showSettings) {
    SettingsView()
        .presentationDetents([.medium, .large])
}

// With programmatic selection
@State private var selectedDetent: PresentationDetent = .medium

.sheet(isPresented: $showSettings) {
    SettingsView()
        .presentationDetents([.medium, .large], selection: $selectedDetent)
}

// Custom fraction / height
.sheet(isPresented: $show) {
    QuickActionsView()
        .presentationDetents([.fraction(0.3), .height(200), .large])
}
```

## Options / Props

| Modifier | Signature | Description |
|----------|-----------|-------------|
| `presentationDetents(_:)` | `(Set<PresentationDetent>) -> some View` | Sets available detents; user can drag between them. |
| `presentationDetents(_:selection:)` | `(Set<PresentationDetent>, Binding<PresentationDetent>) -> some View` | Same, with programmatic control of the active detent. |

### PresentationDetent values

| Value | Description |
|-------|-------------|
| `.large` | Full-height (default). |
| `.medium` | Approximately half screen height; inactive in compact height. |
| `.fraction(_ f: CGFloat)` | Fractional height (0.0–1.0). |
| `.height(_ h: CGFloat)` | Fixed point height. |
| `.custom(_ type: CustomPresentationDetent.Type)` | Calculated height via a `CustomPresentationDetent` conformance. |

## Notes

- Available: iOS 16+, iPadOS 16+, macOS 13+, tvOS 16+, watchOS 9+, visionOS 1+
- By default, sheets use `.large` only (not resizable).
- When multiple detents are provided, a drag indicator is shown automatically; control it with `presentationDragIndicator(_:)`.
- Configure how scroll gestures interact with detents using `presentationContentInteraction(_:)`.

## Related

- [sheet](./sheet.md)
