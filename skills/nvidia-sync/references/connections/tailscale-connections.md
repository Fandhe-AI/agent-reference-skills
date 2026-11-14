# Tailscale Connections

Use the Tailscale integration built into NVIDIA Sync to reach a device when you are away from its network, without installing the Tailscale client on your laptop.

## Signature / Usage

```text
Settings > Tailscale > Enable Tailscale
```

1. Open Settings > Tailscale and select Enable Tailscale.
2. Wait for the browser to open. Sign in to Tailscale and select Connect.
3. Wait for Login Successful, then close the browser and return to Sync.
4. Wait for Tailscale Was Enabled Successfully, then close the modal.

### Adding a Device to Tailscale

1. Open Settings > Tailscale and select Add a Device. If devices are already listed, select Add Device to Tailscale.
2. Choose the device from the drop-down menu.
3. Follow the link to the Tailscale auth key settings. Create a key using the default settings.
4. Paste the key into the modal and select Add Device.
5. Follow the prompts in the terminal that opens. They help you install the Tailscale client and sign in on the remote device.

### Removing a Device and Disabling the Integration

1. Make sure you can reach the device without Tailscale.
2. Open its action menu in Settings > Tailscale and select Remove Device.
3. Confirm Remove Device and follow the terminal prompts. Wait for Sync to confirm removal.
4. After removing the devices, open Settings > Tailscale, open the three-dot menu, select Disable Tailscale, and confirm in the modal.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Enable Tailscale | action | Starts the browser sign-in flow for the built-in integration |
| Add a Device | action | Adds a device to your tailnet using an auth key |
| Reauthenticate | action | In the device's action menu; create a new auth key and follow the prompts to restore expired access |
| Remove Device | action | In the device's action menu; requires direct access to the device |
| Disable Tailscale | action | In the three-dot menu on the Tailscale tab; clears Sync's Tailscale credentials |

## Notes

- Your Tailscale network is called a tailnet. Sync has Tailscale built in; the remote device needs the Tailscale client, and Sync helps you install it and join the tailnet. Set it up while you still have direct access to the device: add the device to Sync first, then enable Tailscale in Sync and add the device to your tailnet.
- If Sync shows Waiting for Tailscale to connect..., wait until it connects before adding a device.
- Connecting: Sync chooses between direct and Tailscale access, and the connection indicator shows which type is in use. When you change networks, Sync switches the connection for you; this also applies to SSH-enabled apps that use the device's alias. If the connection drops, Sync shows a reconnecting state and Cancel stops the attempt. A connection error may open the Sync pop-up window to show the message.
- Removing a device clears its Tailscale credentials and disconnects it from the tailnet. Its keys appear as expired in the Tailscale administration console, and the console entry remains. To remove the saved device from Sync itself, see Delete in Direct Connections.
- Disabling: remove the Tailscale devices through Sync before disabling the integration, while you can still reach each device directly. Disabling clears Sync's Tailscale credentials; device entries remain in the Tailscale administration console. If you enable the integration again, you need to add the devices again.
- Troubleshooting, the browser does not open or you closed it too soon: select Resend the request in Sync. If the login session has expired, start the enable flow again from Settings > Tailscale.
- Troubleshooting, Sync cannot connect to the device: check your network connection; check that the device is still in your tailnet and its access has not expired (use Reauthenticate if needed); expand the error in Sync for more detail.
- Troubleshooting, removing a device gets stuck: the removal step needs direct access. Return to a network that can reach the device without Tailscale, then retry.
- Model Launcher: for a Tailscale connection, the endpoint URL Sync shows still uses its SSH tunnel.
- Earlier docs (0.117.3-9) advised removing devices from the Tailscale administration console before disabling the integration; the current page says to remove the devices through Sync.
- Release 0.100.18: Tailscale unexpected-error messages include more detail.
- Release 0.148.0-153: on macOS the Tailscale enrollment terminal stays open until enrollment finishes; the sign-in screen notes the browser can take a few minutes to open.
- Source: https://docs.nvidia.com/sync/latest/tailscale.html (NVIDIA Sync 0.148.0-153, last updated Oct 30, 2026, retrieved 2026-11-14).

## Related

- [direct-connections](./direct-connections.md)
- [Getting Started](../getting-started/README.md)
- [Cluster](../cluster/README.md)
- [Applications](../applications/README.md)
