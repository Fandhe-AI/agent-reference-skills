---
source: https://docs.cloud.google.com/security-command-center/docs/configure-ai-protection
---

# Configure AI Protection

Set up the detection services, IAM roles and per-tier activation steps that AI Protection in Security Command Center (SCC) needs. Applies to Standard, Premium and Enterprise (Deprecated) service tiers. AI Protection is enabled by default for new SCC activations; if you activated any tier before AI Protection was available, enable it manually. Supported regions are listed in the SCC regional endpoints page (`locations-ai-protection`).

## Signature / Usage

In every command, `RESOURCE_TYPE` is `organizations` or `projects` for `add-iam-policy-binding` (`organization` or `project` for the flag name in `iam roles create`), `RESOURCE_ID` is the numeric organization ID or the project ID, and `USER_EMAIL` / `USER_EMAIL_ID` is the user's email address.

### Grant predefined roles

```bash
gcloud RESOURCE_TYPE add-iam-policy-binding RESOURCE_ID \
  --member=user:USER_EMAIL_ID \
  --role=roles/securitycenter.admin
```

```bash
gcloud RESOURCE_TYPE add-iam-policy-binding RESOURCE_ID \
  --member=user:USER_EMAIL_ID \
  --role=roles/securitycenter.adminViewer
```

### Create and grant the AIP Viewer custom role

Adapted (not in the official docs): the trailing `\` after the last `--permissions` line is removed because it continues the command onto a following blank line.

```bash
gcloud iam roles create aip.viewer \
    --RESOURCE_TYPE=RESOURCE_ID \
    --title="AIP Viewer" \
    --description="Grants permissions required to view AIP dashboard and data." \
    --permissions="cloudasset.assets.exportResource,cloudasset.assets.searchAllIamPolicies,cloudasset.assets.searchAllResources,cloudasset.assets.searchEnrichmentResourceOwners,cloudasset.othercloudconnections.get,cloudasset.othercloudconnections.list,cloudsecuritycompliance.controlComplianceSummaries.list,cloudsecuritycompliance.frameworkComplianceReports.get,monitoring.timeSeries.list,resourcemanager.organizations.get,resourcemanager.projects.get,securitycentermanagement.securityCommandCenter.get,securitycenter.assets.group,securitycenter.assets.list,securitycenter.attackpaths.list,securitycenter.complianceReports.aggregate,securitycenter.findings.group,securitycenter.findings.list,securitycenter.issues.get,securitycenter.issues.group,securitycenter.issues.list,securitycenter.issues.listFilterValues,securitycenter.simulations.get,securitycenter.sources.get,securitycenter.sources.list,securitycenter.userinterfacemetadata.get,securitycenter.valuedresources.list"
```

```bash
gcloud RESOURCE_TYPE add-iam-policy-binding RESOURCE_ID \
    --member="user:USER_EMAIL" \
    --role="RESOURCE_TYPE/RESOURCE_ID/roles/aip.viewer"
```

### Create the AIP Essentials custom role and grant administrator access

Adapted (not in the official docs): the trailing `\` after the last `--permissions` line is removed because it continues the command onto a following blank line.

```bash
gcloud iam roles create aip.essentials \
    --RESOURCE_TYPE=RESOURCE_ID \
    --title="AIP Essentials" \
    --description="Grants supporting permissions required to view AIP dashboard and data." \
    --permissions="cloudasset.assets.searchEnrichmentResourceOwners,cloudasset.othercloudconnections.get,cloudasset.othercloudconnections.list,resourcemanager.organizations.get,resourcemanager.projects.get,securitycentermanagement.securityCommandCenter.get,securitycenter.assets.group,securitycenter.assets.list,securitycenter.attackpaths.list,securitycenter.complianceReports.aggregate,securitycenter.findings.group,securitycenter.findings.list,securitycenter.simulations.get,securitycenter.userinterfacemetadata.get,securitycenter.valuedresources.list"
```

Adapted (not in the official docs): the role ID `roles/securityCenter.findingsViewer` is written `roles/securitycenter.findingsViewer` (the role ID in the IAM roles reference).

```bash
gcloud RESOURCE_TYPE add-iam-policy-binding RESOURCE_ID \
    --member="user:USER_EMAIL" \
    --role="roles/modelarmor.admin"

gcloud RESOURCE_TYPE add-iam-policy-binding RESOURCE_ID \
    --member="user:USER_EMAIL" \
    --role="roles/modelarmor.floorSettingsAdmin"

gcloud RESOURCE_TYPE add-iam-policy-binding RESOURCE_ID \
    --member="user:USER_EMAIL" \
    --role="roles/cloudsecuritycompliance.admin"

gcloud RESOURCE_TYPE add-iam-policy-binding RESOURCE_ID \
    --member="user:USER_EMAIL" \
    --role="roles/securitycenter.findingsViewer"

gcloud RESOURCE_TYPE add-iam-policy-binding RESOURCE_ID \
    --member="user:USER_EMAIL" \
    --role="roles/monitoring.viewer"

gcloud RESOURCE_TYPE add-iam-policy-binding RESOURCE_ID \
    --member="user:USER_EMAIL" \
    --role="roles/cloudasset.viewer"

gcloud RESOURCE_TYPE add-iam-policy-binding RESOURCE_ID \
    --member="user:USER_EMAIL" \
    --role="RESOURCE_TYPE/RESOURCE_ID/roles/aip.essentials"
