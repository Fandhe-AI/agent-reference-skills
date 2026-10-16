# Applications

Launch pre-configured desktop applications, an SSH terminal, or custom bash scripts on a connected remote device directly from NVIDIA Sync.

## Signature / Usage

```text
NVIDIA Sync > Connect to device > select application from pop-up menu
```

Launching a default application requires three steps: open NVIDIA Sync, connect to an existing device, then select the application from the pop-up menu and wait for it to launch.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Cursor | default application | https://cursor.com/download |
| VS Code | default application | https://code.visualstudio.com/download |
| VS Code Insiders | default application | https://code.visualstudio.com/insiders |
| NVIDIA AI Workbench | default application | https://www.nvidia.com/workbench |
| SSH Terminal | built-in | Opens in the remote user's default shell, starting in the configured working directory (default: home), with no setup required |
| DGX Dashboard Access | built-in | Automatically appears if the connected device includes the DGX Dashboard (e.g. DGX Spark, GB10); no configuration required |

## Notes

- Sync detects these four applications (Cursor, VS Code, VS Code Insiders, NVIDIA AI Workbench) when they are installed locally and prompts you to enable them during onboarding.
- NVIDIA Sync always allows launching an SSH terminal on the remote without any setup, using the configured user account.
- DGX devices such as DGX Spark and GB10 include the DGX Dashboard; NVIDIA Sync works with it without any configuration, and it operates separately from default and custom applications.
- For custom scripts or applications beyond the default set, see [Custom Applications](./custom-applications.md).
- If a device cannot be discovered, confirm the device broadcasts `_ssh._tcp` and verify mDNS connectivity.
- Release 0.100.18: JetBrains Toolbox support: NVIDIA Sync launches applications through JetBrains Toolbox. (The Applications page does not list it among the default applications and gives no setup steps.)
- Release 0.100.18: the DGX Dashboard notifies you when a system update is available.
- Release 0.100.19-18: Cursor always opens remote folders in IDE mode.
- Release 0.117.3-9: code editors no longer launch twice.
- Release 0.97.6: local port collisions are detected and resolved automatically.

## Related

- [Custom Applications](./custom-applications.md)
- [Getting Started](../getting-started/README.md)
- [Connections](../connections/README.md)
- [Cluster](../cluster/README.md)
- [Resource Monitor](../monitoring/resource-monitor.md)
