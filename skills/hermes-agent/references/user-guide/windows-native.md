# Windows (Native) Guide

Hermes runs natively on Windows 10 and 11 without WSL, Cygwin, or Docker. Covers install, feature matrix, UTF-8 console, Git Bash, the gateway as a Scheduled Task, editor handling, PATH, uninstall, and pitfalls.

## Signature / Usage

```powershell
iex (irm https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.ps1)
```

No admin rights required; installs to `%LOCALAPPDATA%\hermes\` and adds `hermes` to the User PATH (open a new terminal afterwards). Installer options use a scriptblock:

```powershell
& ([scriptblock]::Create((irm https://hermes-agent.nousresearch.com/install.ps1))) -NonInteractive -Branch main
```

## Options / Props

| Parameter | Purpose |
|---|---|
| `-Branch NAME` | Select the source branch; default `main` |
| `-Commit SHA` | Select a commit after the branch checkout |
| `-HermesHome PATH` | Select the data directory |
| `-InstallDir PATH` | Select the source checkout directory |
| `-NonInteractive` | Skip setup and gateway stages that need input (`-SkipSetup` is a deprecated alias) |
| `-IncludeDesktop` | Build the desktop app and create shortcuts |
| `-ShowResolvedPaths` | Print resolved paths as JSON without installing |
| `-Verbose` | Stream every child command's output |
| `-Manifest` / `-ProtocolVersion` | Inspect the stage protocol used by the bootstrap GUI |
| `-Stage NAME -Json` | Run one stage and emit its result frame |

Windows-specific environment variables: `HERMES_DISABLE_WINDOWS_UTF8=1` (disable the UTF-8 stdio shim), `EDITOR` / `VISUAL` (default `notepad` if both unset), `HERMES_GATEWAY_INSTALL_START_ON_LOGIN=1|0`.

Editor overrides (PowerShell): `$env:EDITOR = "code --wait"` (the `--wait` flag is required), `nvim`, `hx`, Notepad++.

Data layout: `%LOCALAPPDATA%\hermes\hermes-agent\` (source checkout), `tools\` (managed tool store), `installs\` (runtime selection and Python generations), `bin\` (CLI launchers), and the root for config, credentials, sessions, plugins, skills, logs.

## Notes

- The current script does not accept `-NoVenv` or `-Tag`. The installer: locates or stages Git for Windows, clones and optionally pins a commit, bootstraps uv, runs PM to provision Python 3.14, tools, and the `all` extra, mints launchers, prepares config, optionally builds the desktop, and writes the bootstrap-completion marker.
- MSIX / Microsoft Store: the bundled desktop MSIX requires Windows 11 22H2 or later (Windows 10 is supported only by the source script). Aliases `hermes`, `hermes-agent`, `hermes-acp`; inspect `Get-Command hermes -All` if shadowed. `hermes update` inside a bundled runtime does not run Git. `Hermes-Setup.exe` is a different bootstrap installer.
- PM owns managed tools (`hermes pm doctor`, `hermes pm install`); missing optional tools are fetched on demand only when `security.allow_lazy_installs` permits.
- Feature matrix: CLI, TUI, messaging gateway, cron, browser tool, MCP servers, local model servers, and web dashboard work natively; dashboard `/chat` embedded terminal uses ConPTY through `pywinpty` (a missing or broken native dependency can make it unavailable). Limits: Matrix native encrypted adapter is Linux-only; native Windows ARM64 excludes the `google-chat` extra, openWakeWord (Sherpa is the default wake word), and local Faster-Whisper STT.
- Shell commands run through Git Bash resolved by `pm.shell()`; MinGit is not a replacement for Git for Windows with Bash; the installer does not set `HERMES_GIT_BASH_PATH`.
- UTF-8 console: `configure_windows_stdio()` switches the console code page to 65001, reconfigures stdio to UTF-8 with `errors='replace'`, and sets `PYTHONIOENCODING` and `PYTHONUTF8`. `Ctrl+Enter` inserts a newline in Windows Terminal; on legacy `cmd.exe` use `Esc` then `Enter`.
- Gateway at login: `hermes gateway install` registers `schtasks /Create /SC ONLOGON /RL LIMITED /TN Hermes_Gateway` (no UAC), falling back to a `Hermes_Gateway.vbs` launcher in the Startup folder; the gateway is spawned detached via `pythonw.exe`. Commands: `hermes gateway status|start|stop|restart|uninstall`. A Windows Service is not used; if you create one, name it `Hermes*` or point it inside the Hermes install so `hermes update` can identify it.

```powershell
hermes gateway install
hermes gateway status
```

- Uninstall: `hermes uninstall` (review `hermes uninstall --dry-run` first; `--full` also removes data, `--data` removes data only). MSIX/Store installs are removed through Windows Settings -> Apps. Do not recursively delete `%LOCALAPPDATA%\hermes`.
- Never use `os.kill(pid, 0)` on Windows (it maps to `CTRL_C_EVENT`); use `psutil.pid_exists()` or `gateway.status._pid_exists()`.
- Common pitfalls: `hermes: command not found` right after install (open a new shell); `WinError 193` (use the `.cmd` variant such as `npx.cmd`); `[scriptblock]::Create(...)` BOM error (use the `irm | iex` form); gateway not staying up (`schtasks /Query /TN Hermes_Gateway /V /FO LIST`); `?` characters in the CLI (check `HERMES_DISABLE_WINDOWS_UTF8`, use Windows Terminal); BOM inside YAML folded scalars breaks parsing.
- Browser tool: PM supplies pinned `agent-browser` and Chromium; on Windows ARM64 they can use x64 emulation. Run `hermes doctor` and `hermes pm doctor` for timeouts.
- Source note: the WSL2 guide states the dashboard `/chat` embedded terminal pane is WSL2-only, while this page states it works natively through ConPTY. The two pages differ; treat the native availability as dependent on a working `pywinpty`.

## Related

- [windows-wsl-quickstart.md](./windows-wsl-quickstart.md)
- [desktop.md](./desktop.md)
