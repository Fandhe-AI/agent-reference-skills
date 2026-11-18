---
source: https://docs.cloud.google.com/security-command-center/docs/agent-platform-threat-detection-overview
---

# Agent Platform Threat Detection overview

Agent Platform Threat Detection is a built-in Security Command Center service (Preview; Premium and Enterprise (Deprecated) service tiers; subject to the Pre-GA Offerings Terms) that detects potential attacks on AI agents deployed to Agent Runtime and writes findings in near-real time. Runtime detectors watch for malicious binaries or scripts, container escapes, reverse shells and attack tools in the agent's environment; Event Threat Detection control-plane detectors analyze audit logs and Agent Runtime logs (`stdout`, `stderr`).

## Signature / Usage

### Service name for `gcloud scc manage services`

`gcloud scc manage services describe` and `update` take the service as `SERVICE_NAME`. The supported-services list of the gcloud help names this service as follows. Runtime detectors are enabled by default and each is managed as a module through the `--module-config-file` of `update`; `--validate-only` checks a request without applying it.

```text
* agent-engine-threat-detection (can be abbreviated as aetd)
```

## Options / Props

### How it works

| Step | Detail |
|---|---|
| Collection | A watcher process collects event information while the agentic workload runs; it can take up to one minute to start and collect information. |
| Analysis | NLP analyzes Bash and Python scripts for malicious code. |
| Output | Incidents are reported as findings in Security Command Center; if nothing is identified no information is stored. Collected data is processed in memory and does not persist after analysis unless reported as a finding. |

### Runtime detectors (all Preview; enabled by default)

