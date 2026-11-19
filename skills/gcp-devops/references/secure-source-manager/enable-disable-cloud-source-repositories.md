---
source: https://docs.cloud.google.com/source-repositories/docs/enable-disable-cloud-source-repositories
---

# Enable or disable Cloud Source Repositories

Cloud Source Repositories is not available to new customers: effective June 17, 2024, an organization that has not previously used it cannot enable the API or use the service, and new projects not connected to an organization cannot enable the Cloud Source Repositories API. Organizations that used it before June 17, 2024 are not affected.

## Signature / Usage

### Enable the service

Requires the `serviceusage.services.enable` IAM permission on the project.

```bash
gcloud services enable sourcerepo.googleapis.com
```

### Disable the service

Before disabling, make sure all code you want to keep is available elsewhere, and delete the repositories first (recommended).

```bash
gcloud services disable sourcerepo.googleapis.com
```

## Options / Props

| Item | Value |
|------|-------|
| API | `sourcerepo.googleapis.com` |
| Permission to enable | `serviceusage.services.enable` on the project |
| Unavailable to | New customers, effective June 17, 2024 |
| Unaffected | Organizations that used Cloud Source Repositories before June 17, 2024 |

## Notes

- Disabling the API is destructive for repository access: try it on a disposable project first and confirm the source code is stored in another location (for example Secure Source Manager, see [csr-ssm-migration-guide.md](./csr-ssm-migration-guide.md)).
- Enabling and disabling APIs in general is covered by `gcp-foundation` (Service Usage).
- Source: https://docs.cloud.google.com/source-repositories/docs/enable-disable-cloud-source-repositories (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [csr-features.md](./csr-features.md)
- [migration-guides.md](./migration-guides.md)
