---
source: https://developer.apple.com/documentation/evaluations/generating-synthetic-evaluation-datasets
---

# Generating synthetic datasets

Expand a small set of manually written evaluation samples into a larger dataset.

## Signature / Usage

```swift
// The categories the model can assign to extracted tasks.
// The @Generable macro lets the model produce instances of this type.
@Generable
enum TaskCategory: String, Codable, Sendable {
    case work
    case personal
    case health
    case errands
    case home
}

// The structured output the model produces for each input.
@Generable
struct TaskItem: Codable, Sendable {
    var title: String
    var dueOn: String?
    var category: TaskCategory
    var isUrgent: Bool
}

let dataset: [ModelSample<TaskItem>] = [
    // Here's a health task that is non-urgent and has a due date.
    ModelSample(
        prompt: "Schedule dentist appointment for next Tuesday",
        expected: TaskItem(title: "Schedule dentist appointment",
                           dueOn: "04/07/2026", category: .health, isUrgent: false)
    ),
    // This is an errands task that is urgent and due today.
    ModelSample(
        prompt: "Buy groceries for dinner party tonight",
        expected: TaskItem(title: "Buy groceries for dinner party",
                           dueOn: "03/30/2026", category: .errands, isUrgent: true)
    ),
    // Here's a work task that's urgent and has a due date.
    ModelSample(
        prompt: "Finish quarterly report by end of week",
        expected: TaskItem(title: "Finish quarterly report",
                           dueOn: "04/03/2026", category: .work, isUrgent: true)
    ),
    // This is a home task that's non-urgent and has a due date.
    ModelSample(
        prompt: "Fix the leaky kitchen faucet this weekend",
        expected: TaskItem(title: "Fix leaky kitchen faucet",
                           dueOn: "04/05/2026", category: .home, isUrgent: false)
    ),
    // Here's a personal task that's non-urgent with no due date.
    ModelSample(
        prompt: "Learn to cook Thai food",
        expected: TaskItem(title: "Learn to cook Thai food",
                           dueOn: nil, category: .personal, isUrgent: false)
    ),
]
```

```swift
var expanded: [ModelSample<TaskItem>] = []

for try await sample in dataset.makeSamples(
    syntheticGenerationPrompt,
    targetCount: 20
) {
    expanded.append(sample)
}
```

Validating while generating:

```swift
var expanded: [ModelSample<TaskItem>] = []

for try await sample in dataset.makeSamples(
    Prompt("Generate realistic to-do list items for a busy professional."),
    targetCount: 20,
    validator: { sample in
        // Reject samples that are missing an expected value or have an empty title.
        guard let task = sample.expected else { return false }
        return !task.title.isEmpty
    }
) {
    expanded.append(sample)
}
```

Customizing the session and sampling strategy:

```swift
var expanded: [ModelSample<TaskItem>] = []

for try await sample in dataset.makeSamples(
    syntheticGenerationPrompt,
    targetCount: 20,
    sessionProvider: {
        LanguageModelSession(
            // Use the Private Compute Cloud model to generate samples.
            model: PrivateCloudComputeLanguageModel(),
            instructions: """
                You create new structured task data. Generate realistic \
                to-do list items based on the examples provided. Each item \
                needs a natural prompt, an appropriate title, correct \
                category classification, and an honest urgency rating.
                """
        )
    }
) {
    expanded.append(sample)
}
```

```swift
let generator = SampleGenerator(
    Prompt("Generate realistic to-do list items for a busy professional."),
    samples: dataset,
    targetCount: 20,
    // Use sliding window sampling.
    samplingStrategy: .slidingWindow,
    // Reject any samples that don't have an expected value or have an empty title.
    validator: { sample in
        guard let task = sample.expected else { return false }
        return !task.title.isEmpty
    }
)

// Create the expanded dataset with the generated samples.
var expanded: [ModelSample<TaskItem>] = []
for try await sample in generator.run() {
    expanded.append(sample)
}

// Inspect the rejected samples to troubleshoot issues.
let rejected = await generator.invalidSamples
```

## Notes

- Article in the Evaluations framework (iOS 27.0+, iPadOS 27.0+, macOS 27.0+, Mac Catalyst 27.0+, visionOS 27.0+, watchOS 27.0+; Xcode 27.0+).- The framework adds `makeSamples(_:targetCount:sessionProvider:validator:)` to any array of `ModelSample` values; it returns an `AsyncThrowingStream` yielding each new sample as the model generates it, and handles prompt construction, deduplication, and batch grouping.
- Include an optional `expected` value only when comparing against a known answer; for model-judge assessments of tone or fluency omit it and generate prompt-only samples.
- `targetCount` is the total size including initial samples (5 initial and a target of 20 yields up to 15 new samples).
- When generating from a non-test target (for example a command-line tool writing the dataset to disk), set `ENABLE_TESTING_SEARCH_PATHS` ("Enable Testing Search Paths") to `YES` and add `$(DEVELOPER_DIR)/..` to `LD_RUNPATH_SEARCH_PATHS` ("Runpath Search Paths").
- The `validator` closure runs once per generated sample (`true` accepts, `false` rejects); rejected samples are silently discarded unless you create a `SampleGenerator` directly and read `invalidSamples`. Still review accepted samples manually (the official page lists what to look for in a term list not reproduced here).
- Generation produces batches of up to ten per model call; the sampling strategy controls which existing samples appear as examples. `makeSamples` always uses `SampleGenerator.SamplingStrategy.random(retries:)`; create a `SampleGenerator` to use `.slidingWindow`, which steps through samples in order.
- Quality depends on seeds, prompts, and validation; see the dataset design guide.

## Related

- [Designing datasets to test your feature](./designing-evaluation-datasets.md)
- [SampleGenerator](../evaluations/sample-generator.md)
- [ModelSample](../evaluations/model-sample.md)
- [Loader](../evaluations/loader.md)
