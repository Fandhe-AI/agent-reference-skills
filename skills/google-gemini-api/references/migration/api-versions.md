---
source: https://ai.google.dev/gemini-api/docs/api-versions
---

# API versions explained (v1 / v1beta)

Overview of the differences between the `v1` and `v1beta` versions of the Gemini API, a feature availability table, and how to select the version in an SDK.

## Signature / Usage

The latest SDKs default to `v1`; set `v1beta` explicitly to use `v1beta`-only features (the `GOOGLE_GENAI_API_VERSION` environment variable also works, and a version set in code takes precedence):

```python
from google import genai

client = genai.Client(http_options={"api_version": "v1beta"})

interaction = client.interactions.create(
    model="gemini-4-hydrogen",
    input="Explain how AI works",
)

print(interaction.output_text)
```

```javascript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  httpOptions: { apiVersion: "v1beta" },
});

async function main() {
  const interaction = await ai.interactions.create({
    model: "gemini-4-hydrogen",
    input: "Explain how AI works",
  });
  console.log(interaction.output_text);
}

await main();
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemini-4-hydrogen",
    "input": "Explain how AI works"
  }'
```

```go
client, err := genai.NewClient(ctx, &genai.ClientConfig{
    HTTPOptions: genai.HTTPOptions{
        APIVersion: "v1beta",
    },
})
```

Java:

```java
Client client = Client.builder()
    .httpOptions(HttpOptions.builder().apiVersion("v1beta").build())
    .build();
```

Environment variable form (from the SDK 3.0.0 release notes; `beta` restores the previous per-platform beta default):

```bash
export GOOGLE_GENAI_API_VERSION=v1beta
```

## Options / Props

- `v1`: stable version. Features are fully supported over the lifetime of the major version; breaking changes produce a new major version and the existing one is deprecated after a reasonable period. Non-breaking changes may be introduced without changing the major version. The Interactions API and its core features are generally available in `v1`.
- `v1beta`: early features actively being developed; may change before promotion to stable.

Capability support (Yes = supported; blank = not available in that version):

| Feature | v1 | v1beta |
|---------|----|--------|
| Interactions API | Yes | Yes |
| Function Calling | Yes | Yes |
| Structured Output | Yes | Yes |
| Thinking / Reasoning | Yes | Yes |
| System Instructions | Yes | Yes |
| Audio Output (Speech Config) | | Yes |
| Audio Transcription (Transcription Config) | | Yes |
| Service Tier (Priority / Flex) | Yes | Yes |
| Code Execution Tool | Yes | Yes |
| Google Search Grounding | Yes | Yes |
| Google Maps Grounding | Yes | Yes |
| URL Context Tool | Yes | Yes |
| File Search Tool | Yes | Yes |
| Computer Use Tool | Yes | Yes |
| MCP Servers Tool | Yes | Yes |
| Live API (WebSockets) | | Yes |
| Live Music API | | Yes |
| Ephemeral Tokens (Live API) | | Yes |
| Models API | Yes | Yes |
| Files Service Route | Yes | Yes |
| File Search Stores Route | Yes | Yes |
| Agents API | | Yes |
| Webhooks API | | Yes |
| Explicit Context Caching | | Yes |

## Notes

- Source: https://aistudio.google.com/api-reference/api-versions (fetched 2026-11-14; the former `ai.google.dev/gemini-api/docs/api-versions` URL redirects there).
- The latest SDKs default to `v1`. Starting with the November 2026 major releases (Python `google-genai` 3.0.0, JS `@google/genai` 3.0.0), the SDKs call `v1` unless you set a version; earlier releases defaulted to `v1beta`. If you upgrade and use a `v1beta`-only feature in the table above (Live API, explicit context caching, managed agents, webhooks), those calls fail until you set the API version to `v1beta`.
- Migration (SDK 2.x to 3.x): per the Python / JS 3.0.0 release notes, Gemini Enterprise (Vertex AI) clients are unaffected and keep defaulting to `v1beta1`; model aliases `gemini-flash-latest`, `gemini-flash-lite-latest` and `gemini-pro-latest` exist only on `v1beta`, so use a specific model version or switch back to `v1beta`. Source: https://github.com/googleapis/python-genai/releases/tag/v3.0.0 and https://github.com/googleapis/js-genai/releases/tag/v3.0.0 (fetched 2026-11-14).
- Core API capabilities and tools apply to both the Interactions API and `generateContent` unless specified otherwise. All models are supported in both `v1` and `v1beta`; the table tracks endpoint routes and schema parameters, not models.
- The table is the basis for the per-page availability notes ("v1beta only") elsewhere in this skill. Many pages and REST samples in this skill still use `v1beta` endpoints explicitly; that is unaffected by the SDK default change.
- The Interactions API breaking changes of May 2026 are described for `v1beta`; see `interactions-breaking-changes-may-2026.md`.
- The Java sample on the source page uses model `gemini-3.6-flash`; the others use `gemini-4-hydrogen`.

## Related

- [interactions-breaking-changes-may-2026.md](./interactions-breaking-changes-may-2026.md)
- [migrate-to-interactions.md](./migrate-to-interactions.md)
