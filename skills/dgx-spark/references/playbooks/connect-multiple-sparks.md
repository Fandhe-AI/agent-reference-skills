# Connect Multiple DGX Sparks for Distributed Workloads

Cable two to four DGX Sparks (direct, three-device ring, or through a 200 Gbit/s switch) and configure the ConnectX-7 network and inter-device SSH, either with NVIDIA Sync Cluster Assistant (recommended) or with NVIDIA helper scripts (manual).

## Signature / Usage

```bash
git clone https://github.com/NVIDIA/dgx-spark-playbooks
cd dgx-spark-playbooks/nvidia/playbook-connect-multiple-sparks/assets/spark_cluster_setup
cp config/spark_config_b2b.json config/my-cluster.json   # pick the template for your layout
chmod 600 config/my-cluster.json
vim config/my-cluster.json   # edit every device, including the head node: ip_address / port / user / password
bash spark_cluster_setup.sh -c config/my-cluster.json --pre-validate-only
bash spark_cluster_setup.sh -c config/my-cluster.json --run-setup
rm config/my-cluster.json
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `config/spark_config_b2b.json` | template | Two devices, direct or switch |
| `config/spark_config_ring.json` | template | Three devices, ring or switch |
| `config/spark_config_switch.json` | template | Four devices through a switch |
| `ip_address` / `port` / `user` / `password` | JSON fields | Management IP, SSH port (normally `22`), sudo-capable account and its password |
| `--pre-validate-only` | flag | Checks LAN SSH/sudo, active ConnectX-7 interfaces, link speeds; changes nothing |
| `--run-setup` | flag | Writes `/etc/netplan/40-cx7.yaml` on each device, checks connectivity, sets up key-based SSH (`~/.ssh/id_ed25519_shared`) |

Layouts:

| Devices | Layout | Cables |
| --- | --- | --- |
| Two | Direct | One cable between the devices (port 0 on both, or port 1 on both) |
| Three | Direct ring | Three cables: Spark 1 port 0 to Spark 2 port 1, Spark 2 port 0 to Spark 3 port 1, Spark 3 port 0 to Spark 1 port 1 |
| Two or more | Switch | One cable and one 200 Gbit/s link from each device to the switch (port 0 on every Spark or port 1 on every Spark) |

## Notes

- Requires 2-4 Sparks on the same LAN, QSFP112 DAC cables in Ethernet mode, sudo on each device, and DGX OS April 2026 release or later
- Do not mix direct and switch links; a second cable in a two-device direct link does not increase performance
- NVIDIA Sync Cluster Assistant supports up to four devices; larger switch clusters need manual configuration or your own automation
- The JSON config stores passwords in plain text; delete it after setup. The helper replaces `/etc/netplan/40-cx7.yaml` if it exists, so back up network configuration first. NVIDIA Sync uses `/etc/netplan/99-nvidia-sync-cluster.yaml`
- Verify with `ip -br link`, `ip -br addr`, `ip route get <peer-cluster-IP>`, `ping -I <interface> -c 3 <peer-cluster-IP>`, `ssh -o BatchMode=yes <user>@<peer-cluster-IP> hostname`
- Duration: 10 minutes with NVIDIA Sync, 1 hour manual; Risk: Low with NVIDIA Sync, Medium manual. Rollback: delete the cluster in NVIDIA Sync, or remove the netplan file and SSH changes manually
- Last Updated 09/24/2026
- Source: https://build.nvidia.com/spark/connect-multiple-sparks (dgx-spark-playbooks commit c035e0ac7d21)

## Related

- [Connect Two Sparks](./connect-two-sparks.md)
- [Connect Three Sparks](./connect-three-sparks.md)
- [Multi Sparks Through Switch](./multi-sparks-through-switch.md)
- [NCCL for Two Sparks](./nccl.md)
- [Serve LLMs with vLLM Across DGX Sparks](./vllm-cluster.md)
