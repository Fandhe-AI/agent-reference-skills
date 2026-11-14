---
source: https://opencode.ai/docs/build/plugins/migrate-v1/
---

# Tool and Shell Guard Hooks

Block reads of `.env` files before a tool runs and inject an environment variable into every shell.

```ts
import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "company.guard",
  async setup(ctx) {
    await ctx.tool.hook("execute.before", (event) => {
      const input = event.input as { filePath?: string }
      if (event.tool === "read" && input.filePath?.includes(".env")) {
        throw new Error("Do not read .env files")
      }
    })

    await ctx.shell.hook("create.before", (event) => {
      event.env.COMPANY_ENV = "development"
    })
  },
})
```

Inspect results after execution (from the Server page):

```ts
await ctx.tool.hook("execute.after", (event) => {
  if (event.status === "completed") event.result = { ...event.result, metadata: { observed: true } }
  if (event.status === "error") console.error(event.error.message)
})
```

## Notes

- Hook registrations stay active for the plugin's lifetime and are disposed when it unloads; keep the returned registration only to call `registration.dispose()` earlier.
- Throwing from `execute.before` rejects the tool call.
- This is a V1 → V2 migration example and a plugin-level guard, not a security boundary: it only checks the `read` tool's `filePath`, so shell commands and other tools can still reach `.env` files. Not in the official docs: protect secrets with `permissions` rules instead, for example a `read` deny on `*.env` plus restricting `shell` (see `references/permissions-policies/permissions.md` in the `opencode-usage` skill). OpenCode permissions and plugins are distinct from Claude Code permissions and hooks (anthropic-claude-code-admin / anthropic-claude-code-extend).
