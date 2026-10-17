---
source: https://ai.google.dev/gemini-api/docs/migrate-to-cloud
---

# Gemini Developer API vs. Gemini platform

Google offers two API products for Gemini: the Gemini Developer API (ai.google.dev) and the Gemini platform API (Google Cloud, Gemini Enterprise Agent Platform). Both are accessible through the unified Google GenAI SDK and the Interactions API. This skill covers the Developer API only; this page records how to switch client construction between the two.

## Signature / Usage

Interactions API (recommended), Python (`google-genai` `>= 2.3.0`):

```python
# Gemini Developer API
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Explain how AI works in a few words",
)
print(interaction.output_text)
```

```python
# Gemini platform API
from google import genai

client = genai.Client(
    enterprise=True, project="your-project-id", location="global"
)

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Explain how AI works in a few words",
)
print(interaction.output_text)
```

JavaScript / TypeScript (`@google/genai` `>= 2.3.0`):

```javascript
// Gemini Developer API
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({});

// Gemini platform API
const aiPlatform = new GoogleGenAI({
  enterprise: true,
  project: "your_project",
  location: "global",
});
```

`generateContent` API (still supported), Python:

```python
# Gemini platform API
from google import genai

client = genai.Client(
    vertexai=True, project='your-project-id', location='us-central1'
)

response = client.models.generate_content(
    model="gemini-3.8-flash", contents="Explain how AI works in a few words"
)
print(response.text)
```

Go (`generateContent`):

```go
client, err := genai.NewClient(ctx, &genai.ClientConfig{
    Project:  project,
    Location: location,
    Backend:  genai.BackendVertexAI,
})
```

## Options / Props

| Setting | Developer API | Gemini platform API |
|---------|---------------|---------------------|
| Python Interactions | `genai.Client()` | `genai.Client(enterprise=True, project=..., location="global")` |
| JS Interactions | `new GoogleGenAI({})` | `new GoogleGenAI({ enterprise: true, project, location: "global" })` |
| Python `generateContent` | `genai.Client()` | `genai.Client(vertexai=True, project=..., location=...)` |
| JS `generateContent` | `new GoogleGenAI({})` | `new GoogleGenAI({ vertexai: true, project, location })` |
| Go | `genai.NewClient(ctx, nil)` | `genai.ClientConfig{Project, Location, Backend: genai.BackendVertexAI}` |

## Notes

- The Gemini Developer API is the fastest path to build, productionize, and scale Gemini apps; most developers should use it unless specific enterprise controls are needed. The Gemini platform offers an enterprise-ready ecosystem backed by Google Cloud (Vertex AI-side coverage is out of scope for this skill).
- Migration considerations (from the source): authenticate with Google Cloud service accounts; you can reuse the Google Cloud project used to generate your API key or create a new one; supported regions may differ; during Preview the Interactions API on Gemini platform supports only the `global` endpoint (`location="global"`); models created in Google AI Studio need to be retrained in Gemini platform.
- If the Gemini API key is no longer needed, delete it: open the Google Cloud API Credentials page, find the key, click Actions, choose Delete API key, and confirm. Propagation takes a few minutes; afterwards traffic using the key is rejected. A deleted key still in production can be recovered with `gcloud beta services api-keys undelete`.
- The page's Go `generateContent` snippet for the Developer API declares an unused `apiKey` constant and omits error handling; transcribed as in the source.
- The source places `{` on a new line after `&genai.ClientConfig`, which does not compile; joined here.
- The source also suggests installing the Gemini API development skill for AI coding assistants; that is Gemini-side tooling, not a skill of this repository and not a Claude Code Agent Skill.

## Related

- [migrate-genai-sdk.md](./migrate-genai-sdk.md)
- [api-versions.md](./api-versions.md)
