# Hermes Desktop

The native Hermes desktop app (Electron shell plus React chat surface) built around the same agent as the CLI and gateway: same config, API keys, sessions, skills, and memory. Runs on macOS (Apple Silicon), Windows, and Linux.

## Signature / Usage

```bash
hermes desktop
```

Launch flags:

| Flag | Description |
| --- | --- |
| `--skip-build` | Skip pnpm install/package and launch the existing unpacked app from `apps/desktop/release` |
| `--force-build` | Force a full rebuild even if the content stamp matches |
| `--build-only` | Build the desktop app but do not launch it (used by `hermes update`) |
| `--source` | Launch via `electron .` against `apps/desktop/dist` instead of the packaged app |
| `--cwd PATH` | Initial project directory for desktop chat sessions (sets `HERMES_DESKTOP_CWD`) |
| `--hermes-root PATH` | Override the Hermes source root the app uses (sets `HERMES_DESKTOP_HERMES_ROOT`) |
| `--ignore-existing` | Skip the installed Hermes runtime so no local backend starts; offer connect or install |
| `--fake-boot` | Enable deterministic boot delays for validating the startup UI |
| `--install-apparmor-profile` | Linux (Ubuntu 23.10+): opt-in AppArmor profile under `/etc/apparmor.d/` (sudo) granting user namespaces to this app's path; alternative to the setuid `chrome-sandbox` helper |

Webapp (the Desktop workspace served to a normal browser by the gateway; not the Web Dashboard):

```bash
hermes config set webapp.enabled true
hermes gateway restart
hermes webapp
```

