# Custom Applications

Register custom bash scripts as launchable applications on a connected remote device, with optional port forwarding (SSH tunneling) to expose a web-based service running on the remote.

## Signature / Usage

```text
Settings > Custom > Add New / Edit
```

1. Connect to an existing device
2. Verify bash is installed on the remote device
3. Click **Add New**, or **Edit** on an existing script
4. Enter an identifying name and desired port
5. Write the bash script in the code editor
6. Configure launch settings
7. Click **Add** or **Update**

To run: click the script name under the **Custom** section. To stop: click the **x** on the running script, which releases the port.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Name | string | Identifying name for the custom script |
| Port | number | Port assigned to the script; required even if the script runs in the background. Binds local and remote ports until the application stops or NVIDIA Sync disconnects |
| Script | bash | Bash script body, executed as the remote user in the user's home directory. No interpreter line (e.g. `#!/bin/bash`) required; must include a new line at the end of the script |
| Auto open in browser at the following path | string (URL path) | Opens the default browser to `http://localhost:<port>/<URL Path>` after the script starts |
| Launch in Terminal | boolean | Opens an SSH terminal showing the script's real-time output |

## Notes

- Custom scripts require only that bash is installed on the remote device.
- They execute in the user's home directory and can run background tasks, access web-based services, and launch containers through SSH tunneling.
- Port assignment binds local and remote ports until the application stops or NVIDIA Sync disconnects.
- Leaving both "Auto open in browser" and "Launch in Terminal" blank runs the script silently in background mode.
- If a port is already in use, NVIDIA Sync displays a clear error instead of failing silently.
- NVIDIA Sync uses a `bash` login shell, so `$PATH` (including `/usr/local/cuda/bin`) should match a manual SSH session; mismatches here are a common source of "command not found" issues in custom scripts.

## Related

- [Applications](./applications.md)
- [Connections](../connections/README.md)
- [Cluster](../cluster/README.md)
