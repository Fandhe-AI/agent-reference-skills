# NVIDIA Sync Overview

NVIDIA Sync is a system tray utility for Windows, Mac, and Ubuntu that simplifies launching applications and containers on remote Linux systems.

## Signature / Usage

Ubuntu installation via the NVIDIA APT repository:

```bash
curl -fsSL https://workbench.download.nvidia.com/stable/linux/gpgkey | sudo tee -a /etc/apt/trusted.gpg.d/ai-workbench-desktop-key.asc
echo "deb https://workbench.download.nvidia.com/stable/linux/debian default proprietary" | sudo tee -a /etc/apt/sources.list
sudo apt update
sudo apt install nvidia-sync
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Windows | Installer | Download the installer, double-click the `.exe` file, accept the license, and complete setup |
| Mac | Application bundle | Download the application, drag it into the Applications folder, then launch it |
| Ubuntu | APT package | Configure the NVIDIA repository, run `sudo apt update`, then `sudo apt install nvidia-sync` |

## Notes

- Supported devices: DGX Spark, GB10, DGX Station, or other SSH-accessible Linux hosts on your LAN or in the cloud.
- General workflow: add or import a remote device; connect to it; one-click launch an IDE or application; add and launch a custom application; stop applications running on the device; disconnect.
- After installation, you can one-click launch local IDEs and applications, such as VS Code, Cursor, and AI Workbench directly from the NVIDIA Sync UI.
- Installers download from build.nvidia.com/spark/connect-to-your-spark/sync.
- First launch (onboarding) covers five stages: EULA acceptance, selecting the local IDEs you want NVIDIA Sync to launch and manage, adding a remote Linux device, establishing connection, and launching an application.
- Tailscale integration creates a secure tunnel to a device on your private network, letting you access DGX devices for compute and inference without being on that network.
- Cluster support (Cluster Assistant) configures multiple DGX Spark devices with ConnectX-7 interconnects for multi-node libraries like NCCL and MPI.
- Release 0.100.18: the update may prompt you to allow access to "NVIDIA Sync Safe Storage"; this is expected, select Always Allow. NVIDIA Sync starts under Xwayland on Ubuntu 26.04 (corrects system tray positioning).

## Related

- [terminology.md](./terminology.md)
- [limitations.md](./limitations.md)
- [release-notes.md](./release-notes.md)
