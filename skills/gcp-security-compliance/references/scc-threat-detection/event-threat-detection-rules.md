---
source: https://docs.cloud.google.com/security-command-center/docs/concepts-event-threat-detection-overview#rules
---

# Event Threat Detection rules

The built-in Event Threat Detection detectors with their API names, the logs they read and their default severity (Premium and Enterprise (Deprecated) service tiers). "Admin Activity", "Data Access" and "System Event" mean Cloud Audit Logs of that type; Admin Activity audit logs are always written and cannot be configured or disabled. Table cells are condensed: the source's per-rule prose descriptions and link targets are omitted, and the conditions below are kept. A severity such as "High or Medium" depends on the sensitivity of the roles involved (see the sensitive roles page in this category).

## Signature / Usage

### View findings of all detectors in Logs Explorer

With continuous exports to Cloud Logging configured, this query in Logs Explorer shows the findings of all Event Threat Detection detectors; to view one detector, select its name under **Threat Detector** in the **All resources** list.

```text
resource.type="threat_detector"
```

## Options / Props

### Network malware, brute force, Log4j and Cloud IDS

| Display name | API name | Log source | Default severity / conditions |
|---|---|---|---|
| Active Scan: Log4j Vulnerable to RCE | Unavailable | Cloud DNS logs | High |
| Brute force SSH | `BRUTE_FORCE_SSH` | authlog (Ops Agent or legacy Logging agent on VM hosts) | High |
| Cloud IDS: THREAT_IDENTIFIER | `CLOUD_IDS_THREAT_ACTIVITY` | Cloud IDS logs | Low; layer 7 attacks from mirrored packets; Cloud IDS vulnerability detections are not included |
| Initial Access: Log4j Compromise Attempt | Unavailable | Cloud Load Balancing logs (external Application Load Balancer logging must be enabled) | Low; rule is always on |
| Log4j Malware: Bad Domain | `LOG4J_BAD_DOMAIN` | Cloud DNS logs | Low |
| Log4j Malware: Bad IP | `LOG4J_BAD_IP` | VPC flow logs, Firewall Rules logs, Cloud NAT logs | Low |
| Malware: bad domain | `MALWARE_BAD_DOMAIN` | Cloud DNS logs | Low |
| Malware: bad IP | `MALWARE_BAD_IP` | VPC flow logs, Firewall Rules logs, Cloud NAT logs | Low |
| Malware: Cryptomining Bad Domain | `CRYPTOMINING_POOL_DOMAIN` | Cloud DNS logs | Low |
| Malware: Cryptomining Bad IP | `CRYPTOMINING_POOL_IP` | VPC flow logs, Firewall Rules logs, Cloud NAT logs | Low |
| Command and Control: DNS Tunneling (Temporarily unavailable) | `DNS_TUNNELING_IODINE_HANDSHAKE` | Cloud DNS logs | Low; Iodine handshake; temporarily unavailable |

### Backup and DR (log source: Backup and DR Admin Activity audit logs)

| Display name | API name | Default severity |
|---|---|---|
| Impact: Deleted Google Cloud Backup and DR host | `BACKUP_HOSTS_DELETE_HOST` | Low |
| Impact: Google Cloud Backup and DR expire image | `BACKUP_EXPIRE_IMAGE` | Medium |
| Impact: Google Cloud Backup and DR remove plan | `BACKUP_REMOVE_PLAN` | Medium |
| Impact: Google Cloud Backup and DR expire all images | `BACKUP_EXPIRE_IMAGES_ALL` | High |
| Impact: Google Cloud Backup and DR delete template | `BACKUP_TEMPLATES_DELETE_TEMPLATE` | Medium |
| Impact: Google Cloud Backup and DR delete policy | `BACKUP_TEMPLATES_DELETE_POLICY` | Low |
| Impact: Google Cloud Backup and DR delete profile | `BACKUP_PROFILES_DELETE_PROFILE` | Low |
| Impact: Google Cloud Backup and DR remove appliance | `BACKUP_APPLIANCES_REMOVE_APPLIANCE` | Medium |
| Impact: Google Cloud Backup and DR delete storage pool | `BACKUP_STORAGE_POOLS_DELETE` | Low |
| Impact: Google Cloud Backup and DR reduced backup expiration | `BACKUP_REDUCE_BACKUP_EXPIRATION` | Low |
| Impact: Google Cloud Backup and DR reduced backup frequency | `BACKUP_REDUCE_BACKUP_FREQUENCY` | Low |
| Impact: Deleted Google Cloud Backup and DR Vault | `BACKUP_DELETE_VAULT` | High |
| Impact: Deleted Google Cloud Backup and DR Backup | `BACKUP_DELETE_VAULT_BACKUP` | High |
| Impact: Deleted Google Cloud Backup and DR plan association | `BACKUP_DELETE_BACKUP_PLAN_ASSOCIATION` | High |

### IAM, service accounts and defense evasion

