---
source: https://developer.apple.com/documentation/evaluations/evaluating-tool-calling-behavior
---

# Evaluating tool-calling behavior

Analyze your model's tool calls against expected trajectories, argument values, and call ordering.

## Signature / Usage

```swift
import FoundationModels

struct SetLights: Tool {
    let name = "set_lights"
    let description = "Controls lights in a room. Brightness 0 means off, 100 means full."

    // The arguments the model passes to the tool.
    @Generable
    struct Arguments {
        @Guide(description: "Which room, e.g. 'living room', 'bedroom', 'all'")
        var room: String
        @Guide(description: "Brightness from 0 (off) to 100 (full)")
        var brightness: Int
    }

    // The implementation of the call.
    func call(arguments: Arguments) async throws -> String {
        "ok"
    }
}
```

```swift
struct LightControlEvaluation: Evaluation {
    let dataset = ArrayLoader(samples: [
            ModelSample(
                prompt: "Turn off the living room lights.",
                expectations: TrajectoryExpectation(
                    expected: "set_lights", arguments: [
                        .exact(argumentName: "room", value: .string("living room")),
                        .exact(argumentName: "brightness", value: .int(0)),
                    ]
                )
            ),
            ModelSample(
                prompt: "Set the bedroom lights to full brightness.",
                expectations: TrajectoryExpectation(
                    expected: "set_lights", arguments: [
                        .exact(argumentName: "room", value: .string("bedroom")),
                        .exact(argumentName: "brightness", value: .int(100)),
                    ]
                )
            ),
        ])

    func subject(from sample: ModelSample<String>) async throws -> ModelSubject<String> {
        let session = LanguageModelSession(
            tools: [SetLights(), SetThermostat(), LockDoor()],
            instructions: "You are a smart home assistant. Use tools to fulfill requests."
        )
        let response = try await session.respond(
            to: sample.prompt,
            generating: String.self
        )
        // Capture the structured transcript from the session.
        let transcript = session.transcript.structuredTranscript
        return ModelSubject(value: response.content, transcript: transcript)
    }

    // ToolCallEvaluator writes its results to these two metrics.
    let toolsAllPass = Metric("ToolsAllPass")
    let toolsPercentagePass = Metric("ToolsPercentagePass")

    var evaluators: Evaluators {
        ToolCallEvaluator(allPass: toolsAllPass, percentagePass: toolsPercentagePass)
    }

    // Compute the mean of each metric across all samples.
    func aggregateMetrics(using aggregator: inout MetricsAggregator) {
        aggregator.computeMean(of: toolsAllPass)
        aggregator.computeMean(of: toolsPercentagePass)
    }
}
```

Flexible matchers:

```swift
ModelSample(
    prompt: "I'm feeling a bit cold.",
    expectations: TrajectoryExpectation(
        // Accept either "warm" or "comfortable" as a valid response to feeling cold.
        expected: "set_thermostat", arguments: [
            .oneOf(argumentName: "preset", allowedValues: [
                .string("warm"), .string("comfortable"),
            ]),
        ]
    )
),
ModelSample(
    prompt: "Dim the living room lights a little.",
    expectations: TrajectoryExpectation(
        // Allow any brightness between 20 and 80. "A little" is subjective.
        expected: "set_lights", arguments: [
            .exact(argumentName: "room", value: .string("living room")),
            .range(argumentName: "brightness", minimum: 20, maximum: 80),
        ]
    )
),
```

Ordering, unordered, and disallowed calls:

```swift
ModelSample(
    prompt: "Start movie night.",
    expectations: TrajectoryExpectation(
        ordered: [
            // Dim the lights first.
            ToolExpectation("set_lights", arguments: [
                .exact(argumentName: "room", value: .string("living room")),
                .range(argumentName: "brightness", minimum: 5, maximum: 40),
            ]),
            // Then turn on the TV.
            ToolExpectation("set_tv", arguments: [
                .exact(argumentName: "power", value: .string("on")),
            ]),
        ]
    )
),
```

