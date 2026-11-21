---
source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/access-control
---

# Access control (IAM roles) for CX Agent Studio

Several team members often collaborate on an agent and services access it. You control the access granted to principals with roles, configured through Identity and Access Management (IAM) in the Google Cloud console. Users are added by email address; service accounts are added by their associated email address (needed when one service account is used for multiple projects).

## Signature / Usage

### Add, change or remove a principal

Open the IAM page in the Google Cloud console. To add a principal: click the add button at the top of the page, enter the principal's email address, select a role, click **Save**. To change permissions: edit the principal, select a different role, **Save**. To remove: use the remove button for the principal.

### Restrict access to one agent application

When adding or editing a principal, create a conditional role binding. The following condition provides access to a specific agent application as well as the top-level resources within the project that the agent application needs:

Adapted (not in the official docs): the app clause `resource.name.startsWith(".../apps/APP_ID")` is split into an exact match for the app and a prefix ending in `/` for its child resources, so the binding no longer also covers other apps whose ID starts with `APP_ID`.

```text
resource.name == "projects/PROJECT_ID" ||
resource.name == "projects/PROJECT_ID/locations/LOCATION_ID/apps/APP_ID" ||
resource.name.startsWith("projects/PROJECT_ID/locations/LOCATION_ID/apps/APP_ID/") ||
resource.name.startsWith("projects/PROJECT_ID/locations/LOCATION_ID/operations") ||
resource.name.startsWith("projects/PROJECT_ID/locations/LOCATION_ID/sipDomains") ||
resource.name.startsWith("projects/PROJECT_ID/locations/LOCATION_ID/omnichannels") ||
resource.name.startsWith("projects/PROJECT_ID/locations/LOCATION_ID/dataStores") ||
resource.name.startsWith("projects/PROJECT_ID/locations/LOCATION_ID/routes") ||
resource.name.startsWith("projects/PROJECT_ID/locations/LOCATION_ID/endpointConfigs")
```

To access Customer Experience Insights, also grant Customer Experience Insights roles in addition to the conditional grant.

### Customer Experience Insights permissions

CX Agent Studio integrates with CX Insights. Principals that access CX Agent Studio need `contactcenterinsights.googleapis.com/conversations.get` and `contactcenterinsights.googleapis.com/conversations.list`. The child roles of `ces.googleapis.com/admin` and `ces.googleapis.com/viewer` (`roles/ces.admin`, `roles/ces.viewer`) include them automatically; custom roles must include them. Alternatively grant a CX Insights role: `contactcenterinsights.googleapis.com/viewer` (IAM role ID `roles/contactcenterinsights.viewer`; read-only access to conversations) or `contactcenterinsights.googleapis.com/admin` (IAM role ID `roles/contactcenterinsights.admin`; full access to conversations). You may also need the Discovery engine setup steps from the CX Insights documentation.

### Requests that involve Cloud Storage access

Some requests read or write Cloud Storage objects on the caller's behalf, so the request authentication needs permissions for CX Agent Studio and for the Cloud Storage objects (see the Cloud Storage access control guide for Cloud Storage roles). When implementing your own client with OAuth, use this scope:

- `https://www.googleapis.com/auth/cloud-platform` (access to all project resources)

### Roles

Role names and permission names are copied as the source writes them.

#### Gemini Enterprise for Customer Experience Admin (`ces.googleapis.com/admin`; IAM role ID `roles/ces.admin`)

