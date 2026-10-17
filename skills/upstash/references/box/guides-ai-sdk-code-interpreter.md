# Guide: Vercel AI SDK Code Interpreter and Shell Tools

Give Vercel AI SDK agents a cloud sandbox to run Python, JavaScript, and shell commands, manage files, and share app previews with Upstash Box. Define tools once against a `Box` instance, then spread them into `tools`; the model decides when to run code, read a file, or start a server.

## Signature / Usage

```bash
npm install @upstash/box @ai-sdk/anthropic @ai-sdk/react ai zod
```

```bash
# .env.local
UPSTASH_BOX_API_KEY=box_xxxxxxxxxxxxxxxxxxxxxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
```

One box per conversation: derive the box name from the authenticated user and the chat id, and hash the pair.

```typescript
// lib/box.ts
import { createHash } from "node:crypto";
import { Box, BoxError } from "@upstash/box";

export function boxNameFor(userId: string, chatId: string) {
  const digest = createHash("sha256").update(`${userId}:${chatId}`).digest("hex");
  return `chat-${digest.slice(0, 32)}`;
}

export async function getBox(userId: string, chatId: string) {
  const name = boxNameFor(userId, chatId);
  try {
    return await Box.get(name);
  } catch (error) {
    // Only a missing box means "create one". A 401 or a network blip must not
    // silently mint a second box and hide the real failure.
    if (!(error instanceof BoxError) || error.statusCode !== 404) throw error;
    return await Box.create({ runtime: "node", name });
  }
}
```

Tool definitions (each is a thin wrapper over one Box capability; keep returned objects small and JSON-serializable):

```typescript
// lib/box-tools.ts (excerpt: runCode, runCommand; startServer / writeFile / readFile / listFiles / exposePort follow the same shape)
import { tool } from "ai";
import { Box } from "@upstash/box";
import { z } from "zod";

export function boxTools(box: Box) {
  return {
    runCode: tool({
      description:
        "Run Python or JavaScript in the sandbox. Use this for math, data analysis, " +
        "or any computation instead of estimating an answer.",
      inputSchema: z.object({
        lang: z.enum(["python", "js"]),
        code: z.string().describe("The code to execute. Print the result."),
      }),
      execute: async ({ lang, code }) => {
        const run = await box.exec.code({ lang, code, timeout: 30_000 });
        return { ok: run.exitCode === 0, output: run.result.slice(0, 8_000) };
      },
    }),

    runCommand: tool({
      description:
        "Run a shell command in the sandbox and wait for it to finish: install packages, " +
        "run tests, use git, inspect the system. The command must exit on its own. " +
        "For a server or any process that keeps running, use startServer instead.",
      inputSchema: z.object({
        command: z.string().describe("A shell command, e.g. `npm install zod`"),
      }),
      execute: async ({ command }) => {
        const run = await box.exec.command(command);
        return { ok: run.exitCode === 0, output: run.result.slice(0, 8_000) };
      },
    }),
  };
}
```

Route wiring (`stopWhen: stepCountIs(...)` lets the model chain calls):

```typescript
// app/api/chat/route.ts
import { streamText, convertToModelMessages, stepCountIs } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { boxTools } from "@/lib/box-tools";
import { getBox } from "@/lib/box";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const { messages, id } = await req.json();

  // Your own session lookup. The box is addressed by the *authenticated* user.
  const session = await auth();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const box = await getBox(session.userId, id);

  const result = streamText({
    model: anthropic("claude-sonnet-4-6"),
    system:
      "You have a Linux sandbox with a shell, a filesystem, and exposable ports. " +
      "Work in /workspace/home. Run code instead of estimating answers, and when " +
      "you start a server, expose its port and give the user the URL.",
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(10),
    tools: boxTools(box),
  });

  return result.toUIMessageStreamResponse();
}
```

One-off runs with no state to keep use an `EphemeralBox`, created for the tool call and deleted when it returns:

```typescript
// lib/code-interpreter.ts
import { tool } from "ai";
import { EphemeralBox } from "@upstash/box";
import { z } from "zod";

export const runCode = tool({
  description: "Run Python or JavaScript in a disposable sandbox.",
  inputSchema: z.object({
    lang: z.enum(["python", "js"]),
    code: z.string(),
  }),
  execute: async ({ lang, code }) => {
    const box = await EphemeralBox.create({
      apiKey: process.env.UPSTASH_BOX_API_KEY,
      runtime: lang === "python" ? "python" : "node",
      ttl: 120,
    });

    try {
      const run = await box.exec.code({ lang, code, timeout: 10_000 });
      return { ok: run.exitCode === 0, output: run.result };
    } finally {
      await box.delete();
    }
  },
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Box.get(name)` / `Box.create({ runtime, name })` | — | Per-conversation box; a box auto-pauses when idle and resumes on the next call |
| `EphemeralBox.create({ apiKey, runtime, ttl })` | — | Short-lived box; `ttl` (seconds) auto-deletes the box even if `delete()` is skipped |
| `box.exec.code({ lang, code, timeout })` | `"python" \| "js"`, `string`, `number` | Runs a code snippet with an execution timeout in ms; returns `{ exitCode, result }` |
| `box.exec.command(command)` | `string` | Runs a shell command and waits for it to exit |
| `box.files.write({ path, content })` / `box.files.read(path, { length })` / `box.files.list(path)` | — | File tools; rooted at `/workspace/home` (paths outside are rejected) |
| `box.getPublicURL(port)` | `number` | Returns `{ url }` for an exposed port |

## Notes

- Source: https://upstash.com/docs/box/guides/ai-sdk-setup (fetched 2026-10-17; no version pin on the site).
- Official guide title is now "Vercel AI SDK Code Interpreter and Shell Tools". The URL was renamed from `/box/guides/ai-sdk-code-interpreter` to `/box/guides/ai-sdk-setup` (this file keeps its original name)
- `Box.get(name)` is kept verbatim from the official guide. In the `@upstash/box` SDK, `Box.getByName` is an alias of `Box.get` (`static getByName = Box.get;` in `packages/sdk/src/client.ts`), so passing a box name to `Box.get` resolves the same box; `Box.getByName(name)` is the equivalent, more explicit spelling used in the how-it-works and CopilotKit guides
- A box name is an address: never take `userId` or the box name from the request body; derive it from the server-side session
- Only a 404 `BoxError` means "create one"; other errors must propagate
- `runCommand` waits for exit, so a long-running process (e.g. `npm run dev`) needs a separate detached `startServer` tool that checks the port is listening, then calls `getPublicURL`
- Always set `exec.code`'s `timeout` — without it, an infinite loop hangs until the backend times out or `ttl` deletes the box
- The guide also adds a `useChat` UI that renders `tool-*` message parts (see the official page)

## Related

- [Quickstart](./quickstart.md)
- [Filesystem](./filesystem.md)
- [Guides: AI File Editor with TanStack AI](./guides-tanstack-ai-file-editor.md)
