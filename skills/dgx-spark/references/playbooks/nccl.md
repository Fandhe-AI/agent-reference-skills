# NCCL for Two Sparks

Playbook "Set Up NCCL for Multi-Node GPU Communication" (current official title; two, three, or four nodes). Build and validate NVIDIA Collective Communication Library (NCCL) v2.31.2-1 with Blackwell support (`sm_121`) for high-bandwidth GPU communication across DGX Spark systems.

## Signature / Usage

```bash
git clone -b v2.31.2-1 https://github.com/NVIDIA/nccl.git ~/nccl/
cd ~/nccl/ && make -j src.build NVCC_GENCODE="-gencode=arch=compute_121,code=sm_121"
git clone -b v2.19.7 https://github.com/NVIDIA/nccl-tests.git ~/nccl-tests/
cd ~/nccl-tests/ && make MPI=1
$HOME/nccl-tests/build/all_gather_perf -b 16G -e 16G
```

## Notes

- The playbook now covers two (direct), three (ring), and four (switch) nodes; the build is pinned to NCCL `v2.31.2-1` and nccl-tests `v2.19.7` (v2.20.0 and later add GIN tests that fail to link with the system OpenMPI). The earlier version of this page showed NCCL `v2.28.9-1`.
- Prerequisite cluster connection: recommended via NVIDIA Sync Cluster Assistant for supported two- to four-node DGX Spark clusters (if it reports success, do not repeat a manual connection playbook). Manual alternative: the connect-multiple-sparks playbook ([connect-multiple-sparks.md](./connect-multiple-sparks.md)).
- The same username is required on every node. When using Cluster Assistant, choose to standardize user information when prompted; the NCCL helper scripts assume matching usernames.
- Requires DGX Spark systems with network connectivity already configured, NVIDIA driver, CUDA toolkit, sudo
- No AI model/container involved; validates infrastructure via `all_gather` performance test
- Duration: 30 minutes; Risk: Medium

## Related

- [Connect Multiple DGX Sparks for Distributed Workloads](./connect-multiple-sparks.md)
- [Connect Two Sparks](./connect-two-sparks.md)
- [Multi Sparks Through Switch](./multi-sparks-through-switch.md)
