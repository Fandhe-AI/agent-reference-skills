# Cluster Assistant

Wizard in NVIDIA Sync that automatically configures the ConnectX-7 network across two to four DGX Spark (GB10) devices, validating each device before it changes the network.

## Signature / Usage

```text
NVIDIA Sync > Settings > Clusters
```

To change the topology of an existing cluster (add or delete a node), delete the cluster from within NVIDIA Sync first:

1. Open Settings > Clusters.
2. Select the cluster and open its overflow menu (⋯).
3. Select Delete.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| SSH check | check | Sync must reach each device over SSH through your local network or Tailscale connection. The later SSH setup step has a five-minute limit for each device; retry if it times out |
| GB10 check | check | Works only with DGX Spark (GB10) devices; remove an unsupported device from the selection |
| Software version check | check | Update the device through the DGX Dashboard, then retry |
| Password check | check | Your account needs sudo access to change network settings; select Fix Now and enter the device password. Sync keeps the password in memory for setup, then discards it |
| Verify User Details | step | Matching usernames, user IDs (UIDs), and group IDs (GIDs) are optional |
| Set Network Configuration | step | If the detected layout is wrong or a link does not reach the expected 200 Gbit/s, check cables, ports, and switch settings with the playbook's cabling guide |
| Check Network Performance | step | A speed-test warning does not necessarily mean the cluster cannot work; fix the issue and select Run Test Again, or select Next |

## Notes

- Prerequisites: DGX Spark (GB10) devices only; properly connected (cabled or set up with a switch); added to NVIDIA Sync and available on your network or through Tailscale; each Spark updated to the required DGX OS version; your user on each device has sudo.
- Supported number of devices: two to four DGX Spark devices. An upcoming release will support up to eight Sparks. Cluster more than four devices yourself following the instructions in the Connect Multiple Sparks playbook (see the dgx-spark skill).
- Topologies: connect two and three devices with cables or a switch; four Sparks require a switch. Direct connection through QSFP cables works for two or three Sparks; you must use a switch to cluster four Sparks with NVIDIA Sync.
- Do not mix connection types: connect all devices directly, or connect all devices through a switch. Use only one cable per link (direct or switch); two cables from a device to another device or to a switch will not improve performance.
- After the cluster is set up: run a model with the Model Launcher or follow a playbook from the NVIDIA Playbooks; inspect the network settings or test connectivity yourself (see the ConnectX-7 Cluster Network Verification page).
- Matching accounts can make workloads easier to manage: different usernames can mean different home paths, and different IDs can affect ownership of shared files. If you want matching accounts, create them on each device before cluster setup and add the devices to Sync using those accounts. For SSH between devices, use the aliases Sync creates; they include the correct username for each device.
- For common setup failures and cabling issues, start with the playbook's Troubleshooting tab (dgx-spark skill, playbooks). The detailed step list, supported-cable list, and link-speed threshold that earlier docs (0.117.3-9) carried on this page are not on the current page; the current page only mentions the expected 200 Gbit/s link.
- Release 0.100.18: fixed a false version-check error on devices running the July 2026 update or later.
- Release 0.117.3-9: SSH aliases are also created for the ConnectX-7 sub-interface IP addresses; a UUID is added to the generated netplan so tombstone records no longer block repeated applies.
- Release 0.100.19-18: the rename step includes a Disconnect action; the Speed field is labeled Link Speed.
- Release 0.148.0-153: every node's probe is prepared before topology discovery starts; the network test shows the latency phase; renaming a device updates its name and SSH alias together; cluster delete continues when one node fails and shows that node's error.
- Source: https://docs.nvidia.com/sync/latest/cluster-assistant.html (NVIDIA Sync 0.148.0-153, last updated Oct 30, 2026, retrieved 2026-11-14).

## Related

- [connectx7-verification](./connectx7-verification.md)
- [direct-connections](../connections/direct-connections.md)
- [Model Launcher](../models/model-launcher.md)
- connect-two-sparks, connect-three-sparks, multi-sparks-through-switch playbooks: dgx-spark スキル参照
