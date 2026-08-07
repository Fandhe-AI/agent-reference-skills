<!-- source: https://code.claude.com/docs/en/agent-sdk/modifying-system-prompts.md / last verified: 2026-08-07 -->

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

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `systemPrompt` / `system_prompt` | `undefined \| { type: "preset", preset: "claude_code", append?, excludeDynamicSections? } \| string \| { type: "file", path }` | Omitted = minimal default; preset = full Claude Code CLI prompt; string = fully custom; Python `{"type": "file", "path": ...}` avoids OS argument-length limits for large prompts |
| `excludeDynamicSections` / `exclude_dynamic_sections` | boolean | Moves per-session context (cwd, git flag, platform, shell, OS, memory paths) out of the system prompt into the first user message, enabling cross-session/cross-machine prompt cache reuse. Requires SDK v0.2.98+ (TS) / v0.1.58+ (Python); preset-object form only |
| `settingSources` / `setting_sources` | `("user" \| "project" \| "local")[]` | Controls whether CLAUDE.md is loaded (injected into conversation, not the system prompt) |

## Notes

- Omitting `systemPrompt` uses a minimal prompt (tool calling only) — this differs from `claude -p`, which defaults to the full Claude Code prompt.
- Decision guide: CLI/IDE-like coding tool → `claude_code` preset; same plus product rules → preset + `append`; different surface/identity/permission model or non-coding agent → custom string; thin tool-calling loop → no `systemPrompt` option.
- CLAUDE.md is injected into the conversation as project context regardless of which system prompt is chosen, so it works with any configuration; not loaded when `settingSources` is `[]`.
- Output styles are markdown files (`~/.claude/output-styles/` or `.claude/output-styles/`) with frontmatter; `keep-coding-instructions: true` layers custom instructions on top of the preset's coding guidance instead of replacing it. TypeScript sets `outputStyle` via `settings`; Python has no programmatic selector.
- Comparison: CLAUDE.md and output styles are file-based/persistent/reusable; `append` and custom `systemPrompt` are code-based/session-only. Default tools and built-in safety are preserved by CLAUDE.md, output styles, and `append`, but must be manually added when writing a fully custom `systemPrompt`.

## Related

- [Use Claude Code features in the SDK](../getting-started/claude-code-features.md)
- [Configure permissions](./permissions.md)
