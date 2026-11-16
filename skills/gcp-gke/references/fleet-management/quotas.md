---
source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/quotas
---

# Fleet management quotas and limits

Fleet management uses quotas (adjustable defaults) and system limits (fixed values) to keep resource allocation fair and prevent service overload.

## Signature / Usage

To view the current limit and usage, open the IAM and Admin Quotas page for the fleet host project in the Google Cloud console, filter for Service: GKE Hub, and select the Memberships quota. Membership counts can also be listed with:

```bash
gcloud container fleet memberships list \
  --project=PROJECT_ID
```

## Options / Props

Allocation quotas (they do not reset over time; released when you release the resource):

| Quotas | Default value |
|---|---|
| Maximum number of clusters with global memberships per fleet | 250 |
| Maximum number of clusters with regional memberships per fleet | 50 |

## Notes

- Quotas have default values and can typically be adjusted; system limits are fixed. Quotas generally apply at the project level and are shared by all applications and IP addresses within the project.
- When a quota is exceeded, the system usually blocks access to the resource and the task fails.
- To adjust most quotas use the Google Cloud console ("Request a quota adjustment") or the Cloud Quotas quota adjuster.
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/fleet-creation (the source page has no code).
- Source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/quotas (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/fleet-creation (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [fleet-creation.md](./fleet-creation.md)
- [plan-fleets.md](./plan-fleets.md)
