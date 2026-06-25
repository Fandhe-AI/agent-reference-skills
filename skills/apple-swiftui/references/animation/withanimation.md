# withAnimation(_:_:)

Returns the result of recomputing the view's body with the provided animation, applying it to all state changes made within the closure.

## Signature / Usage

```swift
func withAnimation<Result>(
    _ animation: Animation? = .default,
    _ body: () throws -> Result
) rethrows -> Result
```

```swift
// Basic usage
Button("Animate") {
    withAnimation(.easeInOut(duration: 0.3)) {
        isVisible.toggle()
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `animation` | `Animation?` | The animation to apply. Pass `nil` to disable animation. Defaults to `.default`. |
| `body` | `() throws -> Result` | Closure containing state changes to animate. |

## Notes

- Available iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Sets the animation on the thread's current `Transaction`; all state changes in `body` trigger the same animation
- Use `withAnimation(_:completionCriteria:_:completion:)` (iOS 17+) to run code after the animation finishes

## Related

- [Animation](./animation.md)
- [animation(_:value:)](./animation-modifier.md)
