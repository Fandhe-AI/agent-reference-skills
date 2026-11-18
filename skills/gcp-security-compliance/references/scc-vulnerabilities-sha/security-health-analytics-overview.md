---
source: https://docs.cloud.google.com/security-command-center/docs/concepts-security-health-analytics
---

# Overview of Security Health Analytics

Security Health Analytics (SHA) is a managed service of Security Command Center that scans your cloud environments for common misconfigurations that might expose you to attack. It applies to the Standard-legacy, Standard, Premium and Enterprise (Deprecated) service tiers, but SHA is disabled for new activations on the Standard-legacy, Premium and Enterprise tiers; for those organizations the source says to use Compliance Manager to scan for misconfigurations. The Security Command Center Enterprise tier shuts down on May 21, 2027; organizations on it automatically move to the Premium tier on or after that date.

## Signature / Usage

### Enable or disable a SHA module (REST body)

The Security Health Analytics how-to page sets the enablement state of SHA modules through the Security Command Center Management API (`securityCenterServices.patch` with `updateMask=modules`), with this request body:

```json
{
  "modules": {
    "MODULE_NAME": {
      "intendedEnablementState": "NEW_STATE"
    }
  }
}
```

## Options / Props

### SHA features by tier

| Tier | Availability |
|------|--------------|
| Standard-legacy | Detects only a basic group of medium-severity and high-severity vulnerabilities. |
| Standard (newly activated, not migrated from Standard-legacy) | SHA is not available. Use the Compliance Manager Security Essentials framework and Vulnerability Assessment for Google Cloud. |
| Standard (migrated from Standard-legacy) | SHA stays enabled; 13 detectors are migrated to Compliance Manager controls (Security Essentials framework). Other detectors can be enabled in **Settings > Security Health Analytics > Modules**. |
| Premium (newly activated, not migrated from Standard) | SHA is not available and cannot be enabled. Use Compliance Manager. |
| Premium (migrated from Standard; not for organizations migrated Standard-legacy → Standard and then upgraded, see Notes) | All detectors for Google Cloud, custom detection modules, findings mapped to compliance controls, and attack path simulations (attack exposure scores and attack paths for most SHA findings). |
| Enterprise (Deprecated) (newly activated) | SHA is not available and cannot be enabled. Use Compliance Manager. |

### Detectors migrated to Compliance Manager (Standard, migrated from Standard-legacy)

| Detector |
|----------|
| `DATAPROC_IMAGE_OUTDATED` |
| `LEGACY_AUTHORIZATION_ENABLED` |
| `OPEN_CISCOSECURE_WEBSM_PORT` |
| `OPEN_DIRECTORY_SERVICES_PORT` |
| `OPEN_FIREWALL` |
| `OPEN_RDP_PORT` |
| `OPEN_SSH_PORT` |
| `OPEN_TELNET_PORT` |
| `PUBLIC_DATASET` |
| `PUBLIC_IP_ADDRESS` |
| `PUBLIC_SQL_INSTANCE` |
| `SSL_NOT_ENFORCED` |
| `WEB_UI_ENABLED` |

### Detectors not migrated to Security Essentials

| Detector | Where findings appear |
|----------|----------------------|
| `MFA_NOT_ENFORCED` | **Findings** page; **Risk Overview > All risk** dashboard (**Top misconfigurations**, **Misconfigurations by date** panels); not on the **Compliance** page |
| `NON_ORG_IAM_MEMBER` | same |
| `OPEN_GROUP_IAM_MEMBER` | same |
| `PUBLIC_BUCKET_ACL` | same |
| `PUBLIC_COMPUTE_IMAGE` | same |
| `PUBLIC_LOG_BUCKET` | same |

### Scan types

| Mode | Behavior |
|------|----------|
| Batch scan | All detectors run periodically for all enrolled organizations or projects. |
| Real-time scan | Google Cloud only: supported detectors scan whenever a resource configuration change is detected. Not supported on other cloud platforms. |
| Mixed-mode | Some detectors capture changes in real time for some resource types and in batch for others. Exceptions are noted in the SHA finding tables (**Asset scan settings** column). |

### Scan latency

| Item | Premium and Enterprise tiers | Standard and Standard-legacy tiers |
|------|------------------------------|------------------------------------|
| Initial scan start | About one hour after enablement; first scans can take up to 12 hours | Scans run every 48 hours; initial finding latency can be 72 hours |
| Subsequent batch scans | Every day | Every 48 hours |

### Supported Google Cloud services (built-in detectors)

