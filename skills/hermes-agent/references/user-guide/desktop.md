# Hermes Desktop

The native Hermes desktop app (Electron shell plus React chat surface) built around the same agent as the CLI and gateway: same config, API keys, sessions, skills, and memory. Runs on macOS (Apple Silicon), Windows, and Linux.

## Signature / Usage

```bash
hermes desktop
```

Launch flags:

| Flag | Description |
| --- | --- |
| `--skip-build` | Skip npm install/package and launch the existing unpacked app from `apps/desktop/release` |
| `--force-build` | Force a full rebuild even if the content stamp matches |
| `--build-only` | Build the desktop app but do not launch it (used by `hermes update`) |
| `--source` | Launch via `electron .` against `apps/desktop/dist` instead of the packaged app |
| `--cwd PATH` | Initial project directory for desktop chat sessions (sets `HERMES_DESKTOP_CWD`) |
| `--hermes-root PATH` | Override the Hermes source root the app uses (sets `HERMES_DESKTOP_HERMES_ROOT`) |
| `--ignore-existing` | Skip the installed Hermes runtime so no local backend starts; offer connect or install |
| `--fake-boot` | Enable deterministic boot delays for validating the startup UI |

## Options / Props

`config.yaml` keys read by the app:

| Key | Description |
| --- | --- |
| `desktop.repo_scan_enabled` / `repo_scan_roots` / `repo_scan_exclude_paths` | Control discovery of local Git repositories for the Projects sidebar (default: bounded scan of the home directory) |
| `desktop.font_family` / `terminal.font_family` | Chat font and embedded terminal font (per profile) |
| `desktop.electron_flags` | Extra Chromium switches applied at launch |
| `desktop.renderer_max_old_space_mb` | V8 heap ceiling for the chat renderer; `0` = Chromium default |
| `desktop.ozone_platform_hint` | `x11` runs the app under XWayland (restores always-on-top on some compositors) |
| `desktop.manage_launcher_entry` | `false` stops `hermes desktop` rewriting an existing Linux `.desktop` entry |
| `desktop.ssh_path` | Windows: explicit SSH client path |
| `desktop.macos_signing_identity` | macOS: certificate used to re-sign locally built apps |
| `display.show_reasoning` / `display.resume_last_session` | Reasoning Blocks and Reopen Last Chat on Launch settings |

```yaml
desktop:
  repo_scan_enabled: true
  repo_scan_roots: []
  repo_scan_exclude_paths: []
```

```yaml
desktop:
  electron_flags:
    - "--ozone-platform=x11"
    - "--js-flags=--expose-gc"
  renderer_max_old_space_mb: 2048
```

## Notes

- Interfaces sharing one agent: Desktop app, CLI (`hermes`) and TUI (`hermes --tui`), Web Dashboard (`hermes dashboard`). Sessions started in one resume in the others.
- Features: streaming chat with tool activity, right-hand preview rail, in-app browser **Annotate** comment mode, composer history and queue editing, conversation timeline rail, find in page (Cmd/Ctrl+F), status bar (per-session YOLO toggle, context-usage meter, optional cache hit rate and tokens/s), model picker in the composer (sticky UI state that never overwrites the profile default; default is set in Settings -> Model), file browser, Artifacts gallery, tabs / multiple windows / panes, Interface mode (Advanced default, Simple chat-first), minimize to tray, terminal pane (Ctrl+`), live Subagents frame (Steer / Stop), Git review pane (Cmd/Ctrl+G) and worktrees (Cmd/Ctrl+Shift+B), Memory Graph (`/journey`), Quick Entry (default Ctrl/Cmd+Shift+Space), voice, HUD mode (Cmd/Ctrl+Shift+H), command palette (Cmd/Ctrl+K or P), rebindable shortcuts (Cmd/Ctrl+/), UI language switcher, profile export/import.
- Settings: Providers pane (Applies to scope for profiles, Custom Endpoints with API Mode Auto-detect / Chat Completions / Responses API / Anthropic Messages, saved as `providers.<id>.api_mode`), Keep computer awake, per-task auxiliary reasoning effort, VS Code Marketplace themes. With two or more profiles an **Applies to** chip row selects which profile edits target.
- Bot Mode is built in and on by default (see bot-mode.md). Multi-gateway registry and `@profile-device` handles are in multi-connection-desktop.md.
- How it works: the app launches a headless `hermes serve` backend (JSON-RPC/WebSocket `tui_gateway` API); it never requires the web dashboard. Bundled apps use their included backend; otherwise resolution honours `HERMES_DESKTOP_HERMES_ROOT`, the development checkout, `HERMES_DESKTOP_HERMES`, then a managed install. Runtime lives in `HERMES_HOME` (`~/.hermes`, or `%LOCALAPPDATA%\hermes` on Windows).
- Remote backend: run `hermes serve --host 0.0.0.0 --port 9119` on the remote machine; non-loopback bind engages the auth gate. Prefer OAuth (Nous Portal) beyond a trusted network; username/password (`HERMES_DASHBOARD_BASIC_AUTH_USERNAME` / `_PASSWORD` / `_SECRET` in `~/.hermes/.env`) is for LAN/VPN only. In the app: Settings -> Gateways -> Remote gateway (URL, Sign in, Save and reconnect), or `HERMES_DESKTOP_REMOTE_URL`. Hermes Cloud sign-in is the alternative connection mode. Tokens are stored encrypted with the OS keyring.
- Updating: background check uses `GITHUB_TOKEN`, then `GH_TOKEN`, then `gh auth token`, then anonymous (60 requests/hour per network address). Update affordances update the connected backend, other eligible registered gateways (Hermes Cloud skipped), and the app last. Build output streams to the profile's `logs/update.log`.
- Uninstall (Settings -> About -> Danger zone): `hermes uninstall --gui` (GUI only), `hermes uninstall` (GUI + agent, keep data), `hermes uninstall --full`; preview with `hermes uninstall --gui --dry-run`. Hidden for Nix and other externally owned installs.
- Plugins: a desktop plugin is one ESM file at `$HERMES_HOME/desktop-plugins/<id>/plugin.js`, hot-reloaded; managed in Capabilities -> Plugins (Desktop column and Agent column). Plugins are not sandboxed; load only reviewed files.
- Troubleshooting: **Reconnect gateway** in the status bar gateway menu; boot logs in `HERMES_HOME/logs/desktop.log` (`hermes logs gui -f`); Linux Chromium errors in `desktop-chromium.log`; failed turns show an error card naming the failing layer with Retry / Switch provider / Open logs / Send diagnostics / Copy error details; SSH changed-host-key: `ssh-keygen -R <host>`; Electron download stuck: set `ELECTRON_MIRROR`; npm mirror keys go in `$HERMES_HOME/npmrc`; damaged Python deps: `hermes pm repair`; rebuild with `hermes desktop --build-only --force-build`.
- macOS permissions: grant Full Disk Access to the terminal and Hermes.app; for a stable certificate-anchored identity run `hermes desktop --setup-tcc-identity` (or `--identity <name>`); reset a stuck prompt with `tccutil reset <Service> com.nousresearch.hermes`.
- Building from source: `npm install` at repo root, then in `apps/desktop` `npm run dev`, `npm run dist:mac` / `dist:win` / `dist:linux`, `npm run pack`.

```bash
hermes logs gui -f
```
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/desktop (pinned to v0.22.2)

## Related

- [bot-mode.md](./bot-mode.md)
- [multi-connection-desktop.md](./multi-connection-desktop.md)
- [profiles.md](./profiles.md)
- [windows-native.md](./windows-native.md)
