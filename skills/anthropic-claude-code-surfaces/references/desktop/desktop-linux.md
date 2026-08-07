<!-- source: https://code.claude.com/docs/en/desktop-linux.md / last verified: 2026-08-07 -->

# Claude Desktop on Linux (beta)

Install and update the Claude desktop app on Ubuntu and Debian. Linux support is in beta; Chat, Cowork, and Code tabs are all available.

## Signature / Usage

```bash
# Add Anthropic's apt repository
sudo apt install curl gnupg
sudo curl -fsSLo /usr/share/keyrings/claude-desktop-archive-keyring.asc \
  https://downloads.claude.ai/claude-desktop/key.asc
gpg --show-keys /usr/share/keyrings/claude-desktop-archive-keyring.asc
echo "deb [arch=amd64,arm64 signed-by=/usr/share/keyrings/claude-desktop-archive-keyring.asc] https://downloads.claude.ai/claude-desktop/apt/stable stable main" | sudo tee /etc/apt/sources.list.d/claude-desktop.list

# Install
sudo apt update && sudo apt install claude-desktop

# Update
sudo apt update && sudo apt upgrade

# Uninstall
sudo apt remove claude-desktop
```

## Options / Props

| Requirement | Value |
|------|-------------|
| Distribution | Ubuntu 22.04+ or Debian 12+ (other Debian-based distros may work but are untested) |
| Architecture | x86_64 or arm64 |
| Signing key fingerprint | `31DDDE24DDFAB679F42D7BD2BAA929FF1A7ECACE` |

## Notes

- Install from a downloaded `.deb` if the apt repository is unreachable: look up the newest package in the repo index and `sudo apt install ./claude-desktop_*.deb`; set `CLAUDE_DESKTOP_ADD_REPO="false"` in `/etc/default/claude-desktop` to skip repository registration
- Not yet available in the Linux beta: Computer Use, voice dictation (use CLI [voice dictation](../terminal-ux/voice-dictation.md) instead), Quick Entry global hotkey on native Wayland (works on X11), Fedora/RHEL support
- `E: Unable to locate package claude-desktop` usually means the repository entry wasn't written or the architecture isn't `amd64`/`arm64`

## Related

- [Desktop application](./desktop.md)
- [Get started with the desktop app](./desktop-quickstart.md)
