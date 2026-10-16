# Windows sandbox

The native sandbox used when Codex runs directly on Windows (ChatGPT desktop app, CLI, or IDE extension) without WSL or a virtual machine. It enforces bounded filesystem and network permissions for commands and their child processes. The permission profile determines which paths are readable or writable and whether network access is allowed; the approval policy separately controls when Codex asks to run commands with more access.

## Signature / Usage

```toml
[features]
prefer_mxc = true

[windows]
sandbox = "elevated"  # legacy fallback: "elevated" or "unelevated"
```

```toml
# managed requirements.toml
[windows]
allow_mxc = false                         # keep MXC disabled
allowed_sandbox_implementations = ["elevated"]
```

```powershell
# Codex CLI 0.162.0+: test MXC for one command without changing the saved selection
codex -c windows.sandbox=mxc sandbox --include-managed-config --permission-profile :workspace -- cmd.exe /d /c echo MXC_OK
$LASTEXITCODE
```

```powershell
# IT-led provisioning for the legacy elevated sandbox (from an elevated deployment process)
codex sandbox setup --elevated --user 'DOMAIN\alice' --codex-home 'C:\Users\alice\.codex'
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `windows.sandbox` | `mxc` \| `elevated` \| `unelevated` | Implementation. `mxc`: recommended on compatible devices; native process isolation without administrator-approved setup, additional Windows accounts, or local firewall rules. `elevated`: preferred legacy fallback; administrator-approved setup, dedicated lower-privilege sandbox users, filesystem permission boundaries, firewall rules; commands run without administrator privileges. `unelevated`: legacy fallback when elevated setup is unavailable and policy permits it; restricted Windows token from the current user, ACL-based filesystem boundaries, environment-level offline controls; weaker network isolation than `elevated` and doesn't support denied read paths. |
| `[features] prefer_mxc` | boolean | Use MXC when the device and policy support it; otherwise use the existing legacy selection and setup flow. The desktop app prefers MXC automatically for consumer accounts when supported; enterprise and standalone CLI use must enable it. |
| `windows.allow_mxc` (managed `requirements.toml`) | boolean | `false` blocks automatic MXC selection and explicit `windows.sandbox = "mxc"`; existing legacy settings still apply. |
| `windows.allowed_sandbox_implementations` (managed `requirements.toml`) | array | Constrains legacy implementations (`elevated`, `unelevated`); doesn't restrict `mxc` when available. When both are allowed and none is selected, Codex prefers `elevated`. |
| `codex sandbox setup --elevated --user <id> --codex-home <path>` | CLI | IT-led provisioning: reads that user's configuration, provisions the sandbox, and saves `windows.sandbox = "elevated"`; the employee then runs Codex from a normal terminal. |

## Notes

- Selection guidance: use MXC when the device and policy support it; otherwise prefer `elevated`, with `unelevated` as a secondary fallback. For enterprises where device support or policy varies, keep `windows.sandbox` set to the organization's permitted legacy implementation as a fallback. Administrators can distribute `features.prefer_mxc = true` as a default or enforce it through `requirements.toml`; both permit legacy fallback. By default, both legacy sandbox modes use a private desktop for stronger UI isolation.
- `/sandbox-add-read-dir` and `windows.sandbox_private_desktop` are no longer documented on the official page (the Windows sandbox page doesn't mention them). To inspect a read-access failure, check the active permission profile, managed requirements, and Windows file permissions; in the CLI use `/status` and `/debug-config`, and ask an administrator to review a managed restriction rather than disabling the sandbox.
- MXC compatibility: the host must already have the Microsoft Execution Containers (MXC) capabilities, which Microsoft is rolling out to Windows 11; introduced in Windows 11 24H2 (build 26100.9278) and 25H2 (build 26200.9278). Expected probe output is `MXC_OK` with exit code `0`. Explicit `windows.sandbox = "mxc"` fails if required native capabilities are unavailable or policy blocks MXC.
- MXC limits: managed networking requires effective `allow_local_binding = true`; MXC permits connections to and from services on host loopback, proxy domain rules still apply to proxied traffic but the proxy's additional private-network destination checks are removed. Remaining child processes stop when the foreground command exits (test workflows relying on detached dev servers). Deny-read globs use the files matching when each sandboxed process starts (as on Linux/WSL, and with `elevated`); files created later remain readable to that running process.
- Windows version support: Windows 11 recommended; recent fully-updated Windows 10 (1809+, needs ConPTY) is best effort; older Windows 10 builds aren't recommended. `winget` should be available. The legacy `elevated` sandbox depends on administrator-approved setup; some managed devices block it even when the OS version is acceptable. The version matrix doesn't establish MXC availability.
- Full access mode isn't limited to the project directory and may cause destructive actions; keep sandbox boundaries, use rules for exceptions, or set the approval policy to `never` to have Codex attempt to solve problems without asking for escalated permissions. Use WSL when you need Linux-native tooling or your workflow already lives in WSL2; the IDE extension can run inside WSL2 (`chatgpt.runCodexInWindowsSubsystemForLinux: true`).
- Troubleshooting: legacy `elevated` setup failures usually come from a declined UAC/administrator prompt, blocked local user/group creation, blocked firewall rule changes, or blocked sandbox-user logon rights; retry, ask IT, then use `unelevated` if managed policy permits. Windows error `1385` means Windows denies the logon type the sandbox user needs (check device/group policy; use `unelevated` temporarily). A warning about folders writable by `Everyone` means ACLs are too broad for the sandbox to fully protect them; remove `Everyone` write access and restart or re-run setup. If sandboxed commands can't reach the network, check whether the permissions mode intentionally disabled it, restart, and collect the sandbox log. If sandboxing worked before and stopped (moved repo, changed permissions or policies): restart; for MXC repeat the compatibility probe and check the effective network policy; for `elevated` retry setup; collect the log. If the IDE extension is unresponsive, install Visual Studio Build Tools (C++ workload) and the Microsoft Visual C++ Redistributable (x64) (`winget install --id Microsoft.VisualStudio.2022.BuildTools -e`) and fully restart VS Code.
- Diagnostics: send `CODEX_HOME/.sandbox/sandbox.log` with a description, the selected implementation (`mxc`, `elevated`, `unelevated`), error messages, whether you saw `1385`, Windows build number, and Windows 10 or 11; never send the contents of `CODEX_HOME/.sandbox-secrets/`.
- For general sandbox/approval concepts (not Windows-specific), see `agent-approvals-security.md` and `sandbox.md`; for enterprise installation see the Windows deployment page.

## Related

- [Sandbox](./sandbox.md)
- [Agent approvals & security](./agent-approvals-security.md)
- [Windows WSL](./windows-wsl.md)