| Display name | API name | Log source | Default severity / conditions |
|---|---|---|---|
| Evasion: Access from Anonymizing Proxy | `ANOMALOUS_ACCESS` | Admin Activity | Medium; Google Cloud service modifications from an IP address of the Tor network |
| Defense Evasion: GCS Bucket IP Filtering Modified | `GCS_BUCKET_IP_FILTERING_MODIFIED` | Admin Activity | Low |
| Defense Evasion: Modify VPC Service Control | `DEFENSE_EVASION_MODIFY_VPC_SERVICE_CONTROL` | VPC Service Controls audit logs | Low; Preview in the log table; a perimeter change that reduces protection; not available for project-level activations |
| Defense Evasion: Project HTTP Policy Block Disabled | `PROJECT_HTTP_POLICY_BLOCK_DISABLED` | Admin Activity | Low; `storage.secureHttpTransport` disabled on a project (also when set at org or folder level and inherited) |
| Defense Evasion: Breakglass Workload Deployment Created (Preview) | `BINARY_AUTHORIZATION_BREAKGLASS_WORKLOAD_CREATE` | Admin Activity | Low; workloads deployed with the break-glass flag overriding Binary Authorization |
| Defense Evasion: Breakglass Workload Deployment Updated (Preview) | `BINARY_AUTHORIZATION_BREAKGLASS_WORKLOAD_UPDATE` | Admin Activity | Low |
| Defense Evasion: Organization level TokenCreatorRole Added | `ORG_LEVEL_SERVICE_ACCOUNT_TOKEN_CREATOR_ROLE_ADDED` | IAM Admin Activity | Low |
| Defense Evasion: Folder level TokenCreatorRole Added | `FOLDER_LEVEL_SERVICE_ACCOUNT_TOKEN_CREATOR_ROLE_ADDED` | IAM Admin Activity | Low |
| Defense Evasion: Project level TokenCreatorRole Added | `PROJECT_LEVEL_SERVICE_ACCOUNT_TOKEN_CREATOR_ROLE_ADDED` | IAM Admin Activity | Low |
| Defense Evasion: VPC Route Masquerade Attempt | `VPC_ROUTE_MASQUERADE` | IAM Admin Activity | High; routes masquerading as default routes allow egress to external IPs |
| Discovery: Service Account Self-Investigation | `SERVICE_ACCOUNT_SELF_INVESTIGATION` | IAM Data Access (`DATA_READ`) | High or Medium depending on roles granted |
| Discovery: Information Gathering Tool Used | `INFORMATION_GATHERING_TOOL_USED` | IAM Admin Activity | Low; ScoutSuite usage; enrichment category `Discovery: Information Gathering Tool Affecting Sensitive Data`, Low to Medium |
| Discovery: Unauthorized Service Account API Call (Temporarily unavailable) | `UNAUTHORIZED_SERVICE_ACCOUNT_API_CALL` | Admin Activity | Low; cross-project call; temporarily unavailable |
| Initial Access: Dormant Service Account Action | `DORMANT_SERVICE_ACCOUNT_USED_IN_ACTION` | Admin Activity | High; dormant = inactive for more than 180 days; enrichment `Initial Access: Dormant Service Account Action taken Affecting Sensitive Data`, no change (High) |
| Initial Access: Dormant Service Account Key Created | `DORMANT_SERVICE_ACCOUNT_KEY_CREATED` | Admin Activity | High |
| Initial Access: Leaked Service Account Key Used | `LEAKED_SA_KEY_USED` | Admin Activity, Data Access | High; key posted on the public internet; enrichment `Initial Access: Leaked Service Account Key Affecting Sensitive Data`, no change (High) |
| Initial Access: Excessive Permission Denied Actions | `EXCESSIVE_FAILED_ATTEMPT` | Admin Activity | Medium |
| Persistence: IAM Anomalous Grant | `IAM_ANOMALOUS_GRANT` | IAM Admin Activity | High by default (subrules below); Preview in the log table |
| Persistence: Unmanaged Account Granted Sensitive Role (Preview) | `UNMANAGED_ACCOUNT_ADDED_IN_IAM_ROLE` | IAM Admin Activity | High |
| Persistence: Service Account Key Created | `SERVICE_ACCOUNT_KEY_CREATION` | IAM Admin Activity | Low; long-lived credential |
| Persistence: Global Startup Script Added | `GLOBAL_STARTUP_SCRIPT_ADDED` | IAM Admin Activity | Low |
| Persistence: New API Method | `ANOMALOUS_BEHAVIOR_NEW_API_METHOD` | Admin Activity | Low; enrichment `Persistence: New API Method Affecting Sensitive Data`, Low to Medium |
| Persistence: New Geography | `IAM_ANOMALOUS_BEHAVIOR_IP_GEOLOCATION` | Admin Activity | Low; not available for project-level activations |
| Persistence: New User Agent | `IAM_ANOMALOUS_BEHAVIOR_USER_AGENT` | Admin Activity | Low; not available for project-level activations |
| Privilege Escalation: Dormant Service Account Granted Sensitive Role | `DORMANT_SERVICE_ACCOUNT_ADDED_IN_IAM_ROLE` | IAM Admin Activity | High or Medium by roles; the source also says Medium by default |
| Privilege Escalation: Impersonation Role Granted For Dormant Service Account | `DORMANT_SERVICE_ACCOUNT_IMPERSONATION_ROLE_GRANTED` | IAM Admin Activity | Medium |
| Privilege Escalation: Global Shutdown Script Added | `GLOBAL_SHUTDOWN_SCRIPT_ADDED` | IAM Admin Activity | Low |
| Privilege Escalation: Anomalous Impersonation of Service Account for Admin Activity | `ANOMALOUS_SA_DELEGATION_IMPERSONATION_OF_SA_ADMIN_ACTIVITY` | Admin Activity | Medium; enrichment `... Affecting Sensitive Data`, Medium to High |
| Privilege Escalation: Anomalous Multistep Service Account Delegation for Admin Activity | `ANOMALOUS_SA_DELEGATION_MULTISTEP_ADMIN_ACTIVITY` | Admin Activity | Medium; enrichment `... Affecting Sensitive Data`, Medium to High |
| Privilege Escalation: Anomalous Multistep Service Account Delegation for Data Access | `ANOMALOUS_SA_DELEGATION_MULTISTEP_DATA_ACCESS` | Data Access | Medium; enrichment `... Affecting Sensitive Data`, Medium to High |
| Privilege Escalation: Anomalous Service Account Impersonator for Admin Activity | `ANOMALOUS_SA_DELEGATION_IMPERSONATOR_ADMIN_ACTIVITY` | Admin Activity | Medium; enrichment `... Affecting Sensitive Data`, Medium to High |
| Privilege Escalation: Anomalous Service Account Impersonator for Data Access | `ANOMALOUS_SA_DELEGATION_IMPERSONATOR_DATA_ACCESS` | Data Access | Medium; enrichment `... Affecting Sensitive Data`, Medium to High |
| Privilege Escalation: New Service Account is Owner or Editor (Temporarily unavailable) | `SERVICE_ACCOUNT_EDITOR_OWNER` | IAM Admin Activity | Low; temporarily unavailable |
| Privilege Escalation: Suspicious Token Generation (Temporarily unavailable) | `SUSPICIOUS_TOKEN_GENERATION_IMPLICIT_DELEGATION` | IAM audit logs | Low; misuse of `iam.serviceAccounts.implicitDelegation`; temporarily unavailable |
| Privilege Escalation: Suspicious Token Generation (Temporarily unavailable) | `SUSPICIOUS_TOKEN_GENERATION_SIGN_JWT` | IAM audit logs | Low; `serviceAccounts.signJwt`; temporarily unavailable |
| Privilege Escalation: Suspicious Token Generation (Temporarily unavailable) | `SUSPICIOUS_TOKEN_GENERATION_CROSS_PROJECT_OPENID` | IAM audit logs | Low; `iam.serviceAccounts.getOpenIdToken` across projects; not available for project-level activations; temporarily unavailable |
| Privilege Escalation: Suspicious Token Generation (Temporarily unavailable) | `SUSPICIOUS_TOKEN_GENERATION_CROSS_PROJECT_ACCESS_TOKEN` | IAM audit logs | Low; `iam.serviceAccounts.getAccessToken` across projects; not available for project-level activations; temporarily unavailable |
| Privilege Escalation: Suspicious Cross-Project Permission Use | `SUSPICIOUS_CROSS_PROJECT_PERMISSION_DATAFUSION` | IAM Admin Activity | Low; `datafusion.instances.create` across projects; not available for project-level activations |
| Resource Development: Offensive Security Distro Activity | `OFFENSIVE_SECURITY_DISTRO_ACTIVITY` | IAM Admin Activity | Low; enrichment `Resource Development: Offensive Security Distro Activity Affecting Sensitive Data`, Low to Medium |

