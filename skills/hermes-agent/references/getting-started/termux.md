# Android / Termux

Install Hermes Agent on aarch64 (arm64-v8a) Android from its signed Termux APT repository.

## Signature / Usage

```bash
pkg install curl gnupg

mkdir -p "$PREFIX/etc/apt/keyrings"
curl -fsSL \
  https://hermes-assets.nousresearch.com/releases/termux/stable/key.asc \
  -o "$PREFIX/etc/apt/keyrings/hermes-agent.asc"

gpg --show-keys --with-fingerprint "$PREFIX/etc/apt/keyrings/hermes-agent.asc"
# expected primary fingerprint:
# C572 B5FD D1A2 9CCF A9A9 12B6 840B 0848 E139 156D

printf '%s\n' \
  "deb [signed-by=$PREFIX/etc/apt/keyrings/hermes-agent.asc] https://hermes-assets.nousresearch.com/releases/termux/stable hermes-stable main" \
  > "$PREFIX/etc/apt/sources.list.d/hermes-agent.list"

pkg update
pkg install hermes-agent

hermes setup
hermes --tui
```

## Options / Props

APT channels under `https://hermes-assets.nousresearch.com/releases/termux/<channel>`:

| Channel | APT suite | Contents |
| --- | --- | --- |
| `stable` | `hermes-stable` | Tagged `vMAJOR.MINOR.PATCH` releases that passed the stable release gate |
| `canary` | `hermes-canary` | Prerelease builds from canary tags; versions carry `~canary.<timestamp>` |

Installed locations:

| Contents | Location |
| --- | --- |
| Package files | `$PREFIX/lib/hermes-agent/` |
| Command symlinks | `$PREFIX/bin/hermes`, `$PREFIX/bin/hermes-agent`, `$PREFIX/bin/hermes-acp` |
| Configuration and user data | `~/.hermes/`, or the selected `HERMES_HOME` |

## Gateway

No systemd, launchd, or Windows Scheduled Tasks. Run in a Termux session, or in the background:

```bash
hermes gateway run

mkdir -p "${HERMES_HOME:-$HOME/.hermes}/logs"
nohup hermes gateway run >> "${HERMES_HOME:-$HOME/.hermes}/logs/gateway.log" 2>&1 &
```

## Notes

- The source page carries a danger banner: the Termux package "does not work right now"; a fix is in progress, and the steps may fail or install a package that does not run (docs v0.22.2).
- Requires the standard Termux app with prefix `/data/data/com.termux/files/usr`. Other architectures and renamed Termux packages are unsupported. Wheels target Android API 24 (`android_24_arm64_v8a`). Do not use the desktop/server `install.sh` or a glibc Linux archive here.
- The package bundles Python (3.14, bionic interpreter pin), Node.js, npm, uv, ripgrep, ffmpeg and runtime libraries; wheel closure is core plus `acp`, not all desktop extras. The commands do not need Termux's `python` / `nodejs` packages.
- To follow prereleases, replace `stable` with `canary` and `hermes-stable` with `hermes-canary` in the repository entry. Both channels use the same signing key. Canary sorts before the corresponding stable version. To switch channels, edit the channel path and suite in `hermes-agent.list`, then `pkg update && pkg upgrade hermes-agent`.
- If the fingerprint differs, stop; do not disable signature verification.
- Update with `pkg update` then `pkg upgrade hermes-agent`. `hermes update` refuses to modify an APT-owned install and prints the package-manager command.
- Uninstall: `pkg uninstall hermes-agent` removes the package and symlinks but preserves configuration, sessions, skills and memories.
- Limits: no `nemo-relay` exporter; no Electron, local Chromium or desktop computer-use tools; no local Docker daemon; no Termux:API microphone/clipboard adapters (local voice / wake-word not implied). On this target `sys.platform == "android"`, so dependencies gated only to `linux` are not automatically available.
- Android can suspend or terminate background Termux processes; battery-optimization exemptions and `termux-wake-lock` help but do not guarantee persistence.
- Troubleshooting: package not found, verify the repository entry and run `pkg update`; missing command, check `$PREFIX/bin` is on `PATH` or reinstall; for general diagnostics run `hermes doctor`.
- Android/Termux is a Tier 2 platform (see platform-support.md).

## Related

- [Installation](./installation.md)
- [Platform Support](./platform-support.md)
- [Updating & Uninstalling](./updating.md)
