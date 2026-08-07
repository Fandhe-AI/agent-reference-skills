# Guide: Build a Code Review Agent

Build a code review agent (like CodeRabbit or Greptile) with Upstash Box: clone a repo, inspect the PR diff, and return structured findings with severity and suggested fixes, usable as a CI gate.

## Signature / Usage

```bash
npm install @upstash/box zod
```

```typescript
import { Agent, Box } from "@upstash/box"
import { z } from "zod"

const responseSchema = z.object({
  verdict: z.enum(["approved", "changes_requested"]),
  summary: z.string(),
  findings: z.array(
    z.object({
      severity: z.enum(["high", "medium", "low"]),
      file: z.string(),
      line: z.number().nullable(),
      issue: z.string(),
      suggestion: z.string(),
    }),
  ),
})

export async function reviewPullRequest(input: { repo: string; base: string; head: string }) {
  const box = await Box.create({
    runtime: "node",
    agent: {
      harness: Agent.ClaudeCode,
      model: "anthropic/claude-opus-4-5",
      apiKey: process.env.ANTHROPIC_API_KEY,
    },
    git: { token: process.env.GITHUB_TOKEN },
  })

  try {
    await box.git.clone({ repo: input.repo })
    const reviewRun = await box.agent.run({
      responseSchema,
      prompt: `Review changes between origin/${input.base} and ${input.head}. Report only issues caused by changed code.`,
    })
    return reviewRun.result
  } finally {
    await box.delete()
  }
}
```

## Notes

- Fail the CI job when `verdict === "changes_requested"` to gate merges automatically
- `responseSchema` guarantees a typed, structured result you can persist as JSON and branch on in a follow-up CI step
- Always `box.delete()` in a `finally` block

## Related

- [Agent](./agent.md)
- [Git](./git.md)
- [Guides: Running Tests with Crabbox](./guides-crabbox-setup.md)