### Persistence: IAM Anomalous Grant subrules

| Subrule | Detail |
|---|---|
| `external_service_account_added_to_policy`, `external_member_added_to_policy` | Privileges granted to IAM users and service accounts not in your organization (or only your project if Security Command Center is activated at project level only). With organization-level activation (any tier) the detector uses the organization's existing IAM policies as context; with project-level only it uses the project's policies. If a sensitive grant to an external member occurs and fewer than three similar existing IAM policies exist, a finding is generated. High or Medium by role sensitivity; High by default. |
| `external_member_invited_to_policy` | An external member was invited as project owner through the `InsertProjectOwnershipInvite` API. |
| `custom_role_given_sensitive_permissions` | The `setIAMPolicy` permission was added to a custom role. |
| `service_account_granted_sensitive_role_to_member` | Privileged roles granted to members through a service account; triggered by a subset of sensitive roles (basic IAM roles and certain data storage roles). |
| `policy_modified_by_default_compute_service_account` | A default Compute Engine service account was used to modify project IAM settings. |

### Google Workspace and Google Groups

| Display name | API name | Log source | Default severity |
|---|---|---|---|
| Privilege Escalation: External Member Added To Privileged Group | `EXTERNAL_MEMBER_ADDED_TO_PRIVILEGED_GROUP` | Workspace Login Audit (`DATA_READ`) | High or Medium; only if the group has no other external members from the same organization as the new member; not available for project-level activations |
| Privilege Escalation: Privileged Group Opened To Public | `PRIVILEGED_GROUP_OPENED_TO_PUBLIC` | Workspace Admin Audit (`DATA_READ`) | High or Medium; not available for project-level activations |
| Privilege Escalation: Sensitive Role Granted To Hybrid Group | `SENSITIVE_ROLE_TO_GROUP_WITH_EXTERNAL_MEMBER` | IAM Admin Activity | High or Medium |
| Persistence: Strong Authentication Disabled | `ENFORCE_STRONG_AUTHENTICATION` | Workspace Admin Audit | Medium; 2-step verification disabled for the organization; not available for project-level activations |
| Persistence: Two Step Verification Disabled | `2SV_DISABLE` | Workspace Login Audit (`DATA_READ`) | Low; not available for project-level activations |
| Persistence: SSO Enablement Toggle | `TOGGLE_SSO_ENABLED` | Workspace Admin Audit | High; Enable SSO setting disabled; not available for project-level activations |
| Persistence: SSO Settings Changed | `CHANGE_SSO_SETTINGS` | Workspace Admin Audit | High; not available for project-level activations |
| Initial Access: Account Disabled Hijacked | `ACCOUNT_DISABLED_HIJACKED` | Workspace Login Audit (`DATA_READ`) | Medium; not available for project-level activations |
| Initial Access: Disabled Password Leak | `ACCOUNT_DISABLED_PASSWORD_LEAK` | Workspace Login Audit (`DATA_READ`) | Low; not available for project-level activations |
| Initial Access: Government Based Attack | `GOV_ATTACK_WARNING` | Workspace Login Audit (`DATA_READ`) | High; not available for project-level activations |
| Initial Access: Suspicious Login Blocked | `SUSPICIOUS_LOGIN` | Workspace Login Audit (`DATA_READ`) | Low; not available for project-level activations |

