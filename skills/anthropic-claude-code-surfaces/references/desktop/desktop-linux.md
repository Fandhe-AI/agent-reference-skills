<!-- source: https://code.claude.com/docs/en/desktop-linux.md / last verified: 2026-10-17 -->

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

### Cowork requirements

Cowork runs tasks in a virtual machine the desktop app hosts with QEMU and KVM.

| Requirement | Details |
|------|-------------|
| Hardware virtualization | Turned on in firmware settings. Otherwise the Cowork tab reports "Cowork requires hardware virtualization (KVM)" |
| QEMU and UEFI firmware | x86_64: `qemu-system-x86`, `ovmf`, `virtiofsd`. arm64: `qemu-system-arm`, `qemu-efi-aarch64`, `virtiofsd`. Installed by default as recommended packages by `apt install claude-desktop`; `--no-install-recommends` (or a minimal image) drops them and the tab reports "Cowork requires QEMU". Ubuntu 22.04 has no `virtiofsd` package; the app uses a bundled copy there |
| `/dev/kvm` and `/dev/vhost-vsock` | Add your user to the `kvm` group (`sudo usermod -aG kvm "${USER}"`), then log out and back in. Cowork needs `/dev/vhost-vsock`, which only `kvm` group members can open, even if `/dev/kvm` already works |

```bash
sudo usermod -aG kvm "${USER}"
sudo modprobe vhost_vsock                                                  # current boot only
echo vhost_vsock | sudo tee /etc/modules-load.d/vhost_vsock.conf           # every boot
```

The app checks these requirements once at launch: restart it after installing packages. If `/dev/vhost-vsock` is missing and the running kernel has no module directory under `/lib/modules` (common on ChromeOS and container-based Linux), the tab reports the kernel lacks the needed virtualization support.

## Notes

- Cowork error messages and fixes: "Cowork requires QEMU" (install the listed packages), "Cowork requires hardware virtualization (KVM)" (enable it in firmware), "Claude doesn't have permission to use virtualization (/dev/kvm)" (join the `kvm` group), "Cowork requires the `vhost_vsock` kernel module" (`sudo modprobe vhost_vsock`, then restart the app)
- Troubleshooting: `libc6 (>= 2.34)` unmet dependency means the distribution is too old (Ubuntu 20.04 ships `libc6` 2.31; use Ubuntu 22.04+ or Debian 12+). "Running as root without `--no-sandbox` is not supported" means you launched `claude-desktop` as root; launch it as a regular user
- Install from a downloaded `.deb` if the apt repository is unreachable: look up the newest package in the repo index and `sudo apt install ./claude-desktop_*.deb`; set `CLAUDE_DESKTOP_ADD_REPO="false"` in `/etc/default/claude-desktop` to skip repository registration
- Not yet available in the Linux beta: Computer Use, voice dictation (use CLI [voice dictation](../terminal-ux/voice-dictation.md) instead), Fedora/RHEL support (Fedora and Arch users should run the CLI). The Quick Entry global hotkey works on X11, and on native Wayland it works when the desktop environment provides the GlobalShortcuts portal
- `E: Unable to locate package claude-desktop` usually means the repository entry wasn't written or the architecture isn't `amd64`/`arm64`

## Related

- [Desktop application](./desktop.md)
- [Get started with the desktop app](./desktop-quickstart.md)
