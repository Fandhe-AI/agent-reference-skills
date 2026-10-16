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

Cluster Assistant creates `/etc/netplan/99-nvidia-sync-cluster.yaml`, defining the high-level network setup for the managed cluster's ConnectX-7 network, separate from management networking. Your DGX Spark or GB10 device has two QSFP links that are both configured and appear in the cluster Netplan file; the cluster does not always use both, so inspect the runtime state to see which is in use.

### Removal Process

To disable the configuration on individual nodes:

```bash
sudo mkdir -p /root/netplan-disabled
sudo mv /etc/netplan/99-nvidia-sync-cluster.yaml /root/netplan-disabled/
sudo netplan generate
sudo netplan try
ip -br addr
```

1. Relocate the file out of `/etc/netplan/`.
2. Apply changes with `netplan generate` and `netplan try`.
3. Verify the ConnectX-7 cluster IP ranges no longer appear with `ip -br addr`.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `/etc/netplan/99-nvidia-sync-cluster.yaml` | file | Netplan configuration for the ConnectX-7 cluster network; contains `ethernets` entries for device names and assigned address ranges |
| Netplan | software | Declarative network configuration layer; reads YAML and generates configuration for NetworkManager |
| NetworkManager | software | Runtime service that applies and manages active network configuration (Wi-Fi, Ethernet, ConnectX-7) |
| Netplan configuration files | files | Files in `/etc/netplan/` merged into one configuration; numeric filename prefixes set processing order and precedence |
| `ip -br link` | command | Shows link status; `LOWER_UP` indicates an active connection, `NO-CARRIER` indicates inactive |
| `ip -br addr` | command | Shows assigned IP addresses; verify they match the Netplan configuration |

## Notes

- Key concepts: the ConnectX-7 network is separate from the management network (internet and Sync access can continue over Wi-Fi or 10 Gb Ethernet); cluster IPs are private to the ConnectX-7 network; one physical QSFP link can expose more than one Linux interface (subinterfaces).
- Both QSFP links appear in the Netplan file, but some interfaces can be inactive depending on topology.
- Compare interface names between the Netplan file and `ip -br link` / `ip -br addr` output to confirm proper assignment.
- Not all nodes necessarily connect directly to every other node, depending on topology; use `ping -c 3 <peer-cluster-ip>` to test connectivity to expected peers only.
- Removing the Netplan file removes the network configuration but does not necessarily remove SSH aliases, SSH keys, or other node-to-node SSH settings; use the Delete Cluster action for those.
- Be careful when removing remotely: management access can continue over Wi-Fi, Ethernet, or Tailscale rather than the ConnectX-7 network.
- Release 0.117.3-9: the generated netplan now includes a UUID.

## Related

- [cluster-assistant](./cluster-assistant.md)
- [direct-connections](../connections/direct-connections.md)
- connect-two-sparks, connect-three-sparks, multi-sparks-through-switch playbooks: dgx-spark スキル参照