### AI agents and AI services

| Display name | API name | Log source | Default severity / conditions |
|---|---|---|---|
| Defense Evasion: Organization Level TokenCreator Role Granted to AI Agent (Preview) | `AI_AGENT_GRANTED_TOKEN_CREATOR_ROLE_ORG` | IAM Admin Activity | High |
| Defense Evasion: Folder Level TokenCreator Role Granted to AI Agent (Preview) | `AI_AGENT_GRANTED_TOKEN_CREATOR_ROLE_FOLDER` | IAM Admin Activity | High |
| Defense Evasion: Project Level TokenCreator Role Granted to AI Agent | `AI_AGENT_GRANTED_TOKEN_CREATOR_ROLE_PROJECT` | IAM Admin Activity | High |
| Discovery: Evidence of Port Scanning from AI Agent (Preview) | `AGENT_ENGINE_PORT_SCANNING_EVIDENCE` | Agent Engine Logs | Low |
| Discovery: AI Agent Unauthorized Service Account API Call (Preview) | `AGENT_ENGINE_UNAUTHORIZED_SERVICE_ACCOUNT_API_CALL` | Admin Activity | Low; enrichment `Discovery: AI Agent Unauthorized Service Account API Call Affecting Sensitive Data`, Low to Medium |
| Discovery: AI Agent Service Account Self-Investigation (Preview) | `AGENT_ENGINE_IAM_ANOMALOUS_BEHAVIOR_SERVICE_ACCOUNT_GETS_OWN_IAM_POLICY` | IAM Data Access (`DATA_READ`) | Low if the request was authorized, High if not |
| Credential Access: AI Agent Anomalous Access to Metadata Service (Preview) | `AGENT_ENGINE_ANOMALOUS_ACCESS_TO_METADATA_SERVICE` | Agent Engine Logs | Low |
| Exfiltration: AI Agent Initiated BigQuery VPC Perimeter Violation (Preview) | `AGENT_ENGINE_BIG_QUERY_EXFIL_VPC_PERIMETER_VIOLATION` | BigQueryAuditMetadata data access (`DATA_READ`) | Low |
| Exfiltration: AI Agent Initiated BigQuery Data Exfiltration to External Table (Preview) | `AGENT_ENGINE_BIG_QUERY_EXFIL_TO_EXTERNAL_TABLE` | BigQueryAuditMetadata data access (`DATA_READ`) | High; enrichment `Exfiltration: AI Agent Initiated Sensitive BigQuery Data Exfiltration to External Table`, no change (High) |
| Exfiltration: AI Agent Initiated BigQuery Data Extraction (Preview) | `AGENT_ENGINE_BIG_QUERY_EXFIL_TO_CLOUD_STORAGE` | BigQueryAuditMetadata data access (`DATA_READ`) | Low; extraction to a bucket outside the organization or to a publicly accessible bucket owned by it; project-level Premium: only if the Standard-legacy tier is enabled in the parent organization; enrichment `Exfiltration: AI Agent Initiated Sensitive BigQuery Data Extraction`, Low to Medium |
| Exfiltration: AI Agent Initiated CloudSQL Exfiltration to Public Bucket (Preview) | `AGENT_ENGINE_CLOUDSQL_EXFIL_EXPORT_TO_PUBLIC_GCS` | MySQL, PostgreSQL, SQL Server data access | High; project-level Premium: only if the Standard-legacy tier is enabled in the parent organization |
| Exfiltration: AI Agent Initiated CloudSQL Exfiltration to External Bucket (Preview) | `AGENT_ENGINE_CLOUDSQL_EXFIL_EXPORT_TO_EXTERNAL_GCS` | MySQL, PostgreSQL, SQL Server data access | High; same project-level condition |
| Initial Access: AI Agent Identity Excessive Permission Denied Actions (Preview) | `AGENT_ENGINE_EXCESSIVE_FAILED_ATTEMPT` | Admin Activity | Medium |
| Initial Access: Dormant Service Account Activity in AI Service | `AI_DORMANT_SERVICE_ACCOUNT_USED_IN_ACTION` | Admin Activity | High; dormant = inactive for more than 180 days |
| Persistence: Sensitive AI Permission Added to Custom Role (Preview) | `SENSITIVE_AI_PERMISSION_ADDED_TO_CUSTOM_ROLE` | IAM Admin Activity | Medium |
| Persistence: Sensitive Role Granted by AI Agent (Preview) | `SENSITIVE_ROLE_GRANTED_BY_AI_AGENT` | IAM Admin Activity | Medium for medium-sensitivity roles, High for high-sensitivity roles |
| Persistence: Sensitive Role Granted to External AI Agent (Preview) | `EXTERNAL_AI_AGENT_GRANTED_SENSITIVE_ROLE` | IAM Admin Activity | Medium for medium-sensitivity roles, High for high-sensitivity roles |
| Persistence: External Access Granted to Gemini Discovery Engine API Apps (Preview) | `GRANTING_EXTERNAL_ACCESS_TO_GEMINI_ENTERPRISE_AI_APPS` | IAM Admin Activity | Medium |
| Persistence: New AI API Method | `AI_ANOMALOUS_BEHAVIOR_NEW_API_METHOD` | Admin Activity | Low |
| Persistence: New Geography for AI Service | `AI_IAM_ANOMALOUS_BEHAVIOR_IP_GEOLOCATION` | Admin Activity | Low; not available for project-level activations |
| Impact: Gemini Discovery Engine API Document Import by External User (Preview) | `GEMINI_ENTERPRISE_DATASTORE_DOCUMENT_IMPORT_BY_EXTERNAL_USER` | Gemini Enterprise Data Access | Medium |
| Impact: Gemini Discovery Engine API Document Import from External Resource (Preview) | `GEMINI_ENTERPRISE_DOCUMENT_IMPORT_ATTEMPT_FROM_EXTERNAL_RESOURCE` | Gemini Enterprise Data Access | Medium |
| Impact: Gemini Discovery Engine API Document Import VPC Perimeter Violation (Preview) | `GEMINI_ENTERPRISE_DOCUMENT_IMPORT_VPC_PERIMETER_VIOLATION` | Gemini Enterprise Data Access | Low |
| Privilege Escalation: AI Agent Token Generation Using signJwt (Preview) | `AGENT_ENGINE_SUSPICIOUS_TOKEN_GENERATION_SIGN_JWT` | IAM Data Access | Low |
| Privilege Escalation: AI Agent Token Generation Using Implicit Delegation (Preview) | `AGENT_ENGINE_SUSPICIOUS_TOKEN_GENERATION_IMPLICIT_DELEGATION` | IAM Data Access | Low |
| Privilege Escalation: AI Agent Cross-Project OpenID Token Generation (Preview) | `AGENT_ENGINE_SUSPICIOUS_TOKEN_GENERATION_CROSS_PROJECT_OPENID` | IAM Data Access | Low; not available for project-level activations |
| Privilege Escalation: AI Agent Cross-Project Access Token Generation (Preview) | `AGENT_ENGINE_SUSPICIOUS_TOKEN_GENERATION_CROSS_PROJECT_ACCESS_TOKEN` | IAM Data Access | Low; not available for project-level activations |
| Privilege Escalation: Anomalous Impersonation of Service Account for AI Admin Activity | `AI_ANOMALOUS_SA_DELEGATION_IMPERSONATION_OF_SA_ADMIN_ACTIVITY` | Admin Activity | Medium |
| Privilege Escalation: Anomalous Multistep Service Account Delegation for AI Admin Activity | `AI_ANOMALOUS_SA_DELEGATION_MULTISTEP_ADMIN_ACTIVITY` | Admin Activity | Medium |
| Privilege Escalation: Anomalous Multistep Service Account Delegation for AI Data Access | `AI_ANOMALOUS_SA_DELEGATION_MULTISTEP_DATA_ACCESS` | Data Access | Medium |
| Privilege Escalation: Anomalous Service Account Impersonator for AI Admin Activity | `AI_ANOMALOUS_SA_DELEGATION_IMPERSONATOR_ADMIN_ACTIVITY` | Admin Activity | Medium |
| Privilege Escalation: Anomalous Service Account Impersonator for AI Data Access | `AI_ANOMALOUS_SA_DELEGATION_IMPERSONATOR_DATA_ACCESS` | Data Access | Medium |

