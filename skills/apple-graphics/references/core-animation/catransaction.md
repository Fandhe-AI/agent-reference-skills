# CATransaction

A mechanism for grouping multiple layer-tree operations into atomic updates to the render tree.

## Signature / Usage

```swift
class CATransaction : NSObject

// Explicit transaction with custom duration and completion
CATransaction.begin()
CATransaction.setAnimationDuration(0.6)
CATransaction.setAnimationTimingFunction(CAMediaTimingFunction(name: .easeOut))
CATransaction.setCompletionBlock {
    print("Animation complete")
}
layer.position = CGPoint(x: 200, y: 200)
CATransaction.commit()
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `begin()` | `class func begin()` | Open a new transaction on the current thread |
| `commit()` | `class func commit()` | Commit all changes in the current transaction |
| `flush()` | `class func flush()` | Flush any implicit transaction immediately |
| `animationDuration()` / `setAnimationDuration(_:)` | `CFTimeInterval` | Get / set the animation duration |
| `animationTimingFunction()` / `setAnimationTimingFunction(_:)` | `CAMediaTimingFunction?` | Get / set the timing function |
| `disableActions()` / `setDisableActions(_:)` | `Bool` | Get / set suppression of implicit animations |
| `completionBlock()` / `setCompletionBlock(_:)` | `(() -> Void)?` | Get / set the completion callback |
| `value(forKey:)` / `setValue(_:forKey:)` | `Any?` / `String` | Get / set custom transaction properties |
| `lock()` / `unlock()` | `class func` | Acquire / release the recursive spin-lock for the transaction |

## Notes

- iOS 2.0+, iPadOS 2.0+, macOS 10.5+, tvOS 9.0+, visionOS 1.0+, Mac Catalyst 13.1+
- Every layer-tree modification runs within a transaction. If no explicit transaction exists, Core Animation creates an **implicit transaction** automatically and commits it when the runloop iterates.
- Transactions nest fully: each `begin()` must be paired with a `commit()`.
- `setDisableActions(true)` suppresses all implicit animations within the transaction scope — useful for non-animated position resets.
- `completionBlock` fires after **all animations** in the transaction group have finished.
- The completion block fires on the main thread.

## Related

- [CAAnimation](./caanimation.md)
- [CAMediaTimingFunction](./camediatimingfunction.md)
- [CALayer](./calayer.md)
