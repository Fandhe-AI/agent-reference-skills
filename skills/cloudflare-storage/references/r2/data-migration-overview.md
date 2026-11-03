---
source: https://developers.cloudflare.com/r2/data-migration/
---

# Data migration

Migrate data from other cloud providers to R2 using Super Slurper (one-off bulk) or Sippy (incremental, on demand).

## Signature / Usage

```sh
npx wrangler r2 bucket sippy enable "<BUCKET_NAME>"
```

## Options / Props

| Name | Description | When to use |
| --- | --- | --- |
| Super Slurper | Quickly migrate large amounts of data from other cloud providers to R2. | For one-time, comprehensive transfers. |
| Sippy | Incremental data migration, populating your R2 bucket as objects are requested. | For gradual migration that avoids upfront egress fees; to start serving frequently accessed objects from R2 without a full migration. |

## Related

- [Super Slurper](./data-migration-super-slurper.md)
- [Sippy](./data-migration-sippy.md)
- [Migration strategies](./data-migration-strategies.md)
