# Platform Support

Hermes Agent classifies supported platforms into tiers by maintenance priority: Tier 1 (highest priority), Tier 2 (best effort), and explicitly unsupported distribution methods.

## Options / Props

| Tier | Platforms | Notes |
|------|-----------|-------|
| Tier 1 (highest priority) | macOS (Apple Silicon) via Hermes Desktop or `install.sh` | "We strive to never break installations and updates for these" |
| Tier 1 (highest priority) | Windows 10/11 (x86_64, aarch64) via Hermes Desktop or `install.ps1` | Some features not available |
| Tier 1 (highest priority) | Linux/WSL2 (x86_64, aarch64) via `install.sh` | Tested on Ubuntu and WSL2 |
| Tier 1 (highest priority) | Docker (x86_64, aarch64) | Docker installs do not support `hermes update` |
| Tier 2 (best effort) | Android (Termux, aarch64) | Some features unavailable |
| Tier 2 (best effort) | Nix (macOS, Linux, NixOS) | "Breaks often due to node.js packaging woes" |

## Unsupported Methods

Not recommended and without PR acceptance:

- AUR installations
- macOS on Intel (x86) processors
- PyPI installations
- Homebrew installations

## Notes

- Tier 1 platforms receive top priority for bug fixes and regressions; Tier 2 platforms "may break, and we can't promise we'll fix them promptly when they break."
- Users on unsupported distribution methods are directed to switch to a supported installation method.

## Related

- [Installation](./installation.md)
- [Quickstart](./quickstart.md)
