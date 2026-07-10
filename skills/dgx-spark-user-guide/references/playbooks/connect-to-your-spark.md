# Set Up Local Network Access

Enable secure remote access to a DGX Spark device from another machine via NVIDIA Sync or manual SSH, including port forwarding for web apps.

## Signature / Usage

```bash
ssh <user>@spark-abcd.local
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| NVIDIA Sync | app | GUI device manager with terminal, port-forward, and tool launch support |
| Manual SSH | cli | Direct SSH connection using hostname or IP |

## Notes

- Requires DGX Spark on the same local network and valid credentials
- Device hostname format: `spark-abcd.local` (from Quick Start Guide)
- DGX Dashboard reachable at `http://localhost:11000` via tunnel

## Related

- [DGX Dashboard](./dgx-dashboard.md)
- [Connect Two Sparks](./connect-two-sparks.md)
- [VS Code](./vscode.md)
