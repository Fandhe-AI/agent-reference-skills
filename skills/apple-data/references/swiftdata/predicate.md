# Predicate / #Predicate

`Predicate<each Input>` (Foundation) represents a type-safe, serializable logical condition. The `#Predicate` macro creates one from a closure at compile time.

## Signature / Usage

```swift
struct Predicate<each Input>

// Macro
macro Predicate<each Input>(_ body: (repeat each Input) -> Bool) -> Predicate<repeat each Input>
```

```swift
// Basic filter predicate
let upcoming = #Predicate<Trip> { trip in
    trip.startDate > .now
}

// Compound predicate
let longUpcoming = #Predicate<Trip> { trip in
    trip.startDate > .now && trip.duration > 7
}

// Use with FetchDescriptor
let descriptor = FetchDescriptor<Trip>(predicate: upcoming)
let results = try context.fetch(descriptor)

// Use with @Query
@Query(filter: #Predicate<Trip> { $0.isPinned })
private var pinned: [Trip]
```

## Options / Props

| Member | Description |
|--------|-------------|
| `evaluate(repeat each Input) throws -> Bool` | Evaluates the predicate against given inputs |
| `Predicate<T>.true` | Static predicate always evaluating to `true` |
| `Predicate<T>.false` | Static predicate always evaluating to `false` |

### Supported expression operators

- Comparison: `==`, `!=`, `<`, `<=`, `>`, `>=`
- Boolean logic: `&&`, `||`, `!`
- Optional handling: `??`, `flatMap`, `if-let`
- Sequence: `contains`, `contains(where:)`, `allSatisfy`, `filter`
- String: `contains(_:)`, `localizedStandardContains(_:)`, `hasPrefix`, `hasSuffix`
- Range: `...`, `..<`

## Notes

- iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- The closure body is transformed at compile time; it is not executed as regular Swift code
- Cannot contain loops, nested declarations, or mutations of captured variables
- Constants from the enclosing scope may be captured

## Related

- [FetchDescriptor](./fetch-descriptor.md)
- [@Query](./query-macro.md)