```

## Options / Props

### Detection services

| Service | Tier / stage | Configuration |
|---|---|---|
| AI Discovery service | Enabled automatically (Enterprise onboarding) | Verify `roles/monitoring.viewer` on the SCC service account `service-org-ORG_ID@security-center-api.gserviceaccount.com` or `service-project-PROJECT_NUMBER@security-center-api.gserviceaccount.com`. |
| Attack Path Simulations (Risk Engine) | Premium, Enterprise (Deprecated) | Listed; no steps in the source. |
| Cloud Audit Logs, Cloud Monitoring | — | Listed as AI Protection services; the source gives no tier and no steps. |
| Compliance Manager | Standard, Premium, Enterprise (Deprecated) (tier from the AI Protection overview; not stated on this page) | Required: Compliance Manager framework for AI Protection. |
| Event Threat Detection | Premium, Enterprise (Deprecated) | Listed. |
| Agent Platform Threat Detection | Premium, Enterprise (Deprecated) | Listed. |
| Model Armor | Standard, Premium, Enterprise (Deprecated) (tier from the AI Protection overview; not stated on this page) | Required: enable `modelarmor.googleapis.com` in each project with generative AI activity; create templates; configure floor settings. |
| Notebook Security Scanner | Preview; automatic on Enterprise (Deprecated) | Premium: enable the service for the organization or project, then grant `roles/dataform.viewer` to `notebook-security-scanner-prod@system.gserviceaccount.com` on all projects that contain Notebooks. |
| Sensitive Data Protection | Premium, Enterprise (Deprecated) | Enable `dlp.googleapis.com` (needs `serviceusage.services.enable`, for example via `roles/serviceusage.serviceUsageAdmin`); grant `DLP Reader` and `DLP Data Profiles Admin` to AI Protection users; configure discovery. |
| Agent Platform Vulnerability Assessment | Preview; Premium, Enterprise (Deprecated); on by default for new activations | Existing customers: **Settings** > **Manage Settings** on the AI Protection card > **Vulnerability Assessment for Agent Platform** > **Manage settings** (organization or project view only). |
| App Hub (MCP server inventory) | Preview; required | Enable `apphub.googleapis.com` in each project that hosts MCP servers. |

### Roles

| Access | Roles |
|---|---|
| Configure AI Protection and view dashboard data | `roles/securitycenter.admin` (Security Center Admin) on the organization or project |
| View dashboard data only | `roles/securitycenter.adminViewer` (Security Center Admin Viewer) |
| Prerequisites to create and grant roles | IAM Role Administrator `roles/iam.roleAdmin`, and Organization Administrator `roles/resourcemanager.organizationAdmin` or Project IAM Admin `roles/resourcemanager.projectIamAdmin` |
| Custom viewer role | `AIP Viewer` (ID `aip.viewer`, launch stage General Availability) |
| Custom administrator support role | `AIP Essentials` (ID `aip.essentials`) plus `roles/modelarmor.admin`, `roles/modelarmor.floorSettingsAdmin`, `roles/cloudsecuritycompliance.admin`, `roles/securitycenter.findingsViewer`, `roles/monitoring.viewer`, `roles/cloudasset.viewer` |

### Setup per service tier

| Tier | Steps |
|---|---|
| Standard | Activate SCC Standard if needed; check **Risk Overview** > **AI Security**. |
| Premium | Activate SCC Premium if needed; if activated earlier, **Settings** > **Manage Settings** on the AI Protection card; enable sensitive data discovery; check **Risk Overview** > **AI Security**. |
| Enterprise (Deprecated) | Activate SCC Enterprise if needed; in the **SCC Setup Guide** expand **Review security capabilities**, click **Set up** on the **AI protection** panel; enable discovery from the **Data security** panel (**Sensitive data discovery** card) or the **Enable discovery** page. |

## Notes

- The dashboard can take some time to reflect AI asset data after all services are configured; a disabled critical service is flagged on the dashboard with instructions.
- Enterprise tier shutdown: "The Security Command Center Enterprise service tier will shut down on May 21, 2027. If your organization uses the Enterprise service tier, then the organization will automatically move to the Premium service tier on or after May 21, 2027."
- Ensure organization policies do not block the service accounts named above. If Model Armor is not configured in any project or no template exists, the Model Armor widgets on the AI Security dashboard show no data.
- Optional: create a resource value configuration to add high-value resources. Preview: scope it to agentic resources by selecting a type such as `aiplatform.googleapis.com/ReasoningEngine`, or by labels or tags; the next attack path simulation then covers them.
- Corrected from the official docs: the source writes `--role=roles/securityCenter.findingsViewer` (capital C, also in the Console list); the role ID is `roles/securitycenter.findingsViewer`.
- Adapted from the official docs: the source ends both `gcloud iam roles create` commands with `--permissions="..." \`; the trailing backslash was dropped.
- Source placeholder: `--RESOURCE_TYPE=RESOURCE_ID` stands for `--organization=ORG_ID` or `--project=PROJECT_ID` (the `gcloud iam roles create` help documents both flags).
- Security Center Admin and Model Armor Admin are broad roles; grant the least needed.
- The source also shows Console steps for creating and granting roles; omitted here.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/securitycenter (role ID `roles/securitycenter.findingsViewer`, used for the correction above).
- Inconsistency kept from the source: the AI Discovery service is tiered Premium and Enterprise (Deprecated) in the overview, while the Enterprise onboarding enables it automatically here.
- Source: https://docs.cloud.google.com/security-command-center/docs/ai-protection-overview (tiers of Compliance Manager and Model Armor in the table above).
- Source: https://docs.cloud.google.com/security-command-center/docs/configure-ai-protection (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [ai-protection-overview.md](./ai-protection-overview.md)
- [model-armor.md](./model-armor.md)
