---
source: https://docs.cloud.google.com/bigquery/docs/gemini-set-up
---

# Set up Gemini in BigQuery

Before using Gemini in BigQuery, enable the required APIs and grant IAM roles. A service administrator or project owner with the `serviceusage.services.enable` permission usually does this. Features can later be toggled or turned off per user.

## Signature / Usage

### Enable required APIs and grant roles

The console flow is: open BigQuery Studio, hover the **Gemini** icon, click **Continue**, enable each listed API, then enter the principals that should receive the roles below.

```bash
gcloud services enable my-consumed-service
```

### Turn off Gemini in BigQuery

- Revoke the `cloudaicompanion` IAM permissions listed below to prevent a user from using the features.
- To turn off specific features, open **Gemini settings** in the BigQuery toolbar and clear the features.
- To turn off all Gemini for Google Cloud products, see "Turn off the Gemini for Google Cloud API" in the Gemini documentation.

## Options / Props

### Roles that grant the required permissions

| Role | Notes |
|---|---|
| BigQuery Studio User (`roles/bigquery.studioUser`) | Grants the permissions below |
| BigQuery Studio Admin (`roles/bigquery.studioAdmin`) | Grants the permissions below |

### Permissions Gemini in BigQuery requires

| Permission |
|---|
| `cloudaicompanion.entitlements.get` |
| `cloudaicompanion.instances.completeCode` |
| `cloudaicompanion.instances.completeTask` |
| `cloudaicompanion.instances.generateCode` |
| `cloudaicompanion.operations.get` |
| `cloudaicompanion.topics.create` |

### Compute models for data insights and metadata generation

| Item | Condition |
|---|---|
| Data insights and automated metadata generation | Available to customers using BigQuery on-demand compute, Enterprise edition, or Enterprise Plus edition |
| Quota basis | Use of these compute models at the organization level (see "Quotas for Gemini in BigQuery") |

### Preview features that require sign-up (trusted tester program)

| Feature | Stage |
|---|---|
| Automated metadata generation for data insights | Preview |
| Dataset insights with BigQuery knowledge engine | Preview |

## Notes

- Gemini in BigQuery is part of Gemini for Google Cloud and doesn't support the same compliance and security offerings as BigQuery. Only set it up for projects that don't require compliance offerings that Gemini for Google Cloud doesn't support.
- Preview features require an administrator to complete the Gemini in BigQuery Pre-GA Sign-up form; access is enabled periodically in batches.
- The source shows only Console steps for enabling APIs.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/services/enable (gcloud 593.0.0 help). The source does not name the API IDs; replace `my-consumed-service` with the services the console lists.
- Source: https://docs.cloud.google.com/bigquery/docs/gemini-set-up (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [gemini-overview.md](./gemini-overview.md)
- [data-canvas.md](./data-canvas.md)
- [conversational-analytics.md](./conversational-analytics.md)
