# Terminology

Definitions of key terms used throughout the NVIDIA Sync documentation.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Adding a device | Device management | Manually configuring SSH details so that NVIDIA Sync can access the device and manage key-based access. This requires the device password |
| Importing a device | Device management | Selecting an existing SSH alias from your local main SSH configuration file for NVIDIA Sync to use. This bypasses manual configuration in the Sync application |
| Connecting a device | Device management | Activating the SSH connection to an added or imported device through NVIDIA Sync so that you can launch applications on it |
| Adding a Tailscale device | Connection | Enabling the Tailscale integration and following the steps to add an added or imported device to the same tailnet as your NVIDIA Sync application |
| Direct connection | Connection | Connecting to a device on the same network as your laptop without using the Tailscale integration |
| Tailscale connection | Connection | Connecting to a device using the Tailscale integration |
| ConnectX-7 | Hardware | High-bandwidth network adapters used on DGX Spark for data-plane links between nodes in a cluster |
| Quad Small Form-factor Pluggable (QSFP) | Hardware | Cable and module form factor used for ConnectX-7 network connections between DGX Spark systems or between a DGX Spark and a switch |
| Cluster | Concept | A named set of 2–4 DGX Spark devices that NVIDIA Sync configures to communicate over ConnectX-7 interconnect links for multi-node workloads |
| Cluster Assistant | Feature | A guided workflow in NVIDIA Sync that validates devices, applies ConnectX-7 network settings, checks link performance, and configures SSH between DGX Spark nodes |
| NVIDIA Collective Communications Library (NCCL) | Library | A library often used for multi-GPU and multi-node collective communication in AI workloads |
| Message Passing Interface (MPI) | Standard | A standard for distributed communication commonly used in multi-node technical and AI applications |
| Over-the-air (OTA) update | Concept | A delivered system software update for DGX Spark that is identified by an OTA version number in Sync readiness checks |
| User ID (UID) and group ID (GID) | Concept | Numeric identifiers for the Linux user and primary group on each node |

## Related

- [overview.md](./overview.md)
- [limitations.md](./limitations.md)
