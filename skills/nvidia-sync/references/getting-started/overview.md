# NVIDIA Sync Overview

NVIDIA Sync is a system tray utility for Windows, Mac, and Ubuntu that simplifies launching applications and containers on remote Linux systems. Use it with DGX Spark, GB10, DGX Station, or other SSH-accessible Linux hosts on your LAN or in the cloud.

## Signature / Usage

Ubuntu installation via the NVIDIA APT repository (see [installation.md](./installation.md) for the step-by-step form):

```bash
curl -fsSL https://workbench.download.nvidia.com/stable/linux/gpgkey | sudo tee -a /etc/apt/trusted.gpg.d/ai-workbench-desktop-key.asc
echo "deb https://workbench.download.nvidia.com/stable/linux/debian default proprietary" | sudo tee -a /etc/apt/sources.list
sudo apt update
sudo apt install nvidia-sync
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Getting Started | page | Install NVIDIA Sync, complete onboarding, and learn the typical workflow |
| Release Notes | page | What's New and fixed issues for each NVIDIA Sync version |
| Adding and Connecting Devices | page | Add or import devices and connect directly or through Tailscale |
| Cluster Assistant | page | Configure ConnectX-7 interconnects and SSH for multi-node DGX Spark clusters |
| ConnectX-7 Cluster Network | page | Inspect, verify, or remove the ConnectX-7 cluster network plan on each node |
| Applications | page | Launch IDEs, custom scripts, port forwarding, and the DGX Dashboard |
| Model Launcher | page | Set up and run a model, configure network access, and use OpenCode |
| Resource Monitor | page | Monitor CPU, memory, and GPU utilization for a single device or a cluster |

## Notes

- The guide covers installation, connecting to devices, multi-node clustering, remote access over Tailscale, launching IDEs and custom applications, and using Model Launcher.
- NVIDIA Sync needs only the hostname on your network plus your username and password for the device. After that, you can one-click launch local IDEs and applications, such as VS Code, Cursor, and AI Workbench directly from the NVIDIA Sync UI.
- Custom Application feature: handles connection details, such as port forwarding, so that web applications or containers on the remote device can be accessed as if they were running locally.
- Cluster Assistant guides you through clustering multiple DGX Spark devices using the ConnectX-7 interconnect links, the first step to getting multi-node libraries and runtimes (like NCCL and MPI) to use the high-bandwidth ConnectX-7 network.
- Tailscale Integration creates a secure tunnel to a device on your private network, so you can access your DGX devices for compute and inference without being on that network.
- Release 0.100.18: the update may prompt you to allow access to "NVIDIA Sync Safe Storage"; this is expected, select Always Allow. NVIDIA Sync starts under Xwayland on Ubuntu 26.04 (corrects system tray positioning).
- Distinct from the dgx-spark skill (DGX Spark hardware, DGX OS, playbooks) and the nvidia-cuda skill (CUDA programming); this skill covers the NVIDIA Sync desktop app only.
- Source: https://docs.nvidia.com/sync/latest/index.html (NVIDIA Sync 0.148.0-153, last updated Oct 30, 2026, retrieved 2026-11-14).

## Related

- [installation.md](./installation.md)
- [terminology.md](./terminology.md)
- [limitations.md](./limitations.md)
- [release-notes.md](./release-notes.md)
