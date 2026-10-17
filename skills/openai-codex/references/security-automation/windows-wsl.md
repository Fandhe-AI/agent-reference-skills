# WSL

When you use WSL2, Codex runs inside the Linux environment instead of using the native Windows sandbox. Choose WSL2 when you need Linux-native tooling, your repositories and developer workflow already live in WSL2, or the available Windows sandbox implementations don't meet your needs. WSL1 was supported through Codex `0.114`; starting in `0.115` the Linux sandbox moved to `bubblewrap`, so WSL1 is no longer supported.

## Signature / Usage

```powershell
# Elevated PowerShell or Windows Terminal
wsl --install
wsl
```

```bash
# Inside the WSL shell
curl -fsSL https://chatgpt.com/codex/install.sh | sh
codex
```

```bash
# Launch VS Code from inside WSL
cd ~/code/your-project
code .
```

## Options / Props

| Name | Description |
|------|-------------|
| CLI in WSL | Install/run Codex CLI directly inside the WSL2 shell; runs under the Linux sandbox (bubblewrap/seccomp), not the native Windows sandbox. |
| VS Code from WSL | `code .` from a WSL shell opens a WSL remote window, installs the VS Code Server if needed, and runs integrated terminals in Linux. Prerequisites: WSL installed (`wsl --install`, Ubuntu is common) and VS Code with the WSL extension. |
| Confirm WSL connection | `WSL: <distro>` in the green status bar, Linux paths (`/home/...`) in terminals, or `echo $WSL_DISTRO_NAME`. If missing, press `Ctrl+Shift+P` and pick `WSL: Reopen Folder in WSL`. |

## Notes

- Keep repositories under the Linux home directory (e.g. `~/code/my-app`), not Windows-mounted paths like `/mnt/c/...` — the latter can be slower and has more symlink/permission issues.
- Windows-side file access to a WSL repo: `\\wsl$\Ubuntu\home\<user>` in Explorer. If the Windows app or project picker doesn't show your WSL repository, type `\\wsl$` into the file picker or Explorer and navigate to your distribution's home directory.
- Large repositories feel slow: make sure you're not under `/mnt/c`; increase memory and CPU for WSL if needed; update WSL with `wsl --update` then `wsl --shutdown`.
- VS Code in WSL can't find `codex`: verify with `which codex || echo "codex not found"` inside WSL, and follow the CLI setup above if missing.
- This page covers running Codex through WSL2; for the native (non-WSL) Windows sandbox model (`mxc` recommended, `elevated` / `unelevated` as legacy fallbacks), see [Windows sandbox](./windows-sandbox.md). Sharing `CODEX_HOME` between the Windows-native app and CLI-in-WSL and switching the desktop app's agent to WSL are covered on the ChatGPT desktop app for Windows page (windows-app.md in getting-started), not on the WSL page itself.

## Related

- [Windows sandbox](./windows-sandbox.md)
- [Sandbox](./sandbox.md)
