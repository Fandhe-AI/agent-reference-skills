---
source: https://docs.cloud.google.com/logging/docs/routing/overview
---

# Log routing and storage overview (Log Router and sinks)

Cloud Logging routes log entries from Google Cloud services, applications and other clouds to destinations for storage, analysis and third-party export. By default all entries go to log buckets in the project, folder or organization where they originate; log sinks route them to custom buckets, Cloud Storage, BigQuery or Pub/Sub. Each project, billing account, folder and organization has a Log Router that evaluates the sinks of the resource and of its resource hierarchy.

## Signature / Usage

### Inclusion filter of the `_Required` sink

```text
LOG_ID("cloudaudit.googleapis.com/activity") OR
LOG_ID("externalaudit.googleapis.com/activity") OR
LOG_ID("cloudaudit.googleapis.com/system_event") OR
LOG_ID("externalaudit.googleapis.com/system_event") OR
LOG_ID("cloudaudit.googleapis.com/access_transparency") OR
LOG_ID("externalaudit.googleapis.com/access_transparency")
```

### Inclusion filter of the `_Default` sink

When created, the `_Default` sink has this inclusion filter and an empty exclusion filter (so it routes every entry except the ones the `_Required` sink stores):

```text
NOT LOG_ID("cloudaudit.googleapis.com/activity") AND
NOT LOG_ID("externalaudit.googleapis.com/activity") AND
NOT LOG_ID("cloudaudit.googleapis.com/system_event") AND
NOT LOG_ID("externalaudit.googleapis.com/system_event") AND
NOT LOG_ID("cloudaudit.googleapis.com/access_transparency") AND
NOT LOG_ID("externalaudit.googleapis.com/access_transparency")
```

## Options / Props

### Sink filter rules

| Log entry matches | Result |
|---|---|
| Inclusion filter not matched (a sink with no inclusion filter matches every entry) | Not routed |
| Inclusion filter and at least one exclusion filter | Not routed |
| Inclusion filter and no exclusion filter | Routed to the sink's destination |

### Sink destinations

| Destination | When to use / condition |
|---|---|
| Google Cloud project | Sinks in the destination project reroute the entries (to any supported destination except a project); required for an intercepting aggregated sink. The only destination type where entries are rerouted. One-hop limit. |
| Log bucket | Storage managed by Cloud Logging; viewable in Logs Explorer and Observability Analytics. A linked BigQuery dataset (read-only) can be created on it. |
| BigQuery dataset | Must be write-enabled; never a linked dataset (read-only). Logging creates one table per log name; a table can't be renamed while a sink streams into it. |
| Cloud Storage bucket, except for Rapid storage | Long-term storage as JSON files; the bucket can be in another project. New sinks can take several hours to start routing (processed hourly). |
| Pub/Sub topic | Export to third parties such as Splunk or Datadog; entries are JSON. Topics that enforce in-transit restrictions aren't supported (`topic_region_not_allowed` errors and dropped logs). |

### Destination and routing limits

| Item | Value |
|---|---|
| Entry timestamp too old | Entries older than the logs retention period are discarded |
| Entry timestamp in the future | Entries more than 24 hours in the future are discarded |
| Logs Explorer download | Limited to 10,000 log entries |
| Endpoints | Global endpoint only; regional service endpoints (for example `pubsub.LOCATION.rep.googleapis.com`) aren't supported |
| Project destination | One-hop limit |
| User-defined log buckets | Can't be created in folders or organizations; retention of buckets in folders / organizations can't be extended |

### Log-based metrics and routing

| Metric kind | The Log Router counts an entry when |
|---|---|
| System-defined (project level) | The entry passes through the sinks of the project that defines the metric and is stored in a log bucket (any project) |
| User-defined, project-scoped | Billing is enabled on the defining project and the entry passes through that project's sinks |
| User-defined, bucket-scoped | Billing is enabled on the defining project and the entry is stored in the bucket that defines the metric |

## Notes

- Sinks are not retroactive: an entry received before a sink was created is not routed, and a misconfigured sink routes only entries that arrive after the error is fixed. Use "Batch and route logs retroactively" (copy logs) for past data.
- A misconfigured sink doesn't route entries; error log entries are written and an email goes to the resource's Essential Contacts.
- Every sink in a resource evaluates each entry independently, so several sinks can route the same entry.
- Intercepting aggregated sinks stop entries from reaching sinks in child resources, except the `_Required` sink of the originating resource. Non-intercepting sinks don't affect other routing. The `_Required` sink only matches entries that originate in its own resource and can't be modified or deleted; the `_Default` sink can be modified and disabled.
- Exclusion filters are applied after the Logging API / Telemetry API receives the entry, so they can't reduce `entries.write` quota consumption. Excluded entries are not stored by that sink; try filter changes on a disposable project first.
- If the destination is a project, system-created sinks there exclude entries that were routed to the `_Required` bucket of the source project (for example Admin Activity logs); update the `_Default` sink or add a sink to store them. Error Reporting doesn't analyze entries routed to a log bucket in a different project.
- Centralizing: consider a lien on the project that stores centralized logs. Delete a sink when you delete its destination. Pricing: see the Google Cloud Observability pricing page.
- Routed audit logs and Data Access logs can contain personal data; secure them with the destination's access control.
- The source also shows a video, the centralized-storage examples (folder with `CentralStorage` project and intercepting sink; set of projects whose `_Default` sinks point to a project) and pointers to regionalized logs, GKE multi-tenant logging and CMEK for log routing.
- Source inconsistency: this source page says the `_Default` sink's "inclusion filter for this sink is empty" and that "the exclusion filter is configured as follows" (the `NOT LOG_ID(...) AND ...` expression), while "Restore the `_Default` sink filter" on https://docs.cloud.google.com/logging/docs/export/configure_export_v2 says it is created "with the following inclusion filter and an empty exclusion filter". This page follows the configure_export_v2 wording, because by the sink filter rules above an exclusion filter of `NOT LOG_ID("cloudaudit.googleapis.com/activity") AND ...` would drop every entry except the audit logs that `_Default` is meant to leave to `_Required`.
- Source: https://docs.cloud.google.com/logging/docs/routing/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-export-v2.md](./configure-export-v2.md)
- [aggregated-sinks-overview.md](./aggregated-sinks-overview.md)
- [central-log-storage.md](./central-log-storage.md)
- [using-exported-logs.md](./using-exported-logs.md)
