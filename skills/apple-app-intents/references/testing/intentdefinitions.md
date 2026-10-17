---
source: https://developer.apple.com/documentation/appintentstesting/intentdefinitions
---

# IntentDefinitions

A collection of definitions that catalog your app's intents, enums, entities, and queries.

## Signature / Usage

```swift
struct IntentDefinitions
```

Use `IntentDefinitions` as the entry point for creating type-erased app intents for testing. Provide the bundle identifier of the app under test, then use subscript syntax to retrieve definitions for intents, entities, enums, or value queries:

```swift
let definitions = IntentDefinitions(
    bundleIdentifier: "com.apple.example"
)

let intent = definitions.intents["OrderCoffeeIntent"]
    .makeIntent(size: "large")
let entity = definitions.entities["CoffeeEntity"]
    .makeReference(identifier: "latte-123")
let enumCase = definitions.enums["CoffeeSizeEnum"]
    .makeCase("large")
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `init(bundleIdentifier:)` | `init(bundleIdentifier: String)` | Creates a new collection of definitions for intents that the specified app bundle contains. |
| `bundleIdentifier` | `let bundleIdentifier: String` | The bundle identifier of the app target under test. |
| `intents` | `var intents: IntentDefinitions.DefinitionCollection<AppIntentDefinition>` | The definitions for the target app's app intents. |
| `entities` | `var entities: IntentDefinitions.DefinitionCollection<AppEntityDefinition>` | The definitions for the target app's app entities. |
| `valueQueries` | `var valueQueries: IntentDefinitions.DefinitionCollection<IntentValueQueryDefinition>` | The definitions for the app's intent value queries. |
| `transientEntities` | `var transientEntities: IntentDefinitions.DefinitionCollection<TransientAppEntityDefinition>` | Retrieve a transient app entity definition using subscript syntax. |
| `enums` | `var enums: IntentDefinitions.DefinitionCollection<AppEnumDefinition>` | The definitions for the target app's app enums. |
| `DefinitionCollection` | `struct DefinitionCollection` | A collection of a specific type of definition. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Conforms to `Sendable`, `SendableMetatype`.
- Related definition types referenced by this page: `AppIntentDefinition` ("A definition you use to dynamically create intent instances for testing."), `AppEntityDefinition` ("A definition you use to dynamically create entity instances for testing."), `IntentValueQueryDefinition` ("A definition you use to create an intent value query for testing."), `TransientAppEntityDefinition` ("A definition you use to dynamically create transient app entities for testing."), `AppEnumDefinition` ("An app enumeration definition for testing and dynamic enumeration creation."). Their member pages are not in this reference set.

## Related

- [App Intents Testing (framework overview)](./appintentstesting-overview.md)
- [AnyAppIntent](./anyappintent.md)
- [AnyAppEntity](./anyappentity.md)
- [AnyAppEnum](./anyappenum.md)
- [AnyTransientAppEntity](./anytransientappentity.md)
- [AppIntentTypeDefinition](./appintenttypedefinition.md)
