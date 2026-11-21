---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/manage-agent-gateways
---

# Manage Agent Gateway

Post-deployment maintenance of Agent Gateway resources: view and inspect, understand which settings are immutable, update the registry, connectivity template, IAP settings and Model Armor templates, disassociate workloads, and delete a gateway.

## Signature / Usage

### View and inspect

```bash
gcloud network-services agent-gateways list \
  --location=LOCATION \
  --project=PROJECT_ID
```

```bash
gcloud network-services agent-gateways describe AGENT_GATEWAY_NAME \
  --location=LOCATION \
  --project=PROJECT_ID
```

### Update the connectivity template

Create a new `AgentConnectivityTemplate` that uses the same `networkAttachment` as the existing gateway, then export the gateway configuration:

```bash
gcloud network-services agent-gateways export AGENT_GATEWAY_NAME \
 --destination="agent-gateway.yaml" \
 --location=LOCATION \
 --project=PROJECT_ID
```

In the exported file keep `protocols`, `googleManaged.governedAccessPath` (it cannot be changed after the gateway is created; the example below shows an Agent-to-Anywhere gateway, so keep the exported value such as `CLIENT_TO_AGENT` for other gateways), `registries` (unchanged, as exported), `description` and `labels`, remove output-only fields (`createTime`, `updateTime`, `agentGatewayCard`, `selfLink`), and point `agentConnectivityTemplate` at the new template (project number, not project ID; this applies to `agentConnectivityTemplate` only):

Adapted (not in the official docs): the `registries` entry is the placeholder `AGENT_REGISTRY_PATH` (as in set-up-agent-gateway.md) for the exported value, instead of a URI rebuilt with `PROJECT_NUMBER` (Notes).

```yaml
name: projects/PROJECT_NUMBER/locations/LOCATION/agentGateways/AGENT_GATEWAY_NAME
protocols:
  - MCP
googleManaged:
  governedAccessPath: AGENT_TO_ANYWHERE
registries:
  - AGENT_REGISTRY_PATH
agentConnectivityTemplate: projects/PROJECT_NUMBER/locations/LOCATION/agentConnectivityTemplates/NEW_TEMPLATE_NAME
```

```bash
gcloud network-services agent-gateways import AGENT_GATEWAY_NAME \
 --source="agent-gateway.yaml" \
 --location=LOCATION \
 --project=PROJECT_ID
```

### Modify IAP settings or Model Armor templates

```bash
gcloud service-extensions authz-extensions list \
 --location=LOCATION \
 --project=PROJECT_ID
```

```bash
gcloud service-extensions authz-extensions describe AUTHZ_EXTENSION_NAME \
 --location=LOCATION \
 --project=PROJECT_ID \
 --format=yaml
```

IAP extension: enforcement is the default when `iamEnforcementMode` is absent. Add `iamEnforcementMode: "DRY_RUN"` under `metadata` only in a staging environment or during a migration; in dry-run mode IAP does not enforce IAM policies and requests it would deny are not blocked (`failOpen: false` does not change that, it only controls what happens when the call to the extension fails or times out).

Adapted (not in the official docs): removed `iamEnforcementMode: "DRY_RUN" # Omit this line to enforce policies`, so updating the extension keeps IAP enforcement; the source says to omit this line to enforce policies.

```yaml
name: AUTHZ_EXTENSION_NAME
service: iap.googleapis.com
failOpen: false
timeout: 1s
metadata:
  iapPolicyVersion: "V2"
```

Model Armor extension:

```yaml
name: AUTHZ_EXTENSION_NAME
service: modelarmor.LOCATION.rep.googleapis.com
failOpen: false
timeout: 1s
metadata:
  model_armor_settings: '[
    {
      "request_template_id": "projects/MODEL_ARMOR_PROJECT_ID/locations/LOCATION/templates/REQUEST_TEMPLATE_ID",
      "response_template_id": "projects/MODEL_ARMOR_PROJECT_ID/locations/LOCATION/templates/RESPONSE_TEMPLATE_ID"
    }
  ]'
```

```bash
gcloud service-extensions authz-extensions import AUTHZ_EXTENSION_NAME \
 --source="authz-extension.yaml" \
 --location=LOCATION \
 --project=PROJECT_ID
```

### Disassociate an Agent Runtime agent

The console and gcloud do not support modifying Agent Runtime gateway bindings; clear `spec.deploymentSpec.agentGatewayConfig` with `reasoningEngines.patch`.

Before you run it: the request fails while a manual revision traffic split is active, so remove the split first; when it succeeds, it creates a new revision and irreversibly archives every previous revision of the agent, including any known-good revision you might roll back to.

