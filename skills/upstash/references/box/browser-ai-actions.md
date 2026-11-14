# Browser: AI Actions

A DOM-aware browser agent runs inside the box and resolves natural-language instructions against the live page: find elements (`observe`), execute a single action (`act`), or complete a multi-step task autonomously (`run`).

## Signature / Usage

```typescript
const { elements } = await tab.observe("find the login and signup buttons")

const action = await tab.act("click the primary call-to-action")
console.log(action.success, action.actionDescription)

import { z } from "zod"
const { data, completed, steps } = await tab.run(
  "Find the pricing page and summarize the free tier",
  { schema: z.object({ summary: z.string() }), maxSteps: 15 },
)

// Replay a pre-resolved action: no LLM, no tokens, no model provider key
const { elements: found } = await tab.observe("the primary call-to-action") // resolve once (metered)
await tab.act(found[0]) // replay as many times as you like
```

```python
result = tab.observe("find the login and signup buttons")

# Replay a pre-resolved action without an LLM
tab.act(result.elements[0])

action = tab.act("click the primary call-to-action")

from pydantic import BaseModel
class Summary(BaseModel):
    summary: str

result = tab.run(
    "Find the pricing page and summarize the free tier",
    schema=Summary,
    max_steps=15,
)
```

## Options / Props

| Method | Does | Best for |
|--------|------|----------|
| `observe(instruction)` | Finds actionable elements matching an instruction; executes nothing | Inspecting a page, building custom loops |
| `act(instruction)` | Resolves and executes exactly one described action; reports `success`, `actionDescription`, token usage | Flows where your code decides each step |
| `act(element)` | Replays an element returned by `observe()` (its `selector`, suggested `method` and `arguments`) deterministically: no LLM call, no tokens, no API key | Reusing an action resolved once |
| `run(instruction, { schema?, maxSteps?, model? })` | Reads, acts, and repeats until the task is complete or the step limit is hit; returns `completed`, `data`, and a `steps` trace | Open-ended or navigation-heavy tasks |

`maxSteps` defaults to `15`, capped at `30`. Without `schema`, `run` returns findings as text in `result`.

## Notes

- Source: https://upstash.com/docs/box/overall/browser/ai-actions (fetched 2026-11-14; no version pin on the site).
- All AI action methods use an LLM and are metered; need a provider API key (Anthropic, OpenAI, OpenRouter, Vercel, OpenCode, Bedrock, or Neon) on the box or account; Cursor models are not supported. Every method accepts a provider-prefixed `model` override (e.g. `"openai/gpt-4o"`); without one it uses the box's configured model, falling back to `anthropic/claude-sonnet-4-5`
- LLM-free replay is the exception to metering: resolve once with `observe()` (metered), then pass the element to `act(el)` as many times as needed
- The official AI Actions page (re-checked 2026-11-14) documents only `observe` and `act` (the Recordings and Overview pages no longer mention `run` either); the `run` row above is kept from the earlier version and was not re-confirmed, so prefer `observe` / `act`
- For fully scripted, no-LLM-in-the-loop control, connect over CDP with Playwright/Puppeteer instead — both drive the same tabs, so scripted and AI steps can be mixed

## Related

- [Browser Overview](./browser-overview.md)
- [Connect over CDP](./browser-connect.md)
- [Live View](./browser-live-view.md)
- [Recordings](./browser-recordings.md)
