---
source: https://docs.cloud.google.com/functions/quotas-1st-gen
---

# Quotas (1st gen)

Quota limits for Cloud Run functions (1st gen) in three areas: resource, time and rate limits. For combined 1st gen / 2nd gen limits see quotas.md. Quota increases: Cloud Run functions Quotas page (https://console.cloud.google.com/iam-admin/quotas?service=cloudfunctions.googleapis.com&usage=ALL&project=_), select quotas, EDIT QUOTAS.

## Signature / Usage

The source has no code. The CALL API (behind `gcloud functions call`) is for testing only.

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

### Resource limits (per project, regional)

| Quota | Limit | Can be increased | Scope |
| --- | --- | --- | --- |
| Number of functions per region | 1,000 | No | per region |
| Max deployment size | 100MB (compressed) for sources; 500MB (uncompressed) for sources plus modules | No | per function |
| Max uncompressed HTTP request size | 10MB | No | per invocation |
| Max uncompressed HTTP response size | 10MB | No | per invocation |
| Max event size for event-driven functions | 10MB | No | per event |
| Max function memory | 8GiB | No | per function |

### Time limits

| Quota | Limit | Can be increased | Scope |
| --- | --- | --- | --- |
| Max function duration | 540 seconds | No | per invocation |

### Rate limits

| Quota | Limit | Can be increased | Scope |
| --- | --- | --- | --- |
| API calls (READ) | 5000 per 100 seconds | Yes | per project |
| API calls (WRITE) | 80 per 100 seconds | No | per project |
| API calls (CALL) | 16 per 100 seconds | No | per project |

### Scalability limits

| Quota | Limit | Can be increased | Scope |
| --- | --- | --- | --- |
| Max invocation rate | 1000 per second (e.g. 100ms events cap at 1000/s even with 100 parallel requests) | No | per function |
| Max throughput of incoming events | 10MB per second (e.g. 1MB events cap at 10/s) | No | per function |

## Notes

- Pub/Sub messages are base64-encoded; a 10 MB Pub/Sub message exceeds 10 MB once encoded and can exceed the max size limit.
- WRITE quota: cannot be increased; shortfalls generally come from CI/CD systems or the Firebase CLI deploying many functions at once; change the deployment rate (Firebase CLI: `--only` to deploy individual functions). CALL quota: cannot be increased; meant for console / `gcloud functions call` testing, not heavy traffic.
- Scalability: HTTP functions scale up quickly, background functions more gradually; factors include execution time, cold start initialization, and min / max instances configuration. The source text is truncated at the cold-start bullet.
- Reaching a quota makes the resource unavailable until refreshed or increased, possibly for all functions in the project; a function returns HTTP 500 when over quota and cannot execute.
- Source: https://docs.cloud.google.com/functions/quotas-1st-gen (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/functions/1stgendocs/deploy (snippet)

## Related

- [quotas.md](./quotas.md)
- [deploy-1st-gen.md](./deploy-1st-gen.md)