Adapted (not in the official docs): added `--fail-with-body`, so an HTTP error makes `curl` exit non-zero instead of looking like success.

```bash
curl --fail-with-body -X PATCH \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json; charset=utf-8" \
 -d '{
   "spec": {
     "deploymentSpec": {
       "agentGatewayConfig": {}
     }
   }
 }' \
 "https://REGION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/REGION/reasoningEngines/RESOURCE_ID?updateMask=spec.deploymentSpec.agentGatewayConfig"
```

The call returns a long-running operation (`reasoningEngines.patch` returns `GoogleLongrunningOperation` in the `aiplatform.v1` Discovery document). Poll `GET https://REGION-aiplatform.googleapis.com/v1/OPERATION_NAME` until the response contains `"done": true` and check that it has no `error`, then `GET` the reasoning engine and confirm that `spec.deploymentSpec.agentGatewayConfig` is empty. Only then go on to delete the gateway's policies (not in the official docs).

### Delete a gateway (gcloud)

Before you disassociate anything, stop or move the traffic that depends on the gateway (not in the official docs): disassociating a Gemini Enterprise app ends its outbound path through the gateway, and its imported agents and MCP servers are not accessible until a gateway that references the same Agent Registry is associated (Notes), so first stop the app's use of them or associate it with such a gateway. Then, as the source's step 1 says, "Ensure that no Gemini Enterprise apps or Agent Runtime agents reference the gateway" (see Disassociate an Agent Runtime agent above). Disassociation is the only documented step that takes traffic off the gateway (for an app, "Disassociating an Agent Gateway stops routing the app's outbound traffic through the gateway"); the source documents no way to reject new requests at the gateway itself, to drain in-flight requests or to confirm that they have finished (not confirmed in the official docs). Until new requests can be blocked upstream, do not remove the policies in this order; if deleting the gateway is not required, do not delete it (not in the official docs). Then, not in the official docs: confirm on the gateway's **Observability** tab that no requests arrive, and that no VPC configuration update operation is running (a deletion-failure condition, Notes). Delete the policies and extensions only right before the gateway: the gateway cannot be deleted while any `AuthzPolicy` or `TelemetryPolicy` targets it (Notes), so the policy cannot be removed afterwards, and a Client-to-Agent gateway without its `CONTENT_AUTHZ` policy passes requests without content checks (Notes).

Before the first change (deleting a policy or extension, removing this gateway from a shared policy, or changing a `TelemetryPolicy`), save every resource you will touch to a new file (not in the official docs). Write each file only after its command succeeds with non-empty output, and never overwrite an existing one (for example from an interrupted earlier run): `out=$(gcloud network-security authz-policies describe AUTHZ_POLICY_NAME --location=LOCATION --project=PROJECT_ID --format=yaml) && [ -n "$out" ] && (set -o noclobber; printf '%s\n' "$out" > AUTHZ_POLICY_NAME.orig.yaml)`, and the same with `gcloud service-extensions authz-extensions describe AUTHZ_EXTENSION_NAME --location=LOCATION --project=PROJECT_ID --format=yaml` into `AUTHZ_EXTENSION_NAME.orig.yaml` (gcloud 593.0.0 has no `export` in either group) and `gcloud beta network-services telemetry-policies export TELEMETRY_POLICY_NAME --location=LOCATION --project=PROJECT_ID` (without `--destination` it writes to standard output) into `TELEMETRY_POLICY_NAME.orig.yaml`. Make no change unless every one of these commands succeeded. Keep the `.orig.yaml` files unchanged and edit only copies of them. For the whole procedure, let only one person or process export, edit and import each shared policy (not in the official docs). If any step fails or you stop while the gateway still exists, keep the apps and agents disassociated, then restore the extensions, the policies and the `TelemetryPolicy`, in that order. Re-create one that this procedure deleted from its saved original with `gcloud service-extensions authz-extensions import AUTHZ_EXTENSION_NAME --source=AUTHZ_EXTENSION_NAME.orig.yaml --location=LOCATION --project=PROJECT_ID`, `gcloud network-security authz-policies import AUTHZ_POLICY_NAME --source=AUTHZ_POLICY_NAME.orig.yaml --location=LOCATION --project=PROJECT_ID` or `gcloud beta network-services telemetry-policies import TELEMETRY_POLICY_NAME --source=TELEMETRY_POLICY_NAME.orig.yaml --location=LOCATION --project=PROJECT_ID`. Do not re-import a shared policy that you only edited from its `.orig.yaml`, which would undo other changes made since: save its current state again as above into a new file (such as `AUTHZ_POLICY_NAME.current.yaml`), add only this gateway back to `target.resources` (or `telemetryTarget.resources`) in a copy, compare the copy with the `.orig.yaml` file, and import the copy with the same command. Then the `CONTENT_AUTHZ` checks apply again; only then associate the apps and agents again.