### BigQuery, Cloud SQL and AlloyDB

| Display name | API name | Log source | Default severity / conditions |
|---|---|---|---|
| Exfiltration: BigQuery Data Exfiltration | `DATA_EXFILTRATION_BIG_QUERY` | BigQueryAuditMetadata data access (`DATA_READ`) | Subrule `exfil_to_external_table` (resources saved outside the organization, including copy or transfer) High; subrule `vpc_perimeter_violation` (access attempts to VPC Service Controls protected resources) Low; enrichment `Exfiltration: Sensitive BigQuery Data Exfiltration`, Low to Medium |
| Exfiltration: BigQuery Data Extraction | `DATA_EXFILTRATION_BIG_QUERY_EXTRACTION` | BigQueryAuditMetadata data access (`DATA_READ`) | Low; extraction to a bucket outside the organization or to a publicly accessible bucket it owns; project-level Premium: only if the Standard-legacy tier is enabled in the parent organization; enrichment `Exfiltration: Sensitive BigQuery Data Extraction`, Low to Medium |
| Exfiltration: BigQuery Data to Google Drive | `DATA_EXFILTRATION_BIG_QUERY_TO_GOOGLE_DRIVE` | BigQueryAuditMetadata data access (`DATA_READ`) | Low; enrichment `Exfiltration: Sensitive BigQuery Data to Google Drive`, Low to Medium |
| Exfiltration: Move to Public BigQuery resource | `DATA_EXFILTRATION_BIG_QUERY_TO_PUBLIC_RESOURCE` | BigQueryAuditMetadata data access (`DATA_READ`) | Medium; Preview in the log table |
| Exfiltration: Cloud SQL Data Exfiltration | `CLOUDSQL_EXFIL_EXPORT_TO_EXTERNAL_GCS`, `CLOUDSQL_EXFIL_EXPORT_TO_PUBLIC_GCS` | MySQL, PostgreSQL, SQL Server data access | High; export to a bucket outside the organization or to a publicly accessible bucket it owns; project-level Premium: only if the Standard-legacy tier is enabled in the parent organization |
| Exfiltration: Cloud SQL Restore Backup to External Organization | `CLOUDSQL_EXFIL_RESTORE_BACKUP_TO_EXTERNAL_INSTANCE` | MySQL, PostgreSQL, SQL Server admin activity | High |
| Exfiltration: Cloud SQL Over-Privileged Grant | `CLOUDSQL_EXFIL_USER_GRANTED_ALL_PERMISSIONS` | PostgreSQL data access; pgAudit extension required | Low |
| Initial Access: Database Superuser Writes to User Tables | `CLOUDSQL_SUPERUSER_WRITES_TO_USER_TABLES` | Cloud SQL for PostgreSQL and MySQL data access; pgAudit (PostgreSQL) or database auditing (MySQL) required | Low; `postgres` or `root` wrote to non-system tables |
| Privilege Escalation: AlloyDB Over-Privileged Grant | `ALLOYDB_USER_GRANTED_ALL_PERMISSIONS` | AlloyDB data access; pgAudit extension required | Low |
| Privilege Escalation: AlloyDB Database Superuser Writes to User Tables | `ALLOYDB_SUPERUSER_WRITES_TO_USER_TABLES` | AlloyDB data access; pgAudit extension required | Low |
| Initial Access: CloudDB Successful login from Anonymizing Proxy IP | `CLOUD_DB_LOGIN_SUCCEEDED_ANON_IP` | AlloyDB, Cloud SQL for PostgreSQL and MySQL data access; IP logging must be enabled in PostgreSQL for AlloyDB and PostgreSQL | High |
| Credential Access: CloudDB Failed login from Anonymizing Proxy IP | `CLOUD_DB_LOGIN_FAILED_ANON_IP` | same as above | Medium |

