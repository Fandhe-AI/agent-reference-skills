# CLI Internals

How `hermes_cli` is shaped: the transactional update pipeline, Nous free-tier sign-in, process-identity rules, the skin engine and profiles. Companion to `hermes_cli/AGENTS.md`.

## Signature / Usage

Update pipeline stages:

```text
plan → snapshot → apply → restart-per-kind → verify → report
```

Skin definition (built-in skins in `_BUILTIN_SKINS`, `hermes_cli/skin_engine.py`): a dict entry `{"name", "description", "colors", "spinner", "branding", "tool_prefix"}`. User skins live at `~/.hermes/skins/<name>.yaml`, activated with `/skin <name>` or `display.skin: <name>`.

## Options / Props

Skin keys:

| Element | Skin key | Used by |
|---|---|---|
| Banner panel border / title / section headers / dim / body | `colors.banner_border`, `banner_title`, `banner_accent`, `banner_dim`, `banner_text` | `banner.py` |
| Response box border | `colors.response_border` | `cli.py` |
| Spinner faces (waiting / thinking) | `spinner.waiting_faces`, `spinner.thinking_faces` | `display.py` |
| Spinner verbs / wings (optional) | `spinner.thinking_verbs`, `spinner.wings` | `display.py` |
| Tool output prefix / per-tool emojis | `tool_prefix`, `tool_emojis` | `display.py` -> `get_tool_emoji()` |
| Agent name / welcome / response label / prompt symbol | `branding.agent_name`, `welcome`, `response_label`, `prompt_symbol` | `banner.py`, `cli.py` |

Built-in skins: `default`, `ares`, `mono`, `slate`.

## Notes

- Plan (`update_inventory.py`, `hermes update --plan`): read-only inventory of install kind, profiles and live gateways. `git` updates in place; `docker` / `nix` / `apt` are not in-place-updatable and the updater reports the external command.
- Snapshot (`backup.py`): pre-update quick snapshot for every profile into its own `state-snapshots/`, identical file set, 1 GiB per-file cap, keep=1. Never add a partial/tiered snapshot set. Quick snapshots are file-loss recovery, not code rollback; `--backup` full mode owns rollback.
- Apply: git pull, or the Windows ZIP fallback which fires only when git itself failed, refuses a dirty working tree, and grafts live nested build outputs (`_ZIP_PRESERVED_NESTED`).
- Restart-per-kind: systemd / launchd restarts are fleet-wide within the updating install, drain-first (SIGUSR1), with per-unit failure isolation, bounded by HOME (`hermes_cli/update_fleet_scope.py`). The systemd blunt-restart fallback waits for `TimeoutStopUSec` + `TimeoutStartUSec` plus 15 s slack, with a 90 s fallback per phase.
- Verify: gateways stamp `code_sha` / `code_version` into `gateway_state.json`; the updater prints a fleet version matrix. After the commit point nothing fails `hermes update` (exit 0 unless code was rolled back); problems become receipt `followups` and keep their obligation armed. Exit 2 = refused/concurrent, exit 1 = nothing committed / rolled back.
- Report: machine-readable receipt in the ROOT home's `logs/update_receipts/` (`latest.json`), written as `outcome: "running"` from the start. Completion runs via `update_completion.run_completion` / `_update_takeover.py`; never run pulled code in the pre-pull interpreter. `hermes_cli/update_handoff.py` and `hermes_cli/update_serve_obligations.py` are a frozen compat surface (`tests/compat/old_updater_surface.json`).
- Nous free-tier sign-in: `anon_auth.run_sign_in()` yields `SignInState`s (`Code`, `Waiting`, `Completed`, `Declined`, `Superseded`, `TimedOut`, `Retired`, `Failed`, `AlreadySignedIn`, `Unavailable`); `settle_after_upgrade` runs exactly once per completion; `upgrade_guest` (`hermes auth upgrade`), CLI `/login` and the desktop poller are renderers over it.
- Process identity: never infer from argv substrings. Use `gateway.status.looks_like_gateway_command_line` and `hermes_cli.update_cmd._hermes_holder_subcommand`; derive flag sets from the parser (`_holder_value_flags()`); never blanket-exclude gateway ancestors; match full cmdlines. A gateway-owned control socket (#92091) is replacing scans.
- Profiles: `_apply_profile_override()` in `hermes_cli/main.py` sets `HERMES_HOME` before any imports for `hermes -p x <cmd>`. Profile operations are HOME-anchored (`_get_profiles_root()` returns `Path.home() / ".hermes" / "profiles"`) so `hermes -p coder profile list` sees all profiles.

## Related

- [Gateway Internals](./gateway-internals.md)
- [Multiplexing Gateway Internals](./multiplexing-gateway.md)
- [Session Storage](./session-storage.md)
