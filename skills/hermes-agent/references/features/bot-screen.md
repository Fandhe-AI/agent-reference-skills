# Bot Screen

On a headless Linux gateway host each bot gets its own Xfce desktop that its `computer_use` and headed browser act on, streamed live into Hermes Desktop. You can take over (login, 2FA, CAPTCHA, payment) and hand control back.

## Signature / Usage

```bash
hermes computer-use screen status          # installed? running? who holds control?
hermes computer-use screen start           # start this profile's screen
hermes computer-use screen stop            # stop it; refuses while a human holds control
hermes computer-use screen stop --force    # ...unless you say so (also frees a stuck lease)
hermes computer-use screen install [-y]    # apt/dnf/pacman the packages
hermes -p research computer-use screen start   # another bot's screen
```

```yaml
bot_desktop:
  geometry: "1440x900"      # screen size; the viewer scales to fit the pane
  auto_start: false         # set true to start on the first computer_use call or headed browser use
  min_free_memory_mb: 1536  # refuse to start below this much free memory (0 = never check)
  idle_stop_minutes: 30     # stop a screen nobody used for this long (0 = keep it up)
  placement: auto           # auto | terminal | gateway
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `bot_desktop.geometry` | string | `"1440x900"` | Screen size; the viewer scales to fit the pane |
| `bot_desktop.auto_start` | boolean | `false` | Set `true` to start on the first `computer_use` call or headed browser use |
| `bot_desktop.min_free_memory_mb` | number | `1536` | Refuse to start below this much free memory (`0` = never check) |
| `bot_desktop.idle_stop_minutes` | number | `30` | Stop a screen nobody used for this long (`0` = keep it up) |
| `bot_desktop.placement` | string | `auto` | `auto`, `terminal` or `gateway` |

| `terminal.backend` | `placement: auto` | Meaning |
|---|---|---|
| `local` | gateway host | Terminal, screen, browser and `computer_use` share the gateway machine |
| `docker`, `ssh`, `singularity` (plugin) | inside the sandbox | Xvnc + Xfce, Chromium and cua-driver run in the container / SSH host |
| A plugin backend that declares `supports_streams` | inside the sandbox | Same, through the plugin's own exec channel |
| `modal`, `daytona`, `vercel_sandbox`, other plugin backends | refused | These backends cannot host a display yet; use `placement: gateway` |

`placement: gateway` forces the screen onto the gateway host; `placement: terminal` forces the sandbox and errors when it cannot host one.

## Requirements

| Distro | Packages |
|---|---|
| Debian / Ubuntu | `tigervnc-standalone-server xfce4-panel xfwm4 xfdesktop4 xfce4-settings xfce4-terminal dbus-x11 x11-xserver-utils x11-utils xauth fonts-dejavu-core` |
| Fedora | `tigervnc-x11-server xfce4-panel xfwm4 xfdesktop xfce4-settings xfce4-terminal dbus-daemon xsetroot xset xdpyinfo xprop xorg-x11-xauth setxkbmap dejavu-sans-fonts` |
| Arch | `tigervnc xfce4-panel xfwm4 xfdesktop xfce4-settings xfce4-terminal xorg-xsetroot xorg-xset xorg-xdpyinfo xorg-xprop xorg-xauth xorg-setxkbmap ttf-dejavu` |

- Gateway host runs Linux (macOS and Windows hosts already have a real display; the pane is not offered).
- Computer Use enabled for the bot (cua-driver installed).
- Plan on about 1.1-1.5 GB per open screen with a browser (gateway idle ~300 MB, Xvnc + Xfce ~220 MB, headed Chromium 0.5-1 GB).
- Container image: CI publishes `:latest` / `:v*` without the packages and `-desktop` tags (`:latest-desktop`, `:v*-desktop`) with them. Custom build: `docker build --build-arg HERMES_BOT_DESKTOP=1 -t hermes-agent:screen .`
- Sandbox default image: `nousresearch/hermes-sandbox:desktop`.

```yaml
terminal:
  backend: docker
  docker_image: nousresearch/hermes-sandbox:desktop
```

## Notes

- The screen is off by default. Start it from the pane (**Start screen**), `hermes computer-use screen start`, or `bot_desktop.auto_start: true`.
- While a human holds control, the bot's `computer_use` and browser tools are refused with `human_has_control`. This is a tool-level fence, not an OS boundary; screens are work surfaces, not security boundaries (bots share the host user account, files and network).
- A dropped connection keeps control with you until you reconnect and hand back; **Hand back (force)** clears a stale hold. Two viewers: the most recent **Take over** wins.
- Control lease is a file under `<HERMES_HOME>/bot-desktop/`; no file means the bot holds control; an unreadable file fails closed. Xvnc listens only on a `0600` Unix socket (no TCP port, no VNC password).
- Browser: the dock's Browser icon and the bot's `browser_exec` share one Chromium with one persistent user-data-dir per bot at `<HERMES_HOME>/bot-desktop/browser-profile` (override with `browser.user_data_dir`; `~` expands and a relative path resolves against that bot's `HERMES_HOME`); `browser.executable_path` picks the Chromium (otherwise the PM-managed Chromium, falling back to a system `chromium` / `google-chrome`; reversed on Ubuntu 23.10+ non-root hosts with `kernel.apparmor_restrict_unprivileged_userns=1`). The official Docker image records PM's pinned Chromium in `/etc/hermes/chromium-executable-path`; set `browser.executable_path: /usr/bin/chromium` in the bot's `config.yaml` on hosts that refuse its sandbox (`-desktop` tags carry the distro `chromium`). Set `browser.headed: true` to show the bot's browsing on the screen. The dock is seeded once, guarded by `xfce4-panel.xml`; changing `browser.executable_path` / `browser.user_data_dir` does not re-pin the icon unless that file is deleted.
- Idle stop: the screen applies `bot_desktop.idle_stop_minutes` itself, so it also stops when the gateway that started it is gone and never restarts. A screen a human has taken over is kept while their viewer keeps it in use; once nothing has used it for four windows and at least 10 minutes (a viewer whose link dropped), it stops and control returns to the agent.
- Troubleshooting: read `<HERMES_HOME>/bot-desktop/launcher.log` when the screen starts then stops. The screen runs a US keymap, so layout-dependent keys on non-US keyboards land as US counterparts during takeover.
- WSL2 is a supported host, but WSLg mounts `/tmp/.X11-unix` read-only; replace the mount with a writable directory before the first start (`sudo umount /tmp/.X11-unix`, then `sudo mkdir -p /tmp/.X11-unix && sudo chmod 1777 /tmp/.X11-unix`).
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/bot-screen (pinned to v0.23.1)

### Migration (v0.22 -> v0.23)

- `AGENT_BROWSER_PROFILE` -> `browser.user_data_dir`; `AGENT_BROWSER_EXECUTABLE_PATH` -> `browser.executable_path` (set in the bot's `config.yaml` rather than the gateway environment). `agent-browser` is no longer part of the sandbox image or the SSH host requirements (they need TigerVNC, Xfce, `cua-driver` and a headed Chromium); `nousresearch/hermes-sandbox:desktop` still ships a headed Chromium and `cua-driver`.
- The Chrome DevTools port is advertised by every Chromium Hermes launches (previously "every agent-browser launch"); it remains reachable by any local user on the host.

## Related

- [Computer Use](./computer-use.md)
- [Browser](./browser.md)
- [Web Dashboard](./web-dashboard.md)
