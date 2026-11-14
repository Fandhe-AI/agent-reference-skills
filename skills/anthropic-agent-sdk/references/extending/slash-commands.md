<!-- source: https://code.claude.com/docs/en/agent-sdk/slash-commands (merged into https://code.claude.com/docs/en/agent-sdk/skills#commands-in-agent-sdk-sessions) / last verified: 2026-11-14 -->

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
| `allowed-tools` (frontmatter) | string | Pre-approves the listed tools while the command runs (does not restrict other tools); ignored when managed settings set `allowManagedPermissionRulesOnly` |
| `argument-hint` (frontmatter) | string | Documents positional args (`$0`, `$1`, ... or `$ARGUMENTS`) |
| `!`command`` | inline | Executes bash and includes its output in the command body |
| `@file` | inline | Includes file contents by reference |

## Notes

- The official slash-commands page was merged into the skills page ("Extend agents with skills", section "Commands in Agent SDK sessions", https://code.claude.com/docs/en/agent-sdk/skills#commands-in-agent-sdk-sessions). It has no Markdown twin of its own (confirmed 2026-11-14) and is retained here only for the legacy URL; for current material go to [Skills](./skills.md). This page keeps the dispatch details (`slash_commands`, unknown-command behavior, `/compact`, `/clear`).
- Dispatch does not depend on the `skills` option: `/<name>` runs a user-invocable skill even when the `skills` list omits it. A command can hit the `maxTurns` / `max_turns` limit like any other prompt and end the query with an error result; wrap the loop in `try`/`catch` (`try`/`except` in Python) or raise `maxTurns`. `/clear` leaves the previous conversation on disk; return to it by passing its session ID to the `resume` option.
- Source: https://code.claude.com/docs/en/agent-sdk/skills#commands-in-agent-sdk-sessions (fetched 2026-11-14)
- The former slash-commands page described `allowed-tools` as restricting tools; the merged skills page describes it as pre-approval, which the table above follows.
- The command surface has four kinds of entries: built-in commands (e.g. `/compact`), bundled skills (`code-review`, `verify`), your skills, and custom command files in `.claude/commands/`. MCP prompts can also appear as commands.
- A `/<name>` that matches neither a command in the session nor a built-in does not fail the query. Claude Code sends the prompt to Claude as an ordinary message with a note that the command didn't run, spending one model turn. Before v2.1.274 it returned `Unknown command: /<name>` as the result without a model turn.
- A `/<name>` that matches a built-in not available in the session, such as `/theme`, returns `/theme isn't available in this environment.` as the result without a model turn.
- `/compact`: a `compact_boundary` message only arrives when compaction ran. If nothing can be summarized, the run still ends with a `success` result and the reason is in the result text (e.g. `Not enough messages to compact.`).
- `.claude/commands/` is the legacy format; the recommended format is `.claude/skills/<name>/SKILL.md`, which supports the same `/name` invocation plus autonomous invocation.
- Only commands that work without an interactive terminal are dispatchable through the SDK.
- A custom command file named after a bundled skill (e.g. `code-review.md`) shadows the bundled skill.
- This is Claude Agent SDK (library) slash-command dispatch and custom-command file format. The Claude Code CLI's own interactive slash commands (typed at the terminal prompt) are documented under anthropic-claude-code-extend.

## Related

- [Skills](./skills.md)
- [Subagents](./subagents.md)
