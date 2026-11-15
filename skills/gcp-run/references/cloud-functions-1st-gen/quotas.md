---
source: https://docs.cloud.google.com/functions/quotas
---

# Quotas (Cloud Run functions, 1st gen and 2nd gen)

Quota limits for Cloud Run functions in four areas (resource, time, rate, networking), with 1st gen and Cloud Run functions (2nd gen) limits side by side. Raise quotas on the Cloud Run functions Quotas page (https://console.cloud.google.com/iam-admin/quotas?service=cloudfunctions.googleapis.com&usage=ALL&project=_): select the quotas, click Edit quotas, enter the new limits.

## Signature / Usage

The source has no code. Avoid hitting the WRITE API quota when deploying with the Firebase CLI by deploying individual functions (https://firebase.google.com/docs/cli/#deploy_specific_functions); the CALL API is the one behind `gcloud functions call` (testing only).

Snippet taken from https://docs.cloud.google.com/functions/1stgendocs/deploy (a single 1st gen deployment, one write call):

```bash
gcloud functions deploy my-http-function \
  --no-gen2 \
  --region=us-central1 \
  --runtime=nodejs22 \
  --source=. \
  --entry-point=myHttpFunction \
  --trigger-http
```

## Options / Props

### Resource limits (scope: per project; regional)

| Quota | Limit (1st gen) | Limit (2nd gen) | Can be increased | Scope |
| --- | --- | --- | --- | --- |
| Number of functions per region | 1,000 | 1,000 minus the number of Cloud Run services deployed | No | per region |
| Max deployment size | 100MB (compressed) for sources; 500MB (uncompressed) for sources plus modules | N/A | No | per function |
| Max uncompressed HTTP request size | 10MB | 32MB | No | per invocation |
| Max uncompressed HTTP response size | 10MB | 10MB streaming; 32MB non-streaming | No | per invocation |
| Max event size (event-driven) | 10MB | 512KB for Eventarc events; 10MB for legacy events | No | per event |
| Max function memory | 8GiB | 32GiB | No | per function |
| Max project memory (sum of requested memory over 1 minute) | Depends on region (greater in high-capacity regions, lower in recently opened regions) | N/A | Yes | per project and region |
| Max project CPU (milli vCPU, sum over 1 minute) | Depends on region | N/A | Yes | per project and region |

### Time limits

| Quota | Limit (1st gen) | Limit (2nd gen) | Can be increased | Scope |
| --- | --- | --- | --- | --- |
| Max function duration | 540 seconds | 60 minutes for HTTP functions; 1800 seconds for scheduled / Task queue functions; 540 seconds for event-driven functions | No | per invocation |

### Rate limits

| Quota | Limit (1st gen) | Limit (2nd gen) | Can be increased | Scope |
| --- | --- | --- | --- | --- |
| API calls (READ) | 5000 per 100 seconds | 1200 per 60 seconds | Only for 1st gen | per project (1st gen), per region (2nd gen) |
| API calls (WRITE) | 80 per 100 seconds | 60 per 60 seconds | No | per project (1st gen), per region (2nd gen) |
| API calls (CALL) | 16 per 100 seconds | N/A | No | per project |

### Networking limits

Cloud Run functions (2nd gen): see https://cloud.google.com/run/quotas#networking_limits. 1st gen: outbound connections per second per instance 500 (cannot be increased); outbound DNS resolutions per second per instance 100 (cannot be increased); max packets per second per instance 80,000; max bits per second per instance 100,000,000.

### Additional quotas for background functions

| Quota | Limit | Can be increased | Scope | Product version |
| --- | --- | --- | --- | --- |
| Max concurrent invocations | 3,000 | Yes | per function | 1st gen only |
| Max invocation rate | 1000 per second | No | per function | 1st gen only |
| Max concurrent event data size | 10MB | No | per function | 1st gen and 2nd gen |
| Max throughput of incoming events | 10MB per second | No | per function | 1st gen and 2nd gen |

## Notes

- Source inconsistency: this page gives max function memory of 32GiB for Cloud Run functions (2nd gen); the comparison page (https://docs.cloud.google.com/run/docs/functions/comparison) gives the instance size as up to 16 GiB RAM with 4 vCPU.
- Pub/Sub messages are base64-encoded: a 10 MB Pub/Sub message (the maximum) exceeds 10 MB once encoded and can exceed the max size limit.
- WRITE quota shortfalls generally come from CI/CD systems deploying many functions at a high rate or the Firebase CLI deploying many at once; change the deployment rate. The CALL API applies to 1st gen only and is meant for testing (console or `gcloud functions call`), not heavy traffic.
- Scalability: HTTP-invoked functions scale up quickly, background functions more gradually. Factors: execution time, cold-start init time, error rate, transient regional load, and min instances / max instances / concurrency (concurrency is 2nd gen only). Default max instances for 2nd gen HTTP functions is 100 (can be raised to 1,000); 1st gen HTTP functions have no default limit, so the source recommends setting one (for example, 3000).
- Reaching a quota makes the resource unavailable until refreshed or increased, possibly for all functions in the project; a function returns HTTP 500 when over quota and unable to execute.
- Source: https://docs.cloud.google.com/functions/quotas (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/functions/1stgendocs/deploy (snippet)

## Related

- [quotas-1st-gen.md](./quotas-1st-gen.md)
- [deploy-1st-gen.md](./deploy-1st-gen.md)
- [concepts-overview.md](./concepts-overview.md)
