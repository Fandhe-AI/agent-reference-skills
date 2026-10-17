# samples

| Name | Description | Path |
|------|-------------|------|
| Book Tracker Evaluation | Evaluate a tag-generation feature end to end: code-based checks, a model judge with two dimensions, aggregated metrics, a threshold test, and tool-call trajectories. | [book-tracker-evaluation.md](./book-tracker-evaluation.md) |
| Check Model Availability | Check `SystemLanguageModel.default.availability` before showing intelligence UI, and plan a fallback. | [check-model-availability.md](./check-model-availability.md) |
| Content Tagging | Use the content tagging use case of `SystemLanguageModel` with a `@Generable` result type to extract topics, actions, objects, and emotions. | [content-tagging.md](./content-tagging.md) |
| Context Window and Prewarm | Recover from `LanguageModelError.contextSizeExceeded` by seeding a new session from a condensed transcript, and split large tasks across sessions. | [context-window-and-prewarm.md](./context-window-and-prewarm.md) |
| Core AI Model Session | Export an open source model with Core AI, load it with `CoreAILanguageModel`, and run it through a `LanguageModelSession`. | [core-ai-model-session.md](./core-ai-model-session.md) |
| Dynamic Game Content | Generate NPC dialog with a per-character session, a random encounter with a `@Generable` type, and personalize content with tools. | [dynamic-game-content.md](./dynamic-game-content.md) |
| Dynamic Profile Session | Declare `DynamicInstructions`, switch configuration with a `LanguageModelSession.DynamicProfile`, and react to life cycle events. | [dynamic-profile-session.md](./dynamic-profile-session.md) |
| Evaluate a Core AI Model | Run the same sentiment-classification evaluation against a bundled Core AI model and the default on-device model, then compare the results. | [evaluate-core-ai-model.md](./evaluate-core-ai-model.md) |
| Evaluation with Swift Testing | Define an `Evaluation` with a dataset, subject, evaluators, and aggregated metrics, then run it from a Swift Testing function with the `evaluates` trait. | [evaluation-swift-testing.md](./evaluation-swift-testing.md) |
| Generate Text with a Session | Create a `LanguageModelSession` with instructions, send a prompt, and tune the request with `GenerationOptions`. | [generate-text-with-session.md](./generate-text-with-session.md) |
| Guided Generation | Describe the output as a `@Generable` Swift type, or as a runtime `DynamicGenerationSchema`, so the model returns structured values instead of raw strings. | [guided-generation.md](./guided-generation.md) |
| Key-Value Caching | Keep a stable instruction and tool prefix, prewarm the session, and order dynamic instructions so the key-value cache stays valid. | [kv-caching.md](./kv-caching.md) |
| Languages and Locales | Check locale support before calling the model, set the locale phrase in instructions, and force an output language. | [languages-and-locales.md](./languages-and-locales.md) |
| Model-Judge Evaluation | Score subjective quality with `ModelJudgeEvaluator`: a pointwise evaluation, multi-dimension scoring with `ScoreDimension`, a pairwise comparison, and the Swift Testing run. | [model-judge-evaluation.md](./model-judge-evaluation.md) |
| Multimodal Image Prompt | Include images in a prompt with `Attachment`, classify an image into a `@Generable` enum, and use the Vision `BarcodeReaderTool`. | [multimodal-image-prompt.md](./multimodal-image-prompt.md) |
| Private Cloud Compute Session | Route a `LanguageModelSession` through `PrivateCloudComputeLanguageModel`, check availability and quota, and raise the reasoning level. | [private-cloud-compute-session.md](./private-cloud-compute-session.md) |
| Python Basic Usage | Check availability of the on-device model and run a multi-turn session with the Foundation Models SDK for Python. | [python-basic-usage.md](./python-basic-usage.md) |
| Python Evaluation with Transcripts | Export a Swift session transcript as JSON, then load and analyze it in Python (or produce one directly in Python). | [python-evaluation-transcripts.md](./python-evaluation-transcripts.md) |
| Python Guided Generation | Constrain output to a Python class with the `@fm.generable` decorator and `fm.guide()` constraints. | [python-guided-generation.md](./python-guided-generation.md) |
| Python Streaming | Stream text chunks from a session with `stream_response` in the Foundation Models SDK for Python. | [python-streaming.md](./python-streaming.md) |
| Python Tools | Subclass `fm.Tool` with generable arguments, register it with a session, and handle `ToolCallError`. | [python-tools.md](./python-tools.md) |
| Safety Error Handling | Catch `guardrailViolation` and `refusal` errors, constrain input and output, and add safety instructions and a deny list. | [safety-error-handling.md](./safety-error-handling.md) |
| Stream Partial Responses into SwiftUI | Stream `Itinerary.PartiallyGenerated` values with `streamResponse(generating:...)` and render them as they arrive. | [stream-response-swiftui.md](./stream-response-swiftui.md) |
| Synthetic Dataset | Expand a small set of `ModelSample` values into a larger evaluation dataset with `makeSamples`, a validator, a custom session provider, and `SampleGenerator`. | [synthetic-dataset.md](./synthetic-dataset.md) |
| Tool-Call Evaluation | Check which tools the model calls and with which arguments by attaching a `TrajectoryExpectation` to each sample and scoring with `ToolCallEvaluator`. | [tool-call-evaluation.md](./tool-call-evaluation.md) |
| Tool Calling | Define a `Tool` with `@Generable` arguments, pass it to a session, control the tool calling mode, and handle `ToolCallError`. | [tool-calling.md](./tool-calling.md) |
| Transcript Inspection and Feedback | Iterate a session transcript, record it as JSON, and package a response as a feedback attachment with `logFeedbackAttachment`. | [transcript-feedback.md](./transcript-feedback.md) |
</content>
