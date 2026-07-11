# UEFI Settings

How to access and configure UEFI on DGX Spark: WiFi/Bluetooth, USB boot, Secure Boot, PXE boot, and troubleshooting.

## Access UEFI

You must use a keyboard physically connected to the DGX Spark device. If using a Mac keyboard (which may lack a recognized Del key), use Esc instead.

Steps:

1. Power on or restart the system.
2. Immediately press and hold Esc or Del until the UEFI setup menu appears (press before the OS begins loading; timing is critical).

Detailed information about UEFI settings and configuration options can be found in the DGX Spark UEFI Manual.

## Enable or Disable WiFi and Bluetooth

Path: **Advanced → Advanced Menu → IO Port Access → Wireless LAN & Bluetooth**

Toggling this setting disables/enables both WiFi and Bluetooth together. To disable only one individually, use the OS settings instead.

## Boot from a USB Device

**Persistent (set USB as first boot device):**

1. Go to **Boot → Boot Option Priorities**.
2. Use Enter on each entry to set the boot order; place the USB device at the top.

**One-time boot:**

1. Go to **Save & Exit**.
2. Under **Boot Override**, select the USB device and press Enter.

The USB device must appear in the boot option list; ensure it is connected before entering UEFI and that it is bootable.

## Enable or Disable Secure Boot

Path: **Security → Secure Boot**

1. Set **Secure Boot** to **Enabled** (default) or **Disabled**.
2. Save changes and exit from **Save & Exit**.

Secure Boot is active when it is enabled, the Platform Key (PK) is enrolled, and the system is in User mode. A platform reset may be required for the change to take effect.

## Configure PXE Boot

Path: **Advanced → Network Stack Configuration**

1. Set **Network Stack** to **Enabled**.
2. Set **IPv4 PXE Support** and/or **IPv6 PXE Support** to **Enabled** as needed.
3. Optionally configure **PXE boot wait time** and **Media detect count**.
4. In **Advanced**, open the network configuration screen for the NIC intended for PXE and configure it (by MAC address).
5. Save changes and exit from **Save & Exit**.

Prerequisite: disable Secure Boot, or enroll the `grubnetaa64.efi.signed` bootloader.

## Troubleshooting

- Revert to UEFI defaults and restart.
- Apply changes incrementally to identify problematic settings.
- Update to the latest UEFI version if available.
- Consult the DGX Spark UEFI Manual for specific setting descriptions.
- See the Get Support resources for further help.

## Notes

- Always save UEFI configuration changes from the **Save & Exit** menu so the system restarts with the new settings applied.

## Related

- [System Configuration and Operation](./system-config-and-operation.md)
