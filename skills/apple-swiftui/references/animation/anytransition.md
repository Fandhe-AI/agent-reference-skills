# AnyTransition

A type-erased transition that defines how views appear and disappear from the view hierarchy.

## Signature / Usage

```swift
@frozen struct AnyTransition
```

```swift
if isVisible {
    Text("Hello!")
        .transition(.move(edge: .leading).combined(with: .opacity))
}
Button("Toggle") {
    withAnimation { isVisible.toggle() }
}
```

## Options / Props

### Static properties

| Name | Description |
|------|-------------|
| `.identity` | No-op; returns the view unmodified. |
| `.opacity` | Fades in on insertion, fades out on removal. |
| `.scale` | Scales the view during transition. |
| `.slide` | Slides from leading edge on insertion, trailing on removal. |

### Static methods

| Method | Description |
|--------|-------------|
| `.move(edge:)` | Moves the view toward/away from the specified edge. |
| `.push(from:)` | Pushes in from an edge with a fade. |
| `.scale(scale:anchor:)` | Scales by an amount around an anchor point. |
| `.offset(_:)` / `.offset(x:y:)` | Offsets the view. |
| `.asymmetric(insertion:removal:)` | Uses different transitions for insertion and removal. |
| `.modifier(active:identity:)` | Creates a transition from two `ViewModifier` states. |

### Instance methods

| Method | Description |
|--------|-------------|
| `.combined(with:)` | Combines this transition with another. |
| `.animation(_:)` | Attaches a specific animation to the transition. |

## Notes

- Available iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Transitions only animate when a view is conditionally inserted or removed inside a `withAnimation` block
- For iOS 17+ custom transitions, prefer the `Transition` protocol instead

## Related

- [Transition](./transition.md)
- [transition(_:)](./transition-modifier.md)
