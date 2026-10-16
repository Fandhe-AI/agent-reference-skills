# Continuation

A mechanism to interface between synchronous and asynchronous code, which enforces that the continuation is resumed exactly once.

## Signature

```swift
@frozen struct Continuation<Success, Failure> where Failure : Error, Success : ~Copyable
```

Conforms to `Sendable`, `SendableMetatype`.

## Usage

```swift
let data = await withContinuation(of: Data.self) { continuation in
    bridge.store(continuation)
}
```

Resume methods (all `consuming`, so a second resume on the same binding does not compile):

| Method | Description |
|---|---|
| `resume()` | Resume the task awaiting the continuation by having it return from its suspension point |
| `resume(returning: consuming sending Success)` | Resume the task by returning the value (two overloads listed in the docs) |
| `resume(throwing: Failure)` | Resume the task by having it throw an error from its suspension point |
| `resume(with: consuming sending Result<Success, Failure>)` | Resume the task by returning or throwing based on the `Result` |

## Notes

- **Availability:** iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Unlike `CheckedContinuation`, which detects misuse at runtime, `Continuation` uses non-copyable semantics to enforce correct usage.
- The continuation must be resumed exactly once. The compiler prevents resuming more than once.
- If a `Continuation` is destroyed without being resumed, the program traps with a diagnostic message indicating where the continuation was created.
- Create one by calling `withContinuation(of:throwing:_:)`; it cannot be instantiated directly (SE-0528).
- SE-0528 (status: Implemented, Swift 6.4): a `Continuation` can be converted into a `CheckedContinuation` / `UnsafeContinuation` when it must be captured by escaping callbacks that are not guaranteed to run exactly once. `CheckedContinuation` and `UnsafeContinuation` are not deprecated.

## Related

- [withContinuation](./withcontinuation.md)
- [CheckedContinuation](./checkedcontinuation.md)
- [UnsafeContinuation](./unsafecontinuation.md)
