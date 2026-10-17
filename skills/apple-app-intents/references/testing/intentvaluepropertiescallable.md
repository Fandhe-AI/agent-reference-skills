---
source: https://developer.apple.com/documentation/appintentstesting/intentvaluepropertiescallable
---

# IntentValuePropertiesCallable

A callable wrapper that creates app intent instances from keyword arguments.

## Signature / Usage

```swift
@dynamicCallable struct IntentValuePropertiesCallable<T>
```

The wrapper uses the `@dynamicCallable` attribute to provide a natural function-call syntax for setting properties on type-erased app intents instances. Don't create instances of this type directly. Instead, use `AppIntentDefinition.makeIntent` or `TransientAppEntityDefinition.makeEntity`.

```swift
let intent = definitions.intents["OrderCoffeeIntent"]
    .makeIntent(size: "large")
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `dynamicallyCall(withKeywordArguments:)` | `func dynamicallyCall(withKeywordArguments: KeyValuePairs<String, (any IntentValueExpressing)?>) -> T` | Returns an instance of `T` by applying the provided argument values to the properties. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Conforms to `Sendable`, `SendableMetatype`.
- `AppIntentDefinition.makeIntent` is declared as `var makeIntent: IntentValuePropertiesCallable<AnyAppIntent>` ("Creates a populated instance of this intent."); `TransientAppEntityDefinition.makeEntity` is declared as `var makeEntity: IntentValuePropertiesCallable<AnyTransientAppEntity>` ("Creates a populated instance of this transient entity.").
- The `makeIntent(size: "large")` call is taken from the `IntentDefinitions` page example.

## Related

- [IntentDefinitions](./intentdefinitions.md)
- [AnyAppIntent](./anyappintent.md)
- [AnyTransientAppEntity](./anytransientappentity.md)
- [AppIntentTypeDefinition](./appintenttypedefinition.md)
