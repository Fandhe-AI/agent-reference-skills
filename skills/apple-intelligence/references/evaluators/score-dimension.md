---
source: https://developer.apple.com/documentation/evaluations/scoredimension, https://developer.apple.com/documentation/evaluations/scorelevel, https://developer.apple.com/documentation/evaluations/scoringmode, https://developer.apple.com/documentation/evaluations/scoringscale
---

# ScoreDimension / ScoreLevel / ScoringMode / ScoringScale

Types that define what a model judge scores and the scale it scores on.

## Signature / Usage

### ScoreDimension

```swift
struct ScoreDimension
```

A named scoring dimension for a model evaluator. Each dimension defines a name (used as the DataFrame column), an optional description, and a `ScoringScale` that defines what each score means.

```swift
ScoreDimension("Grammar", scale: .numeric([
    5: "Flawless grammar throughout",
    3: "Some errors but generally readable",
    1: "Pervasive errors making text difficult to understand"
]))
```

```swift
ScoreDimension("Safe", scale: .passFail(
    passDescription: "The response is safe and appropriate",
    failDescription: "The response contains harmful content"
))
```

### ScoringScale

```swift
struct ScoringScale
```

A scoring scale that defines the set of options a judge can assign.

```swift
// Numeric scale
let _ = ScoringScale.numeric([5: "Flawless", 3: "Readable", 1: "Incomprehensible"])

// Pass or fail
let _ = ScoringScale.passFail(passDescription: "Safe", failDescription: "Unsafe")

// Typed enum
enum SafetyLevel: ScoreLevel {
    case safe, unsafe
    var guideDescription: String { self == .safe ? "Safe" : "Unsafe" }
    var value: Double { self == .safe ? 1 : 0 }
}
let _ = ScoringScale.custom(SafetyLevel.self)
```

### ScoreLevel

```swift
protocol ScoreLevel : CaseIterable, Hashable, Sendable
```

A type that defines individual levels within a scoring scale. Conform an enumeration to `ScoreLevel` to create a typed, reusable scoring vocabulary. Each case represents one level a model judge can assign. Labels default to the case name using `String(describing:)`. Override `label` for human-readable formatting.

```swift
enum SafetyLevel: ScoreLevel {
    case safe, unsafe

    var guideDescription: String {
        switch self {
        case .safe: "The response is safe and appropriate"
        case .unsafe: "The response contains harmful content"
        }
    }

    var value: Double {
        switch self {
        case .safe: 1
        case .unsafe: 0
        }
    }
}

let dimension = ScoreDimension("Safety", scale: .custom(SafetyLevel.self))
```

### ScoringMode

```swift
enum ScoringMode
```

The scoring constraint mode for a model evaluator. The mode controls whether the model judge can return any floating-point score, or structured generation constrains it to return exactly one of the scale values that the dimension defines.

```swift
let mode: ScoringMode = .discrete
```

## Options / Props

### ScoreDimension

| Member | Description |
|--------|-------------|
| init(_:description:scale:) | Creates a scoring dimension. |
| name | The name of the dimension, used as the DataFrame column name. |
| metric | A metric identifier that uses this dimension's name. |
| scale | The scoring scale for this dimension. |
| description | An optional description providing additional context for the model judge about what this dimension measures. |

### ScoringScale

| Member | Description |
|--------|-------------|
| passFail(passDescription:failDescription:) | Creates a binary pass or fail scoring scale. |
| numeric(_:) | Creates a scoring scale from a numeric dictionary. |
| custom(_:) | Creates a scoring scale from a typed score level enum. |
| init(options:) | Creates a scoring scale with explicit options. |
| options | The scale options, ordered from highest to lowest value. |
| ScaleOption | A single option in a scoring scale. |

### ScoreLevel

| Member | Description |
|--------|-------------|
| guideDescription | Rubric guidance the model judge references for this level. |
| label | A short judge-facing label for this level. |
| value | The numeric value for this level that metric aggregation references. |

### ScoringMode

| Case | Description |
|------|-------------|
| continuous | A mode that allows the model to return any floating-point value. The scale serves as a guide but is not enforced at the generation level. |
| discrete | A mode that requires the model to return exactly one of the values defined in the scoring dimension's scale, enforced using structured generation. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+, Xcode 27.0+.

## Related

- [ModelJudgeEvaluator](./model-judge-evaluator.md)
- [ModelJudgePrompt](./model-judge-prompt.md)
- [Metric](./metric.md)
