# WSL

Running Codex inside WSL2 instead of the native Windows sandbox — the Linux-native alternative when your repositories/tooling already live in WSL2 or the native Windows sandbox modes don't fit. WSL1 is unsupported (dropped when the Linux sandbox moved to `bubblewrap` in Codex 0.115; last supported in 0.114).

## Signature / Usage

```powershell
# Elevated PowerShell
wsl --install
wsl
```

```bash
# Inside the WSL shell
curl -fsSL https://chatgpt.com/codex/install.sh | sh
codex
```

## Options / Props

| Name | Description |
|------|-------------|
| CLI in WSL | Install/run Codex CLI directly inside the WSL2 shell; runs under the Linux sandbox (bubblewrap/seccomp), not the native Windows sandbox. |
| Desktop app agent = WSL | Desktop app **Settings**: switch the agent from Windows-native to WSL, then restart the app (required for the change to take effect). Terminal choice (PowerShell/WSL/etc.) is configured independently of the agent. |
| VS Code from WSL | `code .` from a WSL shell opens a WSL remote window; confirm with the `WSL: <distro>` status bar item or `echo $WSL_DISTRO_NAME`. |

## Notes

- Keep repositories under the Linux home directory (e.g. `~/code/my-app`), not Windows-mounted paths like `/mnt/c/...` — the latter is markedly slower and prone to symlink/permission issues.
- Windows-side file access to a WSL repo: `\\wsl$\<distro>\home\<user>` in Explorer.
- Large-repo slowness troubleshooting: confirm you're not under `/mnt/c`, then `wsl --update` / `wsl --shutdown`.
- Sharing config/auth/sessions between the Windows-native app and CLI-in-WSL: the desktop app always uses `%USERPROFILE%\.codex`, while WSL's CLI defaults to its own Linux home — sync `~/.codex` with `%USERPROFILE%\.codex`, or set `export CODEX_HOME=/mnt/c/Users/<windows-user>/.codex` in the WSL shell profile.
- This page covers running/using Codex through WSL2; for the native (non-WSL) Windows sandbox model (`elevated`/`unelevated`), see [Windows sandbox](./windows-sandbox.md).

## Related

- [Windows sandbox](./windows-sandbox.md)
- [Sandbox](./sandbox.md)
