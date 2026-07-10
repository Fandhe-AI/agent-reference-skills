# DGX Dashboard

Built-in dashboard on DGX Spark offering real-time operational metrics, system updates, configuration settings, and integrated Jupyter Notebook access.

## Key Features

### Integrated JupyterLab Environment

- Automatically creates virtual environments in specified working directories
- Installs recommended packages upon startup
- Generates new environments when accessing different directories
- Each user account receives an assigned port defined in `/opt/nvidia/dgx-dashboard-service/jupyterlab_ports.yaml`
- Remote access requires SSH tunneling (managed automatically through NVIDIA Sync)

## Access Methods

### Local Access

Click "Show Apps" in Ubuntu's bottom-left corner, then select the "DGX Dashboard" shortcut to launch it in the default browser.

### Remote Access

**Via NVIDIA Sync**: Connect to the device in NVIDIA Sync and click the "DGX Dashboard" button to open it at `http://localhost:11000`.

**Manual SSH Tunnel**:

```bash
ssh -L 11000:localhost:11000 <username>@<IP or spark-abcd.local>
```

Then navigate to `http://localhost:11000`.

## Notes

- Administrative privileges are required to execute updates and modify device names.

## Related

- [Software Overview](./software-overview.md)
- [NVIDIA Sync](./nvidia-sync.md)
