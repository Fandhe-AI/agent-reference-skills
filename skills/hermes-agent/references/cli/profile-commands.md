# Profile Commands Reference

All commands related to Hermes profiles: `hermes profile <subcommand>`, the global `-p` / `--profile` flag, and `hermes completion`.

## Signature / Usage

```bash
hermes profile <subcommand>
hermes -p <name> <command> [options]
hermes --profile <name> <command> [options]
```

Running `hermes profile` without a subcommand shows help.

| Subcommand | Description |
|------------|-------------|
| `list` | List all profiles (active one marked `*`). |
| `use <name>` | Set the active (default) profile; `default` returns to the base profile. |
| `create <name> [options]` | Create a new profile. |
| `describe [<name>] [options]` | Read or set a profile's description (used by the kanban orchestrator for routing). |
| `delete <name> [--yes\|-y]` | Delete a profile and its shell alias. |
| `show <name>` | Show home directory, model, gateway status, skills count, config file status. |
| `alias <name> [--remove] [--name <alias>]` | Regenerate the shell alias at `~/.local/bin/<name>` (`<name>.bat` on Windows). |
| `rename <old-name> <new-name>` | Rename a profile (directory and alias). |
| `migrate-identity <old-name> <new-name>` | Retry the session/routing identity migration of a completed rename. |
| `purge-identity <name>` | Retry the identity purge of a completed delete. |
| `export <name> [-o <path>]` | Export a profile to a tar.gz archive (default `<name>.tar.gz`). |
| `import <archive> [--name <name>]` | Import a profile from a tar.gz archive as a new profile. |
| `install <source> [--name <name>] [--alias] [--force] [--yes]` | Install a profile distribution from a git URL or local directory. |
| `update <name> [--force-config] [--yes]` | Re-pull a distribution-managed profile and re-apply its bundle. |
| `info <name>` | Show distribution metadata (origin URL, commit, last update). |

### Examples

```bash
hermes profile create work --clone
hermes profile create work2 --clone-from work
hermes profile describe researcher --text "Reads source code and writes findings."
hermes profile export work -o ./work-2026-03-29.tar.gz
hermes profile import ./work-2026-03-29.tar.gz --name work-restored
hermes profile install github.com/kyle/telemetry-distribution --alias
hermes -p work chat -q "Check the server status"
hermes completion zsh >> ~/.zshrc
```

Distribution manifest (`distribution.yaml` at repository root):

```yaml
name: telemetry
version: 0.1.0
description: "Compliance monitoring harness"
hermes_requires: ">=0.12.0"
author: "Your Name"
license: "MIT"
env_requires:
  - name: OPENAI_API_KEY
    description: "OpenAI API key"
    required: true
distribution_owned:   # optional
  - SOUL.md
  - skills/compliance/
  - cron/
```

## Options / Props

### `hermes profile create`

| Option | Description |
|--------|-------------|
| `<name>` | Valid directory name (alphanumeric, hyphens, underscores). |
| `--clone` | Copy `config.yaml`, `.env`, `SOUL.md`, skills, `memories/MEMORY.md` / `memories/USER.md`, and the active `memory.provider`'s own config. Sessions, `state.db` and cron jobs are not copied. |
| `--clone-all` | Copy everything (config, memories, skills, plugins) except sessions, `state.db`, backups, state-snapshots, checkpoints, and cron jobs. |
| `--clone-from <profile>` | Clone from a specific profile; implies `--clone` unless paired with `--clone-all`. |
| `--no-alias` | Skip wrapper script creation. |
| `--description "<text>"` | Description used by the kanban orchestrator; persisted in `<profile_dir>/profile.yaml`. |
| `--no-skills` | Empty profile with zero bundled skills; writes a `.no-bundled-skills` marker. Cannot combine with `--clone`, `--clone-from`, `--clone-all`. Toggle later with `hermes skills opt-out` / `opt-in`. |

### `hermes profile describe`

| Option | Description |
|--------|-------------|
| `<name>` | Profile to describe. Required unless `--all --auto` is used. |
| `--text "<text>"` | Set the description (overwrites). |
| `--auto` | Generate a description via the auxiliary LLM (`auxiliary.profile_describer`); marked `description_auto: true`. |
| `--overwrite` | With `--auto`, replace user-authored descriptions too. |
| `--all` | With `--auto`, sweep every profile missing a description. |

### `hermes profile install`

| Option | Description |
|--------|-------------|
| `<source>` | Git URL (`github.com/user/repo`, `https://...`, `git@...`, `ssh://`, `git://`) or local directory with `distribution.yaml` at its root. |
| `--name NAME` | Override the profile name from the manifest. |
| `--alias` | Also create a shell wrapper. |
| `--force` | Overwrite an existing profile of the same name (user data preserved). |
| `-y`, `--yes` | Skip the manifest-preview confirmation. |

## Notes

- `hermes profile delete` permanently deletes the profile directory (config, memories, sessions, skills). The `default` profile (`~/.hermes`) cannot be deleted; use `hermes uninstall`.
- Creating a profile does not set the terminal working directory; set `terminal.cwd` in that profile's `config.yaml`. `profile show` displays the Hermes home directory, not the terminal cwd.
- `export` always excludes `auth.json`, `.env` and other credential stores. A desktop export also stages `desktop.json` (theme, layout). `import` refuses to overwrite an existing profile and cannot import as `default`. Also available in chat as `/export` and `/import`.
- `rename` removes a gateway service installed under the old name; reinstall with `hermes -p <new-name> gateway install`. If the live gateway cannot migrate session identity, restart it and run `migrate-identity`. Likewise `purge-identity` retries a pending purge after `delete`; both are idempotent.
- Distributions: `auth.json` and `.env` are never part of a distribution; user data (memories, sessions, auth, `.env` edits) is preserved on install and update. `update` overwrites distribution-owned files (SOUL.md, mcp.json) and replaces shipped skills and cron jobs; `config.yaml` is preserved unless `--force-config`.
- `hermes_requires` supports `>=`, `<=`, `==`, `!=`, `>`, `<`, or a bare version (treated as `>=`). Default `distribution_owned`: SOUL.md, config.yaml, mcp.json, skills/, cron/, distribution.yaml.
- Private git repositories work with no extra configuration; install shells out to the normal `git` binary.
- `hermes completion <shell>` supports `bash`, `zsh`, `fish`, with completion for profile names and subcommands.
- Source: https://hermes-agent.nousresearch.com/docs/reference/profile-commands (v0.22.2).

## Related

- [CLI Commands Reference](./commands.md)
- [Slash Commands Reference](./slash-commands.md)
