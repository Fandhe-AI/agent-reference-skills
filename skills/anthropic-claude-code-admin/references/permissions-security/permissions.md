<!-- source: https://code.claude.com/docs/en/permissions.md / last verified: 2026-08-07 -->

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

## Permission system

| Tool type | Example | Approval required | "Yes, don't ask again" behavior |
|---|---|---|---|
| Read-only | File reads, Grep | No, within working directory and additional directories | N/A |
| Bash commands | Shell execution | Yes, except built-in read-only commands | Permanently per repository and command |
| File modification | Edit/write files | Yes | Until session end |

- "Yes, don't ask again" for a Bash command saves the rule to `.claude/settings.local.json` at the git repository root (resolved through worktrees); outside a repo it saves to the starting directory.
- `Ctrl+E` on a Bash/PowerShell prompt shows a risk explanation (Low/Med/High); disable with `permissionExplainerEnabled: false`.

## Manage permissions

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
| `mcp__server`, `mcp__server__tool` | Matches an MCP server or specific tool; `mcp__*` (deny/ask only) matches every MCP tool |
| `Agent(AgentName)` | Controls which subagents Claude can use |
| `Cd(<path-pattern>)` | Controls `/cd` targets; not model-invocable |

Read/Edit path patterns use gitignore syntax with four anchor types: `//path` (filesystem root), `~/path` (home), `/path` (settings-source relative), `path`/`./path` (cwd relative). Matching depth for single-segment directory patterns like `src/**` differs by rule type: allow rules match only at the anchored location, deny/ask rules match at any depth.

## Notes

- Rules are evaluated the same across settings scopes: any-scope deny always wins over any-scope allow (managed settings highest, no other level can override a managed deny).
- Bash rules strip known wrappers (`timeout`, `time`, `nice`, `nohup`, `stdbuf`, `command`, `builtin`, `noglob`) and leading known-safe env-var assignments before matching, so `Bash(npm test *)` also matches `timeout 30 npm test` and `NODE_ENV=test npm test`.
- A built-in, non-configurable set of read-only Bash commands (`ls`, `cat`, `grep`, `find`, read-only `git`, etc.) runs without a prompt in every mode.
- `Read` deny rules also block the Edit tool on the same path (Claude Code v2.1.208+); `Write`/`NotebookEdit`/`Glob` path rules are silently unused — use `Edit(path)`/`Read(path)` instead.
- Sandboxing (OS-level enforcement for Bash) and permission rules are complementary layers; see `sandboxing.md`.
- `permissions.allow` rules and `additionalDirectories` in a project's `.claude/settings.json` only take effect after the workspace trust dialog is accepted for that workspace.
- Managed settings support locks such as `allowManagedPermissionRulesOnly`, `allowManagedMcpServersOnly`, `disableBypassPermissionsMode`, `disableAutoMode` that user/project settings cannot override.
- The Agent SDK's `canUseTool` permission callback is a distinct programmatic permission mechanism for SDK agents; see anthropic-agent-sdk for that API. The `settings.json` basics covered here (permission rules, modes, managed settings) belong to Claude Code itself; see anthropic-claude-code for general settings usage.

## Related

- [permission-modes](./permission-modes.md)
- [sandboxing](./sandboxing.md)
- [sandbox-environments](./sandbox-environments.md)
- [security](./security.md)
