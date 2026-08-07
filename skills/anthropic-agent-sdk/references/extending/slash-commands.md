<!-- source: https://code.claude.com/docs/en/agent-sdk/slash-commands / last verified: 2026-08-07 -->

# Slash Commands in the SDK

Control Claude Code sessions through the SDK with `/`-prefixed commands, including built-ins like `/compact` and `/clear`, plus custom commands defined as markdown files.

## Signature / Usage

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({ prompt: "Hello Claude", options: { maxTurns: 1 } })) {
  if (message.type === "system" && message.subtype === "init") {
    console.log("Available slash commands:", message.slash_commands);
  }
}

// Send as a follow-up in the same conversation
for await (const message of query({
  prompt: "/compact",
  options: { continue: true, maxTurns: 1 }
})) {
  if (message.type === "result") console.log(message.subtype);
}
```

Custom command file (`.claude/commands/fix-issue.md`):

```markdown
---
argument-hint: [issue-number] [priority]
description: Fix a GitHub issue
---

Fix issue #$0 with priority $1.
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `/compact` | built-in | Summarizes older messages; needs prior conversation turns |
| `/clear` | built-in | Resets conversation to empty context (no-op for one-shot `query()`) |
| `allowed-tools` (frontmatter) | string | Restricts tools for a custom command file |
| `argument-hint` (frontmatter) | string | Documents positional args (`$0`, `$1`, ... or `$ARGUMENTS`) |
| `!`command`` | inline | Executes bash and includes its output in the command body |
| `@file` | inline | Includes file contents by reference |

## Notes

- `.claude/commands/` is the legacy format; the recommended format is `.claude/skills/<name>/SKILL.md`, which supports the same `/name` invocation plus autonomous invocation.
- Only commands that work without an interactive terminal are dispatchable through the SDK.
- A custom command file named after a bundled skill (e.g. `code-review.md`) shadows the bundled skill.
- This is Claude Agent SDK (library) slash-command dispatch and custom-command file format. The Claude Code CLI's own interactive slash commands (typed at the terminal prompt) are documented under anthropic-claude-code-extend.

## Related

- [Skills](./skills.md)
- [Subagents](./subagents.md)