Full access to resources. Base roles: `ces.googleapis.com/viewer`, `ces.googleapis.com/client`, `contactcenterinsights.googleapis.com/admin`. Additional permissions: `ces.googleapis.com/operations.delete`, `ces.googleapis.com/operations.cancel`, `ces.googleapis.com/apps.create`, `ces.googleapis.com/apps.update`, `ces.googleapis.com/apps.delete`, `ces.googleapis.com/apps.import`, `ces.googleapis.com/apps.export`, `ces.googleapis.com/apps.runEvaluation`, `ces.googleapis.com/agents.create`, `ces.googleapis.com/agents.update`, `ces.googleapis.com/agents.updateCallbacks`, `ces.googleapis.com/agents.updateInstructions`, `ces.googleapis.com/agents.updateTools`, `ces.googleapis.com/agents.updateGeneral`, `ces.googleapis.com/agents.delete`, `ces.googleapis.com/examples.create`, `ces.googleapis.com/examples.update`, `ces.googleapis.com/examples.delete`, `ces.googleapis.com/tools.create`, `ces.googleapis.com/tools.update`, `ces.googleapis.com/tools.delete`, `ces.googleapis.com/guardrails.create`, `ces.googleapis.com/guardrails.update`, `ces.googleapis.com/guardrails.delete`, `ces.googleapis.com/toolsets.create`, `ces.googleapis.com/toolsets.update`, `ces.googleapis.com/toolsets.delete`, `ces.googleapis.com/deployments.create`, `ces.googleapis.com/deployments.update`, `ces.googleapis.com/deployments.delete`, `ces.googleapis.com/conversations.delete`, `ces.googleapis.com/evaluations.create`, `ces.googleapis.com/evaluations.update`, `ces.googleapis.com/evaluations.delete`, `ces.googleapis.com/evaluationResults.delete`, `ces.googleapis.com/evaluationDatasets.create`, `ces.googleapis.com/evaluationDatasets.update`, `ces.googleapis.com/evaluationDatasets.delete`, `ces.googleapis.com/evaluationRuns.delete`, `ces.googleapis.com/scheduledEvaluationRuns.create`, `ces.googleapis.com/scheduledEvaluationRuns.update`, `ces.googleapis.com/scheduledEvaluationRuns.delete`, `ces.googleapis.com/appVersions.create`, `ces.googleapis.com/appVersions.delete`, `ces.googleapis.com/appVersions.restore`, `ces.googleapis.com/omnichannels.create`, `ces.googleapis.com/omnichannels.update`, `ces.googleapis.com/omnichannels.delete`, `ces.googleapis.com/apps.createTagBinding`, `ces.googleapis.com/apps.deleteTagBinding`, `ces.googleapis.com/apps.listTagBindings`, `ces.googleapis.com/apps.listEffectiveTags`, `ces.googleapis.com/assistantSessions.create`, `ces.googleapis.com/routes.create`, `ces.googleapis.com/routes.update`, `ces.googleapis.com/routes.delete`, `ces.googleapis.com/endpointConfigs.create`, `ces.googleapis.com/endpointConfigs.update`, `ces.googleapis.com/endpointConfigs.delete`, `ces.googleapis.com/sipDomains.create`, `ces.googleapis.com/sipDomains.update`, `ces.googleapis.com/sipDomains.delete`, `ces.googleapis.com/securitySettings.update`.

#### Gemini Enterprise for Customer Experience Viewer (`ces.googleapis.com/viewer`; IAM role ID `roles/ces.viewer`)

Read-only access to resources. Base role: `contactcenterinsights.googleapis.com/viewer`. Additional permissions: `cloudresourcemanager.googleapis.com/projects.get`, `cloudresourcemanager.googleapis.com/projects.list`, `ces.googleapis.com/operations.list`, `ces.googleapis.com/operations.get`, `ces.googleapis.com/locations.list`, `ces.googleapis.com/locations.get`, `ces.googleapis.com/apps.list`, `ces.googleapis.com/apps.get`, `ces.googleapis.com/agents.list`, `ces.googleapis.com/agents.get`, `ces.googleapis.com/examples.list`, `ces.googleapis.com/examples.get`, `ces.googleapis.com/tools.list`, `ces.googleapis.com/tools.get`, `ces.googleapis.com/guardrails.list`, `ces.googleapis.com/guardrails.get`, `ces.googleapis.com/toolsets.list`, `ces.googleapis.com/toolsets.get`, `ces.googleapis.com/deployments.list`, `ces.googleapis.com/deployments.get`, `ces.googleapis.com/conversations.list`, `ces.googleapis.com/conversations.get`, `ces.googleapis.com/appVersions.list`, `ces.googleapis.com/appVersions.get`, `ces.googleapis.com/evaluations.list`, `ces.googleapis.com/evaluations.get`, `ces.googleapis.com/evaluationResults.list`, `ces.googleapis.com/evaluationResults.get`, `ces.googleapis.com/evaluationDatasets.list`, `ces.googleapis.com/evaluationDatasets.get`, `ces.googleapis.com/evaluationRuns.list`, `ces.googleapis.com/evaluationRuns.get`, `ces.googleapis.com/scheduledEvaluationRuns.list`, `ces.googleapis.com/scheduledEvaluationRuns.get`, `ces.googleapis.com/changelogs.list`, `ces.googleapis.com/changelogs.get`, `ces.googleapis.com/omnichannels.get`, `ces.googleapis.com/omnichannels.list`, `ces.googleapis.com/apps.listTagBindings`, `ces.googleapis.com/apps.listEffectiveTags`, `ces.googleapis.com/assistantSessions.list`, `ces.googleapis.com/assistantSessions.get`, `ces.googleapis.com/routes.list`, `ces.googleapis.com/routes.get`, `ces.googleapis.com/endpointConfigs.list`, `ces.googleapis.com/endpointConfigs.get`, `ces.googleapis.com/sipDomains.list`, `ces.googleapis.com/sipDomains.get`, `ces.googleapis.com/securitySettings.get`.

