# Windows (Native) Guide

Hermes runs natively on Windows 10 and 11 without WSL, Cygwin, or Docker. Covers install, feature matrix, UTF-8 console, Git Bash, the gateway as a Scheduled Task, editor handling, PATH, uninstall, and pitfalls.

## Signature / Usage

```powershell
# download, review, then run
Invoke-WebRequest https://hermes-agent.nousresearch.com/install.ps1 -OutFile install.ps1
Get-Content install.ps1 | more
.\install.ps1
```

No admin rights required; installs to `%LOCALAPPDATA%\hermes\` and adds `hermes` to the User PATH (open a new terminal afterwards). Installer options are passed to the saved script:

Adapted (not in the official docs): the official page passes options through `& ([scriptblock]::Create((irm https://hermes-agent.nousresearch.com/install.ps1))) -NonInteractive -Channel main`; here the options go to the saved, reviewed script.

```powershell
.\install.ps1 -NonInteractive -Channel main
```

## Options / Props

| Parameter | Purpose |
|---|---|
| `-Channel stable\|main` | `stable` (default): the latest published release. `main`: every commit, saved like `hermes update --set-channel main`. `$env:HERMES_INSTALL_CHANNEL` sets it for a plain `irm \| iex` |
| `-Branch NAME` | Select the source branch; default `main`. Another branch is installed at its tip |
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
- Common pitfalls: `hermes: command not found` right after install (open a new shell); `WinError 193` (use the `.cmd` variant such as `npx.cmd`); `[scriptblock]::Create(...)` BOM error (official scriptblock form only; the saved-file `-File` / `.\install.ps1` form used on this page does not go through `[scriptblock]::Create`); gateway not staying up (`schtasks /Query /TN Hermes_Gateway /V /FO LIST`); `?` characters in the CLI (check `HERMES_DISABLE_WINDOWS_UTF8`, use Windows Terminal); BOM inside YAML folded scalars breaks parsing.
- Browser tool (`browser_exec`) is part of Hermes's Python environment. Local browsing launches the pinned Chromium that PM installs (`hermes pm install chromium` if missing); set `browser.executable_path` to use another Chromium-family binary. Cloud browsers are selected in `hermes tools`. On Windows ARM64 the pinned Chromium is the x64 build and runs under x64 emulation. For timeouts run `hermes doctor` and `hermes pm doctor`; a slow first Chromium start can be given more time with `browser.command_timeout` (the launch timeout floor, in seconds).
- Source note: the WSL2 guide states the dashboard `/chat` embedded terminal pane is WSL2-only, while this page states it works natively through ConPTY. The two pages differ; treat the native availability as dependent on a working `pywinpty`.
- Adapted: the official page shows a plain `irm | iex` form and `& ([scriptblock]::Create((irm https://hermes-agent.nousresearch.com/install.ps1))) -NonInteractive -Channel main` for options (v0.22.2: `-Branch main`); this page uses the canonical `hermes-agent.nousresearch.com/install.ps1` URL and saves the script with `-OutFile` for review before running instead of piping into `iex`. The BOM pitfall above applies to the official scriptblock form.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/windows-native (pinned to v0.23.1)

### Migration (v0.22 -> v0.23)

- Migration (v0.22 -> v0.23): installer gains `-Channel stable|main` (default `stable`); `-Branch` still works. The `agent-browser` Node-version troubleshooting entry was removed from the v0.23.1 page, which now describes the browser tool as part of Hermes's Python environment.

## Related

- [windows-wsl-quickstart.md](./windows-wsl-quickstart.md)
- [desktop.md](./desktop.md)
