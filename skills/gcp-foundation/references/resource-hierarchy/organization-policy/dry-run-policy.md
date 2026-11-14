---
source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/dry-run-policy
---

# Organization Policy in Dry-Run Mode

An organization policy in dry-run mode is created like any other policy and violations are audit-logged, but violating actions are not denied. Use it to preview the impact of a policy change.

## Signature / Usage

Policy with `dryRunSpec` (managed constraint with list parameter):

```yaml
  name: RESOURCE_TYPE/RESOURCE_ID/policies/compute.managed.restrictProtocolForwardingCreationForTypes
  dryRunSpec:
    rules:
    - enforce: true
      parameters:
       allowedSchemes:
        - EXTERNAL
```

Live and dry-run specs in one file (managed constraint with `enforce` and `parameters`):

Adapted (not in the official docs): the official sample uses legacy `values.allowedValues` for this managed constraint; it is rewritten with `enforce` / `parameters.allowedSchemes` as in the first example, so the policy can be applied.

```yaml
name: RESOURCE_TYPE/RESOURCE_ID/policies/compute.managed.restrictProtocolForwardingCreationForTypes
spec:
  rules:
  - enforce: true
    parameters:
      allowedSchemes:
      - INTERNAL
      - EXTERNAL

dryRunSpec:
  rules:
  - enforce: true
    parameters:
      allowedSchemes:
      - INTERNAL
```

Set it (use `--update-mask`; omitting it on an existing policy is an error):

```bash
gcloud org-policies set-policy POLICY_PATH \
  --update-mask=UPDATE_MASK
```

`UPDATE_MASK` is `spec` (live only), `dryRunSpec` (dry-run only), or `*` (both). `gcloud org-policies describe` shows `dryRunSpec` only if it exists.

Boolean / custom constraint dry run:

```yaml
  name: RESOURCE_TYPE/RESOURCE_ID/policies/CONSTRAINT_NAME
  dryRunSpec:
    rules:
    - enforce: true
```

```yaml
name: RESOURCE_TYPE/RESOURCE_ID/policies/CONSTRAINT_NAME
spec:
  rules:
  - enforce: false

dryRunSpec:
  rules:
  - enforce: true
```

`CONSTRAINT_NAME` example: `custom.disableGkeAutoUpgrade`.

### Create a dry-run policy from a live policy

```bash
gcloud org-policies describe gcp.restrictServiceUsage \
  --project=PROJECT_ID
```

```yaml
  name: projects/123456789012/policies/gcp.restrictServiceUsage
  spec:
    etag: CJy93KEGEKCJw/QB
    rules:
    - values:
        allowedValues:
        - compute.googleapis.com
  updateTime: '2023-04-12T21:11:56.512804Z'
```

Copy to a temp file, remove `etag` and `updateTime`, rename `spec` to `dryRunSpec`, then edit:

```yaml
  name: projects/123456789012/policies/gcp.restrictServiceUsage
  dryRunSpec:
    rules:
    - values:
        allowedValues:
        - compute.googleapis.com
        - appengine.googleapis.com
```

```bash
gcloud org-policies set-policy POLICY_PATH \
  --update-mask=dryRunSpec
```

### Delete

Remove only the dry-run part: write the policy with only `spec` and run `set-policy` with `--update-mask=dryRunSpec` (the live part of the file is ignored):

```yaml
  name: RESOURCE_TYPE/RESOURCE_ID/policies/gcp.restrictServiceUsage
  spec:
    rules:
    - values:
        allowedValues:
        - container.googleapis.com
```

```bash
gcloud org-policies set-policy POLICY_PATH \
  --update-mask=dryRunSpec
```

Delete both live and dry-run:

```bash
gcloud org-policies delete CONSTRAINT_NAME \
  --RESOURCE_TYPE=RESOURCE_ID
```

(Replace `--RESOURCE_TYPE` with `--organization`, `--folder`, or `--project` (singular), per `gcloud org-policies delete --help`.)

### Analyze dry-run results

Audit log generation:

| Live policy | Dry-run policy | Audit log generated |
|---|---|---|
| Allow | Allow | No |
| Allow | Deny | Dry-run log only |
| Deny | Allow | Live and dry-run log |
| Deny | Deny | Live and dry-run log |

Log entry shape (policy audit log, `OrgPolicyDryRunAuditMetadata`):

```json
{
  "protoPayload": {
    "@type": "type.googleapis.com/google.cloud.audit.AuditLog",
    "status": {
      "code": 7,
      "message": "PERMISSION_DENIED"
    },
    "authenticationInfo": {},
    "requestMetadata": {
      "callerIp": "1.2.3.4",
      "requestAttributes": {},
      "destinationAttributes": {}
    },
    "serviceName": "appengine.googleapis.com",
    "methodName": "google.api.appengine.v1.appengine.apps.services.get",
    "resourceName": "projects/sur-project-test-3",
    "metadata": {
      "constraint": "constraints/gcp.restrictServiceUsage",
      "checkedValue": "appengine.googleapis.com",
      "liveResult": "ALLOWED",
      "@type": "type.googleapis.com/google.cloud.audit.OrgPolicyDryRunAuditMetadata",
      "dryRunResult": "DENIED"
    }
  },
  "insertId": "1f2bvoxcmg1",
  "resource": {
    "type": "audited_resource",
    "labels": {
      "project_id": "sur-project-test-3",
      "service": "appengine.googleapis.com",
      "method": "google.api.appengine.v1.appengine.apps.services.get"
    }
  },
  "timestamp": "2022-06-16T19:42:58.244990928Z",
  "severity": "WARNING",
  "logName": "projects/sur-project-test-3/logs/cloudaudit.googleapis.com%2Fpolicy",
  "receiveTimestamp": "2022-06-16T19:42:59.572025716Z"
}
```

