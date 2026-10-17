---
source: https://developer.apple.com/documentation/appintents/parametersummary
---

# ParameterSummary

An interface for defining the visual representation of an app intent's parameters.

## Signature / Usage

```swift
protocol ParameterSummary
```

```swift
associatedtype Intent : AppIntent
```

## Options / Props

Conforming types listed on the page:

| Type | Description |
|------|-------------|
| `IntentParameterSummary` | A type that describes the user interface configuration of an app intent's parameters. |
| `ParameterSummaryString` | A human-readable string that interpolates parameter key paths to provide user-configurable placeholders in the Shortcuts app. |
| `ParameterSummaryWhenCondition` | A type that represents a conditional statement in a parameter summary. |
| `ParameterSummarySwitchCondition` | A type that represents a switch statement in a parameter summary. |
| `ParameterSummaryCaseCondition` | A type that represents an individual case of a switch statement in a parameter summary. |
| `ParameterSummaryDefaultCaseCondition` | A type that represents the default case of a switch statement in a parameter summary. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+. The source data carries no `introducedAt` for visionOS.
- The page's Overview says: "For more information about using parameters and providing a parameter summary, see" a linked article (the link text is not captured in the saved source).

## Related

- [IntentParameterSummary](./intentparametersummary.md)
- [ParameterSummaryString](./parametersummarystring.md)
- [ParameterSummary conditions](./parametersummary-conditions.md)
- [AppIntent](../intents/appintent.md)
