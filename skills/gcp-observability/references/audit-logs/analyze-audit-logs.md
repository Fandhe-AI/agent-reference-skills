---
source: https://docs.cloud.google.com/logging/docs/analyze/analyze-audit-logs
---

# Sample queries for audit logs in Observability Analytics

BigQuery-standard SQL queries you can run on the **Observability Analytics** page to aggregate and analyze audit logs: changes to Logging settings, most common actions, roles granted on service accounts, and unusually high API usage by a principal.

## Signature / Usage

Replace `VIEW` in each query with the table name of the log view you query, in the format `project_ID.region.bucket_ID.view_ID` (in the **Log views** list, select **Query** on the view to see the default query with its table name).

### Changes made to Logging settings

Identifies when audit logs are disabled or the default Logging settings change (Admin Activity audit logs):

```sql
SELECT
  receive_timestamp, timestamp AS eventTimestamp,
  proto_payload.audit_log.request_metadata.caller_ip,
  proto_payload.audit_log.authentication_info.principal_email,
  proto_payload.audit_log.resource_name,
  proto_payload.audit_log.method_name
FROM
  `VIEW`
WHERE
  proto_payload.audit_log.service_name = "logging.googleapis.com"
  AND log_id = "cloudaudit.googleapis.com/activity"
```

### Determine most common actions performed in the past month

Returns the 100 most performed actions in the past 30 days with `method_name`, `service_name`, resource type, and a counter:

```sql
SELECT
  proto_payload.audit_log.method_name,
  proto_payload.audit_log.service_name,
  resource.type,
  COUNT(*) AS counter
FROM
  `VIEW`
WHERE
  timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
  AND log_id="cloudaudit.googleapis.com/data_access"
GROUP BY
  proto_payload.audit_log.method_name,
  proto_payload.audit_log.service_name,
  resource.type
ORDER BY
  counter DESC
LIMIT 100
```

### Detect roles granted on a service account

Finds roles granted on service accounts (service account impersonation) in the last seven days, excluding approved grantees (`%@example.com`):

```sql
SELECT
  timestamp,
  proto_payload.audit_log.authentication_info.principal_email as grantor,
  JSON_VALUE(bindingDelta.member) as grantee,
  JSON_VALUE(bindingDelta.role) as role,
  proto_payload.audit_log.resource_name,
  proto_payload.audit_log.method_name
FROM
  `VIEW`,
  UNNEST(JSON_QUERY_ARRAY(proto_payload.audit_log.service_data.policyDelta.bindingDeltas)) AS bindingDelta
WHERE
  timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
  AND log_id = "cloudaudit.googleapis.com/activity"
  AND (
    (resource.type = "service_account"
    AND proto_payload.audit_log.method_name LIKE "google.iam.admin.%.SetIAMPolicy")
    OR
    (resource.type IN ("project", "folder", "organization")
    AND proto_payload.audit_log.method_name = "SetIamPolicy"
    AND JSON_VALUE(bindingDelta.role) LIKE "roles/iam.serviceAccount%")
  )
  AND JSON_VALUE(bindingDelta.action) = "ADD"
  -- Principal (grantee) exclusions
  AND JSON_VALUE(bindingDelta.member) NOT LIKE "%@example.com"
ORDER BY
  timestamp DESC
```

### Identify high API usage by a principal

Per principal, computes the average number of API calls per day and the standard deviation; displays days where the counter exceeds the running average plus three times the standard deviation, with the counter, the average, and the actions performed:

```sql
SELECT
  *
FROM (
  SELECT
    *,
    AVG(counter) OVER (
      PARTITION BY principal_email
      ORDER BY day
      ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) AS avg,
    STDDEV(counter) OVER (
      PARTITION BY principal_email
      ORDER BY day
      ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) AS stddev,
    COUNT(*) OVER (
      PARTITION BY principal_email
      RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS numSamples
  FROM (
    SELECT
      proto_payload.audit_log.authentication_info.principal_email,
      EXTRACT(DATE FROM timestamp) AS day,
      ARRAY_AGG(DISTINCT proto_payload.audit_log.method_name IGNORE NULLS) AS actions,
      COUNT(*) AS counter
    FROM `VIEW`
    WHERE
      timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 60 DAY)
      AND proto_payload.audit_log.authentication_info.principal_email IS NOT NULL
      AND proto_payload.audit_log.method_name NOT LIKE "storage.%.get"
      AND proto_payload.audit_log.method_name NOT LIKE "v1.compute.%.list"
      AND proto_payload.audit_log.method_name NOT LIKE "beta.compute.%.list"
    GROUP BY
      proto_payload.audit_log.authentication_info.principal_email,
      day
  )
)
WHERE
  counter > avg + 3 * stddev
  AND day >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)
ORDER BY
  counter DESC
```

## Options / Props

### Prerequisites

| Requirement | Detail |
|-------------|--------|
| Audit log source | A project, folder, or organization that generates audit logs |
| Log bucket | Access to a view on the log bucket the audit logs are routed to; the bucket must be upgraded to use Observability Analytics |
| Role: Logs Configuration Writer | `roles/logging.configWriter` on your project (to create sinks) |
| Role: Logs Viewer | `roles/logging.viewer` on your project (to view logs); viewing Data Access logs needs additional roles or permissions (see Access control with IAM) |

### Which log type to query

| Goal | Audit logs to use |
|------|-------------------|
| Privilege escalation through IAM, or defense evasion by disabling Logging | Admin Activity audit logs |
| Potential misuse of APIs or data in services such as Cloud Storage or BigQuery | Data Access audit logs |
| How frequently data is accessed and by which users | All audit logs |

## Notes

- The "most common actions" query filters on `log_id="cloudaudit.googleapis.com/data_access"`, although the source's text says it searches all audit logs; the SQL is kept verbatim.
- Audit log queries return principal emails, caller IPs, and resource names; treat results as sensitive. Data Access logs must be enabled to appear; see the Data Access page.
- The source also shows the Observability Analytics console steps.
- Source: https://docs.cloud.google.com/logging/docs/analyze/analyze-audit-logs (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [audit-logs-overview.md](./audit-logs-overview.md)
- [configure-data-access.md](./configure-data-access.md)
- [best-practices.md](./best-practices.md)