Logs Explorer query (log name = `policy`):

```text
protoPayload.metadata.dryRunResult = "DENIED" AND \
protoPayload.metadata.liveResult = "ALLOWED"
```

gcloud:

Adapted (not in the official docs): the whole filter is passed as one quoted argument.

```bash
gcloud logging read 'protoPayload.metadata.dryRunResult = "DENIED" AND protoPayload.metadata.liveResult = "ALLOWED"' \
    --RESOURCE_TYPE=RESOURCE_ID
```

(`RESOURCE_TYPE` is `organization`, `folder` or `project`; add `--freshness` for logs older than 1 day.)

### Aggregate logs into BigQuery

Adapted (not in the official docs): the filter uses `log_id("cloudaudit.googleapis.com/policy")` so policy audit logs from all child projects are aggregated (the official filter matches one `PROJECT_ID` log name only), and `sinks describe` uses `--organization` to look up the organization sink.

```none
gcloud logging sinks create SINK_NAME \
  bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID \
  --include-children \
  --organization=ORGANIZATION_ID \
  --log-filter='log_id("cloudaudit.googleapis.com/policy") AND protoPayload.metadata.@type:OrgPolicyDryRunAuditMetadata'
```

```none
gcloud logging sinks describe SINK_NAME \
  --organization=ORGANIZATION_ID
```

If the output has a `writerIdentity` (for example `serviceAccount:service-123456789012@gcp-sa-logging.iam.gserviceaccount.com`), grant it write access:

```none
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member=PRINCIPAL_ID \
  --role=roles/bigquery.dataEditor
```

Query for denials in the last seven days:

Adapted (not in the official docs): the wildcard table path is backtick-quoted without braces, and the time filter compares the TIMESTAMP column with `TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)` (the official sample compares it with a DATE).

```sql
SELECT protopayload_auditlog.serviceName as serviceName,
    protopayload_auditlog.methodName as methodName,
    JSON_EXTRACT_SCALAR(protopayload_auditlog.metadataJson, '$.constraint') as constraint,
    JSON_EXTRACT_SCALAR(protopayload_auditlog.metadataJson, '$.dryRunResult') as dryRunResult,
    JSON_EXTRACT_SCALAR(protopayload_auditlog.metadataJson, '$.liveResult') as liveResult
FROM `PROJECT_ID.DATASET_ID.cloudaudit_googleapis_com_policy_*`
WHERE JSON_EXTRACT_SCALAR(protopayload_auditlog.metadataJson, '$.dryRunResult') = "DENIED"
AND `timestamp` > TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
LIMIT 1000
```

## Options / Props

Constraints usable in dry-run mode (any other constraint returns an error):

| Constraint |
|------------|
| Restrict resource usage (`gcp.restrictServiceUsage`) |
| Restrict endpoint usage (Assured Workloads) |
| Restrict TLS versions (Assured Workloads) |
| Restrict TLS cipher suites (Assured Workloads) |
| Custom constraints |
| Managed constraints |

Required roles on the organization: `roles/orgpolicy.policyAdmin`; for aggregated sinks also `roles/logging.configWriter`. Billing must be enabled on the project.

## Notes

- Effective dry-run evaluation: dry-run policies are inherited like live ones, but the effective dry-run result reflects the live policy when a resource sets a live policy locally and none for dry-run. Example table (Organization A live `enforced: false`, dry-run `true`):

| Resource | Set live | Effective live | Set dry-run | Effective dry-run |
|---|---|---|---|---|
| Organization A | `enforced: false` | `enforced: false` | `enforced: true` | `enforced: true` |
| Folder B | `enforced: false` | `enforced: false` | None | `enforced: false` |
| Folder C | None | `enforced: false` | None | `enforced: true` |
| Project X | `enforced: true` | `enforced: true` | None | `enforced: true` |
| Project Y | None | `enforced: false` | `enforced: true` | `enforced: true` |

- Adapted from the official docs: the `gcloud logging read` filter is quoted as a single argument (the official sample is unquoted), and the live + dry-run example uses `enforce` / `parameters.allowedSchemes` for the managed constraint.
- Adapted from the official docs: the aggregated sink filter uses `log_id("cloudaudit.googleapis.com/policy")` (organization-wide) and `sinks describe` passes `--organization=ORGANIZATION_ID`.
- Adapted from the official docs: the BigQuery denial query quotes the wildcard table path in backticks and uses `TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)` for the 7-day window.
- Dry-run changes still affect audit-log volume; the aggregated sink grants `roles/bigquery.dataEditor` to the sink writer identity, so scope it to the destination project only.
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/dry-run-policy
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [overview.md](./overview.md)
- [using-constraints.md](./using-constraints.md)
- [audit-logging.md](./audit-logging.md)
- gcp-cli (gcloud logging in general)
