---
source: https://developer.apple.com/documentation/evaluations/generating-synthetic-evaluation-datasets
---

# Synthetic Dataset

Expand a small set of `ModelSample` values into a larger evaluation dataset with `makeSamples`, a validator, a custom session provider, and `SampleGenerator`.

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
]
```

```swift
let syntheticGenerationPrompt = Prompt("""
    Generate realistic to-do list items that a busy professional might have. \
    Each input is a natural-language request, and the expected output is the structured \
    task extracted from it. Cover a mix of work tasks (meetings, deadlines, \
    reviews), personal errands (shopping, appointments), health activities \
    (exercise, checkups), and home maintenance. Vary urgency and whether a \
    due date is specified.
    """)
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

- iOS 27.0+ / macOS 27.0+ / Xcode 27.0+ (Evaluations framework). The listing is trimmed to two seed samples; the article uses five.
- `targetCount` is the total dataset size including the initial samples; samples are generated in batches of up to ten per model call.
- `makeSamples` silently discards samples a validator rejects; create a `SampleGenerator` directly to read `invalidSamples`.
- When generating from a non-test target such as a command-line tool, set `ENABLE_TESTING_SEARCH_PATHS` to `YES` and add `$(DEVELOPER_DIR)/..` to `LD_RUNPATH_SEARCH_PATHS`.
- Pass a `sessionProvider` closure to choose the model and instructions the generator uses (the article shows `PrivateCloudComputeLanguageModel`).
