<!-- source: https://code.claude.com/docs/en/agent-sdk/skills / last verified: 2026-08-07 -->

# Agent Skills in the SDK

Extend Claude with specialized, model-invoked capabilities packaged as `SKILL.md` files, loaded from the filesystem into an Agent SDK session.

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
| `skills` | `"all"` \| string[] \| `[]` | Which discovered Skills are available; `[]` disables all |
| `settingSources` / `setting_sources` | array | Must include `"user"` and/or `"project"` for Skill discovery |

## Notes

- Skills must be created as filesystem artifacts (`.claude/skills/<name>/SKILL.md`); the SDK has no programmatic API for registering them.
- `skills` is a context filter, not a sandbox — unlisted Skills are hidden from the model but their files remain reachable via Read/Bash.
- The `allowed-tools` SKILL.md frontmatter field is CLI-only and does not apply through the SDK; use the top-level `allowedTools` option instead.
- The `system`/`init` message's `skills` array lists user-invocable Skills only; a Skill with `user-invocable: false` still loads but is omitted from the array.
- This is Claude Agent SDK (library) Skills loading/filtering. The Claude Code CLI's own Skills behavior (creation, `/skill-name` invocation from the terminal) is documented under anthropic-claude-code-extend. The Claude API (Messages API) Agent Skills (skill upload/execution via the API) are documented under anthropic-api-tools-mcp.

## Related

- [Slash Commands](./slash-commands.md)
- [Plugins](./plugins.md)
- [Subagents](./subagents.md)
