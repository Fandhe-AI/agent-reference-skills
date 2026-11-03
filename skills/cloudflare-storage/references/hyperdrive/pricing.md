---
source: https://developers.cloudflare.com/hyperdrive/platform/pricing/
---

# Pricing

Hyperdrive is included in both Free and Paid Workers plans; the Free plan caps database queries per day.

## Signature / Usage

```txt
Free plan: 100,000 database queries / day (resets daily at 00:00 UTC)
Paid plan: unlimited
```

## Options / Props

|  | Free plan | Paid plan |
| --- | --- | --- |
| Database queries | 100,000 / day | Unlimited |

## Notes

- "Database queries" means any statement through Hyperdrive: `SELECT`, `INSERT`/`UPDATE`/`DELETE`, or schema changes (`CREATE`, `ALTER`, `DROP`). Cached and uncached queries both count.
- On the Free plan, exceeding the limit makes further operations of that type fail with an error.
- Connection pooling and query caching incur no additional charge; there is no data transfer/egress charge; Hyperdrive does not charge for compute (Workers compute is billed per Workers pricing).
- PlanetScale databases created from Cloudflare are billed separately through the Cloudflare invoice at PlanetScale's standard pricing (see [planetscale](./planetscale.md)).

## Related

- [Limits](./limits.md)
- [FAQ](./faq.md)
- [PlanetScale Postgres & MySQL](./planetscale.md)
