# interactions-core

| Name | Description | Path |
|------|-------------|------|
| Background execution | Set `background: true` on `interactions.create` to run long tasks asynchronously on the server and poll the interaction ID. | [background-execution.md](./background-execution.md) |
| Context caching (implicit) | Implicit caching is enabled by default for Gemini 2.5 and newer models; cost savings apply automatically on cache hits. | [implicit-caching.md](./implicit-caching.md) |
| Long decode | Long decode lets Gemini 4 Argon generate past 64K tokens, up to the 1M-token unified context window, via background execution. | [long-decode.md](./long-decode.md) |
| Optimization and inference | Mechanisms for balancing speed, cost, and reliability: standard, Flex, Priority, Batch, and caching, plus agentic video processing. | [optimization.md](./optimization.md) |
| Prompt design strategies | Basic concepts, strategies, and best practices for designing prompts for Gemini models, including Gemini 3 and agentic-workflow guidance. | [prompting-strategies.md](./prompting-strategies.md) |
| Safety and factuality guidance | Guidance on safety risks when building LLM applications, with recommended design, testing, and monitoring steps. | [safety-guidance.md](./safety-guidance.md) |
| Safety settings | Pass `safety_settings` when creating an interaction to adjust filter thresholds per harm category. | [safety-settings.md](./safety-settings.md) |
| Streaming interactions | Set `stream: true` on `interactions.create` to receive the response incrementally as server-sent events (SSE). | [streaming.md](./streaming.md) |
| Structured outputs | Configure `response_format` so Gemini returns JSON that adheres to a JSON Schema; the SDKs also accept Pydantic and Zod schemas. | [structured-output.md](./structured-output.md) |
| Text generation | Generate text output from text, image, video, and audio inputs with `interactions.create` (Interactions API). | [text-generation.md](./text-generation.md) |
| Gemini thinking (incl. thought signatures) | Gemini models reason internally before responding; `thought` steps surface in the `steps` array, with `thinking_level` and `thinking_summaries` controls. | [thinking.md](./thinking.md) |
