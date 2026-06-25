# @ObservationTracked

Synthesizes observation-aware accessors (`init`, `get`, `set`, `_modify`) and a backing stored property for a given property.

## Signature

```swift
@attached(accessor, names: named(init), named(get), named(set), named(_modify))
@attached(peer, names: prefixed(`_`))
macro ObservationTracked()
```

## Notes

- This macro is used **internally** by the Observation framework; the `@Observable` macro applies it automatically to each non-ignored stored property.
- Direct use outside of the framework is not necessary and not recommended.
- The generated peer declaration is prefixed with `_` (e.g., `name` → `_name`).
- Available: iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, visionOS 1.0+, watchOS 10.0+

## Related

- [@Observable macro](./observable-macro.md)
- [@ObservationIgnored](./observationignored.md)
