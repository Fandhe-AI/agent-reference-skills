<!-- source: https://code.claude.com/docs/en/cloud-environments.md / last verified: 2026-11-14 -->

# Configure cloud environments

Per-environment configuration for Claude Code cloud sessions (Claude Code on the web, `claude --cloud`, Claude Tag, routines, mobile, Desktop): network access levels, environment variables, network secrets, setup scripts, and environment caching.

## Signature / Usage

```text
# Environment variables (.env format, one KEY=value per line)
NODE_ENV=development
LOG_LEVEL=debug
DATABASE_URL=postgres://localhost:5432/myapp
```

```text
# Limited network access: allowed domains, one per line (leading *. matches subdomains)
api.example.com
*.internal.example.com
registry.example.com
```

```bash
#!/bin/bash
# Setup script: runs as root on Ubuntu 24.04, before Claude Code launches
apt update && apt install -y shellcheck
```

```json
// SessionStart hook restricted to cloud sessions, in .claude/settings.json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup|resume",
        "hooks": [
          {
            "type": "command",
            "command": "bash \"$CLAUDE_PROJECT_DIR\"/scripts/install_pkgs.sh"
          }
        ]
      }
    ]
  }
}
```

```bash
# Transcript URL of the current cloud session (cse_ prefix becomes session_)
echo "https://claude.ai/code/${CLAUDE_CODE_REMOTE_SESSION_ID/#cse_/session_}"
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Network access level | **None** \| **Limited** \| **Full** | **None**: no outbound access through the session's network. **Limited** (new-environment default, **Allow package managers** checked): default allowlist of package registries/GitHub/cloud SDKs plus your **Allowed domains**. **Full**: any domain |
| **Allow package managers** | checkbox (under Limited) | Includes the default allowlist; clear it to leave the default list out and use only your listed domains |
| **Allowed domains** | one domain per line | Extra domains under **Limited**; a leading `*.` matches every subdomain |
| Network secrets | per environment | API key/token stored on an Anthropic-hosted environment; the agent proxy attaches it to requests for the hosts you list, so the key never enters the VM (see Notes) |
| `/remote-env` | CLI command | Picks the default cloud environment for CLI-initiated sessions; writes `remote.defaultEnvironmentId` to user settings (a higher-precedence settings layer, such as a repo's project settings, can override it) |
| `--environment <environment-id>` | CLI flag | For a self-hosted environment's `ccpool_` ID, overrides `/remote-env` and the fallback for one dispatch; rejects Anthropic-hosted `env_` IDs; requires Claude Code v2.1.224+ |
| `CLAUDE_CODE_REMOTE` | env (session) | `true` inside a cloud session; use to scope a SessionStart hook to cloud-only |
| `CLAUDE_CODE_REMOTE_SESSION_ID` | env (session) | Session's own ID, prefixed `cse_`; convert to `session_` for the transcript URL |
| `attribution.sessionUrl` | setting | `false` omits the `Claude-Session: <url>` commit trailer and the PR-body session link |
| `BASH_DEFAULT_TIMEOUT_MS`, `BASH_MAX_TIMEOUT_MS` | env (milliseconds) | Add to the environment's variables to raise command timeouts; e.g. `BASH_DEFAULT_TIMEOUT_MS=600000` makes 10 minutes the default |
| Resource limits | approximate | 4 vCPUs, 16 GB RAM, 30 GB disk per Anthropic-hosted session VM; may change over time |

## Notes

- Cloud environments apply to cloud sessions on Pro, Max, Ultra, and Team plans, and for Enterprise users with premium seats or Chat + Claude Code seats. The same environments apply in Desktop, the mobile app, claude.ai/code, `claude --cloud`, cloud scheduled tasks (routines), and Claude Tag; each can also route to a self-hosted environment. Remote Control sessions use your own machine, not a cloud environment.
- Source: https://code.claude.com/docs/en/cloud-environments.md, fetched 2026-11-14

### Default environment and selection

- Onboarding creates a **Default** environment (CLI flows such as `/web-setup`, and web onboarding on Pro/Max/Ultra; on Team/Enterprise a **Create your first cloud environment** form appears unless an Owner turned on Quick setup). **Default** has **Limited** network access and no variables or setup script.
- Desktop, mobile, and claude.ai/code use the environment shown in the selector (an organization default set by an Owner fills it when unpicked; threads in a project use the project's setting). The CLI uses your `/remote-env` pick, else the Anthropic-hosted environment if your list has one, else the first environment that isn't a Remote Control bridge environment.
- Add, edit, and archive environments from the selector under the message box at claude.ai/code (or Desktop cloud sessions); to edit a running session's environment, use the caret after the session title and select **Edit cloud environment**. Setup script via **Choose file** accepts a text file up to 64 KB.
- Archiving blocks only new sessions (running ones continue and keep their network secrets, so delete unwanted secrets first); the environment disappears from the selector and `/remote-env`, and a saved CLI default falls back as above. There is no delete for an Anthropic-hosted environment; an Owner can delete a self-hosted one from the **Cloud environments** admin page.
- Organization-shared environments (Team/Enterprise): an Owner (the Admin role can't open the page) creates them on the **Cloud environments** page in admin settings or shares a personal environment via **Who can use it** (the ID is kept). Members see them under **Organization** as a read-only summary. The org default is set at claude.ai/admin-settings/claude-code.
- Claude Tag channels use organization-level environments only (shared or self-hosted): set the org default or pin one to a channel in the Claude Tag admin settings. An Owner can create a shared environment with a setup script to give a channel a toolchain that isn't pre-installed (such as .NET). What Claude can't use yet when a Claude Tag session runs in a self-hosted environment is listed under "Availability and limitations" on the self-hosted environments page.

### Environment variables and network secrets

- Variables use `.env` format. Plain values need no quotes; matching-pair quotes aren't part of the value. Quote values that span lines or contain `#` (unquoted `#` starts a comment and drops the rest of the line).
- Sessions read them into ordinary environment variables, except `OTEL_*`, which Claude Code uses for its own telemetry export and doesn't pass to commands. In an Anthropic-hosted environment values are read at session creation and each time Claude Code starts in the VM again (VM restored after idle, or rebuilt after being reclaimed); edits reach an existing session only then. A cloud session sets some variables itself; `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` set by the session overrides one you add.
- Anyone who uses the environment can read its variables and setup script, so don't put secrets there; use a network secret instead.
- Network secrets (Pro, Max, Ultra, Team, Enterprise): added one at a time via **Network secrets** > **Add secret** (**Add** in admin settings) on an Anthropic-hosted environment; to change hosts or value, delete and re-add. Default **Secret type** **Bearer** with **Allowed websites** (hosts, leading `*.` allowed) and **Custom headers** (default `Authorization` / prefix `Bearer`; for `X-Api-Key` change the name and clear the prefix). The value can't be viewed again; a secret marked **Not sent** explains why in the note under it.
- Without an organization admin role on Team/Enterprise, the **Add secret** form takes one host (no wildcard) and **Secret type** **Token** (field **Token**, **Header** to change from `Authorization`) or **Username and password**. For a shared environment, an Owner adds secrets from admin settings.
- Requirements: Anthropic-hosted environment (self-hosted has none), API reachable from the internet, no customer-managed encryption keys. Sessions reach a secret's hosts even when the network level wouldn't allow them, except hosts that never get the secret: GitHub (the GitHub proxy authenticates instead), `api.anthropic.com`, `registry.npmjs.org`, `jsr.io`, `npm.jsr.io`, `pypi.org`, `files.pythonhosted.org`, `index.crates.io`, `proxy.golang.org`, setup-script requests, and Claude Code's telemetry export. Two secrets with overlapping but non-identical hosts get no marker and only one is sent.

