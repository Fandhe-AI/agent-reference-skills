# Direct Connections

Add a remote Linux device to NVIDIA Sync (by discovery, manual entry, or SSH alias import), connect to it over a managed SSH tunnel, disconnect, and remove it.

## Signature / Usage

```text
Settings > Devices > Add New
```

1. Open Settings > Devices and select Add New.
2. Select Add next to a discovered hostname, or select Add a device manually.
3. Fill in the form (Name, Hostname or IP, Port, Username, Password) and select Add.
4. Follow any Docker access prompt, or select Skip.

To import an existing SSH alias instead: open Settings > Devices, find the alias under Available from SSH config file, and select Add next to it.

### Connect / Disconnect

To connect, open the Sync pop-up window, select the device, select Connect, and wait for the connection to finish. To disconnect, open the Sync pop-up window and select Disconnect; this closes the managed tunnel.

### Remove a Device

```text
Settings > Devices > (device action menu) > Delete
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Name | string | An optional name to identify the device |
| Hostname or IP | string | The discovered hostname, or the device's hostname or IP address |
| Port | number | The SSH port, usually 22 |
| Username | string | The account you use to sign in to the device |
| Password | string | The password for that account |

## Notes

- You need SSH access before you can add a device: the remote device must run an SSH server and have a reachable SSH port, and you need its hostname or IP address and a username and password. If you have key-based access, set up an alias and then import it into Sync.
- NVIDIA Sync can find devices through multicast DNS (mDNS) on your local network; if the device is broadcasting, Sync should discover it. You can enter the address yourself if discovery is not available. Sync does not support connections through jump or bastion servers.
- Sync gains access to the device with your password but sets up key-based SSH access. It also creates an SSH alias for you or other applications to use. You can close the setup window and connect from the Sync task bar utility or Settings.
- Imported aliases: Sync reads the main SSH config file and uses the entry as-is without an alternate key. Manage imported aliases in your SSH configuration file; you cannot rename them in Sync. If you do not have password based access, set up a key-based alias in your main SSH config file first.
- Docker access is optional for connecting through SSH. Model Launcher needs your login user to run Docker without sudo. After adding a device with a username and password, Sync checks Docker access; if Configure Docker Group? appears, Confirm adds the named user to the existing docker group and Skip leaves the account unchanged. Membership in the docker group can grant root-level control of the device. Sync does not install Docker or change Docker socket permissions. For manual setup, see Docker's Manage Docker as a non-root user guide. (Added in 0.148.0-153.)
- Connection type: Sync uses a direct connection when it can reach the device without Tailscale. Set up Tailscale before you need access from another network; once Tailscale is set up, Sync chooses the connection type for you. You can also use the saved SSH alias for separate terminal sessions and SSH-enabled apps.
- Delete removes the saved device and disconnects Sync. Models and files remain on the device, and Delete does not guarantee that remote processes stop. To remove a model and its files, uninstall the model first; re-adding the device does not restore its model setup in Sync. A model using LAN access can remain reachable after deletion (Sync warns you if it cannot check the endpoint). Before deleting: finish or cancel any model task in progress, switch a model from LAN to Localhost or uninstall it, and delete its cluster first if it belongs to one.
- Troubleshooting, the device does not appear in discovery: check that the device is powered on and connected to the network; the network must support mDNS. If the network blocks discovery or the device does not broadcast its name, select Add a device manually and enter its hostname or IP address.
- Troubleshooting, the SSH connection fails: check the hostname or IP address, SSH port, and login details; make sure SSH is running and the network allows access to its port; for an imported alias, check that it still works from a terminal on your laptop; read the error in Sync. If it reports a host-key mismatch, check that the address still belongs to the device before changing the saved key. If direct access is no longer available, use a Tailscale connection you have already set up or return to a network that can reach the device.
- Troubleshooting, Docker access cannot be set up: if Docker Group Not Configured appears, read the result and select Continue. The device remains in Sync and you can still connect through SSH. For Model Launcher, fix the Docker access check from Settings > Models.
- Earlier docs (0.117.3-9) described the add-device menu as Settings > Devices > Add Device and listed `~/.ssh/config` / `C:\Users\<user-name>\.ssh\config` as the import source; the current page only says the main SSH config file on your laptop.
- Release 0.117.3-9: the same host can be added again with a different user account; device discovery no longer lists the local machine; connections over mDNS return authentication errors correctly.
- Release 0.100.18: tildes are expanded when importing an SSH config; the same device can no longer be added twice under a different name.
- Release 0.97.6: multiple concurrent connections; renaming a device also updates its SSH alias.
- Release 0.148.0-153: a device stays disconnected after you disconnect it; adding or importing a device from Settings completes onboarding.
- Source: https://docs.nvidia.com/sync/latest/connections.html (NVIDIA Sync 0.148.0-153, last updated Oct 30, 2026, retrieved 2026-11-14).

## Related

- [tailscale-connections](./tailscale-connections.md)
- [Getting Started](../getting-started/README.md)
- [Model Launcher](../models/model-launcher.md)
- [Cluster](../cluster/README.md)
- [Applications](../applications/README.md)
