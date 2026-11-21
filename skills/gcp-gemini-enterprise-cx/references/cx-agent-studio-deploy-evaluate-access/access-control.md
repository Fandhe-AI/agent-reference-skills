---
source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/access-control
---

# Access control (IAM roles) for CX Agent Studio

Several team members often collaborate on an agent and services access it. You control the access granted to principals with roles, configured through Identity and Access Management (IAM) in the Google Cloud console. Users are added by email address; service accounts are added by their associated email address (needed when one service account is used for multiple projects).

## Signature / Usage

### Add, change or remove a principal

Open the IAM page in the Google Cloud console. To add a principal: click the add button at the top of the page, enter the principal's email address, select a role, click **Save**. To change permissions: edit the principal, select a different role, **Save**. To remove: use the remove button for the principal.

### Restrict access to one agent application

When adding or editing a principal, create conditional role bindings. The source gives one condition that "provides access to a specific agent application as well as top-level resources within the project needed by the agent application". In one binding, its clauses for the shared, location-wide collections (`operations`, `sipDomains`, `omnichannels`, `dataStores`, `routes`, `endpointConfigs`) match every such resource in `PROJECT_ID` / `LOCATION_ID`, including those used by other apps; the `ces` Discovery documents (`v1` and `v1beta`) have operations only at `projects/{projectsId}/locations/{locationsId}/operations/{operationsId}`, with no app-scoped path. With `roles/ces.admin`, which the IAM reference shows includes `ces.operations.cancel` and `ces.operations.delete`, a single binding would let the principal cancel and delete any operation in that location. The project clause `resource.name == "projects/PROJECT_ID"` in the same binding gives the editing role on the project resource itself, so every permission of that role that is checked on the project is granted without the app restriction. This page therefore splits the source's condition into three bindings (the split is not in the official docs): binding 1 gives the editing role on the one app only, binding 2 gives a read-only role on the project resource, and the shared-collection clauses become an optional binding 3. For a strict restriction to one app, grant bindings 1 and 2 only and do not grant binding 3.

Binding 1, the single-app procedure: the editing role (for example `roles/ces.admin` or one of the editor roles below), limited to the one app and its child resources:

Adapted (not in the official docs): this binding keeps only the app clause of the source's condition, moves the project clause to binding 2, and splits the app clause `resource.name.startsWith(".../apps/APP_ID")` into an exact match for the app and a prefix ending in `/` for its child resources, so the editing role covers neither the project resource, nor other apps whose ID starts with `APP_ID`, nor the location-wide collections.

```text
resource.name == "projects/PROJECT_ID/locations/LOCATION_ID/apps/APP_ID" ||
resource.name.startsWith("projects/PROJECT_ID/locations/LOCATION_ID/apps/APP_ID/")
```

