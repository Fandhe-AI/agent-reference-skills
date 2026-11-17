---
source: https://docs.cloud.google.com/service-directory/quotas
---

# Quotas and limits (Service Directory)

Service Directory uses quotas (default values, typically adjustable) and system limits (fixed values that can't be changed) to maintain fair resource allocation and prevent service overloads.

## Signature / Usage

### Check your quota

Replace `PROJECT_ID` with your own project ID.

Adapted (not in the official docs): the source shows `gcloud compute project-info describe` (and `gcloud compute regions describe`), which return Compute Engine project and region quotas, not Service Directory quotas; this lists the quotas of `servicedirectory.googleapis.com` with Cloud Quotas instead.

```bash
gcloud quotas info list --service=servicedirectory.googleapis.com --project=PROJECT_ID
```

## Options / Props

### Quotas

- Namespaces per project per region
- Services per namespace
- Endpoints per service
- Registration requests per minute per region
- Lookup requests per minute per region

Existing quotas and usage are on the Quotas page of the Google Cloud console (`servicedirectory.googleapis.com`). All projects start with the same quotas; some might increase automatically based on usage.

### System limits

General:

- There is no health-status or health-checking for endpoints. Alternatives: use internal load balancers for integrated health checking and register the load balancer with Service Directory, or store individual endpoint health status as endpoint annotations.

Cloud DNS integration:

- Only endpoints with a valid IPv4 or IPv6 address are served; endpoints without a valid IP address are ignored by DNS requests.
- SRV records cannot be customized. The symbolic service, protocol, TTL, weight, and priority are managed by Service Directory.
- Service and endpoint annotations are not served in DNS requests; use HTTP support in Service Directory for custom annotations.
- You cannot add resource records to the Service Directory zone. Only records generated internally from existing Service Directory endpoints are allowed.

### Required roles

| Task | Required role |
|------|---------------|
| Check quotas for a project | One of: Project Owner (`roles/owner`), Project Editor (`roles/editor`), Quota Viewer (`roles/servicemanagement.quotaViewer`) |
| Modify quotas, request additional quota | One of: Project Owner (`roles/owner`), Project Editor (`roles/editor`), Quota Administrator (`roles/servicemanagement.quotaAdmin`), a custom role with the `serviceusage.quotas.update` permission |

## Notes

- Exceeding a quota with a `gcloud` command prints a `quota exceeded` error and returns exit code `1`; an API request returns HTTP `413 Request Entity Too Large`.
- Quotas generally apply per Google Cloud project and are shared across all applications and IP addresses in that project.
- Quotas don't guarantee resource availability; a resource can be unavailable even when quota remains.
- Quota adjustments are mostly requested through the Google Cloud console (Request a quota adjustment: https://docs.cloud.google.com/docs/quotas/help/request_increase).
- The source also shows the Console steps for checking quota.
- Corrected from the official docs: the source checks quotas with `gcloud compute project-info describe --project PROJECT_ID` and `gcloud compute regions describe example-region`; those commands describe the Compute Engine project and region, so they don't show Service Directory quotas. The example uses `gcloud quotas info list --service=servicedirectory.googleapis.com` instead (gcloud 593.0.0 help: "list QuotaInfos of all quotas for a given project, folder or organization", `--service` is "Name of the service in which the quota is defined"). Snippet adapted from https://docs.cloud.google.com/sdk/gcloud/reference/quotas/info/list.
- Source: https://docs.cloud.google.com/service-directory/quotas (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [configuring-service-directory.md](./configuring-service-directory.md)
