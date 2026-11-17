---
source: https://docs.cloud.google.com/risk-manager/docs/remediate-findings
---

# Remediating findings

Cyber Insurance Hub (Preview) reports combine Security Command Center (SCC) findings and Cloud Asset Inventory data and are aligned with the CIS Google Cloud Computing Foundations Benchmark v1.2.0. Remediate the highest-impact findings shown in a report first. Full per-finding integration needs SCC Premium or Enterprise; Standard-tier customers cannot inspect and remediate all individual CIS Benchmark findings in SCC.

## Signature / Usage

A report shows finding counts per CIS Benchmark row; the remediation link of each row points to a Security Health Analytics finding category (table below). To count ACTIVE findings of one source by category from the gcloud CLI (help example: organization `123456`, source `5678`):

```bash
gcloud scc findings group 123456 --source=5678 \
    --group-by="category" --filter="state=\"ACTIVE\""
```

### Console workflow

With SCC Premium or Enterprise, click the finding count in a benchmark row of a report to open SCC with the active findings for that benchmark, then click a finding category for a remediation pane. With SCC Standard, click the CIS Benchmark description instead; it links to the general remediation instructions because Standard cannot pivot directly to the related SCC findings.

## Options / Props

### CIS Benchmarks supported by Cyber Insurance Hub

