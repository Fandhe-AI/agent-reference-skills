---
source: https://developer.apple.com/documentation/evaluations/argumentmatcher, https://developer.apple.com/documentation/evaluations/argumentvalue, https://developer.apple.com/documentation/evaluations/structuredvalue
---

# ArgumentMatcher / ArgumentValue / StructuredValue

The values that define how to validate a tool-call argument, and the value types used in argument specifications.

## Signature / Usage

### ArgumentMatcher

```swift
enum ArgumentMatcher
```

Use argument matchers to specify validation rules for tool-call arguments. You can require exact values, verify key presence, check ranges, match patterns, or use a language model for semantic matching.

```swift
let matchers: [ArgumentMatcher] = [
    .exact(argumentName: "city", value: "San Francisco"),
    .keyOnly(argumentName: "units"),
    .naturalLanguage(argumentName: "prompt", criteria: "A weather-related question")
]
```

### ArgumentValue

```swift
enum ArgumentValue
```

A primitive, generable value type for argument specifications. Unlike `StructuredValue`, this enum only contains primitive types (no recursive array or dictionary) that allows it to work with the `@Generable` macro.

```swift
let city: ArgumentValue = "San Francisco"
let count: ArgumentValue = 5
let score: ArgumentValue = 0.95
```

### StructuredValue

```swift
enum StructuredValue
```

A type-safe representation of JSON values. This type is not `@Generable` due to its recursive array or dictionary structure. For generable argument specifications, use `ArgumentValue` instead.

```swift
let name: StructuredValue = "Alice"
let score: StructuredValue = 4.5
let tags: StructuredValue = ["swift", "evaluation"]
```

## Options / Props

### ArgumentMatcher cases

| Case | Rule |
|------|------|
| exact(argumentName:value:) | Value must equal the expected value exactly. Use for identifiers, enum values, and precise inputs. |
| keyOnly(argumentName:) | Argument must be present with any value. Use when you care that the model provides the parameter but any value is acceptable. |
| oneOf(argumentName:allowedValues:) | Value must be one of the allowed options. Use for ambiguous prompts with multiple valid interpretations. |
| range(argumentName:minimum:maximum:) | Numeric value must fall within bounds (inclusive). Use for quantities where a range is acceptable. |
| pattern(argumentName:regex:) | String must match a regular expression. Use for structured formats: emails, dates, IDs. |
| contains(argumentName:substring:) | String must contain a substring. Use when the argument references a concept but phrasing varies. |
| hasPrefix(argumentName:prefix:) | String must start with a prefix. Use for paths, URLs, or namespaced values. |
| hasSuffix(argumentName:suffix:) | String must end with a suffix. Use for file extensions or domain-specific endings. |
| naturalLanguage(argumentName:criteria:) | A language model judges whether the value satisfies the criteria. Use when correctness is subjective or hard to express with string operations, for example, validating that a query argument is "a weather-related question". |

Other `ArgumentMatcher` members: `init(from:)`, `encode(to:)`, `generatedContent`, `generationSchema` (type property), `PartiallyGenerated`, and `ConvertibleFromGeneratedContent` implementations.

### ArgumentValue cases

| Case | Description |
|------|-------------|
| string(_:) | A string value. |
| int(_:) | An integer value. |
| double(_:) | A double-precision floating-point value. |
| bool(_:) | A Boolean value. |

`ArgumentValue.structuredValue` is the equivalent structured value representation.

### StructuredValue cases

| Case | Description |
|------|-------------|
| string(_:) | A string value. |
| int(_:) | An integer value. |
| double(_:) | A double-precision floating-point value. |
| bool(_:) | A Boolean value. |
| null | A null value. |
| array(_:) | An array of `StructuredValue` instances. |
| dictionary(_:) | A dictionary with string keys and `StructuredValue` instances as values. |

`StructuredValue.value` is the underlying value.

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+, Xcode 27.0+.

## Related

- [TrajectoryExpectation / ToolExpectation](./trajectory-expectation.md)
- [ToolCallEvaluator](./tool-call-evaluator.md)
