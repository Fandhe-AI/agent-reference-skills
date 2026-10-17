# DGX Spark Release Notes

Release notes for the DGX Spark: new features, fixed issues, and software version updates (November 2025 to July 2026).

## Signature / Usage

Current software versions (DGX Spark Founders Edition):

| Component | Version |
|-----------|---------|
| NVIDIA DGX OS | 7.5.0 |
| NVIDIA GPU Driver | 580.159.03 |
| NVIDIA CUDA Toolkit | 13.0.2 |
| Canonical Kernel | 6.17 |
| UEFI | 1.110.13 |
| Embedded Controller (EC) | 3.5.8 |
| USB Power Delivery (USB PD) | 0.5.22 |
| Trusted Platform Module (TPM) | 7.516.1 |
| System on Chip (SoC) | 2.155.11 |

Apply a release (OS packages and firmware) — from OS and Component Update:

```bash
sudo apt update
sudo apt dist-upgrade
sudo fwupdmgr refresh
sudo fwupdmgr upgrade
sudo reboot
```

## Releases

### July 2026

What's New:

- Improved Memory Management: the included driver enhances Out-of-Memory (OOM) handling with GB10's unified memory architecture. User feedback is now available when the system encounters memory pressure.
- Adjustable Display Reserved Memory: toggled between 2GB (default) and 4GB through the system BIOS. Users in appliance mode do not need to change default settings.
- Enterprise Management Feature Enhancements (cloud-init and image customization):
  - Cloud-init Network Protocol Support: in addition to direct USB connections, Cloud-init supports DHCP, HTTP, and TFTP.
  - FastOS Recovery Image Customization: Cloud-init can customize the NVIDIA-provided FastOS recovery image for the DGX Spark Founders Edition, in addition to DGX OS.

Fixed Issues:

- System and Display Instability When Hot-Plugging Displays.

### June 2026

What's New:

- Out-of-Box-Experience (OOBE) Enhancements:
  - Over-the-Air (OTA) updates are not installed by default during initial setup; install them after setup.
  - NemoClaw Playbook: after first boot, the DGX Spark playbook site opens with the NemoClaw playbook prominently displayed (sandboxed local agent).
- NVIDIA Sync Cluster Assistant: available on the Settings page; connects up to three devices without a network switch, and up to four devices using a switch.
- NCCL (Version 2.30u1): updated support for connecting three DGX Spark systems in a ring topology.

### April 2026

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

### March 2026

What's New:

- Partner Factory Updates: firmware update to facilitate GB10 partner factory updates.

### February 2026

Fixed Issues:

- Improved Performance with Multiple DGX Spark Systems: addressed a performance regression noted after updating to DGX OS 7.4.0.

### January 2026

What's New:

- Power Management: hot plug support for the ConnectX-7 network adapter, saving up to 18W when not in use.
- Bluetooth Audio Support (headphones and headsets).
- Additional Security Controls: Wi-Fi and Bluetooth can be disabled in UEFI.

Fixed Issues:

- Improved Monitor Support (TVs, multi-monitor, non-native resolutions and refresh rates).
- Improved Peripheral Setup: smoother and more complete OOBE navigation.

### November 2025

What's New:

- New DGX OS kernel: Ubuntu 6.14 Hardware Enablement (HWE) kernel stack.
- JupyterLab updated to CUDA 13.0.2 and the latest PyTorch.

Fixed Issues:

- Improved memory reporting in DGX Dashboard (consistent with CUDA guidance for unified memory systems).
- Image Generation in JupyterLab: Stable Diffusion XL Playbook example now runs end to end.
- Improved Peripheral Interoperability (USB-C, monitors, Bluetooth, Wi-Fi access points).
- Improved recovery image reliability (macOS; multiple external USB-C drives).
- Keyboard accessibility improvements: entire system setup can be completed with keyboard only.

## Notes

- Source: https://docs.nvidia.com/dgx/dgx-spark/release-notes.html (no version in URL; content as of the July 2026 release, retrieved 2026-10).
- These release versions apply only to the DGX Spark Founders Edition. GB10-based partner systems may not receive updates at the same time.
- The official page points to the Known Issues page for the current known-issues list.

## Related

- [Known Issues](./known-issues.md)
- [DGX OS](../software/dgx-os.md)
- [OS and Component Update](../system-update/os-and-component-update.md)
