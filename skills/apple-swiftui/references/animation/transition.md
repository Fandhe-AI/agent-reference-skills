# Transition

A protocol describing how a view changes when it is inserted into or removed from the view hierarchy.

## Signature / Usage

```swift
@MainActor @preconcurrency protocol Transition
```

```swift
struct RotatingFadeTransition: Transition {
    func body(content: Content, phase: TransitionPhase) -> some View {
        content
            .opacity(phase.isIdentity ? 1.0 : 0.0)
            .rotationEffect(phase == .willAppear ? .degrees(30) : .zero)
    }
}

MyView()
    .transition(RotatingFadeTransition())
```

## Options / Props

### Required

| Member | Description |
|--------|-------------|
| `func body(content:phase:) -> some View` | Applies transition effects based on the current `TransitionPhase`. |
| `static var properties: TransitionProperties` | Declares properties of the transition (e.g., whether it is interactive). |

### Built-in transitions (static)

| Name | Description |
|------|-------------|
| `.identity` | Returns the view unmodified. |
| `.opacity` | Fades in/out. |
| `.scale` / `.scale(_:anchor:)` | Scales during transition. |
| `.slide` | Slides from leading to trailing edge. |
| `.move(edge:)` | Moves from/toward a specified edge. |
| `.push(from:)` | Pushes in from an edge while fading. |
| `.offset(_:)` / `.offset(x:y:)` | Offsets the view. |
| `.blurReplace` | Combines blur and scale. |
| `.symbolEffect` | Applies symbol animations. |

### Configuration methods

| Method | Description |
|--------|-------------|
| `.animation(_:)` | Attaches a specific animation to the transition. |
| `.combined(with:)` | Combines two transitions. |

## Notes

- Available iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Avoid identity-affecting changes (`.id()`, `if`/`switch`) inside `body`
- Use `AnyTransition` for backward-compatible (iOS 13+) transitions

## Related

- [AnyTransition](./anytransition.md)
- [transition(_:)](./transition-modifier.md)
- [TransitionPhase](./transition-phase.md)
