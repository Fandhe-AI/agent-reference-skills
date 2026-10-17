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

- What you can do remotely: start new chats in projects on the host or continue existing ones; send follow-ups, answer questions, and steer active work; approve commands and other actions; review outputs, diffs, test results, terminal output, and screenshots; get notified when a task completes or needs attention; switch between connected hosts and chats.
- Before you set up mobile access: hosts run the ChatGPT desktop app on macOS or Windows; you can control a host from ChatGPT on iOS or Android, or from another Mac or Windows device when **Control other devices** is available (availability varies by rollout). Requires Codex access in the account and workspace, the latest ChatGPT mobile app, the latest desktop app on an awake, online, signed-in host (setup starts from the app; not from the Codex CLI or IDE extension), and any required MFA, SSO, or passkey configuration. Workspace admins may need to enable Remote Control access. The QR code pairs that phone with that host; pair every phone or supported desktop device with every host you want it to control. After setup the host appears in **Codex** on iOS (or **Remote** if the app still uses that label). Manage connected devices, keep-awake, Computer Use, and the Chrome extension in **Settings > Connections**.
- Choose what to connect: your laptop or desktop (remote access stops if it sleeps, loses network, or the app closes; on a Mac laptop it can stay available with the lid open and power connected, or lid closed with an external display; choosing **Sleep** stops it; on Windows keep the session unlocked for Computer Use tasks, which run in the foreground); a dedicated always-on Mac or Windows PC (install projects, credentials, MCP servers, skills, and tools there); or a remote development environment via an SSH host (connect the desktop host to it first; the phone still connects to the same host). For browser or desktop tasks on an always-on or remote host, enable Computer Use and install the Chrome extension on that host.
- What comes from the connected host: repository files and local documents; shell commands run on that host or remote environment; MCP servers, skills, browser access, and Computer Use come from the host's configuration; signed-in websites and desktop apps only when the host can access them; sandboxing, security controls, and action approvals still apply. A secure relay layer keeps trusted machines reachable across your authorized ChatGPT devices without exposing them directly to the public internet.
- Pick up work from another device: on a Mac or Windows device where available, **Settings > Connections > Control other devices** adds another host; a device can allow remote access and control another device at the same time.
- SSH host setup: add a concrete host alias to `~/.ssh/config`, confirm `ssh <host>`, install and authenticate Codex on the remote host (the app starts the remote Codex app server through SSH using the remote user's login shell, so `codex` must be on `PATH` there), then in **Settings > Connections** add or enable the SSH host and choose a remote project folder. Keep the remote host to normal SSH security expectations (trusted keys, least-privilege accounts, no unauthenticated public listeners).
- Handoff: moves an existing chat and its Git state between your local computer and a connected remote host, creating or reusing a worktree on the destination. You can also ask Codex in another chat to hand off a named chat; Codex can't hand off the chat making the request, and handoff to a Codex cloud environment isn't supported.
- Troubleshooting: host not visible on the phone (desktop app running, **Allow other devices to connect** enabled, same account and workspace; if unused since June 8, 2026, update both apps and re-pair); Remote Control is off after sign-in (turn it back on; if an error appears after **Add**, restart the desktop app on the host); the approval request doesn't appear (open **Codex** on iOS or **Remote**, confirm the same account and workspace, re-scan the QR code or restart setup, ask your admin about Remote Control access); the session disconnects (host slept, lost network, or closed the app); authentication blocks setup (complete the SSO, MFA, or passkey prompt; ask your admin).
- Local computer access with Work Cloud (ChatGPT Work only) is a separate feature; it applies only to tasks created after you enable sync, and it doesn't change how Codex on mobile connects to a host. See the ChatGPT Work guidance for that feature.
- Existing connections used since June 8, 2026 remain paired; older unused connections require updating both apps and re-pairing.
- Uses SSH to start/manage the remote Codex app server — don't expose app-server transports directly on a shared or public network; use a VPN/mesh tool to reach a remote machine outside the current network.
- Signing out of ChatGPT turns off Remote Control but keeps existing device pairings; sign back in and re-enable it to restore the connection.
- Workspace admins may need to enable Remote Control access before a user can connect from their phone.
- Source: https://learn.chatgpt.com/docs/remote-connections (retrieved 2026-10).

## Related

- [Codex Remote](./remote.md)
