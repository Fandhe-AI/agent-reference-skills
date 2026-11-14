# DGX Spark Release Notes

Release notes for the DGX Spark: new features, fixed issues, and software version updates (November 2025 to October 2026).

## Signature / Usage

Current software versions (DGX Spark Founders Edition):

| Component | Version |
|-----------|---------|
| NVIDIA DGX OS | 7.6.0 |
| NVIDIA GPU Driver | 580.178.04 |
| NVIDIA CUDA Toolkit | 13.0.3 |
| NVIDIA TensorRT | 10.14.1 |
| Canonical Kernel | 7.0.0-1019 |
| UEFI | 1.111.17 |
| Embedded Controller (EC) | 3.13.7 |
| USB Power Delivery (USB PD) | 0.5.25 |
| Trusted Platform Module (TPM) | 7.516.1 |
| System on Chip (SoC) | 2.158.15 |

Apply a release (OS packages and firmware) — from OS and Component Update:

```bash
sudo apt update
sudo apt dist-upgrade
sudo fwupdmgr refresh
sudo fwupdmgr upgrade
sudo reboot
```

## Notes

- Source: https://docs.nvidia.com/dgx/dgx-spark/release-notes.html (no version in URL; content as of the October 2026 Release, retrieved 2026-11-14).
- The Display Reserved Memory option range differs between pages: the July 2026 entry above says 2GB (default) or 4GB, while the UEFI Settings page (Change Display Reserved Memory) lists Auto, 0.5 GB, 1 GB, 2 GB, or 4 GB. Both are kept as the official text; see [UEFI Settings](../system-config/uefi-settings.md).
- Native cloud-init (October 2026) requires the `nvidia-spark-cloud-init` package; see [Custom Installation with Cloud-Init](../enterprise/enterprise-custom-install.md).
- These release versions apply only to the DGX Spark Founders Edition. GB10-based partner systems may not receive updates at the same time.
- The official page points to the Known Issues page for the current known-issues list.

### Releases

#### October 2026

What's New:

- DGX Dashboard Wi-Fi Assistant: lets users join a new Wi-Fi network when DGX Spark is used in appliance mode (without a keyboard, mouse, and display).
- Dynamic Display Reserved Memory: adds a UEFI option to automatically optimize the memory carveout to match display usage. Systems without connected displays can automatically adjust to the minimum carveout (512 MB).
- DGX Spark Skills (available in late October): workflow-focused resources for agents, available through NVIDIA Sync (OpenCode). They provide DGX Spark-specific knowledge and guidance for troubleshooting, clustering multiple DGX Spark systems, device maintenance, playbook discovery, support escalation, awareness of official documentation, and user forum search.
- New Kernel Support: Linux 7.0 kernel (previously 6.17), with security updates and improved file and memory management:
  - Large page frame number maps (pfnmap)
  - Splitting extended GPU memory (EGM) into 1 GB chunks
  - Memory System Resource Partitioning and Monitoring
- Support for 64 GB Systems: the system software supports both 64 GB and 128 GB configurations, so users do not have to match software updates with hardware. Dashboards and other system information automatically reflect the available memory.
- Native Cloud-init Support: simple configuration files can automate system configuration and provisioning at first boot through the cloud-init initialization framework. Enterprise environments can deploy custom configurations at first boot.

Fixed Issues:

- DKMS Kernel-Module Build Failures after an nvidia-installer installation.
- Delayed wake-up when multiple threads wait on the same Vulkan semaphore.
- Black screens after modesets in X11 applications using the Present extension.
- OpenGL buffers allocated with glBufferStorage and no storage flags migrated from GPU memory to host memory.
- Fans stopped responding in headless (appliance) mode at low idle power draw.
- Ukrainian language option missing from the initial system configuration screens (it was available only after login in Settings).

#### July 2026

What's New:

- Improved Memory Management: the included driver enhances Out-of-Memory (OOM) handling with GB10's unified memory architecture. User feedback is now available when the system encounters memory pressure.
- Adjustable Display Reserved Memory: toggled between 2GB (default) and 4GB through the system BIOS. Users in appliance mode do not need to change default settings.
- Enterprise Management Feature Enhancements (cloud-init and image customization):
  - Cloud-init Network Protocol Support: in addition to direct USB connections, Cloud-init supports DHCP, HTTP, and TFTP.
  - FastOS Recovery Image Customization: Cloud-init can customize the NVIDIA-provided FastOS recovery image for the DGX Spark Founders Edition, in addition to DGX OS.

Fixed Issues:

- System and Display Instability When Hot-Plugging Displays.

#### June 2026

What's New:

- Out-of-Box-Experience (OOBE) Enhancements:
  - Over-the-Air (OTA) updates are not installed by default during initial setup; install them after setup.
  - NemoClaw Playbook: after first boot, the DGX Spark playbook site opens with the NemoClaw playbook prominently displayed (sandboxed local agent).
- NVIDIA Sync Cluster Assistant: available on the Settings page; connects up to three devices without a network switch, and up to four devices using a switch.
- NCCL (Version 2.30u1): updated support for connecting three DGX Spark systems in a ring topology.

#### April 2026

What's New (Enterprise Features):

- Enterprise Management Guide (Enterprise Manageability).
- Skip the Automated OOBE for IT Administrator Provisioning.
- USB and Local Repository Support for Installations and Updates.
- Support for Air Gapped Deployment and Updates.
- Customized Enterprise ISOs Through cloud-init.
- DGX Dashboard Enhancements: release highlights are provided for software releases.

Fixed Issues:

- Bluetooth Keyboard Pairing modal not appearing in some instances.
- Unable to Detect Network During System Setup (Wi-Fi and Ethernet).

#### March 2026

What's New:

- Partner Factory Updates: firmware update to facilitate GB10 partner factory updates.

#### February 2026

Fixed Issues:

- Improved Performance with Multiple DGX Spark Systems: addressed a performance regression noted after updating to DGX OS 7.4.0.

#### January 2026

What's New:

- Power Management: hot plug support for the ConnectX-7 network adapter, saving up to 18W when not in use.
- Bluetooth Audio Support (headphones and headsets).
- Additional Security Controls: Wi-Fi and Bluetooth can be disabled in UEFI.

Fixed Issues:

- Improved Monitor Support (TVs, multi-monitor, non-native resolutions and refresh rates).
- Improved Peripheral Setup: smoother and more complete OOBE navigation.

#### November 2025

What's New:

- New DGX OS kernel: Ubuntu 6.14 Hardware Enablement (HWE) kernel stack.
- JupyterLab updated to CUDA 13.0.2 and the latest PyTorch.

Fixed Issues:

- Improved memory reporting in DGX Dashboard (consistent with CUDA guidance for unified memory systems).
- Image Generation in JupyterLab: Stable Diffusion XL Playbook example now runs end to end.
- Improved Peripheral Interoperability (USB-C, monitors, Bluetooth, Wi-Fi access points).
- Improved recovery image reliability (macOS; multiple external USB-C drives).
- Keyboard accessibility improvements: entire system setup can be completed with keyboard only.

## Related

- [Known Issues](./known-issues.md)
- [DGX OS](../software/dgx-os.md)
- [OS and Component Update](../system-update/os-and-component-update.md)
