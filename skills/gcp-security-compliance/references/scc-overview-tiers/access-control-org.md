---
source: https://docs.cloud.google.com/security-command-center/docs/access-control-org
---

# Control access with organization-level activations

Standard-legacy, Standard, Premium, and Enterprise (Deprecated) service tiers. The Security Command Center Enterprise service tier will shut down on May 21, 2027; an organization that uses it automatically moves to the Premium service tier on or after May 21, 2027. In an organization-level deployment, IAM manages permissions at the organization, folder, and project levels (including projects where Premium is activated). For project-level activations see [access-control-project.md](./access-control-project.md).

## Signature / Usage

### Grant a required role to a service agent (organization administrator)

Requires `roles/resourcemanager.organizationAdmin`; if you lack it, your organization administrator can run this command. Service agents: `service-org-ORGANIZATION_ID@security-center-api.iam.gserviceaccount.com` (role `roles/securitycenter.serviceAgent`) and `service-org-ORGANIZATION_ID@gcp-sa-ktd-hpsa.iam.gserviceaccount.com` (role `roles/containerthreatdetection.serviceAgent`).

Adapted (not in the official docs): `--member` gets the `serviceAccount:` prefix that the gcloud help requires (form `user|group|serviceAccount:email`); the source passes the bare service agent name.

```bash
gcloud organizations add-iam-policy-binding ORGANIZATION_ID \
    --member="serviceAccount:SERVICE_AGENT_NAME" \
    --role="IAM_ROLE"
```

Replace `ORGANIZATION_ID` with your organization ID, `SERVICE_AGENT_NAME` with one of the two service agent names above, and `IAM_ROLE` with the role that corresponds to it.

## Options / Props

### Role guidance

| Need | Roles and level |
|---|---|
| Activate Security Command Center | See the Standard, Premium, and Enterprise activation pages (required roles). |
| Change configuration of the organization | Both `roles/resourcemanager.organizationAdmin` and `roles/securitycenter.admin` at the organization level. |
| View all assets, findings, and attack paths | `roles/securitycenter.adminViewer` at the organization level. |
| View settings | `roles/securitycenter.admin` at the organization level. |
| Restrict access to individual folders and projects | Don't grant at the organization level; grant `roles/securitycenter.assetsViewer` and `roles/securitycenter.findingsViewer` at the folder or project level. |
| View attack paths from attack path simulations | Permissions granted at the organization level and the console view set to the organization. |
| Create or update findings and finding notifications | Organization scope only; organization-level roles are required. |
| Findings not connected to a Google Cloud resource | Attached to the organization; visible to anyone with organization-level Security Command Center permissions. |

### Security Command Center roles (organization, folder, or project level)

| Role | ID | Description | Lowest level | Stage |
|---|---|---|---|---|
| Security Center Admin | `admin` | Admin (super user) access to security center | Project | |
| Security Center Admin Editor | `adminEditor` | Admin read-write access | Project | |
| Security Center Admin Viewer | `adminViewer` | Admin read access | Project | |
| Security Center Asset Security Marks Writer | `assetSecurityMarksWriter` | Write access to asset security marks | Project | |
| Security Center Assets Discovery Runner | `assetsDiscoveryRunner` | Run asset discovery access to assets | Organization | |
| Security Center Assets Viewer | `assetsViewer` | Read access to assets | Project | |
| Security Center Attack Paths Reader | `attackPathsViewer` | Read access to attack paths | — | |
| Security Center BigQuery Exports Editor | `bigQueryExportsEditor` | Read-write access to BigQuery exports | — | |
| Security Center BigQuery Exports Viewer | `bigQueryExportsViewer` | Read access to BigQuery exports | — | |
| Security Center Compliance Reports Viewer | `complianceReportsViewer` | Read access to compliance reports | — | Beta |
| Security Center Compliance Snapshots Viewer | `complianceSnapshotsViewer` | Read access to compliance snapshots | — | Beta |
| Security Center External Systems Editor | `externalSystemsEditor` | Write access to external systems | — | |
| Security Center Finding Security Marks Writer | `findingSecurityMarksWriter` | Write access to finding security marks | Project | |
| Security Center Findings Bulk Mute Editor | `findingsBulkMuteEditor` | Ability to mute findings in bulk | — | |
| Security Center Findings Editor | `findingsEditor` | Read-write access to findings | Project | |
| Security Center Findings Mute Setter | `findingsMuteSetter` | Set mute access to findings | — | |
| Security Center Findings State Setter | `findingsStateSetter` | Set state access to findings | Project | |
| Security Center Findings Viewer | `findingsViewer` | Read access to findings | Project | |
| Security Center Findings Workflow State Setter | `findingsWorkflowStateSetter` | Set workflow state access to findings | Project | Beta |
| Security Center Issues Editor | `issuesEditor` | Write access to issues | — | |
| Security Center Issues Viewer | `issuesViewer` | Read access to issues | — | |
| Security Center Mute Configurations Editor | `muteConfigsEditor` | Read-write access to mute configurations | — | |
| Security Center Mute Configurations Viewer | `muteConfigsViewer` | Read access to mute configurations | — | |
| Security Center Notification Configurations Editor | `notificationConfigEditor` | Write access to notification configurations | Organization | |
| Security Center Notification Configurations Viewer | `notificationConfigViewer` | Read access to notification configurations | Organization | |
| Security Center Resource Value Configurations Editor | `resourceValueConfigsEditor` | Read-write access to resource value configurations | — | |
| Security Center Resource Value Configurations Viewer | `resourceValueConfigsViewer` | Read access to resource value configurations | — | |
| Security Center Risk Reports Viewer | `riskReportsViewer` | Read access to risk reports | — | |
| Security Health Analytics Custom Modules Tester | `securityHealthAnalyticsCustomModulesTester` | Test access to Security Health Analytics custom modules | — | |
| Security Center Settings Admin | `settingsAdmin` | Admin (super user) access to settings | Project | |
| Security Center Settings Editor | `settingsEditor` | Read-write access to settings | Project | |
| Security Center Settings Viewer | `settingsViewer` | Read access to settings | Project | |
| Security Center Simulations Reader | `simulationsViewer` | Read access to simulations | — | |
| Security Center Sources Admin | `sourcesAdmin` | Admin access to sources | Organization | |
| Security Center Sources Editor | `sourcesEditor` | Read-write access to sources | Organization | |
| Security Center Sources Viewer | `sourcesViewer` | Read access to sources | Project | |
| Security Center Valued Resources Reader | `valuedResourcesViewer` | Read access to valued resources | — | |

