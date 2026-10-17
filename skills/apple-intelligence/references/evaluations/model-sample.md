---
source: https://developer.apple.com/documentation/evaluations/modelsample, https://developer.apple.com/documentation/evaluations/modelsampleinput, https://developer.apple.com/documentation/evaluations/modelsampleoutput, https://developer.apple.com/documentation/evaluations/modelsampleprotocol, https://developer.apple.com/documentation/evaluations/sampleprotocol
---

# ModelSample

A general-purpose language model evaluation sample. Accepts string-based prompts and instructions. For multimodal prompts, create a custom `ModelSampleProtocol` conformance or use `init(input:expected:expectations:)` with a prebuilt `ModelSampleInput`.

## Signature / Usage

```swift
struct ModelSample<ExpectedValue> where ExpectedValue : Decodable, ExpectedValue : Encodable, ExpectedValue : Sendable
```

```swift
let sample = ModelSample(prompt: "The capital of France is...", expected: "Paris.")
```

### SampleProtocol

```swift
protocol SampleProtocol : Decodable, Encodable, Sendable
```

```swift
struct MySample: SampleProtocol {
    var input: String
    var expected: String?
}
```

Each sample has an input that's displayed in the DataFrame "Input" column, and an optional expected value for comparison.

### ModelSampleProtocol

```swift
protocol ModelSampleProtocol : SampleProtocol where Self.ExpectedValue : Decodable, Self.ExpectedValue : Encodable, Self.ExpectedValue : Sendable
```

```swift
let sample = ModelSample(
    prompt: "What's the weather?",
    expected: "Sunny",
    expectations: TrajectoryExpectation(ordered: [
        ToolExpectation("get_weather")
    ])
)
```

### ModelSampleInput

```swift
struct ModelSampleInput
```

```swift
@Generable
struct WeatherAnswer {
    let condition: String
}

let input = ModelSampleInput(
    prompt: Prompt("What's the weather like in Cupertino?"),
    instructions: Instructions("Respond with the weather condition only."),
    generationSchema: GenerationSchema(type: WeatherAnswer.self, properties: [])
)
```

### ModelSampleOutput

```swift
struct ModelSampleOutput<Value, Expectation> where Value : Decodable, Value : Encodable, Value : Sendable, Expectation : Decodable, Expectation : Encodable, Expectation : Sendable
```

## Options / Props

| Name | Owner | Description |
|------|-------|-------------|
| init(prompt:expected:instructions:generationSchema:expectations:) | ModelSample | Two overloads: string-based prompt and instructions; or a FoundationModels prompt. |
| init(input:expected:expectations:) | ModelSample | Creates a model sample with a prebuilt input. |
| prompt / promptDescription | ModelSample | The user's prompt; a text representation synthesized from its segments. |
| instructions / instructionsDescription | ModelSample | Optional instructions; a text representation synthesized from their segments. |
| input | ModelSample | The bundled language model input (prompt, instructions, schema). |
| expected | ModelSample | The expected output for comparison. |
| output | ModelSample | The expected output value and evaluation expectations. |
| expectations | ModelSample | The expected pattern of tool calls for this sample. |
| generationSchema | ModelSample | The output schema for the model's response. |
| init(prompt:instructions:generationSchema:) | ModelSampleInput | Creates a model sample input with the given prompt, instructions, and schema. |
| prompt, instructions, generationSchema, description, promptDescription, instructionsDescription | ModelSampleInput | Input properties; `description` is equivalent to `promptDescription`. |
| init(value:expectations:) | ModelSampleOutput | Creates a model sample output with an optional expected value and expectations. |
| value, expectations | ModelSampleOutput | Expected output value; expected behavior, for example, tool-call trajectory. |
| ExpectedValue, Input, expected, input | SampleProtocol | Associated types and properties. |
| Expectation, input, output | ModelSampleProtocol | Expectation type; bundled input; expected output and expectations. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+, Xcode 27.0+.
- `ModelSampleProtocol` extends `SampleProtocol` with prompt, instructions, and evaluation expectations; use `ModelSample` for the common case and custom conformances when you need additional properties.
- `ModelSampleInput` synthesizes text representations for display, logging, and synthetic data.

## Related

- [Loader](./loader.md)
- [SampleGenerator](./sample-generator.md)
- [Evaluation](./evaluation.md)
