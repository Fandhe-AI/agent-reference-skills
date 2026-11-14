# Custom Applications

Register custom bash scripts as launchable applications on a connected remote device, with port forwarding (SSH tunneling) to expose a web-based service running on the remote.

## Signature / Usage

```text
Settings > Custom > Add New / Edit
```

1. Connect to an existing device.
2. Verify that bash is installed.
3. Open Settings > Custom tab.
4. Click Add New, or click Edit on an existing script.
5. Enter an identifying name and desired port in the Add Custom modal.
6. Write your bash script in the Launch Script code editor.
7. Configure the launch settings.
8. Click Add or Update.

You can also add a script from the pop-up menu by clicking Add New in the Custom section. To run: connect to a device, find your script under the Custom section in the main window, and click it. To stop: click the x on the running script in the pop-up window, which stops the service and releases the port.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Name | string | Identifying name for the custom script |
| Port | number | Port assigned to the script; required even if the script runs in the background |
| Launch Script | bash | Bash script body; saved locally in the application and on the remote device. No interpreter line (for example `#!/bin/bash`) is needed, but there should be a new line at the end of the script |
| Auto open in browser at the following path | string (URL path) | Opens your default web browser after the application starts, at `http://localhost:<port>/<URL Path>`; an unset URL path loads the root of the web application |
| Launch in Terminal | boolean | Opens an SSH terminal to the remote with the script running in it; the terminal stays connected even if the script fails |

### Remote files

Relative to `~/.config/NVIDIA/Sync/` (or `$XDG_CONFIG_HOME/NVIDIA/Sync/` when the remote user's environment sets `XDG_CONFIG_HOME`):

| File or Directory | Purpose |
| --- | --- |
| `config/custom.json` | Custom app names, ports, and launch settings |
| `bin/scripts/port-<port>.bash` | The launch script for the app on that port |
| `bin/nvsync-managed-port.sh` | The helper Sync uses to run and stop custom apps |
| `logs/scripts/` | Background output and error logs named `port-<port>.out` and `port-<port>.err` |
| `session/ports/port-<port>.pgid` | Records Sync uses to track and stop the app's managed processes |

## Notes

- Custom scripts let you write and run bash scripts on a connected device and access web-based services through an SSH tunnel to your local computer, so you can define, launch, and connect to webapps, containers, and servers on the remote device through a port you define. You can also use this to run background tasks like downloading data and models.
- Scripts are created on a per-device basis and run in the user's home directory on the remote device, not the directory where the script is stored; use `cd` in the launch script if the app needs a different working directory. NVIDIA Sync runs the script as your user with a bash command, and bash is the only prerequisite. Add or import the device and connect to it before adding a script.
- When you create or edit a custom script, NVIDIA Sync automatically saves or updates it on the remote device. Once added, the script shows in the app when it is connected to the device, and you run it by selecting the associated port.
- Port assignment binds the local and remote ports until you stop the custom application or disconnect NVIDIA Sync. For example, port 8000 binds local port 8000 to remote port 8000, and the script is at `~/.config/NVIDIA/Sync/bin/scripts/port-8000.bash`.
- Leaving both launch options blank runs the script in the background without opening any interface. If Launch in Terminal is enabled, an OS terminal window opens with the script running interactively. If Auto open in browser is enabled, NVIDIA Sync waits for the service to become available (up to 30 seconds) and then opens the URL.
- Your launch script determines where the application, models, and data are stored; relative paths refer to your home directory unless the script changes directories. Docker images and volumes use Docker's storage. Model Launcher keeps its downloads, task logs, and model setup records under `model-launcher/` in the same Sync directory; its managed OpenCode app uses the custom app files above, while the OpenCode workspace is separate at `~/opencode`.
- Resetting remote Sync files: stop running custom apps and models, then delete `~/.config/NVIDIA/Sync/` on the remote device (or the `XDG_CONFIG_HOME` location). This removes your custom app definitions, scripts, and logs, along with Model Launcher's downloads and settings. Files elsewhere, including your `~/opencode` workspace and Docker images and volumes, remain, and deleting the directory does not stop running processes. Reconnect, add your custom apps again, and set up any models you want to use.
- Port conflicts show a clear error; release the port or stop the application using it, then retry. NVIDIA Sync uses a bash login shell, so `$PATH` (including `/usr/local/cuda/bin`) should match a manual SSH session.
- Release 0.148.0-153: closing a custom port stops the remote processes for that port, including a cleanup that failed earlier; a custom app no longer stays stuck launching when its address check does not finish (each check stops after two seconds).
- Source: https://docs.nvidia.com/sync/latest/applications.html (Custom Scripts and Applications section; NVIDIA Sync 0.148.0-153, last updated Oct 30, 2026, retrieved 2026-11-14).

## Related

- [Applications](./applications.md)
- [Model Launcher](../models/model-launcher.md)
- [Connections](../connections/README.md)
- [Cluster](../cluster/README.md)
