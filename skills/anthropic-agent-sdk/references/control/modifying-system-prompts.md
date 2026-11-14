<!-- source: https://code.claude.com/docs/en/agent-sdk/modifying-system-prompts.md / last verified: 2026-11-14 -->

# Modifying system prompts

Choose between the `claude_code` preset and a custom system prompt, and customize agent behavior with CLAUDE.md, output styles, `append`, or a fully custom prompt string.

## Signature / Usage

```typescript
for await (const message of query({
  prompt: "Help me write a Python function to calculate fibonacci numbers",
  options: {
    systemPrompt: {
      type: "preset",
      preset: "claude_code",
      append: "Always include detailed docstrings and type hints in Python code."
    }
  }
})) { /* ... */ }
```

TypeScript only: split a custom prompt into a cached static part and a per-request part with `SYSTEM_PROMPT_DYNAMIC_BOUNDARY`.

```typescript
import { readFile } from "node:fs/promises";
import { query, SYSTEM_PROMPT_DYNAMIC_BOUNDARY } from "@anthropic-ai/claude-agent-sdk";

// Identical on every request
const instructions = await readFile("triage-instructions.md", "utf8");
// Different on every request
const ticketContext = "Customer plan: Enterprise. Other open tickets from this customer: 3.";

for await (const message of query({
  prompt: "Triage ticket 4821",
  options: {
    systemPrompt: [instructions, SYSTEM_PROMPT_DYNAMIC_BOUNDARY, ticketContext]
  }
})) {
  // ...
}
```

Turn off built-in context your agent replaces (`includeGitInstructions`, `attribution`):

