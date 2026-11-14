# System Specifications

DGX Spark incorporates NVIDIA Grace Blackwell architecture with an integrated GPU and CPU, a 20-core Arm processor, and 128 GB unified system memory in a compact desktop configuration.

## Specifications

| Component | Specification |
| --- | --- |
| GPU | Blackwell Architecture, 5th Gen Tensor Cores, 4th Gen RT Cores |
| CPU | 20-core Arm (10 Cortex-X925 + 10 Cortex-A725) |
| Memory | 128 GB LPDDR5x, 256-bit interface, 4266 MHz, 273 GB/s bandwidth |
| Storage | 1 TB or 4 TB NVMe M.2 with self-encryption |
| Network | 1x RJ-45 (10 GbE), ConnectX-7 Smart NIC, Wi-Fi 7, Bluetooth 5.4 |
| Connectivity | 4x USB Type-C, 1x HDMI 2.1a, HDMI multichannel audio |
| Video Processing | 1x NVENC, 1x NVDEC |

## Notes

- The Hardware Overview page lists 128 GB of memory. The October 2026 Release notes state that the system software supports both 64 GB and 128 GB configurations, and several playbooks list "64GB or 128GB Unified Memory"; both statements are kept as published (see [Release Notes](../release-notes/release-notes.md)).

## Related

- [Physical Specifications](./physical-specs.md)
- [Performance Specifications](./performance-specs.md)
- [Connectivity and I/O](./connectivity-and-io.md)
- [Power and Thermal Management](./power-and-thermal.md)
