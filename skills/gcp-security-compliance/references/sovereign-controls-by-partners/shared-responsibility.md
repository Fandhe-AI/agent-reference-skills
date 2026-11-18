---
source: https://docs.cloud.google.com/sovereign-controls-by-partners/docs/shared-responsibility
---

# Shared responsibility in Sovereign Controls by Partners

Describes which security and compliance tasks belong to you and which to Google when you use Sovereign Controls by Partners, plus the fields where sensitive or regulated data must not be entered.

## Signature / Usage

This gcloud help example describes Assured Workloads environment `456` of organization `123` in `us-central1`; the source's create-folder page notes that Sovereign Controls by Partners is an Assured Workloads offering and creates its folders from the Create an Assured Workloads folder page.

```bash
gcloud assured workloads describe \
    organizations/123/locations/us-central1/workloads/456
```

## Options / Props

### Customer responsibilities

| Area | Detail |
|---|---|
| Data classification | Understand which portions of your data have different compliance and security requirements; place sensitive or regulated data with specific access or residency requirements inside appropriate Sovereign Controls by Partners folders or projects and keep it there |
| IAM | Configure Identity and Access Management so the contents of your organization are accessed and modifiable by the appropriate personnel |
| Hierarchy | Create and organize the organizational hierarchy so it does not expose personal data |
| Documentation | Read all documentation to understand and follow best practices |
| Support sessions | Share information prudently during technical support and troubleshooting; do not place or share sensitive or regulated data outside compliant Sovereign Controls by Partners folders |

### Google responsibilities (examples)

| Responsibility |
|---|
| Applying default encryption and infrastructure controls |
| Enforcing the IAM policies you set to restrict workload administration and data access |
| Configuring and enforcing the Sovereign Controls by Partners controls you selected for your compliance regime, for protected data types in the resources you configured, including restrictions on where data is stored and which Google employees can access it |
| Providing configurations and controls for regulated industries and locationally sensitive data |
| Providing organization policies and resource settings across your hierarchy of folders and projects |
| Providing Policy Intelligence tools for insights on access to accounts and resources |

### Additional controls specific to Europe and the EU (on top of GDPR assurances)

| Control |
|---|
| An EU data boundary (see Data residency in the Assured Workloads docs) |
| Support routing to EU persons in EU locations, including subprocessors |
| Visibility into Administrative Access requests and accesses |
| Policy-driven access approvals (Sovereign Controls only) |
| Custom options for data encryption and key management |

### Fields not recommended for sensitive or regulated data

| Common field |
|---|
| Resource names and IDs |
| Project or folder names and IDs |
| Any description fields or labels |
| Log-based metrics |
| VM sizes and similar service configurations |
| URIs or file paths |
| Timestamps |
| User IDs |
| Firewall rules |
| Security scanning configurations |
| Customer IAM policies |

## Notes

- Factors for deciding which controls to implement: your regulatory compliance obligations, your organization's security standards and risk management plan, and the security requirements of your customers and vendors.
- Sensitive or regulated data can include account information, health information, personal identifiers for customers or users, cardholder data and ID numbers.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/assured/workloads/describe (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/sovereign-controls-by-partners/docs/shared-responsibility (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-folder.md](./create-folder.md)
- [supported-products.md](./supported-products.md)
