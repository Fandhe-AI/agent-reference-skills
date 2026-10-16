# Observations

An asynchronous sequence generated from a closure that tracks the transactional changes of `@Observable` types.

## Signature / Usage

```swift
struct Observations<Element, Failure> where Element : Sendable, Failure : Error
```

```swift
let names = Observations { person.name }
```

Iterate it with `for await`:

```swift
let names = Observations { person.firstName + " " + person.lastName }

Task.detached {
  for await name in names {
    print("Task1: \(name)")
  }
}
```

## Options / Props

| Member | Signature | Description |
|--------|-----------|-------------|
| `init(_:)` | `init(_ emit: @escaping @isolated(any) @Sendable () throws(Failure) -> Element)` | Constructs an asynchronous sequence for a given closure by tracking changes of `@Observable` types. The emit closure extracts a value out of a single or many `@Observable` types. |
| `untilFinished(_:)` | `static func untilFinished(_ emit: @escaping @isolated(any) @Sendable () throws(Failure) -> Observations<Element, Failure>.Iteration) -> Observations<Element, Failure>` | Same as `init(_:)`, but the emit closure keeps being invoked until the finish option is returned or an error is thrown. |
| `Iteration` | `enum Iteration` (cases `next(Element)`, `finish`) | Return value of the closure passed to `untilFinished(_:)`. Conforms to `Sendable`. |
| `Iterator` | `struct Iterator` | The iterator type of the sequence. |

`untilFinished` example from SE-0475 (the proposal spells the terminating case `.finished`; the Apple page lists it as `finish`):

```swift
let hosts = Observations.untilFinished { [weak person] in
  if let person {
    .next(person.homePage?.host)
  } else {
    .finished
  }
}
```

## Notes

- Conforms to `AsyncSequence`, `Sendable`, `SendableMetatype`.
- Transaction boundary: starts at the `willSet` of the first mutation and ends at the next suspension point of the isolation that safely accesses the value, so torn intermediate values (for example `firstName` set, then `lastName` set) are emitted once as a consistent value.
- Per SE-0475, the closure is not run immediately; it runs asynchronously upon the first call to the iterator's `next`, inside `withObservationTracking` on the captured isolation. Multiple iterations of the same sequence from multiple tasks emit the same values.
- Available: iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+, watchOS 26.0+
- Source: https://developer.apple.com/documentation/observation/observations ; SE-0475 (Implemented in Swift 6.2), swift-evolution commit f006bf3cf2594bdd4a972f9126f93bd1743ed524

## Related

- [withObservationTracking(_:onChange:)](./withobservationtracking.md)
- [@Observable macro](./observable-macro.md)
- [ObservationTracking](./observationtracking.md)
