# ChatGPT desktop app for Windows

The Windows build of the ChatGPT desktop app: worktrees, scheduled tasks, Git functionality, built-in browser, file previews, plugins, and skills, running natively via PowerShell under the native Windows sandbox, or configurable to run the agent inside WSL2.

## Signature / Usage

```powershell
winget install --id 9PLM9XGG6VKS -s msstore
```

Then follow the quickstart (`learn.chatgpt.com/docs/quickstart?setup=app`) to sign in and open a project.

## Options / Props

| Name | Description |
|------|-------------|
| Preferred editor | Default app for **Open** (VS Code, Visual Studio, etc.); overridable per project. |
| Integrated terminal | PowerShell, Command Prompt, Git Bash, or WSL — applies to new terminal sessions only. |
| Agent: Windows-native vs. WSL | **Settings**: switch the agent to run in WSL2 instead of PowerShell; requires an app restart to take effect. |
| Useful dev tools | Git (review panel), Node.js, Python, .NET SDK, GitHub CLI — installable via `winget install --id <PackageId>`. |

## Notes

- Native sandbox applies when the agent runs in PowerShell (the Windows sandbox; see windows-sandbox.md, where `mxc` is recommended and `elevated` / `unelevated` are legacy fallbacks); Linux sandboxing applies when the agent runs in WSL2. Select **Ask for approval** beneath the composer to keep sandbox protections active in either mode. Full access mode isn't limited to your project directory and might perform unintentional destructive actions; keep sandbox boundaries and use rules for targeted exceptions.
- Download: Microsoft Store (`winget install --id 9PLM9XGG6VKS -s msstore`); for enterprise installation and update options see the Windows deployment page. If you add a project from WSL, use **Add new project** or Ctrl+O and type `\\wsl$\` into the File Explorer window. WSL1 was supported through Codex `0.114`; unsupported since `0.115`. The integrated terminal is configured independently from the agent (e.g. agent in WSL with PowerShell terminal). The preferred editor choice for **Open** can be overridden per project, and a project-specific choice from the **Open** menu takes precedence.
- Developer tools via `winget`: `winget install --id Git.Git`, `OpenJS.NodeJS.LTS`, `Python.Python.3.14`, `Microsoft.DotNet.SDK.10`, `GitHub.cli` (then `gh auth login` to enable GitHub features); change package IDs for other Python or .NET versions.
- Local environment scripts: cross-platform commands such as `npm` scripts can share one setup script or set of actions; create Windows-specific scripts or actions when needed. Actions run in the environment used by your integrated terminal; local setup scripts run in the agent environment (WSL if the agent uses WSL, otherwise PowerShell).
- Troubleshooting: Git features unavailable without native Git (`winget install Git.Git` from PowerShell or `cmd.exe`); Git isn't detected for projects opened from `\\wsl$` (store the project on the native Windows drive and access it in WSL via `/mnt/<drive>/...`); `Cmder` not listed in the open dialog (right-click `Cmder` > **Add to Start**, then restart Codex or reboot).
- Elevated command execution: start the desktop app itself via **Run as administrator** — the Codex agent inherits that permission level.
- PowerShell execution-policy errors (`... cannot be loaded because running scripts is disabled ...`) are commonly fixed with `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned`.
- Uses the same Codex home directory as native Windows Codex CLI: `%USERPROFILE%\.codex`. The CLI inside WSL uses the Linux home directory by default, so it doesn't share configuration, cached auth, or session history automatically; to share, sync WSL `~/.codex` with `%USERPROFILE%\.codex` or set `export CODEX_HOME=/mnt/c/Users/<windows-user>/.codex` in the WSL shell profile (`~/.bashrc` / `~/.zshrc`). See also [WSL](../security-automation/windows-wsl.md).
- Opening a project from `\\wsl$\...` with the Windows-native agent is unreliable — prefer storing the project on the native Windows drive and accessing it from WSL via `/mnt/<drive>/...`.
- Source: https://learn.chatgpt.com/docs/windows/windows-app (retrieved 2026-10).

## Related

- [Codex CLI](./cli.md)
- [Codex IDE extension](./ide.md)
- Windows sandbox (`../security-automation/windows-sandbox.md`)
- WSL (`../security-automation/windows-wsl.md`)
- Deploy the Windows app (`../administration/windows-deployment.md`)
