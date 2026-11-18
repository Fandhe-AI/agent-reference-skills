---
source: https://docs.cloud.google.com/logging/docs/view/query-library
---

# Sample Logging queries: IAM, Security Command Center and security audit logs

Logging query language samples for Identity and Access Management changes, Security Command Center scanner and audit logs, and security audit logs (Cloud Audit Logs log types, Cloud KMS, Secret Manager, VPC Service Controls, audit configuration, log bucket view access). Usage rules are in [query-library.md](./query-library.md).

## Signature / Usage

```text
logName:"cloudaudit.googleapis.com"
```

```text
log_id("cloudaudit.googleapis.com/data_access")
```

Adapted (not in the official docs): in "Secret Manager secret lifecycle events" the source wrote `protoPayload.methodName= ~"..."` with a space between `=` and `~`, which is not the regular expression operator `=~`; the operator is written `=~` below and in the table.

```text
(resource.type="audited_resource" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.methodName=~"google.cloud.secretmanager.v1.SecretManagerService.(Create|Delete)Secret") OR (resource.type="secretmanager.googleapis.com/Secret" AND log_id("secretmanager.googleapis.com/secret_event") AND jsonPayload.@type= "type.googleapis.com/google.cloud.secretmanager.logging.v1.SecretEvent")
```

## Options / Props

### Identity and Access Management

| Query/filter name | Expression |
|---|---|
| Service account creation logs | `resource.type="service_account" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.methodName="google.iam.admin.v1.CreateServiceAccount"` |
| Service account creation key logs | `resource.type="service_account" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.methodName="google.iam.admin.v1.CreateServiceAccountKey"` |
| Set access control policy logs | `resource.type="project" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.methodName="SetIamPolicy"` |
| External principal granted access to organization | `resource.type="project" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.@type="type.googleapis.com/google.cloud.audit.AuditLog" AND protoPayload.request.@type:"IamPolicy" AND protoPayload.serviceData.policyDelta.bindingDeltas.member:* AND NOT protoPayload.serviceData.policyDelta.bindingDeltas.member:"@DOMAIN_NAME.com"` |
| Resource creation, modification, or deletion | `log_id("cloudaudit.googleapis.com/activity") AND protoPayload.methodName:("create" OR "delete" OR "update")` |
| Role granted to principal | `log_id("cloudaudit.googleapis.com/activity") AND resource.type="project" AND protoPayload.serviceName="cloudresourcemanager.googleapis.com" AND protoPayload.methodName="SetIamPolicy" AND protoPayload.serviceData.policyDelta.bindingDeltas.action="Add" AND protoPayload.serviceData.policyDelta.bindingDeltas.member:"EMAIL_ID"` |
| Role removed from principal | `log_id("cloudaudit.googleapis.com/activity") AND resource.type="project" AND protoPayload.serviceName="cloudresourcemanager.googleapis.com" AND protoPayload.methodName="SetIamPolicy" AND protoPayload.serviceData.policyDelta.bindingDeltas.action="Remove" AND protoPayload.serviceData.policyDelta.bindingDeltas.member:"EMAIL_ID"` |
| Permission updated in a custom role | `log_id("cloudaudit.googleapis.com/activity") AND resource.type="iam_role" AND protoPayload.serviceName="iam.googleapis.com" AND protoPayload.methodName:"UpdateRole" AND resource.labels.role_name:"ROLE_ID"` |
| Project created, deleted, or undeleted | `log_id("cloudaudit.googleapis.com/activity") AND resource.type=("folder" OR "project") AND protoPayload.serviceName="cloudresourcemanager.googleapis.com" AND protoPayload.methodName=~"(Create\|Delete\|Undelete)Project" AND resource.labels.project_id="PROJECT_ID"` |
| Organization policy constraint enforced | `log_id("cloudaudit.googleapis.com/activity") AND resource.type="audited_resource" AND protoPayload.serviceName="orgpolicy.googleapis.com" AND protoPayload.request.policy.name:"CONSTRAINT_NAME" AND protoPayload.request.policy.spec.rules.enforce="true"` |
| Organization policy dry-run violations | `(protoPayload.policyViolationInfo.orgPolicyViolationInfo:* OR protoPayload.metadata.@type= "type.googleapis.com/google.cloud.audit.OrgPolicyDryRunAuditMetadata")` |

### Security Command Center

| Query/filter name | Expression |
|---|---|
| Security Command Center vulnerability scanner requests | `httpRequest.userAgent="TsunamiSecurityScanner"` |
| Security Command Center scanner requests blocked by access controls (`HTTP 403`) | `httpRequest.userAgent="TsunamiSecurityScanner" AND httpRequest.status=403` |
| Exclude Security Command Center vulnerability scanner requests | `NOT httpRequest.userAgent="TsunamiSecurityScanner"` |
| Security Command Center Admin Activity audit logs | `protoPayload.serviceName="securitycenter.googleapis.com" AND log_id("cloudaudit.googleapis.com/activity")` |
| All Security Command Center audit logs | `protoPayload.serviceName="securitycenter.googleapis.com"` |

