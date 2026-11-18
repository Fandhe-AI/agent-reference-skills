---
source: https://docs.cloud.google.com/security-command-center/docs/concepts-event-threat-detection-overview#log_types
---

# Log types and activation requirements

Lists the logs Event Threat Detection scans, which threats it looks for in each, and what you must do to turn each log on. Premium and Enterprise (Deprecated) service tiers. A log that is not listed is not scanned, even if it is turned on.

## Signature / Usage

### Logs for network detection of malware

Event Threat Detection can provide network detection of malware by scanning any one of these logs; for most users, Cloud DNS logs are sufficient.

```text
- Cloud DNS logging
- Cloud NAT logging
- Firewall Rules Logging
- VPC Flow Logs
```

## Options / Props

### When you must turn a log on

| Condition (all must be true) |
|---|
| You use the product or service that writes to the log. |
| You need to protect it against the threats Event Threat Detection detects in that log. |
| The log is a Data Access audit log or another log that is off by default. |

### Logs you configure

| Log type | Threats detected | Configuration required |
|---|---|---|
| AlloyDB for PostgreSQL Data Access audit logs | Credential Access: CloudDB Failed login from Anonymizing Proxy IP; Initial Access: CloudDB Successful login from Anonymizing Proxy IP; Privilege Escalation: AlloyDB Database Superuser Writes to User Tables; Privilege Escalation: AlloyDB Over-Privileged Grant | Activate Data Access audit logs for AlloyDB for PostgreSQL; for the superuser-writes and over-privileged-grant rules also enable the pgAudit extension |
| authlogs/authlog on virtual machines | Brute force SSH | Install the Ops Agent or the legacy Logging agent on your VM hosts |
| Cloud DNS logging | Log4j Malware: Bad Domain; Malware: bad domain; Malware: Cryptomining Bad Domain | Turn on Cloud DNS logging |
| Cloud SQL MySQL Data Access audit logs | Credential Access: CloudDB Failed login from Anonymizing Proxy IP; Exfiltration: Cloud SQL Data Exfiltration; Exfiltration: AI Agent Initiated Cloud SQL Exfiltration to Public Bucket; Exfiltration: AI Agent Initiated Cloud SQL Exfiltration to External Bucket; Initial Access: CloudDB Successful login from Anonymizing Proxy IP | Activate Data Access audit logs for Cloud SQL for MySQL |
| Cloud NAT logging | Log4j Malware: Bad IP; Malware: bad IP; Malware: Cryptomining Bad IP | Turn on Cloud NAT logging |
| Cloud SQL PostgreSQL Data Access audit logs | Credential Access: CloudDB Failed login from Anonymizing Proxy IP; Exfiltration: Cloud SQL Data Exfiltration; Exfiltration: AI Agent Initiated Cloud SQL Exfiltration to Public Bucket; Exfiltration: AI Agent Initiated Cloud SQL Exfiltration to External Bucket; Exfiltration: Cloud SQL Over-Privileged Grant; Initial Access: CloudDB Successful login from Anonymizing Proxy IP | Activate Data Access audit logs for Cloud SQL for PostgreSQL; for Cloud SQL Over-Privileged Grant also enable the pgAudit extension |
| External Application Load Balancer backend service logs | Initial Access: Log4j Compromise Attempt | Turn on external Application Load Balancer logging |
| Firewall Rules Logging | Log4j Malware: Bad IP; Malware: bad IP; Malware: Cryptomining Bad IP | Turn on Firewall Rules Logging |
| Generic Data Access audit logs | Initial Access: Leaked Service Account Key Used; Privilege Escalation: Anomalous Multistep Service Account Delegation for AI Data Access; Privilege Escalation: Anomalous Multistep Service Account Delegation for Data Access; Privilege Escalation: Anomalous Service Account Impersonator for AI Data Access; Privilege Escalation: Anomalous Service Account Impersonator for Data Access | Activate Data Access audit logs |
| Gemini Enterprise Data Access audit logs | Gemini Discovery Engine API Document Import by External User / from External Resource / VPC Perimeter Violation (all Preview) | Activate Data Access audit logs for Gemini Enterprise (Discovery Engine API) |
| Google Kubernetes Engine (GKE) Data Access audit logs | Discovery: Can get sensitive Kubernetes object check; Privilege Escalation: Get Kubernetes CSR with compromised bootstrap credentials | Activate Data Access audit logs for GKE |
| Google Workspace Admin Audit logs | Persistence: SSO Enablement Toggle; SSO Settings Changed; Strong Authentication Disabled; Two Step Verification Disabled; Privilege Escalation: Privileged Group Opened To Public | Share Google Workspace Admin Audit logs with Cloud Logging; cannot be scanned in project-level activations |
| Google Workspace Login Audit logs | Credential Access: External Member Added To Privileged Group; Initial Access: Account Disabled Hijacked, Disabled Password Leak, Government Based Attack, Suspicious Login Blocked; Persistence: Two Step Verification Disabled | Share Google Workspace Login Audit logs with Cloud Logging; cannot be scanned in project-level activations |
| IAM Data Access audit logs | Discovery: AI Agent Service Account Self-Investigation; Discovery: Service Account Self-Investigation; Privilege Escalation: AI Agent Cross-Project Access Token Generation, Cross-Project OpenID Token Generation, Token Generation Using Implicit Delegation, Token Generation Using signJwt | Activate Data Access audit logs for Resource Manager |
| SQL Server Data Access audit logs | Exfiltration: Cloud SQL Data Exfiltration; Exfiltration: AI Agent Initiated Cloud SQL Exfiltration to Public Bucket; Exfiltration: AI Agent Initiated Cloud SQL Exfiltration to External Bucket | Activate Data Access audit logs for Cloud SQL for SQL Server |
| VPC Flow Logs | Log4j Malware: Bad IP; Malware: bad IP; Malware: Cryptomining Bad IP | Turn on VPC Flow Logs |

