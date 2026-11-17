---
source: https://docs.cloud.google.com/assured-workloads/docs/shared-responsibility
---

# Shared responsibility in Assured Workloads

Under the shared responsibility model you decide which security controls your regulated data needs and keep that data in the right Assured Workloads folders; Google configures and enforces the Assured Workloads controls you select.

## Signature / Usage

### View a violation's details

The page has no code block. This snippet from the monitoring page views the details of a compliance violation in an Assured Workloads folder; `VIOLATION_PATH` is returned in the `name` field of the list response.

```bash
gcloud assured workloads violations describe VIOLATION_PATH
```

## Options / Props

### Customer responsibilities

| Area | Description |
|---|---|
| Data classification | Understand which portions of your data have different compliance and security requirements; place sensitive or regulated data with specific access or residency requirements inside appropriate Assured Workloads folders or projects, and keep it there. |
| IAM | Configure Identity and Access Management so organization contents are accessed and modifiable only by appropriate personnel. |
| Hierarchy design | Create and organize the organizational hierarchy so it does not expose personal data. |
| Documentation | Read all documentation to understand and follow best practices. |
| Support sessions | Share information prudently during technical support and troubleshooting, and do not place or share sensitive or regulated data outside compliant Assured Workloads folders. |

### Google responsibilities

| Area | Description |
|---|---|
| Default protections | Default encryption and infrastructure controls. |
| IAM enforcement | Enforcing the IAM policies you set to restrict workload administration and data access. |
| Assured Workloads controls | Configuring and enforcing the customer-selected controls for the selected compliance regime, for protected data types in the configured resources, including where data is stored and which Google employees can access it in the course of appropriate business activities. |
| Configuration tools | Assured Workloads configurations and controls, organization policies and resource settings across the hierarchy, and Policy Intelligence tools for insight on access. |

### Fields not recommended for sensitive or regulated data

| Field |
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

- Fields not recommended for sensitive or regulated data: Common input fields may not be protected by technical controls or may fall outside the Assured Workloads technical control boundary. Avoid placing sensitive or regulated data in:
- Sensitive or regulated data can include account information, health information, personal identifiers for customers or users, cardholder data and ID numbers, depending on the regulations that apply.
- Europe and the EU: with EU Regions or Sovereign Controls for EU, additional technical controls on top of the GDPR assurances include an EU data boundary, support routing to EU persons in EU locations (including subprocessors), visibility into Administrative Access requests and accesses, policy-driven access approvals (Sovereign Controls only), and custom options for data encryption and key management.
- Snippet taken from https://docs.cloud.google.com/assured-workloads/docs/monitor-folder
- Source: https://docs.cloud.google.com/assured-workloads/docs/shared-responsibility (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [data-residency.md](./data-residency.md)
- [monitor-folder.md](./monitor-folder.md)
