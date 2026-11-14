# Applications

Launch default applications (Codex, Cursor, VS Code, VS Code Insiders, NVIDIA AI Workbench), a remote shell, or custom bash scripts on a connected remote device directly from NVIDIA Sync.

## Signature / Usage

```text
NVIDIA Sync pop-up window > click the application icon for the connected device
```

Adapted (not in the official docs): the official page gives `codex --version` inline in prose; it is shown as a code block here. Run it in an SSH terminal opened through Sync; the command must work on the remote user's login-shell PATH.

```bash
codex --version
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Codex | default application | Needs Codex desktop version 26.818.22352 or newer on your laptop and the Codex CLI on the remote device |
| Cursor | default application | Fixed list of commonly used IDEs and harnesses |
| VS Code | default application | Fixed list of commonly used IDEs and harnesses |
| VS Code Insiders | default application | Fixed list of commonly used IDEs and harnesses |
| NVIDIA AI Workbench | default application | Fixed list of commonly used IDEs and harnesses |
| Custom applications | custom | Anything you configure yourself with a script in the Settings > Custom tab (see [custom-applications.md](./custom-applications.md)) |

## Notes

- Adapted: `codex --version` appears inline in the official text, not as a code block.
- NVIDIA Sync streamlines configuring and launching applications on remote systems: you can launch a default shell on the remote from within the task bar utility, default applications are detected on your laptop when you first install it, custom apps use bash launch and management scripts, and NVIDIA Sync handles the SSH tunnel and port forwarding.
- During onboarding, NVIDIA Sync detects certain installed applications and prompts you to enable them for launch. Default applications are available on any remote device you have added; each has an icon in the task bar utility, and clicking it launches the application on the remote.
- Codex setup: install Codex desktop 26.818.22352 or newer on your laptop, and add and connect to a remote Linux device in Sync. The remote device needs internet access and curl for the setup below; you can also use an existing Codex CLI installation.
  - Select the Codex icon for the connected device in the Sync pop-up window.
  - If Sync opens a setup terminal, read the prompt and enter y to allow the install. Sync downloads and runs OpenAI's installer as your remote user. Wait for Installation completed, then press Enter to close the setup session.
  - Open an SSH terminal on the remote device through Sync, run codex, and follow the sign-in prompts if needed.
  - Select the Codex icon in Sync again, finish the SSH connection setup in Codex, and open your remote project.
  - If you decline the install, the setup session leaves the remote device unchanged. For manual setup and sign-in help, see OpenAI's Codex CLI guide and SSH connection guide.
  - If Sync asks for setup again, open an SSH terminal on that device and run codex --version; if installation failed, read the setup terminal's output before trying again.
- Ports and tunnels: opening a terminal through NVIDIA Sync uses a bash login shell, so `$PATH` (including `/usr/local/cuda/bin`) matches a manual SSH session. Set and persist a non-default SSH port for each device when adding the device. If a port is already in use, NVIDIA Sync displays a clear error instead of failing silently or routing to the wrong application; release the port or stop the application using it, then retry.
- If NVIDIA Sync is not discovering your device, see The Device Does Not Appear in Discovery in [direct-connections.md](../connections/direct-connections.md).
- The OpenCode managed app created by Model Launcher uses the custom app files and runs from the OpenCode workspace at `~/opencode`; see [Model Launcher](../models/model-launcher.md). OpenCode here is the open source coding harness set up by NVIDIA Sync, not a Claude Code or Codex feature.
- DGX Dashboard: the docs index describes the Applications page as covering the DGX Dashboard, but the 0.148.0-153 Applications page body has no DGX Dashboard section. Earlier docs (0.117.3-9, retrieved 2026-10-17) said NVIDIA Sync works with the DGX Dashboard on DGX Spark and GB10 without configuration, and release 0.100.18 notes that the DGX Dashboard notifies you when a system update is available.
- Earlier docs (0.117.3-9) listed Cursor, VS Code, VS Code Insiders, and NVIDIA AI Workbench as the four detected applications; Codex is added in 0.148.0-153.
- Release 0.100.18: JetBrains Toolbox support: NVIDIA Sync launches applications through JetBrains Toolbox. (The current Applications page does not list it among the default applications and gives no setup steps.)
- Release 0.100.19-18: Cursor always opens remote folders in IDE mode.
- Release 0.117.3-9: code editors no longer launch twice.
- Release 0.97.6: local port collisions are detected and resolved automatically.
- Release 0.148.0-153: VS Code installations whose launcher uses a versioned folder are detected on Windows; opening a remote folder no longer fails when the path contains special characters.
- Source: https://docs.nvidia.com/sync/latest/applications.html (NVIDIA Sync 0.148.0-153, last updated Oct 30, 2026, retrieved 2026-11-14).

## Related

- [Custom Applications](./custom-applications.md)
- [Getting Started](../getting-started/README.md)
- [Connections](../connections/README.md)
- [Cluster](../cluster/README.md)
- [Resource Monitor](../monitoring/resource-monitor.md)
- [Model Launcher](../models/model-launcher.md)