### Logs that are always on (no configuration)

| Log type | Threats detected |
|---|---|
| Agent Engine Logs | Credential Access: AI Agent Anomalous Access to Metadata Service (Preview); Discovery: Evidence of Port Scanning from AI Agent (Preview) |
| Backup and DR Admin Activity audit logs | All the Backup and DR rules listed on the rules page in this category (14 rules: expire all images; deleted Backup, host, plan association and Vault; delete policy, profile, template and storage pool; expire image; reduced backup expiration and frequency; remove appliance and plan) |
| BigQueryAuditMetadata Data Access logs | Exfiltration: AI Agent Initiated BigQuery Data Extraction; Exfiltration: AI Agent Initiated BigQuery Data Exfiltration to External Table; Exfiltration: AI Agent Initiated BigQuery VPC Perimeter Violation; Exfiltration: BigQuery Data Exfiltration; Exfiltration: BigQuery Data Extraction; Exfiltration: BigQuery Data to Google Drive; Exfiltration: Move to Public BigQuery resource (Preview) |
| Generic Admin Activity audit logs | Token creator role rules (org, folder, project, including those granted to AI agents), GCS Bucket IP Filtering Modified, Project HTTP Policy Block Disabled, AI Agent Unauthorized Service Account API Call, Excessive Permission Denied Actions (and AI agent variant), Dormant Service Account Action / Key Created / Activity in AI Service, Leaked Service Account Key Used, Modified Boot Disk Attached to Instance (Preview), GCE Admin Added SSH Key / Startup Script, External Access Granted to Gemini Discovery Engine API Apps (Preview), New (AI) API Method, New Geography (for AI Service), New User Agent, Sensitive AI Permission Added to Custom Role, Sensitive Role Granted to External AI Agent / by AI Agent, Anomalous Impersonation / Multistep Delegation / Impersonator for (AI) Admin Activity |
| Google Kubernetes Engine (GKE) Admin Activity audit logs | The GKE control plane rules (CSR, RBAC, anonymous access, privileged containers, workloads and namespaces; see the rules page, several are Preview) |
| IAM Admin Activity audit logs | Persistence: IAM Anomalous Grant (Preview); Unmanaged Account Granted Sensitive Role; Privilege Escalation: Default Compute Engine Service Account SetIAMPolicy, Dormant Service Account Granted Sensitive Role, Impersonation Role Granted For Dormant Service Account, Sensitive Role Granted To Hybrid Group |
| IAM System Event audit logs | Execution: Cryptomining Docker Image; Impact: Cryptomining Commands |
| MySQL / PostgreSQL / SQL Server Admin Activity logs | Exfiltration: Cloud SQL Restore Backup to External Organization |
| VPC Service Controls Audit logs | Defense Evasion: Modify VPC Service Control (Preview) |

## Notes

- Some log types are available only at the organization level; if you activate Security Command Center at the project level, Event Threat Detection does not scan them and produces no findings (the Google Workspace logs are the listed cases).
- If a threat can be detected in a log that is already on, you do not need to turn on another log for it. Network malware detection needs only one of Cloud DNS logging, Cloud NAT logging, Firewall Rules Logging or VPC Flow Logs.
- Logging costs: scanning by Event Threat Detection incurs no additional cost, but Cloud Logging may charge for ingestion and storage of the log data. Before turning on a log, understand how Cloud Logging charges; after turning it on, monitor it for a couple of days for unexpected costs. VPC Flow Logs: the source recommends a 15-minute aggregation interval and a 5% to 10% sample rate (a trade-off between recall and cost).
- Use Google Cloud's Log Scoping Tool to evaluate which logs to export and analyze.
- The always-on and configurable tables here are condensed; the full per-rule list with log sources is on the rules page. The source's "always on" Generic Admin Activity and GKE rows use the rule names listed there; category prefixes and Preview flags differ in places between the source's rules and log tables (see the rules page).
- Source: https://docs.cloud.google.com/security-command-center/docs/concepts-event-threat-detection-overview#log_types (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts-event-threat-detection-overview.md](./concepts-event-threat-detection-overview.md)
- [event-threat-detection-rules.md](./event-threat-detection-rules.md)
- [how-to-use-event-threat-detection.md](./how-to-use-event-threat-detection.md)