### Network access

- Changing an Anthropic-hosted environment's network access applies to existing sessions within about a minute. A shared environment opens read-only; an Owner changes it in admin settings. MCP connector traffic travels through Anthropic's servers, so connector hosts needn't be in **Allowed domains**.
- Always reachable regardless of level: GitHub via its proxy, enabled MCP connectors, hosts of network secrets (except the never-get-secret hosts), and the Anthropic API for Claude Code's own requests (even at **None**).
- Environments saved under the old names open as: **Trusted** becomes **Limited** with **Allow package managers** checked; **Custom** becomes **Limited** with its list and checkbox as set, or **Full** if the list contained a bare `*`.
- `*.frame.claudeusercontent.com` isn't needed for reading your organization's artifacts (read via the session's Anthropic connection); keep it allowlisted to open another organization's public artifacts, or when configuring the local CLI or a self-hosted runner.
- Each environment has its own allowed-domains list; there's no organization-level allowlist and no server-managed setting adds domains. An Owner can standardize a list through a shared environment.
- GitHub proxy (Anthropic-hosted, independent of level): the VM's git client uses a scoped credential the proxy swaps for your real token; API requests from built-in GitHub tools and from `gh` under the `proxy-injected` placeholder get real credentials substituted; it rejects branch deletions and pushes of anything other than a branch (e.g. tags) but doesn't limit which branches update (use branch protection or rulesets); it serves only repositories attached to the session (otherwise a 403 beginning `GitHub access to` ... `is not enabled for this session`, also for `github.com/{owner}/{repo}/archive/` and `codeload.github.com` URLs, even for public repos); and it rejects GitHub GraphQL with a 403 beginning `GitHub GraphQL is not available from Claude Code sessions`, so `gh pr` / `gh issue` fail (use `gh api repos/{owner}/{repo}/...`) and APIs that are GraphQL-only, such as Projects v2, are unreachable, even with your own `GH_TOKEN`. Self-hosted environments authenticate git with credentials the deployment provides.
- If neither `GH_TOKEN` nor `GITHUB_TOKEN` is set and the proxy handles auth, both read as `proxy-injected`; a token you set passes through unchanged and is readable by anyone using the environment. `gh` is pre-installed and reads `GH_TOKEN`, so no `gh auth login`.
- Anthropic-hosted sessions run behind an HTTP/HTTPS security proxy (protection against malicious requests, rate limiting and abuse prevention); public-repo files via `raw.githubusercontent.com` go through it and are on the default allowlist. Self-hosted outbound traffic uses your own network boundary. Bun has known proxy compatibility issues.

### What's in a cloud session

- Fresh Ubuntu 24.04 x86\_64 VM per session with the repo cloned; use x86\_64 Linux builds of precompiled dependencies. Pre-installed: Python 3.x (pip, poetry, uv, black, mypy, pytest, ruff), Node.js 20/21/22 at `/opt/node20|21|22` (22 on `PATH`; npm, yarn, pnpm, bun, eslint, prettier, chromedriver), Ruby 3.1-3.3, PHP 8.3 + Composer, OpenJDK 21 + Maven/Gradle, Go, Rust, GCC/Clang/cmake/ninja/conan, docker/dockerd/docker compose, PostgreSQL 16, Redis 7.0, Chrome for Testing at `/usr/bin/google-chrome` (`CHROME_PATH`), git/gh/jq/yq/ripgrep/tmux/vim/nano. Ask Claude to run `check-tools` for versions. Toolchains such as the .NET SDK aren't pre-installed; use a setup script.
- Carries over via the repo clone: `CLAUDE.md`, `.claude/rules/`, `.claude/skills|agents|commands/`; `.claude/settings.json` hooks/permissions and `.mcp.json` servers only for a session with one repository (a project cloud thread loads only root `CLAUDE.md`, `.claude/CLAUDE.md`, and non-path-specific `.claude/rules/`). Server-managed settings apply except in Claude Tag sessions.
- Does not carry over: plugins and marketplaces declared in a repo's `.claude/settings.json` (`enabledPlugins` / `extraKnownMarketplaces`); user-level `~/.claude/CLAUDE.md`, `skills`, `agents`, `commands`; user-scope plugins; MCP servers added at local or user scope (use `claude mcp add --scope project` and commit `.mcp.json`); transport variables in the repo's `env` block such as `NODE_EXTRA_CA_CERTS` and mTLS client certificate variables (ignored, noted in the debug log); interactive auth like AWS SSO. Skills enabled on claude.ai load automatically. MDM/managed-settings files on your device don't apply; in a self-hosted environment sessions also read the runner image's managed settings file.
- Personal preferences without committing: put a setup script on one of your own environments (not a shared one) that writes `~/.claude/CLAUDE.md`; confirm with `/context` that `/root/.claude/CLAUDE.md` appears under **Memory files**.
- You have no shell into the VM; Claude runs every command, so phrase tasks as prompts. PostgreSQL and Redis are pre-installed but not running (`service postgresql start`, `service redis-server start`); Docker is available and image pulls follow the network level. Put `docker compose pull` / `build` in the setup script so the cache keeps images; the cache stores files, not running processes.
- Time limits: commands use the Bash tool defaults (2 minutes foreground, up to 10 minutes requested); at timeout a command moves to the background (unless it starts with `sleep`) and can run up to 30 more minutes (`BASH_DEFAULT_TIMEOUT_MS` above `1800000` lengthens that too). SessionStart `command` hooks are cancelled after 600 seconds unless `timeout` is set (not enforced with `async: true`). A VM pauses after a few minutes idle and may later be reclaimed. Workloads beyond the resource limits: Remote Control or a self-hosted environment.
- Commits/PRs Claude creates in a cloud session include a `Claude-Session: <url>` trailer and the PR body includes the session URL on its own line; disable with `attribution.sessionUrl: false`.

### Setup scripts, caching, and SessionStart hooks

- Setup scripts must exit 0 (append `|| true` to non-critical steps; non-zero fails session start or leaves tools uninstalled), finish within roughly five minutes (otherwise the environment isn't cached; use `&` and `wait` to parallelize and move big downloads to a background SessionStart hook), and need network access for installs (**None** makes installs fail). The environment's variables aren't set yet when the script runs, so set needed values inside it.
- Environment caching: when setup completes in time, the filesystem is snapshotted and reused (packages, Docker images, and files carry over; running processes don't). The script reruns to rebuild when the script or allowed hosts change or after roughly seven days. It doesn't run when a VM is restored after idle, so a script change reaches an existing session only when its VM is rebuilt after reclaim. Replacing the base image isn't supported yet; install on top of it or run your own image with `docker compose`.
- Setup scripts run before Claude Code launches (skipped when cached), cloud only, configured in the environment dialog or admin page; SessionStart hooks run after launch on every session including resumed, local and cloud, configured in a settings file. Use a setup script for toolchains/CLIs, a hook for project setup like `npm install`. User-level `~/.claude/settings.json` hooks don't reach the cloud. Anthropic-hosted sessions run hooks from server-managed settings (not in Claude Tag) and, outside a project thread, from the repo; self-hosted sessions also run hooks seeded from the runner host's `~/.claude/` and the runner image's managed settings file.
- Hook limitations: a session with several repositories, and any project cloud thread, runs no repository `.claude/settings.json` hooks (use a setup script); no cloud-only scoping (exit early unless `CLAUDE_CODE_REMOTE` is `true`); needs network (fails at **None**); adds startup latency on every start/resume (skip finished work). The `install_pkgs.sh` pattern: exit unless `CLAUDE_CODE_REMOTE` is `true`, then `npm install` guarded by a `sha256sum --check` of `scripts/install_pkgs.sh`, `package.json`, and `package-lock.json` stored in `node_modules/.install_pkgs.sha256`, then `pip install -r requirements.txt`; add other inputs (workspace `package.json`, `.npmrc`, `postinstall` inputs) to the hash command.

### Default allowed domains (Limited with Allow package managers)

- Anthropic services; version control (github.com and related hosts, gitlab.com, bitbucket.org); container registries (Docker Hub, `gcr.io`, `ghcr.io`, `mcr.microsoft.com`, `public.ecr.aws`); cloud platforms (Google, Azure, `*.amazonaws.com`, Oracle, `*.r2.cloudflarestorage.com`); package managers for JS (npm, yarn, jsr), Python, Ruby, Rust, Go, JVM, and others (Packagist, NuGet, pub.dev, hex.pm, CPAN, CocoaPods, Haskell, Swift); Linux distributions (Ubuntu, Launchpad, `*.nixos.org`); development tools (Kubernetes, HashiCorp, Anaconda, Apache, Eclipse, nodejs.org, `developer.apple.com`, `developer.android.com`, `pkg.stainless.com`, `binaries.prisma.sh`); monitoring (`*.datadoghq.com`, `*.datadoghq.eu`, `api.honeycomb.io`); mirrors and fonts (SourceForge, packagecloud, Google Fonts); schema hosts (`json-schema.org`, `json.schemastore.org`); `*.modelcontextprotocol.io`. See the official page for the full per-host list.

## Related

- [headless.md](./headless.md)
- [devcontainer.md](./devcontainer.md)
