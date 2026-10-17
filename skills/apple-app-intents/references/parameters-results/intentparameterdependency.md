---
source: https://developer.apple.com/documentation/appintents/intentparameterdependency
---

# IntentParameterDependency

A property wrapper that represents an app intent dependency you use to provide dynamic options.

## Signature / Usage

```swift
@propertyWrapper final class IntentParameterDependency<Intent> where Intent : AppIntent
```

Use the `IntentParameterDependency` property wrapper for properties that represent dynamic options in your `AppIntent` implementations, as in the following example from the page:

```swift
struct SoupQuery: EntityStringQuery {
    @IntentParameterDependency<OrderSoup>(
        \.$quantity
    )
    var orderSoup

    func entities(matching string: String) async throws -> [Soup] {
        guard let orderSoup else {
            return []
        }
        return Soup.allSoups.filter {
            $0.name.contains(string) &&
            $0.availableQuantity >= orderSoup.quantity
        }
    }
}
```

## Options / Props

Initializers are listed on the page as key-path based forms, available when `Intent` conforms to `AppIntent`:

| Name | Description |
|------|-------------|
| `convenience init<V0, P0>(KeyPath<Intent, P0>)` | One-key-path form; further overloads add `V1`, ... generic parameter pairs |

## Notes

- iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+. The source data carries no `introducedAt` for visionOS.
- Listed under "Enable people to configure app intents with their custom input values" together with `IntentParameter`, `DynamicOptionsProvider`, `InputConnectionBehavior`, and `IntentParameterContext`.

## Related

- [DynamicOptionsProvider](./dynamicoptionsprovider.md)
- [IntentParameter](./intentparameter.md)
- [AppIntent](../intents/appintent.md)
