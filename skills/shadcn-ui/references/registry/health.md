---
source: https://ui.shadcn.com/docs/registry/health
---

# Registry Health

How registries listed in the shadcn/ui Registry Directory are monitored and scored (online, schema-conformant, works with the `shadcn` CLI). Registry Health is marked experimental; scoring model and thresholds may change.

## Signature / Usage

Ranking and score formulas (verbatim):

```text
Reliability = 45 * (0.65 * availability7d + 0.35 * availability30d)

Correctness = 10 * indexSchemaPassRate30d
            + 15 * sampledItemPassRate30d

Installability = 20 * dryRunPassRate30d

rankingScore = 0.8 * healthScore
             + 20 * min(1, log(1 + itemCount) / log(501))
```

`ranking` object in `/r/registries.json`:

```json
{
  "version": 1,
  "score": 93.248,
  "itemCount": 100
}
```

## Options / Props

Checks:

| Cadence | Check | What we look for |
| --- | --- | --- |
| Hourly | Registry index | The index is online, valid, and correctly configured. |
| Daily | Registry items | A rotating sample of items can be downloaded and validated. |
| Weekly | CLI | A rotating item works with `shadcn add --dry-run`. |

Status:

| Status | What it means |
| --- | --- |
| Observing | Collecting the first 24 index checks over at least 24 hours. |
| Healthy | Initial observation period is complete and recent checks are passing. |
| Degraded | The registry is online, but one or more recent checks are failing. |
| Unavailable | The registry index has not passed a check for at least 24 hours. |

Score components (total 100 points):

| Component | Points | What it measures |
| --- | ---: | --- |
| Reliability | 45 | How often the registry index was available over the last 7 and 30 days. |
| Correctness | 25 | Whether the index and sampled items match the registry schema. |
| Installability | 20 | Whether sampled items work with the `shadcn` CLI. |
| Registry setup | 10 | HTTPS, JSON responses, unique item names, and a matching registry name. |

Smoothing prior weights (`(successes + globalMean * priorWeight) / (observations + priorWeight)`):

| Signal | Prior weight |
| --- | ---: |
| Availability | 24 |
| Index schema validity | 12 |
| Sampled item validity | 10 |
| CLI checks | 3 |

## Notes

- Applies only to registries listed in the shadcn/ui Registry Directory; it does not monitor private registries, registries configured directly in a project, or GitHub registries used via `owner/repo/item`.
- Monitoring starts after publication; failed checks do not unpublish a registry.
- Degraded when: the index fails three checks in a row; the latest index does not match the schema; fewer than 90% of sampled items pass after at least 10 checks; the two most recent CLI checks fail. Recovery from an availability failure needs two successful index and schema checks in a row.
- Registry setup has four checks worth 2.5 points each; an unobserved signal gets 1.25 points. Each component is rounded to three decimals.
- Without enough registry-wide data the priors start at 85% availability and 90% for other rates. A change to formula, weights or thresholds requires a new `scoreVersion`.
- Directory ranking: health contributes up to 80 points, catalog size up to 20 (bonus stops at 500 distinct item names). Sorted by ranking score, ties alphabetical. Observing, challenge-blocked, empty-catalog or ranking-less registries appear after ranked ones; Unavailable appear last but remain searchable and available via the API. If health data is unavailable or more than six hours old the directory falls back to alphabetical order.
- API: `/r/registries.json` adds an optional `health` object (`status`, `statusReason` with `code` / `message`, `score`, `breakdown`, `availability7d`, `availability30d`, `firstObservedAt`, `checkedAt`, `lastSuccessfulCheck`, `schemaVersion`, `scoreVersion`, plus flags `monitoringLimited` and `hidden`). `hidden` becomes `true` after seven continuous days of unavailability; the directory does not currently use it.
- All checks come from one hosted runner; latency is a private diagnostic and does not affect the score. CDN/WAF challenges are handled separately and do not count as failures.
- A higher ranking is not a recommendation or a security review; always review third-party code.

## Related

- [Registry Directory (index submission)](./registry-index.md)
- [Registry Directory (browse page)](./directory.md)
