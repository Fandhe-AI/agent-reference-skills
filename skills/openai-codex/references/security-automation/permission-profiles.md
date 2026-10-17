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
- Extend a profile: prefer extending a built-in (e.g. `extends = ":workspace"` keeps the workspace root's `.git`, `.agents`, `.codex`, and `.aws` read-only unless overridden) over starting from scratch. A profile can extend `:read-only`, `:workspace`, or another named profile; `description` isn't inherited. Example:

  ```toml
  default_permissions = "project-edit"

  [features]
  network_proxy = true

  [permissions.project-edit]
  description = "Project editing with OpenAI API access."
  extends = ":workspace"

  [permissions.project-edit.filesystem]
  glob_scan_max_depth = 3

  [permissions.project-edit.filesystem.":workspace_roots"]
  "**/*.env" = "deny"

  [permissions.project-edit.network]
  enabled = true

  [permissions.project-edit.network.domains]
  "api.openai.com" = "allow"
  ```
- Config layers: higher-precedence layers can add or replace entries under the same profile name without restating it (e.g. `/etc/codex/config.toml` and `~/.codex/config.toml` can each add `[permissions.server.workspace_roots]` entries and both participate). Once managed `allowed_permission_profiles` is present, omitted profiles are denied, including built-ins and future profiles. For a mixed-version enterprise rollout, keep managed `allowed_sandbox_modes` as a temporary compatibility constraint until every client runs 0.138.0 or later.
- Configuration spec details: `workspace_roots."<path>"` defaults `false` (inactive); a missing or empty `filesystem` table keeps filesystem access restricted and emits a startup warning; direct write rules the runtime can't enforce are rejected; scoped subpaths (`"<path>"."<subpath>"`) use `.` for the base and must be relative descendants without `.` or `..` components, and parent traversal such as `../other-repo` under `:workspace_roots` is rejected. Network defaults: `enabled` `false`, `proxy_url` `http://127.0.0.1:3128` (used for `HTTP_PROXY`, `HTTPS_PROXY`, WebSocket proxy and related tool proxy variables), `enable_socks5` `true` (`ALL_PROXY` and FTP proxy variables), `socks_url` `http://127.0.0.1:8081`, `enable_socks5_udp` `true`, `allow_upstream_proxy` `true` (respects upstream `HTTP(S)_PROXY` / `ALL_PROXY`), `allow_local_binding` `false`. Domain patterns are normalized (trim, lowercase, strip trailing dot, strip ports/brackets); the active proxy blocks everything if there are no `allow` entries.
- Filesystem access values: `read` (read files, list directories), `write` (read and modify, including create/rename/delete when the OS allows), `deny` (denies both). More specific entries override broader ones and a narrower path can reopen a subtree inside a broader deny (e.g. `"~/Documents" = "deny"` with `"~/Documents/codex" = "write"`). `:root` is for intentionally broad read coverage; `:tmpdir` / `:slash_tmp` are `.`-only scoped. On native Windows, drive-letter (`D:\work`) and UNC (`\\server\share`) paths and `~\work` are supported.
- Deny-read globs: a glob under `:workspace_roots` is interpreted relative to each effective workspace root. On Linux, WSL, and native Windows with MXC or `elevated`, matches are enumerated when each sandboxed process starts; files created later remain readable to an already-running process (shell, watcher, dev server), so don't rely on a glob to block newly created files there. `deny` globs are supported as deny-read rules; `read`/`write` globs are less portable (prefer exact paths or subtree rules like `"docs/**" = "read"`). An unbounded `**` deny pattern needs `glob_scan_max_depth` (at least `1`), or list explicit depths such as `*.env`, `*/*.env`, `*/*/*.env`.
- Network behavior: network off = no access regardless of the proxy; network on + proxy off = direct, unrestricted access (domain rules not enforced); network on + proxy on = proxy enforces domain rules (no allowed domains = external destinations blocked). Adding `domains` or `enabled = true` doesn't enable `features.network_proxy`; administrators can enable the proxy with `[experimental_network]` in `requirements.toml`. Local/private guard: allowlist exact `localhost` / `127.0.0.1` for one literal local target, or set `allow_local_binding = true` only when allowlisted hostnames resolve to local/private addresses. Unix sockets (e.g. `"/var/run/docker.sock" = "allow"`) are a local escape hatch; `deny` rejects a path including an inherited allow, and listeners should stay loopback-bound.
- What profiles control: sandboxed local command execution only (connectors, MCP servers, browser / computer-use surfaces, Codex cloud environment settings, and approved escalations use their own controls). The network proxy doesn't filter web search (`web_search`, `allowed_web_search_modes`; `tools.web_search.allowed_domains` filters search results only), apps and connectors, MCP servers, browser and Computer Use, Codex service traffic (client HTTP / system-proxy settings), or Codex Cloud (its own network settings; Codex Cloud (Legacy) has internet access settings). Treat writes to scripts, build steps, package manager hooks, shell startup files, and shared directories as sensitive. Choose the narrowest profile that completes the task. Don't assume Work Cloud supports these profiles.
- Migrate from older sandbox settings: for read-only use `:read-only` (or a custom profile with read access only where needed); for workspace editing use `:workspace` (or a custom profile writing through `:workspace_roots`); for unrestricted local execution use `:danger-full-access` only intentionally. Organization-managed requirements can add restrictions that user config shouldn't broaden.
- Common profiles: read-only with network allowlist (`readonly-net`: `:minimal` read, `:workspace_roots` `"."` read, network enabled with `api.openai.com` allowed, `network_proxy = true`); file access limited to workspace (`workspace-only`: `extends = ":workspace"`, `":root" = "deny"`, `":minimal" = "read"`, optionally `":tmpdir"` / `":slash_tmp"` `deny`); workspace write without network (`project-edit` with `network.enabled = false`); workspace write with public web access (`workspace-net`: `network_proxy = true`, `"*" = "allow"` — use the global `*` only when public access is intended; deny rules can narrow it).
- Enforcement differs by OS: macOS Seatbelt refuses to run a command instead of running it unsandboxed if the policy can't be enforced; Linux/WSL use bubblewrap + seccomp (the legacy Landlock option can't isolate app-server Unix sockets and is rejected for filesystem-restricted policies; disable `features.use_legacy_landlock` when upgrading; hosts that block the required bubblewrap operations can't run these policies); native Windows uses MXC (process isolation for filesystem and network permissions; review compatibility before enabling) with the legacy `elevated` fallback (dedicated lower-privilege sandbox users, filesystem permission boundaries, firewall rules) or the weaker legacy `unelevated` fallback (weaker network isolation; can't enforce every split read/write carveout, so unsupported policies are refused). Use WSL for the Linux sandbox model.
- `features.network_proxy = true` is needed for profile domain rules to be enforced. `network.enabled` allows command network access but does not start the proxy. Additional network keys: `socks_url`, `enable_socks5_udp`, `allow_upstream_proxy`; `dangerously_allow_non_loopback_proxy` and `dangerously_allow_all_unix_sockets` are escape hatches not meant for ordinary development.
- `glob_scan_max_depth` (at least 1) limits deny-read glob pre-expansion on Linux, WSL, and native Windows. `default_permissions` may be omitted under managed requirements only if both `:workspace` and `:read-only` are explicitly allowed.
- Config detail beyond the profile-shaping keys above (the full `permissions.<name>.network.*` listener/proxy spec, `glob_scan_max_depth`, etc.) is `config.toml` key reference material — see the config category for the exhaustive table.
- Local permission profiles are supported on macOS, Linux, WSL, and native Windows.

## Related

- [Agent approvals & security](./agent-approvals-security.md)
- [Sandbox](./sandbox.md)
