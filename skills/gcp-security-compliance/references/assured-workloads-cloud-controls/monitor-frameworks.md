---
source: https://docs.cloud.google.com/assured-workloads/docs/monitor-frameworks
---

# Monitor Assured Workloads frameworks

Preview. Applies only to Assured Workloads frameworks. Assured Workloads compares a deployed data boundary's requirements with the folder or project it is assigned to; drift from one or more cloud control requirements is reported as a violation that you can review, resolve, or acknowledge with an exception. Monitoring is enabled automatically when a framework is applied to a resource.

## Signature / Usage

The source documents violation handling in the Google Cloud console (Compliance > Monitoring > Assured Workloads Violations tab, with Organization Policy Violations and Resource Violations tabs).

### Inspect a framework deployment from the command line

To describe framework deployment `my-framework-deployment-id` in project `my-project-number` and location `global`:

```bash
gcloud compliance-manager framework-deployments describe \
    my-framework-deployment-id --project=my-project-number \
    --location=global
```

## Options / Props

### Violation types

| Type | Cause | Mapped constraint |
|------|-------|-------------------|
| Location | A child resource in an assigned folder or project is deployed to a non-compliant location (for example by modifying the default of the Restrict Resource Locations cloud control) | `gcp.resourceLocations` |
| Service usage | A non-compliant service endpoint (such as `compute.googleapis.com`) is enabled (for example by modifying the default of Restrict Service Usage) | `gcp.restrictServiceUsage` |
| Encryption | Non-compliant services added to, or required services removed from, the Enforce CMEK for Supported Services cloud control | `gcp.restrictNonCmekServices` |
| Access | Changing Access Approval / Access Transparency cloud controls (for example the default of Enable Access Transparency) | n/a |
| Configuration | A cloud control value changed to a non-compliant value | n/a |

### Violation statuses

| Status | Meaning |
|--------|---------|
| Unresolved | Not addressed, or previously granted an exception before non-compliant changes were made on the folder or resource |
| Resolved | Addressed by following the remediation steps |
| Exception | Granted an exception with a business justification |

### Exception limits

| Item | Limit |
|------|-------|
| Organization policy violations acknowledged per operation | up to 100 |
| Resource violations acknowledged per operation | up to 400 |

## Notes

- Preview: subject to the "Pre-GA Offerings Terms"; available "as is" with limited support. Before deploying or monitoring frameworks you must be added to an allowlist (the source links a sign-up form).
- An exception applies to all selected violations; for organization policy violations, the Apply to all existing child resource violations checkbox extends it to child resources. If further non-compliant changes are made beyond the original exception, the state returns to unresolved and a new violation is shown.
- A parent organization policy violation that causes a child resource violation must be addressed at the child level first; resolve the parent afterwards.
- The Violation details page shows the audit log (when, which policy changed, who made the change, who granted any exception), the affected organization policy, and previous exceptions with justification and time.
- An exception only acknowledges drift; it does not remediate it. Record the business justification carefully.
- The source shows Console steps only; no gcloud, REST or Terraform examples.
- Source: https://docs.cloud.google.com/assured-workloads/docs/monitor-frameworks (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compliance-manager/framework-deployments/describe (gcloud 593.0.0 help).

## Related

- [manage-frameworks.md](./manage-frameworks.md)
- [manage-cloud-controls.md](./manage-cloud-controls.md)
