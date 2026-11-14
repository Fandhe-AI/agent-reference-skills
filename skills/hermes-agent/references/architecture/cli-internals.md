# CLI Internals

How `hermes_cli` is shaped: the transactional update pipeline, Nous sign-in and guest handoff, process-identity rules, the skin engine and profiles. Companion to `hermes_cli/AGENTS.md`.

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

- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/cli-internals (pinned to v0.23.1)
- Plan (`update_inventory.py`, `hermes update --plan`): read-only inventory of install kind, profiles and live gateways. `git` updates in place; `docker` / `nix` / `apt` are not in-place-updatable and the updater reports the external command.
- Snapshot (`backup.py`): pre-update quick snapshot for every profile into its own `state-snapshots/`, identical file set, 1 GiB per-file cap, keep=1. Never add a partial/tiered snapshot set. Quick snapshots are file-loss recovery, not code rollback; `--backup` full mode owns rollback.
- Apply: git pull, or the Windows ZIP fallback which fires only when git itself failed, refuses a dirty working tree, and grafts live nested build outputs (`_ZIP_PRESERVED_NESTED`).
- Restart-per-kind: systemd / launchd restarts are fleet-wide within the updating install, drain-first (SIGUSR1), with per-unit failure isolation, bounded by HOME (`hermes_cli/update_fleet_scope.py`). The systemd blunt-restart fallback waits for `TimeoutStopUSec` + `TimeoutStartUSec` plus 15 s slack, with a 90 s fallback per phase.
- Verify: gateways stamp `code_sha` / `code_version` into `gateway_state.json`; the updater prints a fleet version matrix. After the commit point nothing fails `hermes update` (exit 0 unless code was rolled back); problems become receipt `followups` and keep their obligation armed. Exit 2 = refused/concurrent, exit 1 = nothing committed / rolled back.
- Report: machine-readable receipt in the ROOT home's `logs/update_receipts/` (`latest.json`), written as `outcome: "running"` from the start. Completion runs via `update_completion.run_completion` / `_update_takeover.py`; never run pulled code in the pre-pull interpreter. `hermes_cli/update_handoff.py` and `hermes_cli/update_serve_obligations.py` are a frozen compat surface (`tests/compat/old_updater_surface.json`).
- Nous sign-in: every sign-in is the plain device-code login. `anon_auth.run_sign_in()` yields `SignInState`s (`Code`, `Waiting`, `Completed`, `Cancelled`, `TimedOut`, `Failed`, `AlreadySignedIn`); it requests a device code, polls the token endpoint on one deadline (expired code = `TimedOut`), saves the account, runs `settle_after_upgrade` exactly once, and turns persist/settle failures into `Failed`; works with or without a free tier on disk. `Completed.email` comes from the access token's `email` claim; `Completed.handoff` carries the guest handoff result lines and `Completed.handoff_status` the latest record (`guest_handoff.wire_status`). `cancelled()` is checked at least once a second in the token poll and before the save; a cancel always wins and nothing is saved. TLS verification comes from `_resolve_verify` (`HERMES_CA_BUNDLE` applies). `replace_account=True` lets a signed-in install sign in again; otherwise `AlreadySignedIn` before any network. Renderers: `upgrade_guest` (`hermes auth upgrade`), CLI / TUI / gateway `/login`, the desktop start route; `hermes model` and `hermes auth add nous` keep `_login_nous` (`--portal-url`, `--ca-bundle`, `--insecure`, shared-store import). Every sign-in that saves an account calls `settle_after_upgrade` itself once its locks are released; the handoff runner never settles. Shared flow/copy in `anon_sign_in.py`, CLI rendering in `anon_sign_in_cli.py`, identity and settlement in `anon_auth.py`.
- Guest handoff (`hermes_cli/guest_handoff.py`): when a Nous account is saved over a free-tier identity, the identity's connected apps are handed to the account via `POST /api/anonymous/claim {"token": "<anon_...>"}` with the account's Bearer token; no prompt, the result is shown afterwards (`hermes auth status nous`; desktop via the sign-in poll's `handoff_status` and the `GET /api/providers/oauth/nous/handoff?since=&wait=` long-poll). `note_replacement` runs at the lowest write seams (`auth._store_provider_state`, `auth_nous._write_shared_nous_state`) under the caller's auth-store locks and only writes a pending record in `guest_handoff.json` beside the shared Nous store, keyed by a hash of the `anon_` credential. A token refresh (`renewal=True`) never replaces another identity. `drain` makes one attempt per due record of this profile and runs only outside the auth-store locks (after every sign-in save, free-tier reconcile, `hermes auth status`, `hermes auth upgrade`); a retry worker started by `start_nous_auth_keepalive` finishes transient failures; attempts are counted and the record leased (~30 s) in one locked write before the request. Answers: `claimed` (records what moved), `unknown_token` (Gone; "probably moved" after an earlier attempt), `already_retired` (Gone); final only for `client_not_allowed`, `account_locked`, `invalid_request`; everything else retries after 1 min, 10 min, 1 h, 6 h (Retry-After honoured), then Failed. A Claimed record is never reopened; user copy never shows a server code (app slugs via `tools.tool_labels.app_title`).
- Process identity: never infer from argv substrings. Use `gateway.status.looks_like_gateway_command_line` and `hermes_cli.update_cmd._hermes_holder_subcommand`; derive flag sets from the parser (`_holder_value_flags()`); never blanket-exclude gateway ancestors; match full cmdlines. A gateway-owned control socket (#92091) is replacing scans.
- Profiles: `_apply_profile_override()` in `hermes_cli/main.py` sets `HERMES_HOME` before any imports for `hermes -p x <cmd>`. Profile operations are HOME-anchored (`_get_profiles_root()` returns `Path.home() / ".hermes" / "profiles"`) so `hermes -p coder profile list` sees all profiles.

### Migration (v0.22 -> v0.23)

- `SignInState` lost `Declined`, `Superseded`, `Retired` and `Unavailable` (now `Code`, `Waiting`, `Completed`, `Cancelled`, `TimedOut`, `Failed`, `AlreadySignedIn`); `anon_auth.py` no longer owns promotion polling, and `cancel_wins_after_promotion` / the desktop `_nous_plain_poller` special case are gone (a cancel always wins; every sign-in is the plain device login).

## Related

- [Gateway Internals](./gateway-internals.md)
- [Multiplexing Gateway Internals](./multiplexing-gateway.md)
- [Session Storage](./session-storage.md)
