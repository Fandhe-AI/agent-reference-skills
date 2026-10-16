# alert

Presents an alert dialog when a given condition is true.

## Signature / Usage

```swift
// String title
.alert("Login failed.", isPresented: $didFail) {
    Button("OK") { /* handle */ }
}

// Text title with message
.alert(
    Text("Delete Item"),
    isPresented: $showDeleteAlert
) {
    Button("Delete", role: .destructive) { deleteItem() }
    Button("Cancel", role: .cancel) {}
} message: {
    Text("This action cannot be undone.")
}

// Item-based
.alert("Error", isPresented: $hasError, presenting: currentError) { error in
    Button("Retry") { retry(error) }
} message: { error in
    Text(error.localizedDescription)
}

// Data-based (item): non-nil shows the alert, the system resets it to nil
.alert("Save failed.", item: $details) { details in
    Button("Retry") { retry(details) }
} message: { details in
    Text(details.error)
}

// Error-based: errorDescription becomes the title
.alert(error: $error) { _ in
    Button("OK") {}
} message: { error in
    Text(error.recoverySuggestion ?? "Try again later.")
}
```

```swift
// New overloads (data / error)
func alert<A, T>(_ title: Text, item data: Binding<T?>, @ContentBuilder actions: (T) -> A) -> some View where A : View
func alert<A, M, T>(_ titleKey: LocalizedStringKey, item data: Binding<T?>, @ContentBuilder actions: (T) -> A, @ContentBuilder message: (T) -> M) -> some View where A : View, M : View
func alert<E, A>(error: Binding<E?>, @ContentBuilder actions: () -> A) -> some View where E : LocalizedError, A : View
func alert<E, A, M>(error: Binding<E?>, @ContentBuilder actions: (E) -> A, @ContentBuilder message: (E) -> M) -> some View where E : LocalizedError, A : View, M : View
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `title` | `Text` / `String` (`StringProtocol`) / `LocalizedStringKey` / `LocalizedStringResource` | Alert title. The current `isPresented` overloads take a `LocalizedStringResource` title (`titleResource`) or `LocalizedStringKey` (`titleKey`) among others. |
| `isPresented` | `Binding<Bool>` | Controls presentation; system sets to `false` on any action. |
| `presenting` | `T?` | Optional data to pass into the actions and message closures. |
| `item` | `Binding<T?>` | Presents the alert when non-nil; the system sets it to `nil` after an action and dismisses. Passed to `actions` / `message` as `T`. Used by `alert(_:item:actions:)` and `alert(_:item:actions:message:)`. |
| `error` | `Binding<E?>` (`E : LocalizedError`) | Presents the alert when non-nil; `errorDescription` is used as the title. Used by `alert(error:actions:)` and `alert(error:actions:message:)`. |
| `actions` | `() -> A` / `(T) -> A` | `@ContentBuilder` closure returning `Button` views. The `item` / `error` overloads receive the data / error. |
| `message` | `() -> M` / `(T) -> M` | Optional `@ContentBuilder` closure providing a message below the title. |

## Notes

- Available: iOS 15+, iPadOS 15+, macOS 12+, tvOS 15+, watchOS 8+, visionOS 1+
- The four overloads `alert(_:item:actions:)`, `alert(_:item:actions:message:)`, `alert(error:actions:)` and `alert(error:actions:message:)` are listed in the June 2026 SwiftUI updates, but their documented availability is iOS 15.0+ / macOS 12.0+ / tvOS 15.0+ / watchOS 8.0+ / visionOS 1.0+ (not 27.0).
- The data should not change after the presentation occurs; changes made after the presentation are ignored (`item` overloads).
- Only unstyled text is supported for the message.
- All actions automatically dismiss the alert after running.
- If no actions are provided, the system adds a default "OK" button.
- On iOS, tvOS, and watchOS only `Button` with `Text` labels are supported; other view types are ignored.
- Use `ButtonRole.cancel` for cancel actions; use `ButtonRole.destructive` for destructive actions.

## Related

- [confirmationDialog](./confirmationdialog.md)
