# confirmationDialog

Presents a confirmation dialog (action sheet on iOS, alert on macOS) when a given condition is true.

## Signature / Usage

```swift
Button("Empty Trash") {
    isShowingDialog = true
}
.confirmationDialog(
    Text("Permanently erase the items in the trash?"),
    isPresented: $isShowingDialog
) {
    Button("Empty Trash", role: .destructive) {
        emptyTrash()
    }
}
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `title` | `Text` / `String` / `LocalizedStringKey` | Dialog title. |
| `isPresented` | `Binding<Bool>` | Controls presentation. |
| `titleVisibility` | `Visibility` | Whether to show the title. Default `.automatic`. |
| `presenting` | `T?` | Optional data passed to actions and message closures. |
| `actions` | `() -> A` | `@ContentBuilder` closure returning action `Button`s. |
| `message` | `() -> M` | Optional message content below the title. |

## Notes

- Available: iOS 15+, iPadOS 15+, macOS 12+, tvOS 15+, watchOS 8+, visionOS 1+
- All actions automatically dismiss the dialog after running.
- A default dismiss action is included; a `Button` with `role: .cancel` replaces it.
- In regular-size classes on iPad/macOS, the dialog renders as a popover (tapping outside dismisses it).

## Related

- [alert](./alert.md)
