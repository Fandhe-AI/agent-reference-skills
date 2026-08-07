# Guide: AI File Editor with TanStack AI

An `EphemeralBox` provides just two capabilities — code execution and file operations — which is enough for a full AI file editor: the model writes code to transform an uploaded file, a single tool spins up a box, uploads the file, runs the code, downloads the result, and tears the box down.

## Signature / Usage

```bash
npm install @tanstack/ai @tanstack/ai-anthropic @tanstack/ai-react @upstash/box zod
```

```typescript
// app/api/chat/route.ts
import { chat, toServerSentEventsResponse, toolDefinition } from "@tanstack/ai"
import { anthropicText } from "@tanstack/ai-anthropic"
import { EphemeralBox } from "@upstash/box"
import { z } from "zod"

const OUT_DIR = "/workspace/home/out"

const editFile = toolDefinition({
  name: "editFile",
  description: `Transform the uploaded file by running Python; write the result into ${OUT_DIR}/.`,
  inputSchema: z.object({ code: z.string() }),
  outputSchema: z.object({ ok: z.boolean(), stdout: z.string(), file: z.object({ name: z.string(), mediaType: z.string(), base64: z.string() }).nullable() }),
}).server(async ({ code }) => {
  const box = await EphemeralBox.create({
    apiKey: process.env.UPSTASH_BOX_API_KEY,
    runtime: "python",
    ttl: 120,
  })
  try {
    await box.exec.command(`mkdir -p ${OUT_DIR} && pip install -q pillow pandas pypdf`)
    await box.files.write({ path: "/workspace/home/input", content: "...", encoding: "base64" })
    const run = await box.exec.code({ lang: "python", code })
    const entries = await box.files.list(OUT_DIR)
    const out = entries.find((e) => !e.is_dir)
    const result = out ? await box.files.read(out.path, { encoding: "base64" }) : null
    return { ok: run.exitCode === 0, stdout: run.result, file: out && result ? { name: out.name, mediaType: "application/octet-stream", base64: result } : null }
  } finally {
    await box.delete()
  }
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `box.files.write({ path, content, encoding })` | `"base64"` supported | Uploads content into `/workspace/home` |
| `box.exec.code({ lang, code })` | — | Runs the model-authored code |
| `box.files.list(dir)` / `box.files.read(path, { encoding })` | — | Discovers and downloads produced output |

## Notes

- File tools (`write`, `list`, `read`) are rooted at `/workspace/home`; paths outside it are rejected. `exec` can write anywhere, but anything moved through the files API must live under `/workspace/home`
- Because the model writes the code and the tool discovers output via `files.list`, the same pattern handles any file transform (CSV→JSON, image edits, PDF extraction) by adjusting the installed libraries
- Always delete the `EphemeralBox` in a `finally` block; `ttl` is a safety net if `delete()` is skipped

## Related

- [Guides: Code Interpreter with Vercel AI SDK](./guides-ai-sdk-code-interpreter.md)
- [Filesystem](./filesystem.md)
