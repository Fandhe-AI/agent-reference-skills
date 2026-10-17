---
source: https://ai.google.dev/gemini-api/docs/deep-research
---

# Deep Research with Background Execution

Start a Deep Research task with `background=True` and poll the interaction until it completes.

```python
import time
from google import genai

client = genai.Client()

interaction = client.interactions.create(
    input="Research the history of Google TPUs.",
    agent="deep-research-preview-04-2026",
    background=True,
)

print(f"Research started: {interaction.id}")

while True:
    interaction = client.interactions.get(interaction.id)
    if interaction.status in ("in_progress", "queued"):
        time.sleep(10)
    elif interaction.status == "completed":
        print(interaction.steps[-1].content[0].text)
        break
    else:
        print(f"Research stopped: {interaction.status} {interaction.errors}")
        break
```

```javascript
import { GoogleGenAI } from '@google/genai';

const client = new GoogleGenAI({});

const interaction = await client.interactions.create({
    input: 'Research the history of Google TPUs.',
    agent: 'deep-research-preview-04-2026',
    background: true
});

console.log(`Research started: ${interaction.id}`);

while (true) {
    const result = await client.interactions.get(interaction.id);
    if (result.status === 'in_progress' || result.status === 'queued') {
        await new Promise(resolve => setTimeout(resolve, 10000));
    } else if (result.status === 'completed') {
        console.log(result.steps.at(-1).content[0].text);
        break;
    } else {
        console.log(`Research stopped: ${result.status} ${JSON.stringify(result.errors)}`);
        break;
    }
}
```

```bash
# 1. Start the research task
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
-H "Content-Type: application/json" \
-H "x-goog-api-key: ${GEMINI_API_KEY}" \
-d '{
    "input": "Research the history of Google TPUs.",
    "agent": "deep-research-preview-04-2026",
    "background": true
}'

# 2. Poll for results (Replace INTERACTION_ID)
# curl -X GET "https://generativelanguage.googleapis.com/v1beta/interactions/INTERACTION_ID" \
# -H "x-goog-api-key: ${GEMINI_API_KEY}"
```

## Notes

- Background execution (`background=true`) is required because research can take several minutes.
- Preview; available only through the Interactions API, not `generate_content`.
- Two versions: `deep-research-preview-04-2026` (speed, suited to streaming to a UI) and `deep-research-max-preview-04-2026` (maximum comprehensiveness).
- The polling loop was extended beyond the official snippet to stop on every non-running status (cancelled / incomplete / budget_exceeded (deprecated) / requires_action), as in references/managed-agents/deep-research.md.
- The official Python/JS snippets read `.error`; the Interaction resource field is `errors` (google-genai 2.31.0 / @google/genai 2.30.0), so the sample uses `errors`.
- Variable expansions use the `"${var}"` form; the official snippet writes `$GEMINI_API_KEY`.
- Gemini-hosted agent; distinct from anthropic-managed-agents and openai-agents.
