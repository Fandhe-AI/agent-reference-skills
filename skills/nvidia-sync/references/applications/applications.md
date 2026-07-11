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
| SSH Terminal | built-in | Opens a terminal session in the remote user's home directory by default, with no setup required |

## Notes

- These four applications (Cursor, VS Code, VS Code Insiders, NVIDIA AI Workbench) are automatically detected during onboarding as pre-configured default applications.
- NVIDIA Sync always allows launching an SSH terminal on the remote without any setup, using the configured user account.
- For custom scripts or applications beyond the default set, see [Custom Applications](./custom-applications.md).
- If a device cannot be discovered, confirm the device broadcasts `_ssh._tcp` and verify mDNS connectivity.

## Related

- [Custom Applications](./custom-applications.md)
- [Getting Started](../getting-started/README.md)
- [Connections](../connections/README.md)
- [Cluster](../cluster/README.md)
