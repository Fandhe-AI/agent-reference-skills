---
source: https://docs.cloud.google.com/security-command-center/docs/service-tiers
---

# Security Command Center service tiers

Standard-legacy, Standard, Premium, and Enterprise (Deprecated) service tiers and the per-service comparison. The Security Command Center Enterprise service tier will shut down on May 21, 2027; an organization that uses it automatically moves to the Premium service tier on or after May 21, 2027. Standard is offered at no additional charge; Premium and Enterprise have different pricing structures (see the Security Command Center pricing page).

## Signature / Usage

### Describe one service for a parent

The tables below compare services by tier; this shows the enablement state of one service (Security Health Analytics) for a parent.

```bash
gcloud scc manage services describe sha --parent=organizations/123
```

## Options / Props

### Tier descriptions

| Tier | Description |
|---|---|
| Standard-legacy | Basic security and compliance posture management for Google Cloud only. Might be migrated to the Standard tier in some organizations. |
| Standard | Basic security and compliance posture management for Google Cloud only. Can be activated at the organization level. Best for Google Cloud environments with minimal security requirements. |
| Premium | Everything in Standard, plus advanced security and compliance posture management, attack paths, threat detection, and compliance monitoring for Google Cloud only. Activated at the project or organization level. Two billing modalities: pay-as-you-go (flexibility) and subscription (predictable needs). |
| Enterprise (Deprecated) | Complete multi-cloud CNAPP security; includes most Premium services. Activated at the organization level only. Best for protecting Google Cloud, AWS, and Azure. |

### Footnotes used in the tables

| Marker | Meaning |
|---|---|
| (1) | A Google Cloud service that integrates with organization-level activations to provide findings; one or more of its features might be priced separately from Security Command Center. |
| (2) | Requires an organization-level activation. |
| (3) | Not activated by default; contact your sales representative or Google Cloud partner for pricing details. |
| (4) | Limited capabilities on the Standard tier. |
| (5) | Not supported if data residency controls are enabled. |
| (6) | If data residency controls are enabled, supported only for Google Cloud. |
| (7) | Doesn't support customer-managed encryption keys (CMEK). |
| (8) | Doesn't support data residency. |

### Vulnerability detection: vulnerability scanning

| Service | Standard-legacy | Standard | Premium | Enterprise (Deprecated) |
|---|---|---|---|---|
| Anomaly Detection (1): potential leaked credentials, cryptocurrency mining in projects and VMs | Yes (2) | Yes (2) | Yes (2) | Yes |
| Artifact Registry vulnerability assessment: findings from Artifact Registry scans of vulnerable container images | Yes (2) | Yes (2) | Yes (2) | Yes |
| Sensitive Data Protection discovery (1) | Yes (3) | No | Yes (3) | Yes |
| Vulnerability Assessment for Google Cloud: critical and high severity software vulnerabilities in Compute Engine VMs, agentless | No | Yes (4) | Yes | Yes |
| Agent Platform Vulnerability Assessment (Preview): vulnerable agentic workloads and plaintext secrets in container images | No | No | Yes | Yes |
| External Exposure (Preview) | No | No | Yes | Yes |
| Notebook Security Scanner (Preview): Python package vulnerabilities in Colab Enterprise notebooks | No | No | Yes | Yes |
| VM Manager vulnerability reports (Preview) (1) | No | No | Yes (2) | Yes |
| Vulnerability Assessment for AWS: EC2 software and ECR images | No | No | No | Yes |

### Vulnerability detection: Security Health Analytics, Web Security Scanner

| Service | Standard-legacy | Standard | Premium | Enterprise (Deprecated) |
|---|---|---|---|---|
| Security Health Analytics managed scanning for Google Cloud (not supported with new Standard tier activations; a subset is available in Standard for organizations migrated from Standard-legacy) | Yes | Yes (4) | Yes | Yes |
| Compliance monitoring: detectors map to NIST, HIPAA, PCI-DSS, CIS controls | No | No | Yes | Yes |
| Custom module support (custom Security Health Analytics detectors) | No | No | Yes | Yes |
| Web Security Scanner custom scans (public Compute Engine, GKE, App Engine apps not behind firewalls) | Yes | No | Yes | Yes |
| Web Security Scanner additional OWASP Top Ten detectors | No | No | Yes | Yes |
| Web Security Scanner managed scans (weekly, configured by Security Command Center) | No | No | Yes | Yes |

### Vulnerability detection: virtual red teaming

| Service | Standard-legacy | Standard | Premium | Enterprise (Deprecated) |
|---|---|---|---|---|
| Attack Path Simulations | No | No | Yes (2) | Yes |
| Chokepoints | No | No | Yes | Yes |
| Issues | No | No | Yes (2) | Yes |
| Predefined security graph rules | No | No | Yes | Yes |
| Risk reports (Preview) | No | No | Yes (2) | Yes |
| Scoped issues (Preview): folder, project, or application scope | No | No | Yes | Yes |
| Toxic combinations | No | No | Yes | Yes |

### Vulnerability detection: other services

