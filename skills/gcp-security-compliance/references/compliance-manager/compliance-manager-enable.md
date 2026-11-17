---
source: https://docs.cloud.google.com/security-command-center/docs/compliance-manager-enable
---

# Enable Compliance Manager

Enable Compliance Manager so that you can apply frameworks to your Google Cloud organization or project. How it is enabled depends on the Security Command Center service tier (Standard, Premium, or Enterprise (Deprecated)) and whether you activate at the organization or project level. Enablement is done in the Google Cloud console; the source page has no gcloud enablement command.

## Signature / Usage

### List the framework deployments of an organization

```bash
gcloud compliance-manager framework-deployments list \
    --organization=my-organization-id --location=global
```

## Options / Props

### Required IAM roles

| Scope | Role | Role ID | Granted on |
|-------|------|---------|-----------|
| Organization | Organization Policy Administrator | `roles/orgpolicy.policyAdmin` | The organization |
| Organization | Security Center Admin Editor | `roles/securitycenter.adminEditor` | The organization |
| Project | Project IAM Admin | `roles/resourcemanager.projectIamAdmin` | The project |
| Project | Security Center Admin | `roles/securitycenter.admin` | The project |

### How to enable

| Scenario | Instructions |
|----------|--------------|
| Security Command Center not activated; want Standard tier | Activate Security Command Center Standard. For new organizations that activate Standard, Compliance Manager is enabled automatically. |
| Already using the Standard tier | No action required; Compliance Manager is enabled through a backend upgrade. |
| Not activated; want Premium tier | Activate Security Command Center Premium. |
| Not activated; want Enterprise tier | Activate Security Command Center Enterprise. |
| Activated Premium previously | Enable on the Settings page. |
| Activated Enterprise previously | Enable on the Activate Compliance Manager page. |
| Any tier activated previously; enable for a single project | Select the project scope and enable on the Settings page. |

### Services enabled with Compliance Manager

| Service | Tier |
|---------|------|
| Sensitive Data Protection (data sensitivity signals for default data risk assessment) | Premium and Enterprise only |
| Event Threat Detection (organization level) | Premium and Enterprise only |
| AI protection (for AI security frameworks) | Premium and Enterprise only |

### Frameworks applied automatically

| Tier | Framework applied to the organization |
|------|---------------------------------------|
| Standard | Security Essentials |
| Premium | None |
| Enterprise (Deprecated) | Google Recommended AI Essentials - Gemini Enterprise Agent Platform |

### Service agent

| Activation scope | Cloud Security Compliance service agent |
|------------------|-----------------------------------------|
| Organization | `service-org-ORGANIZATION_ID@gcp-sa-csc-hpsa.iam.gserviceaccount.com` |
| Project | `service-PROJECT_NUMBER@gcp-sa-csc-hpsa.iam.gserviceaccount.com` |

### Downgrading to the Standard tier

| Area | Effect |
|------|--------|
| Framework deployments | All built-in framework deployments (excluding Security Essentials) are removed automatically, without warning or notification. A custom framework containing a cloud control unsupported in Standard is removed entirely. |
| Findings | Findings associated with unsupported frameworks are marked inactive; read-only access for seven days, then they expire and become unavailable. |
| Custom cloud controls | You can't create or manage them. They are preserved but inactive and unusable; active framework deployments containing them are removed automatically. Related IAM permissions become ineffective (no manual revocation needed). |
| Audit | Audit capabilities are exclusive to Premium and Enterprise. Audit reports and evidence in Cloud Storage buckets are managed by Object Lifecycle Management rules, not Security Command Center retention policies. |

### Upgrading again to Premium or Enterprise

| Effect | Detail |
|--------|--------|
| Custom controls | Inactive custom controls become available again. |
| Framework deployments | Deployments removed during the downgrade are not recoverable; you must re-deploy your frameworks manually. |

## Notes

- Services enabled with Compliance Manager: For the Standard tier, AI-related findings are evaluated by using the baseline security controls in the default Security Essentials framework.
- The Security Command Center Enterprise service tier will shut down on May 21, 2027. An organization on the Enterprise tier automatically moves to the Premium tier on or after May 21, 2027.
- Compliance Manager doesn't support customer-managed encryption keys (CMEK).
- To complete audits with Compliance Manager, also enable Audit Manager (see the Audit Manager pages of this skill).
- Downgrading is disruptive: built-in framework deployments are removed without notification and cannot be recovered on upgrade. Review the effects first, because some data may be permanently lost or altered.
- You can deploy frameworks to individual projects based on your compliance needs.
- Console activation steps are condensed; see the source page.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compliance-manager/framework-deployments/list
- Source: https://docs.cloud.google.com/security-command-center/docs/compliance-manager-enable (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [compliance-manager-overview.md](./compliance-manager-overview.md)
- [compliance-manager-apply-framework.md](./compliance-manager-apply-framework.md)
- [compliance-manager-audit.md](./compliance-manager-audit.md)
