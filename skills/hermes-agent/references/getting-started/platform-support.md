# Platform Support

Hermes Agent classifies supported platforms into tiers by maintenance priority: Tier 1 (highest priority), Tier 2 (best effort), and explicitly unsupported distribution methods.

## Options / Props

| Tier | Platforms | Installation methods | Notes |
|------|-----------|----------------------|-------|
| Tier 1 (highest priority) | macOS (Apple Silicon) | Hermes Desktop, `install.sh` | "We strive to never break installations and updates for these" |
| Tier 1 (highest priority) | Windows 10 / 11 (x86_64, aarch64) | `install.ps1`, MSIX desktop | The MSIX package requires Windows 11 22H2 or later. Optional dependencies have architecture limits |
| Tier 1 (highest priority) | Linux / WSL2 (x86_64, aarch64) | `install.sh` | Tested on the latest Ubuntu and WSL2. Likely to work if the distro has glibc, systemd, and follows the Filesystem Hierarchy Standard |
| Tier 1 (highest priority) | Docker Container (x86_64, aarch64) | `docker pull` | Docker installs do not support `hermes update`. Updating is done by running a new image |
| Tier 2 (best effort) | Nix (macOS, Linux, NixOS) | Nix flake and modules | Nix owns runtime installation and updates |
| Tier 2 (best effort) | Android / Termux (aarch64) | Signed APT repository, then `pkg install hermes-agent` | Prerelease package with Python, Node, and TUI. Only releases cut with `--with termux` (and `windows` and `macos-arm64`) update the APT channel. Run the gateway in a Termux session; Android can terminate background processes |

## Build targets and support priority

- Releases build the macOS desktop bundle for Apple Silicon (`arm64`) only; no release or CI workflow builds or tests an Intel macOS (`x64`) bundle. The macOS update feed is arm64-only, so Intel Macs installed from an older desktop bundle get no update.
- The Termux APT package is not built by default: a release includes it only when cut with `release.py release --with termux`. A release without Termux leaves the Termux APT channel on its previous release.
- The `Hermes-Setup.dmg` bootstrap installer is Apple Silicon only; on an Intel Mac it reports "not supported on this Mac". Intel Macs can install the CLI and run `hermes desktop`.
- Linux desktop packaging is disabled in the release workflow, although local AppImage builds and native Linux PM bundle checks exist.

## Unsupported Methods

Not supported; PRs to fix them are not accepted and compatibility code may be removed at any point:

- Android / Termux on non-aarch64 devices (aarch64 is supported via the APT package)
- Installs via the AUR
- 32-bit x86 macOS, and Intel x86_64 macOS desktop bundles (none are built)
- Installs via `pypi` (e.g. `uv tool install hermes-agent`, `pip install hermes-agent`)
- Installs via `brew` (`brew install hermes-agent`)

## Notes

- Tier 1 platforms receive top priority for bug fixes and regressions; Tier 2 platforms "may break, and we can't promise we'll fix them promptly when they break."
- Users on unsupported distribution methods are directed to switch to a supported installation method.
- Updated against Hermes docs v0.22.2: the earlier "macOS on Intel is unsupported" line became a conditional build (see Build targets above), and the Nix note changed from a stability remark to "Nix owns runtime installation and updates".
- Changed in v0.23.1: the conditional Intel macOS build (`release.py release --with macos-intel`) is gone; no Intel macOS (`x64`) bundle is built or tested. The Tier 2 Android / Termux row still mentions `--with termux` (and `windows` and `macos-arm64`) from the v0.22.2 table, which this diff did not touch.
- Source: https://hermes-agent.nousresearch.com/docs/getting-started/platform-support (pinned to v0.23.1)

## Related

- [Installation](./installation.md)
- [Quickstart](./quickstart.md)
