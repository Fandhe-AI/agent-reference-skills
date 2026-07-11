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

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Tailscale tab | UI section | Located under Settings; manages enable/disable, device add/remove |
| Add a Device | action | Starts enrollment of a new device into Tailscale |
| Reauthentication | action | Refreshes an expired device authorization |
| Remove device | action | Removes a device via the action menu; requires a direct connection |

## Notes

- Removing a device from Tailscale requires a direct connection.
- NVIDIA Sync switches from direct to Tailscale connection automatically when moving between networks, showing a brief reconnection state.
- Remove devices from the Tailscale administration console before disabling the integration.
- Session timeouts require restarting the enable flow; expired devices need reauthentication or a new auth key.
- Unenroll operations require a direct local network connection.

## Adding Devices to Tailscale

1. Access **Settings** → **Tailscale** tab
2. Click **Add a Device**
3. Select the target device from the dropdown menu
4. Navigate to the Tailscale authentication key settings via the provided link
5. Generate an authentication key using default settings
6. Copy/paste the key into the modal; select **Add Device**
7. A terminal opens; follow the installation prompts for the Tailscale client

## Troubleshooting

For "Unable to Connect" errors:
1. Verify network connectivity
2. Confirm the device is enrolled in the Tailscale administration console
3. Expand the source error for additional details

## Disabling Tailscale

1. Open **Settings** → **Tailscale** tab
2. Access the three-dot action menu
3. Select **Disable Tailscale**

## Related

- [direct-connections](./direct-connections.md)
- [Getting Started](../getting-started/README.md)
- [Cluster](../cluster/README.md)
- [Applications](../applications/README.md)