| Benchmark | Description | Anchor |
|---|---|---|
| 1.1 | Ensure that corporate login credentials are used | `#non_org_iam_member` |
| 1.2 | Ensure that multi-factor authentication is enabled for all non-service accounts | `#mfa_not_enforced` |
| 1.4 | Ensure that there are only GCP-managed service account keys for each service account | `#user_managed_service_account_key` |
| 1.5 | Ensure that Service Account has no Admin privileges | `#admin_service_account` |
| 1.6 | Ensure that IAM users are not assigned the Service Account User or Service Account Token Creator roles at project level | `#over_privileged_service_account_user` |
| 1.7 | Ensure user-managed/external keys for service accounts are rotated every 90 days or less | `#service_account_key_not_rotated` |
| 1.8 | Ensure that Separation of duties is enforced while assigning service account related roles to users | `#service_account_role_separation` |
| 1.9 | Ensure that Cloud KMS cryptokeys are not anonymously or publicly accessible | `#kms_public_key` |
| 1.10 | Ensure KMS encryption keys are rotated within a period of 90 days | `#kms_key_not_rotated` |
| 1.11 | Ensure that Separation of duties is enforced while assigning KMS related roles to users | `#kms_role_separation` |
| 1.12 | Ensure API keys are not created for a project | `#api_key_exists` |
| 1.13 | Ensure API keys are restricted to use by only specified Hosts and Apps | `#api_key_apps_unrestricted` |
| 1.14 | Ensure API keys are restricted to only APIs that application needs access | `#api_key_apis_unrestricted` |
| 1.15 | Ensure API keys are rotated every 90 days | `#api_key_not_rotated` |
| 2.1 | Ensure that Cloud Audit Logging is configured properly across all services and all users from a project | `#audit_logging_disabled` |
| 2.2 | Ensure that sinks are configured for all log entries | `#log_not_exported` |
| 2.3 | Ensure that retention policies on log buckets are configured using Bucket Lock | `#locked_retention_policy_not_set` |
| 2.4 | Ensure log metric filter and alerts exist for project ownership assignments/changes | `#owner_not_monitored` |
| 2.5 | Ensure that the log metric filter and alerts exist for Audit Configuration changes | `#audit_config_not_monitored` |
| 2.6 | Ensure that the log metric filter and alerts exist for Custom Role changes | `#custom_role_not_monitored` |
| 2.7 | Ensure that the log metric filter and alerts exist for VPC Network Firewall rule changes | `#firewall_not_monitored` |
| 2.8 | Ensure that the log metric filter and alerts exist for VPC network route changes | `#route_not_monitored` |
| 2.9 | Ensure that the log metric filter and alerts exist for VPC network changes | `#network_not_monitored` |
| 2.10 | Ensure that the log metric filter and alerts exist for Cloud Storage IAM permission changes | `#bucket_iam_not_monitored` |
| 2.11 | Ensure that the log metric filter and alerts exist for SQL instance configuration changes | `#sql_instance_not_monitored` |
| 2.12 | Ensure that Cloud DNS logging is enabled for all VPC networks | `#dns_logging_disabled` |
| 3.1 | Ensure that the default network does not exist in a project | `#default_network` |
| 3.2 | Ensure legacy network does not exist for a project | `#legacy_network` |
| 3.3 | Ensure that DNSSEC is enabled for Cloud DNS | `#dnssec_disabled` |
| 3.4 | Ensure that RSASHA1 is not used for the key-signing key in Cloud DNS DNSSEC | `#rsasha1_for_signing` |
| 3.5 | Ensure that RSASHA1 is not used for the zone-signing key in Cloud DNS DNSSEC | `#rsasha1_for_signing` |
| 3.6 | Ensure that SSH access is restricted from the internet | `#open_ssh_port` |
| 3.7 | Ensure that RDP access is restricted from the Internet | `#open_rdp_port` |
| 3.8 | Ensure that VPC Flow Logs is enabled for every subnet in a VPC Network | `#flow_logs_disabled` |
| 3.9 | Ensure no HTTPS or SSL proxy load balancers permit SSL policies with weak cipher suites | `#weak_ssl_policy` |
| 4.1 | Ensure that instances are not configured to use the default service account | `#default_service_account_used` |
| 4.2 | Ensure that instances are not configured to use the default service account with full access to all Cloud APIs | `#full_api_access` |
| 4.3 | Ensure "Block Project-wide SSH keys" is enabled for VM instances | `#compute_project_wide_ssh_keys_allowed` |
| 4.4 | Ensure oslogin is enabled for a Project | `#os_login_disabled` |
| 4.5 | Ensure "Enable connecting to serial ports" is not enabled for VM Instance | `#compute_serial_ports_enabled` |
| 4.6 | Ensure that IP forwarding is not enabled on Instances | `#ip_forwarding_enabled` |
| 4.7 | Ensure VM disks for critical VMs are encrypted with Customer-Supplied Encryption Keys (CSEK) | `#disk_csek_disabled` |
| 4.8 | Ensure Compute instances are launched with Shielded VM enabled | `#shielded_vm_disabled` |
| 4.9 | Ensure that Compute instances do not have public IP addresses | `#public_ip_address` |
| 4.11 | Ensure that Compute instances have Confidential Computing enabled | `#confidential_computing_disabled` |
| 5.1 | Ensure that Cloud Storage bucket is not anonymously or publicly accessible | `#public_bucket_acl` |
| 5.2 | Ensure that Cloud Storage buckets have uniform bucket-level access enabled | `#bucket_policy_only_disabled` |
| 6.1.1 | Ensure that a MySQL database instance does not allow anyone to connect with administrative privileges | `#sql_no_root_password` |
| 6.1.2 | Ensure "skip_show_database" database flag for Cloud SQL Mysql instance is set to "on" | `#sql_skip_show_database_disabled` |
| 6.1.3 | Ensure that the "local_infile" database flag for a Cloud SQL Mysql instance is set to "off" | `#sql_local_infile` |
| 6.2.1 | Ensure that the "log_checkpoints" database flag for Cloud SQL PostgreSQL instance is set to "on" | `#sql_log_checkpoints_disabled` |
| 6.2.2 | Ensure "log_error_verbosity" database flag for Cloud SQL PostgreSQL instance is set to "DEFAULT" or stricter | `#sql_log_error_verbosity` |
| 6.2.3 | Ensure that the "log_connections" database flag for Cloud SQL PostgreSQL instance is set to "on" | `#sql_log_connections_disabled` |
| 6.2.4 | Ensure that the "log_disconnections" database flag for Cloud SQL PostgreSQL instance is set to "on" | `#sql_log_disconnections_disabled` |
| 6.2.5 | Ensure "log_duration" database flag for Cloud SQL PostgreSQL instance is set to "on" | `#sql_log_duration_disabled` |
| 6.2.6 | Ensure that the "log_lock_waits" database flag for Cloud SQL PostgreSQL instance is set to "on" | `#sql_log_lock_waits_disabled` |
| 6.2.7 | Ensure "log_statement" database flag for Cloud SQL PostgreSQL instance is set appropriately | `#sql_log_statement` |
| 6.2.8 | Ensure "log_hostname" database flag for Cloud SQL PostgreSQL instance is set appropriately | `#sql_log_hostname_enabled` |
| 6.2.9 | Ensure "log_parser_stats" database flag for Cloud SQL PostgreSQL instance is set to "off" | `#sql_log_parser_stats_enabled` |
| 6.2.10 | Ensure "log_planner_stats" database flag for Cloud SQL PostgreSQL instance is set to "off" | `#sql_log_planner_stats_enabled` |
| 6.2.11 | Ensure "log_executor_stats" database flag for Cloud SQL PostgreSQL instance is set to "off" | `#sql_log_executor_stats_enabled` |
| 6.2.12 | Ensure "log_statement_stats" database flag for Cloud SQL PostgreSQL instance is set to "off" | `#sql_log_statement_stats_enabled` |
| 6.2.13 | Ensure that the "log_min_messages" database flag for Cloud SQL PostgreSQL instance is set appropriately | `#sql_log_min_messages` |
| 6.2.14 | Ensure "log_min_error_statement" database flag for Cloud SQL PostgreSQL instance is set to "Error" or stricter | `#sql_log_min_error_statement_severity` |
| 6.2.15 | Ensure that the "log_temp_files" database flag for Cloud SQL PostgreSQL instance is set to "0" | `#sql_log_temp_files` |
| 6.2.16 | Ensure that the "log_min_duration_statement" database flag for Cloud SQL PostgreSQL instance is set to "-1" | `#sql_log_min_duration_statement_enabled` |
| 6.3.1 | Ensure "external scripts enabled" database flag for Cloud SQL SQL Server instance is set to "off" | `#sql_external_scripts_enabled` |
| 6.3.2 | Ensure that the "cross db ownership chaining" database flag for Cloud SQL SQL Server instance is set to "off" | `#sql_cross_db_ownership_chaining` |
| 6.3.3 | Ensure "user connections" database flag for Cloud SQL SQL Server instance is set as appropriate | `#sql_user_connections_configured` |
| 6.3.4 | Ensure "user options" database flag for Cloud SQL SQL Server instance is not configured | `#sql_user_options_configured` |
| 6.3.5 | Ensure "remote access" database flag for Cloud SQL SQL Server instance is set to "off" | `#sql_remote_access_enabled` |
| 6.3.6 | Ensure "3625 (trace flag)" database flag for Cloud SQL SQL Server instance is set to "off" | `#sql_trace_flag_3625` |
| 6.3.7 | Ensure that the "contained database authentication" database flag for Cloud SQL on the SQL Server instance is set to "off" | `#sql_contained_database_authentication` |
| 6.4 | Ensure that the Cloud SQL database instance requires all incoming connections to use SSL | `#ssl_not_enforced` |
| 6.5 | Ensure that Cloud SQL database instances are not open to the world | `#public_sql_instance` |
| 6.6 | Ensure that Cloud SQL database instances do not have public IPs | `#sql_public_ip` |
| 6.7 | Ensure that Cloud SQL database instances are configured with automated backups | `#auto_backup_disabled` |
| 7.1 | Ensure that BigQuery datasets are not anonymously or publicly accessible | `#public_dataset` |
| 7.2 | Ensure that all BigQuery Tables are encrypted with Customer-managed encryption key (CMEK) | `#bigquery_table_cmek_disabled` |
| 7.3 | Ensure that a Default Customer-managed encryption key (CMEK) is specified for all BigQuery Data Sets | `#dataset_cmek_disabled` |

## Notes

- Preview: this product is subject to the "Pre-GA Offerings Terms"; features are available "as is" and might have limited support.
- Remediation steps for items such as making a bucket or dataset non-public, rotating or deleting service account keys, or changing IAM roles are in the linked SCC page. Test configuration changes on a non-production resource first, because some (for example restricting SSH or RDP, enforcing SSL, or removing public IPs) can break existing access.
- The remediation link for each benchmark row is the SCC page "How to remediate Security Health Analytics findings" (`https://cloud.google.com/security-command-center/docs/how-to-remediate-security-health-analytics-findings`) at the anchor in the table's last column.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/findings/group (gcloud 593.0.0 help).
- The source page gives Console steps only.
- The source lists no 1.3 and no 4.10 benchmark.
- Activation of each SCC tier is described in the SCC activation overview.
- Source: https://docs.cloud.google.com/risk-manager/docs/remediate-findings (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [managing-reports.md](./managing-reports.md)
- [risk-manager-overview.md](./risk-manager-overview.md)
