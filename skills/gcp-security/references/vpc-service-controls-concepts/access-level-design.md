---
source: https://docs.cloud.google.com/vpc-service-controls/docs/access-level-design
---

# Design access levels

Access-level implementations and recommendations for starting service perimeter enforcement based on allowlists. After a dry-run execution of workloads you know which IP addresses and identities to allow; access levels grant controlled access to protected resources based on IP address, identity, or device.

## Signature / Usage

To surface blocked violations, configure an aggregated logging sink that sends audit logs for all projects in the perimeter to BigQuery, then run this query. It excludes logs from a dry-run perimeter (`dryRun` is null for enforced violations):

```sql
SELECT
receiveTimestamp, #time of violation
Resource.labels.service, #protected Google Cloud service being blocked
protopayload_auditlog.methodName, #method name being called
resource.labels.project_id as PROJECT, #protected project blocking the call
protopayload_auditlog.authenticationInfo.principalEmail, #caller identity
protopayload_auditlog.requestMetadata.callerIp, #caller IP
JSON_EXTRACT(protopayload_auditlog.metadataJson, '$.dryRun') as DRYRUN, #dry-run indicator
JSON_EXTRACT(protopayload_auditlog.metadataJson, '$.violationReason') as REASON, #reason for violation
protopayload_auditlog.metadataJson, #raw violation entry
FROM `BQ_DATASOURCE_NAME.cloudaudit_googleapis_com_policy_*`
WHERE JSON_EXTRACT(protopayload_auditlog.metadataJson, '$.dryRun') is null #exclude logs from a dry-run perimeter
```

### Source IP

- Only public IP CIDR ranges can be used in access levels for IP-based allowlists. Because this allows all protected APIs from the range, the environment behind the IPs must be trusted and controlled. A typical use is allowing perimeter access from on-premises networks.
- To allow access from private resources in a different project or organization, a Cloud NAT gateway is required in the source project. Cloud NAT integrates with Private Google Access, keeping traffic to Google APIs internal, so the `RequestMetadata.caller_ip` field of the `AuditLog` object is redacted to `gce-internal-ip`. In that case configure an ingress rule based on other attributes such as the project or service account instead of an access level based on the external source IP.

### Caller identity

- Add service accounts and organization super administrators to the allowlist. The perimeter is open to these identities from any IP address, so guard them well and avoid minting keys for allowlisted service accounts.
- Adding user identities to a perimeter allowlist is uncommon, and groups cannot be added.
- Resources inside the perimeter can be reached through VMs in the perimeter, trusted on-premises networks, or trusted devices. Use Cloud Workstations, because VPC Service Controls does not support Cloud Shell.

### Caller device attributes

Device trust (trusted endpoint) relies on a valid organization user signed in to a Chrome browser or Chromebook, and applies to the OS signed-in session; a different OS user session on the same machine cannot call protected APIs.

### Initiate enforcement

- Re-run the workloads after updating the access levels to confirm there are no violations, then start enforcement.
- Choose and communicate an enforcement date; make security operations and incident response aware; make sure someone with permissions can inspect logs and approve additional allowlists; make sure the response team can open a Google Cloud support case.
- Create or modify perimeters and access levels with automation such as Terraform; the source recommends against doing this manually.
- Move projects of a single workload from the dry run perimeter to the live perimeter first, observe violation logs, and repeat workload by workload.

## Options / Props

### Device conditions

| Condition | Description |
|-----------|-------------|
| Verified Chrome OS | Cryptographically verified; a valid organization user is signed in to a securely booted Chromebook. Recommended tier 1 trust condition. |
| Require admin approval for device access | Cloud Identity administrators approve each device before access. By default devices are auto-approved if a valid organization user is signed in; the source recommends turning auto-approval off. |
| Require corp owned device | The Chrome agent reads the serial number from the OS (usually from the BIOS), which must match serial numbers entered into Cloud Identity. Because the serial number is not authoritative on non-Chrome OS devices, a user with elevated administrator privileges might spoof it. Use only as a tier 2 check. |

## Notes

- Source: https://docs.cloud.google.com/vpc-service-controls/docs/access-level-design (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Caller device attributes are available only with Chrome Enterprise Premium. For trust to apply, the user and device must be in the same organization as the Google Cloud resources.
- An identity-based allowlist with access levels can be implemented only with the gcloud CLI; the Google Cloud console can configure ingress rules that implement identity-based access.
- Allowlisting a public IP range or a service account allows all protected APIs for that source; keep the range or identity set as small as the workloads need and verify with dry run first.
- `BQ_DATASOURCE_NAME` is a placeholder for the BigQuery dataset that receives the audit log sink. The `#` comments inside the SQL fence are part of the source query.
- Audit-log sinks and Cloud Audit Logs are in `gcp-observability`; BigQuery is in `gcp-bigquery` (planned).

## Related

- [context-aware-access.md](./context-aware-access.md)
- [architect-perimeters.md](./architect-perimeters.md)
- [ingress-egress-rules.md](./ingress-egress-rules.md)