| Command / key | Description |
| --- | --- |
| `hermes webapp` | Builds the bundle if out of date, starts the gateway if not running, opens a one-use sign-in link (works once, within 60 s); served at `http://127.0.0.1:9120` by default |
| `hermes webapp --no-open` | Print the one-use link instead of opening a browser (SSH, BSDs / illumos, WSL print it automatically) |
| `hermes webapp --status` | Whether the gateway serves the Webapp and, if not, why |
| `hermes webapp --sign-out` | Sign out every tab at once (also every browser signed in with a dashboard account behind the sign-in gate) |
| `hermes webapp --build-only` / `--force-build` | Build the bundle (installs its npm dependencies even with lazy installs disabled) |
| `hermes -p <profile> webapp` | Open the Webapp on a named profile |
| `webapp.enabled` / `webapp.host` / `webapp.port` / `webapp.public_url` | Enable, bind host (`0.0.0.0` requires the dashboard sign-in gate), port (default 9120), and HTTPS address behind a same-machine proxy or tunnel (requires sign-in) |
| `hermes sessions adopt` | Adopt chats written before the gateway owned sessions so the browser can continue them |

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
- How it works: the React renderer talks to the profile's gateway. On first use of a local profile the app runs `hermes gateway ensure`, which attaches to the gateway serving that profile or starts it (an installed systemd/launchd service where one exists, otherwise a detached daemon; `ensure` never installs a service). One gateway per host serves every profile unless a profile is marked `gateway.standalone: true`; Desktop dials `/api/ws` with one-use tickets, the same process `hermes chat`, the TUI and messaging use. The gateway keeps running after you quit and has no idle shutdown (`hermes gateway stop` or the Settings gateway controls stop it). The app needs no separate `hermes serve` process and never requires the web dashboard. Bundled apps use their included backend; otherwise resolution honours `HERMES_DESKTOP_HERMES_ROOT`, the development checkout, `HERMES_DESKTOP_HERMES`, then a managed install. Runtime lives in `HERMES_HOME` (`~/.hermes`, or `%LOCALAPPDATA%\hermes` on Windows).
- Remote backend: run `hermes serve --host 0.0.0.0 --port 9119` on the remote machine; non-loopback bind engages the auth gate. Prefer OAuth (Nous Portal) beyond a trusted network; username/password (`HERMES_DASHBOARD_BASIC_AUTH_USERNAME` / `_PASSWORD` / `_SECRET` in `~/.hermes/.env`) is for LAN/VPN only. In the app: Settings -> Gateways -> Remote gateway (URL, Sign in, Save and reconnect), or `HERMES_DESKTOP_REMOTE_URL`. Hermes Cloud sign-in is the alternative connection mode. Token storage: the v0.23.1 page says the saved-connection list and its credentials live in the Hermes home (`gateway-connections.json` and `gateway-connection-tokens.json`), owner-only (0600), secrets as plain text, shared by the native app and the Webapp, and the OS keychain option does not apply to them (v0.22.2 said tokens were stored encrypted with the OS keyring).
- Updating: background check uses `GITHUB_TOKEN`, then `GH_TOKEN`, then `gh auth token`, then anonymous (60 requests/hour per network address). Update affordances update the connected backend, other eligible registered gateways (Hermes Cloud skipped), and the app last. Build output streams to the profile's `logs/update.log`.
- Uninstall (Settings -> About -> Danger zone): `hermes uninstall --gui` (GUI only), `hermes uninstall` (GUI + agent, keep data), `hermes uninstall --full`; preview with `hermes uninstall --gui --dry-run`. Hidden for Nix and other externally owned installs.
- Plugins: a desktop plugin is one ESM file at `$HERMES_HOME/desktop-plugins/<id>/plugin.js`, hot-reloaded; managed in Capabilities -> Plugins (Desktop column and Agent column). Plugins are not sandboxed; load only reviewed files.
- Troubleshooting: **Reconnect gateway** in the status bar gateway menu; boot logs in `HERMES_HOME/logs/desktop.log` (`hermes logs gui -f`); Linux Chromium errors in `desktop-chromium.log`; failed turns show an error card naming the failing layer with Retry / Switch provider / Open logs / Send diagnostics / Copy error details; SSH changed-host-key: `ssh-keygen -R <host>`; Electron download stuck: set `ELECTRON_MIRROR`; npm mirror keys go in `$HERMES_HOME/npmrc`; damaged Python deps: `hermes pm repair`; rebuild with `hermes desktop --build-only --force-build`.
- macOS permissions: grant Full Disk Access to the terminal and Hermes.app; for a stable certificate-anchored identity run `hermes desktop --setup-tcc-identity` (or `--identity <name>`); reset a stuck prompt with `tccutil reset <Service> com.nousresearch.hermes`.
- Building from source: `pnpm install` at repo root, then in `apps/desktop` `pnpm run dev`, `pnpm run dist:mac` / `dist:win` / `dist:linux`, `pnpm run pack`. On Windows x64 the first `pnpm run dev` fetches `get-windows`' native binding (retry next time if it fails or takes over two minutes; mirror/proxy only from the environment `npm_config_node_get_windows_binary_host_mirror`, `HTTP_PROXY` or `npm_config_proxy`, not `.npmrc`). The `$HERMES_HOME/npmrc` file is applied to every updater dependency install and build as `NPM_CONFIG_USERCONFIG` (pnpm reads registry and auth from it); credentials, scoped keys, `otp`, `key`, `cert` are never handed to install scripts; when present it replaces `~/.npmrc` for those builds (not merged).
- Webapp: sign-in link is one-use within 60 s; a fresh tab or bare URL shows instructions. A signed-in Webapp user can run arbitrary commands as the OS account running Hermes, so never expose it without a sign-in provider (prefer SSH tunnel / Tailscale / VPN). Plain HTTP on a non-loopback address disables the bot screen viewer, microphone, clipboard reads and notifications. Limits: 16 MiB per staged file; Save Image 25 MiB / 30 s. Terminal rail: detached shells kept 15 minutes, up to 16 host terminals, 1 MiB output replay; SSH gateway terminals run a login shell over the SSH transport. Settings -> Gateways in the Webapp shares the native app's saved-connection list (`gateway-connections.json`). **Settings -> Web Access** (native app, local connection only) turns the Webapp on for other devices behind Nous sign-in (**Start** builds, registers the sign-in address, saves `webapp:` settings and restarts the gateway). Webapp also loads host desktop plugins from `desktop-plugins/` and supports Install (refuses plugin folders with symlinks or larger than 64 MB).
- Display preferences (theme, density, sidebar, status-bar, sounds, keybinds, saved layouts, model-picker favourites, seen tips) live once per computer in `ui-preferences.json` in the root Hermes home, shared by the native app and every Webapp browser; credentials, sign-ins, drafts and per-window state are never written to it.
- Other 0.23 behavior: the composer queue lives on the gateway and survives restarts; a turn lost mid-restart shows **Turn lost during restart** with **Discard** (CLI `/discard <admission_id>`); **Restore image draft** restores an unacknowledged image message; Settings -> Model -> Main model needs **Apply**, and **Settings -> Model -> Subagents** sets a delegated agent's provider, model, turn limit, concurrency, timeout and reasoning effort (**Inherit from main agent**, **Custom model (use parent credentials)**, **Direct endpoint override**); each terminal tab runs on the gateway it was opened on (**This device** or an SSH gateway). On Ubuntu 23.10+ `hermes desktop` uses Chromium's setuid `chrome-sandbox` helper (recommended, asks `sudo` after each rebuild); if that fails it starts with `--no-sandbox`. `--install-apparmor-profile` grants user namespaces to the app path, which is roughly equivalent to disabling the restriction for your account when the path is user-writable.
- Saved connections are imported once (including the Webapp's shared list); old user-data files are never read again, so a removed connection stays removed.

```bash
hermes logs gui -f
```
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/desktop (pinned to v0.23.1)

### Migration (v0.22 -> v0.23)

- Migration (v0.22 -> v0.23): Desktop no longer launches a private `hermes serve` backend per app; it attaches to the host gateway through `hermes gateway ensure` (v0.22.2: headless `hermes serve`, with fallback to `dashboard --no-open` for older runtimes). The desktop build and dev commands move from `npm` to `pnpm`.
- Migration (v0.22 -> v0.23): saved gateway tokens are no longer described as OS-keyring encrypted; they are plain-text owner-only files in the Hermes home.

## Related

- [bot-mode.md](./bot-mode.md)
- [multi-connection-desktop.md](./multi-connection-desktop.md)
- [profiles.md](./profiles.md)
- [windows-native.md](./windows-native.md)
