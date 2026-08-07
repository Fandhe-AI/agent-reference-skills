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
```

```python
result = tab.observe("find the login and signup buttons")

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
| `run(instruction, { schema?, maxSteps?, model? })` | Reads, acts, and repeats until the task is complete or the step limit is hit; returns `completed`, `data`, and a `steps` trace | Open-ended or navigation-heavy tasks |

`maxSteps` defaults to `15`, capped at `30`. Without `schema`, `run` returns findings as text in `result`.

## Notes

- All AI action methods use an LLM and are metered; need a provider API key (Anthropic, OpenAI, OpenRouter, Vercel, or OpenCode) on the box or account. Every method accepts a provider-prefixed `model` override (e.g. `"openai/gpt-4o"`); without one it uses the box's configured model, falling back to `anthropic/claude-sonnet-4-5`
- For fully scripted, no-LLM-in-the-loop control, connect over CDP with Playwright/Puppeteer instead — both drive the same tabs, so scripted and AI steps can be mixed

## Related

- [Browser Overview](./browser-overview.md)
- [Connect over CDP](./browser-connect.md)
- [Live View](./browser-live-view.md)
- [Recordings](./browser-recordings.md)
