<!-- source: https://code.claude.com/docs/en/sandboxing.md / last verified: 2026-10-16 -->

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
- Requires macOS, Linux, or WSL2 (WSL1 unsupported); on native Windows Claude Code runs commands unsandboxed — run inside WSL2. Linux/WSL2 need `bubblewrap` + `socat` installed. By default, if the sandbox can't start, commands run unsandboxed; set `sandbox.failIfUnavailable` to `true` to exit at startup instead (on native Windows this makes Claude Code exit, so deliver the config by OS or move Windows users into WSL2 / a container).
- Sandboxed tools are Bash, PowerShell, and Monitor commands (and their child processes). Monitor commands aren't auto-approved in auto-allow mode; add an allow rule such as `Bash(npm run *)` to skip the prompt.
- `!` shell-mode commands you type yourself run unsandboxed, even in strict sandbox mode, except in background sessions and Linux sessions with `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB` set. Before v2.1.260 strict sandbox mode sandboxed shell-mode commands in every session.
- Admin-required sandbox: the sandbox becomes admin-required when `allowUnsandboxedCommands: false` is set in managed settings (or via `--settings` unless managed settings set `true`), or `allowManagedDomainsOnly: true` is set in managed settings. These don't turn the sandbox on, so also set `enabled`. While admin-required (v2.1.285+; v2.1.282-284 ignored only a repository's `excludedCommands`), Claude Code ignores these in a repository's `.claude/settings.json` / `.claude/settings.local.json`:

| Repository setting | What Claude Code ignores |
|---|---|
| `excludedCommands`, `ignoreViolations`, `network.allowedDomains`, `network.allowUnixSockets`, `network.allowMachLookup`, `network.httpProxyPort`, `network.socksProxyPort` | Every entry |
| `filesystem.allowWrite`, `Edit(...)` allow rules, `permissions.additionalDirectories` | The write access each entry gives sandboxed commands (file tools still follow the rules) |
| `WebFetch(domain:...)` allow rules | The host each rule adds to the sandbox allowlist |
| `enableWeakerNestedSandbox`, `enableWeakerNetworkIsolation`, `network.allowAllUnixSockets`, `network.allowLocalBinding` | `true`; a `false` still applies |
| `enabled`, `failIfUnavailable` | `false`, when the developer's `~/.claude/settings.json` sets `true` |
| `filesystem.allowRead` | An entry at or under a path that managed / `--settings` / user settings deny reading, or a glob that could match one |

- Locks that apply without an admin-required sandbox (v2.1.285+; the repository's other sandbox settings still apply):

| Setting (where set) | Ignored in a repository's settings |
|---|---|
| `network.deniedDomains` or a `WebFetch(domain:...)` deny rule (managed, `--settings`) | `httpProxyPort`, `socksProxyPort` |
| `network.strictAllowlist` (managed, `--settings`, user) | proxy ports, `allowedDomains`, `WebFetch(domain:...)` allow rules |
| `filesystem.denyRead`, a `Read(...)` deny rule, or a `credentials.files` entry (managed, `--settings`) | An `allowRead` / `allowWrite` / `Edit(...)` allow / `additionalDirectories` entry at or under a path denied for reads, or a glob that could match one |

- Weaker-isolation keys that a developer's user settings or `--settings` can turn on (and a repository can too unless admin-required); set them to `false` in managed settings if unwanted: `enableWeakerNestedSandbox`, `enableWeakerNetworkIsolation`, `network.allowAllUnixSockets`, `network.allowLocalBinding`, `allowAppleEvents` (a repository can't turn this one on).
- Custom proxy ports (`httpProxyPort` / `socksProxyPort`): with `allowManagedDomainsOnly` only managed settings can set one; when admin-required or a narrower network lock applies, managed, `--settings`, and user settings; otherwise any settings file. Before v2.1.285 any file could set a port. Once a port applies, your proxy must filter everything sent to it (`allowedDomains`, `strictAllowlist`, prompts and the local-address check stop applying to that traffic).
- Hostnames that resolve only to loopback, link-local (e.g. the `169.254.169.254` metadata endpoint) or the machine's own addresses are refused by the proxy (v2.1.284+; before that it connected to whatever address a name resolved to). `localhost` / `*.localhost` may resolve to loopback; add an IP such as `"127.0.0.1:8080"` to `allowedDomains` to permit one. Hostnames sent through an upstream corporate proxy skip the check.
- Per-command allowed domains in auto mode (v2.1.271+): a Bash / PowerShell / Monitor command can carry a host list (domain, wildcard, or IP, optional `:port`) that the classifier reviews with the command; approved hosts open for that one command only. Refused when `strictAllowlist` or `allowManagedDomainsOnly` locks the allowlist; `deniedDomains` still block.
- IPv6 addresses in `allowedDomains` / `deniedDomains` / `WebFetch(domain:...)` must use the bracketed form, e.g. `"[::1]"` or `"[::1]:443"` (v2.1.229+); `claude doctor` warns about ambiguous entries.
- Sandbox settings automatically deny writes to Claude Code's own `settings.json` files, managed settings, and `.mcp.json` (including symlink targets) — even inside the sandbox — unless filesystem isolation is disabled.
- Scope: isolates Bash subprocesses only. Read/Edit/Write built-in tools use the permission system directly, not the sandbox; computer-use / desktop control runs outside it entirely; subagents inherit the parent session's sandbox config.
- Organizational enforcement: deliver `sandbox` keys via managed settings; `allowManagedReadPathsOnly` / `allowManagedDomainsOnly` lock array keys to the managed values only (boolean keys like `enabled` are always managed-value-wins; array keys otherwise merge across scopes, so developers can widen them).

## Related

- [sandbox-environments](./sandbox-environments.md)
- [permissions](./permissions.md)
- [permission-modes](./permission-modes.md)
