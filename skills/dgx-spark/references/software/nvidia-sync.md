# NVIDIA Sync

System tray utility for Windows, macOS, and Ubuntu that lets users manage DGX Spark and other remote Linux systems from a local computer on the same network.

Streamlines SSH connections, port forwarding, and tunnel management, letting local applications target remote systems without manual configuration.

## Key Features

- One-click application launching for supported IDEs and tools including VS Code, Cursor, and NVIDIA AI Workbench
- Direct DGX Dashboard access without manual tunnel setup
- Tailscale integration option for secure remote access outside the local network

## Getting Started

1. Install NVIDIA Sync on your local computer
2. Add your DGX Spark via device discovery or manual entry (hostname/IP and credentials)
3. Establish a connection to the device
4. Launch applications or access the DGX Dashboard through the Sync menu

## Notes

- After initial setup, DGX Spark broadcasts its hostname across the local network using multicast DNS (mDNS), enabling automatic discovery in NVIDIA Sync.
- Full guidance covering installation, device management, Tailscale configuration, custom applications, and troubleshooting is in the [NVIDIA Sync User Guide](https://docs.nvidia.com/sync/latest/index.html).

## Related

- [Software Overview](./software-overview.md)
- [DGX Dashboard](./dgx-dashboard.md)
