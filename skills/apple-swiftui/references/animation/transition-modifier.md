# transition(_:)

Associates a transition with a view, animating it when the view is inserted into or removed from the hierarchy.

## Signature / Usage

```swift
// AnyTransition overload (iOS 13+)
nonisolated func transition(_ t: AnyTransition) -> some View

// Transition protocol overload (iOS 17+)
nonisolated func transition<T>(_ transition: T) -> some View where T: Transition
```

```swift
@State private var isActive = false

Group {
    if isActive {
        MyView()
            .transition(.slide)
    }
}
Button("Toggle") {
    withAnimation { isActive.toggle() }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `t` / `transition` | `AnyTransition` or `T: Transition` | The transition to apply on insertion/removal. |

## Notes

- Available iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- The transition only fires when the view's insertion/removal is wrapped in `withAnimation`
- Apply `.transition()` to the outermost conditional view for best results

## Related

- [AnyTransition](./anytransition.md)
- [Transition](./transition.md)
- [withAnimation](./withanimation.md)
