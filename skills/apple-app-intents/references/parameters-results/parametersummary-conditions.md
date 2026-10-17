---
source: https://developer.apple.com/documentation/appintents/parametersummarywhencondition
---

# ParameterSummary conditions (When / Switch / Case / DefaultCase)

Types that add conditional logic to a `ParameterSummary`. This page aggregates `ParameterSummaryWhenCondition`, `ParameterSummarySwitchCondition`, `ParameterSummaryCaseCondition`, and `ParameterSummaryDefaultCaseCondition`.

## Signature / Usage

```swift
struct ParameterSummaryWhenCondition<Intent, WhenCondition, Otherwise> where Intent : AppIntent, WhenCondition : ParameterSummary, Otherwise : ParameterSummary

struct ParameterSummarySwitchCondition<Intent, Value, CaseCondition> where Intent : AppIntent, Value : _IntentValue, CaseCondition : _ParameterSummarySwitchCase

struct ParameterSummaryCaseCondition<Intent, Value, Summary> where Intent : AppIntent, Value : _IntentValue, Summary : ParameterSummary

struct ParameterSummaryDefaultCaseCondition<Intent, Value, Summary> where Intent : AppIntent, Value : _IntentValue, Summary : ParameterSummary
```

`ParameterSummaryWhenCondition` initializer (abbreviated fragment from the page's topic list):

```swift
init<ValueType, Parameter>(KeyPath<Intent, Parameter>, EquatableComparisonOperator, ValueType, () -> WhenCondition, otherwise: () -> Otherwise)
```

## Options / Props

Comparison operator enums listed under `ParameterSummaryWhenCondition`:

| Type | Description |
|------|-------------|
| `EquatableComparisonOperator` | Operators that indicate the type of equality check for a conditional statement. |
| `ComparableComparisonOperator` | Operators that indicate the type of comparison check for a conditional statement. |
| `HasValueComparisonOperator` | Operators that indicate the type of value check for a conditional statement. |
| `OneOfComparisonOperator` | Operators that indicate the type of containment check for a conditional statement. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+ (verified for all four types). The source data carries no `introducedAt` for visionOS.
- Descriptions: `ParameterSummaryWhenCondition` is "A type that represents a conditional statement in a parameter summary"; `ParameterSummarySwitchCondition` is "A type that represents a switch statement in a parameter summary"; `ParameterSummaryCaseCondition` is "A type that represents an individual case of a switch statement in a parameter summary"; `ParameterSummaryDefaultCaseCondition` is "A type that represents the default case of a switch statement in a parameter summary".
- `ParameterSummaryWhenCondition` has multiple initializer overloads; only one is reproduced here.

## Related

- [ParameterSummary](./parametersummary.md)
- [IntentParameterSummary](./intentparametersummary.md)
- [ParameterSummaryString](./parametersummarystring.md)
