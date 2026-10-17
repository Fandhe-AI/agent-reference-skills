---
source: https://developer.apple.com/documentation/evaluations/evaluating-tool-calling-behavior
---

# Tool-Call Evaluation

Check which tools the model calls and with which arguments by attaching a `TrajectoryExpectation` to each sample and scoring with `ToolCallEvaluator`.

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
    // Continued below in the next two code snippets...
```

```swift
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
    // Continued below in the next code snippet...
```

```swift
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

- iOS 27.0+ / macOS 27.0+ / Xcode 27.0+ (Evaluations framework).
- Tool-call evaluation measures tool selection and arguments, not what the tool does; stub tools returning a string are enough. `SetThermostat` and `LockDoor` follow the same pattern as `SetLights` and are not shown in the article.
- `ToolsAllPass` is the strict metric; `ToolsPercentagePass` tracks partial progress during prompt iteration.
- `TrajectoryExpectation` also supports `unordered:`, `disallowed:`, `ToolExpectation.anyOrder(_:)`, and `allowsAdditionalToolCalls: false`; other `ArgumentMatcher` cases include `oneOf`, `range`, and `contains`.
- Distinct from cloud tool-use evaluation in openai-evals-tuning and anthropic-prompt-eval.
