---
source: https://developer.apple.com/documentation/appintentstesting
---

# App Intents Testing (framework overview)

Test your app intents, entities, queries, and integration with system features like Siri or Spotlight.

## Signature / Usage

Use App Intents Testing to run and test your app intents, entities, enums, and query logic out-of-process, the same way Siri or Shortcuts perform them. The framework provides type-erased APIs that let you reference intents by name, set their parameters, and run them without linking against your app target.

```swift
let definitions = IntentDefinitions(
    bundleIdentifier: "com.apple.example"
)

let intent = definitions.intents["OrderCoffeeIntent"]
    .makeIntent(size: "large")
```

## Options / Props

| Topic group | Members |
|-------------|---------|
| Essentials | Testing your App Intents code (article) |
| Intents, entities, enums, and queries | `IntentDefinitions` |
| Intent and query result verification | `ResolvedIntentResult`, `ResolvedValueQueryResult` |
| Entity annotation testing | `ViewAnnotation` |
| Intermediate types | `AnyAppIntent`, `AnyAppEntity`, `AnyEntityQuery`, `AnyAppEnum`, `AnyTransientAppEntity` |
| Supporting types | `AppIntentTypeDefinition`, `DynamicPropertyPath`, `DynamicPropertyPathCollection`, `IntentValuePropertiesCallable` |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- The framework tests intents out-of-process and can also verify integration with system features like Siri or Spotlight.
- The "Testing your App Intents code" article is not included in this reference set; its abstract is "Evaluate intents, entities, and queries, and verify your integration with system features like Spotlight and Siri."

## Related

- [IntentDefinitions](./intentdefinitions.md)
- [AnyAppIntent](./anyappintent.md)
- [ResolvedIntentResult](./resolvedintentresult.md)
- [ResolvedValueQueryResult](./resolvedvaluequeryresult.md)
- [ViewAnnotation](./viewannotation.md)
