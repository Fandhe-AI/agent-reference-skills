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

```swift
// item overload (data-based)
func confirmationDialog<A, M, T>(_ titleKey: LocalizedStringKey, item data: Binding<T?>, titleVisibility: Visibility = .automatic, @ContentBuilder actions: (T) -> A, @ContentBuilder message: (T) -> M) -> some View where A : View, M : View
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `title` | `Text` / `String` (`StringProtocol`) / `LocalizedStringKey` / `LocalizedStringResource` | Dialog title. The current `isPresented` overloads include a `LocalizedStringResource` title (`titleResource`) and `LocalizedStringKey` (`titleKey`). |
| `isPresented` | `Binding<Bool>` | Controls presentation. |
| `item` | `Binding<T?>` | Presents the dialog when non-nil; the system sets it to `nil` after the default action and dismisses. Passed to `actions` / `message` as `T`. Used by `confirmationDialog(_:item:titleVisibility:actions:)` and `confirmationDialog(_:item:titleVisibility:actions:message:)`. |
| `titleVisibility` | `Visibility` | Whether to show the title. Default `.automatic`. |
| `presenting` | `T?` | Optional data passed to actions and message closures. |
| `actions` | `() -> A` / `(T) -> A` | `@ContentBuilder` closure returning action `Button`s. |
| `message` | `() -> M` / `(T) -> M` | Optional message content below the title. |

## Notes

- Available: iOS 15+, iPadOS 15+, macOS 12+, tvOS 15+, watchOS 8+, visionOS 1+
- The two `item` overloads are listed in the June 2026 SwiftUI updates, but their documented availability is iOS 15.0+ / macOS 12.0+ / tvOS 15.0+ / watchOS 8.0+ / visionOS 1.0+ (not 27.0).
- All actions automatically dismiss the dialog after running.
- A default dismiss action is included; a `Button` with `role: .cancel` replaces it.
- In regular-size classes on iPad/macOS, the dialog renders as a popover (tapping outside dismisses it).

## Related

- [alert](./alert.md)
