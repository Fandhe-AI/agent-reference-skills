---
source: https://docs.cloud.google.com/docs/quotas/set-quota-project
---

# Quota Project and Quota Alerts

How the quota project (the project charged for quota and billing on client-based API calls) is chosen and set, how quota-per-user works, and how to alert and chart on quota usage with Cloud Monitoring.

## Signature / Usage

Set the quota project per request (REST header; principal needs `serviceusage.services.use` on that project):

```text
x-goog-user-project: QUOTA_PROJECT_ID
```

gcloud: configuration property or a per-command flag (flag wins):

```text
billing/quota_project   (gcloud configuration property)
--billing-project=QUOTA_PROJECT_ID   (per command)
```

ADC quota project for local development (user credentials):

```text
gcloud auth application-default set-quota-project
```

Per-language environment variable (client libraries):

| Language | Environment variable |
|---|---|
| C++ | `GOOGLE_CLOUD_CPP_USER_PROJECT` |
| C#, Go, Java, Node.js, Python, PHP | `GOOGLE_CLOUD_QUOTA_PROJECT` |
| Ruby | Not available |

Quota metric names for alerts and charts:

```bash
gcloud quotas info list --project=PROJECT_ID_OR_NUMBER \
    --service=SERVICE_NAME --format="value(metric)"
```

Alert from the console: IAM & Admin > Quotas & System Limits > More actions > Create usage alert > choose a notification channel (email, SMS, Pub/Sub) > Create. Chart in Metrics Explorer: filter `quota usage`, resource **Consumer Quota**, metric category **Quota**; use a stacked bar chart and at least a one-week window for one-sample-per-day metrics.

## Options / Props

Quota project resolution order when none is explicit:

| Order | Source |
|-------|--------|
| 1 | Specified in the request (programmatic setting; or the client-library environment variable) |
| 2 | API key: the project associated with the key |
| 3 | gcloud credentials: the gcloud shared project (not all client-based APIs fall back to it) |
| 4 | Service account (including impersonation): the service account's project |
| 5 | Workforce identity federation: the workforce pool user project |

If none of these produces a quota project, the request fails. Precedence among explicit methods: programmatic > environment variable > credentials.

Quota user (per-user quotas): defaults to the authenticated principal; falls back to client IP (shared NAT / proxy users share a bucket). Override with `quotaUser` / `X-Goog-Quota-User` system parameters, which are honored only with a valid API key that has service restrictions (IP address or HTTP referrer restrictions).

## Notes

- Permission to set or use a quota project: `serviceusage.services.use` (Service Usage Consumer `roles/serviceusage.serviceUsageConsumer`). A project you created already gives you this.
- Quota alerts need `monitoring.alertPolicies.create`, are supported only for project-level quotas, and quota values update once per day (changes can take up to 24 hours to show).
- Services that support quota metrics include Compute Engine, Dataflow, Spanner, Pub/Sub, Cloud Vision, Speech-to-Text, Cloud Monitoring, and Cloud Logging; App Engine and Cloud SQL do not. Pick **Consumer Quota** as the resource type to see which metrics apply.
- The console does not show per-user or client IP quota telemetry.
- Client-library code for setting the quota project belongs to gcp-client-libraries; Application Default Credentials setup belongs to gcp-cli / gcp-client-libraries.
- Source: https://docs.cloud.google.com/docs/quotas/set-quota-project
- Source: https://docs.cloud.google.com/docs/quotas/set-up-quota-alerts
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0. The official quota-project page has no fenced code blocks; the blocks above restate its commands, headers, and variable names.

## Related

- [view-manage-quotas.md](./view-manage-quotas.md)
- [cloud-quotas-overview.md](./cloud-quotas-overview.md)
