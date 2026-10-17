# Profiles

A profile is a separate Hermes home directory with its own `config.yaml`, `.env`, `SOUL.md`, memories, sessions, skills, cron jobs, and state database. Creating a profile also creates a command alias of the same name (`coder chat`, `coder setup`, `coder gateway start`).

## Signature / Usage

```bash
hermes profile create coder       # creates profile + "coder" command alias
coder setup                       # configure API keys and model
coder chat                        # start chatting
```

Targeting a profile:

```bash
hermes -p coder chat
hermes --profile=coder doctor
hermes chat -p coder -q "hello"    # works in any position
hermes profile use coder           # sticky default
hermes profile use default         # switch back
```

## Options / Props

`hermes profile create <name>` flags:

| Flag | Description |
|------|-------------|
| (none) | Blank profile with bundled skills seeded |
| `--description "<role>"` | Role text used by the kanban orchestrator for routing (`hermes profile describe` sets it later) |
| `--clone` | Copy `config.yaml`, `.env`, `SOUL.md`, skills, `memories/MEMORY.md` and `memories/USER.md`, external memory-provider config, and `plugins/`; sessions, `state.db`, and cron start empty |
| `--clone-from <source>` | Select the source profile; implies `--clone` |
| `--clone-all` | Copy everything except per-profile history (sessions, `state.db`, `backups/`, `state-snapshots/`, `checkpoints/`) and cron jobs |
| `--clone-channels` | Keep the source's messaging channels (bot tokens, allowlists, platform config); refused when a running multiplexed gateway already serves the source |
| `--sync-imports` | Carry `import-sync.json` so `hermes -p <name> import-agent --sync` keeps pulling from the same external trees |

Management commands:

```bash
hermes profile list
hermes profile show coder
hermes profile rename coder dev-bot
hermes profile migrate-identity coder dev-bot
hermes profile purge-identity dev-bot
hermes profile export coder
hermes profile import coder.tar.gz
hermes profile delete coder [--yes]
```

Pin a project directory (a profile is not a workspace or sandbox):

```yaml
terminal:
  backend: local
  cwd: /absolute/path/to/project
```

## Notes

- A directory under `~/.hermes/profiles/` counts as a profile only if it holds one of `config.yaml`, `.env`, `SOUL.md`, `profile.yaml`, `auth.json`, `state.db`. Never point two agent processes at the same Hermes home; use an external memory provider for shared memory.
- Terms: profile (persistent home), agent (running assistant), Bot Mode bot (a profile shown in the desktop roster), messaging bot (platform account), subagent (child from `delegate_task`).
- Messaging channels (bot tokens, allowlists, `platforms:` sections, `gateway.multiplex_profiles` / `profile_routes`, pairing state) are never cloned unless `--clone-channels`; credentials shared with non-channel capabilities (`HASS_*`, `TWILIO_*`, `EMAIL_*`) are stripped only when the source's gateway would run that adapter.
- OAuth logins for Anthropic, OpenAI Codex, and xAI use single-use refresh tokens and are not copied; the clone reads the root `~/.hermes/auth.json`. Give a profile its own login with `hermes -p <name> auth add <provider>`. Static API keys are copied.
- Profiles do not sandbox the agent. `cwd: "."` on the local backend means the launch directory, not the profile directory. `SOUL.md` changes apply to new sessions.
- By default in v0.22.2 one host gateway process multiplexes every profile (`gateway.multiplex_profiles` defaults to true); named-profile `gateway install` / `start` refuses with exit 78 and attaches to the host. Per-profile gateway processes are the pre-multiplex layout (see multi-profile-gateways.md migration notes).
- Source note: the v0.22.2 profiles page still says each profile runs its own gateway process; this conflicts with the multi-profile-gateways page, which is followed here.
- Where a per-profile gateway does run, the same bot token on two profiles is blocked (Telegram, Discord, Slack, WhatsApp, Signal), with per-profile service names such as `hermes-gateway-coder`. Inside the official Docker image, per-profile gateways are s6-supervised.
- The default profile is `~/.hermes` itself; its ID is always `default`. `hermes profile rename default <name>` sets only a display name (`display_name` in `~/.hermes/profile.yaml`). The default profile cannot be deleted; use `hermes uninstall`. If the sticky profile's directory is deleted by hand, ordinary commands refuse until `hermes profile use default`.
- `HERMES_HOME` is the profile boundary; `HOME` stays the real user home on host installs. `terminal.home_mode: profile` runs tool subprocesses with `HOME={HERMES_HOME}/home`; `HERMES_REAL_HOME` exposes the actual home.
- `hermes update` pulls code once and syncs bundled skills to all profiles; user-modified skills are never overwritten. Shell completion: `eval "$(hermes completion bash)"` or `zsh`.
- Sharing: export file (`/export`, `/import`) or git distribution (`hermes profile install` / `update`). PM state (`installs/`, `tools/`, `cache/`) is excluded from export/import/distribution.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/profiles (pinned to v0.22.2)

## Related

- [profile-distributions.md](./profile-distributions.md)
- [multi-profile-gateways.md](./multi-profile-gateways.md)
- [bot-mode.md](./bot-mode.md)
- [import-from-other-agents.md](./import-from-other-agents.md)
