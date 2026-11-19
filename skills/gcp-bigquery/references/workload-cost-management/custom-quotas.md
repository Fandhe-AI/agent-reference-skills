---
source: https://docs.cloud.google.com/bigquery/docs/custom-quotas
---

# Create custom query quotas

Custom query quotas limit the amount of data processed per day per project or per user to control on-demand query costs. Daily quotas reset at midnight Pacific Time. Custom quota is proactive: with a 10 TB quota you cannot run an 11 TB query.

## Signature / Usage

### Preview a query's cost before running it under a quota

Snippet taken from https://docs.cloud.google.com/bigquery/docs/best-practices-costs (the custom quota page shows no code; the quotas themselves are changed in the Google Cloud console under IAM & Admin > Quotas & System Limits).

```bash
bq query \
--use_legacy_sql=false \
--dry_run \
'SELECT
   COUNTRY,
   AIRPORT,
   IATA
 FROM
   `project_id`.dataset.airports
 LIMIT
   1000'
```

## Options / Props

### Quotas

| Quota | Scope | Default |
|---|---|---|
| `QueryUsagePerDay` | Project level; limits aggregate usage of all users in the project | 200 TiB of data processed per project per day |
| `QueryUsagePerUserPerDay` | Applied separately to each user and service account in a project; total usage of all users can never exceed the project limit | Unlimited |

### Required role

| Role | Permission |
|---|---|
| Quota Administrator (`role/servicemanagement.quotaAdmin`, as written in the source) | `serviceusage.quotas.update` |

### Remaining quota example (project 50 TB per day, user 10 TB per day, 10 users incl. one service account)

| Usage | Remaining quota |
|---|---|
| Each of the 10 users queries 4 TBs | Project: 10 TBs remain. User: 6 TBs per user remain, but only up to 10 TBs total |
| The service account queries another 6 TBs | Project: 4 TBs remain. The service account can no longer use BigQuery; 6 TBs per user remain for the others, but only up to 4 TBs total |
| One user queries another 4 TBs | Project: 0 TBs remain; no one can use BigQuery |

## Notes

- Custom quotas apply only to the on-demand query pricing model. You can't assign a custom quota to an individual user or service account.
- Custom overrides supersede default limits and can be changed anytime. A lower quota takes effect within a few minutes; a higher quota goes through an approval process.
- Custom quotas are approximate and not designed to strictly limit bytes processed; BigQuery might occasionally run a query that exceeds a quota. For greater price consistency, consider a reservation.
- Query usage is an accumulation of billed bytes normalized against regular on-demand pricing, so it can differ from `INFORMATION_SCHEMA.JOBS` billed bytes (for example, an operation priced at 50 times the regular rate: 100 GiB billed bytes shows as 5 TiB of usage).
- Exceeding a quota returns a `quotaExceeded` error naming the quota: `Custom quota exceeded: Your usage exceeded the custom quota for QueryUsagePerDay, which is set by your administrator.` (or `QueryUsagePerUserPerDay`). When the project quota is spent, BigQuery stops working for everyone in the project.
- The source describes the console procedure: filter the BigQuery API, select **Query usage per day** and/or **Query usage per day per user**, click Edit, deselect Unlimited, enter the value in TiB, and submit the request.
- Corrected from the official docs: the source writes `role/servicemanagement.quotaAdmin`; the IAM role ID is `roles/servicemanagement.quotaAdmin` (https://docs.cloud.google.com/iam/docs/roles-permissions/servicemanagement).
- Source: https://docs.cloud.google.com/bigquery/docs/custom-quotas (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/best-practices-costs (retrieved 2026-11-19).

## Related

- [best-practices-costs.md](./best-practices-costs.md)
- [slots.md](./slots.md)
