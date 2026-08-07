> OpenAI Codex (learn.chatgpt.com) のドキュメント。

# Remote connections

Full setup and reference for connecting the ChatGPT mobile app (or another ChatGPT desktop app device) to a Mac/Windows host running Codex, or connecting the desktop app to a project on an SSH host. The remote session uses the connected host's projects, chats, files, credentials, permissions, plugins, Computer Use, browser setup, and local tools.

## Signature / Usage

```text
# ~/.ssh/config on the machine running the desktop app
Host devbox
  HostName devbox.example.com
  User you
  IdentityFile ~/.ssh/id_ed25519
```

```bash
ssh devbox   # confirm connectivity before adding the host in Settings > Connections
```

## Options / Props

| Name | Description |
|------|-------------|
| Mobile → desktop host | Desktop app: **Settings > Connections > Control this Mac or PC > Set up** → scan QR code from ChatGPT mobile app **Remote**. Supports macOS and Windows hosts. |
| Control other devices | Desktop app: **Settings > Connections > Control other devices**, for continuing work from another signed-in desktop app device. A device can both allow remote access and control another device. |
| SSH host project | Add the host to `~/.ssh/config` (concrete aliases only, resolved via OpenSSH; pattern-only hosts are ignored), confirm `ssh <host>` works, ensure `codex` is on `PATH` in the remote login shell, then add it under **Settings > Connections**. |
| Chat handoff | Chat footer → select run location → destination host (or **This computer** to bring a remote chat back) → **Hand off**. Requires a saved project for the same Git repository (same subdirectory) on both hosts; interrupts an in-flight response before transferring. |

## Notes

- Existing connections used since June 8, 2026 remain paired; older unused connections require updating both apps and re-pairing.
- Uses SSH to start/manage the remote Codex app server — don't expose app-server transports directly on a shared or public network; use a VPN/mesh tool to reach a remote machine outside the current network.
- Signing out of ChatGPT turns off Remote Control but keeps existing device pairings; sign back in and re-enable it to restore the connection.
- Workspace admins may need to enable Remote Control access before a user can connect from their phone.

## Related

- [Codex Remote](./remote.md)
