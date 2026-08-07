<!-- source: https://code.claude.com/docs/en/agent-sdk/permissions.md / last verified: 2026-08-07 -->

# Configure permissions

Control how Claude uses tools with permission modes, hooks, and declarative allow/deny rules; the `canUseTool` callback handles everything else at runtime.

## Signature / Usage

```typescript
const options = {
  allowedTools: ["Read", "Glob", "Grep"],
  permissionMode: "dontAsk"
};
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `allowed_tools` / `allowedTools` | string[] | Auto-approves listed tools; unlisted tools still exist and fall through to permission mode |
| `disallowed_tools` / `disallowedTools` | string[] | Blocks listed tools/patterns regardless of other settings; bare name removes tool definition entirely, scoped pattern (`"Bash(rm *)"`) denies matching calls only |
| `permission_mode` / `permissionMode` | `"default" \| "dontAsk" \| "acceptEdits" \| "bypassPermissions" \| "plan" \| "auto"` | Global control over tool approval behavior |

## Notes

- Evaluation order: hooks → deny rules → ask rules (from `settings.json`) → permission mode → allow rules → `canUseTool` callback. A hook `allow` does not skip deny/ask rules below it.
- `dontAsk` mode: anything not pre-approved is denied outright, `canUseTool` is never called; `AskUserQuestion` and tools requiring user interaction are denied even if pre-approved.
- `acceptEdits` mode: auto-approves `Edit`/`Write` and filesystem commands (`mkdir`, `touch`, `rm`, `rmdir`, `mv`, `cp`, `sed`) within the working directory or `additionalDirectories`.
- `bypassPermissions` mode: approves everything except explicit `ask` rules, tools requiring user interaction, and org-set `ask` connector tools. Does NOT respect `allowed_tools` as a restriction — unlisted tools still run. Cannot be used when running as root on Unix; TypeScript also requires `allowDangerouslySkipPermissions: true`.
- `plan` mode: file edits and (v2.1.212+) file-modifying shell commands always route to `canUseTool`, never auto-approved even by allow rules.
- Scoped path rules: `Edit(path)` governs all built-in file-writing tools including `Write`/`NotebookEdit`; `Write(path)` rules are never matched. `//path` anchors an absolute filesystem path; `/path` anchors at the rule's source (session cwd for `allowed_tools`/`disallowed_tools`).
- Subagents inherit the parent's permission mode; an `AgentDefinition.permissionMode` can override it except when the parent uses `bypassPermissions`, `acceptEdits`, or `auto` (those apply unconditionally to every subagent).
- Declarative rules can also be set in `.claude/settings.json`, read when the `project` setting source is enabled.

## Related

- [Handle approvals and user input](./user-input.md)
- [Use Claude Code features in the SDK](../getting-started/claude-code-features.md)
