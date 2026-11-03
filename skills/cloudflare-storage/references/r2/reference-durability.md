---
source: https://developers.cloudflare.com/r2/reference/durability/
---

# Durability

R2 is designed for 99.999999999% (eleven 9s) annual durability using replication, erasure coding, and synchronous writes.

## Signature / Usage

```txt
Store 10,000,000 objects -> expect to lose one object every 10,000 years on average
```

## Notes

- Replication: multiple copies via full replication and/or erasure coding, so full or partial disk failure does not lose data.
- Hardware redundancy: storage clusters span several data centers within a geographic region.
- Synchronous writes: `HTTP 200 (OK)` is returned only after data is persisted to disk; no reliance on asynchronous replication.
- Durability is not availability; R2 offers a 99.9% availability SLA. It does not prevent intentional or accidental deletion; use bucket locks and bucket-scoped API tokens. It is distinct from consistency.

## Related

- [Bucket locks](./buckets-bucket-locks.md)
- [Authentication](./api-tokens.md)
- [Consistency model](./reference-consistency.md)
