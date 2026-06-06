# Eviction

Upstash Redis supports an optional eviction policy that automatically removes keys when the database reaches its size limit.

## Notes

- **Eviction is disabled by default** — writes are rejected when the size limit is reached unless eviction is enabled
- Eviction can be enabled at database creation time or later via the database configuration panel
- Upstash implements a single eviction algorithm: **Optimistic-Volatile**
  - Randomly samples keys for eviction, giving priority to keys with a TTL
  - When volatile (TTL-bearing) keys are insufficient, non-volatile keys are randomly selected
  - Combines aspects of `volatile-random` and `allkeys-random` Redis policies
- Additional eviction policies are planned for future releases
- Recommended for cache use cases where data is ephemeral or frequently regenerated

## Related

- [Durability](./durability.md)
- [Commands: Generic](./commands-generic.md)
