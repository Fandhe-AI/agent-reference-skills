---
source: https://developer.apple.com/documentation/foundationmodels/prompting-an-on-device-foundation-model
---

# Prompting an on-device foundation model

Tailor your prompts to get effective results from an on-device model.

## Signature / Usage

```swift
@Generable
struct ReasonableAnswer {
    // A property the model uses for reasoning.
    var reasoningSteps: String
    
    @Guide(description: "The answer only.")
    var answer: MyCustomGenerableType // Replace with your custom generable type.
}
```

```swift
let instructions = """
    Answer the person's question.
    1. Begin your response with a plan to solve this question.
    2. Follow your plan's steps and show your work.
    3. Deliver the final answer in `answer`.
    """
var session = LanguageModelSession(instructions: instructions)

// The answer should be 30 days.
let prompt = "How many days are in the month of September?"
let response = try await session.respond(
    to: prompt,
    generating: ReasonableAnswer.self
)
```

Programming logic instead of conditional prompting:

```swift
var customGreeting = ""
switch role {
case .bard:
    customGreeting = """
        This guest is a bard. Ask if they're willing to play music for the inn tonight.
        """
case .soldier:
    customGreeting = """
        This guest is a soldier. Ask if there's been any dangerous activity in the area.
        """
case .sorcerer:
    customGreeting = """
        This guest is a sorcerer. Comment on their magical appearance.
        """
default:
    customGreeting = "This guest is a weary traveler."
}

let instructions = """
    You are a friendly inn keeper. Generate a greeting to a new guest that walks in the door.
    \(customGreeting)
    There is one single and one double room available.
    """
```

## Options / Props

Strategies to improve instruction following:

| Strategy | Approach |
|----------|----------|
| Improve clarity | Improve the wording of your input to make it more direct, concise, and easier to read. |
| Use emphasis | Emphasize the importance of a command by adding words like "must", "should", "do not", or avoid". |
| Repeat yourself | Try repeating key instructions at the end of your input to emphasize the importance. |

Prompting strategies:

| Strategies to use | Strategies to avoid |
|-------------------|---------------------|
| Focus on a single, well-defined goal | Combining multiple unrelated requests |
| Be direct with imperative verbs like "List" or "Create" | Unnecessary politeness or hedging |
| Tell the model what role to play, for example, an interior designer | Passive voice, for example, "code needs to be optimized" |
| Write in direct, conversational tone with simple, clear sentences | Jargon the model might not understand or interpret incorrectly |
| State your request clearly | Too short of a prompt that doesn't outline the task |
| Limit your prompt to one to three paragraphs | Too long of a prompt that makes it hard to identify what the task is |

## Notes

- Article in the Foundation Models framework (iOS 26.0+, iPadOS 26.0+, macOS 26.0+, Mac Catalyst 26.0+, visionOS 26.0+, watchOS 27.0+).
- The on-device model is much smaller than server-based frontier models, so prompts must be concise and specific. Test prompts throughout development.
- Techniques listed: simple clear instructions; iterate on output; provide a reasoning field before answering; reduce the thinking the model needs to do; split complex prompts into simpler requests; add "if-else" logic to conditional prompts; shot-based prompting (one-shot, few-shot, zero-shot).
- Use the phrase "you are" to give a role; "expert" makes the model speak with more authority. Also give a role or persona for the person using your app, and match the tone you want in the prompt's own voice.
- Reduce reasoning burden by giving the model a step-by-step plan. If the task is still unreliable, split steps across multiple `LanguageModelSession` instances (each with a new context window); start with a single request because multiple requests lengthen inference time.
- Conditional prompting: the on-device model can handle some conditionals, but too much complexity hurts instruction following. Customize instructions programmatically so the model is not distracted by conditionals that do not apply; this also reduces context window size.
- Few-shot prompting: give between 2-15 examples and keep each as simple as possible. Long or complex examples may be repeated or cause hallucinated details. Few-shot also works with guided generation (each example can correspond to a `Generable` struct).
- Reasoning prompts ("think through this problem step by step") can insert unexpected text into a `Generable` structure. Give the model a dedicated reasoning field and make it the first property. If the answer is still unreliable, the task may be too difficult for the on-device model.
- When the model fails to do something you expect, file a report with your prompt via Feedback Assistant; see `logFeedbackAttachment(sentiment:issues:desiredOutput:)`.

## Related

- [Managing the context window](./managing-the-context-window.md)
- [Updating prompts for new model versions](./updating-prompts-for-new-model-versions.md)
- [Generating Swift data structures with guided generation](./guided-generation.md)
- [Evaluating prompts](./evaluating-prompts.md)
