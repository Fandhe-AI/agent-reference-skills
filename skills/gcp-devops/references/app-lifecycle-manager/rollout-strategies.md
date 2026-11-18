---
source: https://docs.cloud.google.com/app-lifecycle-manager/rollout-strategies
---

# Rollout strategies

Rollout strategies control the pace, sequence and spatial impact of releases across logical and physical failure domains, following Google Cloud's approach to safe rollouts. You define a strategy by creating a rollout kind; you can add staged waves with soak times, an error budget that pauses problematic releases, and a unit filter.

## Signature / Usage

### Create a rollout kind with a strategy

Adapted (not in the official docs): the `${ROLLOUT_KIND_ID}`, `${PROJECT_ID}` and `${UNIT_KIND_ID}` shell variables of the quickstart command are replaced by upper-case placeholders (the source page has no code of its own; see Notes).

```bash
gcloud beta app-lifecycle-manager rollout-kinds create ROLLOUT_KIND_ID \
  --project=PROJECT_ID \
  --unit-kind=UNIT_KIND_ID \
  --rollout-orchestration-strategy=Google.Cloud.Simple.AllAtOnce \
  --location=global
```

## Options / Props

### Strategies

| Rollout strategy | Value | Location behavior | Concurrency and batching | Soak time | Recommended use case |
|---|---|---|---|---|---|
| One location at a time (simple) | `Google.Cloud.Simple.OneLocationAtATime` | Single location sequentially | Up to 5% of units concurrently per location; units selected arbitrarily | None | Development environments and emergency rollouts |
| All at once (simple) | `Google.Cloud.Simple.AllAtOnce` | All locations concurrently | Up to 5% of units concurrently per location; units selected arbitrarily | None | Development environments, non-production testing, and emergency rollouts |
| Progressive (gradual) | `Google.Cloud.Progressive.Gradual.v1` | Multi-location in exponential waves (1, 2, 4 locations) | Percentage batches (1%, 10%, 20%, 30%, and ~40%); units selected randomly | Soak times between batches; 18 hours between location waves | Production environments with multiple locations |
| Progressive (single location) | `Google.Cloud.Progressive.SingleLocation.v1` | Single location | Percentage batches (1%, 10%, 20%, 30%, and ~40%) | Extended soak times (18 hours) between batches | Production environments with a single location |

### Safeguards on a rollout kind

| Setting | Description |
|---------|-------------|
| `error_budget` | Pauses a rollout when failed unit updates in a location exceed the configured threshold (`allowed_count` or `allowed_percentage`). Without it, App Lifecycle Manager attempts to update all units regardless of failures. |
| `unit_filter` | CEL filter string that restricts the eligible population of units. |
| Regional scope | Supported rollout locations are determined by the available regions on the SaaS offering. |

## Notes

- Warning: rollouts update live tenant units. The simple strategies (no soak times) are recommended only for development environments and emergency scenarios; use a progressive strategy for production and set an error budget. Try on a disposable project first.
- The numbers (1%, 10%, 20%, 30%, ~40%; 18 hours; 5%) are given as examples in the source ("for example", "such as"), not as fixed guarantees.
- Snippet taken from https://docs.cloud.google.com/app-lifecycle-manager/flags/flags-quickstart (`--rollout-orchestration-strategy=Google.Cloud.Simple.AllAtOnce` is the strategy used there; other strategy values are in the table). The command also exists in the GA track (`gcloud app-lifecycle-manager rollout-kinds create`).
- Adapted from the official docs: the quickstart's `${ROLLOUT_KIND_ID}`, `${PROJECT_ID}` and `${UNIT_KIND_ID}` shell variables are replaced by upper-case placeholders, because the variables are defined only on the quickstart page. The error-budget field is `allowed_percentage` here and `allowed_ratio` on the update page (see update-saas-offering).
- Source: https://docs.cloud.google.com/app-lifecycle-manager/rollout-strategies (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [update-saas-offering.md](./update-saas-offering.md)
- [regionalization.md](./regionalization.md)
- [overview.md](./overview.md)