Binding 2, the project resource, with a read-only role. The source includes the project in its condition as one of the "top-level resources within the project needed by the agent application", but it does not say which permissions are checked on the project or which role is the minimum for it. `roles/ces.viewer` is the narrowest predefined `ces` role that the IAM reference shows with `resourcemanager.projects.get` and `resourcemanager.projects.list` (the source's Viewer role lists them as `cloudresourcemanager.googleapis.com/projects.get` / `projects.list`); a custom role with only the permissions you confirm are needed is narrower. Whether the console works without this binding is not stated in the official docs.

Adapted (not in the official docs): this binding holds only the project clause of the source's condition, so that the editing role in binding 1 is not granted on the project resource.

```text
resource.name == "projects/PROJECT_ID"
```

Binding 3 (optional, not part of the single-app restriction), the shared collections, as the source writes these clauses, with a narrower role. Add it only if the principal needs access to these shared resources and read access to the shared resources of all apps in the location is acceptable: the clauses match every operation, SIP domain, omnichannel, data store, route and endpoint config in `PROJECT_ID` / `LOCATION_ID`, so with `roles/ces.viewer` the principal can read the operations of other apps (`ces.operations.get`, `ces.operations.list`). No predefined `ces` role covers only these collections; the narrowest predefined option is `roles/ces.viewer` (read-only; it includes `ces.operations.get` and `ces.operations.list`). The IAM reference does not list write permissions for `sipDomains`, `omnichannels`, `routes` or `endpointConfigs`, so a custom role with write access to them cannot be built from the IAM reference. Whether a given task works with read-only access to the shared collections is not stated in the official docs.

```text
resource.name.startsWith("projects/PROJECT_ID/locations/LOCATION_ID/operations") ||
resource.name.startsWith("projects/PROJECT_ID/locations/LOCATION_ID/sipDomains") ||
resource.name.startsWith("projects/PROJECT_ID/locations/LOCATION_ID/omnichannels") ||
resource.name.startsWith("projects/PROJECT_ID/locations/LOCATION_ID/dataStores") ||
resource.name.startsWith("projects/PROJECT_ID/locations/LOCATION_ID/routes") ||
resource.name.startsWith("projects/PROJECT_ID/locations/LOCATION_ID/endpointConfigs")
```

### Customer Experience Insights permissions

Access to Customer Experience Insights is a separate decision from the single-app bindings above. The source says: "In order to have access to Customer Experience Insights, you should grant Customer Experience Insights roles in addition to conditional granting." The CX Insights roles `roles/contactcenterinsights.viewer` and `roles/contactcenterinsights.admin` granted on the project are not limited by the app condition: they give access to every CX Insights conversation in the project, including conversations of other apps. To give a user only part of the conversations, CX Insights documents authorized views (Preview, fine-grained access control): the user gets a role such as `roles/contactcenterinsights.authorizedViewer` on an authorized view whose filter limits the data (see the fine-grained access control overview in the Customer Experience Insights docs, https://docs.cloud.google.com/gemini-enterprise-cx/insights/overview-of-fine-grained-access-control). Whether the CX Agent Studio integration with CX Insights works through authorized views is not stated in the official docs.

CX Agent Studio integrates with CX Insights. Principals that access CX Agent Studio need the IAM permissions `contactcenterinsights.conversations.get` and `contactcenterinsights.conversations.list` (use these IDs in the `includedPermissions` of a custom role). The child roles of `ces.googleapis.com/admin` and `ces.googleapis.com/viewer` (`roles/ces.admin`, `roles/ces.viewer`) include them automatically; custom roles must include them. Alternatively grant a CX Insights role: `contactcenterinsights.googleapis.com/viewer` (IAM role ID `roles/contactcenterinsights.viewer`; read-only access to conversations) or `contactcenterinsights.googleapis.com/admin` (IAM role ID `roles/contactcenterinsights.admin`; full access to conversations). You may also need the Discovery engine setup steps from the CX Insights documentation.

### Requests that involve Cloud Storage access

Some requests read or write Cloud Storage objects on the caller's behalf, so the request authentication needs permissions for CX Agent Studio and for the Cloud Storage objects (see the Cloud Storage access control guide for Cloud Storage roles). When implementing your own client with OAuth, use this scope:

- `https://www.googleapis.com/auth/cloud-platform` (access to all project resources)

The scope description is the source's wording. The scope limits which Google Cloud APIs the access token can be used with; it does not grant access by itself. What the request can actually read or write, in CX Agent Studio and on the Cloud Storage objects, is decided by the IAM roles of the principal the token belongs to, so grant that principal only the CX Agent Studio and Cloud Storage roles it needs (this page of the official docs does not spell out the relationship).

### Roles

Role names are copied as the source writes them (`ces.googleapis.com/...`), with the IAM role ID next to each. Each role lists its permissions in two groups: the IAM permission IDs that the IAM roles and permissions reference confirms for that role (the `ces.apps.create` form, usable in a custom role's `includedPermissions`), and the permissions that appear only in the product guide, kept in the guide's `ces.googleapis.com/...` form because the IAM reference does not list them (do not put them into `includedPermissions` unless the IAM reference lists them). Every permission the guide names for a role appears in exactly one of the two groups, in the guide's order.

#### Gemini Enterprise for Customer Experience Admin (`ces.googleapis.com/admin`; IAM role ID `roles/ces.admin`)

Full access to resources. Base roles: `ces.googleapis.com/viewer` (`roles/ces.viewer`), `ces.googleapis.com/client` (`roles/ces.client`), `contactcenterinsights.googleapis.com/admin` (`roles/contactcenterinsights.admin`). Additional permissions as IAM permission IDs confirmed in `roles/ces.admin` in the IAM reference: `ces.operations.delete`, `ces.operations.cancel`, `ces.apps.create`, `ces.apps.update`, `ces.apps.delete`, `ces.apps.import`, `ces.apps.export`, `ces.apps.runEvaluation`, `ces.agents.create`, `ces.agents.update`, `ces.agents.delete`, `ces.examples.create`, `ces.examples.update`, `ces.examples.delete`, `ces.tools.create`, `ces.tools.update`, `ces.tools.delete`, `ces.guardrails.create`, `ces.guardrails.update`, `ces.guardrails.delete`, `ces.toolsets.create`, `ces.toolsets.update`, `ces.toolsets.delete`, `ces.deployments.create`, `ces.deployments.update`, `ces.deployments.delete`, `ces.conversations.delete`, `ces.evaluations.create`, `ces.evaluations.update`, `ces.evaluations.delete`, `ces.evaluationResults.delete`, `ces.evaluationDatasets.create`, `ces.evaluationDatasets.update`, `ces.evaluationDatasets.delete`, `ces.evaluationRuns.delete`, `ces.appVersions.create`, `ces.appVersions.delete`, `ces.appVersions.restore`, `ces.assistantSessions.create`, `ces.securitySettings.update`. Listed in the product guide only (not in the IAM reference): `ces.googleapis.com/agents.updateCallbacks`, `ces.googleapis.com/agents.updateInstructions`, `ces.googleapis.com/agents.updateTools`, `ces.googleapis.com/agents.updateGeneral`, `ces.googleapis.com/scheduledEvaluationRuns.create`, `ces.googleapis.com/scheduledEvaluationRuns.update`, `ces.googleapis.com/scheduledEvaluationRuns.delete`, `ces.googleapis.com/omnichannels.create`, `ces.googleapis.com/omnichannels.update`, `ces.googleapis.com/omnichannels.delete`, `ces.googleapis.com/apps.createTagBinding`, `ces.googleapis.com/apps.deleteTagBinding`, `ces.googleapis.com/apps.listTagBindings`, `ces.googleapis.com/apps.listEffectiveTags`, `ces.googleapis.com/routes.create`, `ces.googleapis.com/routes.update`, `ces.googleapis.com/routes.delete`, `ces.googleapis.com/endpointConfigs.create`, `ces.googleapis.com/endpointConfigs.update`, `ces.googleapis.com/endpointConfigs.delete`, `ces.googleapis.com/sipDomains.create`, `ces.googleapis.com/sipDomains.update`, `ces.googleapis.com/sipDomains.delete`.

#### Gemini Enterprise for Customer Experience Viewer (`ces.googleapis.com/viewer`; IAM role ID `roles/ces.viewer`)

Read-only access to resources. Base role: `contactcenterinsights.googleapis.com/viewer` (`roles/contactcenterinsights.viewer`). Additional permissions as IAM permission IDs confirmed in `roles/ces.viewer` in the IAM reference: `resourcemanager.projects.get`, `resourcemanager.projects.list`, `ces.operations.list`, `ces.operations.get`, `ces.locations.list`, `ces.locations.get`, `ces.apps.list`, `ces.apps.get`, `ces.agents.list`, `ces.agents.get`, `ces.examples.list`, `ces.examples.get`, `ces.tools.list`, `ces.tools.get`, `ces.guardrails.list`, `ces.guardrails.get`, `ces.toolsets.list`, `ces.toolsets.get`, `ces.deployments.list`, `ces.deployments.get`, `ces.conversations.list`, `ces.conversations.get`, `ces.appVersions.list`, `ces.appVersions.get`, `ces.evaluations.list`, `ces.evaluations.get`, `ces.evaluationResults.list`, `ces.evaluationResults.get`, `ces.evaluationDatasets.list`, `ces.evaluationDatasets.get`, `ces.evaluationRuns.list`, `ces.evaluationRuns.get`, `ces.changelogs.list`, `ces.changelogs.get`, `ces.assistantSessions.list`, `ces.assistantSessions.get`, `ces.securitySettings.get`. Listed in the product guide only (not in the IAM reference): `ces.googleapis.com/scheduledEvaluationRuns.list`, `ces.googleapis.com/scheduledEvaluationRuns.get`, `ces.googleapis.com/omnichannels.get`, `ces.googleapis.com/omnichannels.list`, `ces.googleapis.com/apps.listTagBindings`, `ces.googleapis.com/apps.listEffectiveTags`, `ces.googleapis.com/routes.list`, `ces.googleapis.com/routes.get`, `ces.googleapis.com/endpointConfigs.list`, `ces.googleapis.com/endpointConfigs.get`, `ces.googleapis.com/sipDomains.list`, `ces.googleapis.com/sipDomains.get`.

#### Gemini Enterprise for Customer Experience Client (`ces.googleapis.com/client`; IAM role ID `roles/ces.client`)

Query access to agents. Permissions as IAM permission IDs confirmed in `roles/ces.client` in the IAM reference: `ces.sessions.runSession`, `ces.sessions.bidiRunSession`, `ces.tools.execute`.

#### Gemini Enterprise for Customer Experience App Editor (`ces.googleapis.com/appEditor`; IAM role ID `roles/ces.appEditor`)

Full control over app-level settings; manages global logging, audio/voice configurations, storage buckets, and app versions. Base role: `ces.googleapis.com/viewer` (`roles/ces.viewer`). Additional permissions as IAM permission IDs confirmed in `roles/ces.appEditor` in the IAM reference: `ces.apps.create`, `ces.apps.update`, `ces.apps.delete`, `ces.apps.import`, `ces.apps.export`, `ces.apps.runEvaluation`, `ces.appVersions.create`, `ces.appVersions.delete`, `ces.appVersions.restore`. Listed in the product guide only (not in the IAM reference): `ces.googleapis.com/apps.createTagBinding`, `ces.googleapis.com/apps.deleteTagBinding`.

#### Gemini Enterprise for Customer Experience Agent Editor (`ces.googleapis.com/agentEditor`; IAM role ID `roles/ces.agentEditor`)

Full control over Agent node structures, flows, instructions, and callbacks. Can add/remove tools from agents (but not create new tools). Base roles: `ces.googleapis.com/viewer` (`roles/ces.viewer`), `ces.googleapis.com/client` (`roles/ces.client`). Additional permissions as IAM permission IDs confirmed in `roles/ces.agentEditor` in the IAM reference: `ces.agents.create`, `ces.agents.update`, `ces.agents.delete`, `ces.examples.create`, `ces.examples.update`, `ces.examples.delete`. Listed in the product guide only (not in the IAM reference): `ces.googleapis.com/agents.updateCallbacks`, `ces.googleapis.com/agents.updateInstructions`, `ces.googleapis.com/agents.updateTools`, `ces.googleapis.com/agents.updateGeneral`.

#### Gemini Enterprise for Customer Experience Tools Editor (`ces.googleapis.com/toolsEditor`; IAM role ID `roles/ces.toolsEditor`)

Full control over Tools, Toolsets, and Integrations. Base roles: `ces.googleapis.com/viewer` (`roles/ces.viewer`), `ces.googleapis.com/client` (`roles/ces.client`). Additional permissions as IAM permission IDs confirmed in `roles/ces.toolsEditor` in the IAM reference: `ces.tools.create`, `ces.tools.update`, `ces.tools.delete`, `ces.toolsets.create`, `ces.toolsets.update`, `ces.toolsets.delete`.

#### Gemini Enterprise for Customer Experience Guardrails Editor (`ces.googleapis.com/guardrailsEditor`; IAM role ID `roles/ces.guardrailsEditor`)

Full control over safety settings and guardrails. Base roles: `ces.googleapis.com/viewer` (`roles/ces.viewer`), `ces.googleapis.com/client` (`roles/ces.client`). Additional permissions as IAM permission IDs confirmed in `roles/ces.guardrailsEditor` in the IAM reference: `ces.guardrails.create`, `ces.guardrails.update`, `ces.guardrails.delete`.

#### Gemini Enterprise for Customer Experience Evals Editor (`ces.googleapis.com/evalsEditor`; IAM role ID `roles/ces.evalsEditor`)

Full control over Evaluation datasets, runs, and results. Base roles: `ces.googleapis.com/viewer` (`roles/ces.viewer`), `ces.googleapis.com/client` (`roles/ces.client`). Additional permissions as IAM permission IDs confirmed in `roles/ces.evalsEditor` in the IAM reference: `ces.evaluations.create`, `ces.evaluations.update`, `ces.evaluations.delete`, `ces.evaluationResults.delete`, `ces.evaluationDatasets.create`, `ces.evaluationDatasets.update`, `ces.evaluationDatasets.delete`, `ces.evaluationRuns.delete`. Listed in the product guide only (not in the IAM reference): `ces.googleapis.com/scheduledEvaluationRuns.create`, `ces.googleapis.com/scheduledEvaluationRuns.update`, `ces.googleapis.com/scheduledEvaluationRuns.delete`.

#### Gemini Enterprise for Customer Experience Security Settings Editor (`ces.googleapis.com/securitySettingsEditor`; IAM role ID `roles/ces.securitySettingsEditor`)

Full control over project-wide Security Settings. Base role: `ces.googleapis.com/viewer` (`roles/ces.viewer`). Additional permissions as IAM permission IDs confirmed in `roles/ces.securitySettingsEditor` in the IAM reference: `ces.securitySettings.update`.

#### Gemini Enterprise for Customer Experience Deployment Editor (`ces.googleapis.com/deploymentEditor`; IAM role ID `roles/ces.deploymentEditor`)

Ability to manage environments and deploy specific App Versions to them. Base role: `ces.googleapis.com/viewer` (`roles/ces.viewer`). Additional permissions as IAM permission IDs confirmed in `roles/ces.deploymentEditor` in the IAM reference: `ces.deployments.create`, `ces.deployments.update`, `ces.deployments.delete`.

## Notes

- Corrected from the official docs: the source's single condition is `resource.name == "projects/PROJECT_ID" || resource.name.startsWith("projects/PROJECT_ID/locations/LOCATION_ID/apps/APP_ID") || resource.name.startsWith("projects/PROJECT_ID/locations/LOCATION_ID/operations") || ...` (followed by the `sipDomains`, `omnichannels`, `dataStores`, `routes` and `endpointConfigs` clauses) in one binding. In one binding, the project clause gives the app's editing role on the project resource, a prefix without the trailing `/` also matches `.../apps/APP_ID2` and its children, and the location-wide clauses give the editing role over every operation and shared resource in the location. The page uses `resource.name == ".../apps/APP_ID"` and `resource.name.startsWith(".../apps/APP_ID/")` in binding 1 with the editing role, the project clause alone in binding 2 with a read-only role, and the six location-wide clauses as the source writes them in a separate, optional binding 3 with a narrower role. The single-app restriction is bindings 1 and 2; binding 3 still matches the shared resources and operations of every app in the location, so it is added only when that read access is acceptable.
- Operations paths are from the `ces.v1` / `ces.v1beta` Discovery documents (`projects.locations.operations` `get`, `list`, `cancel`, `delete`). The product guide also lists create / update / delete permissions for `sipDomains`, `omnichannels`, `routes` and `endpointConfigs` under the Admin role, but the IAM reference does not list them.
- The Admin role gives full access to all CX Agent Studio resources, including deleting apps, conversations and evaluation data and updating security settings; grant it sparingly and prefer the narrower editor roles or the Client role for services that only call `runSession`.
- The product guide writes role and permission identifiers in the `ces.googleapis.com/...` form; the confirmed groups above give them in the IAM form, mapping `ces.googleapis.com/X.Y` to `ces.X.Y` and the Viewer role's `cloudresourcemanager.googleapis.com/projects.get` / `projects.list` to `resourcemanager.projects.get` / `resourcemanager.projects.list`, and list a permission as confirmed only when the IAM reference includes that ID in the same role. In IAM bindings use the role IDs given next to each heading (`roles/ces.admin`, `roles/ces.viewer`, `roles/ces.client`, `roles/ces.appEditor`, `roles/ces.agentEditor`, `roles/ces.toolsEditor`, `roles/ces.guardrailsEditor`, `roles/ces.evalsEditor`, `roles/ces.securitySettingsEditor`, `roles/ces.deploymentEditor`); the IAM roles and permissions reference writes permissions as `ces.apps.create`, `contactcenterinsights.conversations.get` and so on.
- Corrected from the official docs: the source names the CX Insights permissions as `contactcenterinsights.googleapis.com/conversations.get` and `contactcenterinsights.googleapis.com/conversations.list`; the IAM roles and permissions reference lists them as `contactcenterinsights.conversations.get` and `contactcenterinsights.conversations.list` (contained in `roles/ces.admin`, `roles/ces.viewer`, `roles/contactcenterinsights.admin` and `roles/contactcenterinsights.viewer` among others), which is the form a custom role accepts.
- The IAM roles and permissions reference does not list some permissions named in the product guide (the "Listed in the product guide only" groups above): `agents.updateCallbacks`, `agents.updateInstructions`, `agents.updateTools`, `agents.updateGeneral`, the tag binding permissions (`apps.createTagBinding`, `apps.deleteTagBinding`, `apps.listTagBindings`, `apps.listEffectiveTags`) and the `scheduledEvaluationRuns`, `omnichannels`, `routes`, `endpointConfigs` and `sipDomains` permissions. The IAM reference also gives each role more permissions than the guide lists (for example 278 for `roles/ces.admin`); use `gcloud iam roles describe ROLE_ID` or the IAM reference for the full contents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/ces (role IDs and permission IDs per role; retrieved 2026-11-14)
- The source also shows Console click-paths for adding, changing and removing principals.
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/access-control (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://ces.googleapis.com/$discovery/rest?version=v1 (Discovery document `ces.v1`, revision 20261016)
- Source: https://ces.googleapis.com/$discovery/rest?version=v1beta (Discovery document `ces.v1beta`, revision 20261016)

## Related

- [api-access.md](./api-access.md)
- [vpc-service-controls.md](./vpc-service-controls.md)
- [cmek.md](./cmek.md)
