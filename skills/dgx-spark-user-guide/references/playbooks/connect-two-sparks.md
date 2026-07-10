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

## Related

- [Connect Three Sparks](./connect-three-sparks.md)
- [NCCL for Two Sparks](./nccl.md)
- [vLLM for Inference](./vllm.md)
