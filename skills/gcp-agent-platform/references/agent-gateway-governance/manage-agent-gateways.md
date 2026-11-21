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

In the exported file keep `protocols`, `registries`, `description` and `labels`, remove output-only fields (`createTime`, `updateTime`, `agentGatewayCard`, `selfLink`), and point `agentConnectivityTemplate` at the new template (project number, not project ID):

```yaml
name: projects/PROJECT_NUMBER/locations/LOCATION/agentGateways/AGENT_GATEWAY_NAME
protocols:
  - MCP
googleManaged:
  governedAccessPath: AGENT_TO_ANYWHERE
registries:
  - //agentregistry.googleapis.com/projects/PROJECT_NUMBER/locations/LOCATION
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

IAP extension (include `iamEnforcementMode: "DRY_RUN"` for audit-only; remove it to enforce):

```yaml
name: AUTHZ_EXTENSION_NAME
service: iap.googleapis.com
failOpen: false
timeout: 1s
metadata:
  iapPolicyVersion: "V2"
  iamEnforcementMode: "DRY_RUN" # Omit this line to enforce policies
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

The console and gcloud do not support modifying Agent Runtime gateway bindings; clear `spec.deploymentSpec.agentGatewayConfig` with `reasoningEngines.patch`:

```bash
curl -X PATCH \
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

### Delete a gateway (gcloud)

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
- The immutable-settings table is the source table; its separator row, which the source places after the last row, is moved under the header so the table renders.
- The source also shows Console steps for each task.
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/manage-agent-gateways (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [set-up-agent-gateway.md](./set-up-agent-gateway.md)
- [agent-gateway-overview.md](./agent-gateway-overview.md)
