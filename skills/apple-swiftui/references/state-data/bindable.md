# Bindable

A property wrapper type that supports creating bindings to the mutable properties of `@Observable` objects.

## Signature / Usage

```swift
@dynamicMemberLookup @propertyWrapper struct Bindable<Value>
```

```swift
@Observable
class Book: Identifiable {
    var title = "Sample Book Title"
    var isAvailable = true
}

struct BookEditView: View {
    @Bindable var book: Book

    var body: some View {
        Form {
            TextField("Title", text: $book.title)
            Toggle("Available", isOn: $book.isAvailable)
        }
    }
}
```

## Notes

- iOS 17.0+ / macOS 14.0+ / tvOS 17.0+ / watchOS 10.0+ / visionOS 1.0+
- Use with types that conform to the `Observable` protocol (Swift Observation framework, not `ObservableObject`).
- Can also be used as a local variable inside `body` to create bindings from an environment-sourced observable:
  ```swift
  @Environment(Book.self) private var book
  // inside body:
  @Bindable var book = book
  TextField("Title", text: $book.title)
  ```
- `projectedValue` provides dynamic-member-lookup bindings via `$`.
- For `ObservableObject` types, use `ObservedObject` / `StateObject` instead.

## Related

- [State](./state.md)
- [Binding](./binding.md)
- [ObservedObject](./observedobject.md)
