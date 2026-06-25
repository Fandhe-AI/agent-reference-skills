# SCNAction

A reusable animation that changes attributes of any node it is run on. Created via factory class methods and executed by calling `runAction(_:)` on an `SCNNode`.

## Signature / Usage

```swift
// Move, rotate, and fade in sequence
let moveUp = SCNAction.moveBy(x: 0, y: 2, z: 0, duration: 1.0)
let spin   = SCNAction.rotateBy(x: 0, y: .pi * 2, z: 0, duration: 2.0)
let fade   = SCNAction.fadeOut(duration: 0.5)
let seq    = SCNAction.sequence([moveUp, spin, fade])
let loop   = SCNAction.repeatForever(seq)

node.runAction(loop, forKey: "idle")
node.removeAction(forKey: "idle")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `duration` | `TimeInterval` | Length of the action in seconds |
| `timingMode` | `SCNActionTimingMode` | Easing curve (`.linear`, `.easeIn`, `.easeOut`, `.easeInEaseOut`) |
| `speed` | `CGFloat` | Playback speed multiplier |
| `timingFunction` | `SCNActionTimingFunction?` | Custom block for fine-grained timing control |

### Factory methods (selection)

| Method | Description |
|--------|-------------|
| `moveBy(x:y:z:duration:)` | Relative translation |
| `move(to:duration:)` | Absolute position |
| `rotateBy(x:y:z:duration:)` | Relative Euler rotation |
| `rotateTo(x:y:z:duration:)` | Absolute Euler rotation |
| `rotate(by:around:duration:)` | Rotation around an axis vector |
| `scale(by:duration:)` | Relative scale |
| `scale(to:duration:)` | Absolute scale |
| `fadeIn(duration:)` | Opacity → 1.0 |
| `fadeOut(duration:)` | Opacity → 0.0 |
| `fadeOpacity(to:duration:)` | Opacity → target value |
| `hide()` / `unhide()` | Toggle `isHidden` |
| `removeFromParentNode()` | Detach node from parent |
| `sequence(_:)` | Run actions one after another |
| `group(_:)` | Run actions in parallel |
| `repeat(_:count:)` | Repeat N times |
| `repeatForever(_:)` | Repeat indefinitely |
| `wait(duration:)` | Pause for fixed time |
| `wait(duration:withRange:)` | Pause for random duration |
| `customAction(duration:action:)` | Per-frame callback block |
| `run(_:)` | Execute a block once |
| `playAudio(_:waitForCompletion:)` | Play an `SCNAudioSource` |

## Notes

- Available on iOS 8.0+, macOS 10.8+, tvOS 9.0+, watchOS 3.0+, visionOS 1.0+. Deprecated in version 26.0.
- `reversed()` returns an action that undoes the original action.
- Actions are executed via `SCNActionable` — implemented by `SCNNode`.
- For property animation via Core Animation, use `SCNTransaction` or `SCNAnimatable` instead.

## Related

- [SCNNode](./scnnode.md)
- [SCNAnimation](./scnanimation.md)
- [SCNScene](./scnscene.md)