#### Gemini Enterprise for Customer Experience Client (`ces.googleapis.com/client`; IAM role ID `roles/ces.client`)

Query access to agents. Permissions: `ces.googleapis.com/sessions.runSession`, `ces.googleapis.com/sessions.bidiRunSession`, `ces.googleapis.com/tools.execute`.

#### Gemini Enterprise for Customer Experience App Editor (`ces.googleapis.com/appEditor`; IAM role ID `roles/ces.appEditor`)

Full control over app-level settings; manages global logging, audio/voice configurations, storage buckets, and app versions. Base role: `ces.googleapis.com/viewer`. Additional permissions: `ces.googleapis.com/apps.create`, `ces.googleapis.com/apps.update`, `ces.googleapis.com/apps.delete`, `ces.googleapis.com/apps.import`, `ces.googleapis.com/apps.export`, `ces.googleapis.com/apps.runEvaluation`, `ces.googleapis.com/apps.createTagBinding`, `ces.googleapis.com/apps.deleteTagBinding`, `ces.googleapis.com/appVersions.create`, `ces.googleapis.com/appVersions.delete`, `ces.googleapis.com/appVersions.restore`.

#### Gemini Enterprise for Customer Experience Agent Editor (`ces.googleapis.com/agentEditor`; IAM role ID `roles/ces.agentEditor`)

Full control over Agent node structures, flows, instructions, and callbacks. Can add/remove tools from agents (but not create new tools). Base roles: `ces.googleapis.com/viewer`, `ces.googleapis.com/client`. Additional permissions: `ces.googleapis.com/agents.create`, `ces.googleapis.com/agents.update`, `ces.googleapis.com/agents.updateCallbacks`, `ces.googleapis.com/agents.updateInstructions`, `ces.googleapis.com/agents.updateTools`, `ces.googleapis.com/agents.updateGeneral`, `ces.googleapis.com/agents.delete`, `ces.googleapis.com/examples.create`, `ces.googleapis.com/examples.update`, `ces.googleapis.com/examples.delete`.

#### Gemini Enterprise for Customer Experience Tools Editor (`ces.googleapis.com/toolsEditor`; IAM role ID `roles/ces.toolsEditor`)

Full control over Tools, Toolsets, and Integrations. Base roles: `ces.googleapis.com/viewer`, `ces.googleapis.com/client`. Additional permissions: `ces.googleapis.com/tools.create`, `ces.googleapis.com/tools.update`, `ces.googleapis.com/tools.delete`, `ces.googleapis.com/toolsets.create`, `ces.googleapis.com/toolsets.update`, `ces.googleapis.com/toolsets.delete`.

#### Gemini Enterprise for Customer Experience Guardrails Editor (`ces.googleapis.com/guardrailsEditor`; IAM role ID `roles/ces.guardrailsEditor`)

Full control over safety settings and guardrails. Base roles: `ces.googleapis.com/viewer`, `ces.googleapis.com/client`. Additional permissions: `ces.googleapis.com/guardrails.create`, `ces.googleapis.com/guardrails.update`, `ces.googleapis.com/guardrails.delete`.

