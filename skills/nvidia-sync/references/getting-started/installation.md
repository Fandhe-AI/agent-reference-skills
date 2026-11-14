# Getting Started and Installation

Install NVIDIA Sync on a laptop, add a remote Linux device, connect to it, and launch a terminal or application.

## Signature / Usage

```bash
curl -fsSL https://workbench.download.nvidia.com/stable/linux/gpgkey | sudo tee -a /etc/apt/trusted.gpg.d/ai-workbench-desktop-key.asc
echo "deb https://workbench.download.nvidia.com/stable/linux/debian default proprietary" | sudo tee -a /etc/apt/sources.list
sudo apt update
sudo apt install nvidia-sync
```

The application comes as a Debian package on Ubuntu. The commands above configure the package repository, update the package lists, and install NVIDIA Sync.

## Options / Props

| OS | Step 1 | Step 2 | Step 3 | Step 4 |
| --- | --- | --- | --- | --- |
| Windows | Download the Windows installer | Double-click the installer .exe file. | Accept the license agreement | Finish the onboarding |
| Mac OS | Download the Mac application | Drag and drop it into your Applications folder | Open it in the Applications folder | Accept the license agreement |

## Notes

- Workflow: have a Linux system on your network with a running SSH server; have username and password based access to the device (or an existing SSH alias); install NVIDIA Sync on your laptop; add the device and connect to it; launch a remote terminal or application.
- Special features for DGX Sparks and Stations: Spark discovery through mDNS without the IP address; the Cluster Assistant sets up the ConnectX-7 network between multiple Sparks; the Model Launcher sets up a containerized model on Sparks or a Station.
- Selecting Default Applications: when you first install Sync, you are asked to enable installed applications for launch. NVIDIA Sync scans your laptop for a fixed list of applications, and you can add or remove those applications in Settings.
- Next steps: Adding and Connecting Devices (connections), Applications, Model Launcher (models).
- Source: https://docs.nvidia.com/sync/latest/getting-started.html (NVIDIA Sync 0.148.0-153, last updated Oct 30, 2026, retrieved 2026-11-14).

## Related

- [overview.md](./overview.md)
- [Direct Connections](../connections/direct-connections.md)
- [Applications](../applications/applications.md)
- [Model Launcher](../models/model-launcher.md)
