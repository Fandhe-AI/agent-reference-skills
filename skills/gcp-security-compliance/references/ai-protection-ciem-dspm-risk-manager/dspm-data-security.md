---
source: https://docs.cloud.google.com/security-command-center/docs/dspm-data-security
---

# Data Security Posture Management (DSPM) overview

Data Security Posture Management (DSPM) gives a data-centric view of Google Cloud security: what sensitive data you have, where it is stored and whether its use meets your security and compliance requirements. Applies to Standard, Premium and Enterprise (Deprecated) service tiers and requires organization-level activation of Security Command Center (SCC); Standard-tier capabilities are described in the separate "DSPM in the Standard tier" page. DSPM will be shut down on February 1, 2027 and is no longer available to new organizations; existing users keep access until then (see Notes).

## Signature / Usage

The real-time alerting method below starts from a continuous export of findings to Pub/Sub. From the gcloud CLI, `gcloud scc notifications create` creates a Security Command Center notification config with a filter and the Pub/Sub topic that receives the notifications (help example: organization `123`, topic `projects/test-project/topics/notification-test`):

```bash
gcloud scc notifications create test-config --organization=123 \
    --pubsub-topic=projects/test-project/topics/notification-test \
    --filter="resource_name: \"a\""
```

### Correlate Compliance Manager and Sensitive Data Protection findings

- Real-time alerting with Pub/Sub: set up a continuous export to Pub/Sub that filters for `ACTIVE` findings and use downstream services such as Cloud Run functions or Cloud Run to alert or trigger workflows when both related findings exist and are `ACTIVE` for the same resource.
- Scheduled analysis with BigQuery: use the continuous streaming export or the bulk one-time export to BigQuery, then run scheduled SQL queries that self-join the `findings` table on `resource_name` and filter for resources where both findings are `ACTIVE`.

## Options / Props

### Premium and Enterprise (Deprecated) capabilities

| Capability | Detail |
|---|---|
| Data discovery and classification | Discover and classify sensitive data in Google Cloud, including BigQuery and Cloud Storage. |
| Data governance | Evaluate data security posture against Google best practices and compliance frameworks. |
| Control enforcement | Map requirements to data governance cloud controls such as Data Access Governance and Data Flow Governance. |
| Compliance monitoring | Monitor workloads against applied data security frameworks and generate audit evidence. |
| DSPM dashboard (Premium, Enterprise) | Data map explorer (filter by sensitivity, project), security findings for policy violations, framework deployment and coverage. |
| Data security and privacy essentials framework (Premium, Enterprise) | Applied automatically to the organization in detective mode when DSPM is enabled; copy it to build custom frameworks with the advanced controls and apply them to organization, folders, projects and App Hub applications in folders configured for application management. |

### Data security and privacy essentials baseline controls

| Cloud control (ID) | Comparable detectors (combined) |
|---|---|
| Require CMEK for BigQuery Tables with Sensitive Data (`SENSITIVE_DATA_BIGQUERY_TABLE_CMEK_DISABLED`) | Compliance Manager `BIGQUERY_TABLE_CMEK_DISABLED` + Sensitive Data Protection `DATA_SENSITIVITY` |
| Require CMEK for BigQuery Datasets with Sensitive Data (`SENSITIVE_DATA_DATASET_CMEK_DISABLED`) | Compliance Manager `DATASET_CMEK_DISABLED` + `DATA_SENSITIVITY` |
| Block Public Access to BigQuery Datasets with Sensitive Data (`SENSITIVE_DATA_PUBLIC_DATASET`) | Compliance Manager `PUBLIC_DATASET` + `DATA_SENSITIVITY` |
| Block Public Access to Cloud SQL Instances with Sensitive Data (`SENSITIVE_DATA_PUBLIC_SQL_INSTANCE`) | Compliance Manager `PUBLIC_SQL_INSTANCE` and `SQL_PUBLIC_IP` + `DATA_SENSITIVITY` |
| Require CMEK for Cloud SQL Instances with Sensitive Data (`SENSITIVE_DATA_SQL_CMEK_DISABLED`) | Compliance Manager `SQL_CMEK_DISABLED` + `DATA_SENSITIVITY` |

### Advanced data governance and security cloud controls (Premium, Enterprise (Deprecated); detective mode only)

| Group | Control name | Stage |
|---|---|---|
| Monitor user permissions | Restrict Access to Sensitive Data to Permitted Users | Not marked Preview |
| Prevent data exfiltration | Restrict Flow of Sensitive Data Across Geographic Jurisdictions | Not marked Preview |
| Enforce CMEK encryption | Enable CMEK for Gemini Enterprise Agent Platform Datasets, Metadata Stores, Models, Featurestore, and BigQuery Tables | Not marked Preview |
| Manage data deletion | Govern the Maximum Retention Period for Sensitive Data | Not marked Preview (Cloud Storage objects: Preview, sign-up required) |
| Manage data retention | Govern the minimum retention period for Cloud Storage objects | Preview; sign-up required |
| Manage data encryption | Require Customer-Managed Encryption for Cloud Storage Objects | Preview; sign-up required |
| Manage public access to data | Restrict Public Access to Cloud Storage Objects | Preview; sign-up required |

