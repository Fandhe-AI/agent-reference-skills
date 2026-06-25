# Observation

| Name | Description | Path |
|------|-------------|------|
| Observable | Protocol that marks a type as emitting change notifications to observers. | [observable-protocol.md](./observable-protocol.md) |
| @Observable | Macro that conforms a type to Observable and synthesizes all tracking infrastructure. | [observable-macro.md](./observable-macro.md) |
| @ObservationIgnored | Macro that opts a stored property out of observation tracking. | [observationignored.md](./observationignored.md) |
| @ObservationTracked | Internal macro that synthesizes observation-aware accessors; applied automatically by @Observable. | [observationtracked.md](./observationtracked.md) |
| ObservationRegistrar | Struct providing storage for tracking and access to data changes. | [observationregistrar.md](./observationregistrar.md) |
| withObservationTracking(_:onChange:) | Tracks property accesses in a closure and calls onChange once when any tracked property changes. | [withobservationtracking.md](./withobservationtracking.md) |