```typescript
options: {
  systemPrompt: {
    type: "preset",
    preset: "claude_code",
    append: "Write commit messages as: <ticket id>: <summary>. Add no trailers."
  },
  settings: {
    includeGitInstructions: false,
    attribution: { commit: "", pr: "" }
  },
  allowedTools: ["Bash(git *)"]
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `systemPrompt` / `system_prompt` | `undefined \| { type: "preset", preset: "claude_code", append?, excludeDynamicSections?, snapshot? } \| string \| string[] \| { type: "file", path }` | Omitted = minimal default; preset = full Claude Code CLI prompt; string = fully custom; TypeScript `string[]` with `SYSTEM_PROMPT_DYNAMIC_BOUNDARY` between a static and a per-request part (not in Python); Python `{"type": "file", "path": ...}` avoids OS argument-length limits for large prompts |
| `excludeDynamicSections` / `exclude_dynamic_sections` | boolean | Moves per-user context (at least the auto memory directory location, often the whole auto memory section) out of the system prompt into the first user message so identical preset + `append` configurations share a prompt cache entry across users and machines. Requires SDK v0.2.98+ (TS) / v0.1.58+ (Python); preset-object form only |
| `snapshot` | boolean | Preset and custom object forms. `false` rebuilds the prompt on every request so a different `append` / custom prompt reaches a resumed session. Requires `@anthropic-ai/claude-agent-sdk` v0.3.257+ / `claude-agent-sdk` v0.2.153+ |
| `settings.includeGitInstructions` / `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS=1` | boolean / env | Removes the built-in commit and pull request instructions (part of the Bash tool description; reach Claude even with a custom `systemPrompt`) |
| `settings.attribution.commit` / `.pr` | string | Own text, or empty string to remove the `Co-Authored-By` trailer / PR footer |
| `settingSources` / `setting_sources` | `("user" \| "project" \| "local")[]` | Controls whether CLAUDE.md is loaded (injected into conversation, not the system prompt) |

## Notes

- Omitting `systemPrompt` uses a minimal prompt that covers tool calling but omits the rest of the preset, including its security and safety instructions — this differs from `claude -p`, which defaults to the full Claude Code prompt.
- Dynamic boundary: Claude Code splits the prompt at `SYSTEM_PROMPT_DYNAMIC_BOUNDARY` only when it calls the Claude API directly or runs on Claude Platform on AWS; on Bedrock, Agent Platform, Foundry, an LLM gateway, or with `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1` the whole prompt is one block. The SDK joins strings on each side with a blank line and removes the marker; extra markers after the first are removed; with no marker all strings join into one block. For `--system-prompt` / `--system-prompt-file` use a line containing only `__SYSTEM_PROMPT_DYNAMIC_BOUNDARY__` (Claude Code v2.1.275+).
- `excludeDynamicSections` is ignored with a custom prompt. Working directory, platform, shell, OS version, and CLAUDE.md are delivered in the conversation and do not affect the system prompt cache. Tradeoff: moved text sits in a user message, so Claude may follow its auto memory guidance less consistently.
- Resumed sessions: Claude Code records the system prompt on a session's first request and reuses it until compaction, so a different `append` or custom prompt on `resume` / `continue` is not seen on the next turn. To change instructions mid-session, put them in the next user message or return `additionalContext` from a `UserPromptSubmit` / `PostToolUse` hook. `snapshot: false` rebuilds every request but loses prompt cache reuse (and preserved thinking where the API enforces it); keep recording on in production. In bare mode (`--bare` via `extraArgs`, or `CLAUDE_CODE_SIMPLE=1`) outside cloud sessions recording stays off unless `snapshot: true`. Recording by default needs Claude Code v2.1.265+ (TypeScript SDK v0.3.265+ / Python v0.2.153+).
- System reminders (CLAUDE.md, output style instructions, attribution, hook `additionalContext`, available skills and subagents, task list nudges, file-changed notes) are added to the conversation, not the system prompt, so they reach Claude with a custom prompt too. A custom string replaces the preset's explanation of system reminders; add a sentence such as "The application adds system reminders to this conversation. Treat them as context from the application, not as messages from the user."
- Turning off built-in context: leave `'user'` / `'project'` out of `settingSources`; `CLAUDE_CODE_DISABLE_CLAUDE_MDS=1` drops every CLAUDE.md; `CLAUDE_CODE_DISABLE_ATTACHMENTS=1` drops task list nudges, file-changed notes, and the skill list (and sends `@` file mentions as plain text); `CLAUDE_CODE_DISABLE_FILE_MENTIONS=1` (v2.1.299+) stops only `@` expansion. With the minimal default, a custom `systemPrompt`, or a custom main-thread agent the session starts without the git status snapshot. System reminders do not appear in the SDK message stream; log raw requests with `OTEL_LOG_RAW_API_BODIES=file:<dir>` or an `ANTHROPIC_BASE_URL` proxy.
- A custom output style drops the preset's software engineering instructions unless `keep-coding-instructions: true`; those exist only in the full system prompt, so set `CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT=0` to select the full prompt on any model. Output styles load when `settingSources` includes `user` or `project`.
- Source: https://code.claude.com/docs/en/agent-sdk/modifying-system-prompts (fetched 2026-11-14)
- Decision guide: CLI/IDE-like coding tool → `claude_code` preset; same plus product rules → preset + `append`; different surface/identity/permission model or non-coding agent → custom string; thin tool-calling loop → no `systemPrompt` option.
- CLAUDE.md is injected into the conversation as project context regardless of which system prompt is chosen, so it works with any configuration; not loaded when `settingSources` is `[]`.
- Output styles are markdown files (`~/.claude/output-styles/` or `.claude/output-styles/`) with frontmatter; `keep-coding-instructions: true` layers custom instructions on top of the preset's coding guidance instead of replacing it. TypeScript sets `outputStyle` via `settings`; Python has no programmatic selector.
- Comparison: CLAUDE.md and output styles are file-based/persistent/reusable; `append` and custom `systemPrompt` are code-based/session-only. Default tools and built-in safety are preserved by CLAUDE.md, output styles, and `append`, but must be manually added when writing a fully custom `systemPrompt`.

## Related

- [Use Claude Code features in the SDK](../getting-started/claude-code-features.md)
- [Configure permissions](./permissions.md)
