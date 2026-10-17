# AI Metadata Quickstart

Have Inngest extract model, token, and latency metadata from OpenTelemetry `gen_ai.*` spans and attach it to the step as `inngest.ai` metadata.

```shell
npm install @inngest/otel
node --import @inngest/otel/node ./app.js
```

```ts
// Vercel AI SDK: telemetry is opt-in per call
import { generateText } from "ai";

await generateText({
  model: openai("gpt-4o"),
  prompt: "...",
  experimental_telemetry: { isEnabled: true },
});
```

```ts
// Opt out (extraction is on by default)
import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "my-app",
  aiMetadata: false, // omit this line to keep AI metadata extraction on
});
```

## Notes

- Extraction is on by default (`aiMetadata: true`) and is independent of Extended Traces; no `extendedTracesMiddleware()` is required
- Inngest reads only spans carrying OpenTelemetry GenAI semantic-convention attributes (e.g. `gen_ai.request.model`, `gen_ai.usage.input_tokens`)
- The `@inngest/otel` preload auto-instruments the OpenAI, Anthropic, and Google Generative AI SDKs; other SDKs or custom HTTP clients must emit the same attributes
- If the **AI Metadata** entry is missing on a step in the dashboard, check the preload order, per-call `experimental_telemetry`, and that `aiMetadata` is not `false`
- Source: https://www.inngest.com/docs-markdown/examples/ai-metadata-quickstart (retrieved 2026-10-16)
