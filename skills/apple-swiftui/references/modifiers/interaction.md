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

iOS 27.0+ overload with a location and input-kind filter:

```swift
nonisolated func onTapGesture(count: Int = 1, coordinateSpace: some CoordinateSpaceProtocol = .local, inputKinds: GestureInputKinds = .all, perform action: @escaping (CGPoint) -> Void) -> some View
```

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `Int` | `1` | Number of taps or clicks required to trigger the action. |
| `coordinateSpace` | `some CoordinateSpaceProtocol` | `.local` | Coordinate space in which the location is reported. |
| `inputKinds` | `GestureInputKinds` | `.all` | Input kinds the gesture recognizes. |
| `action` | `(CGPoint) -> Void` | — | Receives the location of the interaction. |

### `onLongPressGesture(minimumDuration:maximumDistance:inputKinds:perform:onPressingChanged:)`

iOS 27.0+ (not tvOS):

```swift
nonisolated func onLongPressGesture(minimumDuration: Double = 0.5, maximumDistance: CGFloat = 10, inputKinds: GestureInputKinds = .all, perform action: @escaping () -> Void, onPressingChanged: ((Bool) -> Void)? = nil) -> some View
```

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

`GestureInputKinds` (iOS 27.0+) is an option set that specifies which input kinds a gesture recognizes: `.all`, `.directTouch`, `.indirectTouch`, `.pencil`, `.pointer`. If not specified, a gesture recognizes all applicable input kinds. The following gestures have initializers that accept input kinds: `DragGesture`, `LongPressGesture`, `MagnifyGesture`, `RotateGesture`, `RotateGesture3D`, `SpatialEventGesture`, `SpatialTapGesture`, `TapGesture`, `WindowDragGesture`.

## Related

- [opacity.md](./opacity.md)
- [frame.md](./frame.md)
