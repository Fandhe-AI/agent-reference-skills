# Spark Stacking (ConnectX-7 Networking)

Official page "ConnectX-7 Networking — Connecting DGX Spark Systems into a Cluster". Connect multiple DGX Spark systems with cables to run workloads that cannot fit onto a single device. At the highest level this requires:

1. Physically connecting the systems with QSFP cables plugged into the external QSFP ports.
2. Detecting the network interfaces that need IP addresses for inter-device communication.
3. Setting up the IP layer to route traffic to those interfaces.

Step 2 can be confusing without knowledge of the DGX Spark PCIe topology; mistakes there break step 3. For a quick reference, skip to the Full Correspondence Table (under Options / Props).

## Signature / Usage

### QSFP Ports and Cables

- Each DGX Spark has two QSFP ports (also called "ConnectX-7 ports") on the back. Each port provides up to 200 Gb/s; the actual speed also depends on the cable.
- Use cables known to provide at least 200 Gb/s. A faster cable is not beneficial because the port is capped at 200 Gb/s.
- The QSFP ports support Ethernet configuration only.
- Approved cables:
  - Amphenol: NJAAKK-N911 (QSFP to QSFP112, 32AWG, 400mm, LSZH); NJAAKK0006 is the 0.5m version of this cable
  - Luxshare: LMTQF022-SD-R (QSFP112 400G DAC Cable, 400mm, 30AWG)

#### Left vs right port

The two ports are interchangeable, but the clustering playbooks (Connect Two Sparks, Connect Three Sparks, Multi Sparks Through a Switch) assume certain ports. Seen from the back of the device, the left port is the QSFP port closest to the Ethernet port.

#### Plugging in a QSFP cable

1. Turn the DGX Spark so the back faces you with the ports exposed.
2. Select one of the two QSFP ports.
3. Orient the cable so the pull-tab (ring tab) faces upward.
4. Plug the cable into the port. It should slide in smoothly without force; if not, check that the pull-tab faces up.
5. Make sure the cable is fully inserted.

Warning: do not force the QSFP cable into the port. If it does not slide in smoothly, stop, verify tab orientation and port alignment, and try again. Forcing an upside-down or misaligned connector can damage the port.

#### Removing the QSFP cable

Pull the pull-tab. It should come out easily.

### ConnectX-7 Network Topology

- The ConnectX-7 NIC sits between the external QSFP ports and the Grace Blackwell SoC.
- The NIC connects independently to the two QSFP ports, and to the SoC through two independent PCIe Gen 5 x4 links. Each QSFP port therefore has two PCIe addresses.
- Each QSFP port appears as two independent Linux Ethernet interfaces (two cables show four Linux Ethernet interfaces).
- Each Ethernet interface has a corresponding RoCE interface (RoCE device) for InfiniBand communication.

### Interface names

Interface names are built from PCIe addresses, so they are the same on all DGX Spark devices. `ibdev2netdev` output for a Spark with cables in both QSFP ports (RoCE on the left, Ethernet on the right):

```
nvidia@spark-1afa:~$ ibdev2netdev
rocep1s0f0   port 1 ==> enp1s0f0np0   (Up)
rocep1s0f1   port 1 ==> enp1s0f1np1   (Up)
roceP2p1s0f0 port 1 ==> enP2p1s0f0np0 (Up)
roceP2p1s0f1 port 1 ==> enP2p1s0f1np1 (Up)
```

Both sides of a row share the PCIe address in the middle (for example `p1s0f0` in row 1, `P2p1s0f0` in row 3). `roce` / `en` distinguish RoCE from Ethernet; `np0` / `np1` designate the Ethernet network ports; `port 1` is the RoCE port.

### Next Steps

- Cluster with NVIDIA Sync: the Cluster Assistant validates the devices, applies ConnectX-7 network settings, checks link performance, and configures SSH between nodes, with automatic discovery and network creation instead of manual terminal configuration. It supports up to three DGX Spark systems connected directly through cables, and up to four systems when using a switch. See the NVIDIA Sync User Guide.
- Manual configuration: the playbooks Connect Two Sparks, Connect Three Sparks, and Multi Sparks Through a Switch.

## Options / Props

### PCIe Address Fields

| Row | PCIe Domain | Bus | Slot | Function |
| --- | --- | --- | --- | --- |
| 1 | blank | p1 | s0 | f0 |
| 2 | blank | p1 | s0 | f1 |
| 3 | P2 | p1 | s0 | f0 |
| 4 | P2 | p1 | s0 | f1 |

### Full Correspondence Table

| QSFP Port | Port # | PCIe Address | Ethernet Address | RoCE Address |
| --- | --- | --- | --- | --- |
| Left | 0 | p1s0f0 | enp1s0f0np0 | rocep1s0f0 |
| Left | 0 | P2p1s0f0 | enP2p1s0f0np0 | roceP2p1s0f0 |
| Right | 1 | p1s0f1 | enp1s0f1np1 | rocep1s0f1 |
| Right | 1 | P2p1s0f1 | enP2p1s0f1np1 | roceP2p1s0f1 |

## Notes

- The PCIe domain of rows 1 and 2 is actually 0, but it is omitted by convention and shown blank.
- The PCIe domain of rows 3 and 4 is 2; it is included to avoid conflation with the convention for 0.
- Moving left to right across the PCIe Address Fields table gives the address corresponding to `lspci` output.
- Renamed: this page was previously titled "Spark Stacking"; the current official title is "ConnectX-7 Networking" (spark-clustering.html). The file name is kept for stability.
- The previous version of this page stated "NCCL v2.28.3"; the current official page does not state an NCCL version. The release notes say NCCL 2.30u1 supports the 3-node ring (per https://docs.nvidia.com/dgx/dgx-spark/release-notes.html, June 2026 Release).
- Source: https://docs.nvidia.com/dgx/dgx-spark/spark-clustering.html (no version in URL; retrieved 2026-10).

## Related

- [System Configuration and Operation](./system-config-and-operation.md)
- [Connect Multiple DGX Sparks for Distributed Workloads](../playbooks/connect-multiple-sparks.md)
- [Connect Two Sparks](../playbooks/connect-two-sparks.md)
- [NVIDIA Sync](../software/nvidia-sync.md)