| Display name | Module name |
|---|---|
| Command and Control: Steganography Tool Detected | `AGENT_ENGINE_STEGANOGRAPHY_TOOL_DETECTED` |
| Credential Access: Find Google Cloud Credentials | `AGENT_ENGINE_FIND_GCP_CREDENTIALS` |
| Credential Access: GPG Key Reconnaissance | `AGENT_ENGINE_GPG_KEY_RECONNAISSANCE` |
| Credential Access: Search Private Keys or Passwords | `AGENT_ENGINE_SEARCH_PRIVATE_KEYS_OR_PASSWORDS` |
| Defense Evasion: Base64 ELF File Command Line | `AGENT_ENGINE_BASE64_ELF_FILE_CMDLINE` |
| Defense Evasion: Base64 Encoded Python Script Executed | `AGENT_ENGINE_BASE64_ENCODED_PYTHON_SCRIPT_EXECUTED` |
| Defense Evasion: Base64 Encoded Shell Script Executed | `AGENT_ENGINE_BASE64_ENCODED_SHELL_SCRIPT_EXECUTED` |
| Defense Evasion: Launch Code Compiler Tool In Container | `AGENT_ENGINE_LAUNCH_CODE_COMPILER_TOOL_IN_CONTAINER` |
| Execution: Added Malicious Binary Executed | `AGENT_ENGINE_ADDED_MALICIOUS_BINARY_EXECUTED` |
| Execution: Added Malicious Library Loaded | `AGENT_ENGINE_ADDED_MALICIOUS_LIBRARY_LOADED` |
| Execution: Added Malicious Skill Executed | `AGENT_ENGINE_ADDED_MALICIOUS_SKILL_EXECUTED` |
| Execution: Added Malicious Skill Loaded | `AGENT_ENGINE_ADDED_MALICIOUS_SKILL_LOADED` |
| Execution: Built in Malicious Binary Executed | `AGENT_ENGINE_BUILT_IN_MALICIOUS_BINARY_EXECUTED` |
| Execution: Container Escape | `AGENT_ENGINE_CONTAINER_ESCAPE` |
| Execution: Fileless Execution in /memfd: | `AGENT_ENGINE_FILELESS_EXECUTION_DETECTION_MEMFD` |
| Execution: Kubernetes Attack Tool Execution | `AGENT_ENGINE_KUBERNETES_ATTACK_TOOL_EXECUTION` |
| Execution: Local Reconnaissance Tool Execution | `AGENT_ENGINE_LOCAL_RECONNAISSANCE_TOOL_EXECUTION` |
| Execution: Malicious Python Executed | `AGENT_ENGINE_MALICIOUS_PYTHON_EXECUTED` |
| Execution: Modified Malicious Binary Executed | `AGENT_ENGINE_MODIFIED_MALICIOUS_BINARY_EXECUTED` |
| Execution: Modified Malicious Library Loaded | `AGENT_ENGINE_MODIFIED_MALICIOUS_LIBRARY_LOADED` |
| Execution: Modified Malicious Skill Executed | `AGENT_ENGINE_MODIFIED_MALICIOUS_SKILL_EXECUTED` |
| Execution: Modified Malicious Skill Loaded | `AGENT_ENGINE_MODIFIED_MALICIOUS_SKILL_LOADED` |
| Malicious Script Executed | `AGENT_ENGINE_MALICIOUS_SCRIPT_EXECUTED` |
| Malicious URL Observed | `AGENT_ENGINE_MALICIOUS_URL_OBSERVED` |
| Reverse Shell | `AGENT_ENGINE_REVERSE_SHELL` |
| Unexpected Child Shell | `AGENT_ENGINE_UNEXPECTED_CHILD_SHELL` |
| Execution: Netcat Remote Code Execution in Container | `AGENT_ENGINE_NETCAT_REMOTE_CODE_EXECUTION_IN_CONTAINER` |
| Execution: Possible Arbitrary Command Execution through CUPS (CVE-2024-47177) | `AGENT_ENGINE_POSSIBLE_ARBITRARY_COMMAND_EXECUTION_THROUGH_CUPS` |
| Execution: Possible Remote Command Execution Detected | `AGENT_ENGINE_POSSIBLE_REMOTE_COMMAND_EXECUTION_DETECTED` |
| Execution: Program Run with Disallowed HTTP Proxy Env | `AGENT_ENGINE_PROGRAM_RUN_WITH_DISALLOWED_HTTP_PROXY_ENV` |
| Execution: Socat Reverse Shell Detected | `AGENT_ENGINE_SOCAT_REVERSE_SHELL_DETECTED` |
| Execution: Suspicious OpenSSL Shared Object Loaded | `AGENT_ENGINE_SUSPICIOUS_OPENSSL_SHARED_OBJECT_LOADED` |
| Exfiltration: Launch Remote File Copy Tools in Container | `AGENT_ENGINE_LAUNCH_REMOTE_FILE_COPY_TOOLS_IN_CONTAINER` |
| Impact: Detect Malicious Cmdlines | `AGENT_ENGINE_DETECT_MALICIOUS_CMDLINES` |
| Impact: Remove Bulk Data From Disk | `AGENT_ENGINE_REMOVE_BULK_DATA_FROM_DISK` |
| Impact: Suspicious cryptocurrency mining activity using the Stratum Protocol | `AGENT_ENGINE_DETECT_CRYPTO_MINERS_USING_STRATUM_PROTOCOL` |
| Privilege Escalation: Abuse of Sudo For Privilege Escalation (CVE-2019-14287) | `AGENT_ENGINE_ABUSE_SUDO_FOR_PRIVILEGE_ESCALATION` |
| Privilege Escalation: Polkit Local Privilege Escalation Vulnerability (CVE-2021-4034) | `AGENT_ENGINE_POLKIT_LOCAL_PRIVILEGE_ESCALATION_VULNERABILITY` |
| Privilege Escalation: Sudo Potential Privilege Escalation (CVE-2021-3156) | `AGENT_ENGINE_SUDO_POTENTIAL_PRIVILEGE_ESCALATION` |

### Control-plane detectors (Event Threat Detection; all Preview; enabled by default; "---" = no sensitive data enrichment)

