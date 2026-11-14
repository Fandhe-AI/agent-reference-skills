<!-- source: https://code.claude.com/docs/en/agent-sdk/permissions.md / last verified: 2026-11-14 -->

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
| `permission_mode` / `permissionMode` | `"default" \| "dontAsk" \| "acceptEdits" \| "bypassPermissions" \| "plan" \| "auto"` | Global control over tool approval behavior. With Claude Code v2.1.302+ the app starts in `default` unless a mode is set or `permissions.defaultMode` comes from its settings files |
| `permissionPrompts` | `'none'` | TypeScript only (Claude Code v2.1.259+). Your `canUseTool` callback is not called at the last step; a `PermissionRequest` hook still gets to decide, otherwise the call is denied |
| `settings.useAutoModeDuringPlan` | boolean | Default on. `false` turns off auto mode's classifier review of calls made during `plan` mode; set it in the `settings` option of `query()` or in user settings |
| custom tool `permission_policy` | `"always_ask"` \| `"always_deny"` | TypeScript only. `always_deny` denies calls at the deny-rule step; `always_ask` means no allow rule (not even an `allowedTools` entry) approves the tool's calls |

## Notes

- Evaluation order: hooks → deny rules → ask rules (from `settings.json`) → permission mode → allow rules → `canUseTool` callback. A hook `allow` does not skip deny/ask rules below it.
- `dontAsk` mode: anything not pre-approved is denied outright, `canUseTool` is never called; `AskUserQuestion` and tools requiring user interaction are denied even if pre-approved.
- `acceptEdits` mode: auto-approves `Edit`/`Write` and filesystem commands (`mkdir`, `touch`, `rm`, `rmdir`, `mv`, `cp`, `sed`) within the working directory or `additionalDirectories`.
- `bypassPermissions` mode: approves everything except explicit `ask` rules, tools requiring user interaction, and org-set `ask` connector tools. Does NOT respect `allowed_tools` as a restriction — unlisted tools still run. Cannot be used when running as root on Unix; TypeScript also requires `allowDangerouslySkipPermissions: true`.
- `plan` mode: edits made with Claude's file tools outside protected paths reach `canUseTool` even when an allow rule matches or a `PreToolUse` hook returns `allow`; `AskUserQuestion` calls reach it too. When auto mode is available, shell commands, web fetches, web searches, and MCP tools their server marks read-only go to auto mode's classifier instead (when no allow rule approves them); read-only shell commands and `WebFetch` to preapproved documentation domains run without reaching the callback. With `useAutoModeDuringPlan` set to `false`, or auto mode unavailable, web searches and read-only MCP tool calls, other shell commands, and other `WebFetch` calls reach the callback.
- `auto` mode: a model classifier reviews actions such as shell commands and network requests and allows or blocks each. Switching an `auto` session to an unsupported model via `set_model()` / `setModel()` / `applyFlagSettings()` moves it to `default` (a `system` `status` message with `permissionMode: "default"`; Claude Code v2.1.299+). Switch to a supported model and call `set_permission_mode("auto")` / `setPermissionMode("auto")` to return; while the model is unsupported the call fails with `Cannot set permission mode to auto: auto mode unavailable for this model`.
- Rule semantics: allow rules accept tool-name globs only after a literal `mcp__<server>__` prefix (`mcp__puppeteer__*`, `mcp__github__get_*`); unanchored `allowed_tools=["*"]` or `["mcp__*"]` is ignored. Deny rules accept globs (`"*"` matches every tool, `"mcp__*"` every MCP tool). `disallowed_tools=["Bash(rm *)"]` denies calls matching `rm *` as written in every mode including `bypassPermissions`; `/bin/rm` falls through to the permission mode. Reads from network paths are never approved by an allow rule.
- Calls no allow rule approves (denied in `dontAsk`; answered in the callback elsewhere): `AskUserQuestion`, MCP tools whose server sets `_meta["anthropic/requiresUserInteraction"]` (Claude Code v2.1.199+), connector tools your organization set to `ask` (reason `Your organization requires approval for this tool`), custom tools marked `always_ask`, and recognized `rm` / `rmdir` critical-path removals (`decisionReason` starts with `Dangerous rm`). A `PreToolUse` `allow` cannot approve a critical-path removal. In `auto`, `plan`, or `bypassPermissions` mode an `always_ask` call can be approved before the callback.
- A `PreToolUse` hook is the way to check calls that an allow rule, `acceptEdits`, or `bypassPermissions` approves (these skip `canUseTool`); a hook deny applies even in `bypassPermissions`. Pair `allowedTools` with `permissionMode: "dontAsk"` for a locked-down agent; calls needing no approval in `default` mode (read-only Bash commands, `Agent`, reads inside working directories) run whether or not listed. To hide a built-in tool entirely, put its bare name in `disallowedTools`.
- `acceptEdits` does not auto-approve paths outside the working directory/added directories (`add_dirs` / `additionalDirectories`), protected paths, recognized critical-path `rm` / `rmdir`, or `touch` with an option, a glob, or a prefix such as `timeout 5` / `LANG=C`.
- Subagent inheritance: under a `plan` main session a subagent with `permissionMode: "acceptEdits"` still runs in `plan`. A subagent inherits `plan`, `acceptEdits`, `auto`, or `bypassPermissions` from the main session; under `default` / `dontAsk` it runs in its own mode, but a `"bypassPermissions"` value is never applied (Claude Code v2.1.267+) and `"auto"` only when auto mode is available to it.
- Scoped path rules: `Edit(path)` governs all built-in file-writing tools including `Write`/`NotebookEdit`; `Write(path)` rules are never matched. `//path` anchors an absolute filesystem path; `/path` anchors at the rule's source (session cwd for `allowed_tools`/`disallowed_tools`).
- TypeScript: when a `canUseTool` callback is shadowed by an earlier auto-approve step, the SDK emits a Node.js process warning with code `CLAUDE_SDK_CAN_USE_TOOL_SHADOWED` once, when the query is constructed. Triggers: `permissionMode: 'bypassPermissions'`, and each bare `allowedTools` entry such as `"Read"`. Entries with a specifier such as `Bash(ls *)` and `acceptEdits` mode don't trigger it, and allow rules from settings files aren't visible to the check. To gate every tool call regardless of mode and rules, use a `PreToolUse` hook.
- Declarative rules can also be set in `.claude/settings.json`, read when the `project` setting source is enabled.
- Change the mode mid-session with `set_permission_mode()` (Python) / `setPermissionMode()` (TypeScript); it applies to all subsequent tool requests.
- Source: https://code.claude.com/docs/en/agent-sdk/permissions (fetched 2026-11-14)

## Related

- [Handle approvals and user input](./user-input.md)
- [Use Claude Code features in the SDK](../getting-started/claude-code-features.md)
