# System Configuration and Operation

Overview of configuring and operating DGX Spark for consistent AI/ML workflow delivery: platform overview, recommended UEFI settings, clustering procedures, and foundational security guidance.

## Signature / Usage

```text
System Configuration and Operation
  System Overview                    -> ./system-overview.md
  UEFI Settings                      -> ./uefi-settings.md
  ConnectX-7 Networking (clustering) -> ./spark-stacking.md
```

- **System Overview** — Flexible Access and Usage, Key Capabilities, System Architecture, Software, Getting Started. See [system-overview.md](./system-overview.md).
- **UEFI Settings** — Access UEFI, UEFI Documentation, enable/disable WiFi and Bluetooth, change Display Reserved Memory, boot from USB, enable/disable Secure Boot, configure PXE boot, troubleshooting. See [uefi-settings.md](./uefi-settings.md).
  - **UEFI Documentation** — pointer to the DGX Spark UEFI Manual (https://docs.nvidia.com/dgx/dgx-spark-uefi/).
- **ConnectX-7 Networking — Connecting DGX Spark Systems into a Cluster** — QSFP cabling, ConnectX-7 interface / PCIe / RoCE naming, Cluster Assistant. See [spark-stacking.md](./spark-stacking.md).

## Notes

- This page is a navigational overview; detailed procedures live in the dedicated sub-pages.
- The ConnectX-7 Networking section was previously titled "Spark Stacking".

## Related

- [System Overview](./system-overview.md)
- [UEFI Settings](./uefi-settings.md)
- [Spark Stacking (ConnectX-7 Networking)](./spark-stacking.md)
