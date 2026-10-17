# Connect Multiple DGX Spark through a Switch

Connect four or more DGX Spark systems via a QSFP switch for 200Gbps inter-node communication and passwordless SSH cluster setup.

## Signature / Usage

```bash
# connect each node to switch via QSFP, then on each node:
netplan apply
./discover-sparks.sh
```

## Notes

- Requires 4+ DGX Spark systems, a QSFP switch with min 4 QSFP56-DD (200Gbps) ports, matching usernames, sudo access
- Network interfaces configurable via DHCP, link-local, or manual netplan
- Verify with NCCL tests after setup
- Duration: 2 hours; Risk: Medium
- Recommended for two to four DGX Spark systems: NVIDIA Sync Cluster Assistant configures and validates the switch-connected cluster. If it reports success, skip the manual network and SSH steps. For more than four systems, use the manual setup.

## Related

- [Connect Multiple DGX Sparks for Distributed Workloads](./connect-multiple-sparks.md)
- [Connect Three Sparks](./connect-three-sparks.md)
- [NCCL for Two Sparks](./nccl.md)
- [vLLM for Inference](./vllm.md)
