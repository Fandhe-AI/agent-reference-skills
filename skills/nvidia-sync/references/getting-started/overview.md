# NVIDIA Sync Overview

NVIDIA Sync is a system tray utility for Windows, Mac, and Ubuntu that simplifies launching applications and containers on remote Linux systems.

## Signature / Usage

```text
Supported devices: DGX Spark, GB10, DGX Station, or other SSH-accessible Linux hosts on your LAN or in the cloud.

General workflow:
1. Add or import a remote device to NVIDIA Sync.
2. Connect to the device through NVIDIA Sync.
3. One-click launch an IDE or application on the device.
4. Add a custom application to the device and launch it.
5. Use NVIDIA Sync to stop applications running on the device.
6. Disconnect from the device through NVIDIA Sync.
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Windows | Installer | Download the installer, double-click the `.exe` file, accept the license, and complete setup |
| Mac | Application bundle | Download the application, drag it into the Applications folder, then launch it |
| Ubuntu | APT package | Configure the NVIDIA repository, run `sudo apt update`, then `sudo apt install nvidia-sync` |

Ubuntu repository setup:

```bash
curl -fsSL https://workbench.download.nvidia.com/stable/linux/gpgkey | sudo tee -a /etc/apt/trusted.gpg.d/ai-workbench-desktop-key.asc
echo "deb https://workbench.download.nvidia.com/stable/linux/debian default proprietary" | sudo tee -a /etc/apt/sources.list
sudo apt update
sudo apt install nvidia-sync
```

## Notes

- After installation, you can one-click launch local IDEs and applications, such as VS Code, Cursor, and AI Workbench directly from the NVIDIA Sync UI.
- First launch (onboarding) covers five stages: EULA acceptance, local IDE selection, adding a remote Linux device, establishing connection, and launching an application.
- Tailscale integration creates a secure tunnel to a device on your private network, letting you access DGX devices for compute and inference without being on that network.
- Cluster support (Cluster Assistant) configures multiple DGX Spark devices with ConnectX-7 interconnects for multi-node libraries like NCCL and MPI.

## Related

- [terminology.md](./terminology.md)
- [limitations.md](./limitations.md)
