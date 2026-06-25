# animation(_:value:)

Applies an animation to a view whenever a specified equatable value changes.

## Signature / Usage

```swift
nonisolated func animation<V>(
    _ animation: Animation?,
    value: V
) -> some View where V: Equatable
```

```swift
@State private var scale = 1.0

Circle()
    .scaleEffect(scale)
    .animation(.spring, value: scale)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `animation` | `Animation?` | The animation to apply. Pass `nil` to disable animation. |
| `value` | `V` (Equatable) | The value to monitor; animation triggers when this value changes. |

## Notes

- Available iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Prefer this over `animation(_:)` (deprecated); always specify `value` to control when animation fires
- `animation(_:body:)` is available for animating a specific set of views within a closure

## Related

- [withAnimation](./withanimation.md)
- [Animation](./animation.md)
