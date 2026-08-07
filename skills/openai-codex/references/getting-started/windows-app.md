> OpenAI Codex (learn.chatgpt.com) のドキュメント。

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

- Native sandbox applies when the agent runs in PowerShell; Linux sandboxing applies when the agent runs in WSL2. Select **Ask for approval** beneath the composer to keep sandbox protections active in either mode.
- Elevated command execution: start the desktop app itself via **Run as administrator** — the Codex agent inherits that permission level.
- PowerShell execution-policy errors (`... cannot be loaded because running scripts is disabled ...`) are commonly fixed with `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned`.
- Uses the same Codex home directory as native Windows Codex CLI: `%USERPROFILE%\.codex`. See [WSL](../security-automation/windows-wsl.md) for sharing config/auth with a WSL-side CLI install.
- Opening a project from `\\wsl$\...` with the Windows-native agent is unreliable — prefer storing the project on the native Windows drive and accessing it from WSL via `/mnt/<drive>/...`.

## Related

- [Codex CLI](./cli.md)
- [Codex IDE extension](./ide.md)
- Windows sandbox (`../security-automation/windows-sandbox.md`)
- WSL (`../security-automation/windows-wsl.md`)
- Deploy the Windows app (`../administration/windows-deployment.md`)
