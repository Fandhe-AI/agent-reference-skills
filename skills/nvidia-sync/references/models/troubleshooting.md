# Model Launcher Troubleshooting and Reference

Recovery steps for Model Launcher setup, start, stop, endpoint, API key, and uninstall problems, plus model status meanings and remote file locations.

## Signature / Usage

```text
NVIDIA Sync > Settings > Models   (model status and available recovery actions)
```

Remote Model Launcher directory (default, under the connected user's home directory):

```text
~/.config/NVIDIA/Sync/model-launcher/
```

## Options / Props

Model status shown in the Models tab:

| Status | Meaning |
| --- | --- |
| Not Running | The model is set up and stopped |
| Starting | The container and model are starting |
| Running | The model is ready to serve requests |
| Stopping | Sync is stopping the model |
| Unknown | Sync cannot confirm the model's state |

Paths relative to the Model Launcher directory:

| File or Directory | Purpose |
| --- | --- |
| `cache/hub/` | Downloaded model files in Hugging Face cache format |
| `cache/images/` | Container image archives used to transfer images to cluster nodes |
| `cache/tools/` | Cached OpenCode and skills downloads |
| `cache/quarantine/` | Temporary downloads awaiting verification |
| `deployments/<deployment-id>/` | Model setup records, launch settings, and serving scripts |
| `deployments/<deployment-id>/runtime/<rank>/` | Files written by the serving container while the model runs |
| `deployments/<deployment-id>/opencode/` | The OpenCode binary and model connection settings managed by Sync |
| `operations/<operation-id>/` | Task records, progress, and `stdout.log` and `stderr.log` files |
| `bin/nvsync-job` | The remote program that runs Model Launcher tasks |

## Notes

- Start with the message NVIDIA Sync shows. Fix the reported cause before you try the action again. Keep the device powered on and connected during recovery; for a Spark cluster some checks and recovery actions need every Spark to be reachable. Wait for the current task to stop before you start another one; if Sync cannot confirm that a task stopped, use the recovery action it provides.
- Setup does not complete: Docker access (select Fix Now and follow the prompt), Storage (free the space Sync reports), Connection (reconnect to the device if Sync cannot run a check). Select Retry after you fix the issue. If setup was interrupted, reopen Settings > Models and select the same device or cluster. If Sync cannot tell whether setup finished, select Quit Task and wait until cancellation is confirmed before you start setup again.
- Quit Task failed: select View Error and follow the recovery step shown for each device; reboot or reconnect a Spark when Sync tells you to, then select Retry. Restarting NVIDIA Sync does not reboot the Spark, and setup stays unavailable until cancellation is verified.
- The model does not start: starting can take a few minutes. You might need to free memory, free port 18765, disable MIG on a Station, or review the container logs. Select Retry after you fix the issue; if Sync says startup appears stalled, stop the model and start it again.
- The model does not stop: reconnect to the device (the primary node for a Spark cluster) and select Stop again. Wait for Sync to confirm that the model stopped before you uninstall it.
- Model status cannot be checked (Unknown): check that the device is powered on and connected, then wait for the status check to finish. A disconnected device can keep its last shown model status, which does not show whether the model has changed since; disconnecting Sync does not stop the model on the device.
- The endpoint is unavailable: Endpoint Unavailable does not mean the model has stopped. Connect to the device (primary node for a cluster), wait for Sync to check the status, start the model if it is stopped and wait for Running, then copy the endpoint again. With Localhost, disconnecting closes the SSH tunnel and the old URL stops working; with LAN, a client using the device's network address can still reach the running model if it has a working network path. For Tailscale connections, the URL Sync shows uses its SSH tunnel. Stop the model before changing Localhost or LAN access; if the controls are disabled, wait for the status check and read the hint beside the control.
- The API key cannot be read or changed: try the action again; if the key remains visible but cannot be copied, copy it manually. To replace a key, stop the model, select Regenerate, and update each client with the new key.
- Uninstall fails: check that each device in the model setup is powered on and reachable, then select Try again or Retry Uninstall. The model remains configured until Sync confirms its removal. If no retry action is available, restart NVIDIA Sync, reopen Settings > Models, and try uninstall again.
- Uninstalling the model: stop frees memory; Uninstall removes the model files Sync set up. Stop the model, open Settings > Models, select Uninstall from the model actions menu, and read the removal preview before you confirm. Uninstall leaves your OpenCode workspace and sessions in place, and your original files in `~/.cache/huggingface/hub/`. It can retain shared or modified downloads and container images, as well as transfer archives left by interrupted tasks. Uninstall the model before deleting its device or cluster from Sync; Delete does not remove the model files.
- Remote files and storage: the model downloads under your user account on the remote device. If the remote environment sets `XDG_CONFIG_HOME` to an absolute path, the directory is `$XDG_CONFIG_HOME/NVIDIA/Sync/model-launcher/` instead. Within `cache/hub/` each model has a `models--<owner>--<model>/` directory; model files are stored in `blobs/`, with links to them under `snapshots/<revision>/`.
- Sync can reuse matching files from `~/.cache/huggingface/hub/` on the remote device: it copies and verifies the files for the recipe's model revision into its own cache and leaves the originals in place, so it still needs space for the copy. Model Launcher uses its own cache even if you set `HF_HOME` or `HF_HUB_CACHE` for other tools.
- For a Spark cluster, the primary node downloads missing model files and sends them to the other serving nodes; each serving node keeps its own model copy under its remote user's Sync directory. OpenCode is installed on the primary node. Installed container images are kept in Docker's image storage; `cache/images/` holds transfer archives, not installed images. Successful transfers remove their archives, and interrupted transfers can leave archives behind.
- Sync's storage check measures free space on the root filesystem, `/`. If your home directory, Sync directory, or Docker storage is on a separate filesystem, check that filesystem's free space too.
- Source: https://docs.nvidia.com/sync/latest/models/troubleshooting.html (NVIDIA Sync 0.148.0-153, last updated Oct 30, 2026, retrieved 2026-11-14).

## Related

- [model-launcher.md](./model-launcher.md)
- [Custom Applications](../applications/custom-applications.md)
- [Direct Connections](../connections/direct-connections.md)
