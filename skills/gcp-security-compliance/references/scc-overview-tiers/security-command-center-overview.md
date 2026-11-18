---
source: https://docs.cloud.google.com/security-command-center/docs/security-command-center-overview
---

# Security Command Center overview

Applies to the Standard-legacy, Standard, Premium, and Enterprise (Deprecated) service tiers. The Security Command Center Enterprise service tier will shut down on May 21, 2027; an organization that uses it automatically moves to the Premium service tier on or after May 21, 2027. Security Command Center is a cloud-based risk management solution that helps security professionals prevent, detect, and respond to security issues. Services in each area generate findings (records of threats or other issues), from built-in, integrated, or third-party sources.

## Signature / Usage

### List the finding sources of an organization

Built-in, integrated, and third-party services write findings to sources; this lists the sources under an organization.

```bash
gcloud scc sources list organizations/123456
```

## Options / Props

### Areas covered

| Area | Description |
|---|---|
| Vulnerability detection | Discover and remediate misconfigurations, publicly exposed resources, leaked credentials, and resources with known risks. Monitor compliance against benchmarks such as NIST, HIPAA, PCI-DSS, and CIS. |
| Threat detection and mitigation | Detect and respond to active threats such as malware, cryptocurrency miners, container runtime attacks, and distributed denial-of-service (DDoS) attacks. |
| Postures and policies | Define and deploy a security posture, address posture drift, check for and correct over-permissioned accounts. |
| Compliance and data security frameworks | Define and deploy frameworks and cloud controls to monitor resources, enforce data security, and address drift. |
| Data export | Export findings to BigQuery and Pub/Sub for further analysis. |

### Finding sources

| Source | Description |
|---|---|
| Built-in | Security services that are part of Security Command Center. |
| Integrated | Google Cloud security services that integrate with organization-level activations, for example Google Cloud Armor, Sensitive Data Protection, and Agent Anomaly Detection (Preview), an oversight and audit layer for AI agents deployed on Agent Runtime. |
| Third party | Security services registered as Cloud Marketplace partners, such as Snyk and CrowdStrike Falcon, that work with organization-level activations. |

### Service tiers and activation levels

| Topic | Detail |
|---|---|
| Tiers | Offered in three service tiers: Standard, Premium, and Enterprise. Each tier determines the available features and services. |
| Activation levels | Project-level activation (an individual project) or organization-level activation (an entire organization). |
| Enterprise tier | Requires an organization-level activation. |

## Notes

- Enterprise tier shutdown: May 21, 2027 (see [deprecations.md](./deprecations.md)); contact your account representative or a Google Cloud sales specialist with questions.
- Source inconsistency: the page lists "Standard-legacy, Standard, Premium, and Enterprise (Deprecated)" as the tiers in its banner while its body says "three service tiers"; both are kept as written.
- Third-party services are listed in Cloud Marketplace; configuration of built-in, integrated, and third-party services is on the "Configure Security Command Center services" page.
- Source: https://docs.cloud.google.com/security-command-center/docs/security-command-center-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/sources/list (gcloud 593.0.0 help).

## Related

- [service-tiers.md](./service-tiers.md)
- [activate-scc-overview.md](./activate-scc-overview.md)
- [deprecations.md](./deprecations.md)
