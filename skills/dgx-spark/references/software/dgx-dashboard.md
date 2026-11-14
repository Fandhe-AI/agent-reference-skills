# DGX Dashboard

Built-in dashboard on DGX Spark offering real-time operational metrics, system updates, configuration settings, and integrated Jupyter Notebook access.

## Signature / Usage

Remote access over a manually created SSH tunnel, then open `http://localhost:11000` in the browser:

```bash
ssh -L 11000:localhost:11000 <username>@<IP or spark-abcd.local>
```

### Access Methods

- Local: click "Show Apps" in Ubuntu's bottom-left corner, then select the "DGX Dashboard" shortcut to launch it in the default browser.
- Via NVIDIA Sync: connect to the device in NVIDIA Sync and click the "DGX Dashboard" button to open it at `http://localhost:11000`.
- Manual SSH tunnel: the command above.

### Integrated JupyterLab

- JupyterLab creates a virtual environment in the specified working directory and installs recommended packages upon startup.
- A new working directory generates a new environment.
- Each user account receives an assigned port defined in `/opt/nvidia/dgx-dashboard-service/jupyterlab_ports.yaml`.
- Remote access requires SSH tunneling of that port (managed automatically through NVIDIA Sync).

### Administrator Policy Settings

Administrators can restrict which dashboard features are available to users. The dashboard reads these restrictions from a root-owned JSON file at `/opt/nvidia/dgx-dashboard/settings.json`. To prevent users from installing updates through the dashboard, create the file with the following content:

```json
{
  "update": {
    "enabled": false
  }
}
```

Restart the dashboard service to apply the change immediately; otherwise the dashboard applies the change within 10 minutes:

```bash
sudo systemctl restart dgx-dashboard.service
```

## Options / Props

Supported policy fields in `settings.json`:

| Field | Description |
| --- | --- |
| `update.enabled` | Enables or disables the dashboard update interface and update actions. Defaults to true. |
| `wifiAssistant.enabled` | Allows or disallows the Wi-Fi Assistant. |

## Notes

- Administrative privileges (sudo) are required to run updates and change the device name. If an administrator has disabled updates, the dashboard shows the "Updates Disabled" state regardless of sudo access.
- The dashboard reads policy settings only from `settings.json`. If Landscape manages this file, the dashboard disables update operations and shows the "Updates Disabled" state; disabling updates in Landscape through any other mechanism does not change the dashboard.
- Wi-Fi Assistant (October 2026 Release): lets users join a new Wi-Fi network when DGX Spark is used in appliance mode (without a keyboard, mouse, and display).
- Source: https://docs.nvidia.com/dgx/dgx-spark/dgx-dashboard.html (retrieved 2026-11-14)

## Related

- [Software Overview](./software-overview.md)
- [NVIDIA Sync](./nvidia-sync.md)
- [Release Notes](../release-notes/release-notes.md)
