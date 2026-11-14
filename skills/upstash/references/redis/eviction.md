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
- When eviction is enabled and the size limit is reached, older data is removed from the cache including Durable Storage (unlike idle-entry memory eviction described on the Durability page, this deletes the data)
- Enable via the **Eviction** checkbox when creating a database, or **Enable** in the Configuration/Eviction box of an existing database
- Auto Upgrade (alternative to eviction): when enabled, reaching a bandwidth limit upgrades the database to the next plan instead of throttling, and reaching the storage limit with eviction **off** upgrades to a plan with larger storage instead of rejecting writes. With eviction **on**, Auto Upgrade is not triggered and data is evicted instead. Enable via the Auto Upgrade checkbox at creation or the Configuration/Auto Upgrade box of an existing database
- Source: https://upstash.com/docs/redis/features/auto-upgrade (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/redis/features/eviction (fetched 2026-11-14; no version pin on the site)

## Related

- [Durability](./durability.md)
- [Commands: Generic](./commands-generic.md)