Before the `AuthzPolicy` steps, check the `TelemetryPolicy` resources the same way (not in the official docs; the source gives no removal steps). A tracing policy lists its gateways in `telemetryTarget.resources` ("You can attach a policy to multiple gateways", Monitor Agent Gateway). Delete a policy only if it lists this gateway alone; otherwise do not export it again: copy the original saved above with `cp TELEMETRY_POLICY_NAME.orig.yaml TELEMETRY_POLICY_NAME.edited.yaml`, remove only this gateway from `telemetryTarget.resources` in the copy, and apply the copy with `gcloud beta network-services telemetry-policies import TELEMETRY_POLICY_NAME --location=LOCATION --project=PROJECT_ID --source=TELEMETRY_POLICY_NAME.edited.yaml`.

Adapted (not in the official docs): the gcloud help example `gcloud beta network-services telemetry-policies list --location=us-central1`, with `LOCATION`, `--project=PROJECT_ID` and a `--format` that shows each policy's targets.

```bash
gcloud beta network-services telemetry-policies list \
  --location=LOCATION \
  --project=PROJECT_ID \
  --format="yaml(name,telemetryTarget.resources)"
```

Adapted (not in the official docs): the gcloud help example `gcloud beta network-services telemetry-policies delete my-telemetry-policy --location=global`, with placeholders and `--project=PROJECT_ID`.

```bash
gcloud beta network-services telemetry-policies delete TELEMETRY_POLICY_NAME \
  --location=LOCATION \
  --project=PROJECT_ID
```

Check the list output before deleting anything (not in the official docs). Delete a policy only if its `target.resources` lists this gateway alone. If it also targets other gateways, do not delete it: copy its saved original with `cp AUTHZ_POLICY_NAME.orig.yaml AUTHZ_POLICY_NAME.edited.yaml`, remove only this gateway from `target.resources` in the copy, and apply the copy with `gcloud network-security authz-policies import AUTHZ_POLICY_NAME --source=AUTHZ_POLICY_NAME.edited.yaml --location=LOCATION --project=PROJECT_ID` (its help: "The ID of the new or updated AuthzPolicy resource"). Delete an `AuthzExtension` only if no remaining policy in the list output references it.

Delete each `AuthzPolicy` before the `AuthzExtension` it references:

```bash
gcloud network-security authz-policies list \
  --location=LOCATION \
  --project=PROJECT_ID \
  --format="yaml(name,target.resources,customProvider.authzExtension.resources)"
```

```bash
gcloud network-security authz-policies delete AUTHZ_POLICY_NAME \
  --location=LOCATION \
  --project=PROJECT_ID
```

```bash
gcloud service-extensions authz-extensions delete AUTHZ_EXTENSION_NAME \
  --location=LOCATION \
  --project=PROJECT_ID
```

```bash
gcloud network-services agent-gateways delete AGENT_GATEWAY_NAME \
 --location=LOCATION \
 --project=PROJECT_ID
```

```bash
gcloud network-services agent-connectivity-templates delete CONNECTIVITY_TEMPLATE_NAME \
 --location=LOCATION \
 --project=PROJECT_ID
```

## Options / Props

### Immutable settings

