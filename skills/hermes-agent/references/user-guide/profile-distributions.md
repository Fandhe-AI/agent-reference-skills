# Profile Distributions: Share a Whole Agent

A profile distribution packages a complete Hermes agent (SOUL, config, skills, cron jobs, MCP connections) as a git repository. Installers get the whole agent with one command and update it in place; their memories, sessions, and API keys stay untouched. The quick alternative is an export file (`.tar.gz`) made with `/export`.

## Signature / Usage

```bash
hermes profile install github.com/you/research-bot --alias
hermes profile info research-bot
hermes profile update research-bot
hermes profile delete research-bot
```

Manifest `distribution.yaml` (only `name` is required):

```yaml
name: research-bot
version: 1.0.0
description: "Autonomous research assistant with arXiv and web tools"
hermes_requires: ">=0.12.0"
author: "Your Name"
license: "MIT"
env_requires:
  - name: OPENAI_API_KEY
    description: "OpenAI API key (for model access)"
    required: true
  - name: SERPAPI_KEY
    description: "SerpAPI key for web search"
    required: false
    default: ""
```

## Options / Props

| Command / flag | Description |
|------|-------------|
| `hermes profile install <source> [--alias] [--name <n>] [-y/--yes]` | Install from any git URL, SSH URL, GitHub shorthand, or a local directory; `--name` overrides the profile name |
| `hermes profile update <name> [--force-config] [--yes]` | Re-clone from the recorded source and replace distribution-owned files; `config.yaml` is preserved unless `--force-config` |
| `hermes profile info <name>` | Show distribution name, version, description, author, requirements, source, install time, env vars |
| `/export [name] [-o path]` / `hermes profile export <name> [-o path]` | Pack a profile into a `.tar.gz` (credentials stripped) |
| `/import <file> [--name n]` / `hermes profile import <file> [--name n]` | Unpack as a new profile; importing over an existing profile or as `default` is refused |
| `distribution_owned` (manifest list) | Override which paths are replaced on update |

Ownership on update: distribution-owned (`SOUL.md`, `config.yaml`, `mcp.json`, `skills/`, `cron/jobs.json`, `distribution.yaml`; `cron/jobs.json` is merged by job id and new jobs arrive paused); `config.yaml` is preserved by default; user-owned and never touched (`memories/`, `sessions/`, `state.db*`, `auth.json`, `.env` and other credential stores, `logs/`, `workspace/`, `plans/`, `home/`, `*_cache/`, `local/`).

## Notes

- Hermes does not control git: the installer-side exclusions are not applied when the author runs `git add`/`git commit`. Create a `.gitignore` before the first commit (excluding `auth.json`, `.env`, `state.db*`, `memories/`, `sessions/`, `logs/`, `workspace/`, `home/`, caches, `local/`, `cron/*` except `!cron/jobs.json`, `skills/.*`, etc.). Commit only `cron/jobs.json` under `cron/`.
- The installer hard-excludes `auth.json`, `.env`, `memories/`, `sessions/`, `state.db*`, `logs/`, `workspace/`, `plans/`, `home/`, `*_cache/`, `local/`; no option overrides it. Credential stores (including `.ssh/`, `.aws/`, `.config/gh/`, etc.) are never shipped.
- Install flow: clone to temp, show manifest, check `env_requires` against shell and existing `.env`, confirm, copy owned files (`.git/` stripped), write `.env.EXAMPLE` (copy to `.env` and fill in), optionally create the alias wrapper. Reserved names `hermes`, `test`, `tmp`, `root`, `sudo` are rejected.
- Git ref pinning (`#v1.2.0`) is planned but not in the initial release; install tracks the default branch. Distributions are unsigned; shipped cron jobs install paused, while SOUL.md and skills are active immediately, so review before first run.
- Export file: without `-o`, written to the managed `profile-exports/` directory under the default Hermes home (never into a Git checkout; refuses with "No safe automatic export destination" if none is safe). The desktop app adds `desktop.json` (skin, light/dark mode, custom themes, rail color, window layout). The default profile is exported via an allow-list; a named profile copies the whole directory minus credentials and `home/`, so it can include `memories/`, `sessions/`, `USER.md`, `state.db`, and logs. Inspect with `tar -tzf research-bot.tar.gz | less` before sharing.
- Pick a distribution for a versioned agent others track; pick an export for a one-off handoff or moving machines.

## Related

- [profiles.md](./profiles.md)
- [desktop.md](./desktop.md)
