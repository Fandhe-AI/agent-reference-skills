# ConnectX-7 Cluster Network Verification

Netplan configuration file created by Cluster Assistant, and the commands used to inspect, verify, and remove the ConnectX-7 cluster network setup.

## Signature / Usage

```bash
sudo ls /etc/netplan/99-nvidia-sync-cluster.yaml
sudo cat /etc/netplan/99-nvidia-sync-cluster.yaml
ip -br link
ip -br addr
ping -c 3 <peer-cluster-ip>
```

Cluster Assistant creates `/etc/netplan/99-nvidia-sync-cluster.yaml`, defining the high-level network setup for the managed cluster's ConnectX-7 network, separate from management networking. Your DGX Spark or GB10 device has two QSFP links that are both configured and appear in the cluster Netplan file.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `/etc/netplan/99-nvidia-sync-cluster.yaml` | file | Netplan configuration for the ConnectX-7 cluster network; contains `ethernets` entries for device names and assigned address ranges |
| `ip -br link` | command | Shows link status; `LOWER_UP` indicates an active connection, `NO-CARRIER` indicates inactive |
| `ip -br addr` | command | Shows assigned IP addresses; verify they match the Netplan configuration |

## Notes

- Compare interface names between the Netplan file and `ip -br link` / `ip -br addr` output to confirm proper assignment.
- Not all nodes necessarily connect directly to every other node, depending on topology; use `ping -c 3 <peer-cluster-ip>` to test connectivity to reachable peers only.
- Removing the Netplan file only removes network configuration, not SSH settings or aliases created during setup.

## Removal Process

To disable the configuration on individual nodes:

> **Warning**: Moving `/etc/netplan/99-nvidia-sync-cluster.yaml` disables the ConnectX-7 cluster network configuration. To restore it, move the file back from `/root/netplan-disabled/` to its original path and re-run `netplan generate` and `netplan try`.

```bash
sudo mv /etc/netplan/99-nvidia-sync-cluster.yaml /root/netplan-disabled/
sudo netplan generate && sudo netplan try
ip -br addr
```

1. Relocate the file out of `/etc/netplan/`.
2. Apply changes with `netplan generate` and `netplan try`.
3. Verify removal with `ip -br addr`.

## Related

- [cluster-assistant](./cluster-assistant.md)
- [direct-connections](../connections/direct-connections.md)
- [connect-two-sparks (dgx-spark playbook)](../../../dgx-spark/references/playbooks/connect-two-sparks.md)
- [connect-three-sparks (dgx-spark playbook)](../../../dgx-spark/references/playbooks/connect-three-sparks.md)
- [multi-sparks-through-switch (dgx-spark playbook)](../../../dgx-spark/references/playbooks/multi-sparks-through-switch.md)
