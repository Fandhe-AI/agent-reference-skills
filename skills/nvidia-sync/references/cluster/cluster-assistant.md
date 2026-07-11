# Cluster Assistant

Wizard in NVIDIA Sync that configures a high-speed ConnectX-7 cluster network across multiple DGX Spark / GB10 devices, validating hardware, cabling, and topology before applying a Netplan configuration.

## Signature / Usage

```text
NVIDIA Sync > Cluster Assistant
```

The wizard runs the following checks and steps in order:

1. SSH check — verifies network connectivity and SSH access to each device.
2. GB10 check — confirms only DGX Spark/GB10 hardware is present; unsupported devices must be removed.
3. Software version check — confirms devices run the required system software (see Notes).
4. Password check — prompts "Fix Now" and password entry for temporary sudo access if needed.
5. Network topology detection — verifies cable seating and detected topology.
6. Cluster network configuration — applies the Netplan configuration for the detected topology.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| SSH check | check | Verifies network connectivity and SSH access to each device |
| GB10 check | check | Confirms only DGX Spark/GB10 hardware is present |
| Software version check | check | Confirms devices run the required system software version |
| Password check | check | Provides temporary sudo access via "Fix Now" |
| Network topology detection | check | Verifies cable seating and detected topology |

## Notes

- Cluster Assistant requires devices to run **April 2026 OTA (system software) or later**. If the software version check fails, update the device to April 2026 system software or later before continuing.
- Prerequisites before running Cluster Assistant: complete initial setup on each DGX Spark, add all devices to NVIDIA Sync via the Devices tab, connect QSFP cabling for the intended topology, and ensure the Sync computer shares the same LAN.

## Troubleshooting

| Issue | Resolution |
| --- | --- |
| SSH check fails | Verify network connectivity and SSH access to each device |
| GB10 check fails | Only DGX Spark/GB10 hardware is supported; remove unsupported devices |
| Software version fails | Update to April 2026 system software or later |
| Password check fails | Select "Fix Now" and provide password for temporary sudo access |
| Network topology incorrect | Verify cable seating; reboot devices with cables connected |
| Suboptimal performance | Reboot nodes; verify cable types and switch configuration |

## Architecture Overview

ConnectX-7 on DGX Spark and GB10 systems uses two PCIe 5.0 x4 links instead of a single PCIe 5.0 x8 link to deliver 200 Gbps per QSFP port. Each QSFP port appears as a pair of Linux network interfaces, requiring configuration across two subnets.

## Verified Cluster Topologies

| Topology | Description |
| --- | --- |
| Two-node direct connection | One QSFP cable, no switch required |
| Three-node ring | Three QSFP cables forming a closed loop; each node connects to two neighbors |
| Switch-based (2-4 nodes) | Each device connects to a managed QSFP switch via a single cable |

Topologies beyond these configurations require manual setup.

## Cable Requirements

Supported cables are QSFP112 DAC, 400 GbE, Ethernet-mode-only cables:

- Amphenol NJAAKK-N911
- Luxshare LMTQF022-SD-R

Use only one QSFP cable from each device to another device or switch.

## Related

- [connectx7-verification](./connectx7-verification.md)
- [direct-connections](../connections/direct-connections.md)
- [connect-two-sparks (dgx-spark playbook)](../../../dgx-spark/references/playbooks/connect-two-sparks.md)
- [connect-three-sparks (dgx-spark playbook)](../../../dgx-spark/references/playbooks/connect-three-sparks.md)
- [multi-sparks-through-switch (dgx-spark playbook)](../../../dgx-spark/references/playbooks/multi-sparks-through-switch.md)
