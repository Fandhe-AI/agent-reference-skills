# Use Cases

Upstash Box gives AI its own computer: a full, isolated cloud environment an agent can control, which you can freeze and resume days or weeks later. Documented patterns are agent servers, multi-agent orchestration, and parallel testing and comparison.

## Signature / Usage

Multi-agent orchestration: fan out to parallel boxes, then synthesize in a final box.

```typescript
const pr = "https://github.com/acme/app/pull/42"
const [security, quality, architecture] = await Promise.all([
  Box.create({ runtime: "node", agent: { harness: Agent.ClaudeCode, model: "anthropic/claude-sonnet-4-6" } }),
  Box.create({ runtime: "node", agent: { harness: Agent.ClaudeCode, model: "anthropic/claude-sonnet-4-6" } }),
  Box.create({ runtime: "node", agent: { harness: Agent.ClaudeCode, model: "anthropic/claude-sonnet-4-6" } }),
])

const reviews = await Promise.all([
  security.agent.run({ prompt: `Security review for ${pr}` }),
  quality.agent.run({ prompt: `Code quality review for ${pr}` }),
  architecture.agent.run({ prompt: `Architecture review for ${pr}` }),
])

const jury = await Box.create({
  runtime: "node",
  agent: { harness: Agent.ClaudeCode, model: "anthropic/claude-sonnet-4-6" },
  git: { token: process.env.GITHUB_TOKEN },
})

await jury.agent.run({
  prompt: `Summarize these reviews and post a comment on ${pr}:\n${reviews.map((r) => r.result).join("\n\n")}`,
})
```

Parallel testing and comparison: each model is paired with the harness that runs it.

```typescript
const agents = [
  { harness: Agent.ClaudeCode, model: "anthropic/claude-opus-4-6" },
  { harness: Agent.Codex, model: "openai/gpt-5.3-codex" },
  { harness: Agent.OpenCode, model: "openrouter/google/gemini-2.5-pro" },
]

const docs = await fs.readFile("./documentation.md", "utf-8")
const prompt = `Extract all API endpoints from this documentation:\n${docs}`

const boxes = await Promise.all(
  agents.map((agent) => Box.create({ runtime: "node", agent })),
)

const results = await Promise.all(boxes.map((box) => box.agent.run({ prompt })))

const evaluation = results.map((r, i) => ({
  model: agents[i].model,
  result: r.result,
  hallucinationPct: evaluateHallucination(r.result, docs),
  accuracyScore: evaluateAccuracy(r.result, docs),
}))

const bestModel = evaluation.sort((a, b) => a.hallucinationPct - b.hallucinationPct)[0]
```

## Notes

- The official snippets do not delete the boxes they create (idle boxes auto-pause, which is not deletion); call `box.delete()` on every created box when done, including after a failure, so storage and box quota are released (see ephemeral-box.md for auto-deleting boxes)
- Source: https://upstash.com/docs/box/overall/use-cases (fetched 2026-11-14; no version pin on the site).
- Agent Server: a long-running per-tenant agent that keeps history, context, and learned preferences across sessions; each user gets a dedicated box, idle boxes auto-pause so idle tenants use no compute, and a returning user's box resumes with installed packages and file history intact. The agent can contribute back to a shared knowledge base
- Multi-agent orchestration: the async SDK spins up boxes in parallel (Python: `AsyncBox` with `asyncio.gather`); each box is isolated, orchestration logic stays in your code. Example pipeline: three boxes for security, code quality, and architecture review feed a fourth box that summarizes and comments on the PR
- Parallel testing and comparison: N boxes each run a different model against the same inputs; the docs cite benchmarking LLMs for context extraction over documentation at Context7. `evaluateHallucination` / `evaluateAccuracy` are placeholders for your own evaluators
- The examples above omit `apiKey`: agents run on your own provider key, either set on the box or saved on the account (see Agent, API keys)

## Related

- [Quickstart](./quickstart.md)
- [Agent](./agent.md)
- [Snapshots](./snapshots.md)
- [Pricing & Limits](./pricing.md)
