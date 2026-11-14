# System Overview

Overview page of the DGX Spark User Guide: how the system can be accessed and used, key capabilities, system architecture, preinstalled software, and getting started.

## Signature / Usage

Access methods (all fully supported and equally capable; they can be mixed or used simultaneously):

```text
Local Access   : keyboard, mouse, and monitor connected to the system
Network Access : SSH, NVIDIA Sync, or remote desktop tools from another computer on the same network
Hybrid Usage   : local one day, over the network the next, or both at once
```

### Key Capabilities

- Run Inference: deploy models for real-time AI applications
- Develop AI Models: train and fine-tune models with up to 200 billion parameters
- Process Data: handle large datasets with high-performance computing
- Experiment Freely: test new ideas without cloud computing costs
- Scale Workloads: connect multiple systems for larger projects

### System Architecture

- Unified Memory: 128 GB of high-bandwidth memory for large models
- High-Performance Computing: 20-core ARM64-based processor with integrated GPU
- Advanced Connectivity: Wi-Fi 7, 10 GbE, ConnectX-7 NIC, and multiple I/O options
- Compact Form Factor: 150mm x 150mm x 50.5mm desktop design

### Software

- NVIDIA DGX OS: optimized operating system for AI workloads
- Development Tools: CUDA, cuDNN, and NVIDIA's development ecosystem
- Container Support: Docker and NVIDIA Container Runtime
- NGC Integration: access to NVIDIA's container registry

### Getting Started

1. Initial Setup: follow Initial Setup - First Boot.
2. Explore Examples: try sample workloads to understand capabilities.
3. Configure Development Environment: set up your preferred tools and frameworks.
4. Start Building: begin your AI development projects.

## Notes

- Use of the NVIDIA CUDA Toolkit preinstalled on DGX Spark is subject to the NVIDIA CUDA Toolkit End User License Agreement.
- The official page states 128 GB of unified memory, while the October 2026 Release notes and several playbooks state that 64 GB and 128 GB configurations are supported. Both statements are kept as published; see [Release Notes](../release-notes/release-notes.md).
- For the most up-to-date tutorials and examples, the official page points to https://build.nvidia.com/spark (see [playbooks](../playbooks/README.md)).
- Source: https://docs.nvidia.com/dgx/dgx-spark/system-overview.html (retrieved 2026-11-14)

## Related

- [System Configuration and Operation](./system-config-and-operation.md)
- [UEFI Settings](./uefi-settings.md)
- [First Boot](../setup/first-boot.md)
- [Hardware Overview](../hardware/README.md)
