---
source: https://docs.cloud.google.com/security-command-center/docs/compliance-manager-overview
---

# Compliance Manager overview

Compliance Manager in Google Cloud helps ensure that your Google Cloud infrastructure, workloads, and data meet the security and regulatory requirements of your organization or project. It lets you define and deploy a compliant and secure configuration, view dashboards of alignment with your requirements, and (Premium and Enterprise tiers only) audit your cloud environments, including collecting evidence and generating reports. You can enable Compliance Manager for individual projects, regardless of the parent organization's settings. It is part of Security Command Center and is available on the Standard, Premium, and Enterprise (Deprecated) service tiers.

## Signature / Usage

### List the frameworks in an organization

```bash
gcloud compliance-manager frameworks list \
   --organization=3589215982 \
   --location=global
```

## Options / Props

### Components

| Component | Description |
|-----------|-------------|
| Rule | A technical item within a cloud control that lets you meet a compliance, security, or privacy requirement. Rules can be organization policies, IAM policies, cloud settings, and detection logic based on Common Expression Language (CEL). |
| Cloud control | A set of rules and associated metadata (remediation instructions, finding severity) that defines the security or compliance intent for your organization or project. Built-in cloud controls are provided and you can create your own. |
| Regulatory control | An industry-defined security or regulatory compliance requirement. A single cloud control can map to multiple regulatory controls, and a single regulatory control can map to multiple cloud controls. |
| Framework | A collection of cloud controls and regulatory controls that represent security best practices or industry-defined standards such as FedRAMP or NIST. Built-in frameworks can be customized, or you can create your own. |
| Framework deployment | The binding between a particular framework and an organization, folder, or project when you deploy the framework. |

### Cloud control modes

| Mode | Tier | Description |
|------|------|-------------|
| Detective | All tiers | Applies the cloud control to the defined resources for monitoring. Violations are detected and alerts are generated; no preventive actions are taken automatically. Some controls need extra information, for example the permitted regions for a location-checking control. |
| Audit | Premium and Enterprise only | Used to audit your environment for alignment with your compliance obligations; gathers evidence for compliance audits and identifies gaps. |

### Built-in frameworks

| Framework | Tier |
|-----------|------|
| Security Essentials | All Security Command Center tiers (the Standard tier supports only this framework) |
| Google Recommended AI Essentials - Gemini Enterprise Agent Platform | Premium and Enterprise only |
| Center for Information Security (CIS) Controls 8.0 | Premium and Enterprise only |
| CIS Google Cloud Computing Platform Benchmark v3.0 | Premium and Enterprise only |
| CIS Kubernetes Benchmark v1.1.7 | Premium and Enterprise only |
| Cloud Controls Matrix (CCM) 4 | Premium and Enterprise only |
| Data Security and Privacy Essentials | Premium and Enterprise only |
| Data Security Framework Template | Premium and Enterprise only |
| FedRAMP Low | Premium and Enterprise only |
| International Organization for Standardization (ISO) 27001, 2022 | Premium and Enterprise only |
| National Institute of Standards and Technology (NIST) SP 800-53 R5 | Premium and Enterprise only |
| NIST AI 600-1 Privacy Controls | Premium and Enterprise only |
| NIST Cybersecurity Framework (CSF) 1.1 | Premium and Enterprise only |
| Payment Card Industry Data Security Standard (PCI DSS) 4.0 | Premium and Enterprise only |
| Qatar National Information Assurance Standard 2.1 | Premium and Enterprise only |
| System and Organization Controls (SOC) 2 | Premium and Enterprise only |

### Scan types for detective controls

| Scan type | Tier | Behavior |
|-----------|------|----------|
| Batch scan | All | All detective cloud controls are scheduled to run periodically for all enrolled organizations or projects. |
| Near-real-time scan | Premium only | Supported detective cloud controls start scans whenever a change is detected in a resource's configuration. Some controls support batch scanning only (see the "Cloud controls that support batch scanning only" page). |

### Scan latency

| Item | Premium and Enterprise | Standard |
|------|------------------------|----------|
| Initial batch scan | Starts approximately one hour after activation; the first scans can take up to 48 hours to complete | Batch scans run every 96 hours (initial finding latency up to 96 hours) |
| Subsequent batch scans | Every 16 hours | Every 38 hours |
| Findings after deploying a framework | Up to 6 hours before findings for detective cloud controls appear | Up to 6 hours |
| Near-real-time updates (Premium tier only) | Might take several minutes depending on asset type and change | — |
| Findings to monitoring dashboards | Up to 24 hours after a finding appears on the Findings dashboard to affect compliance counts; asset changes can take up to 48 hours | Same |

## Notes

- Scan latency: Batch scan schedules are performance objectives, not service guarantees.
- The Security Command Center Enterprise service tier will shut down on May 21, 2027. An organization on the Enterprise tier automatically moves to the Premium tier on or after May 21, 2027.
- Preliminary findings shown during the initial scans are accurate and actionable but not comprehensive. Starting an audit in the Premium or Enterprise tier within the first 48 hours is not recommended.
- Most Security Health Analytics detectors are also available as cloud controls and are turned on by default. When you enable Compliance Manager, certain built-in frameworks are automatically applied to your organization.
- Security Health Analytics generates findings through the `securitycenter.googleapis.com` API; Compliance Manager uses the `cloudsecuritycompliance.googleapis.com` API. Enabling both on the same resource can produce duplicate findings (different provider IDs) when a detector and a cloud control check the same configuration. To avoid duplicates, either disable Security Health Analytics for the project or folder (if the deployed frameworks map to all applicable detectors), or mute the duplicate Security Health Analytics findings.
- If you deployed a security posture with the security posture service, you might receive duplicate findings; consider deploying a matching framework and deleting the posture deployment.
- Disabling a cloud control requires removing it from the custom frameworks that include it or unassigning the deployed built-in framework.
- Compliance Manager uses the global endpoint, not the endpoint you may specify when you enable data residency for Security Command Center. You can specify the location in which to audit your environment.
- Snippet taken from https://docs.cloud.google.com/security-command-center/docs/compliance-manager-apply-framework
- Source: https://docs.cloud.google.com/security-command-center/docs/compliance-manager-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [compliance-manager-enable.md](./compliance-manager-enable.md)
- [compliance-manager-apply-framework.md](./compliance-manager-apply-framework.md)
- [compliance-manager-monitor-framework.md](./compliance-manager-monitor-framework.md)
- [compliance-manager-audit.md](./compliance-manager-audit.md)
- [compliance-manager-write-cel-expressions.md](./compliance-manager-write-cel-expressions.md)
