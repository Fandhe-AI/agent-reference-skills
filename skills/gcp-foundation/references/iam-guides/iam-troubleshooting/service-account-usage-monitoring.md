---
source: https://docs.cloud.google.com/iam/docs/service-account-monitoring
---

# Monitoring Service Account and Key Usage

Cloud Monitoring exposes authentication-event metrics for service accounts and service account keys, to track usage patterns and spot anomalies.

## Signature / Usage

Metric types (use percent-encoded in REST filters):

```text
iam.googleapis.com%2Fservice_account%2Fauthn_events_count          (service account usage)
iam.googleapis.com%2Fservice_account%2Fkey%2Fauthn_events_count    (service account key usage)
```

All service accounts or keys (`METRIC_TYPE` as above; times are percent-encoded RFC 3339, e.g. `2020-06-12T00%3A00%3A00.00Z`):

```
GET https://monitoring.googleapis.com/v3/projects/PROJECT_ID/timeSeries?filter=metric.type%3D%22METRIC_TYPE%22&interval.endTime=END_TIME&interval.startTime=START_TIME
```

A single service account (filter by the numeric Unique ID):

```
GET https://monitoring.googleapis.com/v3/projects/PROJECT_ID/timeSeries?filter=metric.type%3D%22iam.googleapis.com%2Fservice_account%2Fauthn_events_count%22%20AND%20resource.labels.unique_id%3D%22SERVICE_ACCOUNT_ID%22&interval.endTime=END_TIME&interval.startTime=START_TIME
```

A single key: first list keys, then filter by the key ID (everything after `keys/` in the key `name`):

```
GET https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts/SA_NAME@PROJECT_ID.iam.gserviceaccount.com/keys?keyTypes=KEY_TYPES
```

```
GET https://monitoring.googleapis.com/v3/projects/PROJECT_ID/timeSeries?filter=metric.type%3D%22iam.googleapis.com%2Fservice_account%2Fkey%2Fauthn_events_count%22%20AND%20metric.labels.key_id%3D%22KEY_ID%22&interval.endTime=END_TIME&interval.startTime=START_TIME
```

curl form, shown for the all-accounts request:

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://monitoring.googleapis.com/v3/projects/PROJECT_ID/timeSeries?filter=metric.type%3D%22METRIC_TYPE%22&interval.endTime=END_TIME&interval.startTime=START_TIME"
```

## Notes

- Metrics appear for any Google API call using the account or key, successful or failed. Keys can show usage when a system merely lists keys while authenticating (e.g. Cloud Storage signed URLs, third-party apps).
- Excluded: Cloud Storage HMAC keys and requests authenticated by API keys bound to service accounts.
- Service account metrics include disabled accounts. Key metrics exclude disabled keys but may include expired or deleted keys.
- Retention is 6 weeks; export to BigQuery for longer analysis. Metrics are usually available within minutes.
- Console: Metrics explorer, resource IAM Service Account, category Service_account, metrics "Service account authentication events" or "Service account key authentication events"; or the Service Accounts page, Metrics tab ("Authentication traffic" and "Authentication traffic per key" charts).
- Required role: Monitoring Viewer `roles/monitoring.viewer`; enable the IAM and Cloud Monitoring APIs (`serviceusage.services.enable`). For only the latest usage dates see Activity Analyzer; service account insights find accounts unused for 90 days.
- Source: https://docs.cloud.google.com/iam/docs/service-account-monitoring
- Retrieved 2026-11-14. Text CC BY 4.0, code samples Apache 2.0.

## Related

- [review-iam-policy-history.md](./review-iam-policy-history.md)