### Google Kubernetes Engine (log source: GKE Admin Activity unless stated)

| Display name | API name | Default severity / conditions |
|---|---|---|
| Discovery: Can get sensitive Kubernetes object check | `GKE_CONTROL_PLANE_CAN_GET_SENSITIVE_OBJECT` | Low; GKE Data Access logs; `kubectl auth can-i get` on `*`, `cluster-admin` ClusterRole or `Secret` |
| Credential Access: Secrets Accessed In Kubernetes Namespace | `SECRETS_ACCESSED_IN_KUBERNETES_NAMESPACE` | Low; GKE Data Access logs |
| Credential Access: Failed Attempt to Approve Kubernetes Certificate Signing Request (CSR) | `GKE_APPROVE_CSR_FORBIDDEN` | Low |
| Credential Access: Manually Approved Kubernetes Certificate Signing Request (CSR) (Preview) | `GKE_CSR_APPROVED` | Low |
| Privilege Escalation: Changes to sensitive Kubernetes RBAC objects | `GKE_CONTROL_PLANE_EDIT_SENSITIVE_RBAC_OBJECT` | Low; `PUT` or `PATCH` on `cluster-admin` RBAC objects |
| Privilege Escalation: Create Kubernetes CSR for master cert | `GKE_CONTROL_PLANE_CSR_FOR_MASTER_CERT` | High |
| Privilege Escalation: Creation of sensitive Kubernetes bindings | `GKE_CONTROL_PLANE_CREATE_SENSITIVE_BINDING` | Low; log source listed in the source as IAM Admin Activity audit logs |
| Privilege Escalation: Get Kubernetes CSR with compromised bootstrap credentials | `GKE_CONTROL_PLANE_GET_CSR_WITH_COMPROMISED_BOOTSTRAP_CREDENTIALS` | High; GKE Data Access logs |
| Privilege Escalation: Launch of privileged Kubernetes container | `GKE_CONTROL_PLANE_LAUNCH_PRIVILEGED_CONTAINER` | Low; `privileged` or `allowPrivilegeEscalation` set to `true` |
| Privilege Escalation: Effectively Anonymous Users Granted GKE Cluster Access | `GKE_ANONYMOUS_USERS_GRANTED_ACCESS` | Medium; binding to `system:anonymous`, `system:unauthenticated` or `system:authenticated` |
| Privilege Escalation: Workload Created with a Sensitive Host Path Mount (Preview) | `GKE_SENSITIVE_HOSTPATH` | Low |
| Privilege Escalation: Workload with shareProcessNamespace enabled (Preview) | `GKE_SHAREPROCESSNAMESPACE_POD` | Low |
| Privilege Escalation: ClusterRole with Privileged Verbs (Preview) | `GKE_CLUSTERROLE_PRIVILEGED_VERBS` | Low; `bind`, `escalate` or `impersonate` verbs |
| Privilege Escalation: ClusterRoleBinding to Privileged Role | `GKE_CRB_CLUSTERROLE_AGGREGATION_CONTROLLER` | Low; references `system:controller:clusterrole-aggregation-controller` |
| Privilege Escalation: Suspicious Kubernetes Container Names - Exploitation and Escape (Preview) | `GKE_SUSPICIOUS_EXPLOIT_POD` | Medium |
| Defense Evasion: Anonymous Sessions Granted Cluster Admin Access | `ANONYMOUS_SESSIONS_GRANTED_CLUSTER_ADMIN` | Low; ClusterRoleBinding `root-cluster-admin-binding` behavior for anonymous users |
| Defense Evasion: Manually Deleted Certificate Signing Request (CSR) | `GKE_MANUALLY_DELETED_CSR` | Low |
| Defense Evasion: Potential Kubernetes Pod Masquerading | `GKE_POD_MASQUERADING` | Medium |
| Defense Evasion: Static Pod Created | `GKE_STATIC_POD_CREATED` | Low |
| Initial Access: Anonymous GKE Resource Created from the Internet (Preview) | `GKE_RESOURCE_CREATED_ANONYMOUSLY_FROM_INTERNET` | High |
| Initial Access: GKE Resource Modified Anonymously from the Internet (Preview) | `GKE_RESOURCE_MODIFIED_ANONYMOUSLY_FROM_INTERNET` | High |
| Initial Access: Successful API call made from a TOR proxy IP | `GKE_TOR_PROXY_IP_REQUEST` | High; enrichment `Initial Access: Successful API call made from a TOR proxy IP Affecting Sensitive Data`, no change (High) |
| Initial Access: GKE NodePort service created | `GKE_NODEPORT_SERVICE_CREATED` | Medium |
| Execution: Suspicious Exec or Attach to a System Pod (Preview) | `GKE_SUSPICIOUS_EXEC_ATTACH` | Medium; `kube-system` namespace |
| Execution: Kubernetes Pod Created with Potential Reverse Shell Arguments | `GKE_REVERSE_SHELL_POD` | Medium |
| Execution: Workload triggered in sensitive namespace | `GKE_SENSITIVE_NAMESPACE_WORKLOAD_TRIGGERED` | Low; `kube-system` or `kube-public` |
| Execution: GKE launch excessively capable container (Preview) | `GKE_EXCESSIVELY_CAPABLE_CONTAINER_CREATED` | Low; capabilities `CAP_SYS_MODULE`, `CAP_SYS_RAWIO`, `CAP_SYS_PTRACE`, `CAP_SYS_BOOT`, `CAP_DAC_READ_SEARCH`, `CAP_NET_ADMIN`, `CAP_BPF` |
| Persistence: Service Account Created in sensitive namespace | `GKE_SERVICE_ACCOUNT_CREATION_SENSITIVE_NAMESPACE` | Low |
| Persistence: GKE Webhook Configuration Detected | `GKE_WEBHOOK_CONFIG_CREATED` | Low |
| Impact: GKE kube-dns modification detected (Preview) | `GKE_KUBE_DNS_MODIFICATION` | Medium |
| Impact: Suspicious Kubernetes Container Names - Cryptocurrency Mining (Temporarily unavailable) | `GKE_SUSPICIOUS_CRYPTOMINING_POD` | High; temporarily unavailable |

