# Connect Multiple DGX Sparks for Distributed Workloads

Cable two to four DGX Sparks (direct, two-device link, three- or four-device ring, or through a 200 Gbit/s switch) and configure the ConnectX-7 network and inter-device SSH, either with NVIDIA Sync Cluster Assistant (recommended) or manually with the `setup-cluster.sh` helper from the spark-vllm-docker repository.

## Signature / Usage

```bash
git clone https://github.com/eugr/spark-vllm-docker.git
cd spark-vllm-docker
./setup-cluster.sh 192.168.1.11 192.168.1.12 --topology direct --mtu 9000 --dry-run
./setup-cluster.sh 192.168.1.11 192.168.1.12 --topology direct --mtu 9000
./setup-cluster.sh --doctor --dry-run
./setup-cluster.sh --restore
```

## Options / Props

| Layout | Cables | `setup-cluster.sh` options |
| --- | --- | --- |
| Two, direct | One cable (port 0 on both, or port 1 on both) | `--topology direct --mtu 9000` |
| Three, ring | Spark 1 port 0 to Spark 2 port 1, Spark 2 port 0 to Spark 3 port 1, Spark 3 port 0 to Spark 1 port 1 | `--topology mesh --mtu 1500` |
| Four, ring | Port 0 of each Spark to port 1 of the next; Spark 4 back to Spark 1 (manual path only) | `--topology ring --mtu 1500` |
| Two or more, switch | One cable and one 200 Gbit/s link per device to the switch (port 0 on every Spark or port 1 on every Spark) | `--topology switch --mtu 1500` |

| Flag | Description |
| --- | --- |
| `--dry-run` | Checks SSH and `sudo`, inspects ConnectX-7 interfaces, validates the Netplan plan in a temporary folder; changes nothing |
| `--doctor` | Verifies saved files, CX7 addresses, routes, MTU, links, passwordless SSH, `.env`, Docker access; without `--dry-run` it offers repairs |
| `--restore` | Rolls back using the manifest on the head node and backups on each device |

## Notes

- Requires 2-4 Sparks on the same LAN, supported QSFP112 DAC cables in Ethernet mode, `sudo` on each device, and the DGX OS April 2026 release or later. Memory matrix: DGX Spark with 64GB or 128GB Unified Memory
- Do not mix direct and switch links; a second cable in a two-device direct link does not increase performance. List ring devices in cable order, head node (Spark 1) first, or verification fails
- NVIDIA Sync Cluster Assistant (recommended, up to four devices): add each Spark, create a cluster, resolve the device and link checks, then it sets up key-based inter-device SSH over the ConnectX-7 links; save the network details shown on the success page
- Run `setup-cluster.sh` as a normal user (not `sudo`) from one device (head node), not from a laptop. It assigns `/24` subnets from `10.20.0.0/16` (two per cable), writes `/etc/netplan/98-spark-vllm-docker.yaml`, per-device Ed25519 keys in `~/.ssh/spark-vllm-cluster/`, adds `docker` group membership (log in again), and saves `.env` on the head node. It does not configure the switch or install packages. Verify unknown host key fingerprints before accepting
- Use `--mtu 9000` only for two Sparks with a direct link; omitting `--mtu` defaults to 9000 for every layout. Give `--topology` for every layout
- Performance benchmarking: `assets/performance_benchmarking_guide.md` ("DGX Spark User Performance Guide") covers single-Spark offline/online benchmarks for TensorRT-LLM, vLLM, SGLang, and Llama.cpp, image generation (Flux.1 Schnell, SDXL), and fine-tuning (Llama 3 LoRA/qLoRA/full). For dual Sparks it covers NCCL bandwidth, raw RDMA bandwidth with `ib_write_bw`, and RDMA latency with `ib_write_lat` / `ib_read_lat`
- The README still lists `assets/spark_cluster_setup` as an ancillary file for the manual path, but the Configure Manually steps use spark-vllm-docker `setup-cluster.sh`
- Duration: 10 minutes with NVIDIA Sync, 1 hour manual; Risk: Low with NVIDIA Sync, Medium manual. Rollback: delete the cluster in NVIDIA Sync, or `./setup-cluster.sh --restore` (restore any switch changes manually)
- Last Updated 09/24/2026
- Source: https://github.com/NVIDIA/dgx-spark-playbooks/blob/3088315/nvidia/playbook-connect-multiple-sparks/README.md (commit 3088315, 2026-10-23)

## Related

- [Connect Two Sparks](./connect-two-sparks.md)
- [Connect Three Sparks](./connect-three-sparks.md)
- [Multi Sparks Through Switch](./multi-sparks-through-switch.md)
- [NCCL for Two Sparks](./nccl.md)
- [Serve LLMs with vLLM Across DGX Sparks](./vllm-cluster.md)
