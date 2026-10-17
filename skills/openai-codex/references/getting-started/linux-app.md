# ChatGPT desktop app for Linux

The ChatGPT desktop app for Linux is available in preview. Install the package for your distribution and processor architecture, then sign in with your ChatGPT account to work with projects, local files, and Codex.

## Signature / Usage

```bash
# Ubuntu / Debian (.deb)
cd ~/Downloads
sudo apt install ./chatgpt_amd64.deb      # ARM64: chatgpt_arm64.deb

# Fedora (.rpm)
sudo dnf install ./chatgpt.x86_64.rpm     # ARM64: chatgpt.aarch64.rpm

# Arch Linux (installation script; performs a full system upgrade and prompts for confirmation)
curl --proto '=https' --tlsv1.2 -fL -o install-arch.sh \
  https://persistent.oaistatic.com/codex-app-prod/linux/install-arch.sh
sudo bash install-arch.sh
```

Open **ChatGPT** from the applications menu, or run `chatgpt` in a terminal (Arch: applications menu), then sign in and follow the desktop app quickstart.

## Options / Props

| Distribution | Architecture | Package |
|--------------|--------------|---------|
| Ubuntu or Debian | x64 | `https://persistent.oaistatic.com/codex-app-prod/linux/deb/latest/chatgpt_amd64.deb` |
| Ubuntu or Debian | ARM64 | `https://persistent.oaistatic.com/codex-app-prod/linux/deb/latest/chatgpt_arm64.deb` |
| Fedora | x64 | `https://persistent.oaistatic.com/codex-app-prod/linux/rpm/latest/chatgpt.x86_64.rpm` |
| Fedora | ARM64 | `https://persistent.oaistatic.com/codex-app-prod/linux/rpm/latest/chatgpt.aarch64.rpm` |
| Arch Linux | x64 / ARM64 | `install-arch.sh` script (detects architecture) |

Update commands:

```bash
sudo apt update && sudo apt install --only-upgrade chatgpt   # Ubuntu / Debian
sudo dnf upgrade --refresh chatgpt                           # Fedora
sudo pacman -Syu                                             # Arch Linux
```

## Notes

- Supported distributions (preview): Ubuntu 24.04 LTS and 26.04 LTS, Debian 13, Fedora 43 and 44, Arch Linux (current, fully updated rolling releases). Other distributions may work but are not formally supported.
- Check the processor with `uname -m`: `x86_64` is x64; `aarch64` or `arm64` is ARM64.
- Installation configures a signed OpenAI package repository; later updates go through the distribution's package manager.
- Computer Use is available on macOS and Windows but not yet in the Linux preview; a future release will add Linux support.
- Native Wayland support is experimental. In a Wayland session the app uses XWayland when available. To select native Wayland, fully quit the app and launch it with `chatgpt --ozone-platform=wayland`. Floating windows, window positioning, focus, and keyboard shortcuts may not fully work yet.
- Source: https://learn.chatgpt.com/docs/linux/linux-app (retrieved 2026-10).

## Related

- [ChatGPT desktop app](./desktop-app.md)
- [ChatGPT desktop app for Windows](./windows-app.md)