### Compute Engine, VPC, billing, API and Cloud Run

| Display name | API name | Log source | Default severity / conditions |
|---|---|---|---|
| Persistence: GCE Admin Added SSH Key | `GCE_ADMIN_ADD_SSH_KEY` | Compute Engine Admin Activity | Low; instance older than 1 week |
| Persistence: GCE Admin Added Startup Script | `GCE_ADMIN_ADD_STARTUP_SCRIPT` | Compute Engine Admin Activity | Low; instance older than 1 week |
| Lateral Movement: Modified Boot Disk Attached to Instance (Preview) | `MODIFY_BOOT_DISK_ATTACH_TO_INSTANCE` | Compute Engine audit logs | Low |
| Lateral Movement: OS Patch Execution From Service Account (Temporarily unavailable) | `OS_PATCH_EXECUTION_FROM_SERVICE_ACCOUNT` | VM Manager audit logs | Low; temporarily unavailable |
| Impact: VPC Firewall High Priority Block | `VPC_FIREWALL_HIGH_PRIORITY_BLOCK` | IAM Admin Activity | Low; rule blocking all egress added at priority 0 |
| Impact: VPC Firewall Mass Rule Deletion (Temporarily unavailable) | `VPC_FIREWALL_MASS_RULE_DELETION` | IAM Admin Activity | Low; deleted by non-service accounts; temporarily unavailable |
| Impact: Service API Disabled | `SERVICE_API_DISABLED` | IAM Admin Activity | Low; production environment |
| Impact: Managed Instance Group Autoscaling Set To Maximum (Temporarily unavailable) | `MIG_AUTOSCALING_SET_TO_MAX` | Compute Engine Admin Activity | Low; temporarily unavailable |
| Impact: Billing Disabled (Temporarily unavailable) | `BILLING_DISABLED_SINGLE_PROJECT` | Cloud Billing Admin Activity | Low; temporarily unavailable |
| Impact: Billing Disabled (Temporarily unavailable) | `BILLING_DISABLED_MULTIPLE_PROJECTS` | Cloud Billing Admin Activity | Low; multiple projects in a short time; temporarily unavailable |
| Impact: Cryptomining Commands | `CLOUD_RUN_JOBS_CRYPTOMINING_COMMANDS` | IAM System Event | High |
| Execution: Cryptomining Docker Image | `CLOUD_RUN_CRYPTOMINING_DOCKER_IMAGES` | IAM System Event | High |
| Privilege Escalation: Default Compute Engine Service Account SetIAMPolicy | `CLOUD_RUN_SERVICES_SET_IAM_POLICY` | Admin Activity | Low |

