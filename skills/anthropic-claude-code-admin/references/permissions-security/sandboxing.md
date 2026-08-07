<!-- source: https://code.claude.com/docs/en/sandboxing.md / last verified: 2026-08-07 -->

# Configure the sandboxed Bash tool

Built-in per-command OS-level sandbox (Seatbelt on macOS, bubblewrap on Linux/WSL2) that lets Claude run most shell commands without a permission prompt by enforcing filesystem and network boundaries instead.

## Signature / Usage

```text
/sandbox
```

```json
// settings.json
{
  "sandbox": {
    "enabled": true,
    "filesystem": { "allowWrite": ["~/.kube", "/tmp/build"] },
    "network": { "allowedDomains": ["github.com", "*.npmjs.org"] }
  }
}
```

## Options / Props

| Setting | Purpose |
|---|---|
| `sandbox.enabled` | Turn the sandbox on |
| `sandbox.failIfUnavailable` | Refuse to start instead of silently falling back when deps are missing |
| `sandbox.allowUnsandboxedCommands` (Overrides tab: **Strict sandbox mode** when `false`) | Whether the `dangerouslyDisableSandbox` escape hatch may retry a failed command unsandboxed |
| `sandbox.filesystem.allowWrite` / `denyWrite` / `allowRead` / `denyRead` | Path-level filesystem grants/denies; more specific read rule wins on overlap |
| `sandbox.filesystem.disabled` | Skip filesystem isolation while keeping network isolation (user/managed/`--settings` only, v2.1.216+) |
| `sandbox.network.allowedDomains` / `deniedDomains` | Domain allowlist/denylist for the network proxy |
| `sandbox.network.strictAllowlist` | Deny (don't prompt) hosts outside the allowlist (user/managed/CLI only, v2.1.219+) |
| `sandbox.network.tlsTerminate` | Experimental: proxy terminates TLS itself, required for credential masking |
| `sandbox.credentials.files` / `envVars` | `deny` (block reads / unset env var) or `mask` (sentinel + proxy substitution) entries for credentials |
| `excludedCommands` | Commands that always run outside the sandbox |
| `allowUnixSockets` | Unix sockets reachable from inside the sandbox (e.g. `/var/run/docker.sock` — grants effective host access) |

## Notes

- Two modes: **auto-allow** (sandboxed commands run without prompting; commands that can't be sandboxed fall back to the regular permission flow) vs **regular permissions** (all Bash still prompts even when sandboxed). Both enforce the same filesystem/network restrictions.
- Even in auto-allow mode: explicit deny rules, `rm`/`rmdir` on `/`/home/critical paths, content-scoped ask rules (`Bash(git push *)`), and a bare `Bash`/`Bash(*)` ask rule in **plan mode** still force a prompt.
- Default filesystem: write access to cwd + session temp dir only; read access to the whole machine except denied paths — this still allows reading `~/.aws/credentials` and `~/.ssh/` by default; use `sandbox.credentials` or `denyRead` to block them.
- Default network: no domains pre-allowed; first use of a new domain prompts (persists for the session). `WebFetch(domain:...)` allow rules also pre-allow domains.
- The built-in network proxy does **not** terminate/inspect TLS by default, so encrypted traffic content isn't inspected — domain fronting through an allowed broad domain (e.g. `github.com`) is a known exfiltration risk; use a custom proxy with `httpProxyPort`/`socksProxyPort` for TLS-aware inspection if required.
- Credential masking (`mode: "mask"`) requires `network.tlsTerminate` and is honored only from user/managed/`--settings` sources — never from a repo's `.claude/settings.json` or `.settings.local.json`.
- Requires macOS, Linux, or WSL2 (WSL1 unsupported); native Windows is not supported — run inside WSL2. Linux/WSL2 need `bubblewrap` + `socat` installed.
- Sandbox settings automatically deny writes to Claude Code's own `settings.json` files, managed settings, and `.mcp.json` (including symlink targets) — even inside the sandbox — unless filesystem isolation is disabled.
- Scope: isolates Bash subprocesses only. Read/Edit/Write built-in tools use the permission system directly, not the sandbox; computer-use / desktop control runs outside it entirely; subagents inherit the parent session's sandbox config.
- Organizational enforcement: deliver `sandbox` keys via managed settings; `allowManagedReadPathsOnly` / `allowManagedDomainsOnly` lock array keys to the managed values only (boolean keys like `enabled` are always managed-value-wins; array keys otherwise merge across scopes, so developers can widen them).

## Related

- [sandbox-environments](./sandbox-environments.md)
- [permissions](./permissions.md)
- [permission-modes](./permission-modes.md)
