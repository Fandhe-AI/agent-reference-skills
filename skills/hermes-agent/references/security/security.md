# Security

Hermes Agent implements a defense-in-depth architecture across five distinct security boundaries, covering everything from user authorization through container isolation to prompt injection prevention.

## 7-Layer Defense Model

| Layer | Boundary | Purpose |
|-------|----------|---------|
| 1 | **User Authorization** | Controls who can interact via allowlists and DM pairing |
| 2 | **Dangerous Command Approval** | Human-in-the-loop gate for destructive operations |
| 3 | **Container Isolation** | Docker/Singularity/Modal sandboxing with hardened settings |
| 4 | **MCP Credential Filtering** | Environment variable isolation for MCP subprocesses |
| 5 | **Context File Scanning** | Prompt injection detection in project files |
| 6 | **Cross-Session Isolation** | Session data separation and path traversal hardening |
| 7 | **Input Sanitization** | Terminal tool working directory validation |

---

## Dangerous Command Approval

### Approval Modes

Configured via `approvals.mode` in `~/.hermes/config.yaml`:

| Mode | Behavior |
|------|----------|
| `manual` (default) | Always prompts the user for approval on dangerous commands |
| `smart` | Uses auxiliary LLM to assess risk; auto-approves low-risk, auto-denies dangerous, escalates uncertain |
| `off` | Disables all approval checks; equivalent to `--yolo` flag |

```yaml
approvals:
  mode: manual    # manual | smart | off
  timeout: 60     # seconds to wait for user response (default: 60, fail-closed on timeout)
```

### YOLO Mode

Bypasses all dangerous command approval prompts for the session.

| Activation | Method |
|-----------|--------|
| CLI flag | `hermes --yolo` or `hermes chat --yolo` |
| Slash command | `/yolo` during a session (toggles on/off) |
| Environment variable | `HERMES_YOLO_MODE=1` |

Use only in fully trusted environments.

**Note:** Even with YOLO mode enabled, a hardline blocklist remains always active. Catastrophic operations (e.g., `rm -rf /`, fork bombs, disk format) are blocked unconditionally and cannot be bypassed.

### Dangerous Patterns

The following patterns trigger the approval flow:

| Pattern | Description |
|---------|-------------|
| `rm -r` / `rm --recursive` | Recursive delete |
| `rm ... /` | Delete in root path |
| `chmod 777/666` / `o+w` / `a+w` | World/other-writable permissions |
| `chmod --recursive` with unsafe perms | Recursive world/other-writable |
| `chown -R root` / `chown --recursive root` | Recursive chown to root |
| `mkfs` | Format filesystem |
| `dd if=` | Disk copy |
| `> /dev/sd` | Write to block device |
| `DROP TABLE/DATABASE` | SQL DROP |
| `DELETE FROM` (without WHERE) | SQL DELETE without WHERE clause |
| `TRUNCATE TABLE` | SQL TRUNCATE |
| `> /etc/` | Overwrite system config |
| `systemctl stop/disable/mask` | Stop/disable system services |
| `kill -9 -1` | Kill all processes |
| `pkill -9` | Force kill processes |
| Fork bomb patterns | Fork bombs |
| `bash -c` / `sh -c` / `zsh -c` / `ksh -c` | Shell command via `-c` flag |
| `python -e` / `perl -e` / `ruby -e` / `node -c` | Script via `-e`/`-c` flag |
| `curl ... \| sh` / `wget ... \| sh` | Pipe remote content to shell |
| `bash <(curl ...)` / `sh <(wget ...)` | Execute remote script via process substitution |
| `tee` to `/etc/`, `~/.ssh/`, `~/.hermes/.env` | Overwrite sensitive files via tee |
| `>` / `>>` to `/etc/`, `~/.ssh/`, `~/.hermes/.env` | Overwrite sensitive files via redirection |
| `xargs rm` | xargs with rm |
| `find -exec rm` / `find -delete` | Find with destructive actions |
| `cp`/`mv`/`install` to `/etc/` | Copy/move into system config dir |
| `sed -i` / `sed --in-place` on `/etc/` | In-place edit of system config |
| `pkill`/`killall` hermes/gateway | Self-termination prevention |
| `gateway run` with `&`/`disown`/`nohup`/`setsid` | Starting gateway outside service manager |

**Note:** When running in `docker`, `singularity`, `modal`, or `daytona` backends, dangerous command checks are skipped — the container itself provides the security boundary.

### Approval Flow (CLI)

```
Warning  DANGEROUS COMMAND: recursive delete
  rm -rf /tmp/old-project
  [o]nce  |  [s]ession  |  [a]lways  |  [d]eny
  Choice [o/s/a/D]:
```

