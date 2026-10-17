---
source: https://developer.apple.com/documentation/appintents/intentparametersummary
---

# IntentParameterSummary

A type that describes the user interface configuration of an app intent's parameters.

## Signature / Usage

```swift
struct IntentParameterSummary<Intent> where Intent : AppIntent
```

## Options / Props

Initializers as listed (abbreviated fragments) on the page:

| Declaration |
|-------------|
| `init()` |
| `init(() -> [PartialKeyPath<Intent>])` |
| `init(ParameterSummaryString<Intent>, table: String?)` |
| `init(ParameterSummaryString<Intent>, table: String?, () -> [PartialKeyPath<Intent>])` |

Related type listed on the page: `ParameterKeyPathsBuilder` ("A result builder that declaratively builds the path to a parameter").

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+. The source data carries no `introducedAt` for visionOS.
- Conforms to `ParameterSummary`; `ParameterSummaryString`, `ParameterSummaryWhenCondition`, `ParameterSummarySwitchCondition`, `ParameterSummaryCaseCondition`, and `ParameterSummaryDefaultCaseCondition` are the sibling types.

## Related

- [ParameterSummary](./parametersummary.md)
- [ParameterSummaryString](./parametersummarystring.md)
- [ParameterSummary conditions](./parametersummary-conditions.md)
