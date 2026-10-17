# python-sdk

| Name | Description | Path |
|------|-------------|------|
| Attachment (Python) | Attachment classes for passing images to a model as part of a prompt, plus the `Prompt` type alias and prompt errors. | [attachment.md](./attachment.md) |
| Errors (Python) | Exception classes of the Foundation Models SDK for Python. | [errors.md](./errors.md) |
| generable / guide / GenerationSchema (Python) | Guided generation API for structured outputs: the `@generable` decorator, the `guide()` field helper, `Generable`, `GeneratedContent`, and `GenerationSchema`. | [generable.md](./generable.md) |
| GenerationOptions (Python) | Options that control how the model generates its response to a prompt: sampling strategy, temperature, and maximum response tokens. | [generation-options.md](./generation-options.md) |
| LanguageModelSession (Python) | Manages the lifecycle of a session with a foundation model: session history (transcript), tool calls, and both full and streaming responses. | [session.md](./session.md) |
| SystemLanguageModel (Python) | Interface to the on-device foundation model used by Apple Intelligence, with use case and guardrail configuration, availability check, and token counting. | [system-model.md](./system-model.md) |
| Tool (Python) | Base class for tools that foundation models can invoke during generation; bridges Python async functions to the Foundation Models API. | [tools.md](./tools.md) |
| Transcript (Python) | Access to a session's history: all user prompts, model responses, and tool invocations, as a dictionary following the Foundation Models Swift transcript structure. | [transcript.md](./transcript.md) |
