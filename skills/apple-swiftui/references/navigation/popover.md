# popover

Presents a popover anchored to the modified view.

## Signature / Usage

```swift
// Bool binding
.popover(isPresented: $isShowingPopover) {
    Text("Popover Content")
        .padding()
}

// With explicit arrow edge
.popover(
    isPresented: $isShowingPopover,
    attachmentAnchor: .rect(.bounds),
    arrowEdge: .bottom
) {
    OptionsView()
}

// Optional item binding
.popover(item: $selectedItem, arrowEdge: .top) { item in
    ItemOptionsView(item: item)
}
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `isPresented` | `Binding<Bool>` | Drives presentation. |
| `item` | `Binding<Item?>` | Item-based variant. |
| `attachmentAnchor` | `PopoverAttachmentAnchor` | Attachment point on the source view. Default `.rect(.bounds)`. |
| `arrowEdge` | `Edge?` | Edge of the anchor where the arrow appears. Default `nil` (system decides). |
| `content` | `() -> Content` | The popover's content view. |

## Notes

- Available: iOS 13+, iPadOS 13+, macOS 10.15+, visionOS 1+ (no tvOS / watchOS)
- On iPhone, popovers adapt to sheets; in compact height they become full-screen covers. Override with `presentationCompactAdaptation(_:)`.
- `arrowEdge` was not respected on iOS before iOS 18.1 / apps recompiled with iOS 18.1+ SDK.
- In visionOS, a breakthrough effect is shown by default; customize with `presentationBreakthroughEffect(_:)`.

## Related

- [sheet](./sheet.md)
- [fullScreenCover](./fullscreencover.md)