| Setting | Mutability | Requirement or restriction |
|---|---|---|
| Gateway name and region | Immutable | To change the name or region, deploy a [replacement gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/manage-agent-gateways#replace-gateway). |
| Governed access path (`AGENT_TO_ANYWHERE` or `CLIENT_TO_AGENT`) | Immutable | Configured at creation in `googleManaged.governedAccessPath`. Cannot be modified in place. |
| Private Service Connect network attachment (`networkAttachment`) | Immutable after being set | Once you associate a network attachment with a gateway, it cannot be changed or removed. |
| Agent connectivity template and associated Cloud DNS peering, TLS trust config, and VPC egress settings | Conditionally mutable | You can update the gateway's configuration to reference a different connectivity template with new settings, as long as the new template still references the **same** `networkAttachment`. |

## Notes

- Conditions that make gateway deletion fail:
  - One or more Agent Runtime agents or Gemini Enterprise apps still reference the gateway.
  - Any `AuthzPolicy` (IAP, Model Armor or custom provider) or `TelemetryPolicy` still targets the gateway.
  - A VPC configuration update operation is still running on the gateway.
- Model Armor service account roles:
  - Newly referenced template project: `roles/modelarmor.user`
  - Gateway project: `roles/modelarmor.calloutUser`, `roles/serviceusage.serviceUsageConsumer`
  - The gateway service account is `agentGatewayCard.serviceExtensionsServiceAccount`.
- Replacing a gateway (Agent Runtime): within one project and region all Agent Runtime agents must bind to the same gateway, and in-place gateway-to-gateway updates are not supported. Ensure every bound agent routes 100% of traffic to its latest revision (`trafficConfig.trafficSplitAlwaysLatest`), clear `agentGatewayConfig` to `{}` on each agent with `reasoningEngines.patch` and wait for each operation, then patch each agent to the replacement gateway resource name. For Gemini Enterprise apps, update the gateway resource name in the app's Security > Configuration.
- Clearing or changing a gateway binding fails if a manual revision traffic split is active and irreversibly archives all previous revisions.
- Disassociating a gateway from a Gemini Enterprise app stops routing its outbound traffic through the gateway; imported agents and MCP servers remain registered in Agent Registry but are not accessible until a gateway referencing the same Agent Registry is linked again.
- The registry must be a single regional registry matching the gateway's region (and the app location for Gemini Enterprise).
- To attach new IAP, Model Armor or custom authorization policies to an existing gateway, use gcloud as described in "Delegate authorization for Agent Gateway"; console sections appear only if the features were enabled at creation.
- Deleting a gateway, policies, extensions, connectivity templates or Agent Runtime bindings is destructive and disrupts agent traffic; try these steps in a disposable project first. A connectivity template cannot be deleted while a gateway references it; underlying PSC network attachments, private DNS zones and Certificate Manager `TrustConfig` resources are removed separately.
- Corrected from the official docs: the IAP extension example contained `iamEnforcementMode: "DRY_RUN" # Omit this line to enforce policies`; importing it as an update switches an enforcing extension to audit-only. The source's text: "Include `iamEnforcementMode: "DRY_RUN"` for audit-only mode, or remove `iamEnforcementMode` to enforce policies". The set-up guide describes dry-run as a mode where "the gateway permits all traffic through and only generates audit logs" and calls **Enforce policies** "recommended for production environments" (https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway, retrieved 2026-11-21).
- `failOpen`: the `AuthzExtension.failOpen` field "Determines how the proxy behaves if the call to the extension fails or times out" (Network Services API `networkservices.v1` Discovery document); it does not turn dry-run decisions into blocks.
- The immutable-settings table is the source table; its separator row, which the source places after the last row, is moved under the header so the table renders.
- The source also shows Console steps for each task.
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/manage-agent-gateways (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: the source lists `TelemetryPolicy` as a deletion blocker but gives no steps; the `TelemetryPolicy` commands come from the gcloud 593.0.0 help of `gcloud beta network-services telemetry-policies` (`list`, `export`, `import`, `delete`; the group is beta and alpha only), and `telemetryTarget.resources` is `TelemetryTarget.resources` in the Network Services API `networkservices.v1beta1` Discovery document. Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/monitor-agent-gateway (retrieved 2026-11-21).
- CLI tracks (gcloud 593.0.0 help): `service-extensions authz-extensions` and `network-security authz-policies` (`list`, `describe`, `import`, `delete`) are GA (networkservices / networksecurity `v1`) as well as beta, so the GA commands from the source are kept; set-up-agent-gateway.md imports the extension with `gcloud beta` as its source does, and the `AuthzExtension` fields are the same in `networkservices` `v1` and `v1beta1` (Discovery). `network-services telemetry-policies` exists only in beta and alpha.
- Adapted from the official docs: the update example wrote `- //agentregistry.googleapis.com/projects/PROJECT_NUMBER/locations/LOCATION` under `registries`, while the source explains `PROJECT_NUMBER` only for `agentConnectivityTemplate` ("requires the project number rather than the project ID"), the set-up examples use `PROJECT_ID` there, and the Discovery document (`networkservices.v1`, `AgentGateway.registries`) gives the format `//agentregistry.googleapis.com/projects/{project}/locations/{location}/`.
- Adapted from the official docs: the disassociation `curl -X PATCH` had no `--fail-with-body` and the source does not show waiting for the returned operation.

## Related

- [set-up-agent-gateway.md](./set-up-agent-gateway.md)
- [agent-gateway-overview.md](./agent-gateway-overview.md)
