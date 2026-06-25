# withAnimation(_:completionCriteria:_:completion:)

Returns the result of recomputing the view's body with the provided animation, and runs a completion closure when the animation finishes.

## Signature / Usage

```swift
func withAnimation<Result>(
    _ animation: Animation? = .default,
    completionCriteria: AnimationCompletionCriteria = .logicallyComplete,
    _ body: () throws -> Result,
    completion: @escaping () -> Void
) rethrows -> Result
```

```swift
withAnimation(.easeOut(duration: 0.4), completionCriteria: .logicallyComplete) {
    isVisible = false
} completion: {
    // Runs after animation logically completes
    cleanup()
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `animation` | `Animation?` | The animation to apply. Defaults to `.default`. |
| `completionCriteria` | `AnimationCompletionCriteria` | When to fire the completion: `.logicallyComplete` (default) or `.removed`. |
| `body` | `() throws -> Result` | Closure with state changes to animate. |
| `completion` | `@escaping () -> Void` | Called exactly once when the animation meets the completion criteria. |

### AnimationCompletionCriteria values

| Value | Description |
|-------|-------------|
| `.logicallyComplete` | Fires when the animation reaches its final value, even if subtle decay continues. |
| `.removed` | Fires only after all animation effects have fully ceased. |

## Notes

- Available iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- If `body` produces no animated changes, `completion` is called immediately after `body`
- The completion fires **exactly once** per call

## Related

- [withAnimation(_:_:)](./withanimation.md)
- [Animation](./animation.md)
