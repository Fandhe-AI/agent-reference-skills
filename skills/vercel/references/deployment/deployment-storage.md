# Deployment Storage

Cloud storage for the build output and Vercel Function bundles retained with your deployments. A Deployment Retention Policy controls when each deployment becomes eligible for deletion.

## Signature / Usage

```text
Dashboard: select team > Usage > Deployment Storage
  -> Deployment Storage | Functions Storage
  -> Projects (compare usage by project)
```

## Usage metrics

| Usage metric | What it includes |
| --- | --- |
| Deployment Storage | Build outputs and static assets |
| Functions Storage | Vercel Function bundles stored in each region where Vercel deploys them |

Usage drivers: number of retained deployments, output size, retention period.

## Pricing

| Usage metric | Pro list price |
| --- | --- |
| Deployment Storage | $0.10 per GB-month |
| Functions Storage | $0.10 per GB-month |

For each metric, Vercel records the maximum stored amount per project on each billing day and adds the daily project amounts across the billing period (1 GB every day in a 30-day month = 1 GB-month).

## Compare storage products

| Product | What it stores | Main control |
| --- | --- | --- |
| Deployment Storage | Output linked to retained deployments | Output size and retention |
| Remote Cache Artifacts | Task output that later builds can reuse | Cache use and retention |
| Vercel Blob | Files that your application uploads and manages | Application upload and deletion logic |

## Notes

- Retained output is used to open earlier previews, promote a tested deployment without rebuilding, roll back to an eligible production deployment, and inspect previous release output.
- Enterprise rates follow your contract; plans or contracts may include an allowance. Confirm allowance, rate, and charge in **Usage** and your invoice.
- Shorter retention reduces storage over time but also reduces history available for inspection, promotion, and rollback. Team policy sets the default for new projects; a project policy changes only that project.
- A change to one storage product does not always change usage of another.
- Optimization guide: https://vercel.com/docs/deployment-storage/optimize
- Source: https://vercel.com/docs/deployment-storage , https://vercel.com/docs/deployment-storage/optimize

## Related

- [deployment-retention.md](./deployment-retention.md)
- [managing-deployments.md](./managing-deployments.md)
- [instant-rollback.md](./instant-rollback.md)
