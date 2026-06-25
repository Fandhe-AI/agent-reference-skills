# FocusState

A property wrapper that reads and writes a value tracking where keyboard/input focus is in the scene.

## Signature / Usage

```swift
@frozen @propertyWrapper struct FocusState<Value> where Value : Hashable
```

```swift
struct LoginForm: View {
    enum Field: Hashable { case username, password }

    @State private var username = ""
    @State private var password = ""
    @FocusState private var focusedField: Field?

    var body: some View {
        Form {
            TextField("Username", text: $username)
                .focused($focusedField, equals: .username)
            SecureField("Password", text: $password)
                .focused($focusedField, equals: .password)
            Button("Sign In") {
                if username.isEmpty { focusedField = .username }
                else if password.isEmpty { focusedField = .password }
            }
        }
    }
}
```

## Notes

- iOS 15.0+ / macOS 12.0+ / tvOS 15.0+ / watchOS 8.0+ / visionOS 1.0+
- `Value` must be `Optional` or `Bool`; `nil` / `false` means no field is focused.
- Assign a value programmatically to move focus; set `nil` / `false` to dismiss the keyboard.
- Use `.focused($focusedField, equals: .value)` to bind a specific field; use `.focused($boolBinding)` for a single field.
- Do not bind the same value to multiple views — causes runtime warnings.
- Conforms to `DynamicProperty`.

## Related

- [State](./state.md)
- [Binding](./binding.md)
