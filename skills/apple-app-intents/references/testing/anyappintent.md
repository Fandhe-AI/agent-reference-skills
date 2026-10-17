---
source: https://developer.apple.com/documentation/appintentstesting/anyappintent
---

# AnyAppIntent

A type-erased, intermediate representation of an app intent for testing purposes.

## Signature / Usage

```swift
@dynamicMemberLookup struct AnyAppIntent
```

The structure resolves to your actual app intent type and gives you access to its parameters and results at runtime:

```swift
// Getting an intent definition and creating an instance.
let definitions = IntentDefinitions(
    bundleIdentifier: "com.example.app"
)
var intent = definitions.intents["CreateNote"]
    .makeIntent()

// Setting any intent parameters.
intent.title = "Meeting Notes"
intent.priority = 5
intent.isUrgent = true

// Reading parameters, when needed.
let title: String? = try intent.title

// Performing the intent.
let result = try await intent.run()

// Adding your verification code.
// ...
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `bundleIdentifier` | `let bundleIdentifier: String` | The bundle identifier of the app that contains this intent. |
| `identifier` | `let identifier: String` | The unique identifier for the intent type. |
| `run()` | `func run() async throws -> ResolvedIntentResult` | Performs the intent in the current test session. |
| `subscript<T>(dynamicMember:)` | `subscript<T>(dynamicMember _: String) -> T` | Accesses an intent parameter by name, for comparison with a known value. |
| `subscript(dynamicMember:)` | `subscript(dynamicMember _: String) -> DynamicPropertyPath` | Accesses a nested entity property by name. |
| `subscript(dynamicMember:)` | `subscript(dynamicMember _: String) -> (any IntentValueExpressing)?` | Accesses an intent parameter by name, without casting. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Conforms to `Copyable`, `CustomStringConvertible`, `Equatable`, `Escapable`, `Sendable`, `SendableMetatype`.
- Create instances through `IntentDefinitions.intents[...]` and `AppIntentDefinition.makeIntent` (an `IntentValuePropertiesCallable<AnyAppIntent>`).

## Related

- [IntentDefinitions](./intentdefinitions.md)
- [IntentValuePropertiesCallable](./intentvaluepropertiescallable.md)
- [ResolvedIntentResult](./resolvedintentresult.md)
- [AnyAppEntity](./anyappentity.md)
- [AnyEntityQuery](./anyentityquery.md)
- [AnyAppEnum](./anyappenum.md)
- [AnyTransientAppEntity](./anytransientappentity.md)
