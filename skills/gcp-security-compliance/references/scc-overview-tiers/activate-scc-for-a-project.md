---
source: https://docs.cloud.google.com/security-command-center/docs/activate-scc-for-a-project
---

# Activate Security Command Center for a project

Standard-legacy, Standard, and Premium service tiers (project-level activation; Enterprise can only be activated at the organization level). Project-level Standard activations support the new Standard tier features. The project must be associated with an organization.

## Signature / Usage

### Verify enabled services after activation

```bash
gcloud scc manage services list --project=projects/789
```

### Activate in the console (summary)

- Organization already uses Security Command Center: open **Tier details** (Settings), select the project, click **Manage project tier**, click **Select** for Premium, then **Update**. Only Premium needs activating; the project inherits Standard at minimum.
- Organization doesn't use Security Command Center: on the welcome page select the project, then **Get Standard** and **Activate**, or **Start a Premium free trial** and **Activate**.

## Options / Props

### Required roles (on the project)

| Role | ID |
|---|---|
| Security Admin | `roles/iam.securityAdmin` |
| Security Center Admin | `roles/securitycenter.admin` |

### Prerequisites

| Item | Detail |
|---|---|
| Project | Must be associated with an organization. |
| API | Enable `securitycenter.googleapis.com` if your organization was automatically onboarded to Security Command Center as part of Google Cloud services, or if you will use the API. Needs `serviceusage.services.enable` (Owner or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`). |
| Domain-restricted sharing | If inherited, sign in with an account in an allowed domain; service accounts in an allowed domain or a group within your domain. |
| Container Threat Detection | GKE clusters must be on a supported version and properly configured. |

### Services enabled on project activation

| Tier | Services enabled |
|---|---|
| Standard | Security Health Analytics (its service agent gets the required roles). With service perimeters, grant inbound access to the Cloud Security Command Center Service Agent. |
| Premium | Container Threat Detection, Event Threat Detection (needs logs enabled for the organization, folders, projects; most data access audit logs must be activated), Security Health Analytics, Security posture, Virtual Machine Threat Detection, Vulnerability Assessment, Web Security Scanner |

### Premium service agents

| Service agent | Used for |
|---|---|
| Cloud Security Command Center Service Agent | Event Threat Detection, Security Health Analytics, Virtual Machine Threat Detection, Vulnerability Assessment |
| Cloud Security Compliance Service Agent | AI Protection, Compliance Manager |
| Container Threat Detection Service Agent | Container Threat Detection |

## Notes

- Premium free trial: 30 days; afterwards the project automatically transitions to Premium pay-as-you-go and the billing account is charged. To avoid charges, downgrade to Standard before the trial ends (any time during the trial). If the organization hasn't activated Security Command Center, you can activate Premium for a project with the 30-day trial.
- If an organization-level Premium activation is in use, set up project-level activations before it ends to avoid a coverage lapse. With an organization-level subscription, when it expires Premium coverage continues only for projects where Premium is already selected. With organization-level pay-as-you-go you must downgrade the organization to Standard for project-level activations to take effect.
- To enable data residency or data encryption (CMEK) you must activate Security Command Center at the organization level.
- Source inconsistency: the page lists the Premium services above without Compliance Manager or AI Protection while listing the Cloud Security Compliance Service Agent; the list is kept as written (the organization-level Premium activation page lists AI Protection and Compliance Manager as enabled).
- If you use service perimeters, configure ingress and egress policies for the service agents (service-specific pages: Compliance Manager, Container Threat Detection, Security Health Analytics, Vulnerability Assessment). Perimeter changes can block production traffic; use dry-run mode first.
- If Security Command Center is already activated at the organization level when you activate Premium on a project, project-level service agents are not created; the organization-level service agents (prefix `service-org-ORGANIZATION_ID`) are used.
- Findings appear in the console as they become available; first full scan within 24 hours, some services start later (see "When to expect findings in Security Command Center").
- Only the console activation flow is documented; it is summarized above. Project-level limitations: [activate-scc-project-level-limitations.md](./activate-scc-project-level-limitations.md).
- Source: https://docs.cloud.google.com/security-command-center/docs/activate-scc-for-a-project (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/manage/services/list (gcloud 593.0.0 help).

## Related

- [activate-scc-overview.md](./activate-scc-overview.md)
- [activate-scc-project-level-limitations.md](./activate-scc-project-level-limitations.md)
- [access-control-project.md](./access-control-project.md)
- [activate-premium-tier.md](./activate-premium-tier.md)