### Security

| Query/filter name | Expression |
|---|---|
| Audit logs - all | `logName:"cloudaudit.googleapis.com"` |
| Audit logs - Access Transparency (AXT) | `log_id("cloudaudit.googleapis.com/access_transparency")` |
| Audit logs - Admin Activity | `log_id("cloudaudit.googleapis.com/activity")` |
| Audit logs - Data Access | `log_id("cloudaudit.googleapis.com/data_access")` |
| Audit logs - System Event | `log_id("cloudaudit.googleapis.com/system_event")` |
| Cloud Key Management Service key version destruction | `resource.type="cloudkms_cryptokeyversion" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.methodName="DestroyCryptoKeyVersion" AND resource.labels.crypto_key_id="KMS_KEY_NAME"` |
| Secret Manager secret lifecycle events | `(resource.type="audited_resource" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.methodName=~"google.cloud.secretmanager.v1.SecretManagerService.(Create\|Delete)Secret") OR (resource.type="secretmanager.googleapis.com/Secret" AND log_id("secretmanager.googleapis.com/secret_event") AND jsonPayload.@type= "type.googleapis.com/google.cloud.secretmanager.logging.v1.SecretEvent")` |
| VPC Service Controls policy violations for a service | `log_id("cloudaudit.googleapis.com/policy") AND resource.type="audited_resource" AND protoPayload.metadata.@type= "type.googleapis.com/google.cloud.audit.VpcServiceControlAuditMetadata" AND protoPayload.serviceName="SERVICE_NAME" AND severity=ERROR` |
| VPC Service Controls policy violations from a caller IP address | `log_id("cloudaudit.googleapis.com/policy") AND resource.type="audited_resource" AND protoPayload.metadata.@type= "type.googleapis.com/google.cloud.audit.VpcServiceControlAuditMetadata" AND protoPayload.requestMetadata.callerIp="CALLER_IP" AND severity=ERROR` |
| VPC Service Controls policy violation details by unique ID | `log_id("cloudaudit.googleapis.com/policy") AND resource.type="audited_resource" AND protoPayload.metadata.@type= "type.googleapis.com/google.cloud.audit.VpcServiceControlAuditMetadata" AND protoPayload.metadata.vpcServiceControlsUniqueId="UNIQUE_ID" AND severity=ERROR` |
| Audit log configuration removal | `log_id("cloudaudit.googleapis.com/activity") AND resource.type=("organization" OR "project" OR "folder") AND protoPayload.serviceData.policyDelta.auditConfigDeltas.action="REMOVE"` |
| Audit log configuration addition | `log_id("cloudaudit.googleapis.com/activity") AND resource.type=("organization" OR "project" OR "folder") AND protoPayload.serviceData.policyDelta.auditConfigDeltas.action="ADD"` |
| Log bucket view access queries | `resource.type="logging_log" AND protoPayload.authorizationInfo.permission="logging.views.access" AND protoPayload.methodName="google.logging.v2.LoggingServiceV2.AggregateLogs" AND protoPayload.authorizationInfo.resource= "projects/PROJECT_ID/locations/global/buckets/BUCKET_NAME/views/_AllLogs"` |

## Notes

- Adapted from the official docs: the Secret Manager query originally read `protoPayload.methodName= ~"google.cloud.secretmanager.v1.SecretManagerService.(Create|Delete)Secret"` (space between `=` and `~`).
- The Security Command Center queries find its audit logs and requests from its services, including the External Exposure vulnerability scanner (`TsunamiSecurityScanner` user agent); see `https://docs.cloud.google.com/security-command-center/docs/detect-external-exposure#identify-scanner-traffic` and `https://docs.cloud.google.com/security-command-center/docs/troubleshooting#tsunami-scanner-403`.
- The Security Command Center scanner queries are for the Security Command Center services; the product itself is in the `gcp-security-compliance` skill. IAM roles and service accounts are in `gcp-foundation`; Cloud KMS and VPC Service Controls in `gcp-security`.
- Data Access audit logs (`cloudaudit.googleapis.com/data_access`) can contain personal data and request / response payloads; restrict who can read them and do not copy results to public locations.
- The "External principal granted access" and "Role granted / removed" queries only read audit entries; they don't change IAM.
- Audit log names use the URL-encoded form (`%2F`) in `logName` comparisons and the plain form in `log_id()`.
- Source: https://docs.cloud.google.com/logging/docs/view/query-library (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [query-library.md](./query-library.md)
- [query-library-compute-networking.md](./query-library-compute-networking.md)
- [query-library-kubernetes.md](./query-library-kubernetes.md)
