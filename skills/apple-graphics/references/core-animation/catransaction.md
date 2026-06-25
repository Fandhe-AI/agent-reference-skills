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

## Key Methods

### Transaction lifecycle

```swift
class func begin()    // Open a new transaction on the current thread
class func commit()   // Commit all changes in the current transaction
class func flush()    // Flush any implicit transaction immediately
```

### Animation configuration

```swift
class func animationDuration() -> CFTimeInterval
class func setAnimationDuration(_ duration: CFTimeInterval)

class func animationTimingFunction() -> CAMediaTimingFunction?
class func setAnimationTimingFunction(_ function: CAMediaTimingFunction?)

class func disableActions() -> Bool
class func setDisableActions(_ flag: Bool)   // Suppress implicit animations
```

### Completion callback

```swift
class func completionBlock() -> (() -> Void)?
class func setCompletionBlock(_ block: (() -> Void)?)
```

### Custom properties

```swift
class func value(forKey key: String) -> Any?
class func setValue(_ value: Any?, forKey key: String)
```

### Concurrency

```swift
class func lock()    // Acquire a recursive spin-lock for the transaction
class func unlock()  // Release the spin-lock
```

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
