# NVIDIA Sync

System tray utility for Windows, macOS, and Ubuntu that lets users manage DGX Spark and other remote Linux systems from a local computer on the same network.

Streamlines SSH connections, port forwarding, and tunnel management, letting local applications target remote systems without manual configuration.

## Signature / Usage

```text
1. Install NVIDIA Sync on your laptop.
2. Add your DGX Spark to NVIDIA Sync.
3. Launch an application on your DGX Spark through NVIDIA Sync.
```

Official "Key Capabilities":

- Direct connections: add a device on your local network using device discovery, a hostname or IP address, or an imported SSH alias.
- Tailscale connections: access your DGX Spark when you are not on the same network.
- Applications: launch supported IDEs, tools, and custom scripts on your DGX Spark with a click.
- Cluster Assistant: cluster your DGX Spark systems without manually running commands in a terminal. For physical cable requirements and ConnectX-7 network background, see ConnectX-7 Networking.

## Notes

- After initial setup, DGX Spark broadcasts its hostname across the local network using multicast DNS (mDNS), enabling automatic discovery in NVIDIA Sync.
- Full guidance covering installation, device management, Tailscale configuration, custom applications, and troubleshooting is in the [NVIDIA Sync User Guide](https://docs.nvidia.com/sync/latest/index.html).
- The dedicated `nvidia-sync` skill in this repository carries the distilled reference for the full user guide, including the Cluster Assistant wizard and ConnectX-7 network verification.

## Related

- [Software Overview](./software-overview.md)
- [DGX Dashboard](./dgx-dashboard.md)
- [Spark Stacking (ConnectX-7 Networking)](../system-config/spark-stacking.md)
- The `nvidia-sync` skill (categories: getting-started / connections / cluster / applications)
