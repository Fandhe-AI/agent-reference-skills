# Tailscale Connections

Integrate NVIDIA Sync with Tailscale, an open-source peer-to-peer mesh platform, to reach devices that are not on the same network without installing separate client software.

## Signature / Usage

```text
Settings > Tailscale > Enable Tailscale
```

1. Navigate to **Settings** → **Tailscale** tab
2. Select **Enable Tailscale**
3. A browser window launches for authentication
4. Sign in to Tailscale and click **Connect**
5. Wait for "Login Successful" confirmation
6. Close the browser and return to NVIDIA Sync

If the browser does not open, use the option in NVIDIA Sync to resend the request.

If the enable flow fails, check the error message in NVIDIA Sync.

### Adding Devices to Tailscale

1. Access **Settings** → **Tailscale** tab
2. Click **Add a Device**
3. Select the target device from the dropdown menu
4. Navigate to the Tailscale authentication key settings via the provided link
5. Generate an authentication key using default settings
6. Copy/paste the key into the modal; select **Add Device**
7. A terminal opens; follow the installation prompts for the Tailscale client

### Connecting to a Tailscale Device

NVIDIA Sync selects the connection type automatically; the connection indicator shows which type is active. If the connection drops, Sync enters a reconnecting state (typically about 30 seconds); click Cancel to stop. If the system tray is hidden and a connection error occurs, the tray may open automatically to show the error.

### Disabling Tailscale

1. Open **Settings** → **Tailscale** tab
2. Access the three-dot action menu
3. Select **Disable Tailscale**

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Tailscale tab | UI section | Located under Settings; manages enable/disable, device add/remove |
| Add a Device | action | Starts enrollment of a new device into Tailscale |
| Tailscale Devices screen | UI section | Lists all devices added to Tailscale, in the Tailscale settings screen |
| Reauthentication | action | Refreshes an expired device authorization |
| Remove device | action | Removes a device via the action menu; requires a direct connection |

## Notes

- Removing a device from Tailscale requires a direct connection.
- NVIDIA Sync switches from direct to Tailscale connection automatically when moving between networks, showing a brief reconnection state. This applies to Sync-managed tunnels and to SSH-enabled apps that use SSH aliases (such as VS Code or Cursor).
- Removing or deauthenticating a device expires its keys (shown as expired in the Tailscale administration console), but the device is not removed from the console.
- Warning: remove devices from the Tailscale administration console before disabling the integration. Disabling clears Sync's Tailscale credentials but does not remove the devices.
- Release 0.100.18: Tailscale unexpected-error messages include more detail.
- Session timeouts require restarting the enable flow; expired devices need reauthentication or a new auth key.
- Unenroll operations require a direct local network connection.
- For "Unable to Connect" errors: verify network connectivity, confirm the device is enrolled in the Tailscale administration console, and expand the source error for additional details.

## Related

- [direct-connections](./direct-connections.md)
- [Getting Started](../getting-started/README.md)
- [Cluster](../cluster/README.md)
- [Applications](../applications/README.md)