#### Gemini Enterprise for Customer Experience Evals Editor (`ces.googleapis.com/evalsEditor`; IAM role ID `roles/ces.evalsEditor`)

Full control over Evaluation datasets, runs, and results. Base roles: `ces.googleapis.com/viewer`, `ces.googleapis.com/client`. Additional permissions: `ces.googleapis.com/evaluations.create`, `ces.googleapis.com/evaluations.update`, `ces.googleapis.com/evaluations.delete`, `ces.googleapis.com/evaluationResults.delete`, `ces.googleapis.com/evaluationDatasets.create`, `ces.googleapis.com/evaluationDatasets.update`, `ces.googleapis.com/evaluationDatasets.delete`, `ces.googleapis.com/evaluationRuns.delete`, `ces.googleapis.com/scheduledEvaluationRuns.create`, `ces.googleapis.com/scheduledEvaluationRuns.update`, `ces.googleapis.com/scheduledEvaluationRuns.delete`.

#### Gemini Enterprise for Customer Experience Security Settings Editor (`ces.googleapis.com/securitySettingsEditor`; IAM role ID `roles/ces.securitySettingsEditor`)

Full control over project-wide Security Settings. Base role: `ces.googleapis.com/viewer`. Additional permission: `ces.googleapis.com/securitySettings.update`.

#### Gemini Enterprise for Customer Experience Deployment Editor (`ces.googleapis.com/deploymentEditor`; IAM role ID `roles/ces.deploymentEditor`)

Ability to manage environments and deploy specific App Versions to them. Base role: `ces.googleapis.com/viewer`. Additional permissions: `ces.googleapis.com/deployments.create`, `ces.googleapis.com/deployments.update`, `ces.googleapis.com/deployments.delete`.

## Notes

- Adapted from the official docs: the source condition writes `resource.name.startsWith("projects/PROJECT_ID/locations/LOCATION_ID/apps/APP_ID")`. A prefix without the trailing `/` also matches `.../apps/APP_ID2` and its children, so it grants access to every app whose ID begins with the same string. The page uses `resource.name == ".../apps/APP_ID"` for the app itself and `resource.name.startsWith(".../apps/APP_ID/")` for its child resources. The other `startsWith` clauses end in a fixed collection name (`operations`, `sipDomains`, `omnichannels`, `dataStores`, `routes`, `endpointConfigs`) and are kept as written.
- The Admin role gives full access to all CX Agent Studio resources, including deleting apps, conversations and evaluation data and updating security settings; grant it sparingly and prefer the narrower editor roles or the Client role for services that only call `runSession`.
- The role and permission identifiers use the `ces.googleapis.com/...` form exactly as the source writes them. In IAM bindings use the role IDs given next to each heading (`roles/ces.admin`, `roles/ces.viewer`, `roles/ces.client`, `roles/ces.appEditor`, `roles/ces.agentEditor`, `roles/ces.toolsEditor`, `roles/ces.guardrailsEditor`, `roles/ces.evalsEditor`, `roles/ces.securitySettingsEditor`, `roles/ces.deploymentEditor`); the IAM roles and permissions reference writes permissions as `ces.apps.create`, `contactcenterinsights.conversations.get` and so on.
- The IAM roles and permissions reference does not list some permissions named in this source: `ces.agents.updateCallbacks`, `ces.agents.updateInstructions`, `ces.agents.updateTools`, `ces.agents.updateGeneral`, the tag binding permissions (`ces.apps.createTagBinding`, `ces.apps.deleteTagBinding`, `ces.apps.listTagBindings`, `ces.apps.listEffectiveTags`) and the `ces.scheduledEvaluationRuns.*`, `ces.omnichannels.*`, `ces.routes.*`, `ces.endpointConfigs.*` and `ces.sipDomains.*` permissions; the role contents there may differ from the lists above.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/ces (role IDs and permission names; retrieved 2026-11-21)
- The source also shows Console click-paths for adding, changing and removing principals.
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/access-control (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [api-access.md](./api-access.md)
- [vpc-service-controls.md](./vpc-service-controls.md)
- [cmek.md](./cmek.md)