| Service | Resources | Configurations / policies |
|---------|-----------|---------------------------|
| AlloyDB for PostgreSQL | clusters, database instances | Backups, CMEK, SSL, logging flags |
| BigQuery | datasets, tables | Public data access, CMEK encryption |
| Cloud Asset Inventory | project-level Cloud Asset API enablement | — |
| Cloud DNS | managed zones, DNS policies | DNSSEC, query logging |
| Cloud KMS | key rings, CryptoKeys, key import jobs | Key rotation, public access, separation of duties |
| Cloud Logging | log buckets, audit logging configurations, log sink exports | — |
| Cloud Monitoring | alert policies, notification channels for metric thresholds on sensitive changes | — |
| Pub/Sub | topics | CMEK encryption |
| Cloud SQL | instances | Public IPs, SSL enforcement, backups, database flags |
| Cloud Storage | buckets (individual objects are not scanned) | Public ACLs, uniform bucket-level access, CMEK, retention policies, object versioning |
| Compute Engine | VM instances, persistent disks, custom images, VPC networks and subnetworks, firewall rules, SSL policies, load balancer backend services and proxies | — |
| Managed Service for Apache Spark | clusters | Image version status, CMEK encryption |
| Google Kubernetes Engine | clusters, node pools | Auto-repair, auto-upgrade, Workload Identity, shielded nodes, private cluster settings |
| IAM | service accounts, user-managed service account keys, primitive role grants | MFA enforcement |
| Resource Manager | organizations, folders, projects | API key restrictions, Essential Contacts, organization policies |
| Organization Policy detectors | Gemini Enterprise Agent Platform datasets / models / endpoints; Artifact Registry repositories; Managed Service for Apache Airflow environments; Dataflow jobs | Compliance with organization policies, including Resource Location Restriction |

### Supported security standards (when Compliance Manager is not enabled)

| Cloud | Standards |
|-------|-----------|
| Google Cloud | CIS Controls 8.0; CIS Google Cloud Computing Foundations Benchmark v2.0.0, v1.3.0, v1.2.0, v1.1.0, v1.0.0; CIS Kubernetes Benchmark v1.5.1; CCM 4; HIPAA; ISO 27001 (2022 and 2013); NIST 800-53 R5 and R4; NIST CSF 1.0; OWASP Top Ten (2021 and 2017); PCI DSS 4.0 and 3.2.1; SOC 2 (2017 TSC) |
| AWS (Enterprise (Deprecated) tier) | CIS AWS Foundations 2.0.0; CIS Controls 8.0; CCM 4; HIPAA; ISO 27001 2022; NIST 800-53 R5; NIST CSF 1.0; PCI DSS 4.0 and 3.2.1; SOC 2 (2017 TSC) |

## Notes

- Resources on other cloud platforms are scanned in batch mode only.
- Batch scan schedules are performance objectives, not service guarantees. Real-time updates can take several minutes. Preliminary findings are accurate and actionable but not comprehensive; the source does not recommend using them for a compliance assessment within the first 24 hours.
- SHA does not scan all resource types within a service.
- CIS reviews and certifies the mappings of SHA detectors to each supported version of the CIS Google Cloud Foundations Benchmark; other mappings are for reference only. Older benchmark versions remain supported but are eventually deprecated.
- Built-in detector categories for Google Cloud: API key, Cloud Asset Inventory, Compute image, Compute instance, Container, Managed Service for Apache Spark, Dataset, DNS, Firewall, IAM, KMS, Logging, Monitoring, Multi-factor authentication, Network, Organization policy, Pub/Sub, SQL, Storage and Subnetwork vulnerability findings. AWS detectors apply to the Enterprise (Deprecated) tier only.
- In the migrated Standard case, SHA stays enabled and all detectors keep generating findings, but findings from the SHA version of migrated detectors are labeled `launch_state="LAUNCH_STATE_DEPRECATED"` and are not displayed in some Google Cloud console pages. Remove that term from the **Findings** page query to see them; the Compliance Manager version of the findings is on the **Findings** page and the **Compliance** page > **Monitor** tab.
- Multicloud (Enterprise (Deprecated) tier): SHA detects misconfigurations on AWS and Microsoft Azure after Security Command Center is connected to the provider. Custom modules are not supported for other clouds.
- Switching tiers: when a Premium or Enterprise trial ends, or you downgrade to Standard or Standard-legacy, the state of findings generated at the higher tier is set to `INACTIVE`. The source recommends resolving all findings before downgrading. If an organization was migrated Standard-legacy to Standard and then upgraded to Premium or Enterprise, SHA stays partially enabled and Premium / Enterprise SHA detectors cannot be enabled; use Compliance Manager frameworks instead.
- Not all built-in detectors are enabled by default; see `use-security-health-analytics.md` for the default-disabled list and how to enable or disable detectors.
- Project-level activations: built-in detectors that need organization-level permissions are not supported; detectors that require both the Premium tier and organization-level permissions are not supported with project-level activations. Custom module detectors created in a project only scan resources available to that project, regardless of activation level.
- Custom modules (Premium and Enterprise (Deprecated) tiers) are covered in `custom-modules-sha-overview.md`.
- Compliance: findings drive Security Command Center compliance measurement. The security posture service and Compliance Manager are alternative ways to map organization policies and detectors to standards (the Security posture and Compliance Manager references of this skill).
- Snippet taken from https://docs.cloud.google.com/security-command-center/docs/how-to-use-security-health-analytics (the REST request body for the module enablement state).
- Source: https://docs.cloud.google.com/security-command-center/docs/concepts-security-health-analytics (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [use-security-health-analytics.md](./use-security-health-analytics.md)
- [custom-modules-sha-overview.md](./custom-modules-sha-overview.md)
- [assess-software-vulnerabilities-overview.md](./assess-software-vulnerabilities-overview.md)
