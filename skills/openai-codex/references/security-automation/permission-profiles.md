# Permission profiles

Beta. Named policies that combine filesystem rules (what commands can read/write) with network rules (which destinations commands can reach), applying least-privilege boundaries to local commands Codex runs on your behalf.

## Signature / Usage

```toml
default_permissions = "project-edit"

[permissions.project-edit]
extends = ":workspace"

[permissions.project-edit.workspace_roots]
"~/code/app" = true

[permissions.project-edit.filesystem.":workspace_roots"]
"." = "write"
".devcontainer" = "read"
"**/*.env" = "deny"

[permissions.project-edit.network]
enabled = true

[permissions.project-edit.network.domains]
"api.openai.com" = "allow"
"*.github.com" = "allow"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `:read-only` | built-in profile | Keeps local command execution read-only. |
| `:workspace` | built-in profile | Allows writes inside active workspace roots and system temp directories; keeps `.codex`/`.git`/`.agents` read-only. |
| `:danger-full-access` | built-in profile | Removes local sandbox restrictions. Cannot be used as an `extends` parent. |
| `default_permissions` | string | Selects the active profile by name or built-in. |
| `[permissions.<name>]` | table | Defines a named profile; `extends` starts it from `:read-only`, `:workspace`, or another named profile (not `:danger-full-access`; no unknown parents or cycles). |
| `[permissions.<name>.workspace_roots]` | table | Adds concrete directories treated as workspace roots for the profile. |
| `[permissions.<name>.filesystem]` | table of path → `read`\|`write`\|`deny` | Filesystem access rules. `deny` beats `write` beats `read` at equal specificity; a more specific path can reopen a narrower subtree inside a broader `deny`. |
| `[permissions.<name>.network]` | table | `enabled` (bool), `domains` (host pattern → `allow`\|`deny`), `unix_sockets`, `proxy_url`, `enable_socks5`, `allow_local_binding`, and `dangerously_*` escape hatches. |

## Notes

- Supported filesystem path forms: `:root` (filesystem root), `:minimal` (platform/runtime paths common tools need), `:workspace_roots` (session + profile-defined roots, supports scoped subpaths), `:tmpdir`, `:slash_tmp`, absolute paths, and `~/path`.
- Network domain patterns: exact host, `*.example.com` (subdomains only), `**.example.com` (apex + subdomains), `*` (allow-only global wildcard). `deny` always overrides `allow`.
- **Permission profiles do not compose with the older sandbox settings.** Configure either `default_permissions` + `[permissions]`, or `sandbox_mode` / `sandbox_workspace_write`, but not both. If `sandbox_mode` appears in any loaded config file, `--sandbox` is passed, or the selected profile sets `sandbox_mode`, Codex uses the older sandbox settings instead (see `sandbox.md` / `agent-approvals-security.md`). Managed `allowed_permission_profiles` is the exception — it forces the profile system; remove `sandbox_mode` / `[sandbox_workspace_write]` before deploying it. Full backward-compat requires every client on Codex 0.138.0 or later.
- Enforcement differs by OS: macOS Seatbelt refuses to run a command instead of running it unsandboxed if the policy can't be enforced; Linux/WSL use bubblewrap + seccomp (Landlock as compatibility fallback); native Windows uses `elevated` (strongest, dedicated low-privilege sandbox users + firewall rules) or the weaker `unelevated` fallback (restricted token + ACL boundaries), and unsupported split read/write policies are refused.
- Config detail beyond the profile-shaping keys above (the full `permissions.<name>.network.*` listener/proxy spec, `glob_scan_max_depth`, etc.) is `config.toml` key reference material — see the config category for the exhaustive table.
- Local permission profiles are supported on macOS, Linux, WSL, and native Windows.

## Related

- [Agent approvals & security](./agent-approvals-security.md)
- [Sandbox](./sandbox.md)
