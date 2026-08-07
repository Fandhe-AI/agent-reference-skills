# Guide: Code Interpreter with Vercel AI SDK

Add a code interpreter tool to a Vercel AI SDK chat app: when the model needs computation, it writes code and runs it in a fresh `EphemeralBox` that is isolated, disposable, and auto-expires when the session ends.

## Signature / Usage

```bash
npm install @upstash/box @ai-sdk/anthropic @ai-sdk/react ai zod
```

```typescript
// app/api/chat/route.ts
import { streamText, tool, convertToModelMessages, stepCountIs } from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import { EphemeralBox } from "@upstash/box"
import { z } from "zod"

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: anthropic("claude-sonnet-4-6"),
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(10),
    tools: {
      executeSandboxCode: tool({
        description: "Run Python or JavaScript code in a secure, isolated sandbox.",
        inputSchema: z.object({
          lang: z.enum(["python", "js"]),
          code: z.string(),
        }),
        execute: async ({ lang, code }) => {
          const box = await EphemeralBox.create({
            apiKey: process.env.UPSTASH_BOX_API_KEY,
            runtime: lang === "python" ? "python" : "node",
            ttl: 120,
          })
          try {
            const run = await box.exec.code({ lang, code, timeout: 10_000 })
            return { success: run.exitCode === 0, output: run.result }
          } finally {
            await box.delete()
          }
        },
      }),
    },
  })

  return result.toUIMessageStreamResponse()
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `EphemeralBox.create({ apiKey, runtime, ttl })` | — | Creates a short-lived box; `ttl` (seconds) auto-deletes the box even if `delete()` is skipped |
| `box.exec.code({ lang, code, timeout })` | `"python" \| "js"`, `string`, `number` | Runs a code snippet with an execution timeout in ms; returns `{ exitCode, result }` |

## Notes

- Always set `exec.code`'s `timeout` — without it, an infinite loop hangs until the backend times out or `ttl` deletes the box
- Every tool call gets its own isolated box, so a crash in one never affects the others
- Delete the box in a `finally` block so it doesn't linger even on tool errors

## Related

- [Quickstart](./quickstart.md)
- [Filesystem](./filesystem.md)
- [Guides: AI File Editor with TanStack AI](./guides-tanstack-ai-file-editor.md)
