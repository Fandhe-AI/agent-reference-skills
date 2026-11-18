---
source: https://docs.cloud.google.com/security-command-center/docs/how-to-use-event-threat-detection
---

# Use Event Threat Detection

How to review Event Threat Detection findings in the Google Cloud console and Cloud Logging, plus links to example finding JSON (Premium and Enterprise (Deprecated) service tiers). Event Threat Detection is enabled by default; enabling or disabling it or its modules is done in Security Command Center service settings (Configure Security Command Center services).

## Signature / Usage

### Show all findings caused by one user

In the Findings page query editor, replace `USER_EMAIL` with the address shown next to Principal email in a finding's details pane.

```text
access.principal_email="USER_EMAIL"
```

### View findings in Cloud Logging

Enter this in the Logs Explorer query editor (Query pane) and click Run query. The source tags this block `bash`; it is a Logging query.

```text
resource.type="threat_detector"
```

## Options / Props

### Timing and prerequisites

| Item | Detail |
|---|---|
| Activation | Event Threat Detection activation occurs within seconds. |
| Detection latency | Generally less than 15 minutes from the time a log is written to when the finding is available in Security Command Center. |
| Required setting | The service must be enabled in Security Command Center Services settings to view findings; some logs it scans are off by default and may need to be turned on. |
| Cloud Logging view | Requires continuous exports to Cloud Logging, available only when you activate Security Command Center Premium at the organization level. |
| Test | You can intentionally trigger a detector to generate a finding and verify configuration (Test Event Threat Detection). |
| IAM | Security Command Center roles can be granted at organization, folder or project level; your ability to view, edit, create or update findings, assets and sources depends on that level. |
| Data residency | If data residency is enabled for your organization, use the jurisdictional console. |

### Quick filters (Findings page, Source display name)

| Filter | Shows |
|---|---|
| Event Threat Detection | Findings from built-in Event Threat Detection detectors |
| Event Threat Detection Custom Modules | Findings from custom modules for Event Threat Detection |

### Example finding JSON (URL pattern: `https://docs.cloud.google.com/security-command-center/docs/findings/threats/<slug>#example_json`)

