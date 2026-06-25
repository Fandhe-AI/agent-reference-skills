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
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `title` | `Text` / `String` / `LocalizedStringKey` | Alert title. |
| `isPresented` | `Binding<Bool>` | Controls presentation; system sets to `false` on any action. |
| `presenting` | `T?` | Optional data to pass into the actions and message closures. |
| `actions` | `() -> A` | `@ContentBuilder` closure returning `Button` views. |
| `message` | `() -> M` | Optional `@ContentBuilder` closure providing a message below the title. |

## Notes

- Available: iOS 15+, iPadOS 15+, macOS 12+, tvOS 15+, watchOS 8+, visionOS 1+
- All actions automatically dismiss the alert after running.
- If no actions are provided, the system adds a default "OK" button.
- On iOS, tvOS, and watchOS only `Button` with `Text` labels are supported; other view types are ignored.
- Use `ButtonRole.cancel` for cancel actions; use `ButtonRole.destructive` for destructive actions.

## Related

- [confirmationDialog](./confirmationdialog.md)
