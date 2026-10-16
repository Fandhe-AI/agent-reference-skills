<!-- source: https://code.claude.com/docs/en/permissions.md / last verified: 2026-10-16 -->

# Configure permissions

Fine-grained permission rules, modes, and managed policies that control what Claude Code can access and do.

## Signature / Usage

```json
// .claude/settings.json
{
  "permissions": {
    "allow": ["Bash(npm run *)", "Bash(git commit *)"],
    "deny": ["Bash(git push *)"],
    "defaultMode": "acceptEdits"
  }
}
```

### Permission system

| Tool type | Example | Approval required | "Yes, don't ask again" behavior |
|---|---|---|---|
| Read-only | File reads, Grep | No, within working directory and additional directories | N/A |
| Bash commands | Shell execution | Yes, except built-in read-only commands | Permanently per repository and command |
| File modification | Edit/write files | Yes | Until session end |
| Web fetch | WebFetch | Yes, except a built-in set of preapproved documentation domains | Permanently per repository and domain |
| Web search | WebSearch | Yes | Permanently per repository |

- "Yes, don't ask again" for a Bash command or a WebFetch domain saves the rule to `.claude/settings.local.json` at the git repository root (resolved through worktrees); outside a repo it saves to the starting directory.
- The prompt can also offer "Yes, and switch to auto mode" (not on every prompt).

### Manage permissions

- View/manage with `/permissions`. **Allow** rules skip approval, **Ask** rules always prompt, **Deny** rules block.
- Evaluation order: deny → ask → allow. First match wins regardless of specificity, so a broad deny (`Bash(aws *)`) blocks even narrower allow matches.
- A bare tool name deny (e.g. `Bash`) removes the tool from Claude's context entirely (except `EndConversation`, which can never be fully removed while other tools remain). A scoped deny (`Bash(rm *)`) leaves the tool available and blocks matching calls.
- Permission rules are enforced by Claude Code, not the model; CLAUDE.md/prompt instructions shape behavior but don't enforce boundaries.

## Options / Props

| Rule syntax | Effect |
|---|---|
| `Tool` or `Tool(*)` | Matches all uses of the tool |
| `Tool(specifier)` | Matches a specific use, e.g. `Bash(npm run build)`, `Read(./.env)`, `WebFetch(domain:example.com)` |
| `Tool(param:value)` | Deny/ask rules only; matches a top-level scalar input parameter, e.g. `Agent(model:opus)` |
| `Bash(prefix *)` | Wildcard glob; `:*` suffix is equivalent to trailing ` *` |
| `mcp__server`, `mcp__server__tool` | Matches an MCP server or specific tool; `mcp__server__*` matches all tools of that server. Allow rules accept tool-name globs only after a literal `mcp__<server>__` prefix; `mcp__*` and `*` globs are deny/ask only |
| `Agent(AgentName)` | Controls which subagents Claude can use |
| `Cd(<path-pattern>)` | Controls `/cd` targets; not model-invocable |

Read/Edit path patterns use gitignore syntax with four anchor types: `//path` (filesystem root), `~/path` (home), `/path` (settings-source relative), `path`/`./path` (cwd relative). Matching depth for single-segment directory patterns like `src/**` differs by rule type: allow rules match only at the anchored location, deny/ask rules match at any depth.

## Notes

- Rules are evaluated the same across settings scopes: any-scope deny always wins over any-scope allow (managed settings highest, no other level can override a managed deny).
- Bash rules strip known wrappers (`timeout`, `time`, `nice`, `nohup`, `stdbuf`, `command`, `builtin`, `noglob`) and leading known-safe env-var assignments before matching, so `Bash(npm test *)` also matches `timeout 30 npm test` and `NODE_ENV=test npm test`.
- A built-in, non-configurable set of read-only Bash commands (`ls`, `cat`, `grep`, `find`, read-only `git`, etc.) runs without a prompt in every mode.
- `Read` deny rules also block the Edit tool on the same path (Claude Code v2.1.208+) and the Write tool (v2.1.228+); `Write`/`NotebookEdit`/`Glob` path rules are silently unused — use `Edit(path)`/`Read(path)` instead.
- A `Read(path)` deny rule also applies to pasted/dragged image paths (the image isn't attached) and to @-mentioned directories (the listing omits matching names); checked in v2.1.290+.
- A deny or ask pattern starting with `!` is a gitignore negation that carves paths out of earlier `path`/`./path` rules, but only within rules from the same settings source; `Read(!.env)` in project settings doesn't cancel a managed `Read(./.env)` deny.
- Rules with text after the closing parenthesis (e.g. `Bash(ls) x`) are reported as invalid settings instead of being silently ignored (v2.1.260, changelog).
- The Ctrl+E command explanation on Bash/PowerShell prompts and the `permissionExplainerEnabled` setting were removed in v2.1.257 (changelog).
- MCP rules: `mcp__<server>` rules with parentheses are skipped (listed in the invalid-settings dialog and `claude doctor`); use `--disallowedTools` to match a parameter on an MCP tool. Since v2.1.299 (changelog), `mcp__a` no longer matches a server named `a__b` or `a_`; write `mcp__<server>__*` with the server's whole normalized name.
- A claude.ai connector tool your organization set to `ask` keeps prompting on every call even in `auto` and `bypassPermissions` modes (denied in `dontAsk`); allow rules don't take effect. Tools from connectors appear as `mcp__claude_ai_<server>__<tool>`.
- In a Cowork session, shell commands and web fetches run through `mcp__workspace__bash` / `mcp__workspace__web_fetch`. Whole-tool `Bash` / `WebFetch` deny rules also apply to them; `Bash` allow rules are never applied to `mcp__workspace__bash`.
- Reads from network paths (UNC `\\server\share`, `/net` automounts) keep their prompt even with allow rules, PreToolUse hooks returning `"allow"`, or auto mode (v2.1.292+); `dontAsk` denies them.
- A bare `WebFetch` deny/ask rule doesn't apply to Artifact reads (since v2.1.268); use `WebFetch(domain:claude.ai)`, `WebFetch(domain:*)`, or an `Artifact` rule.
- Managed settings delivery, precedence within the managed tier, and managed-only keys are covered by the managed-settings page (`../enterprise-setup/managed-settings.md`). Embedding hosts can supply additional managed policy via the SDK `managedSettings` option, including allow rules unless the admin sets the `allowManaged*Only` locks.
- Sandboxing (OS-level enforcement for Bash) and permission rules are complementary layers; see `sandboxing.md`.
- `permissions.allow` rules and `additionalDirectories` in a project's `.claude/settings.json` only take effect after the workspace trust dialog is accepted for that workspace.
- Managed settings support locks such as `allowManagedPermissionRulesOnly`, `allowManagedMcpServersOnly`, `disableBypassPermissionsMode`, `disableAutoMode` that user/project settings cannot override.
- The Agent SDK's `canUseTool` permission callback is a distinct programmatic permission mechanism for SDK agents; see anthropic-agent-sdk for that API. The `settings.json` basics covered here (permission rules, modes, managed settings) belong to Claude Code itself; see anthropic-claude-code for general settings usage.

## Related

- [permission-modes](./permission-modes.md)
- [managed-settings](../enterprise-setup/managed-settings.md)
- [sandboxing](./sandboxing.md)
- [sandbox-environments](./sandbox-environments.md)
- [security](./security.md)