| Choice | Effect |
|--------|--------|
| `once` | Allow single execution |
| `session` | Allow pattern for remainder of session |
| `always` | Add to permanent allowlist in config |
| `deny` (default) | Block command |

### Approval Flow (Gateway / Messaging)

Dangerous command details are sent to chat. Respond with:
- **Approve:** `yes`, `y`, `approve`, `ok`, `go`
- **Deny:** `no`, `n`, `deny`, `cancel`

`HERMES_EXEC_ASK=1` is set automatically when running via the gateway.

### Permanent Allowlist

Commands approved with `always` are saved to `~/.hermes/config.yaml`:

```yaml
command_allowlist:
  - rm
  - systemctl
```

Edit via `hermes config edit`.

---

## User Authorization (Gateway)

### Authorization Check Order

`_is_user_authorized()` evaluates in this sequence:

1. Per-platform allow-all flag (e.g., `DISCORD_ALLOW_ALL_USERS=true`)
2. DM pairing approved list
3. Platform-specific allowlists (e.g., `TELEGRAM_ALLOWED_USERS`)
4. Global allowlist (`GATEWAY_ALLOWED_USERS`)
5. Global allow-all (`GATEWAY_ALLOW_ALL_USERS=true`)
6. Default: **deny**

### Platform Allowlists

Set in `~/.hermes/.env`:

```bash
TELEGRAM_ALLOWED_USERS=123456789,987654321
DISCORD_ALLOWED_USERS=111222333444555666
WHATSAPP_ALLOWED_USERS=15551234567
SLACK_ALLOWED_USERS=U01ABC123
GATEWAY_ALLOWED_USERS=123456789

# Allow-all flags (use with caution)
DISCORD_ALLOW_ALL_USERS=true
GATEWAY_ALLOW_ALL_USERS=true
```

If no allowlists are configured and `GATEWAY_ALLOW_ALL_USERS` is unset, all users are denied. The gateway logs a warning at startup.

### DM Pairing System

Code-based authorization for unknown users without requiring user IDs upfront.

**Flow:**
1. Unknown user sends a DM to the bot
2. Bot replies with an 8-character pairing code
3. Bot owner runs `hermes pairing approve <platform> <code>`
4. User is permanently approved for that platform

**Configuration** (`~/.hermes/config.yaml`):

```yaml
unauthorized_dm_behavior: pair  # pair | ignore

# Override per platform
whatsapp:
  unauthorized_dm_behavior: ignore
```

**Security Properties:**

| Feature | Details |
|---------|---------|
| Code format | 8 chars from a 32-char unambiguous alphabet (excludes `0`, `O`, `1`, `I`) |
| Randomness | Cryptographic (`secrets.choice()`) |
| Code TTL | 1-hour expiry |
| Rate limiting | 1 request per user per 10 minutes |
| Pending limit | Max 3 pending codes per platform |
| Lockout | 5 failed approval attempts → 1-hour lockout |
| File security | `chmod 0600` on all pairing data files |
| Logging | Codes are never logged to stdout |

**CLI Commands:**

```bash
hermes pairing list                          # List pending and approved users
hermes pairing approve telegram ABC12DEF     # Approve a pending code
hermes pairing revoke telegram 123456789     # Revoke an approved user
hermes pairing clear-pending                 # Clear all pending requests
```

**Storage** in `~/.hermes/pairing/`:
- `{platform}-pending.json` — pending pairing requests
- `{platform}-approved.json` — approved users
- `_rate_limits.json` — rate limit and lockout tracking

---

## Container Isolation

### Docker Security Hardening

Every container is launched with the following security arguments (from `tools/environments/docker.py`):

```python
_SECURITY_ARGS = [
    "--cap-drop", "ALL",                               # Drop ALL Linux capabilities
    "--security-opt", "no-new-privileges",             # Block privilege escalation
    "--pids-limit", "256",                             # Limit process count
    "--tmpfs", "/tmp:rw,nosuid,size=512m",             # Size-limited /tmp
    "--tmpfs", "/var/tmp:rw,noexec,nosuid,size=256m",  # No-exec /var/tmp
    "--tmpfs", "/run:rw,noexec,nosuid,size=64m",       # No-exec /run
]
```

### Resource Configuration

```yaml
terminal:
  backend: docker
  docker_image: "nikolaik/python-nodejs:python3.11-nodejs20"
  docker_forward_env: []   # Explicit allowlist only; default: nothing forwarded
  container_cpu: 1         # CPU cores
  container_memory: 5120   # MB (default: 5 GB)
  container_disk: 51200    # MB (default: 50 GB)
  container_persistent: true  # Persist filesystem across sessions
```