```swift
ModelSample(
    prompt: "What's the current temperature?",
    expectations: TrajectoryExpectation(
        ordered: [
            ToolExpectation("get_thermostat"),
        ],
        disallowed: [
            // A read-only query must never change settings.
            ToolExpectation("set_thermostat"),
            ToolExpectation("set_lights"),
        ]
    )
),
```

```swift
ModelSample(
    prompt: "I'm home, let me in.",
    expectations: TrajectoryExpectation(
        ordered: [
            ToolExpectation("unlock_door", arguments: [
                .exact(argumentName: "door", value: .string("front")),
            ]),
            // Both must happen after the door unlocks, in either order.
            ToolExpectation.anyOrder([
                ToolExpectation("set_lights", arguments: [
                    .exact(argumentName: "room", value: .string("living room")),
                    .exact(argumentName: "brightness", value: .int(100)),
                ]),
                ToolExpectation("set_thermostat", arguments: [
                    .exact(argumentName: "preset", value: .string("warm")),
                ]),
            ]),
        ],
        allowsAdditionalToolCalls: false
    )
),
```

Running:

```swift
import Testing
import Evaluations

struct LightControlTests {
    @Test(.evaluates(LightControlEvaluation()))
    func lightControl() async throws {
        let result = EvaluationContext.current.result
        let evaluation = LightControlEvaluation()
        let strict = result.aggregateValue(.mean(of: evaluation.toolsAllPass))
        #expect(strict > 0.9)
    }
}
```

## Notes

- Article in the Evaluations framework (iOS 27.0+, iPadOS 27.0+, macOS 27.0+, Mac Catalyst 27.0+, visionOS 27.0+, watchOS 27.0+; Xcode 27.0+).- Tool-calling evaluation measures whether the model selects the right tool with the right arguments, not what the tool does; simple stubs returning a string work. Capture `session.transcript.structuredTranscript` in the `ModelSubject` so the evaluator can inspect tool calls.
- `TrajectoryExpectation` describes expected tool calls for a prompt; each argument matcher controls how strictly a value is compared. `ArgumentMatcher.exact(argumentName:value:)` requires a precise match; `oneOf(argumentName:allowedValues:)` accepts any value from a set; `range(argumentName:minimum:maximum:)` accepts numeric values in a range; `contains(argumentName:substring:)` is also used. `ArgumentMatcher` provides nine validation strategies (the list is in the official page, not reproduced here).
- `init(ordered:unordered:allowsAdditionalToolCalls:)`: ordered expectations are matched sequentially in the transcript (each after the previous); `init(unordered:)` matches each expectation against the entire transcript regardless of position; both can be mixed and the model must satisfy both for the strict metric to pass. `disallowed` defines negative constraints; with argument matchers only calls matching those arguments are flagged, omit matchers to disallow a tool entirely. `ToolExpectation.anyOrder(_:)` groups tools in any order at a single position in an ordered sequence.
- By default unmatched tool calls are allowed; set `allowsAdditionalCalls` to `false` to fail any unmatched call. In that case unexpected calls inflate the `ToolsPercentagePass` denominator (2 expected + 1 unexpected reports 0.67 rather than 1.0).
- `ToolCallEvaluator` writes two metrics per sample: `ToolsAllPass` (strict; use to track threshold) and `ToolsPercentagePass` (partial progress, for example 0.33 when only one of three expected tools matches). The official page explains each in a term list not reproduced here.
- Combine `ToolCallEvaluator` with content evaluators (for example an exact-match `Evaluator`) to verify both tool use and answer quality; group metrics with `group(_:_:)`.
- Run with Swift Testing by attaching `EvaluationTrait`.

## Related

- [ToolCallEvaluator](../evaluators/tool-call-evaluator.md)
- [TrajectoryExpectation](../evaluators/trajectory-expectation.md)
- [ArgumentMatcher](../evaluators/argument-matcher.md)
- [Expanding generation with tool calling](./tool-calling.md)
- [Evaluating language model responses](./evaluating-language-model-responses.md)
