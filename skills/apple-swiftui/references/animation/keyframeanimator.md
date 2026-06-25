# KeyframeAnimator

A container view that animates its content using keyframe-based timing, enabling multi-property animations along a single timeline.

## Signature / Usage

```swift
nonisolated struct KeyframeAnimator<Value, KeyframePath, Content>
    where Value == KeyframePath.Value,
          KeyframePath: Keyframes,
          Content: View
```

```swift
struct AnimState { var scale = 1.0; var opacity = 1.0 }

KeyframeAnimator(initialValue: AnimState(), repeating: true) { value in
    Circle()
        .scaleEffect(value.scale)
        .opacity(value.opacity)
} keyframes: { _ in
    KeyframeTrack(\.scale) {
        LinearKeyframe(1.5, duration: 0.3)
        SpringKeyframe(1.0, duration: 0.5)
    }
    KeyframeTrack(\.opacity) {
        LinearKeyframe(0.5, duration: 0.4)
        LinearKeyframe(1.0, duration: 0.4)
    }
}
```

## Options / Props

### Initializers

| Initializer | Description |
|-------------|-------------|
| `init(initialValue:repeating:content:keyframes:)` | Loops keyframes continuously. `repeating` defaults to `true`. |
| `init(initialValue:trigger:content:keyframes:)` | Plays keyframes once each time `trigger` changes. |

### Keyframe types

| Type | Description |
|------|-------------|
| `LinearKeyframe` | Linearly interpolates to the target value. |
| `CubicKeyframe` | Cubic Bézier interpolation. |
| `SpringKeyframe` | Spring interpolation to the target. |
| `MoveKeyframe` | Jumps to the target with no interpolation. |

## Notes

- Available iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- The `content` closure is called every frame while animating; avoid expensive work inside it
- Use `KeyframeTrack` with a key path to animate individual properties of a value type
- For view-modifier form, use `View.keyframeAnimator(initialValue:repeating:content:keyframes:)`

## Related

- [PhaseAnimator](./phaseanimator.md)
- [Animation](./animation.md)
