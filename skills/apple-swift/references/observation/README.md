# Observation

| Name | Description | Path |
|------|-------------|------|
| @Observable | Defines and implements conformance of the Observable protocol. | [observable-macro.md](./observable-macro.md) |
| Observable | A type that emits notifications to observers when underlying data changes. | [observable-protocol.md](./observable-protocol.md) |
| @ObservationIgnored | Disables observation tracking of a property within an `@Observable` type. | [observationignored.md](./observationignored.md) |
| ObservationRegistrar | Provides storage for tracking and access to data changes. | [observationregistrar.md](./observationregistrar.md) |
| Observations | An asynchronous sequence generated from a closure that tracks the transactional changes of `@Observable` types. | [observations.md](./observations.md) |
| @ObservationTracked | Synthesizes observation-aware accessors (`init`, `get`, `set`, `_modify`) and a backing stored property for a given property. | [observationtracked.md](./observationtracked.md) |
| ObservationTracking | Namespace for advanced observation tracking: options, events, and tokens used by `withObservationTracking(options:_:onChange:)` and `withContinuousObservation(options:apply:)`. | [observationtracking.md](./observationtracking.md) |
| withContinuousObservation(options:apply:) | Continuously observes the `@Observable` properties read by the closure, re-observing automatically after coalesced events; returns a token that keeps the observation alive. | [withcontinuousobservation.md](./withcontinuousobservation.md) |
| withObservationTracking(options:_:onChange:) | Tracks the observable properties read in a closure with explicit control over which events (`willSet`, `didSet`, `deinit`) are delivered, passing an `ObservationTracking.Event` to `onChange`. | [withobservationtracking-options.md](./withobservationtracking-options.md) |
| withObservationTracking(_:onChange:) | Tracks access to properties of observable types and invokes a callback when any tracked property changes. | [withobservationtracking.md](./withobservationtracking.md) |
