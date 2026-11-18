---
source: https://docs.cloud.google.com/logging/docs/export/aggregated_sinks_overview
---

# Aggregated sinks overview

An aggregated sink is a folder- or organization-level sink that routes log entries from the resource where it is defined and all of its child resources to a destination. Use it to store logs centrally and to control whether child resources also keep copies.

## Signature / Usage

The source has no code for this page. Snippet taken from https://docs.cloud.google.com/logging/docs/export/aggregated_sinks_overview's tutorial counterpart (https://docs.cloud.google.com/logging/docs/central-log-storage); see central-log-storage.md for the full flow.

```text
gcloud logging sinks create SINK_NAME \
  logging.googleapis.com/projects/PROJECT_ID  \
  --log-filter='logName:cloudaudit.googleapis.com' \
  --description="Audit logs from my organization" \
  --organization=ORGANIZATION_ID \
  --include-children
```

Per the gcloud 593.0.0 help, `--intercept-children` is the flag that makes the aggregated sink intercepting.

## Options / Props

### Aggregated sink types

| Type | Behavior | Destination |
|---|---|---|
| Intercepting | Prevents log entries from reaching sinks in child resources, except the `_Required` sink of the originating resource. Avoids duplicate copies. | Must be a Google Cloud project; sinks there reroute to any destination except a project |
| Non-intercepting | Doesn't change routing; entries that match are also sent to the other sinks in the entry's hierarchy | Project, log bucket, BigQuery dataset (write-enabled, not linked), Cloud Storage bucket (not Rapid storage), Pub/Sub topic |

### Routing outcomes for an entry that originates in a project

| Situation | Result |
|---|---|
| No aggregated sink in the hierarchy | Entry goes to the project's sinks |
| Non-intercepting aggregated sink | Routed by that sink if it matches the inclusion filter and no exclusion filter; then also sent to the project's sinks |
| Intercepting sink, entry matches inclusion and no exclusion filter | Routed to the intercepting sink's destination and to the originating project's `_Required` sink |
| Intercepting sink, no inclusion match or an exclusion match | Not routed by it; sent to the originating project's sinks |

### VPC Service Controls

| Topic | Rule |
|---|---|
| Access to project logs inside a perimeter | Aggregated sinks can read log data from projects in a service perimeter; use IAM to restrict this |
| Folder / organization log data | A perimeter doesn't protect folder- or organization-level logs (including aggregate logs); adding a folder protects only projects in it; an organization can't be a protected resource |
| Perimeter-protected destination | Add an ingress rule to the destination perimeter allowing the sink's writer identity |
| Cloud Storage destination in a perimeter | Ingress / egress rule can't use `ANY_SERVICE_ACCOUNT` or `ANY_USER_ACCOUNT`; use `ANY_IDENTITY` |
| Non-aggregated sinks | No ingress rule needed |

## Notes

- Recommended destination for aggregated sinks is a Google Cloud project, so sinks there reroute entries. The `_Required` sink only routes entries matching its filter that originate in its own resource; to keep extra copies of those entries, create a custom sink or modify the `_Default` filter.
- For intercepting sinks: check that child resources don't need independent control of the intercepted entries, put contact information in the sink description, and first test with a non-intercepting aggregated sink.
- Creating an intercepting sink can change values of existing log-based metrics, because routing decides which metrics an entry counts toward. An intercepting sink stops child sinks from storing entries, so verify the filter before enabling it; try it on a disposable folder first.
- Example from the source: intercept Data Access audit logs into a central location to keep them out of project-level storage for security and cost reasons. The `ANY_IDENTITY` rule above opens the perimeter to any identity for that ingress rule's scope; scope it with resources.
- Assured Workloads environments may restrict this feature.
- Source: https://docs.cloud.google.com/logging/docs/export/aggregated_sinks_overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/logging/docs/central-log-storage (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [configure-export-v2.md](./configure-export-v2.md)
- [central-log-storage.md](./central-log-storage.md)