### Supported asset types and limitations

| Control | Supported asset types | Limitations |
|---|---|---|
| Restrict Access to Sensitive Data to Permitted Users | BigQuery datasets and tables; Cloud Storage buckets; Agent Platform models, datasets, feature stores, metadata stores | Principals: user accounts or groups (consumer Google Accounts, managed Google Accounts, Google Workspace for Education); not robot, service, delegation-only brand, resource or device accounts. Requires Data Access audit logs for Cloud Storage and Agent Platform. Evaluated when a user account reads a supported resource. |
| (same) | | Only read operations. Service account access (including impersonation) is exempt. Copies made via service account operations (Storage Transfer Service, BigQuery Data Transfer Service) are not covered. |
| (same) | | Linked datasets are not supported (no data access audit logs). Wildcard table queries are handled at dataset level, not tableset level. Public access to Cloud Storage objects and authenticated browser sessions are not supported. BigQuery tables and datasets are not supported when deployed to an App Hub application. |
| Restrict Flow of Sensitive Data Across Geographic Jurisdictions | BigQuery datasets and tables; Cloud Storage buckets; Agent Platform models, datasets, feature stores, metadata stores | Only read operations. Country: from the request IP for internet requests (proxy location if a proxy is used) or the cloud zone for Compute Engine VM requests. Agent Platform: internet requests only. No public Cloud Storage objects or authenticated browser sessions. No BigQuery tables and datasets in App Hub applications in folders configured for application management. Repeated access from a non-compliant location within 24 hours: only the first access is a violation. |
| Enforce CMEK encryption controls | Agent Platform datasets, metadata stores, models, featurestore; BigQuery tables | BigQuery tables not supported when deployed to an App Hub application. |
| Govern the Maximum Retention Period for Sensitive Data | BigQuery datasets and tables; Agent Platform models, datasets, feature stores, metadata stores; Cloud Storage objects (Preview, sign-up) | BigQuery tables and datasets not supported when deployed to an App Hub application. |
| Cloud Storage object controls (Preview) | Cloud Storage objects | Findings are generated at bucket level; object-level findings are queried in Storage Intelligence Datasets view `object_security_findings_view`. |

### Object-level findings for Cloud Storage controls (Preview)

| Control | `findingType` | `findingReason` |
|---|---|---|
| Govern the minimum retention period for Cloud Storage objects | `SCC_DSPM_DATA_RETENTION` | `MINIMUM_RETENTION_VIOLATION` |
| Require Customer-Managed Encryption for Cloud Storage Objects | `SCC_DSPM_ENCRYPTION_NO_CMEK` | `ENCRYPTION_CMEK_VIOLATION` |
| Restrict Public Access to Cloud Storage Objects | `SCC_DSPM_PUBLIC_ACCESS_GOVERNANCE` | `PUBLIC_ACCESS_VIOLATION` |

### Sensitive Data Protection and DSPM

| Aspect | Sensitive Data Protection | DSPM |
|---|---|---|
| Data scope | Finds and classifies sensitive data (PII, secrets) in storage on Google Cloud | Assesses the security posture around the classified data |
| Core actions | Scans, profiles, de-identifies | Enforces, monitors, validates policies |
| Findings focus | Where sensitive data is located | Why the data is exposed (public access, missing CMEK, excessive permissions) |
| Integration | Feeds DSPM with sensitivity and classification metadata | Uses that data to apply and monitor controls and risk assessments |

## Notes

- Deprecated: "Data Security Posture Management will be shut down on February 1, 2027. DSPM is no longer available to new organizations. Existing users retain full access until shutdown."
- Enterprise tier shutdown: "The Security Command Center Enterprise service tier will shut down on May 21, 2027. If your organization uses the Enterprise service tier, then the organization will automatically move to the Premium service tier on or after May 21, 2027."
- Mitigations stated in the source: ensure only trusted service accounts can access sensitive Cloud Storage, BigQuery and Agent Platform resources and do not grant `roles/iam.serviceAccountTokenCreator` to users who should not have access; do not grant `roles/bigquery.admin`, `roles/bigquery.dataOwner` or `roles/bigquery.studioAdmin` to users who should not access sensitive BigQuery resources.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/notifications/create (gcloud 593.0.0 help). The help example filters on `resource_name`; the source's alerting method filters for `ACTIVE` findings, so set `--filter` accordingly.
- The minimum retention period of the Cloud Storage retention control is specified in seconds; it prevents deletion or modification of objects until it has passed. For the public-access control, the `sccDspmFinding.securityInsights` field of the object-level finding gives details on public accessibility, including read and write access.
- All advanced controls support detective mode only; deployment steps are in the "Use DSPM" page. Sign-up for the Preview Cloud Storage controls is through a Google form linked from the source.
- Source: https://docs.cloud.google.com/security-command-center/docs/dspm-data-security (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [ai-protection-overview.md](./ai-protection-overview.md)
- [ciem-overview.md](./ciem-overview.md)
