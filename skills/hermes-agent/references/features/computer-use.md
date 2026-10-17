# Computer Use

Hermes can drive the desktop (click, type, scroll, drag) in the background on macOS, Windows and Linux without moving your cursor or changing focus. The built-in `computer_use` toolset speaks MCP over stdio to the open-source `cua-driver`, and works with any tool-capable model.

## Signature / Usage

```bash
hermes computer-use install     # ask PM to prepare the pinned cua-driver
hermes computer-use status      # resolved binary path and version
hermes computer-use doctor      # per-check health matrix
hermes -t computer_use chat     # start a session with the toolset
```

```text
computer_use(action="capture", mode="som", app="Mail")
computer_use(action="click", element=14)
computer_use(action="type", text="from:stripe")
computer_use(action="key", keys="return", capture_after=True)
```

## Platform stack

| Platform | Accessibility tree | Input dispatch |
|---|---|---|
| macOS | AX (private SkyLight SPIs) | `SLPSPostEventRecordTo`, pid-scoped, no cursor warp |
| Windows | UIAutomation | `SendInput` + `PostMessage`, no focus steal |
| Linux | AT-SPI (X11 + Wayland) | XTest (X11) / virtual-keyboard (Wayland) |

| Platform | Prerequisites |
|---|---|
| macOS | Accessibility + Screen Recording for the identity named by `hermes computer-use doctor` (CuaDriver, `com.trycua.driver`) |
| Windows | None at install; over SSH use the autostart pattern (Session 0 has no interactive desktop) |
| Linux | `DISPLAY` for X11 or `XDG_SESSION_TYPE=wayland`; Wayland needs an XWayland bridge for capture; AT-SPI on |

```yaml
computer_use:
  permission_mode: standard        # standard (default) | bounded
  capability_manifest: ""          # path, required for bounded
  native_wayland: true             # Linux opt-in; only passed when WAYLAND_DISPLAY is set
  autostart: false                 # Windows Scheduled Task cua-driver-serve; default on-demand
  no_overlay: false                # force the overlay cursor on (false) or off (true)
  allow_unsigned_driver: true      # local driver development only
  cua_telemetry: false             # Hermes sets CUA_DRIVER_RS_TELEMETRY_ENABLED=0 unless true
  backend: cua                     # active provider (cua default, or a provider plugin)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `computer_use.permission_mode` | string | `standard` | `standard` or `bounded` |
| `computer_use.capability_manifest` | string | `""` | Path, required for `bounded` |
| `computer_use.native_wayland` | boolean | `true` | Linux opt-in; only passed when `WAYLAND_DISPLAY` is set |
| `computer_use.autostart` | boolean | `false` | Windows Scheduled Task `cua-driver-serve`; default on-demand |
| `computer_use.no_overlay` | boolean | `false` | Force the overlay cursor on (`false`) or off (`true`) |
| `computer_use.allow_unsigned_driver` | boolean | `true` | Local driver development only |
| `computer_use.cua_telemetry` | boolean | `false` | Hermes sets `CUA_DRIVER_RS_TELEMETRY_ENABLED=0` unless `true` |
| `computer_use.backend` | string | `cua` | Active provider (`cua` default, or a provider plugin) |

| Env var | Purpose |
|---|---|
| `HERMES_CUA_DRIVER_CMD` | Path to a cua-driver binary (tests, CI, local builds) |

| Hermes session | cua-driver mode |
|---|---|
| Manual or smart approvals (default) | `standard` |
| `computer_use.permission_mode: bounded` + reviewed manifest | private `bounded` daemon |
| `--yolo`, `/yolo`, or `approvals.mode: off` | private `unrestricted` daemon |

`hermes computer-use doctor` exit codes: 0 = ok, 1 = degraded or failed, 2 = cua-driver binary not reachable. Flags: `--include CHECK`, `--skip CHECK`, `--json`.

## Notes

- Acts on the machine the bot's screen lives on (gateway host with `terminal.backend: local`; inside the sandbox for `docker` / `ssh` / `singularity`). `modal`, `daytona`, `vercel_sandbox` refuse unless `bot_desktop.placement: gateway`.
- cua-driver is a default PM package (`pm/lock.json`); skip with `--skip-computer-use` / `-SkipComputerUse` or `hermes pm install --without cua-driver`.
- Browser work, including signed-in profiles, goes through the `browser` toolset (`browser_exec`). `computer_use.grant_existing_profile` was removed; a leftover key is ignored.
- `smart` approval stays `standard`. YOLO/unrestricted mode does not protect against prompt injection; use only in a disposable VM.
- Destructive actions (click, type, drag, scroll, key, focus_app) go through the approval gate; grants are keyed `cua:<action>:<background|foreground>`. Unattended runs (cron, single-query, headless) are refused rather than auto-approved. Hard-blocked key combos (empty trash, force delete, lock screen, log out) and type patterns (`curl | bash`, `sudo rm -rf /`, fork bombs).
- SOM element indices are valid only until the next `capture`; wrapper `element_token`s detect stale indices.
- Token efficiency: oldest screenshots replaced with `[screenshot removed to save context]` at the per-request image limit (20 images or 24 MB); each image counted at ~1500 tokens.
- Text-only models work degraded with `mode="ax"`.
- Windows: elevated (admin) windows cannot be driven from a normal-integrity agent (UIPI); a cua-driver under `C:\Program Files\WindowsApps` may fail `doctor` with "Access is denied" (set `HERMES_CUA_DRIVER_CMD`).
- macOS stale grants: `tccutil reset Accessibility com.trycua.driver`, `tccutil reset ScreenCapture com.trycua.driver`, then `hermes computer-use permissions grant`.
- The overlay cursor is cosmetic and disabled automatically on macOS, headless Linux / WSL2 / containers, and Linux X11; Wayland and Windows keep it.
- `cua-driver skills install` installs Cua's skill pack (`SKILL.md`, `MACOS.md`, `WINDOWS.md`, `LINUX.md`, `RECORDING.md`, `WEB_APPS.md`, `TESTS.md`); Hermes autodetection is a planned follow-up.
- On attachment-capable surfaces you can ask for a screenshot; the last 20 captures are kept and never sent automatically.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/computer-use (pinned to v0.22.2)

## Related

- [Bot Screen](./bot-screen.md)
- [Browser](./browser.md)
- [Credential Vault](./credential-vault.md)
