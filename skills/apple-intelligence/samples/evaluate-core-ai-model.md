---
source: https://developer.apple.com/documentation/evaluations/evaluating-a-core-ai-model
---

# Evaluate a Core AI Model

Run the same sentiment-classification evaluation against a bundled Core AI model and the default on-device model, then compare the results.

```swift
import CoreAILanguageModels

actor CoreAIModelStore {
    static let shared = CoreAIModelStore()

    private static let modelResourceName = "coreai-model"
    private var cached: CoreAILanguageModel?

    func model() async throws -> CoreAILanguageModel {
        if let cached { return cached }

        guard let url = Bundle.main.url(forResource: Self.modelResourceName, withExtension: nil) else {
            throw CoreAIModelStoreError.modelNotBundled(resourceName: Self.modelResourceName)
        }

        let model = try await CoreAILanguageModel(resourcesAt: url)
        cached = model
        return model
    }
}
```

```swift
@Generable
enum Sentiment: String, Codable {
    case negative
    case neutral
    case positive
}

@Generable
struct SentimentVerdict: Codable, Equatable {
    @Guide(description: "One short sentence explaining why this sentiment was chosen.")
    let reasoning: String
    @Guide(description: "How confident you are in the sentiment choice.", .range(0...100))
    let confidence: Int
    @Guide(description: "The overall sentiment: negative, neutral, or positive.")
    let sentiment: Sentiment
}
```

```swift
struct SentimentClassificationEvaluation: Evaluation {
    let backend: ClassifierBackend

    var name: String { backend.displayName }
    let dataset = SentimentDataset.all

    func subject(from sample: ModelSample<SentimentVerdict>) async throws -> ModelSubject<SentimentVerdict> {
        ModelSubject(value: try await SentimentClassifier.classify(sample.prompt, using: backend))
    }
}
```

```swift
func recallEvaluator(for target: Sentiment, metric: Metric) -> Evaluator<ModelSample<SentimentVerdict>> {
    Evaluator { input, subject in
        guard input.expected?.sentiment == target else { return metric.ignore() }
        return subject.value.sentiment == target
            ? metric.passing(rationale: "caught \(target.rawValue)")
            : metric.failing(rationale: "missed \(target.rawValue), predicted \(subject.value.sentiment.rawValue)")
    }
}
```

```swift
struct SentimentClassificationEvaluationTests {
    static let coreAIEvaluation = SentimentClassificationEvaluation(backend: .coreAI)

    @Test(.evaluates(Self.coreAIEvaluation, info: ["name": ClassifierBackend.coreAI.displayName]))
    func testCoreAISentimentClassification() async throws {
        let context = EvaluationContext.current
        print(context.result.groupedSummary)
    }

    static let defaultOnDeviceModelEvaluation = SentimentClassificationEvaluation(backend: .onDeviceDefault)

    @Test(.evaluates(Self.defaultOnDeviceModelEvaluation, info: ["name": ClassifierBackend.onDeviceDefault.displayName]))
    func testDefaultSentimentClassification() async throws {
        let context = EvaluationContext.current
        print(context.result.groupedSummary)
    }
}
```

## Notes

- macOS 27.0+ and Xcode 27.0+ (sample-code page). Installing the Metal Toolchain in Xcode Settings > Components is required to build a target that contains a Core AI model.
- The sample project exports the model with its own helper script before running; the script contents are not shown on the page and are not reproduced here (see `../scripts/core-ai-model-export.md`).
- Both evaluations share one 60-sample dataset and one metric set, so accuracy, precision, and recall are directly comparable in the Xcode Compare Evaluations report.
- `ClassifierBackend`, `SentimentClassifier`, and `SentimentDataset` are sample-project types; their definitions are on the source page.
- Core AI model export is covered by the apple-ml skill and MLX by apple-silicon; this sample covers the `LanguageModelSession` and Evaluations side.