| Service | Standard-legacy | Standard | Premium | Enterprise (Deprecated) |
|---|---|---|---|---|
| Compute Engine Security risk dashboard findings | Yes | Yes | Yes | Yes |
| GKE security posture dashboard findings (Preview) | Yes | Yes | Yes | Yes |
| Model Armor (a number of tokens per month at no charge to all Google Cloud customers; findings are published to Security Command Center on the Premium and Enterprise tiers) | Yes | Yes | Yes | Yes |
| Mandiant CVE assessments (Preview) | No | Yes (4) | Yes | Yes |
| Artifact guard (Preview) (Deprecated): policy scopes CI/CD platform, registry, runtime | No | No | Yes | Yes |
| Mandiant Attack Surface Management | No | No | No | Yes (5) |

### Postures and policies

| Service | Standard-legacy | Standard | Premium | Enterprise (Deprecated) |
|---|---|---|---|---|
| Binary Authorization (1) | Yes (2) | Yes (2) | Yes (2) | Yes |
| Cloud Infrastructure Entitlement Management (CIEM) | Yes | Yes | Yes | Yes (6) |
| Cyber Insurance Hub (1) | Yes (2) | Yes (2) | Yes (2) | Yes |
| Infrastructure as code (IaC) validation | Yes (2) | No | Yes (2) | Yes |
| Policy Controller (1) | Yes (2) | Yes (2) | Yes (2) | Yes |
| Policy Intelligence (some features at no charge, such as basic-role recommendations and a limited number of queries per month; advanced features for Premium and Enterprise) | Yes | Yes | Yes | Yes |
| AI Protection | No | Yes (4) | Yes | Yes |
| Compliance Manager | No | Yes (4) | Yes (7, 8) | Yes (8) |
| Data security posture management (DSPM) (Deprecated) | No | Yes (2, 4) | Yes (2) | Yes |
| Security posture (on Enterprise, can also monitor AWS) | No | No | Yes (2) | Yes |

### Threat detection and response

| Service | Standard-legacy | Standard | Premium | Enterprise (Deprecated) |
|---|---|---|---|---|
| Google Cloud Armor (1) | Yes (2) | Yes (2) | Yes (2) | Yes |
| Sensitive Actions Service | Yes | Yes | Yes | Yes |
| Agent Platform Threat Detection (Preview) | No | No | Yes | Yes |
| Cloud Run Threat Detection | No | No | Yes | Yes |
| Container Threat Detection (Container-Optimized OS node images) | No | No | Yes | Yes |
| Correlated Threats (Preview) | No | No | Yes | Yes |
| Event Threat Detection | No | No | Yes | Yes |
| Virtual Machine Threat Detection | No | No | Yes | Yes |
| Google SecOps (SIEM and SOAR) | No | No | No | Yes |
| Mandiant Threat Defense (not activated by default; contact sales or a Google Cloud partner) | No | No | No | Yes |

### Data management

| Service | Standard-legacy | Standard | Premium | Enterprise (Deprecated) |
|---|---|---|---|---|
| Customer-managed encryption keys (CMEK) | Yes (2) | Yes (2) | Yes (2) | No |
| Data residency (findings, mute rules, continuous exports, BigQuery exports) | Yes (2) | Yes (2) | Yes (2) | Yes |
| Modify data residency and data encryption | Yes (2) | Yes (2) | Yes (2) | No |
| BigQuery exports (one-time bulk or continuous) | Yes | Yes | Yes | Yes |
| Pub/Sub continuous exports | Yes | Yes | Yes | Yes |
| Cloud Logging continuous exports | No | No | Yes (2) | Yes |

### Other features

| Service | Standard-legacy | Standard | Premium | Enterprise (Deprecated) |
|---|---|---|---|---|
| App Hub integration | Yes | Yes | Yes | Yes |
| Cloud Hub Security and compliance page (Preview) | Yes | Yes | Yes | Yes |
| Application Design Center integration for IaC validation | No | Yes | Yes | Yes |
| Assured Open Source Software | No | No | Yes (2) | Yes |
| Graph Search (Preview) | No | No | Yes (2) | Yes |
| Privileged Access Manager (multi-level and multi-party approvals: Preview, up to two sequential approval levels per entitlement; scope customization: Preview) | No | No | Yes (2) | Yes |
| Query assets with SQL in Cloud Asset Inventory | No | No | Yes | Yes |
| Request more Cloud Asset Inventory quota | No | No | Yes | Yes |
| Multicloud support (AWS, Azure) | No | No | No | Yes |

## Notes

- Enterprise tier shutdown: May 21, 2027 (see [deprecations.md](./deprecations.md)). For Google SecOps features supported with the Enterprise tier, see https://docs.cloud.google.com/security-command-center/docs/secops-limits.
- DSPM is marked (Deprecated); see [deprecations.md](./deprecations.md) for its shutdown date. Artifact guard is also marked (Deprecated) in the table.
- Source inconsistency: the table has "Standard-legacy" as a fourth column even though the prose says "three service tiers"; the Standard-legacy tier might be migrated to Standard (see https://docs.cloud.google.com/security-command-center/docs/migrate-standard-legacy).
- Descriptions in the table above are shortened; tier availability, footnote markers, and Preview / Deprecated markers are as in the source.
- Source: https://docs.cloud.google.com/security-command-center/docs/service-tiers (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/manage/services/describe (gcloud 593.0.0 help). `sha` is the abbreviated service name of `security-health-analytics`.

## Related

- [security-command-center-overview.md](./security-command-center-overview.md)
- [activate-scc-overview.md](./activate-scc-overview.md)
- [activate-scc-project-level-limitations.md](./activate-scc-project-level-limitations.md)
- [data-residency-support.md](./data-residency-support.md)
- [deprecations.md](./deprecations.md)