### Security Command Center service agent roles (grant only to service agents)

| Role | ID | Description |
|---|---|---|
| Attack Surface Management Scanner Service Agent | `roles/securitycenter.attackSurfaceManagementScannerServiceAgent` | Lets Mandiant Attack Surface Management scan Cloud Platform resources |
| Security Center Automation Service Agent | `roles/securitycenter.automationServiceAgent` | Configures GCP resources to enable security scanning |
| Security Center Control Service Agent | `roles/securitycenter.controlServiceAgent` | Monitors and configures GCP resources and imports security findings |
| Security Center Integration Executor Service Agent | `roles/securitycenter.integrationExecutorServiceAgent` | Access to execute Integrations |
| Security Center Notification Service Agent | `roles/securitycenter.notificationServiceAgent` | Publishes notifications to Pub/Sub topics |
| Security Health Analytics Service Agent | `roles/securitycenter.securityHealthAnalyticsServiceAgent` | Scans GCP resource metadata to find vulnerabilities |
| Google Cloud Security Response Service Agent | `roles/securitycenter.securityResponseServiceAgent` | Gives Playbook Runner permissions to execute all Google-authored Playbooks (keeps evolving as playbooks are added) |
| Security Center Service Agent | `roles/securitycenter.serviceAgent` | Scans GCP resources and imports security scans |

### Security Command Center Management API roles (`roles/securitycentermanagement.<id>`)

| Role | ID | Description |
|---|---|---|
| Security Center Management Admin | `admin` | Full access to services and custom modules configuration |
| Security Center Management Editor | `editor` | Editor role for Security Center Management |
| Security Center Management Viewer | `viewer` | Read-only access to services and custom modules configuration |
| Security Center Management Custom Modules Editor | `customModulesEditor` | Full access to custom modules |
| Security Center Management Custom Modules Viewer | `customModulesViewer` | Read-only access to custom modules |
| Security Center Management Custom ETD Modules Editor | `etdCustomModulesEditor` | Full access to ETD custom modules |
| Security Center Management ETD Custom Modules Viewer | `etdCustomModulesViewer` | Read-only access to ETD custom modules |
| Security Center Management Services Editor | `securityCenterServicesEditor` | Full access to services configuration |
| Security Center Management Services Viewer | `securityCenterServicesViewer` | Read-only access to services configuration |
| Security Center Management Settings Editor | `settingsEditor` | Full access to settings |
| Security Center Management Settings Viewer | `settingsViewer` | Read-only access to settings |
| Security Center Management SHA Custom Modules Editor | `shaCustomModulesEditor` | Full access to SHA custom modules |
| Security Center Management SHA Custom Modules Viewer | `shaCustomModulesViewer` | Read-only access to SHA custom modules |

### Compliance Manager, Security Posture, DSPM, and Web Security Scanner roles

