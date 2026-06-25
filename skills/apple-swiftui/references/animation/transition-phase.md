# TransitionPhase

An enumeration indicating which stage of a transition a view is currently in.

## Signature / Usage

```swift
enum TransitionPhase
```

Used inside a `Transition.body(content:phase:)` implementation to apply different effects per phase:

```swift
struct FadeSlideTransition: Transition {
    func body(content: Content, phase: TransitionPhase) -> some View {
        content
            .opacity(phase.isIdentity ? 1 : 0)
            .offset(x: phase == .willAppear ? -20 : phase == .didDisappear ? 20 : 0)
    }
}
```

## Options / Props

### Cases

| Case | Description |
|------|-------------|
| `.willAppear` | The view is about to be inserted; defines the starting state before the appear animation. |
| `.identity` | The view is fully in the hierarchy; apply no visual changes here. |
| `.didDisappear` | The view has been removed; defines the ending state of the removal animation. |

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `isIdentity` | `Bool` | `true` when in the `.identity` phase; used to conditionally apply effects. |
| `value` | `Double` | Numeric representation: `willAppear` = -1, `identity` = 0, `didDisappear` = 1. |

## Notes

- Available iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Appearance flow: `willAppear` → `identity`; removal flow: `identity` → `didDisappear`
- If a view is removed while still appearing, SwiftUI jumps directly to `didDisappear`

## Related

- [Transition](./transition.md)
