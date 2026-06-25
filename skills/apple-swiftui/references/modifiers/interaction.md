# disabled / hidden / onTapGesture / onAppear / onChange

View modifiers for controlling interactivity, visibility, and lifecycle/event responses.

## Signature / Usage

```swift
// Disable user interaction
nonisolated func disabled(_ disabled: Bool) -> some View

// Hide view (preserves layout space)
nonisolated func hidden() -> some View

// Tap gesture recognizer
nonisolated func onTapGesture(count: Int = 1, perform action: @escaping () -> Void) -> some View

// Lifecycle: view about to appear
nonisolated func onAppear(perform action: (() -> Void)? = nil) -> some View

// Observe value changes (iOS 17+ / macOS 14+)
nonisolated func onChange<V>(
    of value: V,
    initial: Bool = false,
    _ action: @escaping (V, V) -> Void
) -> some View where V : Equatable
```

```swift
Button("Submit") { submit() }
    .disabled(isSubmitting)

Image(systemName: "c.circle.fill")
    .hidden()   // invisible but still takes up layout space

Text("Tap me")
    .onTapGesture(count: 2) { print("double tapped") }

ScrollView {
    content
}
.onAppear { viewModel.load() }

Text(value)
    .onChange(of: value) { oldValue, newValue in
        print("changed from \(oldValue) to \(newValue)")
    }
```

## Options / Props

### `disabled(_:)`

| Name | Type | Description |
|------|------|-------------|
| `disabled` | `Bool` | `true` prevents all user interaction. Parent `disabled(true)` overrides child `disabled(false)`. |

### `hidden()`

No parameters. The view remains in the hierarchy and occupies layout space.

### `onTapGesture(count:perform:)`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `Int` | `1` | Number of taps required to trigger the action. |
| `action` | `() -> Void` | — | Closure executed when the gesture fires. |

### `onAppear(perform:)`

| Name | Type | Description |
|------|------|-------------|
| `action` | `(() -> Void)?` | Closure called before the view's first rendered frame. `nil` is a no-op. |

### `onChange(of:initial:_:)`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `V : Equatable` | — | The value to observe. |
| `initial` | `Bool` | `false` | When `true`, runs the action immediately on view appearance. |
| `action` | `(V, V) -> Void` | — | Receives `(oldValue, newValue)` when `value` changes. |

## Notes

`disabled`, `hidden`, `onTapGesture`, `onAppear` are available on iOS 13.0+ / macOS 10.15+. The two-parameter `onChange(of:initial:_:)` overload requires iOS 17.0+ / macOS 14.0+; for iOS 14–16 use `onChange(of:perform:)` (deprecated in iOS 17). `onAppear` action runs on the main actor. `onChange` action also runs on the main actor; use `Task.detached` for background work.

## Related

- [opacity.md](./opacity.md)
- [frame.md](./frame.md)
