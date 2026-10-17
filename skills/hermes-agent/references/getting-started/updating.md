# Updating & Uninstalling

Update Hermes Agent with the method matching the installation type, and uninstall it with `hermes uninstall`.

## Signature / Usage

```bash
hermes update                          # managed source checkout
hermes update --check                  # preview only
hermes update --plan                   # read-only fleet preview
hermes update --set-channel main       # follow every commit on main
hermes update --set-channel stable     # back to releases only
hermes update --channel main           # one run against main; nothing saved
hermes update --branch release-candidate
hermes update --backup                 # full pre-update backup
hermes update --no-backup              # skip pre-update backup
hermes update --keep-stash             # never re-apply stashed local edits
hermes update --no-gateway-restart     # skip gateway restart/fleet verification
hermes update --switch-branch          # override update_in_place for one run

hermes --version
hermes uninstall
```

## Update Method by Installation

| Installation | Update method |
|---|---|
| Managed source checkout | `hermes update`, or the source-built desktop's update handoff |
| Windows sideload MSIX | The desktop Update control and Windows App Installer |
| Microsoft Store package | Microsoft Store updates |
| macOS bundled app | The desktop Update control, through `electron-updater` |
| Docker image | Pull the chosen image and recreate the container with the same data mount |
| Nix | Update the flake/profile and rebuild |
| Termux APT | `pkg update`, then `pkg upgrade hermes-agent` |

## Options / Props

Config keys (in `~/.hermes/config.yaml`):

| Name | Type | Description |
|------|------|-------------|
| `updates.check` | bool (default `true`) | `hermes config set updates.check false` disables passive CLI update notices and checks; `hermes update` / `--check` still work |
| `updates.pre_update_backup` | `quick` / `full` / `off` | Pre-update backup mode. Default `quick`. Legacy `true` = `full`, `false` = `off` |
| `updates.non_interactive_local_changes` | `stash` / `discard` | What non-interactive updates do with stashed local source edits. Default `stash` |
| `updates.parked_branch_strategy` | `update_in_place` | Merge `origin/main` into a deliberately custom branch instead of switching away |
| `updates.auto_switch_parked_branch` | bool | `false` disables auto-switch off a parked feature branch |
| `agent.restart_after_turn_timeout` | seconds (default 30 min) | Cap on the drain-first gateway restart wait; `0` forces an immediate drain |
| `update.installs` | per-install | Stores the chosen update channel |

## What Happens During an Update

For an admitted source checkout, `hermes update` runs:

1. Pre-update snapshot (per-profile `state-snapshots/`; best-effort)
2. Code update (configured branch or stable release tag, plus submodules); gateways from this install are paused first on Linux/macOS
3. Post-pull syntax validation with auto-rollback to the pre-pull commit on failure
4. Dependency preparation through PM; incompatible plugins are added to `plugins.disabled` rather than failing the update
5. Config migration (new options prompted)
6. Desktop rebuild (stage-and-swap) if the Desktop app was built from this checkout
7. Gateway auto-restart (service-managed via systemd/launchd; manual gateways relaunched when mapped to a profile)
8. Multiplex migration for multi-profile installs when nothing blocks it

## Notes

- A source checkout of the official repository tracks the stable channel (latest published `vX.Y.Z` release, never draft, prerelease or canary). Forks and mirrors keep tracking `main`. `--set-channel stable` pins to the exact release commit even if older.
- `hermes update` does not rewrite package-owned application files. `hermes pm update` is a maintainer pin-update command, not an application updater. Image-managed (Docker), Nix- and apt-managed installs refuse (Docker via a provenance marker at `/etc/hermes/image-provenance.json`, exit code 2) and print the external update command, e.g. `docker pull nousresearch/hermes-agent:latest`.
- Stable and canary desktop bundles are separate applications (canary CLI command: `hermes-canary`). One-off commit bundles do not receive updates. Profiles, configuration and sessions are shared under the same Hermes home; newer builds can change stored data older builds cannot read, so back up first.
- Gateways are drained before restart: new turns are refused and in-flight work finishes, capped by `agent.restart_after_turn_timeout`. `hermes gateway status` lists what the draining gateway still holds.
- Every update writes a receipt to `~/.hermes/logs/update_receipts/` (last 20 kept, `latest.json` is the newest). `--plan` and the fleet check query running gateways over their local control socket.
- Manually launched `hermes serve` / `hermes dashboard` backends are not restarted by the updater; reminders are kept in `serve_restart_pending/` and the owner must relaunch them.
- Interactive updates stash local source edits and ask whether to restore them. Desktop updates run `hermes update --keep-stash` and never auto-restore; the log prints the `git stash apply <ref>` command.
- Local commits on `main` are reset to `origin/main` after saving the old HEAD as `refs/hermes-update-backups/diverged-main-<stamp>-<sha>`. Keep patches on a custom branch with `updates.parked_branch_strategy: update_in_place`.
- `hermes update` ignores `SIGHUP`, mirrors output to `~/.hermes/logs/update.log`, and honors Ctrl-C (exit 130) and SIGTERM. No `screen` / `tmux` wrapper is needed.
- Hermes runs only on Python 3.14. `pip install .` or Homebrew/PyPI builds on Python 3.11-3.13 install no dependencies and are unsupported. A launcher pointing at a pre-migration venv is repaired by `hermes update` (or `python -m pm.cli install` from the checkout).
- A code checkout alone is not a data rollback; newer releases can migrate config or databases in ways older code cannot read. Use a coherent pre-update backup. Do not run Git or pip inside a signed app or immutable image.
- Git 2.53+ partial-clone fetch crash (`should_include_obj should only be called on existing objects`): `hermes update` marks packs with `.promisor` and retries; do not remove `remote.origin.promisor` / `partialclonefilter`. Treeless checkouts from late-September-2026 installers are converted once to blobless by `hermes update` (`git fetch --refetch --filter=blob:none`).
- Post-update validation: `git status --short`, `hermes doctor`, `hermes --version`, `hermes gateway status`, `hermes pm status`.
- You can also update from a messaging platform (Telegram, Discord, Slack, WhatsApp, Teams) by sending `/update`; the bot is briefly offline (typically 5-15 seconds).
- Nix is best-effort only; update with `nix flake update hermes-agent` or `nix profile upgrade hermes-agent`, roll back with `nix profile rollback`.
- Uninstall: review `hermes uninstall --dry-run` for source installs. Default removal can preserve config and data; `--full` also removes data; `--data` removes user data without deleting package-owned code. These are destructive, so back up first (`hermes backup`; `hermes profile export` packs one profile without credentials). MSIX/Store use Windows Settings, macOS moves the app to Trash, and Docker / Nix / Termux use their own package manager.
- If you installed the gateway as a system service, stop it first: `hermes gateway stop` (Linux: `systemctl --user disable hermes-gateway`; macOS: `launchctl remove ai.hermes.gateway`). Manual uninstall: `rm -f ~/.local/bin/hermes`, `rm -rf /path/to/hermes-agent`, optionally `rm -rf ~/.hermes`.

## Related

- [Installation](./installation.md)
- [Platform Support](./platform-support.md)
- [Nix & NixOS Setup](./nix-setup.md)
- [Android / Termux](./termux.md)