| Threat finding | `<slug>` |
|---|---|
| `Active Scan: Log4j Vulnerable to RCE` | `log4j-active-scan-success` |
| `Brute force SSH` | `ssh-brute-force` |
| `Cloud IDS: THREAT_IDENTIFIER` | `cloud-ids-threat-activity` |
| `Defense Evasion: Breakglass Workload Deployment Created` | `binary-authorization-breakglass-workload-create` |
| `Defense Evasion: Breakglass Workload Deployment Updated` | `binary-authorization-breakglass-workload-update` |
| `Defense Evasion: Folder Level TokenCreator Role Granted to AI Agent` | `ai-agent-granted-token-creator-role-folder` |
| `Defense Evasion: Modify VPC Service Control` | `vpcsc-change-reduces-perimeter-protection` |
| `Defense Evasion: Organization Level TokenCreator Role Granted to AI Agent` | `ai-agent-granted-token-creator-role-org` |
| `Defense Evasion: Project Level TokenCreator Role Granted to AI Agent` | `ai-agent-granted-token-creator-role-project` |
| `Discovery: AI Agent Service Account Self-Investigation` | `ai-agent-iam-anomalous-behavior-service-account-gets-own-iam-policy` |
| `Discovery: AI Agent Unauthorized Service Account API Call` | `ai-agent-unauthorized-service-account-api-call` |
| `Discovery: Can get sensitive Kubernetes object check` | `gke-control-plane-can-get-sensitive-object` |
| `Discovery: Service Account Self-Investigation` | `iam-anomalous-behavior-service-account-gets-own-iam-policy` |
| `Evasion: Access from Anonymizing Proxy` | `bad-ip-google-proxy-intel` |
| `Execution: Cryptomining Docker Image` | `cloud-run-cryptomining-docker-images` |
| `Exfiltration: AI Agent Initiated BigQuery Data Exfiltration to External Table` | `ai-agent-big-query-exfil` |
| `Exfiltration: AI Agent Initiated BigQuery Data Extraction` | `ai-agent-big-query-exfil-to-cloud-storage` |
| `Exfiltration: AI Agent Initiated BigQuery VPC Perimeter Violation` | `ai-agent-big-query-vpc-violation` |
| `Exfiltration: AI Agent Initiated CloudSQL Exfiltration to External Bucket` | `ai-agent-cloudsql-exfil-export-external` |
| `Exfiltration: AI Agent Initiated CloudSQL Exfiltration to Public Bucket` | `ai-agent-cloudsql-exfil-export-public` |
| `Exfiltration: BigQuery Data Exfiltration` | `big-query-exfil` |
| `Exfiltration: BigQuery Data Extraction` | `big-query-exfil-to-cloud-storage` |
| `Exfiltration: BigQuery Data to Google Drive` | `big-query-exfil-to-google-drive` |
| `Exfiltration: Cloud SQL Data Exfiltration` | `cloudsql-exfil-export` |
| `Exfiltration: Cloud SQL Over-Privileged Grant` | `cloudsql-exfil-user-granted-all-permissions` |
| `Exfiltration: Cloud SQL Restore Backup to External Organization` | `cloudsql-exfil-restore-backup-to-external-instance` |
| `Impact: Cryptomining Commands` | `cloud-run-jobs-cryptomining-commands` |
| `Impact: Deleted Google Cloud Backup and DR Backup` | `backup-delete-vault-backup` |
| `Impact: Deleted Google Cloud Backup and DR host` | `backup-hosts-delete-host` |
| `Impact: Deleted Google Cloud Backup and DR plan association` | `backup-delete-backup-plan-association` |
| `Impact: Deleted Google Cloud Backup and DR Vault` | `backup-delete-vault` |
| `Impact: Gemini Discovery Engine API Document Import by External User` | `gemini-discovery-engine-api-document-import-by-external-user` |
| `Impact: Gemini Discovery Engine API Document Import from External Resource` | `gemini-discovery-engine-api-document-import-from-external-resource` |
| `Impact: Gemini Discovery Engine API Document Import VPC Perimeter Violation` | `gemini-discovery-engine-api-document-import-vpc-perimeter-violation` |
| `Impact: Google Cloud Backup and DR delete policy` | `backup-templates-delete-policy` |
| `Impact: Google Cloud Backup and DR delete profile` | `backup-profiles-delete-profile` |
| `Impact: Google Cloud Backup and DR delete storage pool` | `backup-storage-pools-delete` |
| `Impact: Google Cloud Backup and DR delete template` | `backup-templates-delete-template` |
| `Impact: Google Cloud Backup and DR expire all images` | `backup-expire-images-all` |
| `Impact: Google Cloud Backup and DR expire image` | `backup-expire-image` |
| `Impact: Google Cloud Backup and DR reduced backup expiration` | `backup-reduce-backup-expiration` |
| `Impact: Google Cloud Backup and DR reduced backup frequency` | `backup-reduce-backup-frequency` |
| `Impact: Google Cloud Backup and DR remove appliance` | `backup-appliances-remove-appliance` |
| `Impact: Google Cloud Backup and DR remove plan` | `backup-remove-plan` |
| `Initial Access: Account Disabled Hijacked` | `gsuite-account-disabled-hijacked` |
| `Initial Access: AI Agent Identity Excessive Permission Denied Actions` | `ai-agent-excessive-failed-attempt` |
| `Initial Access: Database Superuser Writes to User Tables` | `cloudsql-superuser-writes-to-user-tables` |
| `Initial Access: Disabled Password Leak` | `gsuite-disabled-password-leak` |
| `Initial Access: Dormant Service Account Action` | `dormant-service-account-used-in-action` |
| `Initial Access: Dormant Service Account Activity in AI Service` | `ai-dormant-service-account-used-in-action` |
| `Initial Access: Dormant Service Account Key Created` | `dormant-service-account-key-created` |
| `Initial Access: Excessive Permission Denied Actions` | `excessive-failed-attempt` |
| `Initial Access: Government Based Attack` | `gsuite-government-backed-attack` |
| `Initial Access: Leaked Service Account Key Used` | `leaked-sa-key-used` |
| `Initial Access: Log4j Compromise Attempt` | `log4j-compromise-attempt` |
| `Initial Access: Suspicious Login Blocked` | `gsuite-suspicious-login-blocked` |
| `Lateral Movement: Modified Boot Disk Attached to Instance` | `modify-boot-disk-attach-to-instance` |
| `Malware: bad domain` | `bad-domain-live-google-intel` |
| `Malware: bad IP` | `bad-ip-live-google-intel` |
| `Malware: Cryptomining Bad Domain` | `bad-domain-google-crypto-intel` |
| `Malware: Cryptomining Bad IP` | `bad-ip-google-crypto-intel` |
| `Persistence: External Access Granted to Gemini Discovery Engine API Apps` | `external-access-granted-to-gemini-discovery-engine-api-apps` |
| `Persistence: GCE Admin Added SSH Key` | `gce-admin-add-ssh-key` |
| `Persistence: GCE Admin Added Startup Script` | `gce-admin-add-startup-script` |
| `Persistence: IAM Anomalous Grant` | `iam-anomalous-grant` |
| `Persistence: New AI API Method` | `ai-anomalous-behavior-new-api-method` |
| `Persistence: New API Method` | `anomalous-behavior-new-api-method` |
| `Persistence: New Geography` | `iam-anomalous-behavior-ip-geolocation` |
| `Persistence: New Geography for AI Service` | `ai-iam-anomalous-behavior-ip-geolocation` |
| `Persistence: New User Agent` | `iam-anomalous-behavior-user-agent` |
| `Persistence: Sensitive AI Permission Added to Custom Role` | `sensitive-ai-permission-added-to-custom-role` |
| `Persistence: Sensitive Role Granted by AI Agent` | `sensitive-role-granted-by-ai-agent` |
| `Persistence: Sensitive Role Granted to External AI Agent` | `external-ai-agent-granted-sensitive-role` |
| `Persistence: SSO Enablement Toggle` | `gsuite-sso-enablement-toggle` |
| `Persistence: SSO Settings Changed` | `gsuite-sso-settings-changed` |
| `Persistence: Strong Authentication Disabled` | `gsuite-strong-authentication-disabled` |
| `Persistence: Two Step Verification Disabled` | `gsuite-two-step-verification-disabled` |
| `Privilege Escalation: AI Agent Cross-Project Access Token Generation` | `ai-agent-token-generation-cross-project-access-token` |
| `Privilege Escalation: AI Agent Cross-Project OpenID Token Generation` | `ai-agent-token-generation-cross-project-openid` |
| `Privilege Escalation: AI Agent Token Generation Using Implicit Delegation` | `ai-agent-token-generation-implicit-delegation` |
| `Privilege Escalation: AI Agent Token Generation Using signJwt` | `ai-agent-token-generation-sign-jwt` |
| `Privilege Escalation: AlloyDB Database Superuser Writes to User Tables` | `alloydb-superuser-writes-to-user-tables` |
| `Privilege Escalation: AlloyDB Over-Privileged Grant` | `alloydb-user-granted-all-permissions` |
| `Privilege Escalation: Anomalous Impersonation of Service Account for Admin Activity` | `anomalous-sa-delegation-impersonation-of-sa-admin-activity` |
| `Privilege Escalation: Anomalous Impersonation of Service Account for AI Admin Activity` | `ai-anomalous-sa-delegation-impersonation-of-sa-admin-activity` |
| `Privilege Escalation: Anomalous Multistep Service Account Delegation for Admin Activity` | `anomalous-sa-delegation-multistep-admin-activity` |
| `Privilege Escalation: Anomalous Multistep Service Account Delegation for AI Admin Activity` | `ai-anomalous-sa-delegation-multistep-admin-activity` |
| `Privilege Escalation: Anomalous Multistep Service Account Delegation for AI Data Access` | `ai-anomalous-sa-delegation-multistep-data-access` |
| `Privilege Escalation: Anomalous Multistep Service Account Delegation for Data Access` | `anomalous-sa-delegation-multistep-data-access` |
| `Privilege Escalation: Anomalous Service Account Impersonator for Admin Activity` | `anomalous-sa-delegation-impersonator-admin-activity` |
| `Privilege Escalation: Anomalous Service Account Impersonator for AI Admin Activity` | `ai-anomalous-sa-delegation-impersonator-admin-activity` |
| `Privilege Escalation: Anomalous Service Account Impersonator for AI Data Access` | `ai-anomalous-sa-delegation-impersonator-data-access` |
| `Privilege Escalation: Anomalous Service Account Impersonator for Data Access` | `anomalous-sa-delegation-impersonator-data-access` |
| `Privilege Escalation: Changes to sensitive Kubernetes RBAC objects` | `gke-control-plane-edit-sensitive-rbac-object` |
| `Privilege Escalation: Create Kubernetes CSR for master cert` | `gke-control-plane-csr-for-master-cert` |
| `Privilege Escalation: Creation of sensitive Kubernetes bindings` | `gke-control-plane-create-sensitive-binding` |
| `Privilege Escalation: Default Compute Engine Service Account SetIAMPolicy` | `cloud-run-services-set-iam-policy` |
| `Privilege Escalation: Dormant Service Account Granted Sensitive Role` | `dormant-service-account-added-in-iam-role` |
| `Privilege Escalation: External Member Added To Privileged Group` | `external-member-added-to-privileged-group` |
| `Privilege Escalation: Get Kubernetes CSR with compromised bootstrap credentials` | `gke-control-plane-get-csr-with-compromised-bootstrap-credentials` |
| `Privilege Escalation: Impersonation Role Granted For Dormant Service Account` | `dormant-service-account-impersonation-role-granted` |
| `Privilege Escalation: Launch of privileged Kubernetes container` | `gke-control-plane-launch-privileged-container` |
| `Privilege Escalation: Privileged Group Opened To Public` | `privileged-group-opened-to-public` |
| `Privilege Escalation: Sensitive Role Granted To Hybrid Group` | `sensitive-role-to-group-with-external-member` |

## Notes

- The Security Command Center Enterprise service tier will shut down on May 21, 2027; an organization using it automatically moves to the Premium service tier on or after that date.
- Console procedure: Findings page > select project or organization > Quick filters > Source display name > open a finding under Category to see when the event occurred, the data source, severity, the actions taken and the user (Principal email).
- Each example includes only the most relevant fields of a finding; the full field list is in the Security Command Center API `Finding` resource.
- Example JSON is what you see when you export findings in the Google Cloud console or list findings with the Security Command Center API or the Google Cloud CLI.
- Source: https://docs.cloud.google.com/security-command-center/docs/how-to-use-event-threat-detection (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts-event-threat-detection-overview.md](./concepts-event-threat-detection-overview.md)
- [event-threat-detection-rules.md](./event-threat-detection-rules.md)
- [how-to-investigate-threats.md](./how-to-investigate-threats.md)
