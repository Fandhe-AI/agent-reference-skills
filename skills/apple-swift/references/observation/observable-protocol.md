# Observable

A type that emits notifications to observers when underlying data changes.

## Signature

```swift
protocol Observable
```

## Notes

- Conforming to this protocol alone does not add observation functionality. Always use the `@Observable` macro to add full observation support to a type.
- The `@Observable` macro both conforms the type to `Observable` and synthesizes the required tracking infrastructure.
- Available: iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, visionOS 1.0+, watchOS 10.0+

## Related

- [@Observable macro](./observable-macro.md)
- [ObservationRegistrar](./observationregistrar.md)
- [withObservationTracking(_:onChange:)](./withobservationtracking.md)
