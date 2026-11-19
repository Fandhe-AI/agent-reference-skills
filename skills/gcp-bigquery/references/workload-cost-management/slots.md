---
source: https://docs.cloud.google.com/bigquery/docs/slots
---

# Understand slots

A BigQuery slot is a virtual compute unit used to execute SQL queries, Python code, or other job types. BigQuery decides how many slots a query uses; you cannot manually change that number. This page covers pricing models, fair scheduling, idle slots, reservation-based fairness, autoscaling, baseline slots, commitments, and fluid scaling.

## Signature / Usage

### Create a reservation with baseline slots

Snippet taken from https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language (the page shows no code). There, `slot_capacity` is the baseline slot count, and `ignore_idle_slots` (`BOOLEAN`, default `false`) and `autoscale_max_slots` are further `reservation_option_list` options.

```sql
CREATE RESERVATION `admin_project.region-us.prod`
OPTIONS (
  slot_capacity = 100);
```

## Options / Props

### Capacity prioritization during regional contention

| Priority | Capacity |
|---|---|
| 1 | Enterprise Plus and Enterprise edition baselines and committed capacity |
| 2 | Enterprise Plus autoscaled capacity |
| 3 | Enterprise edition autoscaled capacity |
| 4 | Standard edition and on-demand capacity |

### Order in which a reservation uses slots

| Order | Slots |
|---|---|
| 1 | Baseline slots |
| 2 | Idle slot sharing (if enabled); only idle baseline or committed slots of reservations with the same edition and same region |
| 3 | Autoscale slots |

### Autoscaling and scaling rules

| Item | Value |
|---|---|
| Autoscale increment | Multiple of 50 slots (scaling up is rounded up to the nearest 50; a single step can add more than 50, for example 450) |
| Scale-down window | Autoscaled capacity retained for at least 60 seconds; a new peak resets the window |
| Default billing | Per second with a one-minute minimum duration |
| BigQuery fluid scaling | Opt in at reservation level: per-second billing, no minimum duration, same 50-slot increments |
| Billing basis | Number of scaled slots, not slots used; charged even if the job that caused scale-up fails |
| Changes to max slots | Can take a few seconds to propagate |
| Increase baseline | Every few minutes, if BigQuery has capacity; retry after 15 minutes if it fails |
| Decrease baseline | Once per hour if baseline was recently changed and baseline exceeds committed slots; otherwise every few minutes |

## Notes

- On-demand projects have a maximum concurrent slots limit with transient burst capability (see https://docs.cloud.google.com/bigquery/quotas#max_concurrent_slots_on-demand). Capacity-based quotas cap the total slots you can allocate across all reservations in a location; if you use autoscaling the sum of maximum reservation sizes cannot exceed it. You are billed for reservations and commitments, not for quotas.
- Avoid unexpected on-demand costs: assign reservations at the folder or organization level so new projects inherit them; without an explicit or inherited assignment BigQuery applies on-demand pricing; override exceptions by assigning projects to the reservation `None`.
- Fair scheduling shares slots equally among projects with running queries in a reservation, then among jobs within a project (for example 10 projects in a 1,000-slot reservation each receive 100 slots with sufficient demand).
- When demand exceeds slots, units of work queue; you are not charged for additional slots or on-demand rates. Slot contention can lengthen job runtime.
- Idle slots apply only to the capacity-based model, not to autoscaled slots. By default queries in any reservation can use idle slots of other reservations in the same administration project; they are reclaimed within milliseconds. Idle slots cannot be shared between reservations of different editions.
- `ignore_idle_slots = true` stops a reservation borrowing but not lending. While `ignore_idle_slots` is false, a reservation can have `0` slots and still use unused slots.
- `ML_EXTERNAL` assignments are not preemptible and cannot use idle slots from other reservations.
- Reservation-based fairness (Enterprise or Enterprise Plus only) distributes idle slots equally across reservations instead of projects. It is enabled by default for administration projects created after October 10, 2026; for earlier projects you must enable it before creating a predictable reservation. Avoid relying solely on idle slots for time-critical production workloads.
- Autoscaled capacity is not reserved in advance and may be delayed in high-demand periods. Do not use the jobs information schema to match billing for autoscaling.
- Slot commitments do not apply to autoscaling slots and cannot be reduced during the term. Baseline slots exceeding committed slots are charged at the pay-as-you-go rate. If a commitment expires, adjust baseline slots to avoid unwanted pay-as-you-go charges.
- Autoscaling best practices: set meaningful max slots from past usage; the one-minute minimum means a large max for a seconds-long job still bills the full minute; avoid sending queries one at a time; for constant load use baseline plus a commitment; contact the BigQuery team weeks ahead for large events.
- For reservations with managed disaster recovery, fluid scaling must be enabled in both primary and secondary regions.
- Source: https://docs.cloud.google.com/bigquery/docs/slots (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language (retrieved 2026-11-19).
- Prices are not copied; see https://cloud.google.com/bigquery/pricing.

## Related

- [editions-intro.md](./editions-intro.md)
- [reservations-workload-management.md](./reservations-workload-management.md)
- [best-practices-costs.md](./best-practices-costs.md)
