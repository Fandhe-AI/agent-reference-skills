# Cluster Assistant

Wizard in NVIDIA Sync that configures a high-speed ConnectX-7 cluster network across multiple DGX Spark / GB10 devices, validating hardware, cabling, and topology before applying a Netplan configuration.

## Signature / Usage

```text
NVIDIA Sync > Settings > Cluster Assistant > Add New Cluster
```

Step-by-step flow:

1. Open Settings. Open NVIDIA Sync Settings > Cluster Assistant and select Add New Cluster.
2. Create Name. Name the cluster and proceed.
3. Device Selection. Select the devices to cluster and proceed.
4. Device Checks. Sync checks SSH access, GB10 devices, minimum OS version, and `sudo` access. If a device requires a password for `sudo`, Sync prompts for it. The password is used only for configuration and is not persisted or logged.
5. User Information Check. Sync checks usernames, user IDs, and group IDs across devices and prompts you to standardize them if they differ. This step is optional; if you continue without standardizing, Sync warns again but lets you proceed.
6. Optional: Rename Devices. Rename devices or skip. Connected devices must be disconnected first (possible in the Cluster Assistant window).
7. Network Check. Sync detects network interfaces and cabling. If a cable is not detected, you are warned and cannot proceed until it is fixed. After cabling, Sync checks the runtime network and negotiated link speeds; if network changes will be made or speeds are not 200 Gbit/s, it alerts you. Select Confirm Network Configuration to proceed.
8. Link Speed Check. Sync runs a speed test across the links to check a lower bound of 184 Gbit/s. Each link is tested in turn and turns green if it passes or brown if it does not. Select Run Test Again to retry or Next to proceed.
9. Inter-device SSH. Sync creates a key pair and populates your default SSH configuration with aliases for each node so that you can `ssh <name>` between devices. There is a five-minute limit for any individual machine, after which it times out; retry if so. Select Next when complete.
10. Success. Copy the network information for future use (Copy in Step One), then select See Example Workloads for NVIDIA playbooks.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Device Checks | check | SSH access, GB10 hardware, minimum OS version, `sudo` access (password prompt if needed; not persisted or logged) |
| User Information Check | check | Compares usernames/UIDs/GIDs; standardization optional, warns if skipped |
| Rename Devices | step | Optional; connected devices must be disconnected first |
| Network Check | check | Detects interfaces and cabling; warns on missing cable or link speed other than 200 Gbit/s; Confirm Network Configuration |
| Link Speed Check | check | Speed test with lower bound 184 Gbit/s; green = pass, brown = fail; Run Test Again / Next |
| Inter-device SSH | step | Creates key pair and per-node SSH aliases; 5-minute timeout per machine |

## Notes

- Supported configurations: two to a maximum of four DGX Spark devices, updated to the current software version (check via the DGX Dashboard).
  - Two-node direct connection: one QSFP cable, no switch required.
  - Three-node ring: three QSFP cables forming a closed loop; each node connects to two neighbors.
  - Switch-based (2-4 nodes): each device connects to a managed QSFP switch via a single cable. Four devices require a switch.
  - Direct cabling supports 2 or 3 devices only, never 4. A switch supports 2, 3, or 4 devices.
  - Do not mix connection types: connect all devices directly or all through a switch.
  - Use one cable per link (direct or switch). Two cables between the same pair add no performance.
  - Cabling: Two Sparks = 1 cable direct, or 2 cables through a switch. Three Sparks = 3-cable ring, or 3 cables through a switch. Four Sparks = 4 cables through a switch.
- Supported cables: QSFP112 DAC, 400 GbE, Ethernet-mode-only (Amphenol NJAAKK-N911, Luxshare LMTQF022-SD-R).
- Limitations: supports only DGX Spark and GB10 devices (others are blocked from clustering); supports up to four devices, so configure more than four or any unsupported topology (for example an eight-device switch topology) manually; sets up only inter-device SSH, so set up Slurm or Kubernetes yourself; does not set up workloads such as inference or fine-tuning (use NVIDIA playbooks: NCCL, vLLM, fine-tuning with PyTorch).
- Delete the cluster: Settings > Clusters tab > select the cluster > overflow menu (⋯) > Delete. This removes the node-to-node SSH configuration and the cluster relationship in NVIDIA Sync. To change the topology (for example to add another node), delete the cluster and create it again.
- Cluster Assistant requires devices to run **April 2026 OTA (system software) or later**. If the check fails, update the device (easiest via the DGX Dashboard; manual updates follow the DGX Spark User Guide).
- Prerequisites: complete initial setup on each DGX Spark, have SSH access and `sudo` privileges with a username and password, add all devices to NVIDIA Sync, connect QSFP cabling for the intended topology, and ensure the Sync computer shares the same LAN.
- Troubleshooting, SSH check: verify all devices are powered on, connected to your network, the Sync host is on the same network, and the Sync host can SSH directly to each device.
- Troubleshooting, GB10 check: remove unsupported (non DGX Spark / GB10) devices.
- Troubleshooting, password check: select "Fix Now" and enter the password; Sync keeps it in memory only for the setup and then discards it.
- Troubleshooting, Set Network Configuration: verify cables are fully seated; two-device direct = only one QSFP cable between devices; two/three/four-device switch = one QSFP cable per device to the switch; three-device ring = each device connects to the other two (three cables total). If still wrong, reboot devices with cables connected and retry.
- Troubleshooting, port speed not 200 Gbit/s: use a supported QSFP112 DAC, 400 GbE, Ethernet-mode-only cable; with a switch, verify it negotiates the correct speed and fix the port configuration in the switch administrator console.
- Troubleshooting, Check Network Performance: a bandwidth or latency warning does not necessarily mean the cluster is nonfunctional. Reboot devices with cables connected and rerun the speed test; verify cable type; check switch vendor documentation and configuration.
- Verify User Details: matching username/UID/GID is not required but recommended. If usernames differ, use the SSH aliases generated by Sync (they include the correct username). To align accounts before creating the cluster, use `getent passwd <uid>` / `getent group <gid>`, `groupadd`, `adduser`, `usermod` (see the cluster network scripts).
- Release 0.100.18: fixed a false version-check error on devices running the July 2026 update or later.
- Release 0.117.3-9: SSH aliases are also created for the ConnectX-7 sub-interface IP addresses; a UUID is added to the generated netplan so tombstone records no longer block repeated applies.
- Release 0.100.19-18: the rename step includes a Disconnect action; the Speed field is labeled Link Speed.
- The ConnectX-7 architecture detail (former "Architecture Overview" section: PCIe topology, per-QSFP-port network interfaces and subnets) was removed from this page because it no longer appears on the current Sync page, which links to the DGX Spark User Guide "ConnectX-7 Networking" (see the dgx-spark skill).

## Related

- [connectx7-verification](./connectx7-verification.md)
- [direct-connections](../connections/direct-connections.md)
- connect-two-sparks, connect-three-sparks, multi-sparks-through-switch playbooks: dgx-spark スキル参照
