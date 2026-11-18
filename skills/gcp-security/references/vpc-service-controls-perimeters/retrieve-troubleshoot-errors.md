---
source: https://docs.cloud.google.com/vpc-service-controls/docs/retrieve-troubleshoot-errors
---

# Retrieve VPC Service Controls errors from audit logs

Determine whether an error comes from VPC Service Controls, look up a specific error by its unique ID, and query audit logs for VPC Service Controls denials with the Logging query language or `gcloud logging read`.

## Signature / Usage

### Last 24 hours of VPC Service Controls errors

By default the `read` command is limited to the last 24 hours. Run it against the project inside the service perimeter.

```bash
gcloud logging read 'protoPayload.metadata.@type:"type.googleapis.com/google.cloud.audit.VpcServiceControlAuditMetadata"'
```

### A relative period

```bash
gcloud logging read \
'protoPayload.metadata.@type:"type.googleapis.com/google.cloud.audit.VpcServiceControlAuditMetadata"' \
  --freshness=DURATION
```

Past week:

```bash
gcloud logging read \
'protoPayload.metadata.@type:"type.googleapis.com/google.cloud.audit.VpcServiceControlAuditMetadata"' \
  --freshness=7d
```

### Between specific dates

```bash
gcloud logging read \
'protoPayload.metadata.@type:"type.googleapis.com/google.cloud.audit.VpcServiceControlAuditMetadata" AND
  timestamp>="2019-03-22T23:59:59Z" AND
  timestamp<="2019-03-26T00:00:00Z"'
```

## Options / Props

### Error messages that indicate VPC Service Controls

| Service | Error |
|---|---|
| Cloud Storage | `403: Request violates VPC Service Controls.` |
| BigQuery | `403: VPC Service Controls: Request is prohibited by organization's policy.` |
| Other services | `403: Request is prohibited by organization's policy.` |

### Placeholders

| Name | Description |
|---|---|
| `DURATION` | Relative duration (gcloud relative duration and time formats). |
| `START_DATETIME`, `END_DATETIME` | Absolute date and time strings (gcloud absolute date and time formats); used as `timestamp>="START_DATETIME"` and `timestamp<="END_DATETIME"`. |

## Notes

- Perimeter changes can take up to 30 minutes to propagate. After that, access to restricted services cannot cross the perimeter boundary unless explicitly authorized.
- To check whether an error is from VPC Service Controls, verify that it is enabled and applied to the project and service, by checking the VPC Service Controls policy at that level of the resource hierarchy. A service may inherit an error from a restricted dependency used indirectly from a project inside a perimeter.
- Unlike the console, the `gcloud` tool returns a unique ID for VPC Service Controls errors. In Cloud Logging for the project inside the perimeter that triggered the error, enter the unique ID in the search-filter field to see the log entry. For other errors, filter by metadata (the queries above).
- Console: in Logs Explorer use the filter `protoPayload.metadata.@type:"type.googleapis.com/google.cloud.audit.VpcServiceControlAuditMetadata"`, select **Audited Resource** in the **Resource** menu and the time range. Omitted as a click-path.
- Follow-up tools named by the source: violation analyzer (comprehensive evaluation report), the classic troubleshooter report, and the troubleshooting pages for common issues and for other services within a perimeter.
- Source: https://docs.cloud.google.com/vpc-service-controls/docs/retrieve-troubleshoot-errors (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [dry-run-mode.md](./dry-run-mode.md)
- [manage-service-perimeters.md](./manage-service-perimeters.md)
