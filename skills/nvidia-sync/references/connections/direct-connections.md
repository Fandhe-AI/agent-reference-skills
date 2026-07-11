# Direct Connections

Connect NVIDIA Sync to remote Linux devices over SSH on the same network (or an internet-accessible host such as a cloud VM), using an IP address, hostname, username, and password or key.

## Signature / Usage

```text
Settings > Devices > Add Device
```

Three methods are available to add a device:

1. **mDNS auto-discovery** (DGX Spark/GB10) — devices broadcast their hostname via multicast DNS; select the device from the discovery modal.
2. **Manual IP address entry** — select "Add a device manually" in the broadcast modal when mDNS is unavailable.
3. **Import from SSH configuration** — import a pre-configured SSH alias from `~/.ssh/config` (Mac/Linux) or `C:\Users\<user-name>\.ssh/config` (Windows). Requires key-based authentication; verify the SSH alias works before importing.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Name | string | Custom identifier for the device |
| Hostname or IP | string | Pre-filled from mDNS discovery, or entered manually |
| Port number | number | Default is `22` |
| Username | string | Device access credentials |
| Password | string | Device access credentials (password-based auth) |

## Notes

- mDNS discovery works after initial device setup; networks without mDNS support require manual IP entry.
- Importing from `~/.ssh/config` requires key-based authentication and a working SSH alias.
- Direct connections support both password-based and key-based SSH authentication, using standard port 22 (customizable).
- If connection details are incorrect, the device will not be added.
- For devices on a different network than your laptop, use the Tailscale integration instead.

## Connect / Disconnect

**To Connect:**
1. Verify network access to the device
2. Launch NVIDIA Sync
3. Select the device from the top-left dropdown menu
4. Click **Connect**

**To Disconnect:**
1. Open the NVIDIA Sync pop-up
2. Click **Disconnect**

## Related

- [tailscale-connections](./tailscale-connections.md)
- [Getting Started](../getting-started/README.md)
- [Cluster](../cluster/README.md)
- [Applications](../applications/README.md)
