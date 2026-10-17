---
source: https://developer.apple.com/documentation/evaluations/trajectoryexpectation, https://developer.apple.com/documentation/evaluations/toolexpectation
---

# TrajectoryExpectation / ToolExpectation

The expected pattern of tool calls for an evaluation, and the specification of a single expected tool call.

## Signature / Usage

### TrajectoryExpectation

```swift
struct TrajectoryExpectation
```

`TrajectoryExpectation` specifies expected tool-calling behavior across three axes:

- Ordered: Tool calls that must occur in a specific sequence. Use `ToolExpectation` for single sequential steps, or `anyOrder(_:)` when multiple tools must all be called at a given position but their relative order doesn't matter.
- Unordered: Tool calls that must occur at some point, regardless of when.
- Disallowed: Tool calls that must NOT occur.

```swift
TrajectoryExpectation(ordered: [
    ToolExpectation("authenticate"),
    .anyOrder([
        ToolExpectation("fetchData"),
        ToolExpectation("fetchMetadata"),
    ]),
    ToolExpectation("processResults"),
], allowsAdditionalToolCalls: false)
```

```swift
TrajectoryExpectation(
    ordered: [
        ToolExpectation("findActivities"),
        ToolExpectation("estimateTravelTime"),
    ],
    unordered: [ToolExpectation("getWeather")],
    disallowed: [ToolExpectation("deleteData")]
)
```

```swift
TrajectoryExpectation(expected: "getWeather", arguments: [
    .exact(argumentName: "location", value: "Paris, France")
])
```

### ToolExpectation

```swift
struct ToolExpectation
```

Most commonly, a `ToolExpectation` identifies a single tool by name and optionally validates its arguments:

```swift
ToolExpectation("getWeather", arguments: [
    .exact(argumentName: "location", value: "Paris, France")
])
```

For ordered sequences where multiple tools must all be called at the same position but their relative order doesn't matter, use `anyOrder(_:)`:

```swift
ToolExpectation.anyOrder([
    ToolExpectation("fetchData"),
    ToolExpectation("fetchMetadata"),
])
```

## Options / Props

### TrajectoryExpectation members

| Name | Description |
|------|-------------|
| init(expected:arguments:) | Creates a trajectory expectation for a single expected tool call. |
| init(ordered:unordered:allowsAdditionalToolCalls:) | Creates a trajectory expectation with ordered and unordered requirements, and controls whether unmatched tool calls are permitted. |
| init(ordered:unordered:disallowed:) | Creates a trajectory expectation with ordered and unordered requirements, plus specific tools that the model must not call. |
| init(unordered:) | Creates a trajectory expectation with only unordered requirements. |
| ordered | Tool call steps that must be satisfied in sequential order. |
| unordered | Tool calls that must occur at some point, regardless of position. |
| disallowed | Tools that the model must NOT call. |
| allowsAdditionalCalls | A Boolean value that indicates whether to allow tool calls that don't match any expectation. |
| generatedContent | The generated content representation of this trajectory expectation. |
| generationSchema (type property) | The generation schema for this trajectory expectation. |

### ToolExpectation members

| Name | Description |
|------|-------------|
| init(_:arguments:) | Creates a new tool expectation. |
| anyOrder(_:) | Creates a group of expectations that must all be satisfied at the same sequential position, but can occur in any relative order. |
| name | The name of the tool that the evaluation expects the model to call. |
| arguments | The argument matchers to validate against the tool call. |
| isAnyOrderGroup | A Boolean value that indicates whether this expectation represents a group of expectations that can be satisfied in any order. |
| init(from:) / encode(to:) | Decode from / encode into the given decoder / encoder. |
| generatedContent | The generated content representation of this tool expectation. |
| generationSchema (type property) | The generation schema for this tool expectation. |
| PartiallyGenerated | A partially generated form of a tool expectation. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+, Xcode 27.0+.
- Both types provide `ConvertibleFromGeneratedContent` implementations.

## Related

- [ToolCallEvaluator](./tool-call-evaluator.md)
- [ArgumentMatcher / ArgumentValue / StructuredValue](./argument-matcher.md)
