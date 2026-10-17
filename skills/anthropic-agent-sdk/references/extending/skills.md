<!-- source: https://code.claude.com/docs/en/agent-sdk/skills / last verified: 2026-10-16 -->

# Extend agents with skills

Control which skills Claude can invoke in Agent SDK sessions, dispatch commands by name, and author skills your sessions discover. Skills are model-invoked capabilities packaged as `SKILL.md` files, loaded from the filesystem. This page also covers "Commands in Agent SDK sessions" (merged in from the former slash-commands page; see slash-commands.md).

## Signature / Usage

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "Help me process this PDF document",
  options: {
    cwd: process.cwd(), // .claude/skills/ here or in a parent directory
    settingSources: ["user", "project"], // Load Skills from filesystem
    skills: "all", // Enable every discovered Skill
    allowedTools: ["Read", "Write", "Bash"]
  }
})) {
  console.log(message);
}
```

```python
options = ClaudeAgentOptions(
    cwd=os.getcwd(),
    setting_sources=["user", "project"],
    skills="all",
    allowed_tools=["Read", "Write", "Bash"],
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `skills` | `"all"` \| string[] \| `[]` | Which discovered Skills Claude can invoke; omitted = discovered skills enabled (CLI behavior); `[]` = Claude can invoke none (dispatch by `/<name>` still runs user-invocable skills) |
| `settingSources` / `setting_sources` | array | When set explicitly, include `"project"` (project and added-directory skills) and/or `"user"` (personal skills); defaults load both. Skills can also come from the `plugins` option |

## Notes

- Skills must be created as filesystem artifacts (`.claude/skills/<name>/SKILL.md`); the SDK has no programmatic API for registering them.
- `skills` is a context filter, not a sandbox — unlisted Skills are hidden from the model but their files remain reachable via Read/Bash.
- Pre-approving tools: in SDK sessions you can pre-approve tools for a project or personal skill with the skill's `allowed-tools` frontmatter or with the `allowedTools` option (`allowed_tools` in Python). If managed settings set `allowManagedPermissionRulesOnly`, Claude Code ignores both.
- When you set `skills`, the SDK adds the Skill tool to `allowedTools` automatically. If you also pass an explicit `tools` list, include `"Skill"` in it. When `skills` is omitted, discovered skills are enabled and the Skill tool is available, matching CLI behavior.
- Names in the `skills` list match the `name` field in `SKILL.md` or the skill's directory name; use `plugin:skill` for plugin-provided skills. Wildcards (a bare `*` or a `:*` suffix) are not allowed; pass `"all"` instead.
- Invalid names are rejected before the session starts: an empty name, a name containing parentheses, commas, or control characters, a name padded with whitespace, or a wildcard form. TypeScript throws an `Error` (SDK 0.3.221+; earlier versions did not check), e.g. `Invalid skill name "docs:*": wildcard-suffix names are not allowed; list each skill by its exact name.` (empty name: `Skill names must be non-empty strings.`). Python raises `ValueError` (0.2.129+), e.g. `ValueError: Invalid skill name 'docs:*': wildcard-suffix names are not allowed; list each skill by its exact name.` (empty name: `Skill names must be non-empty strings`).
- When Claude tries to invoke a skill not in the `skills` list, the Skill tool returns `Skill <name> is not in this session's skills allowlist`. Dispatch by sending `/<name>` in a prompt does not depend on the `skills` list and still runs a user-invocable skill.
- The `system`/`init` message's `skills` array lists user-invocable Skills that have a `description` or `when_to_use` frontmatter field, plus bundled skills included with Claude Code; a Skill with `user-invocable: false` still loads but is omitted from the array (and from `slash_commands`).
- Commands in Agent SDK sessions: the command surface is built-in commands (e.g. `/compact`), bundled skills (e.g. `/code-review`, `/verify`), your skills, and `.claude/commands/` files. Details on `slash_commands`, unknown-command behavior, `/compact` and `/clear` are in slash-commands.md.
- This is Claude Agent SDK (library) Skills loading/filtering. The Claude Code CLI's own Skills behavior (creation, `/skill-name` invocation from the terminal) is documented under anthropic-claude-code-extend. The Claude API (Messages API) Agent Skills (skill upload/execution via the API) are documented under anthropic-api-tools-mcp.

## Related

- [Slash Commands](./slash-commands.md)
- [Plugins](./plugins.md)
- [Subagents](./subagents.md)