### Filesystem Persistence

| Mode | Behavior |
|------|----------|
| `container_persistent: true` | Bind-mounts `/workspace` and `/root` from `~/.hermes/sandboxes/docker/<task_id>/` |
| `container_persistent: false` | Uses tmpfs — all data lost on container cleanup |

---

## Terminal Backend Security Comparison

| Backend | Isolation | Dangerous Cmd Check | Best For |
|---------|-----------|---------------------|----------|
| `local` | None — runs on host | Yes | Development, trusted users |
| `ssh` | Remote machine | Yes | Running on a separate server |
| `docker` | Container | Skipped (container is boundary) | Production gateway |
| `singularity` | Container | Skipped | HPC environments |
| `modal` | Cloud sandbox | Skipped | Scalable cloud isolation |
| `daytona` | Cloud sandbox | Skipped | Persistent cloud workspaces |

For production deployments, prefer `docker`, `modal`, or `daytona` to isolate agent commands from the host.

---

## Environment Variable & Credential Handling

### Passthrough Mechanisms

**1. Skill-scoped passthrough (automatic)**

Skills declaring `required_environment_variables` in `SKILL.md` frontmatter have those variables automatically registered and passed through if set:

```yaml
required_environment_variables:
  - name: TENOR_API_KEY
    prompt: Tenor API key
    help: Get a key from https://developers.google.com/tenor
```

**2. Config-based passthrough (manual)**

For variables not declared by skills:

```yaml
terminal:
  env_passthrough:
    - MY_CUSTOM_KEY
    - ANOTHER_TOKEN
```

### Credential File Passthrough

Declared in skill frontmatter:

```yaml
required_credential_files:
  - path: google_token.json
    description: Google OAuth2 token (created by setup script)
  - path: google_client_secret.json
    description: Google OAuth2 client credentials
```

Or manually in config:

```yaml
terminal:
  credential_files:
    - google_token.json
    - my_custom_oauth_token.json
```

Paths are relative to `~/.hermes/`; they are mounted at `/root/.hermes/` inside containers, **read-only**.

### Sandbox Filtering Behavior

| Sandbox | Default Filter | Passthrough Override |
|---------|----------------|----------------------|
| `execute_code` | Blocks vars containing `KEY`, `TOKEN`, `SECRET`, `PASSWORD`, `CREDENTIAL`, `PASSWD`, `AUTH`; allows safe-prefix vars | Passthrough bypasses both checks |
| `terminal` (local) | Blocks Hermes infrastructure vars (provider keys, gateway tokens) | Passthrough bypasses blocklist |
| `terminal` (Docker) | No host env vars by default | Passthrough + `docker_forward_env` via `-e` |
| `terminal` (Modal) | No host env/files by default | Credential files mounted; env passthrough via sync |
| MCP | Blocks everything except safe system vars + explicitly configured `env` | Not affected — use MCP `env` config |

### Notes

- Passthrough only affects explicitly declared variables; default security posture is unchanged
- Credential files are mounted read-only in Docker containers
- Skills Guard scans skill content for suspicious env access before installation
- Missing or unset variables are never registered and cannot leak

---

## MCP Security

### Safe Environment Variables for MCP Subprocesses

Only the following are passed from host to MCP stdio subprocesses:

```
PATH, HOME, USER, LANG, LC_ALL, TERM, SHELL, TMPDIR, XDG_*
```

All other variables (API keys, tokens, secrets) are stripped. Variables declared in the MCP server's `env` config are passed explicitly:

```yaml
mcp_servers:
  github:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "ghp_..."   # Only this variable is passed
```

### Credential Redaction

Error messages are sanitized before being returned to the LLM. The following patterns are replaced with `[REDACTED]`:

- GitHub PATs (`ghp_...`)
- OpenAI-style keys (`sk-...`)
- Bearer tokens
- `token=`, `key=`, `API_KEY=`, `password=`, `secret=` URL/query parameters

---

## Website Blocklist

Restrict which websites are accessible via web and browser tools:

```yaml
security:
  website_blocklist:
    enabled: true
    domains:
      - "*.internal.company.com"
      - "admin.example.com"
    shared_files:
      - "/etc/hermes/blocked-sites.txt"
```

Enforced across `web_search`, `web_extract`, `browser_navigate`, and all URL-capable tools. Blocked URLs return an error explaining the domain is blocked by policy.

---

## SSRF Protection

All URL-capable tools validate URLs before fetching to prevent Server-Side Request Forgery. Blocked address ranges:

| Category | Ranges / Hosts |
|----------|---------------|
| Private networks (RFC 1918) | `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` |
| Loopback | `127.0.0.0/8`, `::1` |
| Link-local (incl. cloud metadata) | `169.254.0.0/16` (includes `169.254.169.254`) |
| CGNAT / shared address space (RFC 6598) | `100.64.0.0/10` (Tailscale, WireGuard) |
| Cloud metadata hostnames | `metadata.google.internal`, `metadata.goog` |
| Reserved, multicast, unspecified | (all) |

SSRF protection is always active and cannot be disabled by default. DNS failures are treated as blocked (fail-closed). Redirect chains are re-validated at each hop to prevent redirect-based bypasses.

To intentionally allow internal network access (e.g., self-hosted services), set `allow_private_urls: true` in configuration. Use only in controlled environments.

---

## Tirith Pre-Exec Scanning

Integrates [tirith](https://github.com/sheeki03/tirith) for content-level command scanning before execution.

**Detects:**
- Homograph URL spoofing (internationalized domain attacks)
- Pipe-to-interpreter patterns (`curl | bash`, `wget | sh`)
- Terminal injection attacks

Tirith auto-installs from GitHub releases on first use with SHA-256 checksum verification (cosign provenance verification if available).

```yaml
security:
  tirith_enabled: true       # Enable/disable scanning (default: true)
  tirith_path: "tirith"      # Path to binary (default: PATH lookup)
  tirith_timeout: 5          # Subprocess timeout in seconds
  tirith_fail_open: true     # Allow execution when tirith unavailable (default: true)
```

### Notes

- When `tirith_fail_open: true` (default), commands proceed if tirith is unavailable
- Set `tirith_fail_open: false` in high-security environments to block when unavailable
- Tirith verdict integrates with the approval flow: safe commands pass through; suspicious/blocked commands trigger user approval with full findings (severity, title, description, safer alternatives)
- Default choice is **deny** for unattended/automated scenarios

---

## Supply-Chain Vulnerability Scanning

`hermes security audit` performs OSV.dev supply-chain vulnerability scanning across the venv, installed plugins, and MCP server dependencies.

```bash
hermes security audit [options]
```

| Flag | Description |
|------|-------------|
| `--json` | Machine-readable output |
| `--fail-on <severity>` | Exit non-zero at or above this severity |
| `--skip-venv` | Skip venv scanning |
| `--skip-plugins` | Skip plugin scanning |
| `--skip-mcp` | Skip MCP server scanning |

---

## Context File Injection Protection

Context files (`AGENTS.md`, `.cursorrules`, `SOUL.md`) are scanned for prompt injection before inclusion in the system prompt.

**Detected patterns:**
- Instructions to ignore/disregard prior instructions
- Hidden HTML comments with suspicious keywords
- Attempts to read secrets (`.env`, `credentials`, `.netrc`)
- Credential exfiltration via `curl`
- Invisible Unicode characters (zero-width spaces, bidirectional overrides)

Blocked files display a warning instead of their content:

```
[BLOCKED: AGENTS.md contained potential prompt injection (prompt_injection). Content not loaded.]
```

---

## Production Deployment Best Practices

### Gateway Deployment Checklist

1. **Set explicit allowlists** — never use `GATEWAY_ALLOW_ALL_USERS=true`
2. **Use a container backend** — set `terminal.backend: docker`
3. **Restrict resource limits** — set appropriate CPU, memory, and disk limits
4. **Store secrets securely** — keep API keys in `~/.hermes/.env` with proper permissions (`chmod 600`)
5. **Enable DM pairing** — use pairing codes instead of hardcoding user IDs
6. **Review the command allowlist** — periodically audit `command_allowlist`
7. **Set `MESSAGING_CWD`** — prevent the agent from operating from sensitive directories
8. **Run as non-root** — never run the gateway as root
9. **Monitor logs** — check `~/.hermes/logs/` for unauthorized access attempts
10. **Keep updated** — run `hermes update` regularly for security patches

### Securing API Keys

```bash
chmod 600 ~/.hermes/.env
# Use separate keys per service
# Never commit .env files to version control
```

### Network Isolation

Run the gateway on a separate machine or VM, using the SSH backend:

```yaml
terminal:
  backend: ssh
  ssh_host: "agent-worker.local"
  ssh_user: "hermes"
  ssh_key: "~/.ssh/hermes_agent_key"
```

This keeps messaging connections separate from command execution.

## Related

- [Configuration](../configuration/configuration.md)
- [Messaging Gateway](../messaging/messaging.md)
- [Tools & Toolsets](../features/tools.md)
- [MCP](../features/mcp.md)
- [Context Files](../features/context-files.md)
- [CLI Commands Reference](../cli/commands.md)
