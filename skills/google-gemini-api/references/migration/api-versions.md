---
source: https://ai.google.dev/gemini-api/docs/api-versions
---

# API versions explained (v1 / v1beta)

Overview of the differences between the `v1` and `v1beta` versions of the Gemini API, a feature availability table, and how to select the version in an SDK.

## Signature / Usage

Select `v1` explicitly (the Gemini API SDKs default to `v1beta` to enable access to preview features; `v1` also supports the Interactions API):

```python
from google import genai

client = genai.Client(http_options={'api_version': 'v1'})

interaction = client.interactions.create(
    model='gemini-3.8-flash',
    input="Explain how AI works",
)

print(interaction.output_text)
```

```javascript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  httpOptions: { apiVersion: "v1" },
});

const interaction = await ai.interactions.create({
  model: "gemini-3.8-flash",
  input: "Explain how AI works",
});
console.log(interaction.output_text);
```

```go
client, err := genai.NewClient(ctx, &genai.ClientConfig{
    HTTPOptions: genai.HTTPOptions{
        APIVersion: "v1",
    },
})
```

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "gemini-3.8-flash",
    "input": "Explain how AI works"
  }'
```

Java:

```java
Client client = Client.builder()
    .httpOptions(HttpOptions.builder().apiVersion("v1").build())
    .build();
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
| Service Tier (Priority / Flex) | | Yes |
| Code Execution Tool | Yes | Yes |
| Google Search Grounding | Yes | Yes |
| Google Maps Grounding | Yes | Yes |
| URL Context Tool | Yes | Yes |
| File Search Tool | Yes | Yes |
| Computer Use Tool | | Yes |
| MCP Servers Tool | | Yes |
| Live API (WebSockets) | | Yes |
| Live Music API | | Yes |
| Ephemeral Tokens (Live API) | | Yes |
| Models API | Yes | Yes |
| Files Service Route | Yes | Yes |
| File Search Stores Route | Yes | Yes |
| Agents API | | Yes |
| Webhooks API | | Yes |
| Context Caching | | Yes |

## Notes

- Core API capabilities and tools apply to both the Interactions API and `generateContent` unless specified otherwise. All models are supported in both `v1` and `v1beta`; the table tracks endpoint routes and schema parameters, not models.
- The SDKs default to `v1beta`. This table is the basis for the per-page availability notes ("v1beta only") elsewhere in this skill.
- The Interactions API breaking changes of May 2026 are described for `v1beta`; see `interactions-breaking-changes-may-2026.md`.
- Source examples: the Java and Go samples in the source use model `gemini-3.6-flash`; the others use `gemini-3.8-flash`. The source's REST sample has a trailing comma after `"input"` (invalid JSON); it is removed here so the request parses.

## Related

- [interactions-breaking-changes-may-2026.md](./interactions-breaking-changes-may-2026.md)
- [migrate-to-interactions.md](./migrate-to-interactions.md)
