---
source: https://docs.cloud.google.com/infrastructure-manager/docs/enable-service
---

# Enable and disable Infrastructure Manager

Enable the Infrastructure Manager API (`config.googleapis.com`) with gcloud or the Console. Optionally enable the Cloud Quotas API for quota validation. Disabling the API leaves existing resources in place but blocks changes to deployments.

## Signature / Usage

### Enable

Update gcloud components and check the version:

```bash
gcloud components update
```

```bash
gcloud version
```

Enable the API:

```bash
gcloud services enable config.googleapis.com
```

Optional, for quota validation:

```bash
gcloud services enable cloudquotas.googleapis.com
```

### Disable

```bash
gcloud services disable config.googleapis.com
```

## Options / Props

| API | Service name | When |
|---|---|---|
| Infrastructure Manager | `config.googleapis.com` | Required |
| Cloud Quotas | `cloudquotas.googleapis.com` | Optional, to use quota validation |

## Notes

- On Ubuntu, install gcloud with the Debian package. The gcloud CLI snap package does not include `kubectl` or extensions to authenticate with Infra Manager using the gcloud CLI.
- When you disable the Infra Manager API, related resources continue to exist in the project; you cannot use the service to change deployments and resources. Enabling the API again restores normal use.
- Try disabling the API on a disposable project first.
- Pricing is on the Infrastructure Manager pricing page (https://docs.cloud.google.com/infrastructure-manager/pricing); it is not copied here.
- Console steps (API Overview page, Manage, Disable API) are not reproduced here.
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/enable-service (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [configure-service-account.md](./configure-service-account.md)
- [deploy-resources.md](./deploy-resources.md)
