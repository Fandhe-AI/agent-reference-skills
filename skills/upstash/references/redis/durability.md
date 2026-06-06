# Durability

Upstash Redis uses always-on persistence backed by cloud block storage (AWS EBS). Data is written to both memory and block storage on every write.

## Notes

- **Persistence is always enabled** — there are no configurable persistence modes (no AOF/RDB user controls)
- Every write is stored in both memory and block storage simultaneously
- Data evicted from memory is retained in block storage — eviction does **not** cause data loss
- When a read targets an evicted key, it is automatically reloaded from block storage into memory
- Paid tier databases include multi-instance replication for additional fault tolerance
- Block storage is region-local; for multi-region durability, use Global Replication

## Related

- [Eviction](./eviction.md)
- [Replication](./replication.md)
- [Global Replication](./global-replication.md)
