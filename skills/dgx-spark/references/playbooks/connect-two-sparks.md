# Connect Two Sparks

Physically connect two DGX Spark systems with a QSFP cable and configure 200GbE direct-connect networking with passwordless SSH for distributed computing.

## Signature / Usage

```bash
./discover-sparks.sh   # verify link and assign IPs
ssh <user>@<peer-hostname>
```

## Notes

- Requires 2 DGX Spark systems, 1 QSFP cable, sudo access, identical usernames on both nodes
- Supports automatic link-local addressing (single cable) or manual netplan IP assignment
- Includes rollback instructions to revert network changes
- Duration: ~1 hour; Risk: Medium
- Recommended for DGX Spark: NVIDIA Sync Cluster Assistant configures and validates the cluster network. If it reports success, skip the manual network and SSH steps in this playbook and continue to your workload playbook.
- Optional `avahi-utils` (provides `avahi-browse`) is needed for automatic SSH discovery (Instructions Step 4 Option 1).

## Related

- [Connect Multiple DGX Sparks for Distributed Workloads](./connect-multiple-sparks.md)
- [Spark Stacking (ConnectX-7 Networking)](../system-config/spark-stacking.md)
- [Connect Three Sparks](./connect-three-sparks.md)
- [NCCL for Two Sparks](./nccl.md)
- [vLLM for Inference](./vllm.md)