## Notes

- Rules marked "Temporarily unavailable" do not currently produce findings; the source suggests monitoring the underlying audit logs instead (for example VM Manager, IAM, Cloud Billing, Compute Engine, Cloud DNS audit logs).
- Source inconsistencies, kept as written: the rules table and the log-type tables differ on some Preview flags and category prefixes (for example `Persistence: IAM Anomalous Grant` and `Defense Evasion: Modify VPC Service Control` carry Preview only in the log tables; the log table calls the Backup and DR storage-pool rule `Inhibit system recovery: Google Cloud Backup and DR delete storage pool`; it lists `Credential Access: External Member Added To Privileged Group` where the rules table says `Privilege Escalation: ...`; it lists `Exfiltration: AI Agent Initiated Cloud SQL ...` where the rules table says `CloudSQL`).
- The four `Privilege Escalation: Suspicious Token Generation` rows share one display name and differ only by API name.
- The source says rules marked "Log source: authlog" need the Ops Agent or legacy Logging agent installed; Data Access and Workspace logs must be turned on as described on the log types page.
- Examples of finding JSON are on the how-to-use page in this category.
- For deprecated and shut down rules, see the Security Command Center Deprecations page.
- Snippet taken from https://docs.cloud.google.com/security-command-center/docs/how-to-use-event-threat-detection (Logs Explorer query; the source tags the block `bash`, it is a Logging query).
- Source: https://docs.cloud.google.com/security-command-center/docs/concepts-event-threat-detection-overview#rules (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts-event-threat-detection-overview.md](./concepts-event-threat-detection-overview.md)
- [event-threat-detection-sensitive-roles.md](./event-threat-detection-sensitive-roles.md)
- [event-threat-detection-log-types.md](./event-threat-detection-log-types.md)
- [how-to-use-event-threat-detection.md](./how-to-use-event-threat-detection.md)
