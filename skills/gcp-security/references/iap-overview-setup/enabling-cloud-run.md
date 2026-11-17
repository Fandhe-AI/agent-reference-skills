---
source: https://docs.cloud.google.com/iap/docs/enabling-cloud-run
---

# Enable IAP for Cloud Run

Enable Identity-Aware Proxy on the backend service of a load balancer that fronts Cloud Run services. The recommended method is to enable IAP directly on the Cloud Run service (documented in the Cloud Run docs); use this page when Cloud Run runs in multiple regions behind one global backend service and you need central access management.

## Signature / Usage

### Create the IAP service agent and grant it the invoker role

IAP calls your Cloud Run service with the IAP service agent, so it needs `roles/run.invoker`. The service agent is created when IAP is enabled; creating it again does not duplicate it.

Adapted (not in the official docs): `gcloud services identity create` exists only on the `beta` / `alpha` tracks in gcloud 593.0.0, so the command uses `gcloud beta`, and `[PROJECT_ID]` is written as an upper-case placeholder.

```bash
gcloud beta services identity create --service=iap.googleapis.com --project=PROJECT_ID
```

Adapted (not in the official docs): `[SERVICE-NAME]` and `[PROJECT-NUMBER]` are written as upper-case placeholders and `--region=REGION` is added.

```bash
gcloud run services add-iam-policy-binding SERVICE_NAME \
   --region=REGION \
   --member='serviceAccount:service-PROJECT_NUMBER@gcp-sa-iap.iam.gserviceaccount.com' \
   --role='roles/run.invoker'
```

### Enable IAP on the backend service

Run the global or regional command, depending on whether the backend service is global or regional.

```bash
gcloud compute backend-services update BACKEND_SERVICE_NAME --global --iap=enabled
```

```bash
gcloud compute backend-services update BACKEND_SERVICE_NAME --region REGION_NAME --iap=enabled
```

After enabling IAP, manage the access policy with the role `roles/iap.httpsResourceAccessor`.

### Limit direct access to the Cloud Run service

To keep traffic from using the default `run.app` URL, disable the default URL; otherwise configure ingress settings to restrict network ingress for Cloud Run.

## Options / Props

### Known limitations

| Limitation | Detail |
|------------|--------|
| One layer only | IAP can't be used on both Cloud Run services and the load balancer. IAP on the load balancer secures only traffic through the load balancer, not traffic reaching the service through its `run.app` URL |
| `X-Serverless-Authorization` | IAP authenticates to Cloud Run with this header; Cloud Run passes it to your service after stripping its signature. Remove it before forwarding the request to another Cloud Run service that requires IAM authentication |
| Cloud CDN | IAP is incompatible with Cloud CDN |
| Latency | IAP increases latency; enable it only for services that are not latency-sensitive |

### Prerequisites

| Requirement | Detail |
|-------------|--------|
| Project | Google Cloud project with billing enabled |
| Services | One or more Cloud Run services served by an external or internal HTTPS load balancer |
| Domain | A domain name registered to the load balancer address |
| Application code | Verifies that all requests have an identity |

### Permissions to turn IAP on (console)

| Permission |
|------------|
| `compute.backendServices.update` |
| `clientauthconfig.clients.create` |
| `clientauthconfig.clients.getWithSecret` |

### Troubleshooting

| Error | Cause and fix |
|-------|---------------|
| `Your client does not have permission to get URL from this server` | The IAP service account lacks the Cloud Run Invoker role on `service-[PROJECT-NUMBER]@gcp-sa-iap.iam.gserviceaccount.com`; grant it, and redeploy the Cloud Run service if it persists |
| `Setting IAM permissions failed` | Enabling IAP in a new project for the first time can fail because the Cloud Run Service Agent failed; enable IAP again or set the IAM policy manually |
| `The IAP service account is not provisioned` | Create it with `gcloud services identity create --service=iap.googleapis.com --project=[PROJECT_ID]` (beta track, see above) |

## Notes

- Permissions to turn IAP on (console): These are granted by roles such as Project Editor. At least one protocol in the load balancer frontend must be HTTPS.
- Console flow in the source: add principals with the **IAP-secured Web App User** role (Google Account, Google Group, service account, Google Workspace domain), toggle IAP on in the **Turn on IAP** dialog, then grant **Cloud Run Invoker** to `service-[PROJECT-NUMBER]@gcp-sa-iap.iam.gserviceaccount.com`. The source's Terraform sample is omitted here.
- By default IAP uses a Google-managed OAuth client, so only users within the organization can access the application; for external users use the custom OAuth page.
- `run.routes.invoke`: during the IAP with Cloud Run Preview, Cloud Run did not perform the `run.routes.invoke` permission check for IAP calls using Cloud Run Invoker; with General Availability it does. Some projects that depended on Preview behavior were placed on an allowlist; contact Cloud Run support to remove them.
- Corrected from the official docs: the source runs `gcloud services identity create --service=iap.googleapis.com --project=[PROJECT_ID]` on the GA track; gcloud 593.0.0 help lists the command only under `gcloud beta services identity create` and `gcloud alpha services identity create`. Bracketed placeholders such as `[SERVICE-NAME]` were replaced by upper-case placeholders, and `--region` was added to `gcloud run services add-iam-policy-binding [SERVICE-NAME]` (without it and without a default `run/region`, gcloud 593.0.0 fails with `Failed to find attribute [region]`).
- Granting `roles/run.invoker` to the IAP service agent is the source's requirement for this setup; grant it on the single Cloud Run service (as in the command above), not at project level.
- Source: https://docs.cloud.google.com/iap/docs/enabling-cloud-run (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts-overview.md](./concepts-overview.md)
- [managing-access.md](./managing-access.md)
- [custom-oauth-configuration.md](./custom-oauth-configuration.md)
- [enabling-compute-howto.md](./enabling-compute-howto.md)