| Role | ID | Description | Lowest level |
|---|---|---|---|
| Compliance Manager Admin | `roles/cloudsecuritycompliance.admin` | Full access to Compliance Manager resources | — |
| Compliance Manager Viewer | `roles/cloudsecuritycompliance.viewer` | Read-only access to Compliance Manager resources | — |
| Cloud Security Compliance Service Agent (service agent) | `roles/cloudsecuritycompliance.serviceAgent` | Gives the CSC service account access to consumer resources | — |
| Security Posture Admin | `roles/securityposture.admin` | Full access to Security Posture service APIs | Organization |
| Security Posture Viewer | `roles/securityposture.viewer` | Read-only access to all Security Posture resources | — |
| Security Posture Deployer | `roles/securityposture.postureDeployer` | Mutate and read the Posture Deployment resource | — |
| Security Posture Deployments Viewer | `roles/securityposture.postureDeploymentsViewer` | Read-only access to the Posture Deployment resource | — |
| Security Posture Resource Editor | `roles/securityposture.postureEditor` | Mutate and read the Posture resource | — |
| Security Posture Resource Viewer | `roles/securityposture.postureViewer` | Read-only access to the Posture resource | — |
| Security Posture Shift-Left Validator | `roles/securityposture.reportCreator` | Create Reports, e.g. an IaC Validation Report | — |
| Data Security Posture Management Admin | `roles/dspm.admin` | Full access to DSPM resources | — |
| Data Security Posture Management Viewer | `roles/dspm.viewer` | Read-only access to DSPM resources | — |
| DSPM Service Agent (service agent) | `roles/dspm.serviceAgent` | Gives the DSPM service account access to consumer resources | — |
| Web Security Scanner Admin | `roles/cloudsecurityscanner.admin` | Full access to all Web Security Scanner resources | — |
| Web Security Scanner Editor | `roles/cloudsecurityscanner.editor` | Full access to all Web Security Scanner resources | Project |
| Web Security Scanner Viewer | `roles/cloudsecurityscanner.viewer` | Read access to all Web Security Scanner resources | Project |
| Web Security Scanner Runner | `roles/cloudsecurityscanner.runner` | Read access to Scan and ScanRun, plus the ability to start scans | Project |
| Cloud Web Security Scanner Service Agent (service agent) | `roles/websecurityscanner.serviceAgent` | Gives the service account access to Compute Engine and App Engine details | — |

### Service agents created after activation

| Service agent | Required role | Condition |
|---|---|---|
| `service-org-ORGANIZATION_ID@security-center-api.iam.gserviceaccount.com` | `roles/securitycenter.serviceAgent` | |
| `service-org-ORGANIZATION_ID@gcp-sa-ktd-hpsa.iam.gserviceaccount.com` | `roles/containerthreatdetection.serviceAgent` | |
| `service-org-ORGANIZATION_ID@gcp-sa-csc-hpsa.iam.gserviceaccount.com` | `roles/cloudsecuritycompliance.serviceAgent` | Premium tier only |
| `service-org-ORGANIZATION_ID@gcp-sa-dspm-hpsa.iam.gserviceaccount.com` | `roles/dspm.serviceAgent` (used by DSPM) | Premium tier only |

## Notes

- Security Command Center roles (organization, folder, or project level): Role IDs are `roles/securitycenter.<id>`. "Lowest level" is the lowest-level resource where the source says the role can be granted (— = not stated).
- Role inheritance: projects and folders inherit organization role bindings. Organization-level roles are not suitable for sensitive applications or compliance standards that need strict access control; grant roles at the folder and project levels for fine-grained policies. Folder and project roles can restrict view or edit to specific folders and projects, restrict finding detail and security-mark updates to people with access to the underlying finding, and settings can only be viewed with organization-level roles. A finding is attached to the most immediate container of the resource that generated it (for example the project that contains a VM).
- If a user doesn't need edit permissions, grant viewer roles. Each detection service might need additional permissions; see that service's documentation. In the console, users without organization-level permissions choose only resources they can access; the API and gcloud CLI list or group only assets and findings at those scopes.
- Service agent roles (marked as such in the source) must only be granted to service agents, not to any other principal. During activation you are prompted to grant required roles to each agent; this is required for Security Command Center to function. The organization-level grant command above needs `roles/resourcemanager.organizationAdmin`. The gcloud help requires `--condition` if the policy has conditional bindings (use `--condition=None` for an unconditional binding).
- Adapted from the official docs: the source command used `--member="SERVICE_AGENT_NAME"`; it was changed to `--member="serviceAccount:SERVICE_AGENT_NAME"` to match the gcloud help.
- The per-role permission lists in the source are omitted for size; see https://docs.cloud.google.com/iam/docs/roles-permissions/securitycenter and the `securitycentermanagement`, `cloudsecuritycompliance`, `securityposture`, `dspm`, `cloudsecurityscanner`, and `websecurityscanner` role pages. DSPM is deprecated (see [deprecations.md](./deprecations.md)); the source marks Compliance Reports Viewer, Compliance Snapshots Viewer, and Findings Workflow State Setter as Beta.
- Enterprise tier permissions for ongoing use are on https://docs.cloud.google.com/security-command-center/docs/activate-enterprise-tier.
- Source: https://docs.cloud.google.com/security-command-center/docs/access-control-org (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control-project.md](./access-control-project.md)
- [activate-standard-tier.md](./activate-standard-tier.md)
- [activate-premium-tier.md](./activate-premium-tier.md)
- [deprecations.md](./deprecations.md)
