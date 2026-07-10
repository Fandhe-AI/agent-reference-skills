# Connect Three DGX Spark in a Ring Topology

Configure three DGX Spark systems in a 200GbE QSFP ring topology for high-speed inter-node communication and passwordless SSH cluster operations.

## Signature / Usage

```bash
# on each node: verify username match, connect QSFP cables in ring, then
./discover-sparks.sh
```

## Notes

- Requires 3 DGX Spark systems, 3 QSFP cables (0.4m recommended), matching usernames, sudo access
- No specific AI model/container involved; infrastructure setup only
- Includes NCCL bandwidth test validation and rollback instructions
- Duration: ~1 hour; Risk: Medium

## Related

- [Connect Two Sparks](./connect-two-sparks.md)
- [Multi Sparks Through Switch](./multi-sparks-through-switch.md)
- [NCCL for Two Sparks](./nccl.md)
