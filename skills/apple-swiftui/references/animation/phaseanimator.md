# PhaseAnimator

A container view that animates its content by automatically cycling through a sequence of discrete phases.

## Signature / Usage

```swift
nonisolated struct PhaseAnimator<Phase, Content>
    where Phase: Equatable, Content: View
```

```swift
// Continuous cycling through phases
PhaseAnimator([0.5, 1.0, 1.5]) { scale in
    Circle()
        .scaleEffect(scale)
} animation: { phase in
    .easeInOut(duration: 0.4)
}
```

## Options / Props

### Initializers

| Initializer | Description |
|-------------|-------------|
| `init(_ phases: some Sequence<Phase>, content: (Phase) -> Content, animation: (Phase) -> Animation?)` | Cycles through phases continuously on appear. |
| `init(_ phases: some Sequence<Phase>, trigger: some Equatable, content: (Phase) -> Content, animation: (Phase) -> Animation?)` | Cycles through phases each time `trigger` changes. |

## Notes

- Available iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- The sequence must not be empty; SwiftUI logs a runtime warning otherwise
- The `animation` closure returns the animation to use when **entering** each phase; return `nil` for an instant change
- For view-modifier form, use `View.phaseAnimator(_:content:animation:)`

## Related

- [KeyframeAnimator](./keyframeanimator.md)
- [Animation](./animation.md)
