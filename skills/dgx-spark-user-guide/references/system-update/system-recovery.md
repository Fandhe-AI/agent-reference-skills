# System Recovery

Procedures to restore the DGX Spark operating system and firmware to factory defaults. Recovery addresses system corruption, configuration errors, and other issues preventing normal operation.

Applies only to DGX Spark Founders Edition. OEM variants have different recovery procedures available from their respective manufacturers.

## Prerequisites

- USB flash drive (minimum 16GB capacity)
- Keyboard and display connected to the device
- Recovery media downloaded from developer.nvidia.com

## Signature / Usage

Recovery process overview:

```text
1. Download recovery media (tar.gz) from the
   "DGX Spark System Recovery Image" page on the NVIDIA driver portal.
2. Extract the archive and create a bootable USB drive:
   - Windows: CreateUSBKey.cmd
   - Linux:   CreateUSBKey.sh
   - macOS:   CreateUSBKeyMacOS.sh
3. Disconnect external storage, insert the USB drive, power on while
   holding Esc or Del to enter UEFI settings.
4. Restore UEFI defaults: Save & Exit > Restore Defaults > confirm > save and reset.
5. Enable Secure Boot: Security > confirm Secure Boot enabled >
   Restore Factory Keys > save and reset.
6. Re-enter UEFI, Boot Override > select the USB drive, follow on-screen
   instructions to reflash firmware and reinstall the OS.
7. On the welcome screen press Enter (Esc to cancel), select
   [START RECOVERY] on the warning screen, monitor SSD reflash progress,
   then review completion status and restart the device.
```

## Notes

- Creating the bootable USB drive completely erases its existing contents; back up data beforehand.
- Use wired USB keyboards for UEFI navigation; some Bluetooth keyboards do not function during this phase.
- Applies only to Founders Edition hardware.

## Related

- [OS and Component Update](./os-and-component-update.md)
