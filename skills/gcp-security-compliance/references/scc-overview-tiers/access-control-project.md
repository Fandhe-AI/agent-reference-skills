---
source: https://docs.cloud.google.com/security-command-center/docs/access-control-project
---

# IAM for project-level activations

Standard-legacy, Standard, and Premium service tiers. IAM roles control access to assets, findings, and security sources in a project-level activation. For organization-level activations see [access-control-org.md](./access-control-org.md).

## Signature / Usage

### Grant a required role to a service agent

Role-granting needs `roles/resourcemanager.projectIamAdmin`; if you lack the organization administrator role, your organization administrator can grant the roles to the service agents for you. Service agents (replace `PROJECT_NUMBER`):

- `service-project-PROJECT_NUMBER@security-center-api.iam.gserviceaccount.com` with `roles/securitycenter.serviceAgent`
- `service-project-PROJECT_NUMBER@gcp-sa-ktd-hpsa.iam.gserviceaccount.com` with `roles/containerthreatdetection.serviceAgent`
- `service-project-PROJECT_NUMBER@gcp-sa-csc-hpsa.iam.gserviceaccount.com` (Premium tier only) with `roles/cloudsecuritycompliance.serviceAgent`

Adapted (not in the official docs): the source command is `gcloud organizations add-iam-policy-binding PROJECT_ID --member="SERVICE_ACCOUNT_NAME"`, which passes a project ID to an organizations command and uses a placeholder (`SERVICE_ACCOUNT_NAME`) that the text calls `SERVICE_AGENT_NAME`. It is changed to `gcloud projects add-iam-policy-binding`, the placeholder is `SERVICE_AGENT_NAME`, and `--member` gets the `serviceAccount:` prefix required by the gcloud help.

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member="serviceAccount:SERVICE_AGENT_NAME" \
    --role="IAM_ROLE"
```

## Options / Props

### Role guidance

| Need | Roles |
|---|---|
| Set up or change the project configuration | Both Project IAM Admin (`roles/resourcemanager.projectIamAdmin`) and Security Center Admin (`roles/securitycenter.admin`). |
| View all assets and findings | Security Center Admin Viewer (`roles/securitycenter.adminViewer`). |
| Also view settings | Security Center Settings Viewer (`roles/securitycenter.settingsViewer`). |
| Recommended level | Set these roles at the project level (least privilege), though any level of the hierarchy works. |

### Other role families listed on the page

| Family | Roles |
|---|---|
| Service agent roles (only for service agents) | `roles/securitycenter.attackSurfaceManagementScannerServiceAgent`, `automationServiceAgent`, `controlServiceAgent`, `integrationExecutorServiceAgent`, `notificationServiceAgent`, `securityHealthAnalyticsServiceAgent`, `securityResponseServiceAgent`, `serviceAgent` |
| Security Command Center Management API | `roles/securitycentermanagement.admin`, `editor`, `viewer`, `customModulesEditor`, `customModulesViewer`, `etdCustomModulesEditor`, `etdCustomModulesViewer`, `securityCenterServicesEditor`, `securityCenterServicesViewer`, `settingsEditor`, `settingsViewer`, `shaCustomModulesEditor`, `shaCustomModulesViewer` (grantable at organization, folder, or project) |
| Web Security Scanner (project level) | `roles/cloudsecurityscanner.admin`, `editor`, `viewer`, `runner`; service agent `roles/websecurityscanner.serviceAgent` |

## Notes

- Security Command Center roles: Same roles as in [access-control-org.md](./access-control-org.md): `roles/securitycenter.admin`, `adminEditor`, `adminViewer`, `assetSecurityMarksWriter`, `assetsDiscoveryRunner` (lowest level: Organization), `assetsViewer`, `attackPathsViewer`, `bigQueryExportsEditor`, `bigQueryExportsViewer`, `complianceReportsViewer` (Beta), `complianceSnapshotsViewer` (Beta), `externalSystemsEditor`, `findingSecurityMarksWriter`, `findingsBulkMuteEditor`, `findingsEditor`, `findingsMuteSetter`, `findingsStateSetter`, `findingsViewer`, `findingsWorkflowStateSetter` (Beta), `issuesEditor`, `issuesViewer`, `muteConfigsEditor`, `muteConfigsViewer`, `notificationConfigEditor` and `notificationConfigViewer` (lowest level: Organization), `resourceValueConfigsEditor`, `resourceValueConfigsViewer`, `riskReportsViewer`, `securityHealthAnalyticsCustomModulesTester`, `settingsAdmin`, `settingsEditor`, `settingsViewer`, `simulationsViewer`, `sourcesAdmin` and `sourcesEditor` (lowest level: Organization), `sourcesViewer`, `valuedResourcesViewer`. All SCC roles can be granted at the organization, folder, or project level.
- A project inherits role bindings set at its folders and organization: for example a principal with Security Center Findings Editor (`roles/securitycenter.findingsEditor`) at the organization can view and edit findings in any project of that organization where Security Command Center is active. View who has access, including inherited access, with "View current access" (https://docs.cloud.google.com/iam/docs/manage-access-other-resources#view-access).
- If Security Command Center is already active at the organization level when you activate Premium for a project, project-level service agents are not created; the organization-level agents with the prefix `service-org-ORGANIZATION_ID` are used.
- Service agent roles must only be granted to service agents. You are prompted to grant the roles during project activation; Security Command Center needs them to function. The gcloud help requires `--condition` if the policy has conditional bindings (use `--condition=None` for an unconditional binding).
- Corrected from the official docs: the source command `gcloud organizations add-iam-policy-binding PROJECT_ID --member="SERVICE_ACCOUNT_NAME" --role="IAM_ROLE"` was changed to `gcloud projects add-iam-policy-binding PROJECT_ID --member="serviceAccount:SERVICE_AGENT_NAME" --role="IAM_ROLE"`.
- Per-role permission lists and service agent descriptions are omitted for size; see https://docs.cloud.google.com/iam/docs/roles-permissions/securitycenter and the role pages for `securitycentermanagement`, `cloudsecurityscanner`, and `websecurityscanner`. Find the project ID and number at https://docs.cloud.google.com/resource-manager/docs/view-update-projects#identifying_projects.
- Source: https://docs.cloud.google.com/security-command-center/docs/access-control-project (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control-org.md](./access-control-org.md)
- [activate-scc-for-a-project.md](./activate-scc-for-a-project.md)
- [activate-scc-project-level-limitations.md](./activate-scc-project-level-limitations.md)