| Display name | API name | Log source | Default severity | Sensitive data enrichment |
|---|---|---|---|---|
| Discovery: Evidence of Port Scanning from AI Agent | `AGENT_ENGINE_PORT_SCANNING_EVIDENCE` | Agent Engine Logs | Low | --- |
| Discovery: AI Agent Unauthorized Service Account API Call | `AGENT_ENGINE_UNAUTHORIZED_SERVICE_ACCOUNT_API_CALL` | Admin Activity audit logs | Low | `Discovery: AI Agent Unauthorized Service Account API Call Affecting Sensitive Data`, Low to Medium |
| Discovery: AI Agent Service Account Self-Investigation | `AGENT_ENGINE_IAM_ANOMALOUS_BEHAVIOR_SERVICE_ACCOUNT_GETS_OWN_IAM_POLICY` | IAM Data Access audit logs (`DATA_READ`) | Low if authorized, High if not | --- |
| Credential Access: AI Agent Anomalous Access to Metadata Service | `AGENT_ENGINE_ANOMALOUS_ACCESS_TO_METADATA_SERVICE` | Agent Engine Logs | Low | --- |
| Exfiltration: AI Agent Initiated BigQuery VPC Perimeter Violation | `AGENT_ENGINE_BIG_QUERY_EXFIL_VPC_PERIMETER_VIOLATION` | BigQueryAuditMetadata data access logs (`DATA_READ`) | Low | --- |
| Exfiltration: AI Agent Initiated BigQuery Data Exfiltration to External Table | `AGENT_ENGINE_BIG_QUERY_EXFIL_TO_EXTERNAL_TABLE` | BigQueryAuditMetadata data access logs (`DATA_READ`) | High | `Exfiltration: AI Agent Initiated Sensitive BigQuery Data Exfiltration to External Table`, no change (High) |
| Exfiltration: AI Agent Initiated CloudSQL Exfiltration to Public Bucket | `AGENT_ENGINE_CLOUDSQL_EXFIL_EXPORT_TO_PUBLIC_GCS` | MySQL, PostgreSQL, SQL Server data access logs | High; project-level Premium: only if the Standard-legacy tier is enabled in the parent organization | --- |
| Exfiltration: AI Agent Initiated CloudSQL Exfiltration to External Bucket | `AGENT_ENGINE_CLOUDSQL_EXFIL_EXPORT_TO_EXTERNAL_GCS` | MySQL, PostgreSQL, SQL Server data access logs | High; same project-level condition | --- |
| Exfiltration: AI Agent Initiated BigQuery Data Extraction | `AGENT_ENGINE_BIG_QUERY_EXFIL_TO_CLOUD_STORAGE` | BigQueryAuditMetadata data access logs (`DATA_READ`) | Low; extraction to a bucket outside the organization or to a publicly accessible bucket it owns; same project-level condition | `Exfiltration: AI Agent Initiated Sensitive BigQuery Data Extraction`, Low to Medium |
| Initial Access: AI Agent Identity Excessive Permission Denied Actions | `AGENT_ENGINE_EXCESSIVE_FAILED_ATTEMPT` | Admin Activity audit logs | Medium | --- |
| Privilege Escalation: AI Agent Token Generation Using signJwt | `AGENT_ENGINE_SUSPICIOUS_TOKEN_GENERATION_SIGN_JWT` | IAM Data Access audit logs | Low | --- |
| Privilege Escalation: AI Agent Token Generation Using Implicit Delegation | `AGENT_ENGINE_SUSPICIOUS_TOKEN_GENERATION_IMPLICIT_DELEGATION` | IAM Data Access audit logs | Low | --- |
| Privilege Escalation: AI Agent Cross-Project OpenID Token Generation | `AGENT_ENGINE_SUSPICIOUS_TOKEN_GENERATION_CROSS_PROJECT_OPENID` | IAM Data Access audit logs | Low; not available for project-level activations | --- |
| Privilege Escalation: AI Agent Cross-Project Access Token Generation | `AGENT_ENGINE_SUSPICIOUS_TOKEN_GENERATION_CROSS_PROJECT_ACCESS_TOKEN` | IAM Data Access audit logs | Low; not available for project-level activations | --- |

## Notes

- Preview: Pre-GA features are available "as is" and might have limited support. The service name for gcloud is `agent-engine-threat-detection` (`aetd`) per the gcloud 593.0.0 help.
- Source inconsistency kept as written: the Cloud Run Threat Detection page names its CUPS detector `CVE-2024-47076`, this page `CVE-2024-47177`; the Stratum detector API name is `AGENT_ENGINE_DETECT_CRYPTO_MINERS_USING_STRATUM_PROTOCOL` here and `CLOUD_RUN_SUSPICIOUS_CRYPTO_MINING_ACTIVITY_USING_STRATUM_PROTOCOL` there.
- Detector descriptions are omitted (see the Cloud Run Threat Detection page for the same attack classes); the source also lists the Event Threat Detection AI-related detectors on the AI threats page.
- Event Threat Detection detectors for general AI-related threats are covered on the rules page in this category.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/manage/services/update (gcloud 593.0.0 help, `SERVICE_NAME` list); the help EXAMPLES use only the Security Health Analytics service `sha`.
- For deprecated and shut down rules, see the Security Command Center Deprecations page. The Security Command Center Enterprise service tier will shut down on May 21, 2027; an organization using it automatically moves to the Premium service tier on or after that date.
- The source URL is `agent-platform-threat-detection-overview`; other Security Command Center pages link to it as `agent-engine-threat-detection-overview`.
- Source: https://docs.cloud.google.com/security-command-center/docs/agent-platform-threat-detection-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview-threats.md](./overview-threats.md)
- [cloud-run-threat-detection-overview.md](./cloud-run-threat-detection-overview.md)
- [event-threat-detection-rules.md](./event-threat-detection-rules.md)
